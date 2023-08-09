"use client";
import { useContext } from "react";
import { UserContext } from "@/app/context/userContext";
import { getUser } from "../uploadform/endpoints";
import styles from "./user.module.css";
import Image from "next/image";

export const User = () => {
  const userCred = useContext(UserContext);
  console.log(userCred);

  return (
    <div>
      <Image
        id={styles.userAvatar}
        src={userCred.user.user.user_metadata.avatar}
        alt="Avatar"
        width="50"
        height="50"
      />
    </div>
  );
};
