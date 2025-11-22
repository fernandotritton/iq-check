import { createClient } from '@supabase/supabase-js';

// Hardcoded for immediate fix - these are public keys anyway
const supabaseUrl = 'https://jmbdnzwuvmjlsghszvor.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptYmRuend1dm1qbHNnaHN6dm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NTY2NjIsImV4cCI6MjA3OTIzMjY2Mn0.f2_o3pATfdYQikZjyQkrCQj770gOJgcu2gC5ywU01I0';

export const supabase = createClient(supabaseUrl, supabaseKey);
