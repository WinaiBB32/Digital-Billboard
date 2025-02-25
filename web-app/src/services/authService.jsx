import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const authService = {
  login: (credentials) => axios.post(`${API_URL}/login`, credentials),
  logout: () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  },
};

export default authService;
