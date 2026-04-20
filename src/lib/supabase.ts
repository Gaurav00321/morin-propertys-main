import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client for general data fetching (frontend)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// If we need a server-side client with admin privileges, we'd use service_role_key,
// but for public data and basic inserts, anon key is sufficient given proper RLS.
