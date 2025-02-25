import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { AuthProvider } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const { Content } = Layout;

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ✅ หน้า Login ไม่ต้องมี Sidebar หรือ Navbar */}
          <Route path="/login" element={<Login />} />

          {/* ✅ หน้าอื่นๆ ใช้ Layout ปกติ */}
          <Route
            path="/"
            element={
              <Layout style={{ minHeight: "100vh" }}>
                <Sidebar />
                <Layout>
                  <Navbar />
                  <Content style={{ padding: "20px" }}>
                    <ProtectedRoute element={<Dashboard />} />
                  </Content>
                </Layout>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
