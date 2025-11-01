// ✅ AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const authorizationToken=`Bearer ${token}`
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken && !token) {
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };

  const userAuthentication = async () => {
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData || null);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log("Auth error:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    if (token) {
      userAuthentication();
    }
  }, [token]);

  const LogoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const saveUser = (userData, tokenValue = null) => {
    setUser(userData);
    if (tokenValue) {
      storeTokenInLS(tokenValue);
    }
  };

  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/service", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setServices(data || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  const isLoggedIn = Boolean(token);

  return (
    <AuthContext.Provider
      value={{
        storeTokenInLS,
        LogoutUser,
        saveUser,
        isLoggedIn,
        loading,
        user,
        services,
        authorizationToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return authContextValue;
};
