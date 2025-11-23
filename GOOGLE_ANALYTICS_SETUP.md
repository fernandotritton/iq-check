# Configuración de Google Analytics

## Paso 1: Crear Cuenta de Google Analytics

1. Ve a [analytics.google.com](https://analytics.google.com)
2. Haz clic en **"Start measuring" / "Empezar a medir"**
3. Crea una **Account** (Cuenta):
   - Nombre: **IQCheck** (o el nombre que prefieras)

## Paso 2: Crear Propiedad (Property)

1. Nombre de la propiedad: **IQCheck Website**
2. Zona horaria: **Venezuela (Caracas)** o tu zona
3. Moneda: **USD** (Dólar estadounidense)

## Paso 3: Configurar Detalles del Negocio

1. Categoría industrial: **Educación** o **Salud y Bienestar**
2. Tamaño del negocio: **Pequeño** (1-10 empleados)
3. Objetivos: Marca todas las que apliquen

## Paso 4: Crear Data Stream

1. Selecciona: **Web**
2. URL del sitio: `https://iq-check-umdy.vercel.app`
3. Nombre del stream: **IQCheck Production**

## Paso 5: Obtener Measurement ID

Después de crear el data stream, verás el **Measurement ID**:
- Se ve algo así: `G-XXXXXXXXXX`
- Comienza con `G-`

**Copia este ID.**

---

## Paso 6: Agregar a Vercel

1. Ve a **Vercel** → tu proyecto → **Settings** → **Environment Variables**
2. Agrega una nueva variable:
   - **Nombre:** `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Valor:** `G-XXXXXXXXXX` (tu Measurement ID)
   - **Entornos:** Production, Preview, Development (todos)
3. Guarda y haz **Redeploy**

---

## ✅ Verificar que Funciona

1. Después del deploy, visita tu sitio
2. En Google Analytics, ve a **Reports** → **Realtime**
3. Deberías ver tu visita en tiempo real

---

## 📊 Métricas Importantes a Trackear

Una vez configurado, podrás ver:
- **Visitantes en tiempo real**
- **Páginas más visitadas**
- **Tasa de conversión** (test → pago)
- **Geografía** (de dónde vienen tus visitantes)
- **Dispositivos** (móvil vs desktop)

---

## 🔮 Eventos Personalizados (Opcional - Futuro)

Puedes trackear eventos específicos como:
- Usuario inició el test
- Usuario completó el test
- Usuario realizó un pago
- Usuario descargó PDF

Estos los configuraremos más adelante si quieres.
