"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userCred")) {
      setIsLoggedIn(true);
    }
    isLoggedIn ? router.push("/home") : router.push("/login");
  });

  return (
    <main className={styles.main}>
      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
        }
      `}</style>
      "this is the main page"
    </main>
  );
};

export default Home;
