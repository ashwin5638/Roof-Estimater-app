import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as apiLogin } from "../services/api";

const AuthContext = createContext(null);



export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(() => localStorage.getItem("admin_token"));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("admin_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      localStorage.setItem("admin_token", token);
    } else {
      localStorage.removeItem("admin_token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("admin_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("admin_user");
    }
  }, [user]);

  const login = async (username, password) => {
    setLoading(true);
    setError("");
    try {
      const data = await apiLogin(username, password);
      setToken(data.token);
      setUser({ username: data.username });
      navigate("/admin");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate("/admin/login");
  };

  const isAuthenticated = !!token;

  const value = {
    token,
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
