'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState('stripe');
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        const sessionId = localStorage.getItem('test_session_id');
        if (!sessionId) {
            alert('Sesión no encontrada. Por favor reinicia el test.');
            return;
        }

        setLoading(true);

        // If crypto payment, redirect to crypto payment page
        if (paymentMethod === 'crypto') {
            router.push(`/checkout/crypto?session_id=${sessionId}`);
            return;
        }

        try {
            // Create Stripe checkout session
            const response = await fetch('/api/stripe/create-checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId })
            });

            const data = await response.json();

            if (data.success && data.checkoutUrl) {
                // Redirect to Stripe checkout
                window.location.href = data.checkoutUrl;
            } else {
                console.error('Checkout creation failed:', data.error);
                alert(`Error: ${data.error || 'No se pudo iniciar el pago'}`);
                setLoading(false);
            }
        } catch (error) {
            console.error('Payment error:', error);
            alert('Error de conexión.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg p-8"
                >
                    <h1 className="text-3xl font-bold text-primary mb-6">
                        Elige tu forma de pago
                    </h1>

                    {/* Payment Methods */}
                    <div className="space-y-4 mb-8">
                        {/* Stripe Card Payment */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setPaymentMethod('stripe')}
                            className={`w-full p-4 border-2 rounded-lg flex items-center justify-between transition-all ${paymentMethod === 'stripe' ? 'border-secondary bg-green-50' : 'border-gray-200'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-secondary rounded flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold">Tarjeta de Crédito/Débito</div>
                                    <div className="text-sm text-gray-500">Stripe - Internacional</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-lg">$4.99</div>
                                <div className="text-xs text-gray-500">USD</div>
                            </div>
                        </motion.button>

                        {/* Crypto Payment (Venezuela) */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setPaymentMethod('crypto')}
                            className={`w-full p-4 border-2 rounded-lg flex items-center justify-between transition-all ${paymentMethod === 'crypto' ? 'border-secondary bg-green-50' : 'border-gray-200'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded flex items-center justify-center text-white font-bold">
                                    ₮
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold">USDT (TRC20)</div>
                                    <div className="text-sm text-gray-500">Binance - Venezuela 🇻🇪</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-lg">$1.49</div>
                                <div className="text-xs text-gray-500">USD</div>
                            </div>
                        </motion.button>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                        <h3 className="font-semibold text-gray-700 mb-4">Resumen del pedido</h3>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Informe Completo de CI</span>
                            <span className="font-semibold">{paymentMethod === 'crypto' ? '$1.49' : '$4.99'} USD</span>
                        </div>
                        {paymentMethod === 'crypto' && (
                            <div className="flex justify-between mb-2 text-sm text-green-600">
                                <span>Descuento Venezuela 🇻🇪</span>
                                <span>-$3.50</span>
                            </div>
                        )}
                        <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span className="text-secondary">{paymentMethod === 'crypto' ? '$1.49' : '$4.99'} USD</span>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <motion.button
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                        onClick={handlePayment}
                        disabled={loading}
                        className="w-full py-4 bg-secondary text-white font-bold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Redirigiendo a pago seguro...' : 'Proceder al Pago'}
                    </motion.button>

                    <p className="text-xs text-gray-400 text-center mt-4">
                        Pago seguro y encriptado. Tus datos están protegidos.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
