import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { demographicsSchema } from '@/lib/validation';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const validation = demographicsSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { success: false, error: validation.error.errors },
                { status: 400 }
            );
        }

        const { sessionId, age, education, gender } = validation.data;

        const { error } = await supabase
            .from('TestSession')
            .update({
                age,
                education,
                gender
            })
            .eq('id', sessionId);

        if (error) throw error;

        return NextResponse.json({
            success: true
        });

    } catch (error) {
        console.error('Error saving demographics:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to save demographics' },
            { status: 500 }
        );
    }
}
