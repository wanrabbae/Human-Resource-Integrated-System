import axios from "axios";
import { endpoint } from "../Utils/constant";

var GetUser = async () => {
  var res = await axios.get(`${endpoint}/getUser`);
  if (res.status == 200) {
    return res.data;
  }
};

var AddUser = async (data) => {
  var res = await axios.post(`${endpoint}/addUser`, data);
  if (res.data.status == 200) {
    return res.data;
  }
};

var DeleteUser = async (id) => {
  var res = await axios.post(`${endpoint}/deleteUser`, { id: id });
  if (res.data.status == 200) {
    return res.data;
  }
};

var EditUser = async (data) => {
  var res = await axios.post(`${endpoint}/updateUser`, data);
  if (res.status == 200) {
    return res.data;
  }
};

var GetApplicant = async () => {
  var res = await axios.get(`${endpoint}/getApplicant`);
  if (res.status == 200) {
    return res.data;
  }
};

// JOB

var GetJobTittle = async () => {
  var res = await axios.get(`${endpoint}/getJobTitle`);
  if (res.status == 200) {
    return res.data;
  }
};
var AddJobTittle = async (requestBody) => {
  var res = await axios.post(`${endpoint}/addJobTitle`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var delJobTittle = async (id) => {
  var res = await axios.post(`${endpoint}/addJobTitle`, { id: id });
  if (res.status == 200) {
    return res.data;
  }
};

export {
  GetUser,
  GetApplicant,
  GetJobTittle,
  AddJobTittle,
  delJobTittle,
  AddUser,
  DeleteUser,
  EditUser,
};
