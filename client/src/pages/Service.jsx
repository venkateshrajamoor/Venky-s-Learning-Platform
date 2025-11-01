// Service.jsx
import React from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

const Service = () => {
  const { services,isLoggedIn } = useAuth();
  const navigate = useNavigate();
 
  // adjust this if your header is taller/shorter
  const HEADER_HEIGHT = 72; // px

  return (
    <div
      style={{
         backgroundColor: "#0b0f19",
        color: "#fff",
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden", // top padding accounts for header + extra space, bottom padding gives space before footer
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        paddingTop:"50px",
        alignItems: "center",
        paddingTop: "130px",
      }}
    >
      {/* Header / Intro */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "3rem",
          width: "100%",
          maxWidth: "1100px",
          boxSizing: "border-box",
        }}
      >
        <h3
          style={{
            color: "#aaa",
            fontWeight: 400,
            marginBottom: "0.5rem",
            letterSpacing: "1px",
          }}
        >
          {isLoggedIn
            ? "🎓 You are logged in — click on any course to proceed further!"
            : "🔒 Please login to access and enroll in our courses."}
        </h3>

        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#fff",
            marginBottom: "1rem",
          }}
        >
          Learn with <span style={{ color: "#646cff" }}>Venky’s Learning Platform</span>
        </h1>

        <p
          style={{
            color: "#bbb",
            lineHeight: 1.6,
            maxWidth: "820px",
            margin: "0 auto",
            fontSize: "1.05rem",
          }}
        >
          Choose from a wide variety of professional tech courses. Learn at your own pace, earn certificates, and build real-world projects with our expert-led lessons.
        </p>
      </div>

      {/* Course Cards Grid */}
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",                             // keep content centered and not full-bleed
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", // smaller min width to reduce overflow
          gap: "2rem",
          alignItems: "stretch",
          boxSizing: "border-box",
          paddingBottom: "1rem",
        }}
      >
        {services && services.length > 0 ? (
          services.map((course) => (
            <article
              role="button"
              key={course._id}
              onClick={() => navigate(`/course/${course._id}`)}
              style={{
                backgroundColor: "#1e293b",
                borderRadius: "12px",
                padding: "1.6rem",
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.32)",
                transition: "transform 0.28s ease, box-shadow 0.28s ease",
                textAlign: "center",
                border: "1px solid #2d3748",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
                minHeight: "220px",
                boxSizing: "border-box",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.32)";
              }}
            >
              <div>
                <h2
                  style={{
                    color: "#646cff",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    marginBottom: "0.6rem",
                  }}
                >
                  {course.service}
                </h2>

                <p
                  style={{
                    color: "#bbb",
                    fontSize: "0.96rem",
                    lineHeight: 1.5,
                    marginBottom: "1rem",
                  }}
                >
                  {course.description}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px solid rgba(255,255,255,0.04)",
                  paddingTop: "0.9rem",
                  marginTop: "0.8rem",
                  fontSize: "0.95rem",
                }}
              >
                <span style={{ color: "#10b981", fontWeight: 700 }}>💰 ${course.price}</span>
                <span style={{ color: "#facc15", fontStyle: "italic" }}>👨‍💻 {course.provider}</span>
              </div>
            </article>
          ))
        ) : (
          <p style={{ color: "#bbb", textAlign: "center", gridColumn: "1 / -1" }}>
            No courses available at the moment. Please check back soon!
          </p>
        )}
      </div>

      {/* Spacer to avoid overlap with the global footer (if you have one) */}
      <div style={{ height: "5.5rem", width: "100%" }} />

    </div>
  );
};

export default Service;
