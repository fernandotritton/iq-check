# NeuroIQ - Plataforma de Test de IQ

Plataforma de test de coeficiente intelectual optimizada para el mercado hispano con modelo Freemium.

## 🎯 Características Principales

- **Test Profesional**: 30 preguntas basadas en matrices progresivas de Raven
- **Algoritmo Científico**: Cálculo de IQ con curva de Gauss, ajuste por edad y velocidad
- **Embudo Psicológico**: Diseñado con disparadores de conversión (FOMO, prueba social, urgencia)
- **Precios PPP**: Ajuste automático de precios según país (Paridad de Poder Adquisitivo)
- **Diseño Premium**: Estilo "Scientific Modernism" con animaciones fluidas

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Abrir en el navegador
# http://localhost:3000
```

## 📁 Estructura del Proyecto

```
iq-test-platform/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── test/                 # Quiz interface
│   │   ├── demographics/         # Captura de datos
│   │   ├── calculating/          # Animación de carga
│   │   ├── email/                # Captura de email
│   │   ├── results-preview/      # Paywall
│   │   ├── checkout/             # Página de pago
│   │   └── results/              # Resultados finales
│   ├── data/
│   │   └── questions.ts          # Banco de preguntas
│   └── utils/
│       └── iqCalculator.ts       # Algoritmo de scoring
├── project_design.md             # Documento de diseño completo
└── package.json
```

## 🧠 Algoritmo de IQ

El algoritmo implementa:
- **Z-Score**: Distribución normal con media 100 y SD 15
- **Ajuste por Edad**: Factores de corrección según edad del usuario
- **Bono de Velocidad**: Puntos extra por respuestas rápidas
- **Inflation Bias**: Calibrado para que el promedio sea ~110 (viralidad)

## 🎨 Paleta de Colores

- **Primario**: Navy Blue (#0F172A) - Confianza
- **Secundario**: Emerald Green (#10B981) - Acción
- **Acento**: Amber (#F59E0B) - Urgencia/Premium

## 📊 Flujo de Usuario

1. **Landing** → CTA "Iniciar Test"
2. **Quiz** → 30 preguntas con barra de progreso
3. **Ego Boost** → Mensaje motivacional al 30%
4. **Demographics** → Edad, educación, género
5. **Calculating** → Animación de carga (6-8s)
6. **Email** → Captura de lead
7. **Paywall** → Resultados borrosos + oferta urgente
8. **Checkout** → Selección de método de pago
9. **Results** → IQ completo + gráfico radar + PDF

## 🔐 Seguridad

- Respuestas correctas solo en servidor
- URLs firmadas para PDFs
- Validación server-side de respuestas

## 🌍 Monetización

### Precios por País (PPP)
- 🇻🇪 Venezuela: Bs. 258
- 🇲🇽 México: $99 MXN
- 🇨🇴 Colombia: $19,900 COP
- 🇪🇸 España: €9.99
- 🇺🇸 USA: $9.99

### Pasarelas de Pago
- Stripe (Global)
- Mercado Pago (LatAm)
- Binance Pay (Venezuela)

## 📈 Próximos Pasos

### Sprint 1 ✅ (Completado)
- [x] Estructura del proyecto
- [x] Todas las páginas del flujo
- [x] Algoritmo de scoring
- [x] Diseño UI/UX

### Sprint 2 (Siguiente)
- [ ] Integrar preguntas reales con imágenes
- [ ] Generación de PDF con Puppeteer
- [ ] Detección de IP para geolocalización
- [ ] Sistema de notificaciones (compras recientes)

### Sprint 3
- [ ] Integración Stripe
- [ ] Integración Mercado Pago
- [ ] Webhooks de pago
- [ ] Base de datos PostgreSQL

### Sprint 4
- [ ] Email marketing automático
- [ ] Pixels de Meta/Google Ads
- [ ] Analytics y A/B testing
- [ ] Panel de administración

## 🛠️ Tecnologías

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Language**: TypeScript

## 📝 Notas de Desarrollo

- El test actual usa preguntas mock. En producción, reemplazar con matrices Raven reales.
- Los precios están hardcoded. Implementar API de geolocalización (ipapi.co o similar).
- El checkout es simulado. Integrar Stripe/MercadoPago en producción.

## 📄 Licencia

Proyecto privado - Todos los derechos reservados
