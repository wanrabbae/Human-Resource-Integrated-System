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

const getEmergencyContact = async () => {
  var res = await api.get(`${endpoint}/mobile/profile/emergencyContact`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const addEmergencyContact = async (data) => {
  var res = await api.post(`${endpoint}/addEmergencyContact`, data);
  if (res.status == 200) {
    return res.data;
  }
};
const updateEmergencyContact = async (data) => {
  var res = await api.put(`${endpoint}/mobile/profile/emergencyContact`, data);
  if (res.status == 200) {
    return res.data;
  }
};
const deleteEmergencyContact = async (id) => {
  var res = await api.delete(`${endpoint}/mobile/profile/emergencyContact?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

const updateProfile = async (data) => {
  var res = await api.post(`${endpoint}/updateProfile`, data);
  if (res.status == 200) {
    return res.data;
  }
};

export { getProfile, updateProfile, getEmergencyContact, addEmergencyContact, updateEmergencyContact, deleteEmergencyContact };
