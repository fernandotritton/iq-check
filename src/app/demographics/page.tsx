'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function DemographicsPage() {
    const router = useRouter();
    const [age, setAge] = useState('');
    const [education, setEducation] = useState('');
    const [gender, setGender] = useState('');
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

            const response = await fetch('/api/demographics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionId,
                    age: parseInt(age),
                    education,
                    gender,
                }),
            });

            const data = await response.json();

            if (data.success) {
                router.push('/calculating');
            } else {
                console.error('Error saving demographics:', data.error);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error submitting demographics:', error);
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
                    <h1 className="text-3xl font-bold text-primary mb-2">
                        Casi terminamos...
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Necesitamos algunos datos para calibrar tu puntuación de CI con precisión.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Age */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Edad
                            </label>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required
                                min="10"
                                max="120"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-light focus:outline-none transition-colors"
                                placeholder="Ej: 25"
                            />
                        </div>

                        {/* Education */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Nivel de Educación
                            </label>
                            <select
                                value={education}
                                onChange={(e) => setEducation(e.target.value)}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-light focus:outline-none transition-colors"
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="high_school">Secundaria</option>
                                <option value="university">Universidad</option>
                                <option value="postgraduate">Postgrado</option>
                                <option value="other">Otro</option>
                            </select>
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Género
                            </label>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-light focus:outline-none transition-colors"
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="male">Masculino</option>
                                <option value="female">Femenino</option>
                                <option value="other">Otro</option>
                                <option value="prefer_not_to_say">Prefiero no decir</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 bg-secondary text-white font-bold rounded-lg shadow-lg hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Guardando...' : 'Continuar'}
                        </motion.button>
                    </form>

                    <p className="text-xs text-gray-400 text-center mt-6">
                        🔒 Tus datos están seguros y encriptados
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
