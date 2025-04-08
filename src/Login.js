import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import "./auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save userName from email
      localStorage.setItem("userName", user.email.split("@")[0]);

      navigate("/home");
    } catch (error) {
      console.error("Firebase Auth Error:", error.code, error.message);
      setError(getErrorMessage(error.code));
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save userName from Google display name
      localStorage.setItem("userName", user.displayName || "Guest");

      navigate("/home");
    } catch (error) {
      console.error("Google Sign-In Error:", error.code, error.message);
      setError("Google login failed. Please try again.");
    }
  };

  const getErrorMessage = (errorCode) => {
    const errorMessages = {
      "auth/user-not-found": "No account found with this email.",
      "auth/wrong-password": "Incorrect password.",
      "auth/invalid-email": "Invalid email format.",
    };
    return errorMessages[errorCode] || "Login failed. Please try again.";
  };

  return (
    <div
      className="auth-page"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        margin: 0,
        padding: 0,
        backgroundImage: `url(${process.env.PUBLIC_URL}/background.jpg)`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: "50vw",
        boxSizing: "border-box",
      }}
    >
      <div className="auth-container">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <button className="google-login" onClick={handleGoogleLogin}>
          Sign in with Google
        </button>
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
