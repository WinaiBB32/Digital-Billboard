import axios from "axios";

const API_URL = "http://localhost:5000/api/meetings";

const meetingService = {
  getMeetings: () => axios.get(API_URL),
  createMeeting: (data) => axios.post(API_URL, data),
  deleteMeeting: (id) => axios.delete(`${API_URL}/${id}`),
};

export default meetingService;
