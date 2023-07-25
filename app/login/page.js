import LoginForm from "@/components/loginform/loginform";
import styles from "@/components/styles/forms.module.css";
import GoogleLogo from "@/assets/GoogleLogo";

const Login = () => {
  return (
    <div id={styles.loginWrapper}>
      <GoogleLogo />
      <h2 className={styles.loginWrapperText}>Sign in</h2>
      <p className={styles.loginWrapperText} id={styles.signInToText}>
        to continue to YouTube
      </p>
      <LoginForm />
    </div>
  );
};

export default Login;
