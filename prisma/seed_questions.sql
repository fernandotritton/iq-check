-- NeuroIQ Test Questions Seed Data
-- Run this AFTER creating the tables
-- This inserts 30 questions (5 of each type)

-- Numeric Sequence Questions (Type 0)
INSERT INTO "Question" ("type", "category", "difficulty", "content", "options", "correctAnswer") VALUES
('numeric_sequence', 'logica', 1, '{"sequence": [2, 4, 6, 8, 10]}', '["12", "11", "14", "10", "13", "15"]', 0),
('numeric_sequence', 'logica', 2, '{"sequence": [1, 4, 9, 16, 25]}', '["30", "36", "32", "35", "34", "38"]', 1),
('numeric_sequence', 'logica', 3, '{"sequence": [2, 6, 12, 20, 30]}', '["40", "42", "38", "44", "36", "46"]', 1),
('numeric_sequence', 'logica', 4, '{"sequence": [1, 1, 2, 3, 5]}', '["7", "8", "6", "9", "10", "11"]', 1),
('numeric_sequence', 'logica', 5, '{"sequence": [3, 6, 12, 24, 48]}', '["72", "96", "84", "60", "108", "120"]', 1);

-- Verbal Analogy Questions (Type 1)
INSERT INTO "Question" ("type", "category", "difficulty", "content", "options", "correctAnswer") VALUES
('verbal_analogy', 'logica', 1, '{"question": "Perro es a Ladrar como Gato es a"}', '["Maullar", "Correr", "Dormir", "Comer", "Saltar", "Jugar"]', 0),
('verbal_analogy', 'logica', 2, '{"question": "Médico es a Hospital como Profesor es a"}', '["Casa", "Escuela", "Tienda", "Parque", "Oficina", "Cine"]', 1),
('verbal_analogy', 'logica', 3, '{"question": "Libro es a Leer como Música es a"}', '["Ver", "Escuchar", "Tocar", "Oler", "Probar", "Sentir"]', 1),
('verbal_analogy', 'logica', 4, '{"question": "Hambre es a Comer como Sed es a"}', '["Dormir", "Beber", "Correr", "Pensar", "Hablar", "Escribir"]', 1),
('verbal_analogy', 'logica', 5, '{"question": "Causa es a Efecto como Pregunta es a"}', '["Duda", "Respuesta", "Silencio", "Palabra", "Idea", "Pensamiento"]', 1);

-- Math Operations Questions (Type 2)
INSERT INTO "Question" ("type", "category", "difficulty", "content", "options", "correctAnswer") VALUES
('math', 'logica', 1, '{"operation": "15 + 23 - 8 = ?"}', '["28", "30", "32", "26", "34", "29"]', 1),
('math', 'logica', 2, '{"operation": "12 × 3 + 5 = ?"}', '["39", "41", "43", "37", "45", "40"]', 1),
('math', 'logica', 3, '{"operation": "100 ÷ 4 - 10 = ?"}', '["12", "15", "18", "20", "10", "14"]', 1),
('math', 'logica', 4, '{"operation": "7² - 3 × 5 = ?"}', '["32", "34", "36", "30", "38", "40"]', 1),
('math', 'logica', 5, '{"operation": "(15 + 9) ÷ 3 × 2 = ?"}', '["14", "16", "18", "12", "20", "22"]', 1);

-- Logical Reasoning Questions (Type 3)
INSERT INTO "Question" ("type", "category", "difficulty", "content", "options", "correctAnswer") VALUES
('logic', 'logica', 1, '{"premise": "Si todos los A son B y algunos B son C, entonces:"}', '["Todos los A son C", "Algunos A son C", "Ningún A es C", "Todos los C son A", "Algunos C son B", "Ningún C es B"]', 1),
('logic', 'logica', 2, '{"premise": "Si llueve, entonces el suelo está mojado. El suelo está mojado. Por lo tanto:"}', '["Está lloviendo", "Puede estar lloviendo", "No está lloviendo", "Nunca llueve", "Siempre llueve", "El suelo está seco"]', 1),
('logic', 'logica', 3, '{"premise": "Si estudio, entonces apruebo. No aprobé. Por lo tanto:"}', '["Estudié", "No estudié", "Aprobé", "Siempre estudio", "Nunca estudio", "A veces estudio"]', 1),
('logic', 'logica', 4, '{"premise": "Todos los X son Y. Ningún Y es Z. Por lo tanto:"}', '["Todos los X son Z", "Ningún X es Z", "Algunos X son Z", "Todos los Z son X", "Algunos Z son Y", "Ningún Z es Y"]', 1),
('logic', 'logica', 5, '{"premise": "Si A entonces B. Si B entonces C. A es verdadero. Por lo tanto:"}', '["B es falso", "C es verdadero", "C es falso", "B y C son falsos", "Solo B es verdadero", "Nada se puede concluir"]', 1);

-- Numeric Matrix Questions (Type 4)
INSERT INTO "Question" ("type", "category", "difficulty", "content", "options", "correctAnswer") VALUES
('numeric_matrix', 'reconocimiento_patrones', 1, '{"matrix": [[2, 4], [6, "?"]]}', '["6", "8", "10", "12", "14", "16"]', 1),
('numeric_matrix', 'reconocimiento_patrones', 2, '{"matrix": [[1, 3], [5, "?"]]}', '["6", "7", "8", "9", "10", "11"]', 1),
('numeric_matrix', 'reconocimiento_patrones', 3, '{"matrix": [[2, 4, 8], [3, 6, "?"]]}', '["9", "12", "15", "18", "21", "24"]', 1),
('numeric_matrix', 'reconocimiento_patrones', 4, '{"matrix": [[5, 10], [15, "?"]]}', '["18", "20", "22", "25", "30", "35"]', 1),
('numeric_matrix', 'reconocimiento_patrones', 5, '{"matrix": [[1, 2, 4], [8, 16, "?"]]}', '["20", "24", "28", "32", "36", "40"]', 3);

-- Geometric Pattern Questions (Type 5)
INSERT INTO "Question" ("type", "category", "difficulty", "content", "options", "correctAnswer") VALUES
('geometric', 'reconocimiento_patrones', 1, '{"pattern": "circle, square, circle, square, circle"}', '["square", "circle", "triangle", "rectangle", "pentagon", "hexagon"]', 0),
('geometric', 'reconocimiento_patrones', 2, '{"pattern": "small, medium, large, small, medium"}', '["small", "large", "medium", "tiny", "huge", "normal"]', 1),
('geometric', 'reconocimiento_patrones', 3, '{"pattern": "red, blue, red, blue, red"}', '["red", "blue", "green", "yellow", "orange", "purple"]', 1),
('geometric', 'reconocimiento_patrones', 4, '{"pattern": "1 circle, 2 squares, 3 triangles, 4"}', '["circles", "squares", "triangles", "rectangles", "pentagons", "hexagons"]', 0),
('geometric', 'reconocimiento_patrones', 5, '{"pattern": "rotate 90°, rotate 90°, rotate 90°"}', '["rotate 90°", "rotate 180°", "rotate 45°", "rotate 270°", "no rotation", "rotate 360°"]', 0);
