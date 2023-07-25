import styles from "./videos.module.css";

const getData = async () => {
  const response = await fetch("http://localhost:3000/api/videos");

  if (!response.ok) {
    throw new Error("Failed to fetch videos");
  }

  return response.json();
};

const formatNumberOfViews = (views) => {
  let formattedViews;
  if (views >= 1000000) {
    formattedViews = (views / 1000000).toFixed(1);
    return formattedViews.endsWith(".0")
      ? formattedViews.slice(0, -2) + "M"
      : formattedViews + "M";
  } else if (views >= 1000) {
    formattedViews = (views / 1000).toFixed(1);
    return formattedViews.endsWith(".0")
      ? formattedViews.slice(0, -2) + "K"
      : formattedViews + "K";
  } else {
    return views;
  }
};

const uniformDate = (date) => {
  // Convert the stored date to the user's local timezone

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const userOffset = new Date().getTimezoneOffset() * 60000; // Offset in milliseconds
  const userTimestamp = new Date(`${date}T00:00:00`).getTime() - userOffset;
  const localDate = new Date(userTimestamp).toLocaleString(undefined, {
    timeZone: userTimezone,
  });

  const onlyDate = localDate.split(",")[0].trim();
  const dateParts = onlyDate.split("/");
  const year = dateParts[2];
  const month = dateParts[0].padStart(2, "0"); // Zero-pad the month if necessary
  const day = dateParts[1].split(",")[0].trim().padStart(2, "0"); // Extract the day, trim any whitespace, and zero-pad if necessary

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};

const Videos = async () => {
  const videos = await getData();

  const sortedVideos = videos.sort((a, b) => a.id - b.id);

  return (
    <div id={styles.videos}>
      {sortedVideos.map((video) => (
        <div className={styles.videoTile} key={video.id}>
          <div className={styles.videoThumbnailWrapper}>
            <img
              className={styles.videoThumbnail}
              src={video.thumbnail}
              alt="Video Thumbnail"
            />
            <div className={styles.videoDuration}>{video.duration}</div>
          </div>
          <div className={styles.videoInfoWrapper}>
            <img
              className={styles.creatorAvatar}
              src={video.avatar}
              alt="Creator Avatar"
            />
            <div className={styles.videoTitleWrapper}>
              <h4 className={styles.h4}>{video.title}</h4>
              <div className={styles.channelNameWrapper}>
                <div className={styles.creator}>{video.creator}</div>
                {video.verified && (
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className={styles.verifiedIcon}
                  >
                    <path
                      d="M12,2C6.5,2,2,6.5,2,12c0,5.5,4.5,10,10,10s10-4.5,10-10C22,6.5,17.5,2,12,2z M9.8,17.3l-4.2-4.1L7,11.8l2.8,2.7L17,7.4 l1.4,1.4L9.8,17.3z"
                      fill="#aaa"
                    />
                  </svg>
                )}
              </div>
              <div className={styles.viewsUploadedOnWrapper}>
                <span>{formatNumberOfViews(video.views)}</span>
                <span className={styles.separator}>·</span>
                <span>{uniformDate(video.uploaded_on)}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Videos;
