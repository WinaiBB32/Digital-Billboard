import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types"; // ✅ ใช้ prop-types
import { jwtDecode } from "jwt-decode"; // ✅ เปลี่ยนจาก import default เป็น named import
import authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        console.error("❌ Invalid Token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    try {
      setUser(jwtDecode(token));
    } catch (error) {
      console.error("❌ Login Error:", error);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ ใช้ prop-types เพื่อกำหนดชนิดข้อมูลของ children
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
