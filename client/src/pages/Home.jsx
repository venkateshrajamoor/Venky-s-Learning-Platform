import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "linear-gradient(to right, #0b0f19, #141b2f)",
        color: "#fff",
        minHeight: "100vh",
        width: "100vw",
        padding: "8rem 5% 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      {/* Hero Section */}
      <div style={{ width: "100%", textAlign: "center", marginBottom: "3rem" }}>
        <h3
          style={{
            color: "#aaa",
            fontWeight: "400",
            marginBottom: "0.5rem",
            letterSpacing: "1px",
          }}
        >
          Learn Anytime. Grow Anytime.
        </h3>
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "700",
            color: "#fff",
            marginBottom: "1rem",
          }}
        >
          Welcome to{" "}
          <span style={{ color: "#646cff" }}>Venky’s Learning Platform</span>
        </h1>
        <p
          style={{
            color: "#bbb",
            lineHeight: "1.6",
            maxWidth: "800px",
            margin: "0 auto 2rem",
            fontSize: "1.2rem",
          }}
        >
          Master new skills, learn from expert instructors, and advance your
          career with high-quality online courses. Join thousands of learners
          who trust Venky’s Learning to achieve their professional goals.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button
            style={buttonStyle}
            className="hover-btn"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
          <button
            style={{
              ...buttonStyle,
              backgroundColor: "transparent",
              border: "1px solid #646cff",
            }}
            className="hover-btn"
            onClick={() => navigate("/about")}
          >
            Explore Courses
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          width: "100%",
          backgroundColor: "#161b27",
          padding: "2rem",
          borderRadius: "10px",
          marginBottom: "4rem",
          boxSizing: "border-box",
        }}
      >
        <Stat number="250+" label="Available Courses" />
        <Stat number="10,000+" label="Active Students" />
        <Stat number="200+" label="Expert Instructors" />
        <Stat number="4.8★" label="Average Course Rating" />
      </div>

      {/* Get Started Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          alignItems: "center",
          backgroundColor: "#161b27",
          padding: "3rem 2rem",
          borderRadius: "10px",
          marginBottom: "4rem",
          width: "100%",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4229/4229764.png"
            alt="Learning"
            style={{ width: "80%", maxWidth: "300px" }}
          />
        </div>
        <div>
          <h4 style={{ color: "#aaa", fontWeight: "400" }}>
            Learn from the Best
          </h4>
          <h2 style={{ fontSize: "2rem", margin: "0.5rem 0 1rem" }}>
            Start Learning Today
          </h2>
          <p
            style={{
              color: "#bbb",
              lineHeight: "1.6",
              marginBottom: "1.5rem",
            }}
          >
            Discover courses in web development, data science, AI, business, and
            more — all created by industry experts. Learn at your own pace with
            lifetime access and interactive lessons.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              style={buttonStyle}
              className="hover-btn"
              onClick={() => navigate("/service")}
            >
              Browse Courses
            </button>
            <button
              style={{
                ...buttonStyle,
                backgroundColor: "transparent",
                border: "1px solid #646cff",
              }}
              className="hover-btn"
              onClick={() => navigate("/about")}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          width: "100%",
          marginBottom: "3rem",
        }}
      >
        {[
          {
            icon: "👨‍🏫",
            title: "Expert Instructors",
            desc: "Learn directly from professionals working in top companies.",
          },
          {
            icon: "💰",
            title: "Affordable Learning",
            desc: "Access premium content with lifetime learning at student-friendly prices.",
          },
          {
            icon: "⏱️",
            title: "Lifetime Access",
            desc: "Learn at your own pace with unlimited access to your enrolled courses.",
          },
          {
            icon: "🎓",
            title: "Certificates",
            desc: "Earn professional certificates to boost your resume and career profile.",
          },
        ].map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            desc={feature.desc}
          />
        ))}
      </div>
    </div>
  );
};

// Button Style
const buttonStyle = {
  backgroundColor: "#646cff",
  color: "#fff",
  padding: "0.9rem 2rem",
  border: "none",
  borderRadius: "6px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

// Stats Component
const Stat = ({ number, label }) => (
  <div style={{ textAlign: "center", minWidth: "150px" }}>
    <h3 style={{ color: "#646cff", fontSize: "2rem" }}>{number}</h3>
    <p style={{ color: "#fff", fontSize: "1rem" }}>{label}</p>
  </div>
);

// ✅ Feature Card Component with hover animation
const FeatureCard = ({ icon, title, desc }) => (
  <div
    style={{
      backgroundColor: "#161b27",
      padding: "2rem",
      borderRadius: "10px",
      border: "1px solid #222",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      height: "100%",
      textAlign: "center",
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      cursor: "pointer",
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = "translateY(-8px)";
      e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.4)";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
    }}
  >
    <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>{icon}</div>
    <h4
      style={{
        color: "#646cff",
        marginBottom: "0.8rem",
        fontSize: "1.2rem",
      }}
    >
      {title}
    </h4>
    <p style={{ color: "#bbb", fontSize: "1rem", lineHeight: "1.6" }}>{desc}</p>
  </div>
);

export default Home;
