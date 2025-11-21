import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { generateSessionId } from '@/lib/session';

export async function POST() {
    try {
        const sessionId = generateSessionId();

        const { error } = await supabase
            .from('TestSession')
            .insert({
                id: sessionId,
                startedAt: new Date().toISOString(),
            });

        if (error) {
            console.error('Supabase error:', error);
            throw error;
        }

        return NextResponse.json({
            success: true,
            sessionId
        });

    } catch (error) {
        console.error('Error creating session:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create session' },
            { status: 500 }
        );
    }
}
