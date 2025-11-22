import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        // Initialize Stripe inside the function to avoid build-time errors
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: '2024-11-20.acacia',
        });

        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

        const body = await request.text();
        const signature = request.headers.get('stripe-signature');

        if (!signature) {
            return NextResponse.json(
                { error: 'No signature' },
                { status: 400 }
            );
        }

        let event: Stripe.Event;

        // Only verify webhook signature if webhook secret is configured
        if (webhookSecret) {
            try {
                event = stripe.webhooks.constructEvent(
                    body,
                    signature,
                    webhookSecret
                );
            } catch (err: any) {
                console.error('Webhook signature verification failed:', err.message);
                return NextResponse.json(
                    { error: `Webhook Error: ${err.message}` },
                    { status: 400 }
                );
            }
        } else {
            // If no webhook secret, parse the body directly (for testing)
            event = JSON.parse(body) as Stripe.Event;
        }

        // Handle the checkout.session.completed event
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session;
            const testSessionId = session.metadata?.testSessionId;

            if (testSessionId) {
                // Update TestSession to mark as paid
                const { error: sessionError } = await supabase
                    .from('TestSession')
                    .update({ hasPaid: true })
                    .eq('id', testSessionId);

                if (sessionError) {
                    console.error('Error updating session:', sessionError);
                }

                // Create Transaction record
                const { error: transactionError } = await supabase
                    .from('Transaction')
                    .insert({
                        id: crypto.randomUUID(),
                        sessionId: testSessionId,
                        amount: (session.amount_total || 0) / 100, // Convert from cents
                        currency: session.currency || 'usd',
                        status: 'completed',
                        paymentMethod: 'stripe',
                        stripePaymentId: session.payment_intent as string,
                        createdAt: new Date().toISOString(),
                    });

                if (transactionError) {
                    console.error('Error creating transaction:', transactionError);
                }

                console.log(`Payment confirmed for session: ${testSessionId}`);
            }
        }

        return NextResponse.json({ received: true });

    } catch (error: any) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
