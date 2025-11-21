# Instrucciones para Configurar la Base de Datos en Supabase

## Paso 1: Crear las Tablas

1. En Supabase, ve a **SQL Editor** (menú lateral izquierdo)
2. Click en **"New query"** o el botón **"+"**
3. Abre el archivo: `prisma/create_tables.sql`
4. **Copia TODO el contenido** del archivo
5. **Pega** el contenido en el SQL Editor de Supabase
6. Click en **"Run"** (o presiona Ctrl + Enter)
7. Espera a que termine (2-3 segundos)
8. Verifica que aparezca **"Success"** o **"Completed"**

## Paso 2: Cargar las 30 Preguntas del Test

1. En Supabase SQL Editor, click en **"New query"** nuevamente
2. Abre el archivo: `prisma/seed_questions.sql`
3. **Copia TODO el contenido** del archivo
4. **Pega** el contenido en el nuevo SQL Editor
5. Click en **"Run"**
6. Espera a que termine
7. Verifica que aparezca **"Success"**

## Verificación

Después de ejecutar ambos scripts, verifica en Supabase:
- Ve a **Table Editor** (menú lateral)
- Deberías ver las tablas: User, TestSession, Question, Answer, Result, Transaction
- La tabla **Question** debería tener **30 filas** (las preguntas del test)

## ¿Qué hacer después?

Una vez completados estos pasos, avísame diciendo:
- ✅ "Listo" - si todo funcionó
- ❌ "Error: [mensaje]" - si hubo algún problema

Entonces continuaré con la integración del frontend con la base de datos.
