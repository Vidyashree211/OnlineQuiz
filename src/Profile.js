import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase/firebase";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userEmail = currentUser.email;
      setUser({
        name: currentUser.displayName || localStorage.getItem("userName") || "Guest",
        email: userEmail,
        photoURL: currentUser.photoURL || null,
      });

      // Step 3: Load quiz results specific to this user
      const storageKey = `quizResults_${userEmail}`;
      const storedResults = JSON.parse(localStorage.getItem(storageKey)) || [];
      setResults(storedResults);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = async () => {
    localStorage.removeItem("userName");
    await auth.signOut();
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>User Profile</h2>
        {user?.photoURL && (
          <img src={user.photoURL} alt="Profile" className="profile-pic" />
        )}
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>

        <h3>Quiz History</h3>
        <table className="quiz-history-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Quiz Title</th>
              <th>Score</th>
              <th>Total Questions</th>
              <th>Time Taken</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {results.length > 0 ? (
              results.map((result, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{result.topic}</td>
                  <td>{result.score}</td>
                  <td>{result.total}</td>
                  <td>{result.time}</td>
                  <td>{result.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px", color: "#ccc" }}>
                  No quizzes taken yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="profile-buttons">
          <button className="home-btn" onClick={() => navigate("/home")}>🏠 Home</button>
          <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
