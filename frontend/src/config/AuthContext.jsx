import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("customerToken")
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("customerToken");
    if (token) {
      setAuthToken(token);
      // You might want to decode the token here to get user info
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("customerToken", token);
    setAuthToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("customerToken");
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
