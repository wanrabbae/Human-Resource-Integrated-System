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

var GetSkills = async () => {
  var res = await api.get(`${endpoint}/getSkill`);
  if (res.status == 200) {
    return res.data.result;
  }
};

var AddSkill = async (requestBody) => {
  var res = await api.post(`${endpoint}/addSkill`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var EditSkill = async (requestBody) => {
  var res = await api.post(`${endpoint}/updateSkill`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var DeleteSkills = async (id) => {
  var res = await api.get(`${endpoint}/deleteSkill?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

export { GetSkills, AddSkill, EditSkill, DeleteSkills };
