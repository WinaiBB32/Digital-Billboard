import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // ✅ ตรวจสอบ URL ให้ถูกต้อง

const authService = {
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      console.error("❌ API Login Failed:", error);
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  },
};

export default authService;
