import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.warn(
    "[Supabase Admin] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
  );
}

/**
 * Server-side Supabase client using the service role key.
 * ONLY import this in server-side code (API routes, server components).
 * Never expose to the client — the service role key bypasses RLS.
 */
export const supabaseAdmin = createClient(
  supabaseUrl || "",
  supabaseServiceRoleKey || ""
);
