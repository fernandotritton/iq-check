'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import QRCode from 'qrcode';

function CryptoPaymentContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [qrCode, setQrCode] = useState('');
    const [copied, setCopied] = useState(false);
    const [uploading, setUploading] = useState(false);

    const walletAddress = 'TCLYMknPcygcEPMG9xxbk74cDWPPtQAWbc';
    const amount = '1.49';
    const network = 'TRC20 (Tron)';

    useEffect(() => {
        // Generate QR code
        QRCode.toDataURL(walletAddress, { width: 256 })
            .then(setQrCode)
            .catch(console.error);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(walletAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleProofUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);

        // For now, just navigate to a pending page
        // In the future, you can upload to a server
        setTimeout(() => {
            router.push(`/checkout/crypto/pending?session_id=${sessionId}`);
        }, 1000);
    };

    if (!sessionId) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-gray-600">Sesión no encontrada</p>
                    <button
                        onClick={() => router.push('/')}
                        className="mt-4 px-6 py-2 bg-secondary text-white rounded-lg"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg p-8"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="text-6xl mb-4">💰</div>
                        <h1 className="text-3xl font-bold text-primary mb-2">
                            Pago con Criptomonedas
                        </h1>
                        <p className="text-gray-600">
                            Envía <span className="font-bold text-secondary">${amount} USD</span> en USDT
                        </p>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-semibold text-gray-700">Red:</span>
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-bold">
                                {network}
                            </span>
                        </div>

                        {/* QR Code */}
                        {qrCode && (
                            <div className="bg-white p-4 rounded-lg mb-4 flex justify-center">
                                <img src={qrCode} alt="QR Code" className="w-64 h-64" />
                            </div>
                        )}

                        {/* Wallet Address */}
                        <div className="bg-white rounded-lg p-4">
                            <p className="text-xs text-gray-500 mb-2">Dirección de Wallet:</p>
                            <div className="flex items-center gap-2">
                                <code className="flex-1 text-sm bg-gray-100 p-2 rounded break-all">
                                    {walletAddress}
                                </code>
                                <button
                                    onClick={handleCopy}
                                    className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition-all whitespace-nowrap"
                                >
                                    {copied ? '✓ Copiado' : 'Copiar'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Warning */}
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                        <div className="flex items-start">
                            <svg className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <div>
                                <p className="text-sm font-semibold text-yellow-800">Importante:</p>
                                <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                                    <li>• Envía exactamente <strong>${amount} USD en USDT</strong></li>
                                    <li>• Usa la red <strong>{network}</strong> (no otra red)</li>
                                    <li>• Guarda el comprobante de transacción</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Upload Proof */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                        <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <h3 className="font-semibold text-gray-700 mb-2">
                            ¿Ya realizaste el pago?
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Sube una captura del comprobante de transacción
                        </p>
                        <label className="inline-block">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProofUpload}
                                className="hidden"
                            />
                            <span className="px-6 py-3 bg-secondary text-white rounded-lg cursor-pointer hover:bg-opacity-90 transition-all inline-block">
                                {uploading ? 'Subiendo...' : 'Subir Comprobante'}
                            </span>
                        </label>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Verificaremos tu pago y activaremos tu acceso en menos de 5 minutos
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

export default function CryptoPaymentPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-6xl">⏳</div>
            </div>
        }>
            <CryptoPaymentContent />
        </Suspense>
    );
}
