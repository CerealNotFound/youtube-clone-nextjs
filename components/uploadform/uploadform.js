"use client";
import { useContext, useState } from "react";
import { UserContext } from "@/app/context/userContext";
import styles from "./uploadform.module.css";
import { getData, getUser, getUrl } from "./endpoints";

const userProvider = async (username) => {
  try {
    const userData = await getUser(username);
    console.log(userData);
    return userData;
  } catch (err) {
    console.error(`Error occoured while getting users: ${err}`);
  }
};

const UploadForm = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [duration, setDuration] = useState("");

  const userCred = useContext(UserContext);

  const user = async () => {
    const user = await userProvider(userCred.user.user.user_metadata.name);
    return user;
  };

  const getVideoDuration = (file) => {
    return new Promise((resolve, reject) => {
      if (!file || !file.type.startsWith("video/")) {
        reject(new Error("Invalid video file"));
      }

      const videoElement = document.createElement("video");
      videoElement.preload = "metadata";

      videoElement.onloadedmetadata = () => {
        const videoDuration = videoElement.duration;
        resolve(videoDuration);
      };

      videoElement.onerror = (error) => {
        reject(error);
      };

      const reader = new FileReader();
      reader.onload = (event) => {
        videoElement.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const videoIdProvider = async () => {
    const videos = await getData();
    const sortedVideos = videos.sort((a, b) => a.id - b.id);
    const videoId = sortedVideos[sortedVideos.length - 1].id;
    return videoId;
  };

  const uploadHandler = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const id = await videoIdProvider();
        const creator = await user();
        const url = await getUrl();
        const currentDate = new Date().toISOString();
        const file = document.getElementById(styles.selectInput).files[0];

        const data = {
          id: id + 1,
          title: title,
          thumbnail: thumbnail,
          duration: duration,
          creator: creator[0].username,
          avatar: creator[0].avatar,
          views: 0,
          uploaded_on: currentDate,
          verified: creator[0].is_verified,
          video: url.videoName,
        };

        try {
          await fetch(url.uploadURL, {
            method: "PUT",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            body: file,
          });
        } catch (error) {
          reject("Failed to upload video", error);
        }

        try {
          await fetch("http://localhost:3000/api/videos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        } catch (error) {
          reject("Failed to post video to Supabase", error);
        }

        resolve("Video posted successfully 😎🔥");
      } catch (error) {
        reject(error);
      }
    });
  };

  return (
    <form
      id={styles.videoForm}
      onSubmit={(event) => {
        event.preventDefault();
        uploadHandler()
          .then((response) => {
            console.log("Successfully fetched data");
            alert(response);
          })
          .catch((err) => {
            console.log(err);
          });
      }}
    >
      <input
        type="file"
        id={styles.selectInput}
        onChange={(event) => {
          getVideoDuration(event.target.files[0])
            .then((duration) => {
              console.log("Video duration:", duration);
              setDuration(duration);
            })
            .catch((error) => {
              console.error("Error fetching video duration:", error);
            });
        }}
      />
      <label htmlFor={styles.selectInput} id={styles.selectButton}>
        <p>SELECT FILES</p>
      </label>
      <input
        id={styles.inputTitle}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        type="text"
        placeholder="Title"
      />
      <input
        id={styles.inputThumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
        type="text"
        placeholder="Thumbnail"
      />
      <input id={styles.submit} type="submit" />
    </form>
  );
};

export default UploadForm;
