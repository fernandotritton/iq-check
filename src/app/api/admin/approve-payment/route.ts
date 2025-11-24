import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const { sessionId } = await request.json();

        if (!sessionId) {
            return NextResponse.json(
                { success: false, error: 'Session ID is required' },
                { status: 400 }
            );
        }

        // Update the test session to mark as paid
        const { error: updateError } = await supabase
            .from('TestSession')
            .update({
                hasPaid: true,
                paidAt: new Date().toISOString()
            })
            .eq('id', sessionId);

        if (updateError) {
            console.error('Supabase update error:', updateError);
            throw updateError;
        }

        // Optionally, create a transaction record
        const { error: txError } = await supabase
            .from('Transaction')
            .insert({
                testSessionId: sessionId,
                amount: 1.49,
                currency: 'USD',
                paymentMethod: 'crypto',
                status: 'completed',
                stripeSessionId: null, // null for crypto payments
                createdAt: new Date().toISOString()
            });

        if (txError) {
            console.warn('Transaction record creation failed:', txError);
            // Don't fail the approval if transaction record fails
        }

        return NextResponse.json({
            success: true,
            message: 'Payment approved successfully'
        });

    } catch (error: any) {
        console.error('Error approving payment:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to approve payment' },
            { status: 500 }
        );
    }
}
