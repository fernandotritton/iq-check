import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { sessionId, paymentMethod, amount, currency } = body;

        if (!sessionId) {
            return NextResponse.json({ success: false, error: 'Session ID required' }, { status: 400 });
        }

        console.log(`Processing payment for session: ${sessionId}`);

        // Update session as paid
        const { error: updateError } = await supabase
            .from('TestSession')
            .update({
                hasPaid: true,
                paidAt: new Date().toISOString(),
                amount: amount || 9.99,
                currency: currency || 'USD'
            })
            .eq('id', sessionId);

        if (updateError) {
            console.error('Error updating session payment:', updateError);
            return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
        }

        // Create transaction record
        const { error: transactionError } = await supabase
            .from('Transaction')
            .insert({
                id: crypto.randomUUID(),
                sessionId,
                amount: amount || 9.99,
                currency: currency || 'USD',
                status: 'COMPLETED',
                paymentMethod: paymentMethod || 'card',
                externalId: `sim_${Date.now()}`
            });

        if (transactionError) {
            console.error('Error creating transaction:', transactionError);
            // Don't fail the request if transaction log fails, but log it
        }

        console.log('Payment confirmed successfully');
        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Payment confirmation error:', error);
        return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
    }
}
