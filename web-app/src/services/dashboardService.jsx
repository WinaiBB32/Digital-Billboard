import axios from "axios";

const API_URL = "http://localhost:5000/api/dashboard";

const dashboardService = {
  getUserCount: () => axios.get(`${API_URL}/user-count`),
  getMeetingStats: () => axios.get(`${API_URL}/meeting-stats`),
};

export default dashboardService;
