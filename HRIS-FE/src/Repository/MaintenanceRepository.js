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
var postMaintenance = async (requestBody) => {
  var res = await api.get(`${endpoint}/maintenance`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

export {
  postMaintenance
};
