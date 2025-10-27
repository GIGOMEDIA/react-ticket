import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedSession = localStorage.getItem("ticketapp_session");
    if (storedSession) {
      setUser(JSON.parse(storedSession));
    }
    setLoading(false);
  }, []);

  const signup = async (userData) => {
    const { name, email, password } = userData;
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      throw new Error("User already exists");
    }
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem("ticketapp_session", JSON.stringify(newUser));
  };

  const login = async (credentials) => {
    const { email, password } = credentials;
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      throw new Error("Your session has expired — please log in again.");
    }
    setUser(user);
    localStorage.setItem("ticketapp_session", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ticketapp_session");
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export default AuthContext;
