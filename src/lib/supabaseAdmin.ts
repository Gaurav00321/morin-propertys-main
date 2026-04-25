import { createClient, SupabaseClient } from '@supabase/supabase-js'

/**
 * Server-side Supabase client with service_role key.
 * This client bypasses RLS and is used exclusively for
 * server-side operations like blog image uploads.
 *
 * ⚠️ NEVER expose this client or its key to the browser.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase environment variables for admin client')
}

export const supabaseAdmin: SupabaseClient = createClient(
  supabaseUrl,
  supabaseServiceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)
