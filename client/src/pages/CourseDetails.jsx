import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authorizationToken, isLoggedIn } = useAuth();
  const [course, setCourse] = useState(null);

  // ✅ Fetch Course Data
  const fetchCourse = async () => {
    try {
      const res = await fetch(`http://localhost:5000/servicess/${id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setCourse({
          technology: data.technology,
          price: data.price,
          service: data.service,
          description: data.description,
          provider: data.provider,
        });
      } else {
        toast.error("Failed to load course data ❌");
      }
    } catch (error) {
      toast.error("Server error while fetching course ⚠️");
    }
  };

  useEffect(() => {
    // ✅ Check login status before fetching data
    if (!isLoggedIn) {
      toast.info("🔒 Please login to view course details");
      navigate("/login");
      return;
    }
    fetchCourse();
  }, [isLoggedIn, id]);

  // ✅ Handle Payment Simulation
  const handlePayment = () => {
    toast.success(`💳 Payment successful! 🎉 You are enrolled in ${course.service}.`);
  };

  if (!course)
    return <p style={{ textAlign: "center", marginTop: "5rem" }}>Loading...</p>;

  return (
    <div
      style={{
        backgroundColor: "#0b0f19",
        color: "#fff",
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
        paddingTop: "130px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "#1f2937",
          borderRadius: "12px",
          padding: "2rem",
          boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
        }}
      >
        <h1 style={{ color: "#646cff", marginBottom: "1rem" }}>
          {course.service}
        </h1>

        <p style={{ color: "#bbb", lineHeight: "1.6" }}>{course.description}</p>

        <p style={{ color: "#10b981", marginTop: "1rem" }}>
          💰 Price: ${course.price}
        </p>
        <p style={{ color: "#facc15", fontStyle: "italic" }}>
          👨‍🏫 Mentor: {course.provider}
        </p>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button
            onClick={handlePayment}
            style={{
              backgroundColor: "#646cff",
              color: "#fff",
              border: "none",
              padding: "12px 25px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#7a7fff")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#646cff")}
          >
            Pay Now 💳
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
