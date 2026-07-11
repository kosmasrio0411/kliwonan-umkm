import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('WARNING: Missing SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY in environment variables.');
}

const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

// Initialize the Supabase client
const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Initialize the Supabase Admin client for backend operations that bypass RLS
export const supabaseAdmin = createClient(supabaseUrl || '', supabaseSecretKey || '');

export default supabase;
