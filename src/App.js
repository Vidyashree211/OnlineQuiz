import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup"; // ✅ Import Signup component
import QuizPage from "./QuizPage";
import Profile from "./Profile";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route: Login Page */}
        <Route path="/" element={<Login />} />

        {/* Signup Route */}
        <Route path="/signup" element={<Signup />} /> {/* ✅ Added Signup route */}

        {/* Protected Routes */}
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/quiz/:topic" element={<PrivateRoute><QuizPage /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />


      </Routes>
    </Router>
  );
}

export default App;
