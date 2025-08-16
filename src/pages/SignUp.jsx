import Button from "../components/Button";
import PageNav from "../components/PageNav";
import styles from "./SignUp.module.css";


function SignUp() {
  return (
    <main className={styles.signup}>
      <PageNav />

      <h1>Sign Up Page</h1>
      <p>Please fill out the form to create an account.</p>

      <form className={styles.form} method="post" action="/signup">
     
          <input type="email" name="email" placeholder="Email" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <Button type="submit"  >Sign Up</Button>
    
      </form>

      <p className={styles.signUpPrompt}>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </main>
  );
}

export default SignUp;