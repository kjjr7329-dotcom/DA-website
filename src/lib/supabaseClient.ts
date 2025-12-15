import { createClient } from '@supabase/supabase-js';

// .env 파일에 있는 열쇠를 가져옵니다.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// 연결 시작!
export const supabase = createClient(supabaseUrl, supabaseKey);