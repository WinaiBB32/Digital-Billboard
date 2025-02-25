import { useState, useContext } from "react";
import { Form, Input, Button, message, Card, Typography } from "antd";
import authService from "../services/authService";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "../styles/Login.css"; // ✅ เพิ่ม CSS

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await authService.login(values);
      login(response.data.token);
      message.success("เข้าสู่ระบบสำเร็จ");
      navigate("/");
    } catch (error) {
      message.error("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",error);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Title level={3}>เข้าสู่ระบบ</Title>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="ชื่อผู้ใช้" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="รหัสผ่าน" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            เข้าสู่ระบบ
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
