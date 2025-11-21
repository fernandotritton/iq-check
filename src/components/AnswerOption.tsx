import React from 'react';

interface AnswerOptionProps {
    questionNumber: number;
    optionIndex: number;
    difficulty: number;
}

export const AnswerOption: React.FC<AnswerOptionProps> = ({ questionNumber, optionIndex, difficulty }) => {
    // La respuesta correcta varía según la pregunta
    const correctAnswer = (questionNumber * 3 + 2) % 6; // Algoritmo simple para variar respuestas
    const isCorrect = optionIndex === correctAnswer;

    // Patrones fáciles (1-10)
    if (difficulty <= 2) {
        // La respuesta correcta es un círculo naranja grande
        if (isCorrect) {
            return (
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <rect width="100" height="100" fill="white" />
                    <circle cx="50" cy="50" r="30" fill="#F59E0B" />
                </svg>
            );
        }

        // Opciones incorrectas
        const wrongOptions = [
            <circle cx="50" cy="50" r="20" fill="#F59E0B" />, // Muy pequeño
            <circle cx="50" cy="50" r="35" fill="#F59E0B" />, // Muy grande
            <circle cx="50" cy="50" r="30" fill="#2563EB" />, // Color incorrecto
            <circle cx="50" cy="50" r="30" fill="#10B981" />, // Color incorrecto
            <rect x="20" y="20" width="60" height="60" fill="#F59E0B" />, // Forma incorrecta
        ];

        return (
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect width="100" height="100" fill="white" />
                {wrongOptions[optionIndex % wrongOptions.length]}
            </svg>
        );
    }

    // Patrones medios (11-20)
    if (difficulty <= 5) {
        if (isCorrect) {
            return (
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <rect width="100" height="100" fill="white" />
                    <circle cx="50" cy="50" r="25" fill="none" stroke="#F59E0B" strokeWidth="3" strokeDasharray="8,4" />
                </svg>
            );
        }

        const wrongOptions = [
            <circle cx="50" cy="50" r="25" fill="none" stroke="#F59E0B" strokeWidth="3" />,
            <circle cx="50" cy="50" r="25" fill="none" stroke="#2563EB" strokeWidth="3" strokeDasharray="8,4" />,
            <rect x="25" y="25" width="50" height="50" fill="none" stroke="#F59E0B" strokeWidth="3" strokeDasharray="8,4" />,
            <polygon points="50,20 80,80 20,80" fill="none" stroke="#F59E0B" strokeWidth="3" strokeDasharray="8,4" />,
            <circle cx="50" cy="50" r="25" fill="#F59E0B" opacity="0.3" />,
        ];

        return (
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect width="100" height="100" fill="white" />
                {wrongOptions[optionIndex % wrongOptions.length]}
            </svg>
        );
    }

    // Patrones difíciles (21-30)
    if (isCorrect) {
        return (
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect width="100" height="100" fill="white" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="#2563EB" strokeWidth="2" />
                <rect x="30" y="30" width="40" height="40" fill="none" stroke="#10B981" strokeWidth="2" />
                <polygon points="50,25 70,75 30,75" fill="#F59E0B" opacity="0.5" />
            </svg>
        );
    }

    const wrongOptions = [
        <>
            <circle cx="50" cy="50" r="20" fill="none" stroke="#2563EB" strokeWidth="2" />
            <rect x="30" y="30" width="40" height="40" fill="none" stroke="#10B981" strokeWidth="2" />
        </>,
        <>
            <circle cx="50" cy="50" r="20" fill="none" stroke="#F59E0B" strokeWidth="2" />
            <rect x="30" y="30" width="40" height="40" fill="none" stroke="#10B981" strokeWidth="2" />
            <polygon points="50,25 70,75 30,75" fill="#2563EB" opacity="0.5" />
        </>,
        <>
            <circle cx="50" cy="50" r="25" fill="none" stroke="#2563EB" strokeWidth="2" />
            <rect x="25" y="25" width="50" height="50" fill="none" stroke="#10B981" strokeWidth="2" />
            <polygon points="50,25 70,75 30,75" fill="#F59E0B" opacity="0.5" />
        </>,
        <>
            <circle cx="50" cy="50" r="20" fill="none" stroke="#2563EB" strokeWidth="2" />
            <polygon points="50,25 70,75 30,75" fill="#F59E0B" opacity="0.5" />
        </>,
        <>
            <rect x="30" y="30" width="40" height="40" fill="none" stroke="#10B981" strokeWidth="2" />
            <polygon points="50,25 70,75 30,75" fill="#F59E0B" opacity="0.5" />
        </>,
    ];

    return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect width="100" height="100" fill="white" />
            {wrongOptions[optionIndex % wrongOptions.length]}
        </svg>
    );
};
