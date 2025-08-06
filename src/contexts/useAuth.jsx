import { createContext, useContext, useReducer, useEffect } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import PropTypes from "prop-types";
const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    case "logout":
      return { 
        ...initialState,
        isLoading: false,
      };
    case "loading":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "error":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isAuthenticated, user, isLoading, error } = state;

  // Sync user state with Firebase auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch({ type: "login", payload: currentUser });
      } else {
        dispatch({ type: "logout" });
      }
    });

    return () => unsubscribe();
  }, []);

  async function login(email, password) {
    try {
      dispatch({ type: "loading" });
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch({ type: "login", payload: userCredential.user });
    } catch (error) {
      const errorMessage = getAuthErrorMessage(error.code);
      dispatch({ type: "error", payload: errorMessage });
      throw new Error(errorMessage);
    }
  }

  async function logout() {
    try {
      dispatch({ type: "loading" });
      await signOut(auth);
      dispatch({ type: "logout" });
    } catch (error) {
      const errorMessage = getAuthErrorMessage(error.code);
      dispatch({ type: "error", payload: errorMessage });
      throw new Error(errorMessage);
    }
  }

  function clearError() {
    dispatch({ type: "error", payload: null });
  }

  return (
    <AuthContext.Provider value={{ 
      login, 
      logout, 
      isAuthenticated, 
      user, 
      isLoading, 
      error,
      clearError 
    }}>
      {children}
    </AuthContext.Provider>
  );
}
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Helper function to provide user-friendly error messages
function getAuthErrorMessage(errorCode) {
  switch (errorCode) {
    case "auth/user-not-found":
      return "No account found with this email address.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection.";
    default:
      return "An error occurred. Please try again.";
  }
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export { useAuth, AuthProvider };