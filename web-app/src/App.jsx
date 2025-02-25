import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Meetings from "./pages/Meetings";
import ActingDirector from "./pages/ActingDirector";
import Users from "./pages/Users";
import WorkGroups from "./pages/WorkGroups";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PropTypes from "prop-types"; // ✅ Import PropTypes

const { Content } = Layout;

const App = () => {
  return (
    <AuthProvider> {/* ✅ ครอบ AuthProvider เพื่อให้ใช้ `user` ได้ทั่วแอป */}
      <Router>
        <Routes>
          {/* ✅ หน้า Login (ไม่มี Sidebar & Navbar) */}
          <Route path="/login" element={<Login />} />

          {/* ✅ Protected Routes (เฉพาะผู้ที่ล็อกอินเท่านั้น) */}
          <Route
            path="/*"
            element={
              <ProtectedLayout>
                <Routes>
                  <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/meetings" element={<ProtectedRoute allowedRoles={["admin", "director"]}><Meetings /></ProtectedRoute>} />
                  <Route path="/acting-director" element={<ProtectedRoute allowedRoles={["admin"]}><ActingDirector /></ProtectedRoute>} />
                  <Route path="/users" element={<ProtectedRoute allowedRoles={["admin"]}><Users /></ProtectedRoute>} />
                  <Route path="/work-groups" element={<ProtectedRoute allowedRoles={["admin"]}><WorkGroups /></ProtectedRoute>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ProtectedLayout>
            }
          />

          {/* ✅ ถ้า URL ไม่ตรงกับที่กำหนด ให้ไปหน้า Login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

/** ✅ Layout ที่ใช้เฉพาะหลังจากล็อกอินแล้ว */
const ProtectedLayout = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar userRole={user.role} /> {/* ✅ ส่งค่า `userRole` ให้ Sidebar */}
      <Layout>
        <Navbar user={user} /> {/* ✅ ส่งค่า `user` ให้ Navbar */}
        <Content style={{ padding: "20px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

// ✅ ใช้ `prop-types` กำหนดประเภทของ Props
ProtectedLayout.propTypes = {
  children: PropTypes.node.isRequired, // ต้องเป็น React Node เช่น <Component />
};

export default App;
