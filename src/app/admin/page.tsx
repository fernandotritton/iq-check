'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface PendingPayment {
    id: string;
    sessionId: string;
    amount: string;
    method: string;
    timestamp: number;
    userEmail?: string;
}

export default function AdminPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [pendingPayments, setPendingPayments] = useState<PendingPayment[]>([]);
    const [loading, setLoading] = useState(false);

    // Simple password check (in production, use proper authentication)
    const ADMIN_PASSWORD = 'iqcheck2024'; // Cambia esto por tu password

    const handleLogin = () => {
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            localStorage.setItem('admin_auth', 'true');
            fetchPendingPayments();
        } else {
            alert('Contraseña incorrecta');
        }
    };

    useEffect(() => {
        // Check if already authenticated
        const isAuth = localStorage.getItem('admin_auth') === 'true';
        if (isAuth) {
            setIsAuthenticated(true);
            fetchPendingPayments();
        }
    }, []);

    const fetchPendingPayments = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/admin/pending-payments');
            const data = await response.json();
            if (data.success) {
                setPendingPayments(data.payments);
            }
        } catch (error) {
            console.error('Error fetching pending payments:', error);
        }
        setLoading(false);
    };

    const handleApprove = async (sessionId: string) => {
        if (!confirm('¿Confirmar aprobación de este pago?')) return;

        try {
            const response = await fetch('/api/admin/approve-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId })
            });

            const data = await response.json();

            if (data.success) {
                alert('Pago aprobado exitosamente');
                fetchPendingPayments(); // Refresh list
            } else {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            console.error('Error approving payment:', error);
            alert('Error al aprobar el pago');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_auth');
        setIsAuthenticated(false);
        setPassword('');
    };

    // Login screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md"
                >
                    <div className="text-center mb-8">
                        <div className="text-6xl mb-4">🔐</div>
                        <h1 className="text-3xl font-bold text-primary">Panel de Admin</h1>
                        <p className="text-gray-600 mt-2">IQCheck - Gestión de Pagos</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-secondary focus:outline-none"
                                placeholder="Ingresa tu contraseña"
                            />
                        </div>

                        <button
                            onClick={handleLogin}
                            className="w-full px-6 py-3 bg-secondary text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Admin dashboard
    return (
        <div className="min-h-screen bg-background py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-primary">Panel de Admin</h1>
                            <p className="text-gray-600 mt-1">Gestión de Pagos Crypto</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={fetchPendingPayments}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                            >
                                🔄 Actualizar
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="text-3xl mb-2">⏳</div>
                        <div className="text-2xl font-bold text-gray-800">{pendingPayments.length}</div>
                        <div className="text-sm text-gray-600">Pagos Pendientes</div>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="text-3xl mb-2">💰</div>
                        <div className="text-2xl font-bold text-gray-800">
                            ${(pendingPayments.length * 1.49).toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">Total Pendiente</div>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="text-3xl mb-2">🇻🇪</div>
                        <div className="text-2xl font-bold text-gray-800">USDT</div>
                        <div className="text-sm text-gray-600">TRC20 (Tron)</div>
                    </div>
                </div>

                {/* Pending Payments Table */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Pagos Pendientes</h2>

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">⏳</div>
                            <p className="text-gray-600">Cargando...</p>
                        </div>
                    ) : pendingPayments.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">✅</div>
                            <p className="text-gray-600">No hay pagos pendientes</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                            Fecha
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                            Session ID
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                            Monto
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                            Método
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {pendingPayments.map((payment) => (
                                        <tr key={payment.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-4 text-sm text-gray-600">
                                                {new Date(payment.timestamp).toLocaleString('es-ES')}
                                            </td>
                                            <td className="px-4 py-4">
                                                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                    {payment.sessionId.substring(0, 12)}...
                                                </code>
                                            </td>
                                            <td className="px-4 py-4 text-sm font-semibold text-gray-800">
                                                ${payment.amount} USD
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                                                    {payment.method}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <button
                                                    onClick={() => handleApprove(payment.sessionId)}
                                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all text-sm font-semibold"
                                                >
                                                    ✓ Aprobar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
