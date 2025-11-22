'use client';

import { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

import { jsPDF } from 'jspdf';

function ResultsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    useEffect(() => {
        // Check if coming from successful payment
        if (searchParams.get('payment_success') === 'true') {
            setPaymentSuccess(true);
            // Clear the URL param after 5 seconds
            setTimeout(() => setPaymentSuccess(false), 5000);
        }

        async function fetchResults() {
            try {
                const sessionId = localStorage.getItem('test_session_id');

                if (!sessionId) {
                    router.push('/test');
                    return;
                }

                const response = await fetch(`/api/results/${sessionId}`);
                const data = await response.json();

                if (data.success && data.hasPaid) {
                    setResult(data.result);
                } else {
                    // User hasn't paid, redirect to paywall
                    router.push('/results-preview');
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching results:', error);
                setLoading(false);
            }
        }

        fetchResults();
    }, [router, searchParams]);

    const handleDownloadPDF = () => {
        if (!result) return;

        const doc = new jsPDF();

        // Header
        doc.setFontSize(22);
        doc.setTextColor(40, 40, 40);
        doc.text("Certificado de Coeficiente Intelectual", 105, 40, { align: "center" });

        doc.setFontSize(16);
        doc.text("IQCheck Platform", 105, 50, { align: "center" });

        doc.setLineWidth(0.5);
        doc.line(20, 60, 190, 60);

        doc.setFontSize(14);
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 80);

        // Main Score
        doc.setFontSize(24);
        doc.setTextColor(37, 99, 235); // Primary Blue
        doc.text(`IQ: ${result.iq}`, 105, 90, { align: "center" });

        doc.setFontSize(18);
        doc.setTextColor(40, 40, 40);
        doc.text(`${result.classification}`, 105, 105, { align: "center" });

        doc.setFontSize(14);
        doc.text(`Percentil: Superior al ${result.percentile}%`, 105, 115, { align: "center" });

        // Breakdown
        doc.text("Desglose de Habilidades:", 20, 140);
        let y = 150;

        const categories = {
            logica: "Lógica Matemática",
            memoria: "Memoria Visual",
            patrones: "Reconocimiento de Patrones",
            velocidad: "Velocidad de Procesamiento"
        };

        Object.entries(result.categoryBreakdown).forEach(([key, value]) => {
            const label = categories[key as keyof typeof categories] || key;
            y += 10;
        });

        // Footer
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text("Este documento certifica los resultados obtenidos en la prueba IQCheck.", 105, 280, { align: "center" });

        doc.save("IQCheck_Certificado.pdf");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">⏳</div>
                    <p className="text-xl text-gray-600">Cargando tus resultados...</p>
                </div>
            </div>
        );
    }

    if (!result) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <p className="text-xl text-gray-600">No se encontraron resultados</p>
                </div>
            </div>
        );
    }

    const radarData = [
        { category: 'Lógica', value: Math.max(10, result.categoryBreakdown.logica || 50) },
        { category: 'Memoria', value: Math.max(10, result.categoryBreakdown.memoria || 50) },
        { category: 'Patrones', value: Math.max(10, result.categoryBreakdown.patrones || 50) },
        { category: 'Velocidad', value: Math.max(10, result.categoryBreakdown.velocidad || 50) },
    ];

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Payment Success Banner */}
                {paymentSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-green-50 border-2 border-green-500 rounded-lg p-4 mb-6 text-center"
                    >
                        <div className="text-green-600 font-semibold text-lg">
                            ✅ ¡Pago confirmado! Gracias por tu compra.
                        </div>
                    </motion.div>
                )}

                {/* Success Animation */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <div className="text-8xl mb-4">🎉</div>
                    <h1 className="text-4xl font-bold text-primary mb-2">
                        ¡Felicitaciones!
                    </h1>
                    <p className="text-xl text-gray-600">
                        Tu análisis completo está listo
                    </p>
                </motion.div>

                {/* IQ Score Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-primary to-primary-light text-white rounded-2xl p-12 mb-8 text-center shadow-2xl"
                >
                    <p className="text-xl mb-4 opacity-90">Tu Coeficiente Intelectual</p>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, type: 'spring' }}
                        className="text-9xl font-bold mb-4"
                    >
                        {result.iq}
                    </motion.div>
                    <p className="text-3xl font-semibold mb-2">{result.classification}</p>
                    <p className="text-lg opacity-90">{result.description}</p>

                    <div className="mt-8 bg-white/20 rounded-lg p-4">
                        <p className="text-sm mb-2">Percentil</p>
                        <p className="text-2xl font-bold">
                            Superior al {result.percentile}% de la población
                        </p>
                    </div>
                </motion.div>

                {/* Radar Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl shadow-lg p-8 mb-8"
                >
                    <h2 className="text-2xl font-bold text-primary mb-6 text-center">
                        Desglose por Categorías Cognitivas
                    </h2>

                    <ResponsiveContainer width="100%" height={400}>
                        <RadarChart data={radarData}>
                            <PolarGrid stroke="#e5e7eb" />
                            <PolarAngleAxis dataKey="category" tick={{ fill: '#6b7280', fontSize: 14 }} />
                            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9ca3af' }} />
                            <Radar
                                name="Tu Perfil"
                                dataKey="value"
                                stroke="#2563EB"
                                fill="#2563EB"
                                fillOpacity={0.6}
                            />
                        </RadarChart>
                    </ResponsiveContainer>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        {Object.entries(result.categoryBreakdown).map(([key, value]) => (
                            <div key={key} className="text-center">
                                <div className="text-3xl font-bold text-primary">{value as number}%</div>
                                <div className="text-sm text-gray-600 capitalize">{key}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Actions */}
                <div className="grid md:grid-cols-2 gap-4">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleDownloadPDF}
                        className="py-4 bg-secondary text-white font-semibold rounded-lg shadow-lg flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Descargar Certificado PDF
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="py-4 bg-primary text-white font-semibold rounded-lg shadow-lg flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        Compartir Resultado
                    </motion.button>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-500 text-sm mt-8">
                    Gracias por confiar en IQCheck. Tu certificado ha sido enviado a tu email.
                </p>
            </div>
        </div>
    );
}

export default function ResultsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">⏳</div>
                    <p className="text-xl text-gray-600">Cargando resultados...</p>
                </div>
            </div>
        }>
            <ResultsContent />
        </Suspense>
    );
}
