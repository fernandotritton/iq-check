'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const loadingMessages = [
    'Analizando patrones cognitivos...',
    'Procesando velocidad de respuesta...',
    'Comparando con base de datos global...',
    'Calibrando por edad y educación...',
    'Generando perfil de inteligencia...',
];

export default function CalculatingPage() {
    const router = useRouter();
    const [messageIndex, setMessageIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Cambiar mensaje cada 1.5 segundos
        const messageInterval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
        }, 1500);

        // Incrementar progreso
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    clearInterval(messageInterval);
                    // Ir a captura de email después de 6-8 segundos
                    setTimeout(() => router.push('/email'), 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 120);

        return () => {
            clearInterval(messageInterval);
            clearInterval(progressInterval);
        };
    }, [router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary to-primary-light flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full text-center"
            >
                {/* Animated Circle */}
                <div className="relative w-48 h-48 mx-auto mb-8">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="8"
                        />
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="white"
                            strokeWidth="8"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: progress / 100 }}
                            style={{
                                transformOrigin: 'center',
                                transform: 'rotate(-90deg)',
                            }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">{progress}%</span>
                    </div>
                </div>

                {/* Loading Message */}
                <motion.div
                    key={messageIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-white text-xl font-medium"
                >
                    {loadingMessages[messageIndex]}
                </motion.div>

                <div className="mt-4 flex justify-center gap-2">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 bg-white rounded-full"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
