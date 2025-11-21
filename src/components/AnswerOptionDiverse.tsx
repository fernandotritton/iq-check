import React from 'react';

interface AnswerOptionDiverseProps {
    questionNumber: number;
    optionIndex: number;
    difficulty: number;
}

export const AnswerOptionDiverse: React.FC<AnswerOptionDiverseProps> = ({ questionNumber, optionIndex, difficulty }) => {
    const questionType = questionNumber % 6;

    // Definir respuestas correctas
    const getCorrectAnswer = (qNum: number, qType: number): number => {
        // Algoritmo para determinar respuesta correcta
        return (qNum * 3 + qType + 2) % 6;
    };

    const correctAnswer = getCorrectAnswer(questionNumber, questionType);
    const isCorrect = optionIndex === correctAnswer;

    // TIPO 0: Secuencias Numéricas
    if (questionType === 0) {
        const sequences = [
            { options: [11, 12, 13, 14, 15, 16], correct: 12 },
            { options: [30, 35, 36, 40, 42, 45], correct: 36 },
            { options: [72, 84, 96, 108, 120, 132], correct: 96 },
            { options: [58, 59, 60, 61, 62, 63], correct: 60 },
            { options: [120, 140, 160, 180, 200, 220], correct: 160 },
        ];

        const current = sequences[questionNumber % sequences.length];
        const displayValue = current.options[optionIndex];

        return (
            <div className="w-full h-full flex items-center justify-center bg-white">
                <span className="text-4xl font-bold text-primary">{displayValue}</span>
            </div>
        );
    }

    // TIPO 1: Analogías Verbales
    if (questionType === 1) {
        const analogies = [
            { options: ["Escuela", "Oficina", "Casa", "Parque", "Tienda", "Calle"] },
            { options: ["Escuchar", "Ver", "Tocar", "Cantar", "Bailar", "Escribir"] },
            { options: ["Maullar", "Correr", "Saltar", "Dormir", "Comer", "Jugar"] },
            { options: ["Invierno", "Primavera", "Otoño", "Lluvia", "Frío", "Calor"] },
            { options: ["Zapato", "Calcetín", "Sandalia", "Bota", "Media", "Pantufla"] },
        ];

        const current = analogies[questionNumber % analogies.length];
        const displayValue = current.options[optionIndex];

        return (
            <div className="w-full h-full flex items-center justify-center bg-white p-2">
                <span className="text-lg font-semibold text-primary text-center leading-tight">
                    {displayValue}
                </span>
            </div>
        );
    }

    // TIPO 2: Operaciones Matemáticas
    if (questionType === 2) {
        const mathProblems = [
            { options: [28, 29, 30, 31, 32, 33] },
            { options: [50, 52, 54, 56, 58, 60] },
            { options: [18, 19, 20, 21, 22, 23] },
            { options: [23, 24, 25, 26, 27, 28] },
            { options: [32, 34, 36, 38, 40, 42] },
        ];

        const current = mathProblems[questionNumber % mathProblems.length];
        const displayValue = current.options[optionIndex];

        return (
            <div className="w-full h-full flex items-center justify-center bg-white">
                <span className="text-4xl font-bold text-secondary">{displayValue}</span>
            </div>
        );
    }

    // TIPO 3: Razonamiento Lógico
    if (questionType === 3) {
        const logicAnswers = [
            {
                options: [
                    "Algunos gatos vuelan",
                    "Ningún gato vuela",
                    "Todos los gatos vuelan",
                    "Los gatos no son animales",
                    "No se puede concluir",
                    "Algunos animales no vuelan"
                ]
            },
            {
                options: ["Pedro", "Juan", "María", "Todos iguales", "No se sabe", "María y Juan"]
            },
            {
                options: [
                    "Está lloviendo",
                    "No está lloviendo",
                    "Puede que llueva",
                    "Siempre llueve",
                    "Nunca llueve",
                    "No se sabe"
                ]
            },
            {
                options: [
                    "Todos los A son C",
                    "Ningún A es C",
                    "Algunos A son C",
                    "Todos los C son A",
                    "No se puede saber",
                    "Algunos B no son C"
                ]
            },
            {
                options: [
                    "No estudié",
                    "Estudié mucho",
                    "El examen fue difícil",
                    "No importa estudiar",
                    "Siempre apruebo",
                    "No se sabe"
                ]
            },
        ];

        const current = logicAnswers[questionNumber % logicAnswers.length];
        const displayValue = current.options[optionIndex];

        return (
            <div className="w-full h-full flex items-center justify-center bg-white p-2">
                <span className="text-sm font-medium text-primary text-center leading-tight">
                    {displayValue}
                </span>
            </div>
        );
    }

    // TIPO 4: Patrones Numéricos en Matriz
    if (questionType === 4) {
        const matrices = [
            { options: [9, 10, 11, 12, 13, 14] },
            { options: [7, 8, 9, 10, 11, 12] },
            { options: [45, 48, 50, 52, 55, 60] },
            { options: [22, 23, 24, 25, 26, 27] },
            { options: [162, 200, 243, 300, 324, 400] },
        ];

        const current = matrices[questionNumber % matrices.length];
        const displayValue = current.options[optionIndex];

        return (
            <div className="w-full h-full flex items-center justify-center bg-white">
                <span className="text-4xl font-bold text-indigo-600">{displayValue}</span>
            </div>
        );
    }

    // TIPO 5: Patrones Geométricos (reutilizar el componente original)
    if (isCorrect) {
        if (difficulty <= 2) {
            return (
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <rect width="100" height="100" fill="white" />
                    <circle cx="50" cy="50" r="30" fill="#F59E0B" />
                </svg>
            );
        } else if (difficulty <= 5) {
            return (
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <rect width="100" height="100" fill="white" />
                    <circle cx="50" cy="50" r="25" fill="none" stroke="#F59E0B" strokeWidth="3" strokeDasharray="8,4" />
                </svg>
            );
        } else {
            return (
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <rect width="100" height="100" fill="white" />
                    <circle cx="50" cy="50" r="20" fill="none" stroke="#2563EB" strokeWidth="2" />
                    <rect x="30" y="30" width="40" height="40" fill="none" stroke="#10B981" strokeWidth="2" />
                    <polygon points="50,25 70,75 30,75" fill="#F59E0B" opacity="0.5" />
                </svg>
            );
        }
    }

    // Opciones incorrectas para patrones geométricos
    const wrongOptions = [
        <circle key="1" cx="50" cy="50" r="20" fill="#F59E0B" />,
        <circle key="2" cx="50" cy="50" r="35" fill="#F59E0B" />,
        <circle key="3" cx="50" cy="50" r="30" fill="#2563EB" />,
        <circle key="4" cx="50" cy="50" r="30" fill="#10B981" />,
        <rect key="5" x="20" y="20" width="60" height="60" fill="#F59E0B" />,
    ];

    return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect width="100" height="100" fill="white" />
            {wrongOptions[optionIndex % wrongOptions.length]}
        </svg>
    );
};
