# Plataforma de Test de IQ - Documento de Diseño y Especificación

## 1. Visión del Proyecto
Construir una plataforma de test de IQ "Freemium" optimizada para el mercado hispano, utilizando un embudo de conversión psicológico de alta optimización.
**Modelo:** Test gratuito con resultados parciales -> Pago para reporte completo.

## 2. Ingeniería Psicológica (Disparadores)
*   **Falacia del Costo Hundido:** Test de 15-20 mins para generar compromiso.
*   **Validación (Dopamina):** Pop-ups de refuerzo ("Top 5%") durante el test.
*   **Prueba Social:** Comparativas geolocalizadas ("Más rápido que el promedio en [País]").
*   **Urgencia (FOMO):** Contadores regresivos y notificaciones de compras recientes.

## 3. User Journey & UX Flow
### Etapa 1: La Entrada
*   **Landing:** Hero limpio, personalización por IP, CTA claro ("Iniciar Test Gratis").
### Etapa 2: El Compromiso
*   **Preguntas 1-5:** Fáciles, barra de progreso rápida.
*   **Intermedio (30%):** "Ego Boost" (mensaje de validación).
*   **Preguntas 20-30:** Difíciles, barra lenta (validez científica).
### Etapa 3: Cierre y Captura
*   **Datos Demográficos:** Edad, estudios (para calibración).
*   **Cálculo Fake:** Animación de 5-8s para valor percibido.
*   **Soft-Conversion:** Captura de Email antes de resultados.
### Etapa 4: La Venta (Paywall)
*   **Resultados Parciales:** Borrosos/Rango. Comparativa con genios.
*   **Checkout:**
    *   Urgencia (Timer 10 min).
    *   Precios PPP (ajustados por país).
    *   Pasarelas Locales (Mercado Pago, Binance, etc.).
### Etapa 5: Entrega
*   **Dashboard:** Puntaje exacto, descarga PDF, botón compartir.

## 4. Arquitectura Técnica
### Stack (T3 Stack recomendado)
*   **Frontend:** Next.js (App Router) + Tailwind CSS + Framer Motion (Animaciones).
*   **Backend:** Node.js (Express/NestJS) o Python (FastAPI).
*   **Base de Datos:** PostgreSQL (Persistencia) + Redis (Caché/Sesiones).
*   **PDF:** Puppeteer/Playwright (HTML to PDF).

### Infraestructura
*   **Persistencia de Sesión:** Recuperación de estado (pregunta exacta) si se cierra el navegador.
*   **Geolocalización:** Detección de IP para precios y copy.

## 5. Diseño de Base de Datos (ERD)
*   **USERS:** `id`, `email`, `country_code`, `created_at`, etc.
*   **TEST_SESSIONS:** `user_id`, `ip_address`, `current_question_index`, `status` (IN_PROGRESS, COMPLETED).
*   **QUESTIONS:** `category`, `image_url`, `difficulty`.
*   **USER_ANSWERS:** `session_id`, `question_id`, `time_taken_ms`.
*   **RESULTS:** `raw_score`, `calculated_iq`, `category_breakdown` (JSONB).
*   **TRANSACTIONS:** `amount`, `currency`, `provider` (Stripe, MercadoPago), `status`.

## 6. Estrategia de Monetización
*   **Precios PPP:** Ajuste automático según país (Ej: España €19 vs Venezuela $5).
*   **Pasarelas:**
    *   Global: Stripe.
    *   LatAm: Mercado Pago.
    *   Específico (ej. Venezuela): Binance Pay / Pago Móvil.
*   **Recuperación:** Email marketing para carritos abandonados (1h, 24h con descuento).

## 7. Seguridad
*   **Ofuscación:** Respuestas correctas solo en servidor.
*   **Protección PDF:** Signed URLs con expiración.

## 8. Roadmap (MVP)
*   **Sprint 1 (Core):** BD, API Preguntas, Frontend Quiz.
*   **Sprint 2 (Scoring):** Algoritmo, Generación PDF, Animaciones.
*   **Sprint 3 (Money):** Integración Pasarelas, Webhooks.
*   **Sprint 4 (Analytics):** Emails automáticos, Pixels de seguimiento.

## 9. Guía de Estilo UI/UX (Scientific Modernism)
*   **Paleta:** Navy Blue (#0F172A), Emerald Green (#10B981), Amber (#F59E0B).
*   **Tipografía:** Sans-Serif geométrica (Inter/Montserrat).
*   **Estilo:** Glassmorphism leve, iconos finos, ilustraciones vectoriales serias.
