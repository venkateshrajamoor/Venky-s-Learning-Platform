import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

const AdminContacts = () => {
  const { authorizationToken } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllContacts = async () => {
    try {
      const response = await fetch("http://localhost:5000/contacts", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();
      console.log("📩 Contacts data from backend:", data);

      // ✅ Fix: use the inner array
      if (data.response && Array.isArray(data.response)) {
        setContacts(data.response);
      } else if (Array.isArray(data)) {
        // In case backend directly sends an array
        setContacts(data);
      } else {
        console.warn("⚠️ Unexpected data format:", data);
        setContacts([]);
      }
    } catch (error) {
      console.error("❌ Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };
   const handleDelete = async(id) => {
    try {
        const response=await fetch(`http://localhost:5000/contacts/delete/${id}`,
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
      getAllContacts();
    }
    // You can call delete API later here
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
        All Contact Messages
      </h2>

      {contacts.length === 0 ? (
        <p style={{ textAlign: "center" }}>No contacts found.</p>
      ) : (
        <table
          style={styles.table}
        >
          <thead >
            <tr>
              <th style={styles.th}>Name </th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Message</th>
              <th style={styles.th}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td style={styles.td}>{contact.username}</td>
                <td style={styles.td}>{contact.email}</td>
                <td style={styles.td}>{contact.message}</td>
                <td style={styles.td}>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(contact._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminContacts;

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

