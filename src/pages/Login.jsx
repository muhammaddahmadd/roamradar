import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useAuth } from "../contexts/useAuth";
import { replace, useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("ranaahmad131@gmail.com");
  const [password, setPassword] = useState("test123.");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  async function handleSignIn(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app", { replace: true }); // replace bcz to avoid it going back
    }
  }, [isAuthenticated, navigate]);

  const isValid = email.includes("@") && password.length > 6;

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSignIn}>
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

        <Button type="primary" disabled={!isValid || loading}>
          {loading ? "Signing In..." : "Sign In"}
        </Button>
      </form>
    </main>
  );
}
