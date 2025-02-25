import { useContext } from "react";
import PropTypes from "prop-types";  // ✅ นำเข้า prop-types
import { Layout, Menu, Dropdown, Button } from "antd";
import AuthContext from "../context/AuthContext";

const { Header } = Layout;

const Navbar = ({ title }) => {
  const { user, logout } = useContext(AuthContext);

  const menu = (
    <Menu>
      <Menu.Item key="logout">
        <Button type="text" danger onClick={logout}>
          🚪 ออกจากระบบ
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h2 style={{ color: "white" }}>{title}</h2>
      {user && (
        <Dropdown overlay={menu} placement="bottomRight">
          <Button type="primary">
            👤 {user.username} ▼
          </Button>
        </Dropdown>
      )}
    </Header>
  );
};

// ✅ กำหนด PropTypes
Navbar.propTypes = {
  title: PropTypes.string.isRequired,  // `title` ต้องเป็น string และต้องส่งค่าเข้ามา
};

// ✅ กำหนดค่า Default Props
Navbar.defaultProps = {
  title: "📢 Digital Billboard System",
};

export default Navbar;
