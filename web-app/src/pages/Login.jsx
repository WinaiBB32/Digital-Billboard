import { useState, useContext } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      console.log("📡 Sending Login Request:", values);
      const response = await authService.login(values);

      localStorage.setItem("token", response.data.token);
      login(response.data.token);

      message.success("เข้าสู่ระบบสำเร็จ");
      navigate("/dashboard"); // ✅ Redirect ไป Dashboard หลัง Login สำเร็จ
    } catch (error) {
      console.error("❌ API Login Failed:", error.response?.data || error.message);
      message.error("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <Card title="เข้าสู่ระบบ" className="login-card">
        <Form onFinish={handleLogin} layout="vertical">
          <Form.Item name="username" rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้" }]}>
            <Input placeholder="ชื่อผู้ใช้" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน" }]}>
            <Input.Password placeholder="รหัสผ่าน" />
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
