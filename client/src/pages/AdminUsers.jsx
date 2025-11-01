import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import {useNavigate} from "react-router-dom";
const AdminUsers = () => {
  const { authorizationToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();
  // Fetch all users
  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.users || data); // handle both {users: []} or [] response
    } catch (error) {
      console.log("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  // 🔴 Delete User Function (future use)
  const handleDelete = async(id) => {
    try {
        const response=await fetch(`http://localhost:5000/users/delete/${id}`,
      {
        method:"DELETE",
        headers:{
          Authorization:authorizationToken,
        }
      }
    )
    const data=await response.json();
    console.log(data);
    if(response.ok){
      getAllUsersData();
    }
    // You can call delete API later here
    } catch (error) {
      console.log(error);
    }
  };

  // 🟢 Edit User Function (future use)
  const handleEdit = (id) => {
      navigate(`/admin/users/update/${id}`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>All Registered Users</h2>

      {loading ? (
        <p>Loading...</p>
      ) : users.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Update</th>
              <th style={styles.th}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td style={styles.td}>{user.username}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.phone}</td>
                <td style={styles.td}>
                  <button
                    style={styles.editBtn}
                    onClick={() => handleEdit(user._id)}
                  >
                    Edit
                  </button>
                </td>
                <td style={styles.td}>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default AdminUsers;

// ✅ Inline Styling
const styles = {
  container: {
    padding: "30px",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
  },
  th: {
    border: "1px solid #ccc",
    padding: "10px",
    backgroundColor: "#076ef5a7",
    color: "white",
  },
  td: {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "center",
    color: "black",
  },
  editBtn: {
    backgroundColor: "green",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
