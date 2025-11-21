import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { emailCaptureSchema } from '@/lib/validation';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const validation = emailCaptureSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { success: false, error: validation.error.issues },
                { status: 400 }
            );
        }

        const { sessionId, email } = validation.data;

        // 1. Check if user exists, if not create one
        let userId: string;

        const { data: existingUser } = await supabase
            .from('User')
            .select('id')
            .eq('email', email)
            .single();

        if (existingUser) {
            userId = existingUser.id;
        } else {
            const { data: newUser, error: createError } = await supabase
                .from('User')
                .insert({ email, id: crypto.randomUUID() })
                .select('id')
                .single();

            if (createError) throw createError;
            userId = newUser.id;
        }

        // 2. Update session with userId
        const { error: updateError } = await supabase
            .from('TestSession')
            .update({ userId })
            .eq('id', sessionId);

        if (updateError) throw updateError;

        return NextResponse.json({
            success: true
        });

    } catch (error) {
        console.error('Error saving email:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to save email' },
            { status: 500 }
        );
    }
}
