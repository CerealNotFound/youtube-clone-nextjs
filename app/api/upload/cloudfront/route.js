import { getSignedUrl } from "@aws-sdk/cloudfront-signer";
import { supabase } from "@/app/middleware/middleware";

export const GET = async (request) => {
  try {
    let { data: videos, error } = await supabase.from("videos").select("video");
    if (error) {
      console.error(error);
      return new Response("fetching videos from s3 using cloudfront failed!", {
        status: 500,
      });
    }
    const allVideos = [];
    for (const video of videos) {
      allVideos.push(
        getSignedUrl({
          url: `https://d1fhrqfopfiiju.cloudfront.net/${video.video}`,
          dateLessThan: new Date(Date.now() + 1000 * 60 * 60 * 24),
          privateKey: process.env.PRIVATE_CLOUDFRONT_KEY,
          keyPairId: process.env.CLOUDFRONT_KEY_PAIR_ID,
        })
      );
    }
    console.log("Successfully fetched videos from S3 😌");
    return new Response(allVideos, { status: 200 });
    // res.status(200).send(allVideos);
  } catch (err) {
    console.err("fetching videos from s3 using cloudfront failed!");
  }
};
