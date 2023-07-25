import { supabase } from "@/app/middleware/middleware";

export const POST = async (request) => {
  const userCredentials = await request.json();
  try {
    const { data, error } = await supabase.auth.signUp({
      email: userCredentials.email,
      password: userCredentials.password,
      options: {
        data: {
          name: userCredentials.username,
          avatar: userCredentials.avatar,
        },
      },
    });

    if (error) {
      return new Response("failed to create user, check entered details", {
        status: 500,
      });
    }
    console.log("Successfully created user 😄");
    return new Response(data, { status: 200 });
  } catch (error) {
    console.error("failed to call user creation");
  }
};
