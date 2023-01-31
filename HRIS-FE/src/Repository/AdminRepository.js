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

var GetUser = async () => {
  var res = await api.get(`/getUser`);
  if (res.status == 200) {
    return res.data;
  }
};
var GetInfo = async () => {
  var res = await api.get(`/getInfo`);
  if (res.status == 200) {
    return res.data;
  }
};

var AddUser = async (data) => {
  var res = await api.post(`/addUser`, data);
  if (res.data.status == 200) {
    return res.data;
  }
};

var DeleteUser = async (id) => {
  var res = await api.get(`/deleteUser?id=${id}`);
  if (res.data.status == 200) {
    return res.data;
  }
};

var EditUser = async (data) => {
  var res = await api.post(`/updateUser`, data);
  if (res.status == 200) {
    return res.data;
  }
};

var SearchUser = async (keyword) => {
  var res = await api.get(`/getUser?keyword=${keyword}`);
  if (res.status == 200) {
    return res.data;
  }
};

var FilterUser = async (data) => {
  var res = await api.post(`/filterUser`, data);
  if (res.data.status == 200) {
    return res.data;
  }
};

var GetApplicant = async () => {
  var res = await api.get(`/getApplicant`);
  if (res.status == 200) {
    return res.data;
  }
};

// JOB

