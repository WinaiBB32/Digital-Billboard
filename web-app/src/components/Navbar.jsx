import { useContext } from "react";
import { Layout, Dropdown, Menu } from "antd";
import AuthContext from "../context/AuthContext";
import PropTypes from "prop-types"; // ✅ Import PropTypes

const { Header } = Layout;

const Navbar = ({ user, logout }) => {
  const menuItems = [
    { key: "logout", label: <span onClick={logout}>Logout</span> }
  ];

  return (
    <Header className="navbar">
      <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
        <span className="navbar-user">👤 {user?.username}</span>
      </Dropdown>
    </Header>
  );
};

// ✅ ใช้ `prop-types` กำหนดประเภทของ Props
Navbar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
};

export default Navbar;
