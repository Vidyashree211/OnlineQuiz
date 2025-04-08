import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

const categories = [
  { name: "C", key: "c", image: "/c.png" },
  { name: "C++", key: "cplusplus", image: "/c++.png" },
  { name: "C#", key: "csharp", image: "/csharp.png" },
  { name: "Python", key: "python", image: "/python.png" },
  { name: "Java", key: "java", image: "/java.png" },
  { name: "Kotlin", key: "kotlin", image: "/kotlin.jpeg" },
  { name: "HTML", key: "html", image: "/html.png" },
  { name: "CSS", key: "css", image: "/css.png" },
  { name: "JavaScript", key: "javascript", image: "/javascript.png" },
  { name: "React.js", key: "reactjs", image: "/react.png" },
  { name: "Node.js", key: "nodejs", image: "/nodejs.png" },
  { name: "Express.js", key: "expressjs", image: "/express.png" },
];

function Home() {
  const navigate = useNavigate();

  // 🔹 Get username from localStorage or fallback to "Guest"
  const userName = localStorage.getItem("userName") || "Guest";

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      // 🔸 Clear username from localStorage on logout
      localStorage.removeItem("userName");
      navigate("/login");
    }
  };

  return (
    <div className="home-page">
      <Header userName={userName} onLogout={handleLogout} />

      <div className="container">
        <h1>OnlineQuiz</h1>
        <h2>Coding - Start a new Journey</h2>

        <div className="grid">
          {categories.map((category) => (
            <Link to={`/quiz/${category.key}`} key={category.key}>
              <div className="card">
                <img src={category.image} alt={category.name} />
                <p>{category.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
