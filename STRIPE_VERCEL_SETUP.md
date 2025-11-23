# Configuración de Stripe en Vercel

## Variables de Entorno a Agregar

Ve a tu proyecto en Vercel → **Settings** → **Environment Variables** y agrega estas 3 variables:

### 1. NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
```
pk_test_51STcPSDdeEmV7AhsjKiqe9Wc2W90ZXoxSHEd1lMvslSqyZCrY4epnLmSpXZmanB5bxSUazhYxO9YdcNBdo5LWdCd00sO8gUCEQ
```
- **Environment:** Production, Preview, Development (las 3)

### 2. STRIPE_SECRET_KEY
```
sk_test_51STcPSDdeEmV7Ahs8qFfXLZrNUj8uXTgcrGzMeahCt3owOzvSlgsA7bWXsT8Ss7xSuiUcuJ0AlmJiYuJbDFoMIfm00NeMztjYv
```
- **Environment:** Production, Preview, Development (las 3)

### 3. STRIPE_WEBHOOK_SECRET
```
(Dejar vacío por ahora - lo configuraremos después del primer deploy)
```
- **Environment:** Production, Preview, Development (las 3)

### 4. NEXT_PUBLIC_APP_URL (Opcional pero recomendado)
```
https://iq-check-umdy.vercel.app
```
- **Environment:** Production

---

## Después de Agregar las Variables

1. Haz clic en **"Redeploy"** en Vercel
2. Espera a que termine el build
3. Prueba el flujo de pago completo

---

## Configurar Webhook (Después del Deploy)

Una vez que el sitio esté desplegado:

1. Ve a Stripe Dashboard → **Developers** → **Webhooks**
2. Haz clic en **"Add endpoint"**
3. URL del endpoint: `https://iq-check-umdy.vercel.app/api/stripe/webhook`
4. Selecciona estos eventos:
   - `checkout.session.completed`
5. Copia el **Signing secret** (empieza con `whsec_...`)
6. Agrégalo como `STRIPE_WEBHOOK_SECRET` en Vercel
7. Redeploy de nuevo

---

## Probar con Tarjetas de Prueba

Usa estas tarjetas en el checkout de Stripe:

- **Éxito:** `4242 4242 4242 4242`
- **Fecha:** Cualquier fecha futura
- **CVC:** Cualquier 3 dígitos
- **ZIP:** Cualquier código postal
