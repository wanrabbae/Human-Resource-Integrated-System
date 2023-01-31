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

var GetEducation = async () => {
  var res = await api.get(`/getEducation`);
  if (res.status == 200) {
    return res.data.result;
  }
};

var AddEducation = async (requestBody) => {
  var res = await api.post(`/addEducation`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var EditEducation = async (requestBody) => {
  var res = await api.post(`${endpoint}/updateEducation`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var DeleteEducation = async (id) => {
  var res = await api.get(`${endpoint}/deleteEducation?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

export { GetEducation, AddEducation, EditEducation, DeleteEducation };
