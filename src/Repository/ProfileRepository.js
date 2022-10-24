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

const getProfile = async () => {
  var res = await api.get(`${endpoint}/getProfile`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const updateProfile = async (data) => {
  var res = await api.post(`${endpoint}/updateProfile`, data);
  if (res.status == 200) {
    return res.data;
  }
};

export { getProfile, updateProfile };
