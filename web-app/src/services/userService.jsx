import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const userService = {
  getUsers: () => axios.get(API_URL),
  createUser: (data) => axios.post(API_URL, data),
};

export default userService;
