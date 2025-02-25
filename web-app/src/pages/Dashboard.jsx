
import { Card } from "antd";
import PropTypes from "prop-types"; // ✅ Import PropTypes

const Dashboard = ({ title }) => {
  return (
    <Card title={title} variant="outlined">
      <p>Welcome to the Dashboard</p>
    </Card>
  );
};

// ✅ ใช้ `prop-types` กำหนดประเภทของ Props
Dashboard.propTypes = {
  title: PropTypes.string, // ต้องเป็น String
};

// ✅ กำหนดค่าเริ่มต้นของ Props
Dashboard.defaultProps = {
  title: "Dashboard",
};

export default Dashboard;
