import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://lnykemhxwaujgjwamird.supabase.co",
  process.env.SUPABASE_KEY
);
