import { createClient } from '@supabase/supabase-js';

// ⚠️ 중요: Supabase 프로젝트 설정(Settings) > API 에서 복사한 URL과 Anon Key를 아래에 입력하세요.
// 이 정보가 없으면 데이터베이스 연결이 되지 않습니다.

const supabaseUrl = 'https://wjeygyttdaidjwcfwpav.supabase.co'; 
const supabaseKey = 'sb_publishable_3qOJZO4DlLk6WWYhe9nvAw_dBr3pIoX';

export const supabase = createClient(supabaseUrl, supabaseKey);