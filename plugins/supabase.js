
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vkosojyroewwdqduqhry.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrb3Nvanlyb2V3d2RxZHVxaHJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjU5MjMxOCwiZXhwIjoyMDQyMTY4MzE4fQ.-HpZsdibQAt2tiFpWo_W7u4M2WGMpLkI6VfADFaVd48'

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('supabase', supabase);
});
