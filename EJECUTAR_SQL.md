# INSTRUCCIONES SIMPLES - Ejecutar SQL en Supabase

## Paso 1: Crear las Tablas

1. En Supabase, click en **"SQL Editor"** (menú izquierdo)
2. Click en **"New query"**
3. Abre el archivo: `prisma/create_tables.sql`
4. Copia TODO el contenido (Ctrl+A, Ctrl+C)
5. Pega en Supabase SQL Editor (Ctrl+V)
6. Click en **"RUN"** (botón verde)
7. Espera 2-3 segundos
8. Deberías ver "Success" ✅

## Paso 2: Cargar las 30 Preguntas

1. Click en **"New query"** nuevamente
2. Abre el archivo: `prisma/seed_questions.sql`
3. Copia TODO el contenido (Ctrl+A, Ctrl+C)
4. Pega en Supabase SQL Editor (Ctrl+V)
5. Click en **"RUN"**
6. Espera 2-3 segundos
7. Deberías ver "Success" ✅

## Verificación

1. Ve a **"Table Editor"** (menú izquierdo)
2. Click en la tabla **"Question"**
3. Deberías ver **30 filas** (las preguntas del test)

## Avísame

Cuando termines, dime:
- ✅ "Listo" - si todo funcionó
- ❌ "Error: [mensaje]" - si hubo problema
