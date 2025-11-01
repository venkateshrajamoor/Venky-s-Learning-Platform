import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { FaUsers, FaAddressBook, FaCog, FaHome } from "react-icons/fa";

const AdminLayout = () => {
  const navigate = useNavigate();

  const mainStyle = {
    backgroundColor: "#0b1622",
    color: "white",
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: 0,
    padding: 0,
    overflowX: "hidden",
    paddingTop:"130px"
  };

  const heading = {
    fontSize: "42px",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const subHeading = {
    fontSize: "18px",
    color: "#cccccc",
    marginBottom: "40px",
    maxWidth: "700px",
  };

  const buttonContainer = {
    display: "flex",
    gap: "25px",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  const buttonStyle = {
    backgroundColor: "#6366f1",
    color: "white",
    border: "none",
    padding: "15px 35px",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const handleHover = (e, isHover) => {
    e.target.style.backgroundColor = isHover ? "#4f46e5" : "#6366f1";
    e.target.style.transform = isHover ? "scale(1.05)" : "scale(1)";
  };

  return (
    <div style={mainStyle}>
      <h1 style={heading}>Welcome to Admin Panel</h1>
      <p style={subHeading}>
        Manage users, services, and contact data efficiently. From one place,
        control all administrative operations easily.
      </p>

      <div style={buttonContainer}>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => handleHover(e, true)}
          onMouseLeave={(e) => handleHover(e, false)}
          onClick={() => navigate("/admin/users")}
        >
          <FaUsers /> Manage Users
        </button>

        <button
          style={buttonStyle}
          onMouseEnter={(e) => handleHover(e, true)}
          onMouseLeave={(e) => handleHover(e, false)}
          onClick={() => navigate("/admin/contacts")}
        >
          <FaAddressBook /> Manage Contacts
        </button>

        <button
          style={buttonStyle}
          onMouseEnter={(e) => handleHover(e, true)}
          onMouseLeave={(e) => handleHover(e, false)}
          onClick={() => navigate("/admin/services")}
        >
          <FaCog /> Services
        </button>

       
      </div>

      <div style={{ marginTop: "50px", width: "100%" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
