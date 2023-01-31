import axios from "axios";
import { endpoint } from "../Utils/constant";

const api = axios.create({
  baseURL: endpoint,
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `${token}`;
  }
  return req;
});

var GetDashboard = async () => {
  var res = await api.get(`${endpoint}/getDashboardData`);
  if (res.status == 200) {
    return res.data;
  }
};

var GetBirthdate = async () => {
  var res = await api.get(`${endpoint}/current-birthday`);
  if (res.status == 200) {
    return res.data;
  }
};

var GetForum = async () => {
  var res = await api.get(`${endpoint}/forums/all`);
  if (res.status == 200) {
    return res.data;
  }
};

var CreateForum = async (data) => {
  var res = await api.post(`${endpoint}/forums`, data);
  if (res.status == 200) {
    return res.data;
  }
};

export { GetDashboard, GetBirthdate, GetForum, CreateForum };
