import { useState, useContext, createContext, useEffect } from "react";
import AuthServices from "../services/auth_services";
import TokenServices from "../services/token_services";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // ฟังก์ชัน getUser ไว้ดึง user จาก token/localStorage
  function getUser() {
    return TokenServices.getUser();
  }

  const [user, setUser] = useState(getUser);

  const login = (userData) => {
    TokenServices.setUser(userData); // เผื่อเก็บลง storage
    setUser(userData);
  };

  const logout = () => {
    AuthServices.logout();
    TokenServices.removeUser(); // ล้าง token ถ้ามี method นี้
    setUser(null);
  };

  useEffect(() => {
    const currentUser = TokenServices.getUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
