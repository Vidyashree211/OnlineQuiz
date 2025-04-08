import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./auth.css";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [usn, setUsn] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // ✅ Store the user's name and USN in localStorage
      localStorage.setItem("userName", name);
      localStorage.setItem("userUsn", usn);

      // ✅ Navigate to home page
      navigate("/");
    } catch (error) {
      console.error("Firebase Auth Error:", error.code, error.message);
      setError(getErrorMessage(error.code));
    }
  };

  const getErrorMessage = (errorCode) => {
    const errorMessages = {
      "auth/email-already-in-use": "This email is already registered.",
      "auth/invalid-email": "Invalid email format.",
      "auth/weak-password": "Password should be at least 6 characters.",
    };
    return errorMessages[errorCode] || "Signup failed. Please try again.";
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
        paddingLeft: "55vw",
        boxSizing: "border-box",
      }}
    >
      <div className="auth-container">
        <h2>Signup</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="USN"
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
            required
          />
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
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
