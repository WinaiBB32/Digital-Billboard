import axios from "axios";

const API_URL = "http://localhost:5000/api/work-groups";

const workGroupService = {
  getWorkGroups: () => axios.get(API_URL),
  createWorkGroup: (data) => axios.post(API_URL, data),
};

export default workGroupService;
