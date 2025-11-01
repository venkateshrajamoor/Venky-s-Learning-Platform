import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../store/auth"; // ✅ Import AuthContext

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const { saveUser, storeTokenInLS } = useAuth(); // ✅ Get auth functions

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Validation
  const validateForm = () => {
    const { username, email, phone, password } = formData;

    if (username.trim().length < 6) {
      toast.error("Username must be at least 6 characters long.");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error("Phone number must be exactly 10 digits.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Server Response:", data);

      if (response.ok) {
        // ✅ If backend returns token, store it
        if (data.token) {
          storeTokenInLS(data.token);
        }

        // ✅ Save user info in context
        saveUser(
          {
            username: data.username || formData.username,
            email: data.email || formData.email,
          },
          data.token
        );

        toast.success("Registration successful!");

        setFormData({
          username: "",
          email: "",
          phone: "",
          password: "",
        });

        // ✅ Navigate immediately to home
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <div style={leftStyle}>
          <img
            src="/1.png"
            alt="Register illustration"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </div>

        <div style={rightStyle}>
          <h1 style={titleStyle}>
            Registration Form <span style={underline}></span>
          </h1>

          <form style={formStyle} onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone (10 digits)"
              value={formData.phone}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <button type="submit" style={buttonStyle}>
              Register Now
            </button>
          </form>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar
        closeOnClick
        pauseOnHover
        theme="dark"
        toastStyle={toastStyle}
      />
    </div>
  );
};

// -------------- Styles (same as before) --------------
const pageStyle = {
  color: "#fff",
  minHeight: "100vh",
  paddingTop: "90px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px 80px",
  gap: "50px",
};

const leftStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const rightStyle = {
  flex: 1,
  backgroundColor: "#111827",
  padding: "40px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
};

const titleStyle = {
  fontSize: "28px",
  fontWeight: "700",
  marginBottom: "20px",
  textAlign: "center",
};

const underline = {
  display: "block",
  height: "3px",
  backgroundColor: "#6366f1",
  width: "80px",
  margin: "6px auto 0",
  borderRadius: "5px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const inputStyle = {
  padding: "12px 14px",
  borderRadius: "6px",
  border: "none",
  outline: "none",
  backgroundColor: "#1e293b",
  color: "#fff",
  fontSize: "16px",
};

const buttonStyle = {
  padding: "14px 0",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#6366f1",
  color: "#fff",
  fontSize: "17px",
  fontWeight: "600",
  width: "180px",
  height: "60px",
  cursor: "pointer",
  transition: "0.3s",
};

const toastStyle = {
  backgroundColor: "#6366f1",
  color: "#fff",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "500",
  padding: "12px 18px",
  textAlign: "center",
};

export default Register;
