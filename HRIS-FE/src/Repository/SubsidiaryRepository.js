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

var GetSubsidiary = async () => {
  var res = await api.get(`${endpoint}/subsdiary/all`);
  if (res.status == 200) {
    return res.data;
  }
};
var getSubsidiaryStructure = async (data = 0, id) => {
  if (data == 1) {
    var res = await api.get(`${endpoint}/subsdiary/dashboard?unique_id=${id}`);
    if (res.status == 200) {
      return res.data;
    }
  } else {
    var res = await api.get(`/getStructure`);
    if (res.status == 200) {
      return res.data;
    }
  }
};
var GetSubsidiaryDashboard = async (id) => {
  var res = await api.get(`${endpoint}/subsdiary/dashboard?unique_id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var GetSubsidiaryJob = async (id) => {
  var res = await api.get(`${endpoint}/subsdiary/job?unique_id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var GetSubsidiaryAttendance = async (paginate) => {
  var res = await api.get(`${endpoint}/subsdiary/attendance?unique_id=${paginate.id}&limit=${paginate.limit}&page=${paginate.page}`);
  if (res.status == 200) {
    return res.data;
  }
};
var AddSubsidiary = async (reqbody) => {
  var res = await api.post(`${endpoint}/subsdiary`, reqbody);
  if (res.status == 200) {
    return res.data;
  }
};
var UpdateSubsidiary = async (id) => {
  var res = await api.put(`${endpoint}/subsdiary/${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var DeleteSubsidiary = async (id) => {
  var res = await api.delete(`${endpoint}/subsdiary/${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

export { 
  GetSubsidiary,
  AddSubsidiary ,
  DeleteSubsidiary,
  UpdateSubsidiary,
  GetSubsidiaryDashboard,
  GetSubsidiaryJob,
  GetSubsidiaryAttendance
};
