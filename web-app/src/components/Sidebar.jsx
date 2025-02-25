import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";  // ✅ นำเข้า prop-types
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import menuService from "../services/menuService";

const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  const { user } = useContext(AuthContext);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    if (user) {
      menuService.getMenuByRole(user.role)
        .then(response => setMenuItems(response.data))
        .catch(error => console.error("❌ Error loading menu:", error));
    }
  }, [user]);

  return (
    <Sider collapsed={collapsed}>
      <Menu theme="dark" mode="vertical">
        {menuItems.map(item => (
          <Menu.Item key={item.menu_key}>
            <Link to={item.menu_path}>{item.menu_label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

// ✅ กำหนด PropTypes
Sidebar.propTypes = {
  collapsed: PropTypes.bool, // `collapsed` เป็น boolean (true/false)
};

// ✅ กำหนดค่า Default Props
Sidebar.defaultProps = {
  collapsed: false,
};

export default Sidebar;
