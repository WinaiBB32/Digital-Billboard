import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import PropTypes from "prop-types"; // ✅ Import PropTypes

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    console.warn("🚨 Unauthorized access! Redirecting to login...");
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.warn("🚨 Access denied! User role not allowed.");
    return <Navigate to="/" />;
  }

  return children;
};

// ✅ ใช้ `prop-types` กำหนดประเภทของ Props
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // ต้องเป็น React Node เช่น <Component />
  allowedRoles: PropTypes.arrayOf(PropTypes.string), // เป็น Array ของ String เช่น ["admin", "user"]
};

export default ProtectedRoute;
