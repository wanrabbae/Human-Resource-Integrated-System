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

var GetLanguages = async () => {
  var res = await api.get(`${endpoint}/getLanguage`);
  console.log(res);
  if (res.status == 200) {
    return res.data.result;
  }
};

var AddLanguages = async (data) => {
  var res = await api.post(`${endpoint}/addLanguage`, { name: data });
  console.log(res);
  if (res.status == 200) {
    return res.data;
  }
};

var DeleteLanguages = async (id) => {
  var res = await api.get(`${endpoint}/deleteLanguage?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

var EditLanguages = async (data) => {
  var res = await api.post(`${endpoint}/updateLanguage`, data);
  if (res.status == 200) {
    return res.data;
  }
};

export { GetLanguages, AddLanguages, DeleteLanguages, EditLanguages };
