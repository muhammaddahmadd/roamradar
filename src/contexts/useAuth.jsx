import { createContext, useContext, useReducer, useEffect } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "logout":
      return { ...initialState };
    default:
      return state;
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isAuthenticated, user } = state;


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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch({ type: "login", payload: userCredential.user });
    } catch (error) {
      console.error("Login Error:", error.message);
      throw error;
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      dispatch({ type: "logout" });
   
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  }

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export { useAuth, AuthProvider };
