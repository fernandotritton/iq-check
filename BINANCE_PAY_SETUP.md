# Configuración de Binance Pay

## Paso 1: Crear Cuenta de Binance (si no tienes)

1. Ve a [binance.com](https://www.binance.com)
2. Regístrate o inicia sesión
3. Completa la verificación KYC (Know Your Customer)

---

## Paso 2: Activar Binance Pay

1. En el menú principal de Binance, busca **"Pay"** o **"Binance Pay"**
2. Activa Binance Pay en tu cuenta

---

## Paso 3: Acceder a Binance Merchant

1. Ve a [merchant.binance.com](https://merchant.binance.com)
2. Inicia sesión con tu cuenta de Binance
3. Completa el proceso de registro de comerciante
   - Tipo de negocio: **Servicios Online / E-commerce**
   - Industria: **Educación / Evaluaciones**

---

## Paso 4: Obtener Credenciales API

Una vez registrado como comerciante:

1. Ve a **"Developer"** → **"API Management"**
2. Crea una nueva **API Key**
3. Anota:
   - **API Key** (pública)
   - **API Secret** (privada - guárdala bien)
   - **Merchant ID**

---

## Paso 5: Configurar Webhooks (Opcional)

Para recibir notificaciones de pago:

1. En **"Developer"** → **"Webhooks"**
2. Agrega URL: `https://iq-check-umdy.vercel.app/api/binance/webhook`

---

## Información Necesaria para la Integración

Una vez que tengas todo, necesitaré:
- ✅ API Key
- ✅ API Secret
- ✅ Merchant ID

---

## Precio Sugerido

**$2.99 USD** (en USDT, BTC, BNB, u otras criptomonedas soportadas)
- Más accesible para el mercado venezolano
- Conversión automática según la crypto que use el usuario

---

## Notas Importantes

- Binance Pay acepta **múltiples criptomonedas**: USDT, BTC, ETH, BNB, BUSD, etc.
- El usuario puede pagar con la crypto que prefiera
- La conversión es automática
- Comisiones muy bajas (< 1%)
