import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _supabaseAdmin: SupabaseClient | null = null;

/**
 * Server-side Supabase client using the service role key.
 * Lazily instantiated to avoid build-time crashes when env vars are missing.
 * ONLY import this in server-side code (API routes, server components).
 * Never expose to the client — the service role key bypasses RLS.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (_supabaseAdmin) return _supabaseAdmin;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      "[Supabase Admin] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  _supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
  return _supabaseAdmin;
}
