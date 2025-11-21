'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { QuestionContent } from '@/components/QuestionContent';
import { AnswerOptionDiverse } from '@/components/AnswerOptionDiverse';

interface Question {
    id: number;
    type: string;
    category: string;
    difficulty: number;
    content: any;
    options: any;
}

interface Answer {
    questionId: number;
    selectedOption: number;
    timeTakenMs: number;
}

export default function TestPage() {
    const router = useRouter();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [startTime, setStartTime] = useState(Date.now());
    const [sessionId, setSessionId] = useState<string>('');
    const [showEgoBoost, setShowEgoBoost] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const totalQuestions = questions.length > 0 ? questions.length : 30;
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;

    // Fetch questions and create session on mount
    useEffect(() => {
        async function initTest() {
            try {
                // Create test session
                const sessionRes = await fetch('/api/test/start', {
                    method: 'POST',
                });
                const sessionData = await sessionRes.json();

                if (sessionData.success) {
                    setSessionId(sessionData.sessionId);
                    localStorage.setItem('test_session_id', sessionData.sessionId);
                }

                // Fetch questions
                const questionsRes = await fetch('/api/test/questions');
                const questionsData = await questionsRes.json();

                if (questionsData.success) {
                    setQuestions(questionsData.questions);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error initializing test:', error);
                setLoading(false);
            }
        }

        initTest();
    }, []);

    useEffect(() => {
        setStartTime(Date.now());
    }, [currentQuestion]);

    // Ego Boost at 30%
    useEffect(() => {
        if (currentQuestion === 9 && !showEgoBoost) {
            setShowEgoBoost(true);
            setTimeout(() => setShowEgoBoost(false), 3000);
        }
    }, [currentQuestion, showEgoBoost]);

    const handleAnswer = async (optionIndex: number) => {
        if (isSubmitting) return;

        const timeTaken = Date.now() - startTime;

        const newAnswer: Answer = {
            questionId: questions[currentQuestion].id,
            selectedOption: optionIndex,
            timeTakenMs: timeTaken,
        };

        const updatedAnswers = [...answers, newAnswer];
        setAnswers(updatedAnswers);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Test completed - submit answers to backend
            setIsSubmitting(true);
            try {
                const response = await fetch('/api/test/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        sessionId,
                        answers: updatedAnswers,
                    }),
                });

                const data = await response.json();

                if (data.success) {
                    // Store session ID for later use
                    localStorage.setItem('test_session_id', data.sessionId);
                    // Go to demographics page
                    router.push('/demographics');
                } else {
                    console.error('Submission failed:', data.error);
                    setIsSubmitting(false);
                    alert('Hubo un error al enviar tus respuestas. Por favor intenta de nuevo.');
                }
            } catch (error) {
                console.error('Error submitting test:', error);
                setIsSubmitting(false);
                alert('Error de conexión. Por favor verifica tu internet.');
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🧠</div>
                    <p className="text-xl text-gray-600">Cargando test...</p>
                </div>
            </div>
        );
    }

    if (isSubmitting) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4 animate-bounce">🚀</div>
                    <p className="text-xl text-gray-600">Analizando tus resultados...</p>
                    <p className="text-sm text-gray-400 mt-2">Esto puede tomar unos segundos</p>
                </div>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <p className="text-xl text-gray-600">Error cargando preguntas</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-8 px-4">
            {/* Header */}
            <div className="max-w-4xl mx-auto mb-8">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-2xl font-bold text-primary">IQCheck</div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                        className="h-full bg-primary-light"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                    Pregunta {currentQuestion + 1} de {totalQuestions}
                </p>
            </div>

            {/* Ego Boost Modal */}
            <AnimatePresence>
                {showEgoBoost && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
                    >
                        <div className="glass-morphism rounded-2xl p-8 max-w-md mx-4 text-center pointer-events-auto shadow-2xl">
                            <div className="text-6xl mb-4">🎯</div>
                            <h2 className="text-2xl font-bold text-primary mb-2">
                                ¡Excelente Progreso!
                            </h2>
                            <p className="text-gray-600">
                                Tu velocidad de procesamiento es superior al promedio. ¡Mantén el ritmo!
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Question Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion}
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        {/* Question Content */}
                        <div className="mb-8 bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
                            <div className="aspect-video max-w-2xl mx-auto">
                                <QuestionContent
                                    questionNumber={currentQuestion + 1}
                                    difficulty={questions[currentQuestion].difficulty}
                                />
                            </div>
                            <p className="text-center text-sm text-gray-500 py-3 bg-gray-50">
                                Pregunta {currentQuestion + 1} - {
                                    questions[currentQuestion].difficulty <= 2 ? 'Nivel Fácil' :
                                        questions[currentQuestion].difficulty <= 4 ? 'Nivel Medio' :
                                            'Nivel Difícil'
                                }
                            </p>
                        </div>

                        {/* Options Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {['A', 'B', 'C', 'D', 'E', 'F'].map((option, index) => (
                                <motion.button
                                    key={option}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleAnswer(index)}
                                    disabled={isSubmitting}
                                    className="relative aspect-square bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-primary-light rounded-xl overflow-hidden transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <div className="absolute inset-0 p-3">
                                        <AnswerOptionDiverse
                                            questionNumber={currentQuestion + 1}
                                            optionIndex={index}
                                            difficulty={questions[currentQuestion].difficulty}
                                        />
                                    </div>

                                    <div className="absolute bottom-2 right-2 bg-white/90 group-hover:bg-primary-light group-hover:text-white px-2 py-1 rounded text-sm font-semibold transition-colors">
                                        {option}
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
