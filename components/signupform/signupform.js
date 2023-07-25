"use client";

import styles from "../styles/forms.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  const signupHandler = async () => {
    if (email && password) {
      try {
        console.log(email);
        console.log(password);
        const response = await fetch(
          "http://localhost:3000/api/user/createUser",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
              avatar: avatar,
              username: username,
            }),
          }
        );

        if (response.status === 401) {
          console.error("failed to create user, check entered details");
          return null;
        }
        const userCred = await response.json();
        console.log("Successfully created user 😄", userCred);
        return userCred;
      } catch (error) {
        console.error("Error occurred while authenticating", error);
        return null;
      }
    }
  };
  return (
    <form
      id={styles.signupForm}
      onSubmit={async (event) => {
        event.preventDefault();
        console.log("signup triggered");
        await signupHandler();
        router.push("/login");
      }}
    >
      <input
        id={styles.username}
        className={styles.inputBordered}
        onChange={(event) => setUsername(event.target.value)}
        type="text"
        placeholder="Username"
      />
      <input
        id={styles.avatar}
        className={styles.inputBordered}
        onChange={(event) => setAvatar(event.target.value)}
        type="text"
        placeholder="Avatar"
      />
      <input
        id={styles.email}
        className={styles.inputBordered}
        onChange={(event) => setEmail(event.target.value)}
        type="text"
        placeholder="Email"
      />
      <input
        id={styles.password}
        className={styles.inputBordered}
        onChange={(event) => setPassword(event.target.value)}
        type="password"
        placeholder="Password"
      />
      <div id={styles.formActionsWrapper}>
        <Link href="/login" className={styles.links} id={styles.createAccount}>
          Log in
        </Link>
        <input type="submit" value="Create" id={styles.submit} />
      </div>
    </form>
  );
};

export default SignupForm;
