import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { testSubmissionSchema } from '@/lib/validation';
import { calculateIQ } from '@/utils/iqCalculator';

export async function POST(request: Request) {
    console.log('--- SUBMIT API CALLED ---');

    try {
        let body;
        try {
            body = await request.json();
            console.log('Request body parsed successfully');
        } catch (e) {
            console.error('Failed to parse request body:', e);
            return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
        }

        // Validate input
        const validation = testSubmissionSchema.safeParse(body);
        if (!validation.success) {
            console.error('Validation failed:', validation.error.issues);
            return NextResponse.json(
                { success: false, error: validation.error.issues },
                { status: 400 }
            );
        }

        const { sessionId, answers } = validation.data;
        console.log(`Processing submission for session: ${sessionId}, answers: ${answers.length}`);

        // 1. Verify session exists
        const { data: session, error: sessionError } = await supabase
            .from('TestSession')
            .select('id')
            .eq('id', sessionId!)
            .single();

        if (sessionError || !session) {
            console.error('Session verification failed:', sessionError);
            return NextResponse.json(
                { success: false, error: 'Invalid session' },
                { status: 404 }
            );
        }

        // 2. Fetch correct answers
        const { data: questions, error: questionsError } = await supabase
            .from('Question')
            .select('id, correctAnswer, type, category, difficulty');

        if (questionsError) {
            console.error('Failed to fetch questions:', questionsError);
            throw questionsError;
        }

        console.log(`Fetched ${questions?.length} questions for grading`);

        // 3. Calculate Score
        let correctCount = 0;
        const processedAnswers = answers.map(answer => {
            const question = questions.find(q => q.id === answer.questionId);

            // Safety check if question not found
            if (!question) {
                console.warn(`Question ${answer.questionId} not found in database`);
                return {
                    id: crypto.randomUUID(), // Generate ID manually
                    sessionId,
                    questionId: answer.questionId,
                    selectedOption: answer.selectedOption,
                    timeTakenMs: answer.timeTakenMs,
                    isCorrect: false
                };
            }

            const isCorrect = question.correctAnswer === answer.selectedOption;
            if (isCorrect) correctCount++;

            return {
                id: crypto.randomUUID(), // Generate ID manually
                sessionId,
                questionId: answer.questionId,
                selectedOption: answer.selectedOption,
                timeTakenMs: answer.timeTakenMs,
                isCorrect
            };
        });

        console.log(`Score calculated: ${correctCount}/${answers.length}`);

        // 4. Save Answers
        const { error: answersError } = await supabase
            .from('Answer')
            .insert(processedAnswers);

        if (answersError) {
            console.error('Failed to save answers:', answersError);
            throw answersError;
        }

        // 5. Calculate IQ
        const totalTimeMs = answers.reduce((acc, curr) => acc + curr.timeTakenMs, 0);

        let iqResult;
        try {
            iqResult = calculateIQ(processedAnswers.map(a => ({
                questionId: a.questionId,
                isCorrect: a.isCorrect,
                category: questions.find(q => q.id === a.questionId)?.category || 'unknown',
                timeTakenMs: a.timeTakenMs
            })), 25); // Default age 25
        } catch (calcError) {
            console.error('IQ Calculation failed:', calcError);
            // Fallback result to avoid crashing
            iqResult = {
                iq: 100,
                percentile: '50',
                classification: 'Promedio',
                description: 'Calculation error fallback',
                categoryBreakdown: { logica: 50, memoria: 50, patrones: 50, velocidad: 50 }
            };
        }

        // 6. Save Result
        const { error: resultError } = await supabase
            .from('Result')
            .insert({
                id: crypto.randomUUID(), // Generate ID manually
                sessionId,
                iq: iqResult.iq,
                percentile: parseInt(iqResult.percentile) || 50, // Ensure number
                classification: iqResult.classification,
                description: iqResult.description,
                categoryBreakdown: iqResult.categoryBreakdown,
                totalQuestions: 30,
                correctAnswers: correctCount,
                averageTime: totalTimeMs / 30,
                calculatedAt: new Date().toISOString()
            });

        if (resultError) {
            console.error('Failed to save result:', resultError);
            // Don't throw here, we can still return success to user
        }

        // 7. Update Session
        await supabase
            .from('TestSession')
            .update({ completedAt: new Date().toISOString() })
            .eq('id', sessionId);

        console.log('Submission completed successfully');

        return NextResponse.json({
            success: true,
            sessionId,
            preview: {
                iqRange: `${iqResult.iq - 5}-${iqResult.iq + 5}`,
                percentile: iqResult.percentile,
                classification: iqResult.classification
            }
        });

    } catch (error: any) {
        console.error('CRITICAL ERROR in submit route:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Internal Server Error',
                details: error.message || String(error)
            },
            { status: 500 }
        );
    }
}
