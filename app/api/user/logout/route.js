import { supabase } from "@/app/middleware/middleware";

export const POST = async () => {
  const { error } = await supabase.auth.signOut();
  if (!error) {
    console.log("Successfully logged out 👍");
    return new Response("Successfully logged out 👍", { status: 200 });
  }
  return new Response(`failed to logout user ${error}`, { status: 500 });
};
