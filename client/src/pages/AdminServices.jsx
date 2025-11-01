import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
const AdminServices = () => {
  const { authorizationToken } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Fetch all services
  const getAllServicesData = async () => {
    try {
      const response = await fetch("http://localhost:5000/services", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }

      const data = await response.json();
      setServices(data.services || data); // ✅ works for both array or object
    } catch (error) {
      console.log("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllServicesData();
  }, []);

  // Delete service
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/services/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        getAllServicesData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Edit service (future)
  const handleEdit = (id) => {
    navigate(`/admin/services/update/${id}`)
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>All Services</h2>

      {loading ? (
        <p>Loading...</p>
      ) : services.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Technology</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Service</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Provider</th>
              <th style={styles.th}>Edit</th>
              <th style={styles.th}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id}>
                <td style={styles.td}>{service.technology}</td>
                <td style={styles.td}>{service.price}</td>
                <td style={styles.td}>{service.service}</td>
                <td style={styles.td}>{service.description}</td>
                <td style={styles.td}>{service.provider}</td>
                <td style={styles.td}>
                  <button
                    style={styles.editBtn}
                    onClick={() => handleEdit(service._id)}
                  >
                    Edit
                  </button>
                </td>
                <td style={styles.td}>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(service._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No services found.</p>
      )}
    </div>
  );
};

export default AdminServices;

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
