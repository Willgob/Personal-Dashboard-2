import {createClient} from '@supabase/supabase-js'

const supabaseUrl = 'https://kdccfinlehppjnqsuqeb.supabase.co'
const supabaseKey = 'sb_publishable_SKvu8akhsTvscl3vifSslQ_Gs1GGxF1'

export const supabase = createClient(supabaseUrl, supabaseKey)