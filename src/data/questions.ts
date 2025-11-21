export interface Question {
    id: number;
    category: 'logica' | 'memoria_visual' | 'reconocimiento_patrones';
    difficulty: number;
    imageUrl: string;
    options: string[];
    correctAnswer: number; // Index of correct option (server-side only)
}

// Mock questions - En producción, estas vendrían de la base de datos
export const questions: Question[] = [
    // EASY QUESTIONS (1-5) - Para el engagement inicial
    {
        id: 1,
        category: 'reconocimiento_patrones',
        difficulty: 1,
        imageUrl: '/questions/q1.svg',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 2,
    },
    {
        id: 2,
        category: 'logica',
        difficulty: 1,
        imageUrl: '/questions/q2.svg',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 1,
    },
    {
        id: 3,
        category: 'memoria_visual',
        difficulty: 2,
        imageUrl: '/questions/q3.svg',
        options: ['A', 'B', 'C', 'D', 'E', 'F'],
        correctAnswer: 3,
    },
    {
        id: 4,
        category: 'reconocimiento_patrones',
        difficulty: 2,
        imageUrl: '/questions/q4.svg',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
    },
    {
        id: 5,
        category: 'logica',
        difficulty: 2,
        imageUrl: '/questions/q5.svg',
        options: ['A', 'B', 'C', 'D', 'E', 'F'],
        correctAnswer: 4,
    },

    // MEDIUM QUESTIONS (6-20)
    ...Array.from({ length: 15 }, (_, i) => ({
        id: i + 6,
        category: (['logica', 'memoria_visual', 'reconocimiento_patrones'] as const)[i % 3],
        difficulty: 3 + Math.floor(i / 5),
        imageUrl: `/questions/q${i + 6}.svg`,
        options: ['A', 'B', 'C', 'D', 'E', 'F'],
        correctAnswer: Math.floor(Math.random() * 6),
    })),

    // HARD QUESTIONS (21-30) - Para validez científica
    ...Array.from({ length: 10 }, (_, i) => ({
        id: i + 21,
        category: (['logica', 'memoria_visual', 'reconocimiento_patrones'] as const)[i % 3],
        difficulty: 6 + Math.floor(i / 3),
        imageUrl: `/questions/q${i + 21}.svg`,
        options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
        correctAnswer: Math.floor(Math.random() * 8),
    })),
];

// Función para obtener preguntas sin revelar respuestas correctas
export function getQuestionsForClient() {
    return questions.map(({ correctAnswer, ...question }) => question);
}

// Función para validar respuesta (server-side only)
export function validateAnswer(questionId: number, selectedOption: number): boolean {
    // Usar el mismo algoritmo que AnswerOption para determinar la respuesta correcta
    const correctAnswer = (questionId * 3 + 2) % 6;
    return correctAnswer === selectedOption;
}
