import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("customerToken")
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authToken) {
      // Fetch or decode user info if needed (optional)
      // Or just set a dummy "logged in" user state
      setUser({ token: authToken });
    } else {
      setUser(null);
    }
  }, [authToken]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
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
