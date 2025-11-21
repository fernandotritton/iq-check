import React from 'react';

interface MatrixPatternProps {
    questionNumber: number;
    difficulty: number;
}

export const MatrixPattern: React.FC<MatrixPatternProps> = ({ questionNumber, difficulty }) => {
    // Usar el número de pregunta como semilla para generar patrones únicos
    const seed = questionNumber;
    const variant = seed % 5; // 5 variantes diferentes

    // Patrones fáciles (1-10)
    if (difficulty <= 2) {
        switch (variant) {
            case 0:
                // Círculos crecientes
                return (
                    <svg viewBox="0 0 300 300" className="w-full h-full">
                        <rect width="300" height="300" fill="white" />
                        <g stroke="#e5e7eb" strokeWidth="2">
                            <line x1="100" y1="0" x2="100" y2="300" />
                            <line x1="200" y1="0" x2="200" y2="300" />
                            <line x1="0" y1="100" x2="300" y2="100" />
                            <line x1="0" y1="200" x2="300" y2="200" />
                        </g>
                        <circle cx="50" cy="50" r="15" fill="#2563EB" />
                        <circle cx="150" cy="50" r="20" fill="#2563EB" />
                        <circle cx="250" cy="50" r="25" fill="#2563EB" />
                        <circle cx="50" cy="150" r="15" fill="#10B981" />
                        <circle cx="150" cy="150" r="20" fill="#10B981" />
                        <circle cx="250" cy="150" r="25" fill="#10B981" />
                        <circle cx="50" cy="250" r="15" fill="#F59E0B" />
                        <circle cx="150" cy="250" r="20" fill="#F59E0B" />
                        <text x="250" y="265" fontSize="48" fill="#9ca3af" fontWeight="bold">?</text>
                    </svg>
                );

            case 1:
                // Cuadrados rotados
                return (
                    <svg viewBox="0 0 300 300" className="w-full h-full">
                        <rect width="300" height="300" fill="white" />
                        <g stroke="#e5e7eb" strokeWidth="2">
                            <line x1="100" y1="0" x2="100" y2="300" />
                            <line x1="200" y1="0" x2="200" y2="300" />
                            <line x1="0" y1="100" x2="300" y2="100" />
                            <line x1="0" y1="200" x2="300" y2="200" />
                        </g>
                        <rect x="30" y="30" width="40" height="40" fill="#2563EB" />
                        <rect x="130" y="30" width="40" height="40" fill="#2563EB" transform="rotate(15 150 50)" />
                        <rect x="230" y="30" width="40" height="40" fill="#2563EB" transform="rotate(30 250 50)" />
                        <rect x="30" y="130" width="40" height="40" fill="#10B981" transform="rotate(45 50 150)" />
                        <rect x="130" y="130" width="40" height="40" fill="#10B981" transform="rotate(60 150 150)" />
                        <rect x="230" y="130" width="40" height="40" fill="#10B981" transform="rotate(75 250 150)" />
                        <rect x="30" y="230" width="40" height="40" fill="#F59E0B" transform="rotate(90 50 250)" />
                        <rect x="130" y="230" width="40" height="40" fill="#F59E0B" transform="rotate(105 150 250)" />
                        <text x="235" y="265" fontSize="48" fill="#9ca3af" fontWeight="bold">?</text>
                    </svg>
                );

            case 2:
                // Triángulos con diferentes orientaciones
                return (
                    <svg viewBox="0 0 300 300" className="w-full h-full">
                        <rect width="300" height="300" fill="white" />
                        <g stroke="#e5e7eb" strokeWidth="2">
                            <line x1="100" y1="0" x2="100" y2="300" />
                            <line x1="200" y1="0" x2="200" y2="300" />
                            <line x1="0" y1="100" x2="300" y2="100" />
                            <line x1="0" y1="200" x2="300" y2="200" />
                        </g>
                        <polygon points="50,30 70,70 30,70" fill="#2563EB" />
                        <polygon points="150,70 170,30 130,30" fill="#2563EB" />
                        <polygon points="250,30 270,70 230,70" fill="#2563EB" />
                        <polygon points="50,170 70,130 30,130" fill="#10B981" />
                        <polygon points="150,130 170,170 130,170" fill="#10B981" />
                        <polygon points="250,170 270,130 230,130" fill="#10B981" />
                        <polygon points="50,230 70,270 30,270" fill="#F59E0B" />
                        <polygon points="150,270 170,230 130,230" fill="#F59E0B" />
                        <text x="235" y="265" fontSize="48" fill="#9ca3af" fontWeight="bold">?</text>
                    </svg>
                );

            case 3:
                // Puntos en cantidad creciente
                return (
                    <svg viewBox="0 0 300 300" className="w-full h-full">
                        <rect width="300" height="300" fill="white" />
                        <g stroke="#e5e7eb" strokeWidth="2">
                            <line x1="100" y1="0" x2="100" y2="300" />
                            <line x1="200" y1="0" x2="200" y2="300" />
                            <line x1="0" y1="100" x2="300" y2="100" />
                            <line x1="0" y1="200" x2="300" y2="200" />
                        </g>
                        <circle cx="50" cy="50" r="8" fill="#2563EB" />
                        <circle cx="140" cy="50" r="8" fill="#2563EB" />
                        <circle cx="160" cy="50" r="8" fill="#2563EB" />
                        <circle cx="240" cy="40" r="8" fill="#2563EB" />
                        <circle cx="250" cy="55" r="8" fill="#2563EB" />
                        <circle cx="260" cy="40" r="8" fill="#2563EB" />
                        <circle cx="40" cy="150" r="8" fill="#10B981" />
                        <circle cx="60" cy="150" r="8" fill="#10B981" />
                        <circle cx="140" cy="140" r="8" fill="#10B981" />
                        <circle cx="150" cy="155" r="8" fill="#10B981" />
                        <circle cx="160" cy="140" r="8" fill="#10B981" />
                        <circle cx="240" cy="140" r="8" fill="#10B981" />
                        <circle cx="250" cy="155" r="8" fill="#10B981" />
                        <circle cx="260" cy="140" r="8" fill="#10B981" />
                        <circle cx="250" cy="160" r="8" fill="#10B981" />
                        <circle cx="50" cy="250" r="8" fill="#F59E0B" />
                        <circle cx="150" cy="250" r="8" fill="#F59E0B" />
                        <text x="235" y="265" fontSize="48" fill="#9ca3af" fontWeight="bold">?</text>
                    </svg>
                );

            default:
                // Líneas con diferentes direcciones
                return (
                    <svg viewBox="0 0 300 300" className="w-full h-full">
                        <rect width="300" height="300" fill="white" />
                        <g stroke="#e5e7eb" strokeWidth="2">
                            <line x1="100" y1="0" x2="100" y2="300" />
                            <line x1="200" y1="0" x2="200" y2="300" />
                            <line x1="0" y1="100" x2="300" y2="100" />
                            <line x1="0" y1="200" x2="300" y2="200" />
                        </g>
                        <line x1="30" y1="30" x2="70" y2="70" stroke="#2563EB" strokeWidth="4" />
                        <line x1="130" y1="30" x2="170" y2="70" stroke="#2563EB" strokeWidth="4" />
                        <line x1="170" y1="30" x2="130" y2="70" stroke="#2563EB" strokeWidth="4" />
                        <line x1="230" y1="50" x2="270" y2="50" stroke="#2563EB" strokeWidth="4" />
                        <line x1="30" y1="130" x2="70" y2="170" stroke="#10B981" strokeWidth="4" />
                        <line x1="70" y1="130" x2="30" y2="170" stroke="#10B981" strokeWidth="4" />
                        <line x1="130" y1="150" x2="170" y2="150" stroke="#10B981" strokeWidth="4" />
                        <line x1="250" y1="130" x2="250" y2="170" stroke="#10B981" strokeWidth="4" />
                        <line x1="50" y1="230" x2="50" y2="270" stroke="#F59E0B" strokeWidth="4" />
                        <line x1="150" y1="230" x2="150" y2="270" stroke="#F59E0B" strokeWidth="4" />
                        <text x="235" y="265" fontSize="48" fill="#9ca3af" fontWeight="bold">?</text>
                    </svg>
                );
        }
    }

    // Patrones medios (11-20)
    if (difficulty <= 5) {
        const rotation = (seed * 15) % 180;
        const shapeType = seed % 3;

        return (
            <svg viewBox="0 0 300 300" className="w-full h-full">
                <rect width="300" height="300" fill="white" />
                <g stroke="#e5e7eb" strokeWidth="2">
                    <line x1="100" y1="0" x2="100" y2="300" />
                    <line x1="200" y1="0" x2="200" y2="300" />
                    <line x1="0" y1="100" x2="300" y2="100" />
                    <line x1="0" y1="200" x2="300" y2="200" />
                </g>

                {shapeType === 0 && (
                    <>
                        <rect x="30" y="30" width="40" height="40" fill="none" stroke="#2563EB" strokeWidth="3" />
                        <rect x="130" y="30" width="40" height="40" fill="none" stroke="#2563EB" strokeWidth="3" transform={`rotate(${rotation} 150 50)`} />
                        <rect x="230" y="30" width="40" height="40" fill="none" stroke="#2563EB" strokeWidth="3" transform={`rotate(${rotation * 2} 250 50)`} />
                        <polygon points="50,130 70,170 30,170" fill="#10B981" />
                        <polygon points="150,130 170,170 130,170" fill="#10B981" transform={`rotate(${rotation} 150 150)`} />
                        <polygon points="250,130 270,170 230,170" fill="#10B981" transform={`rotate(${rotation * 2} 250 150)`} />
                        <circle cx="50" cy="250" r="20" fill="none" stroke="#F59E0B" strokeWidth="3" />
                        <circle cx="150" cy="250" r="20" fill="none" stroke="#F59E0B" strokeWidth="3" strokeDasharray="5,5" />
                    </>
                )}

                {shapeType === 1 && (
                    <>
                        <circle cx="50" cy="50" r="20" fill="#2563EB" opacity="0.3" />
                        <circle cx="150" cy="50" r="20" fill="#2563EB" opacity="0.5" />
                        <circle cx="250" cy="50" r="20" fill="#2563EB" opacity="0.7" />
                        <rect x="30" y="130" width="40" height="40" fill="#10B981" opacity="0.3" />
                        <rect x="130" y="130" width="40" height="40" fill="#10B981" opacity="0.5" />
                        <rect x="230" y="130" width="40" height="40" fill="#10B981" opacity="0.7" />
                        <polygon points="50,230 70,270 30,270" fill="#F59E0B" opacity="0.3" />
                        <polygon points="150,230 170,270 130,270" fill="#F59E0B" opacity="0.5" />
                    </>
                )}

                {shapeType === 2 && (
                    <>
                        <line x1="30" y1="30" x2="70" y2="70" stroke="#2563EB" strokeWidth="4" />
                        <line x1="70" y1="30" x2="30" y2="70" stroke="#2563EB" strokeWidth="4" />
                        <line x1="130" y1="30" x2="170" y2="70" stroke="#2563EB" strokeWidth="4" />
                        <line x1="170" y1="30" x2="130" y2="70" stroke="#2563EB" strokeWidth="4" />
                        <line x1="150" y1="30" x2="150" y2="70" stroke="#2563EB" strokeWidth="4" />
                        <circle cx="250" cy="50" r="25" fill="none" stroke="#2563EB" strokeWidth="3" />
                        <rect x="30" y="130" width="40" height="40" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray="5,5" />
                        <rect x="130" y="130" width="40" height="40" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray="10,5" />
                        <rect x="230" y="130" width="40" height="40" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray="15,5" />
                        <polygon points="50,230 70,270 30,270" fill="none" stroke="#F59E0B" strokeWidth="3" />
                        <polygon points="150,230 170,270 130,270" fill="none" stroke="#F59E0B" strokeWidth="3" strokeDasharray="5,5" />
                    </>
                )}

                <text x="235" y="265" fontSize="48" fill="#9ca3af" fontWeight="bold">?</text>
            </svg>
        );
    }

    // Patrones difíciles (21-30)
    const complexRotation = (seed * 20) % 360;
    const layerCount = (seed % 3) + 2;

    return (
        <svg viewBox="0 0 300 300" className="w-full h-full">
            <rect width="300" height="300" fill="white" />
            <g stroke="#e5e7eb" strokeWidth="2">
                <line x1="100" y1="0" x2="100" y2="300" />
                <line x1="200" y1="0" x2="200" y2="300" />
                <line x1="0" y1="100" x2="300" y2="100" />
                <line x1="0" y1="200" x2="300" y2="200" />
            </g>

            {/* Patrón complejo con múltiples capas */}
            <g transform={`rotate(${complexRotation} 50 50)`}>
                <circle cx="50" cy="50" r="20" fill="none" stroke="#2563EB" strokeWidth="2" />
                <rect x="30" y="30" width="40" height="40" fill="none" stroke="#10B981" strokeWidth="2" />
                {layerCount >= 3 && <polygon points="50,25 70,65 30,65" fill="none" stroke="#F59E0B" strokeWidth="2" />}
            </g>

            <g transform={`rotate(${complexRotation + 45} 150 50)`}>
                <circle cx="150" cy="50" r="20" fill="none" stroke="#2563EB" strokeWidth="2" />
                <rect x="130" y="30" width="40" height="40" fill="none" stroke="#10B981" strokeWidth="2" />
                {layerCount >= 3 && <polygon points="150,25 170,65 130,65" fill="none" stroke="#F59E0B" strokeWidth="2" />}
                {layerCount >= 4 && <circle cx="150" cy="50" r="10" fill="#2563EB" opacity="0.3" />}
            </g>

            <g transform={`rotate(${complexRotation + 90} 250 50)`}>
                <circle cx="250" cy="50" r="20" fill="none" stroke="#2563EB" strokeWidth="2" strokeDasharray="3,3" />
                <rect x="230" y="30" width="40" height="40" fill="none" stroke="#10B981" strokeWidth="2" />
                {layerCount >= 3 && <polygon points="250,25 270,65 230,65" fill="none" stroke="#F59E0B" strokeWidth="2" />}
                {layerCount >= 4 && <circle cx="250" cy="50" r="10" fill="#10B981" opacity="0.5" />}
            </g>

            <g transform={`rotate(${complexRotation + 135} 50 150)`}>
                <circle cx="50" cy="150" r="20" fill="none" stroke="#2563EB" strokeWidth="2" strokeDasharray="5,5" />
                <rect x="30" y="130" width="40" height="40" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="5,5" />
                {layerCount >= 3 && <polygon points="50,125 70,165 30,165" fill="#F59E0B" opacity="0.3" />}
            </g>

            <g transform={`rotate(${complexRotation + 180} 150 150)`}>
                <circle cx="150" cy="150" r="20" fill="none" stroke="#2563EB" strokeWidth="2" strokeDasharray="8,4" />
                <rect x="130" y="130" width="40" height="40" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="8,4" />
                {layerCount >= 3 && <polygon points="150,125 170,165 130,165" fill="#F59E0B" opacity="0.5" />}
            </g>

            <g transform={`rotate(${complexRotation + 225} 250 150)`}>
                <circle cx="250" cy="150" r="20" fill="none" stroke="#2563EB" strokeWidth="2" />
                <rect x="230" y="130" width="40" height="40" fill="none" stroke="#10B981" strokeWidth="2" />
                {layerCount >= 3 && <polygon points="250,125 270,165 230,165" fill="#F59E0B" opacity="0.7" />}
                {layerCount >= 4 && <line x1="230" y1="130" x2="270" y2="170" stroke="#2563EB" strokeWidth="2" />}
            </g>

            <g>
                <circle cx="50" cy="250" r="20" fill="#2563EB" opacity="0.2" />
                <rect x="30" y="230" width="40" height="40" fill="#10B981" opacity="0.2" />
            </g>

            <g>
                <circle cx="150" cy="250" r="20" fill="#2563EB" opacity="0.4" />
                <rect x="130" y="230" width="40" height="40" fill="#10B981" opacity="0.4" />
            </g>

            <text x="235" y="265" fontSize="48" fill="#9ca3af" fontWeight="bold">?</text>
        </svg>
    );
};
