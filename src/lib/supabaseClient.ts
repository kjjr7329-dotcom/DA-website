import { createClient } from '@supabase/supabase-js';

// 1. 주소 (한 줄로!)
const supabaseUrl = "https://lxwkmmrxjlpcwmacwdqt.supabase.co";

// 2. 비밀키 (JJin님의 긴 키를 따옴표 안에 붙여넣으세요. 엔터 절대 금지!)
// 팁: Alt + Z 를 누르면 줄이 자동으로 정리되어 보입니다.
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4d2ttbXJ4amxwY3dtYWN3ZHF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3OTcxNjUsImV4cCI6MjA4MTM3MzE2NX0.vA2ob_L4LMeLrAi8AEDDahlHypp__ZadtDDxiq9kOGs";

export const supabase = createClient(supabaseUrl, supabaseKey);