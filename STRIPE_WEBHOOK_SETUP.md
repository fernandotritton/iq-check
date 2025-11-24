# ✅ Webhook de Stripe - Configuración Completa

## 🎯 Paso Final: Agregar a Vercel

**Ya tienes el Signing Secret:**
```
whsec_EWSlyY7g03ZP8qq9yhk8EnmAucb09pn2
```

---

## 📝 Agrega la Variable en Vercel:

### 1. Ve a Vercel:
- [https://vercel.com/dashboard](https://vercel.com/dashboard)
- Selecciona tu proyecto **iq-check**

### 2. Settings → Environment Variables:
- En el menú lateral: **Settings**
- Luego: **Environment Variables**

### 3. Add New Variable:
Haz clic en **"Add New"** y completa:

**Key:**
```
STRIPE_WEBHOOK_SECRET
```

**Value:**
```
whsec_EWSlyY7g03ZP8qq9yhk8EnmAucb09pn2
```

**Environments:**
- ✅ Production
- ✅ Preview  
- ✅ Development

### 4. Save y Redeploy:
- Haz clic en **"Save"**
- Ve a **Deployments**
- En el último deploy → 3 puntitos (⋮) → **"Redeploy"**
- Espera 2-3 minutos

---

## ✅ Verificar que Funciona:

Después del redeploy, puedes probar:

1. Hacer un pago de prueba con Stripe
2. Usar tarjeta de test: `4242 4242 4242 4242`
3. El webhook debería actualizar la BD automáticamente
4. El usuario verá sus resultados sin intervención manual

---

## 🎉 Resultado Final:

### Con Webhook Configurado:
✅ Pago con Stripe → Automático  
✅ Actualización BD → Automático  
✅ Acceso a resultados → Automático  

### Sin Webhook:
⚠️ Pago funciona, pero hay que aprobar manualmente

---

**Sigue estos pasos y avísame cuando termines el redeploy.** 🚀