var GetJobTittle = async () => {
  var res = await api.get(`/getJobTitle`);
  if (res.status == 200) {
    return res.data;
  }
};
var AddJobTittle = async (requestBody) => {
  var res = await api.post(`/addJobTitle`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var EditJobTittle = async (requestBody) => {
  var res = await api.post(`/updateJobTitle`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var delJobTittle = async (id) => {
  var res = await api.get(`/deleteJobTitle?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var GetJobLevel = async () => {
  var res = await api.get(`/getJobLevel`);
  if (res.status == 200) {
    return res.data;
  }
};
var AddJobLevel = async (requestBody) => {
  var res = await api.post(`/addJobLevel`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var EditJobLevel = async (requestBody) => {
  var res = await api.post(`/updateJobLevel`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var DeleteJobLevel = async (id) => {
  var res = await api.get(`/deleteJobLevel?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var GetJobPosition = async () => {
  var res = await api.get(`/getJobPosition`);
  if (res.status == 200) {
    return res.data;
  }
};
var AddJobPosition = async (requestBody) => {
  var res = await api.post(`/addJobPosition`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var UpdateJobPosition = async (requestBody) => {
  var res = await api.post(`/updateJobPosition`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var DelJobPosition = async (id) => {
  var res = await api.get(`/deleteJobPosition?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var GetJobGrade = async () => {
  var res = await api.get(`/getJobGrade`);
  if (res.status == 200) {
    return res.data;
  }
};
var AddJobGrade = async (requestBody) => {
  var res = await api.post(`/addJobGrade`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var DeleteJobGrade = async (id) => {
  var res = await api.get(`/deleteJobGrade?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var EditJobGrade = async (data) => {
  var res = await api.post(`/updateJobGrade`, data);
  if (res.status == 200) {
    return res.data;
  }
};
var GetEmployeeStatus = async () => {
  var res = await api.get(`/getEmployeeStatus`);
  if (res.status == 200) {
    return res.data;
  }
};
var AddEmployeeStatus = async (requestBody) => {
  var res = await api.post(`/addEmployeeStatus`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var DeleteEmployeeStatus = async (id) => {
  var res = await api.get(`/deleteEmployeeStatus?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var EditEmployeeStatus = async (requestBody) => {
  var res = await api.post(`/updateEmployeeStatus`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var GetJobCategory = async () => {
  var res = await api.get(`/getJobCategory`);
  if (res.status == 200) {
    return res.data;
  }
};
var AddJobCategory = async (requestBody) => {
  var res = await api.post(`/addJobCategory`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var DeleteJobCategory = async (id) => {
  var res = await api.get(`/deleteJobCategory?id=${id}`);
  console.log(res);
  if (res.status == 200) {
    return res.data;
  }
};
var EditJobCategory = async (requestBody) => {
  var res = await api.post(`/updateJobCategory`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var getWorkShift = async () => {
  var res = await api.get(`/getWorkShift`);
  if (res.status == 200) {
    return res.data;
  }
};
var AddWorkShift = async (requestBody) => {
  var res = await api.post(`/addWorkShift`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var EditWorkShift = async (requestBody) => {
  var res = await api.post(`/updateWorkShift`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var deleteWorkShift = async (id) => {
  var res = await api.get(`/deleteWorkShift?id=${id}`);
  console.log(res);
  if (res.status == 200) {
    return res.data;
  }
};
var getProfit = async () => {
  var res = await api.get(`/getProfit`);
  if (res.status == 200) {
    return res.data;
  }
};
var getCost = async () => {
  var res = await api.get(`/getCost`);
  if (res.status == 200) {
    return res.data;
  }
};
var AddProfit = async (requestBody) => {
  var res = await api.post(`/addProfit`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var EditProfit = async (requestBody) => {
  var res = await api.post(`/updateProfit`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var deleteProfit = async (id) => {
  var res = await api.get(`/deleteProfit?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var AddCost = async (requestBody) => {
  var res = await api.post(`/addCost`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var EditCost = async (requestBody) => {
  var res = await api.post(`/updateCost`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var deleteCost = async (id) => {
  var res = await api.get(`/deleteCost?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var EditUnit = async (requestBody) => {
  var res = await api.post(`/updateUnit`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var deleteUnit = async (id) => {
  var res = await api.get(`/deleteUnit?id=${id}`);
  console.log(res);
  if (res.status == 200) {
    return res.data;
  }
};
var getLicense = async () => {
  var res = await api.get(`/getLicense`);
  if (res.status == 200) {
    return res.data.result;
  }
};
var AddLicense = async (requestBody) => {
  var res = await api.post(`/addLicense`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var EditLicense = async (requestBody) => {
  var res = await api.post(`/updateLicense`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var deleteLicense = async (id) => {
  var res = await api.get(`/deleteLicense?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

var getCompanyLocation = async () => {
  var res = await api.get(`/getCompanyLocation`);
  if (res.status == 200) {
    return res.data.result;
  }
};
var getCountries = async () => {
  var res = await axios.get(`https://restcountries.com/v2/all`);
  if (res.status == 200) {
    return res.data;
  }
};
var getProvince = async (id) => {
  var res;

  if (id) {
    res = await axios.get(
      `https://dev.farizdotid.com/api/daerahindonesia/provinsi/${id}`
    );
  } else {
    res = await axios.get(
      "https://dev.farizdotid.com/api/daerahindonesia/provinsi"
    );
  }

  if (res.status == 200) {
    return res.data;
  }
};
var getCityProvince = async (id) => {
  var res = await axios.get(
    `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${id}`
  );
  if (res.status == 200) {
    return res.data;
  }
};
var AddCompanyLocation = async (requestBody) => {
  var res = await api.post(`/addCompanyLocation`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var EditCompanyLocation = async (requestBody) => {
  var res = await api.post(`/updateCompanyLocation`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var deleteCompanyLocation = async (id) => {
  var res = await api.get(`/deleteCompanyLocation?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var updateInformation = async (data) => {
  var res = await api.post(`/updateInfo`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.status == 200) {
    return res.data;
  }
};
var getStructure = async (data = 0) => {
  if (data == 1) {
    var res = await api.get(`/getStructure?ket=1`);
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

var deleteStructure = async (id) => {
  var res = await api.get(`/deleteStructure?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

var getCodeStructure = async (id) => {
  var res = await api.get(`/getCodeStructure?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

var addStructure = async (requestBody) => {
  var res = await api.post(`/addStructure`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var updateStructure = async (requestBody) => {
  var res = await api.post(`/updateStructure`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var GetJobPositionWithEmployee = async (relationCode) => {
  var res = await api.get(`/jobposition/${relationCode}/employee`);
  if (res.status == 200) {
    return res.data;
  }
};

var BulkUploudJob = async (data) => {
  var res = await api.post(`/bulkUploadJob`, data);
  if (res.status == 200) {
    return res.data;
  }
};
var ImportJobManagement = async (data) => {
  var res = await api.post(`/importJobManagement`, data);
  if (res.status == 200) {
    return res.data;
  }
};

var BulkUploudJobGrade = async (data) => {
  var res = await api.post(`/bulkUploadJobGrade`, data);
  if (res.status == 200) {
    return res.data;
  }
};

var BulkUploudJobLevel = async (data) => {
  var res = await api.post(`/bulkUploadJobLevel`, data);
  if (res.status == 200) {
    return res.data;
  }
};

var BulkUploudJobTitle = async (data) => {
  var res = await api.post(`/bulkUploadJobTitle`, data);
  if (res.status == 200) {
    return res.data;
  }
};

var BulkUploudJobPosition = async (data) => {
  var res = await api.post(`/bulkUploadJobPosition`, data);
  if (res.status == 200) {
    return res.data;
  }
};

export {
  ImportJobManagement,
  BulkUploudJobGrade,
  BulkUploudJobLevel,
  BulkUploudJobTitle,
  BulkUploudJobPosition,
  updateStructure,
  deleteStructure,
  addStructure,
  getCodeStructure,
  GetUser,
  getStructure,
  GetApplicant,
  GetJobTittle,
  AddJobTittle,
  delJobTittle,
  EditJobTittle,
  AddUser,
  DeleteUser,
  EditUser,
  SearchUser,
  FilterUser,
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
  getProfit,
  getCost,
  AddProfit,
  EditProfit,
  deleteProfit,
  AddCost,
  EditCost,
  deleteCost,
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
  GetJobPosition,
  GetJobPositionWithEmployee,
  GetInfo,
  AddJobLevel,
  EditJobLevel,
  DeleteJobLevel,
  AddJobPosition,
  DelJobPosition,
  UpdateJobPosition,
  updateInformation,
  getProvince,
  getCityProvince,
  getCountries,
  BulkUploudJob,
};
