# Supabase Setup Guide for NeuroIQ

## Step 1: Create Supabase Account
1. Go to https://supabase.com
2. Click "Start your project" or "Sign Up"
3. Sign in with GitHub (recommended) or Google

## Step 2: Create New Project
1. Click "New Project"
2. Fill in the details:
   - **Organization**: Select or create one
   - **Name**: neuroiq-production
   - **Database Password**: Create a strong password (SAVE THIS!)
   - **Region**: Choose closest to you (e.g., South America - São Paulo)
   - **Pricing Plan**: Select "Free" ✅
3. Click "Create new project"
4. Wait 1-2 minutes for setup to complete

## Step 3: Get Connection String
1. Once project is ready, go to **Project Settings** (gear icon ⚙️ in sidebar)
2. Click on **Database** section
3. Scroll to **Connection string**
4. Select the **URI** tab
5. Copy the connection string (looks like this):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
   ```
6. Replace `[YOUR-PASSWORD]` with the password you created in Step 2

## Step 4: Provide Connection String
Once you have the connection string, paste it here and I'll configure your project.

## What Happens Next
After you provide the connection string, I will:
1. Update your .env file with the Supabase URL
2. Run database migrations to create all tables
3. Seed the database with 30 IQ test questions
4. Test the connection
5. Your app will be ready for production! 🚀
