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
  var res = await axios.get(`${endpoint}/deleteUser?id=${id}`);
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
var EditJobTittle = async (requestBody) => {
  var res = await axios.post(`${endpoint}/updateJobTitle`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var delJobTittle = async (id) => {
  var res = await axios.get(`${endpoint}/deleteJobTitle?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var GetJobLevel = async () => {
  var res = await axios.get(`${endpoint}/getJobLevel`);
  if (res.status == 200) {
    return res.data;
  }
};
var GetJobPosition = async () => {
  var res = await axios.get(`${endpoint}/getJobPosition`);
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
var DeleteJobGrade = async (id) => {
  var res = await axios.get(`${endpoint}/deleteJobGrade?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var EditJobGrade = async (data) => {
  var res = await axios.post(`${endpoint}/updateJobGrade`, data);
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
var DeleteEmployeeStatus = async (id) => {
  var res = await axios.get(`${endpoint}/deleteEmployeeStatus?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var EditEmployeeStatus = async (requestBody) => {
  var res = await axios.post(`${endpoint}/updateEmployeeStatus`, requestBody);
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
var DeleteJobCategory = async (id) => {
  var res = await axios.get(`${endpoint}/deleteJobCategory?id=${id}`);
  console.log(res);
  if (res.status == 200) {
    return res.data;
  }
};
var EditJobCategory = async (requestBody) => {
  var res = await axios.post(`${endpoint}/updateJobCategory`, requestBody);
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
var EditWorkShift = async (requestBody) => {
  var res = await axios.post(`${endpoint}/updateWorkShift`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var deleteWorkShift = async (id) => {
  var res = await axios.get(`${endpoint}/deleteWorkShift?id=${id}`);
  console.log(res);
  if (res.status == 200) {
    return res.data;
  }
};
var getUnit = async () => {
  var res = await axios.get(`${endpoint}/getUnit`);
  if (res.status == 200) {
    return res.data.result;
  }
};
var AddUnit = async (requestBody) => {
  var res = await axios.post(`${endpoint}/addUnit`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var EditUnit = async (requestBody) => {
  var res = await axios.post(`${endpoint}/updateUnit`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var deleteUnit = async (id) => {
  var res = await axios.get(`${endpoint}/deleteUnit?id=${id}`);
  console.log(res);
  if (res.status == 200) {
    return res.data;
  }
};
var getLicense = async () => {
  var res = await axios.get(`${endpoint}/getLicense`);
  if (res.status == 200) {
    return res.data.result;
  }
};
var AddLicense = async (requestBody) => {
  var res = await axios.post(`${endpoint}/addLicense`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var EditLicense = async (requestBody) => {
  var res = await axios.post(`${endpoint}/updateLicense`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var deleteLicense = async (id) => {
  var res = await axios.get(`${endpoint}/deleteLicense?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

var getCompanyLocation = async () => {
  var res = await axios.get(`${endpoint}/getCompanyLocation`);
  if (res.status == 200) {
    return res.data.result;
  }
};
var AddCompanyLocation = async (requestBody) => {
  var res = await axios.post(`${endpoint}/addCompanyLocation`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var EditCompanyLocation = async (requestBody) => {
  var res = await axios.post(`${endpoint}/updateCompanyLocation`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var deleteCompanyLocation = async (id) => {
  var res = await axios.get(`${endpoint}/deleteCompanyLocation?id=${id}`);
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
  EditJobTittle,
  AddUser,
  DeleteUser,
  EditUser,
  GetJobGrade,
  AddJobGrade,
  DeleteJobGrade,
  EditJobGrade,
  GetEmployeeStatus,
  AddEmployeeStatus,
  DeleteEmployeeStatus,
  EditEmployeeStatus,
  GetJobCategory,
  AddJobCategory,
  DeleteJobCategory,
  EditJobCategory,
  getWorkShift,
  AddWorkShift,
  deleteWorkShift,
  EditWorkShift,
  getUnit,
  AddUnit,
  deleteUnit,
  EditUnit,
  getLicense,
  AddLicense,
  EditLicense,
  deleteLicense,
  getCompanyLocation,
  AddCompanyLocation,
  EditCompanyLocation,
  deleteCompanyLocation,
  GetJobLevel,
  GetJobPosition
};
