import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase"; // ✅ Import the correct instance
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e, type) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (type === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up successfully");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in successfully");
      }
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const isValid = email.includes("@") && password.length > 6;

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div>
          <button
            type="submit"
            onClick={(e) => handleAuth(e, "signin")}
            disabled={!isValid}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <button
            type="submit"
            onClick={(e) => handleAuth(e, "signup")}
            disabled={!isValid}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </form>
    </main>
  );
}
