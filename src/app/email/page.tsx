'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function EmailPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const sessionId = localStorage.getItem('test_session_id');

            if (!sessionId) {
                console.error('No session ID found');
                router.push('/test');
                return;
            }

            const response = await fetch('/api/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionId,
                    email,
                }),
            });

            const data = await response.json();

            if (data.success) {
                router.push('/results-preview');
            } else {
                console.error('Error saving email:', data.error);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error submitting email:', error);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg p-8"
                >
                    {/* Teaser Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-gradient-to-br from-primary to-primary-light text-white rounded-xl p-6 text-center">
                            <div className="text-4xl font-bold mb-1">1??</div>
                            <div className="text-sm opacity-90">Tu CI</div>
                        </div>
                        <div className="bg-gradient-to-br from-secondary to-accent text-white rounded-xl p-6 text-center">
                            <div className="text-4xl font-bold mb-1">85%</div>
                            <div className="text-sm opacity-90">Percentil</div>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-primary mb-2">
                        ¡Tu resultado está listo!
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Ingresa tu email para recibir tu certificado y acceder a tu puntuación completa.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-light focus:outline-none transition-colors"
                                placeholder="tu@email.com"
                            />
                        </div>

                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 bg-secondary text-white font-bold rounded-lg shadow-lg hover:bg-secondary/90 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Enviando...' : 'Ver mi puntuación completa'}
                        </motion.button>
                    </form>

                    <div className="mt-8 space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-sm text-gray-600">Certificado PDF descargable</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-sm text-gray-600">Análisis detallado por categorías</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-sm text-gray-600">Comparativa con población global</p>
                        </div>
                    </div>

                    <p className="text-xs text-gray-400 text-center mt-6">
                        🔒 No spam. Solo tu resultado de CI.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
