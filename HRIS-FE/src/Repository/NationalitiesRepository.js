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

var GetNational = async () => {
  var res = await api.get(`${endpoint}/getNationalities`);
  if (res.status == 200) {
    return res.data;
  }
};

var AddNational = async (data) => {
  var res = await api.post(`${endpoint}/addNationalities`, { name: data });
  if (res.status == 200) {
    return res.data;
  }
};

var DeleteNational = async (id) => {
  var res = await api.get(`${endpoint}/deleteNationalities?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

var EditNational = async (data) => {
  var res = await api.post(`${endpoint}/updateNationalities`, data);
  if (res.status == 200) {
    return res.data;
  }
};

export { GetNational, AddNational, DeleteNational, EditNational };
