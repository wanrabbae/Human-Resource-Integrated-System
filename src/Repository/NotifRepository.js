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

var pushNotif = async (requestBody) => {
  var res = await api.post(`${endpoint}/pushNotif`, requestBody);
  return res;
};

export { pushNotif };
