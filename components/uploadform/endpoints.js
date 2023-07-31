export const getData = async () => {
  const response = await fetch("http://localhost:3000/api/videos");

  if (!response.ok) {
    throw new Error("Failed to fetch videos");
  }

  return response.json();
};

export const getUser = async (username) => {
  const response = await fetch("http://localhost:3000/api/user", {
    method: "POST",
    body: JSON.stringify({
      username: username,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch videos");
  }

  return response.json();
};

export const getUrl = async () => {
  const response = await fetch("http://localhost:3000/api/upload/s3");

  if (!response.ok) {
    throw new Error("Failed to fetch S3 URL");
  }

  return response.json();
};
