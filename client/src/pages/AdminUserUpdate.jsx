import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const AdminUserUpdate = () => {
  const { authorizationToken } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user data by ID
  const fetchUser = async () => {
    try {
      const res = await fetch(`http://localhost:5000/users/${id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setUserData({
          username: data.username,
          email: data.email,
          phone: data.phone,
        });
      } else {
        toast.error("Failed to load user data");
      }
    } catch (error) {
      toast.error("Server error while fetching user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // ✅ Handle update form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/users/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        toast.success("✅ User updated successfully!");
        setTimeout(() => navigate("/admin/users"), 2000); // redirect after 2 sec
      } else {
        toast.error("❌ Failed to update user");
      }
    } catch (error) {
      toast.error("⚠️ Error updating user");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Update User Data</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label}>Username</label>
        <input
          style={styles.input}
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
        />

        <label style={styles.label}>Email</label>
        <input
          style={styles.input}
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />

        <label style={styles.label}>Mobile</label>
        <input
          style={styles.input}
          type="text"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
        />

        <button type="submit" style={styles.button}>
          Update
        </button>
      </form>
    </div>
  );
};

export default AdminUserUpdate;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#0b0c10",
    color: "#fff",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#66fcf1",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#1f2833",
    padding: "30px",
    borderRadius: "8px",
    width: "320px",
  },
  label: {
    marginBottom: "5px",
  },
  input: {
    marginBottom: "15px",
    padding: "8px",
    borderRadius: "4px",
    border: "none",
    outline: "none",
  },
  button: {
    backgroundColor: "#45a29e",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
