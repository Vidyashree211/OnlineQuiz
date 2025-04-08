import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css"; // Make sure this includes styles for .dropdown etc.

const Header = ({ userName, onLogout }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu((prev) => !prev);

  // Get user image from localStorage if available
  const userPhoto = localStorage.getItem("userPhoto");

  return (
    <header className="app-header">
      <div className="header-left" onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
        <span className="app-logo">📘 Fuel Your Brain</span>
      </div>

      <div className="header-right">
        <div className="user-info" onClick={toggleMenu}>
          {userPhoto ? (
            <img src={userPhoto} alt="Profile" className="profile-pic" />
          ) : (
            <div className="default-avatar">👤</div>
          )}
          <span className="user-name">{userName}</span>
          <span className="dropdown-arrow">▼</span>
        </div>

        {showMenu && (
          <div className="dropdown-menu">
            <button onClick={() => navigate("/profile")}>👤 Profile</button>
            <button onClick={onLogout}>🚪 Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
