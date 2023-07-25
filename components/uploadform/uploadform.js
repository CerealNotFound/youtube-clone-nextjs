"use client";
import { useContext } from "react";
import { UserContext } from "@/app/context/userContext";
import styles from "./uploadform.module.css";
import { getData, user } from "./endpoints";

// const user = JSON.parse(Window.localStorage.getItem("user"));

let isVideo = false;
// let idTracker =
// idTracker += 1;
let formattedDuration;

const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};

let uploaded_on;

const UploadForm = () => {
  const videos = getData();

  const sortedVideos = videos.sort((a, b) => a.id - b.id);
  const videoIdTracker = sortedVideos[sortedVideos.length - 1].id;

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  let file;

  const fileHandler = () => {
    file = document.querySelector("#selectInput").files[0];
    const video = document.createElement("video");
    console.log(file);

    //Wait for metadata to be loaded
    video.addEventListener("loadedmetadata", () => {
      //access the duration of the video
      let notFormattedduration = video.duration;
      formattedDuration = formatDuration(notFormattedduration);
    });

    video.preload = "metadata"; // Set preload to 'metadata' to only load video metadata, not the whole video file

    video.src = URL.createObjectURL(file);

    // Attach the video element to the document temporarily to trigger metadata loading
    document.body.appendChild(video);

    // Remove the video element from the document after metadata is loaded
    video.addEventListener("loadeddata", function () {
      document.body.removeChild(video);
      isVideo = true;
    });
  };

  const userCreds = useContext(UserContext);

  const user = getUser(userCreds.user.user_metadata.name);
  console.log(user);
  const uploadHandler = async () => {
    let [title, setTitle] = useState("");
    let [thumbnail, setThumbnail] = useState("");

    if (title && thumbnail && isVideo) {
      let url;
      let videoName;

      try {
        const response = await fetch("http://localhost:3000/api/upload/s3");
        const data = await response.json();
        console.log(data);
        url = data.uploadURL;
        videoName = `${data.videoName}.mp4`;
        console.log(data.uploadURL);
        console.log(data.videoName);
      } catch (error) {
        alert("Failed to fetch link");
        console.error("Failed to fetch link", error);
      }

      try {
        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: file,
        });

        console.log(file);
      } catch (error) {
        alert("Failed to upload video", error);
        // return;
      }

      uploaded_on = formatDate(new Date());
      const data = {
        id: idTracker,
        title: title,
        thumbnail: thumbnail,
        duration: formattedDuration,
        creator: user.username,
        avatar: user.avatar,
        views: 0,
        uploaded_on: uploaded_on,
        verified: user.is_verified,
        video: videoName,
      };
    }
  };

  return (
    <form id={styles.videoForm}>
      <input
        type="file"
        id={styles.selectInput}
        onChange={() => {
          fileHandler();
        }}
      />
      <label htmlFor="selectInput" id={styles.selectButton}>
        <p>SELECT FILES</p>
      </label>
      <input
        id={styles.inputTitle}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title"
      />
      <input
        id={styles.inputThumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
        type="text"
        placeholder="Thumbnail"
      />
      <input
        id={styles.submit}
        type="submit"
        onSubmit={(event) => {
          event.preventDefault();
          uploadHandler();
        }}
      />
    </form>
  );
};

export default UploadForm;
