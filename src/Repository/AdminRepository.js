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
var GetJobGrade = async () => {
  var res = await axios.get(`${endpoint}/getJobGrade`);
  if (res.status == 200) {
    return res.data;
  }
};
var AddJobGrade = async (requestBody) => {
  var res = await axios.post(`${endpoint}/addJobGrade`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var GetEmployeeStatus = async () => {
  var res = await axios.get(`${endpoint}/getEmployeeStatus`);
  if (res.status == 200) {
    return res.data;
  }
};
var AddEmployeeStatus = async (requestBody) => {
  var res = await axios.post(`${endpoint}/addEmployeeStatus`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var GetJobCategory = async () => {
  var res = await axios.get(`${endpoint}/getJobCategory`);
  if (res.status == 200) {
    return res.data;
  }
};
var AddJobCategory = async (requestBody) => {
  var res = await axios.post(`${endpoint}/addJobCategory`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var getWorkShift = async () => {
  var res = await axios.get(`${endpoint}/getWorkShift`);
  if (res.status == 200) {
    return res.data;
  }
};
var AddWorkShift = async (requestBody) => {
  var res = await axios.post(`${endpoint}/addWorkShift`, requestBody);
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
  GetJobGrade,
  AddJobGrade,
  GetEmployeeStatus,
  AddEmployeeStatus,
  GetJobCategory,
  AddJobCategory,
  getWorkShift,
  AddWorkShift
};
