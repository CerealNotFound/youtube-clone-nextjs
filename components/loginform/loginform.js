"use client";
import Link from "next/link";
import styles from "../styles/forms.module.css";
import { UserContext } from "@/app/context/userContext";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const user = useContext(UserContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    if (email && password) {
      try {
        console.log(email);
        console.log(password);
        const response = await fetch(
          "http://localhost:3000/api/user/authUser",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userEmail: email,
              userPassword: password,
            }),
          }
        );

        if (response.status === 401) {
          console.error("Authentication failed. Invalid credentials.");
          return null;
        }

        const userData = await response.json();
        console.log("Authentication successful, welcome back 😊", userData);
        return userData;
      } catch (error) {
        console.error("Error occurred while authenticating", error);
        return null;
      }
    }
  };
  return (
    <form
      id={styles.loginForm}
      className={styles.form}
      onSubmit={async (event) => {
        event.preventDefault();
        const userData = await loginHandler();
        console.log(userData);
        if (userData) {
          await user.changeUser(userData);
          if (user.user) {
            router.push("/home");
          }
        }
      }}
    >
      <input
        id={styles.email}
        onChange={(event) => setEmail(event.target.value)}
        className={styles.inputBordered}
        type="text"
        placeholder="Email"
      />
      <input
        id={styles.password}
        onChange={(event) => setPassword(event.target.value)}
        className={styles.inputBordered}
        type="password"
        placeholder="Password"
      />
      <div className={styles.formOtheractions}>Forgot password?</div>
      <div id={styles.guestModeWrapper}>
        <div id={styles.guestModeText}>
          Not your computer? Use Guest mode to sign in privately.
        </div>
        <div className={styles.formOtheractions}>Learn more</div>
      </div>
      <div id={styles.formActionsWrapper}>
        <Link
          id={styles.createAccount}
          className={styles.links}
          href={"/signup"}
        >
          Create account
        </Link>
        <input type="submit" value="Next" id={styles.submit} />
      </div>
    </form>
  );
};

export default LoginForm;
