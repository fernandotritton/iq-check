import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

console.log('Connecting to:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    try {
        const { data, error } = await supabase
            .from('Question')
            .select('count', { count: 'exact', head: true });

        if (error) {
            console.error('Connection failed:', error);
        } else {
            console.log('Successfully connected via HTTP!');
            console.log(`Found ${data} questions (count check only).`);

            // Try fetching one question
            const { data: questions, error: qError } = await supabase
                .from('Question')
                .select('id, type')
                .limit(1);

            if (qError) console.error('Fetch error:', qError);
            else console.log('Sample question fetched:', questions);
        }
    } catch (e) {
        console.error('Unexpected error:', e);
    }
}

testConnection();
