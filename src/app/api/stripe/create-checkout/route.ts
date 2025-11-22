import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
    try {
        // Hardcoded for immediate fix - test key only
        const stripeKey = 'sk_test_51STcPSDdeEmV7Ahs8qFfXLZrNUj8uXTgcrGzMeahCt3owOzvSlgsA7bWXsT8Ss7xSuiUcuJ0AlmJiYuJbDFoMIfm00NeMztjYv';
        const stripe = new Stripe(stripeKey, {
            apiVersion: '2025-11-17.clover',
        });

        const { sessionId } = await request.json();

        if (!sessionId) {
            return NextResponse.json(
                { success: false, error: 'Session ID is required' },
                { status: 400 }
            );
        }

        // Create Stripe Checkout Session
        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'IQCheck - Informe Completo de CI',
                            description: 'Acceso completo a tu análisis de coeficiente intelectual con certificado PDF descargable',
                            images: ['https://iq-check-umdy.vercel.app/og-image.png'], // Opcional: agrega una imagen
                        },
                        unit_amount: 499, // $4.99 USD en centavos
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://iq-check-umdy.vercel.app'}/results?session_id=${sessionId}&payment_success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://iq-check-umdy.vercel.app'}/checkout?session_id=${sessionId}&payment_cancelled=true`,
            metadata: {
                testSessionId: sessionId,
            },
        });

        return NextResponse.json({
            success: true,
            checkoutUrl: checkoutSession.url,
        });

    } catch (error: any) {
        console.error('Stripe checkout error:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
