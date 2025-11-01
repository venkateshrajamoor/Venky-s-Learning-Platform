import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";

const Navbar = () => {
  const { isLoggedIn, user, loading } = useAuth(); // ✅ get user details too

  if (loading) return null;

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        {/* ✅ Logo (Image) as Home Button */}
        <Link to="/" style={brandButton}>
          <img src="4.png" alt="Venky Logo" style={logoStyle} />
        </Link>

        {/* ✅ Navigation Links */}
        <div style={linksStyle}>
          {/* <Link style={linkStyle} to="/">Home</Link>
          <Link style={linkStyle} to="/about">About</Link>
          <Link style={linkStyle} to="/service">Service</Link> */}
          {!user?.isAdmin && (
            <Link style={linkStyle} to="/">
              Home
            </Link>
          )}
          {!user?.isAdmin && (
            <Link style={linkStyle} to="/about">
              About
            </Link>
          )}
          {!user?.isAdmin && (
            <Link style={linkStyle} to="/service">
              Service
            </Link>
          )}
          {!user?.isAdmin && (
            <Link style={linkStyle} to="/contact">
              Contact
            </Link>
          )}

          {/* ✅ Admin Panel link visible only to admin */}
          {user?.isAdmin && (
            <Link style={adminLinkStyle} to="/admin">
              Admin Panel
            </Link>
          )}

          {/* ✅ Auth Links */}
          {isLoggedIn ? (
            <Link style={linkStyle} to="/logout">
              Logout
            </Link>
          ) : (
            <>
              <Link style={linkStyle} to="/login">Login</Link>
              <Link style={linkStyle} to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// 🎨 Styles
const navStyle = {
  width: "100%",
  position: "fixed",
  top: 0,
  left: 0,
  backgroundColor: "#1f2937",
  color: "#fff",
  padding: "10px 0",
  zIndex: 1000,
  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
};

const containerStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 50px",
};

const linksStyle = {
  display: "flex",
  gap: "20px",
};

const linkStyle = {
 color: "#fff",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "1.15rem", // increased font size
  transition: "color 0.3s ease, transform 0.3s ease",
};

const adminLinkStyle = {
  ...linkStyle,
  backgroundColor: "#22c55e", // green for admin links
  padding: "6px 12px",
  borderRadius: "6px",
};

const brandButton = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
  cursor: "pointer",
  textDecoration: "none",
  transition: "all 0.3s ease",
};

const logoStyle = {
  width: "100px",
  height: "80px",
  objectFit: "contain",
};
