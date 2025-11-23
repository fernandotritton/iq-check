'use client';

import { useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';

function PendingContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        // Store pending payment info in localStorage
        if (sessionId) {
            localStorage.setItem('pending_payment', JSON.stringify({
                sessionId,
                method: 'crypto',
                timestamp: Date.now()
            }));
        }
    }, [sessionId]);

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="text-8xl mb-6"
                >
                    ⏳
                </motion.div>

                <h1 className="text-3xl font-bold text-primary mb-4">
                    ¡Pago en Verificación!
                </h1>

                <p className="text-gray-600 mb-6">
                    Hemos recibido tu comprobante de pago. Verificaremos la transacción y activaremos tu acceso en los próximos <span className="font-bold text-secondary">5 minutos</span>.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 text-left">
                    <p className="text-sm text-blue-800">
                        <strong>¿Qué hacer ahora?</strong>
                    </p>
                    <ul className="text-sm text-blue-700 mt-2 space-y-1">
                        <li>✓ Guarda esta página en favoritos</li>
                        <li>✓ Recibirás un email cuando se active</li>
                        <li>✓ Puedes cerrar esta ventana</li>
                    </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-xs text-gray-500 mb-1">ID de Sesión:</p>
                    <code className="text-sm text-gray-700 font-mono">{sessionId}</code>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => router.push('/')}
                        className="w-full px-6 py-3 bg-secondary text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all"
                    >
                        Volver al Inicio
                    </button>
                    <button
                        onClick={() => router.push(`/results?session_id=${sessionId}`)}
                        className="w-full px-6 py-3 border-2 border-secondary text-secondary rounded-lg font-semibold hover:bg-secondary hover:text-white transition-all"
                    >
                        Ver Mis Resultados
                    </button>
                </div>

                <p className="text-xs text-gray-400 mt-6">
                    Si tienes algún problema, contáctanos a support@iqcheck.com
                </p>
            </motion.div>
        </div>
    );
}

export default function PendingPaymentPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-6xl">⏳</div>
            </div>
        }>
            <PendingContent />
        </Suspense>
    );
}
