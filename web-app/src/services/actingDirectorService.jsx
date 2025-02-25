import axios from "axios";

const API_URL = "http://localhost:5000/api/acting-director";

const actingDirectorService = {
  getDirectors: () => axios.get(API_URL),
  createDirector: (data) => axios.post(API_URL, data),
};

export default actingDirectorService;
