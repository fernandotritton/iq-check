import React from 'react';

interface QuestionContentProps {
    questionNumber: number;
    difficulty: number;
}

export const QuestionContent: React.FC<QuestionContentProps> = ({ questionNumber, difficulty }) => {
    // Determinar el tipo de pregunta basado en el número
    const questionType = questionNumber % 6; // 6 tipos diferentes

    // TIPO 0: Secuencias Numéricas
    if (questionType === 0) {
        const sequences = [
            { seq: [2, 4, 6, 8, 10], answer: 12, options: [11, 12, 13, 14] },
            { seq: [1, 4, 9, 16, 25], answer: 36, options: [30, 35, 36, 40] },
            { seq: [3, 6, 12, 24, 48], answer: 96, options: [72, 84, 96, 108] },
            { seq: [100, 90, 81, 73, 66], answer: 60, options: [58, 59, 60, 61] },
            { seq: [5, 10, 20, 40, 80], answer: 160, options: [120, 140, 160, 180] },
        ];

        const current = sequences[questionNumber % sequences.length];

        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-white">
                <h3 className="text-lg font-semibold text-gray-700 mb-6">
                    ¿Qué número continúa la secuencia?
                </h3>
                <div className="flex items-center gap-4 text-3xl font-bold text-primary">
                    {current.seq.map((num, idx) => (
                        <React.Fragment key={idx}>
                            <span>{num}</span>
                            {idx < current.seq.length - 1 && <span className="text-gray-400">,</span>}
                        </React.Fragment>
                    ))}
                    <span className="text-gray-400">,</span>
                    <span className="text-5xl text-secondary">?</span>
                </div>
            </div>
        );
    }

    // TIPO 1: Analogías Verbales
    if (questionType === 1) {
        const analogies = [
            { a: "Médico", b: "Hospital", c: "Profesor", answer: "Escuela" },
            { a: "Libro", b: "Leer", c: "Música", answer: "Escuchar" },
            { a: "Perro", b: "Ladrar", c: "Gato", answer: "Maullar" },
            { a: "Día", b: "Noche", c: "Verano", answer: "Invierno" },
            { a: "Mano", b: "Guante", c: "Pie", answer: "Zapato" },
        ];

        const current = analogies[questionNumber % analogies.length];

        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-green-50 to-white">
                <h3 className="text-lg font-semibold text-gray-700 mb-6">
                    Completa la analogía
                </h3>
                <div className="text-2xl font-semibold text-center space-y-4">
                    <div className="text-primary">
                        <span className="font-bold">{current.a}</span>
                        <span className="mx-3 text-gray-400">es a</span>
                        <span className="font-bold">{current.b}</span>
                    </div>
                    <div className="text-4xl text-gray-300">⇓</div>
                    <div className="text-primary">
                        <span className="font-bold">{current.c}</span>
                        <span className="mx-3 text-gray-400">es a</span>
                        <span className="text-3xl text-secondary font-bold">?</span>
                    </div>
                </div>
            </div>
        );
    }

    // TIPO 2: Operaciones Matemáticas
    if (questionType === 2) {
        const mathProblems = [
            { problem: "15 + 23 - 8 = ?", answer: 30 },
            { problem: "6 × 7 + 12 = ?", answer: 54 },
            { problem: "100 ÷ 4 - 5 = ?", answer: 20 },
            { problem: "3² + 4² = ?", answer: 25 },
            { problem: "(8 + 4) × 3 = ?", answer: 36 },
        ];

        const current = mathProblems[questionNumber % mathProblems.length];

        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-amber-50 to-white">
                <h3 className="text-lg font-semibold text-gray-700 mb-6">
                    Resuelve la operación
                </h3>
                <div className="text-5xl font-bold text-primary">
                    {current.problem}
                </div>
            </div>
        );
    }

    // TIPO 3: Razonamiento Lógico (Si... entonces...)
    if (questionType === 3) {
        const logicProblems = [
            {
                premise: "Si todos los gatos son animales y algunos animales vuelan...",
                question: "¿Qué podemos concluir?",
                answer: "Algunos gatos pueden volar"
            },
            {
                premise: "María es más alta que Juan. Pedro es más bajo que Juan.",
                question: "¿Quién es el más bajo?",
                answer: "Pedro"
            },
            {
                premise: "Si llueve, llevo paraguas. Hoy llevo paraguas.",
                question: "¿Qué podemos concluir?",
                answer: "Puede que llueva"
            },
            {
                premise: "Todos los A son B. Algunos B son C.",
                question: "¿Qué es cierto?",
                answer: "Algunos A pueden ser C"
            },
            {
                premise: "Si estudio, apruebo. No aprobé.",
                question: "¿Qué pasó?",
                answer: "No estudié"
            },
        ];

        const current = logicProblems[questionNumber % logicProblems.length];

        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-white">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Razonamiento Lógico
                </h3>
                <div className="text-center space-y-4">
                    <p className="text-lg text-gray-800 leading-relaxed">
                        {current.premise}
                    </p>
                    <div className="text-2xl font-bold text-secondary mt-4">
                        {current.question}
                    </div>
                </div>
            </div>
        );
    }

    // TIPO 4: Patrones Numéricos en Matriz
    if (questionType === 4) {
        const matrices = [
            { grid: [[2, 4], [6, 8]], answer: 10 },
            { grid: [[1, 3], [5, 7]], answer: 9 },
            { grid: [[10, 20], [30, 40]], answer: 50 },
            { grid: [[5, 10], [15, 20]], answer: 25 },
            { grid: [[3, 9], [27, 81]], answer: 243 },
        ];

        const current = matrices[questionNumber % matrices.length];

        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-indigo-50 to-white">
                <h3 className="text-lg font-semibold text-gray-700 mb-6">
                    ¿Qué número falta?
                </h3>
                <div className="grid grid-cols-3 gap-4">
                    {current.grid.map((row, i) => (
                        row.map((num, j) => (
                            <div key={`${i}-${j}`} className="w-20 h-20 border-4 border-primary rounded-lg flex items-center justify-center text-3xl font-bold text-primary">
                                {num}
                            </div>
                        ))
                    ))}
                    <div className="w-20 h-20 border-4 border-secondary rounded-lg flex items-center justify-center text-4xl font-bold text-secondary">
                        ?
                    </div>
                </div>
            </div>
        );
    }

    // TIPO 5: Patrones Geométricos (original)
    return (
        <div className="w-full h-full">
            <svg viewBox="0 0 300 300" className="w-full h-full">
                <rect width="300" height="300" fill="white" />
                <g stroke="#e5e7eb" strokeWidth="2">
                    <line x1="100" y1="0" x2="100" y2="300" />
                    <line x1="200" y1="0" x2="200" y2="300" />
                    <line x1="0" y1="100" x2="300" y2="100" />
                    <line x1="0" y1="200" x2="300" y2="200" />
                </g>

                {difficulty <= 2 && (
                    <>
                        <circle cx="50" cy="50" r="15" fill="#2563EB" />
                        <circle cx="150" cy="50" r="20" fill="#2563EB" />
                        <circle cx="250" cy="50" r="25" fill="#2563EB" />
                        <circle cx="50" cy="150" r="15" fill="#10B981" />
                        <circle cx="150" cy="150" r="20" fill="#10B981" />
                        <circle cx="250" cy="150" r="25" fill="#10B981" />
                        <circle cx="50" cy="250" r="15" fill="#F59E0B" />
                        <circle cx="150" cy="250" r="20" fill="#F59E0B" />
                    </>
                )}

                {difficulty > 2 && difficulty <= 5 && (
                    <>
                        <rect x="30" y="30" width="40" height="40" fill="none" stroke="#2563EB" strokeWidth="3" />
                        <rect x="130" y="30" width="40" height="40" fill="none" stroke="#2563EB" strokeWidth="3" transform="rotate(45 150 50)" />
                        <rect x="230" y="30" width="40" height="40" fill="none" stroke="#2563EB" strokeWidth="3" transform="rotate(90 250 50)" />
                        <polygon points="50,130 70,170 30,170" fill="#10B981" />
                        <polygon points="150,130 170,170 130,170" fill="#10B981" transform="rotate(45 150 150)" />
                        <polygon points="250,130 270,170 230,170" fill="#10B981" transform="rotate(90 250 150)" />
                        <circle cx="50" cy="250" r="20" fill="none" stroke="#F59E0B" strokeWidth="3" />
                        <circle cx="150" cy="250" r="20" fill="none" stroke="#F59E0B" strokeWidth="3" strokeDasharray="5,5" />
                    </>
                )}

                {difficulty > 5 && (
                    <>
                        <g transform={`rotate(${questionNumber * 15} 50 50)`}>
                            <circle cx="50" cy="50" r="20" fill="none" stroke="#2563EB" strokeWidth="2" />
                            <rect x="30" y="30" width="40" height="40" fill="none" stroke="#10B981" strokeWidth="2" />
                            <polygon points="50,25 70,65 30,65" fill="none" stroke="#F59E0B" strokeWidth="2" />
                        </g>
                        <g transform={`rotate(${questionNumber * 20} 150 50)`}>
                            <circle cx="150" cy="50" r="20" fill="none" stroke="#2563EB" strokeWidth="2" />
                            <rect x="130" y="30" width="40" height="40" fill="none" stroke="#10B981" strokeWidth="2" />
                            <polygon points="150,25 170,65 130,65" fill="none" stroke="#F59E0B" strokeWidth="2" />
                        </g>
                        <g transform={`rotate(${questionNumber * 25} 250 50)`}>
                            <circle cx="250" cy="50" r="20" fill="none" stroke="#2563EB" strokeWidth="2" strokeDasharray="3,3" />
                            <rect x="230" y="30" width="40" height="40" fill="none" stroke="#10B981" strokeWidth="2" />
                        </g>
                        <circle cx="50" cy="150" r="20" fill="#2563EB" opacity="0.3" />
                        <circle cx="150" cy="150" r="20" fill="#10B981" opacity="0.5" />
                        <circle cx="250" cy="150" r="20" fill="#F59E0B" opacity="0.7" />
                        <rect x="30" y="230" width="40" height="40" fill="#2563EB" opacity="0.2" />
                        <rect x="130" y="230" width="40" height="40" fill="#10B981" opacity="0.4" />
                    </>
                )}

                <text x="235" y="265" fontSize="48" fill="#9ca3af" fontWeight="bold">?</text>
            </svg>
        </div>
    );
};
