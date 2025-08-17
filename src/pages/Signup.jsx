import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import styles from './SignUp.module.css';
import PageNav from '../components/PageNav';
import Button from '../components/Button';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Create authentication record
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: new Date().toISOString(),
        cities: [],
      });

      // Navigate to app
      navigate("/app");
    } catch (err) {
      let message = "An error occurred during sign up";
      if (err.code === "auth/email-already-in-use") {
        message = "This email is already registered";
      } else if (err.code === "auth/weak-password") {
        message = "Password should be at least 6 characters";
      } else if (err.code === "auth/invalid-email") {
        message = "Please enter a valid email address";
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.signup}>
      <PageNav />
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 style={{textAlign: "center"}}>Create Your Account</h1>
        
        <div className={styles.row}>
          <label htmlFor="email">Email</label>
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
            minLength={6}
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <Button type="primary" disabled={isLoading || !email || !password}>
          {isLoading ? "Creating Account..." : "Sign Up"}
        </Button>
      </form>
    </main>
  );
};

export default Signup;