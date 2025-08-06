import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading, error, clearError } = useAuth();

  async function handleSignIn(e) {
    e.preventDefault();
    clearError();

    try {
      await login(email, password);
    } catch (error) {
      // Error is already handled in the context
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const isValid = email.includes("@") && password.length >= 6;

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
            required
            disabled={isLoading}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        )}

        <Button type="primary" disabled={!isValid || isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </form>
    </main>
  );
}