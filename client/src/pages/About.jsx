import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const About = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, loading } = useAuth();

  if (loading) return null;

  return (
    <div
      style={{
        backgroundColor: "#0b0f19",
        color: "#fff",
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      {/* ✅ Hero Section */}
      <section
        style={{
          padding: "8rem 5% 4rem",
          textAlign: "center",
          background: "linear-gradient(90deg, #1e1e2f, #0b0f19)",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "700",
            color: "#fff",
            marginBottom: "1rem",
          }}
        >
          Learn the Technologies of Tomorrow
        </h1>
        <p
          style={{
            fontSize: "1.3rem",
            color: "#bbb",
            maxWidth: "850px",
            margin: "0 auto",
            lineHeight: "1.8",
          }}
        >
          Master Web Development, Artificial Intelligence, Cloud Computing,
          Data Science, and more — with{" "}
          <strong style={{ color: "#646cff" }}>Venky's Technical</strong>.
          Build real-world projects and get job-ready with hands-on experience
          across multiple technologies.
        </p>

        {/* ✅ CTA for non-admin users */}
        {!user?.isAdmin && (
          <button
            onClick={() => navigate("/register")}
            style={{
              marginTop: "2rem",
              backgroundColor: "#646cff",
              color: "#fff",
              border: "none",
              padding: "12px 28px",
              borderRadius: "8px",
              fontSize: "1.1rem",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#7a7fff")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#646cff")}
          >
            Enroll Now →
          </button>
        )}
      </section>

      {/* ✅ Learning Domains Section */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "4rem auto",
          padding: "0 5%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {[
          {
            icon: "💻",
            title: "Full Stack Web Development",
            desc: "Master MERN stack (MongoDB, Express.js, React.js, Node.js) and build production-ready apps.",
          },
          {
            icon: "🤖",
            title: "Artificial Intelligence & Machine Learning",
            desc: "Learn TensorFlow, Python, and neural networks to create intelligent systems.",
          },
          {
            icon: "☁️",
            title: "Cloud Computing",
            desc: "Understand AWS, Firebase, and scalable cloud architecture for modern deployment.",
          },
          {
            icon: "📊",
            title: "Data Science & Analytics",
            desc: "Learn data visualization, statistics, and Python libraries like Pandas & NumPy.",
          },
          {
            icon: "🔒",
            title: "Cybersecurity",
            desc: "Explore ethical hacking, encryption, and securing modern applications from threats.",
          },
          {
            icon: "⚙️",
            title: "DevOps & Automation",
            desc: "Understand CI/CD pipelines, Docker, and GitHub Actions for seamless deployment.",
          },
        ].map((tech, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#161b27",
              borderRadius: "10px",
              padding: "2rem",
              textAlign: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
              {tech.icon}
            </div>
            <h3 style={{ color: "#646cff", marginBottom: "0.5rem" }}>
              {tech.title}
            </h3>
            <p style={{ color: "#ccc", fontSize: "1rem", lineHeight: "1.6" }}>
              {tech.desc}
            </p>
          </div>
        ))}
      </section>

      {/* ✅ Instructor Section */}
      <section
        style={{
          backgroundColor: "#161b27",
          padding: "3rem 5%",
          borderRadius: "10px",
          maxWidth: "1100px",
          margin: "0 auto 4rem",
        }}
      >
        <h2
          style={{
            color: "#646cff",
            fontSize: "2rem",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          Meet The Founder
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <img
            src="instructor.png"
            alt="Instructor"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "1rem",
              border: "2px solid #646cff",
            }}
          />
          <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
            Venky Rajamoor
          </h3>
          <p style={{ color: "#bbb", maxWidth: "700px", lineHeight: "1.7" }}>
            A passionate Full Stack Developer and educator specializing in MERN,
            AI, and Cloud solutions. Venky has built scalable real-world
            projects and loves sharing his knowledge to help students launch
            their careers in tech.
          </p>
        </div>
      </section>

      {/* ✅ Highlights Section */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto 5rem",
          padding: "0 5%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {[
          { icon: "⏱️", title: "20+ Hours Content", desc: "Self-paced learning" },
          { icon: "🧠", title: "Hands-on Projects", desc: "Build 5 real apps" },
          {
            icon: "🎓",
            title: "Certificate of Completion",
            desc: "Get recognized for your skills",
          },
          { icon: "💬", title: "24/7 Support", desc: "Community + mentor help" },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#1f2937",
              borderRadius: "10px",
              padding: "1.5rem",
              textAlign: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
              {item.icon}
            </div>
            <h4 style={{ color: "#646cff", marginBottom: "0.5rem" }}>
              {item.title}
            </h4>
            <p style={{ color: "#ccc", fontSize: "1rem" }}>{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default About;
