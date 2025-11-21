/**
 * Servicio de Cálculo de IQ - Proyecto NeuroIQ
 * Basado en la Escala Wechsler y Matrices de Raven
 * Media (Mean) = 100
 * Desviación Estándar (SD) = 15
 */

// Tipos para TypeScript
export interface UserAnswer {
    questionId: number;
    isCorrect: boolean;
    category: 'logica' | 'memoria_visual' | 'reconocimiento_patrones' | 'velocidad_procesamiento' | string;
    timeTakenMs: number;
}

export interface IQResult {
    iq: number;
    percentile: string;
    classification: string;
    description: string;
    categoryBreakdown: {
        logica: number;
        memoria: number;
        patrones: number;
        velocidad: number;
    };
}

// Configuración del Test (Calibrar estos valores según la dificultad real de tus preguntas)
const TEST_CONFIG = {
    TOTAL_QUESTIONS: 30,
    EXPECTED_MEAN_RAW_SCORE: 14, // AJUSTE: Bajamos de 16 a 14 para el "Inflation Bias" (Sweet Spot)
    RAW_SCORE_SD: 5,             // Desviación estándar de los aciertos
    MAX_IQ_CAP: 160,             // Tope máximo (para evitar resultados irreales como 200)
    MIN_IQ_CAP: 70,              // Tope mínimo
    TIME_PENALTY_THRESHOLD_MS: 45000 // 45 segs. Si tarda más, no recibe bonos de velocidad
};

/**
 * Calcula el CI final y el desglose por categorías
 * @param {UserAnswer[]} userAnswers - Array de objetos respuesta
 * @param {number} userAge - Edad del usuario (para ajuste de curva)
 */
export function calculateIQ(userAnswers: UserAnswer[], userAge: number): IQResult {
    
    // 1. Calcular Puntuación Cruda (Raw Score) y Puntuación por Categoría
    let rawScore = 0;
    let categoryScores: Record<string, { total: number; correct: number }> = {
        logica: { total: 0, correct: 0 },
        memoria_visual: { total: 0, correct: 0 },
        reconocimiento_patrones: { total: 0, correct: 0 },
        velocidad_procesamiento: { total: 0, correct: 0 } // Basado en tiempo
    };

    userAnswers.forEach(answer => {
        // Contar totales por categoría
        if (categoryScores[answer.category]) {
            categoryScores[answer.category].total += 1;
        }

        if (answer.isCorrect) {
            rawScore += 1;
            if (categoryScores[answer.category]) {
                categoryScores[answer.category].correct += 1;
            }
            
            // Bono de velocidad: Si responde correcto y rápido (< 10s), sumamos puntos virtuales a la categoría de velocidad
            if (answer.timeTakenMs < 10000) {
                categoryScores.velocidad_procesamiento.correct += 1;
            }
        }
        
        // Llenamos el total de velocidad procesando cada pregunta respondida
        categoryScores.velocidad_procesamiento.total += 1;
    });

    // 2. Ajuste de Curva por Edad (Age Normalization)
    // La inteligencia fluida decae ligeramente con la edad, o es menor en desarrollo temprano.
    // Ajustamos la "Puntuación Cruda" para compensar.
    const ageFactor = getAgeCorrectionFactor(userAge);
    const adjustedRawScore = rawScore * ageFactor;

    // 3. Fórmula Z-Score para obtener el IQ
    // Z = (Puntuación Usuario - Media Esperada) / Desviación Estándar
    const zScore = (adjustedRawScore - TEST_CONFIG.EXPECTED_MEAN_RAW_SCORE) / TEST_CONFIG.RAW_SCORE_SD;
    
    // IQ = 100 + (Z * 15)
    let calculatedIQ = Math.round(100 + (zScore * 15));

    // 4. Limitar a rangos realistas (Clamping)
    calculatedIQ = Math.max(TEST_CONFIG.MIN_IQ_CAP, Math.min(calculatedIQ, TEST_CONFIG.MAX_IQ_CAP));

    // 5. Generar Textos y Percentiles
    const classification = getIQClassification(calculatedIQ);
    const percentile = calculatePercentile(zScore);

    return {
        iq: calculatedIQ,
        percentile: percentile, // Ej: "Superior al 98% de la población"
        classification: classification.label, // Ej: "Muy Superior"
        description: classification.desc,
        categoryBreakdown: {
            logica: calculatePercentage(categoryScores.logica),
            memoria: calculatePercentage(categoryScores.memoria_visual),
            patrones: calculatePercentage(categoryScores.reconocimiento_patrones),
            velocidad: calculatePercentage(categoryScores.velocidad_procesamiento)
        }
    };
}

// --- Funciones Auxiliares ---

function getAgeCorrectionFactor(age: number): number {
    // Factores simplificados. En un sistema real usarías tablas de baremos.
    if (age < 16) return 1.2; // Bonificación para jóvenes (su cerebro aún madura)
    if (age >= 16 && age <= 24) return 1.0; // El "prime" cognitivo (sin ajuste)
    if (age > 24 && age <= 40) return 1.05; // Leve ajuste
    if (age > 40 && age <= 60) return 1.15; // Ajuste por declive natural de velocidad
    if (age > 60) return 1.25; // Mayor ajuste
    return 1.0;
}

function getIQClassification(iq: number): { label: string; desc: string } {
    if (iq >= 130) return { label: "Muy Superior", desc: "Potencial de genio. Habilidades excepcionales." };
    if (iq >= 120) return { label: "Superior", desc: "Inteligencia brillante. Facilidad para aprender." };
    if (iq >= 110) return { label: "Encima del Promedio", desc: "Gran capacidad lógica y de resolución." };
    if (iq >= 90) return { label: "Promedio", desc: "Inteligencia normal. Buen funcionamiento general." };
    if (iq >= 80) return { label: "Debajo del Promedio", desc: "Puede requerir esfuerzo en tareas abstractas." };
    return { label: "Bajo", desc: "Dificultades cognitivas notables." };
}

function calculatePercentile(zScore: number): string {
    // Aproximación de la función de error para distribución normal
    // Devuelve en qué % de la población está el usuario (ej: 98%)
    if (zScore < -6.5) return "0";
    if (zScore > 6.5) return "100";
    
    const factK = 1 / (1 + 0.2316419 * Math.abs(zScore));
    const factA1 = 0.319381530;
    const factA2 = -0.356563782;
    const factA3 = 1.781477937;
    const factA4 = -1.821255978;
    const factA5 = 1.330274429;
    
    const scatter = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * zScore * zScore);
    const probability = 1 - scatter * (factA1 * factK + factA2 * Math.pow(factK, 2) + factA3 * Math.pow(factK, 3) + factA4 * Math.pow(factK, 4) + factA5 * Math.pow(factK, 5));
    
    let finalPercentile = zScore >= 0 ? probability : 1 - probability;
    return (finalPercentile * 100).toFixed(1);
}

function calculatePercentage(categoryData: { total: number; correct: number }): number {
    if (categoryData.total === 0) return 0;
    // Sweet Spot: Nunca devolver 0% visualmente si es posible, pero aquí devolvemos el real.
    // El frontend puede hacer el ajuste visual (ej. Math.max(10, val)).
    return Math.round((categoryData.correct / categoryData.total) * 100);
}
