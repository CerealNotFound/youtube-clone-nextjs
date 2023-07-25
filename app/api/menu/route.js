import { supabase } from "@/app/middleware/middleware";

export const GET = async (request) => {
  const { data, error } = await supabase.from("filters").select();
  if (error) {
    return new Response(`failed to fetch data from menu, error: ${error}`, {
      status: 500,
    });
  }
  return new Response(JSON.stringify(data), { status: 200 });
};
