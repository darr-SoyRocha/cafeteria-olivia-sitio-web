import { createClient } from '@supabase/supabase-js';
import { SUPABASE_LLAVE_PUBLICA, SUPABASE_URL } from './config';

export const supabase = createClient(SUPABASE_URL, SUPABASE_LLAVE_PUBLICA);
