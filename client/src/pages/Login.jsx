import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const res_data = await response.json();
      console.log("res from server", res_data);

      if (response.ok) {
        storeTokenInLS(res_data.token);

        toast.success("Login successful!", {
          position: "top-right",
        });

        // ✅ Clear form fields
        setFormData({
          email: "",
          password: "",
        });

        // ✅ Redirect user after short delay
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error(res_data.message || "Invalid credentials!", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
      });
    }
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <div style={leftStyle}>
          <img
            src="/2.png"
            alt="Login illustration"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </div>

        <div style={rightStyle}>
          <h1 style={titleStyle}>
            Login <span style={underline}></span>
          </h1>

          <form style={formStyle} onSubmit={handleSubmit}>
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
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <button type="submit" style={buttonStyle}>
              Login
            </button>
          </form>
        </div>
      </div>

      {/* ✅ Toast Container */}
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

// ---------------- STYLES ----------------
const pageStyle = {
  color: "#fff",
  minHeight: "100vh",
  paddingTop: "60px",
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
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#6366f1",
  color: "#fff",
  fontSize: "17px",
  width: "180px",
  height:"60px",
  fontWeight: "600",
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

export default Login;
