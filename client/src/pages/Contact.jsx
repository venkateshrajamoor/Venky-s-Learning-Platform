import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../store/auth";

const Contact = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });

  // ✅ Automatically fill username and email when user is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        message: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      toast.success("✅ Thank you for contacting us!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        theme: "dark",
        style: {
          backgroundColor: "#646cff",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "500",
          borderRadius: "8px",
        },
      });

      // ✅ Clear only the message after submitting
      setFormData((prev) => ({ ...prev, message: "" }));
    } catch (error) {
      toast.error("❌ Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        theme: "dark",
      });
      console.error(error);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, #0b0f19, #141b2f)",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        paddingTop: "3rem",
        paddingBottom: "3rem",
      }}
    >
      <ToastContainer />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "1200px",
          gap: "3rem",
          padding: "2rem",
        }}
      >
        <div
          style={{
            flex: "1 1 400px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/4149/4149678.png"
            alt="Contact us"
            style={{ width: "100%", maxWidth: "400px", height: "auto" }}
          />
        </div>

        <div
          style={{
            flex: "1 1 400px",
            backgroundColor: "#0e1424",
            padding: "2rem",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: "1.7rem",
              marginBottom: "1.5rem",
            }}
          >
            Contact Us
          </h1>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
            }}
          >
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              style={inputStyle}
              readOnly={!!user}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
              readOnly={!!user}
            />
            <textarea
              name="message"
              placeholder="Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>
              Submit
            </button>
          </form>
        </div>
      </div>

      <div
        style={{
          marginTop: "3rem",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <iframe
          title="Prasads Multiplex Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.9750367799247!2d78.46311807331846!3d17.412985602070883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb975afb4afadd%3A0xf89ea8407df6c84!2sPrasads%20Multiplex!5e0!3m2!1sen!2sin!4v1760784676789!5m2!1sen!2sin"
          width="90%"
          height="450"
          style={{
            border: 0,
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
          }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "0.9rem",
  backgroundColor: "#222",
  border: "1px solid #444",
  color: "#fff",
  borderRadius: "6px",
  fontSize: "1rem",
  outline: "none",
  width: "100%",
};

const buttonStyle = {
  backgroundColor: "#646cff",
  color: "#fff",
  padding: "13px",
  width: "180px",
  height: "60px",
  border: "none",
  borderRadius: "6px",
  fontWeight: "600",
  cursor: "pointer",
};

export default Contact;
