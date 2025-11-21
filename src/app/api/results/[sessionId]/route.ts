import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
    request: Request,
    props: { params: Promise<{ sessionId: string }> }
) {
    try {
        const params = await props.params;
        const sessionId = params.sessionId;

        // 1. Get Session Status
        const { data: session, error: sessionError } = await supabase
            .from('TestSession')
            .select('hasPaid')
            .eq('id', sessionId)
            .single();

        if (sessionError || !session) {
            return NextResponse.json(
                { success: false, error: 'Session not found' },
                { status: 404 }
            );
        }

        // 2. Get Results
        const { data: result, error: resultError } = await supabase
            .from('Result')
            .select('*')
            .eq('sessionId', sessionId)
            .single();

        if (resultError || !result) {
            return NextResponse.json(
                { success: false, error: 'Result not found' },
                { status: 404 }
            );
        }

        // 3. Return data based on payment status
        if (session.hasPaid) {
            return NextResponse.json({
                success: true,
                hasPaid: true,
                result
            });
        } else {
            return NextResponse.json({
                success: true,
                hasPaid: false,
                preview: {
                    iqRange: `${result.iq - 5}-${result.iq + 5}`,
                    percentile: result.percentile,
                    classification: result.classification
                }
            });
        }

    } catch (error) {
        console.error('Error fetching results:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch results' },
            { status: 500 }
        );
    }
}
