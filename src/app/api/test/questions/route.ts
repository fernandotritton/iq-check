import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        // Fetch 30 random questions (5 from each type)
        // Since Supabase doesn't support complex random sampling easily in one query without RPC,
        // we'll fetch all questions and shuffle them in memory for now (since we only have 30 total).
        // In a real production app with thousands of questions, we'd use a Postgres function.

        const { data: questions, error } = await supabase
            .from('Question')
            .select('id, type, category, difficulty, content, options')
            .order('id', { ascending: true });

        if (error) {
            console.error('Supabase error:', error);
            throw error;
        }

        return NextResponse.json({
            success: true,
            questions
        });

    } catch (error: any) {
        console.error('Error fetching questions:', error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Failed to fetch questions', details: String(error) },
            { status: 500 }
        );
    }
}
