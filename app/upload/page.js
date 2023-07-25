import Link from "next/link";
import { Cross, MoreInfo } from "@/assets/Icons";
import UploadForm from "@/components/uploadform/uploadform";
import styles from "./upload.module.css";

const UploadVideo = () => {
  return (
    <section id={styles.uploadSection}>
      <div id={styles.headerWrapper}>
        <p id={styles.pageTitle}>Upload videos</p>
        <div id={styles.rightIcons}>
          <div className={styles.icons}>
            <MoreInfo />
          </div>
          <Link className={styles.icons} href={"/home"}>
            <Cross />
          </Link>
        </div>
      </div>
      <div id={styles.mainContentWrapper}>
        <div id={styles.arrowGroup}>
          <div id={styles.arrow}>
            <div id={styles.arrowTip}></div>
            <div id={styles.arrowLine}></div>
          </div>
          <div id={styles.arrowUnderline}></div>
        </div>
        <p id={styles.primaryText}>Drag and drop video files to upload</p>
        <p id={styles.secondaryText}>
          Your videos will be private until you publish them
        </p>
        <UploadForm />
      </div>
    </section>
  );
};

export default UploadVideo;
