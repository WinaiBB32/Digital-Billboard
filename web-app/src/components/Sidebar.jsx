import { useContext, useEffect, useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import PropTypes from "prop-types"; // ✅ Import PropTypes

const Sidebar = ({ userRole }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    if (userRole) {
      axios.get(`http://localhost:5000/api/menu/${userRole}`)
        .then((response) => setMenuItems(response.data))
        .catch((error) => console.error("❌ Error loading menu:", error));
    }
  }, [userRole]);

  return (
    <Menu mode="inline" theme="dark" items={menuItems.map(item => ({
      key: item.key,
      label: <Link to={item.path}>{item.label}</Link>
    }))} />
  );
};

// ✅ ใช้ `prop-types` กำหนดประเภทของ Props
Sidebar.propTypes = {
  userRole: PropTypes.string.isRequired, // ต้องเป็น String และต้องส่งค่าเสมอ
};

export default Sidebar;
