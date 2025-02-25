import axios from "axios";

const API_URL = "http://localhost:5000/api/menu";

const menuService = {
  getMenuByRole: (role) => axios.get(`${API_URL}/${role}`),
};

export default menuService;

