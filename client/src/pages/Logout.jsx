import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Logout = () => {
  const { LogoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ First: clear the token
    LogoutUser();

    // ✅ Show toast immediately
    const id = toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      theme: "dark",
      style: toastStyle,
      onClose: () => {
        // ✅ Navigate after toast closes
        navigate("/login");
      },
    });

    return () => toast.dismiss(id);
  }, [LogoutUser, navigate]);

  return <ToastContainer />;
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

export default Logout;
