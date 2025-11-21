'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import Link from 'next/link';

export default function ResultsPreviewPage() {
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutos en segundos
    const [country, setCountry] = useState('VE'); // Detectado por IP en producción

    // Countdown timer and Country Detection
    useEffect(() => {
        // Timer
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Detect Country
        const detectCountry = async () => {
            try {
                const res = await fetch('https://ipapi.co/json/');
                const data = await res.json();
                if (data.country_code) {
                    setCountry(data.country_code);
                }
            } catch (error) {
                console.error('Failed to detect country, using default (VE/US)', error);
            }
        };

        detectCountry();

        return () => clearInterval(timer);
    }, []);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    // Precios por país (PPP)
    const pricing = {
        VE: { currency: 'Bs.', price: '258.00', original: '1,705.89', flag: '🇻🇪' },
        MX: { currency: '$', price: '99.00', original: '299.00', flag: '🇲🇽' },
        CO: { currency: '$', price: '19,900', original: '49,900', flag: '🇨🇴' },
        ES: { currency: '€', price: '9.99', original: '29.99', flag: '🇪🇸' },
        US: { currency: '$', price: '9.99', original: '29.99', flag: '🇺🇸' },
    };

    const currentPrice = pricing[country as keyof typeof pricing] || pricing.US;

    return (
        <div className="min-h-screen bg-background py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Urgency Banner */}
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-4 mb-8 text-center sticky top-4 z-10 shadow-lg"
                >
                    <p className="font-semibold">
                        ⏰ ¡Consigue tu puntuación de CI por solo {currentPrice.currency}{currentPrice.price}! La oferta finaliza en{' '}
                        <span className="font-mono text-xl">
                            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                        </span>
                    </p>
                </motion.div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl font-bold text-primary mb-2">
                        ¡Tu puntuación está lista!
                    </h1>
                    <p className="text-xl text-gray-600">
                        Desbloquea tu CI ahora
                    </p>
                </motion.div>

                {/* Blurred Result Preview */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 relative overflow-hidden">
                    {/* Blur Overlay */}
                    <div className="absolute inset-0 backdrop-blur-md bg-white/30 z-10 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-6xl mb-4">🔒</div>
                            <p className="text-2xl font-bold text-primary mb-2">Resultado Bloqueado</p>
                            <p className="text-gray-600">Desbloquea para ver tu CI exacto</p>
                        </div>
                    </div>

                    {/* Blurred Content */}
                    <div className="filter blur-sm select-none">
                        <div className="text-center mb-8">
                            <div className="text-8xl font-bold text-primary mb-2">1??</div>
                            <p className="text-2xl text-gray-600">Muy Superior</p>
                        </div>

                        {/* Radar Chart Placeholder */}
                        <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
                            <p className="text-gray-400">Gráfico de Categorías</p>
                        </div>
                    </div>
                </div>

                {/* Comparison */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-primary to-primary-light text-white rounded-2xl p-8 mb-8"
                >
                    <h2 className="text-2xl font-bold mb-4">Tu CI es superior al 85% de los usuarios</h2>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex-1 bg-white/20 rounded-full h-4">
                            <div className="bg-accent h-full rounded-full" style={{ width: '85%' }} />
                        </div>
                        <span className="text-2xl font-bold">85%</span>
                    </div>
                    <p className="text-white/90">
                        Comparado con {currentPrice.flag} usuarios en tu región
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Regular Price (Grayed Out) */}
                    <div className="bg-gray-100 rounded-2xl p-6 opacity-60">
                        <p className="text-sm text-gray-500 mb-2">Precio Regular</p>
                        <p className="text-3xl font-bold text-gray-400 line-through mb-4">
                            {currentPrice.currency}{currentPrice.original}
                        </p>
                        <p className="text-sm text-gray-500">Acceso Estándar</p>
                    </div>

                    {/* Special Offer (Highlighted) */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-accent to-yellow-500 rounded-2xl p-6 relative overflow-hidden border-4 border-accent shadow-2xl"
                    >
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            OFERTA HOY
                        </div>
                        <p className="text-sm text-white/90 mb-2">Vence hoy</p>
                        <p className="text-5xl font-bold text-white mb-4">
                            {currentPrice.currency}{currentPrice.price}
                        </p>
                        <p className="text-white/90 mb-6">Acceso Completo + Reporte PDF</p>

                        <Link href="/checkout" className="w-full block">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full py-4 bg-white text-orange-700 font-bold rounded-lg shadow-lg shimmer-effect text-center cursor-pointer"
                            >
                                ¡Ver mi puntuación de CI!
                            </motion.div>
                        </Link>
                    </motion.div>
                </div>

                {/* What's Included */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-primary mb-6">Reporte Personal de CI</h3>
                    <p className="text-gray-600 mb-6">
                        Tus resultados revelan información fascinante sobre tus fortalezas cognitivas y tu potencial oculto. Con puntuaciones que te colocan entre los mejores en áreas clave, tus habilidades en Lógica y Reconocimiento de Patrones son realmente excepcionales:
                    </p>

                    <div className="space-y-4">
                        {[
                            'Puntuación exacta de CI calibrada por edad',
                            'Desglose detallado por categorías cognitivas',
                            'Comparativa con población global y local',
                            'Recomendaciones de carreras según tu perfil',
                            'Certificado descargable en PDF',
                        ].map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="text-gray-700">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500 mb-4">MYIQ HA SIDO PRESENTADO EN</p>
                    <div className="flex flex-wrap justify-center gap-6 opacity-40">
                        {['THE GLOBE AND MAIL', 'BENZINGA', 'barchart', 'yahoo!'].map((brand) => (
                            <div key={brand} className="text-gray-400 font-semibold text-xs">
                                {brand}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
