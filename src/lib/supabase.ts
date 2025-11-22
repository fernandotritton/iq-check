import { createClient } from '@supabase/supabase-js';

// Lazy initialization to avoid build-time errors
let supabaseInstance: ReturnType<typeof createClient> | null = null;

export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
    get(target, prop) {
        if (!supabaseInstance) {
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jmbdnzwuvmjlsghszvor.supabase.co';
            const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

            if (!supabaseKey) {
                throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined');
            }

            supabaseInstance = createClient(supabaseUrl, supabaseKey);
        }
        return (supabaseInstance as any)[prop];
    }
});
