import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    // This allows the build to pass even if env vars are missing, 
    // but will throw at runtime if used without config
    if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
        console.warn('Supabase env vars missing during build');
    }
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseKey || 'placeholder'
);
