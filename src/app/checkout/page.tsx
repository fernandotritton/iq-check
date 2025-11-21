'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState('');

    const handlePayment = async () => {
        const sessionId = localStorage.getItem('test_session_id');
        if (!sessionId) {
            alert('Sesión no encontrada. Por favor reinicia el test.');
            return;
        }

        try {
            // Simulate payment processing delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Confirm payment to backend
            const response = await fetch('/api/payment/confirm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId,
                    paymentMethod,
                    amount: 9.99, // In a real app, this comes from the selected price
                    currency: 'USD'
                })
            });

            const data = await response.json();

            if (data.success) {
                router.push('/results');
            } else {
                console.error('Payment failed:', data.error);
                alert('Error procesando el pago. Intenta de nuevo.');
            }
        } catch (error) {
            console.error('Payment error:', error);
            alert('Error de conexión.');
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
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setPaymentMethod('paypal')}
                            className={`w-full p-4 border-2 rounded-lg flex items-center justify-center gap-3 transition-all ${paymentMethod === 'paypal' ? 'border-primary-light bg-blue-50' : 'border-gray-200'
                                }`}
                        >
                            <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center text-white font-bold">
                                PP
                            </div>
                            <span className="font-semibold">PayPal</span>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setPaymentMethod('gpay')}
                            className={`w-full p-4 border-2 rounded-lg flex items-center justify-center gap-3 transition-all ${paymentMethod === 'gpay' ? 'border-primary-light bg-blue-50' : 'border-gray-200'
                                }`}
                        >
                            <div className="w-12 h-12 bg-black rounded flex items-center justify-center text-white font-bold">
                                G
                            </div>
                            <span className="font-semibold">Google Pay</span>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setPaymentMethod('card')}
                            className={`w-full p-4 border-2 rounded-lg flex items-center justify-center gap-3 transition-all ${paymentMethod === 'card' ? 'border-primary-light bg-blue-50' : 'border-gray-200'
                                }`}
                        >
                            <div className="w-12 h-12 bg-secondary rounded flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            </div>
                            <span className="font-semibold">Tarjeta de crédito o débito</span>
                        </motion.button>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                        <h3 className="font-semibold text-gray-700 mb-4">Resumen del pedido</h3>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Reporte Personal de CI</span>
                            <span className="font-semibold">Bs. 258.00</span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span className="text-secondary">Bs. 258.00</span>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handlePayment}
                        disabled={!paymentMethod}
                        className="w-full py-4 bg-secondary text-white font-bold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Completar Pago
                    </motion.button>

                    <p className="text-xs text-gray-400 text-center mt-4">
                        Pago seguro y encriptado. Tus datos están protegidos.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
