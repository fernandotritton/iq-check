'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto text-center"
            >
                {/* Brain Illustration Placeholder */}
                <div className="mb-8 flex justify-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-primary-light to-secondary rounded-full flex items-center justify-center">
                        <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
                    IQCheck: Descubre tu Verdadero Potencial{' '}
                    <span className="text-primary-light">Cognitivo</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-600 mb-4">
                    Evaluación profesional en solo 15 minutos
                </p>

                {/* Social Proof */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="flex -space-x-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-2 border-white"
                            />
                        ))}
                    </div>
                    <p className="text-sm text-gray-500">
                        <span className="font-semibold text-primary">14,203</span> personas evaluadas hoy
                    </p>
                </div>

                {/* CTA Button */}
                <Link href="/test">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full md:w-auto px-12 py-4 bg-secondary text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all shimmer-effect relative overflow-hidden"
                    >
                        <span className="relative z-10">Iniciar Test Certificado</span>
                    </motion.button>
                </Link>

                {/* Footer Note */}
                <p className="mt-6 text-sm text-gray-400">
                    Basado en matrices progresivas estándar. No requiere tarjeta de crédito para iniciar
                </p>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-16 flex flex-wrap justify-center gap-8 opacity-40"
            >
                {['THE GLOBE AND MAIL', 'BENZINGA', 'barchart', 'yahoo!'].map((brand) => (
                    <div key={brand} className="text-gray-400 font-semibold text-sm">
                        {brand}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
