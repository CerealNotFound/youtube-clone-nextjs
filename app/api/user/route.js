import { supabase } from "@/app/middleware/middleware";

export const POST = async (request) => {
  const req = await request.json();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", req.username);

  if (error) {
    return new Response(`failed to fetch user, error: ${error}`, {
      status: 500,
    });
  }
  return new Response(JSON.stringify(data), { status: 200 });
};
