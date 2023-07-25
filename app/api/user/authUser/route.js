import { supabase } from "@/app/middleware/middleware";

export const POST = async (request) => {
  const userCredentials = await request.json();
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userCredentials.userEmail,
      password: userCredentials.userPassword,
    });
    if (error) {
      return new Response(
        `invalid credentials, authentication failed! ${error}`,
        {
          status: 401,
        }
      );
    }
    console.log("Authentication successful, welcome back 😊");
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("failed to make authentication request", error);
  }
};
