import SignupForm from "@/components/signupform/signupform";
import styles from "@/components/styles/forms.module.css";
import GoogleLogo from "@/assets/GoogleLogo";

const SignUp = () => {
  return (
    <div id={styles.signupWrapper}>
      <GoogleLogo />
      <h2 className={styles.signupWrapperText}>Create a Google Account</h2>
      <p className={styles.SignupWrapperText} id={styles.signupToText}>
        to continue to YouTube
      </p>
      <SignupForm />
    </div>
  );
};

export default SignUp;
