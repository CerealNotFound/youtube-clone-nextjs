import { supabase } from "@/app/middleware/middleware";

export const GET = async (request) => {
  const { data, error } = await supabase.from("videos").select();
  if (error) {
    return new Response(`failed to fetch data from videos, error: ${error}`, {
      status: 500,
    });
  }
  return new Response(JSON.stringify(data), { status: 200 });
};

export const DELETE = async (request) => {
  const req = await request.json();

  const { error } = await supabase.from("videos").delete().eq("id", req.id);
  if (error) {
    return new Response("deletion of item from videos failed", { status: 500 });
  }
  return new Response("item deleted successfully from videos👌", {
    status: 200,
  });
};

export const POST = async (request) => {
  const req = await request.json();
  const { error } = await supabase.from("videos").insert({
    id: req.id,
    title: req.title,
    thumbnail: req.thumbnail,
    duration: req.duration,
    creator: req.creator,
    avatar: req.avatar,
    views: req.views,
    uploaded_on: req.uploaded_on,
    verified: req.verified,
    video: req.video,
  });
  if (error) {
    return new Response(`posting of video failed`, { status: 500 });
  }
  return new Response("added videos!!☕", { status: 200 });
};

export const PATCH = async (request) => {
  const req = await request.json();

  const { data, error } = await supabase
    .from("videos")
    .update(req.data)
    .eq("id", req.id);

  if (error) {
    console.error(error);
    return new Response(`record update failed in videos!`, { status: 500 });
  }
  return new Response("record updated successfully🧋", { status: 200 });
};
