import axios from "axios";
import { endpoint } from "../Utils/constant";

var GetEmployee = async (paginate) => {
  var res = await axios.get(
    `${endpoint}/getEmployee?page=${paginate.page}&size=${paginate.size}`
  );
  if (res.data.status == 200) {
    return res.data.result;
  }
};

var SearchEmployee = async (keyword) => {
  var res = await axios.get(`${endpoint}/getEmployee?keyword=${keyword}`);
  if (res.data.status == 200) {
    return res.data.result;
  }
};

var GetEmployeeName = async () => {
  var res = await axios.get(`${endpoint}/getEmployeeName`);
  if (res.data.status == 200) {
    return res.data.result;
  }
};

var GetReportMeth = async () => {
  var res = await axios.get(`${endpoint}/getReportMethod`);
  if (res.data.status == 200) {
    return res.data;
  }
};
var AddReportMeth = async (requestBody) => {
  var res = await axios.post(`${endpoint}/addReportMethod`, requestBody);
  if (res.data.status == 200) {
    return res.data;
  }
};
var UpdateReportMeth = async (requestBody) => {
  var res = await axios.post(`${endpoint}/updateReportMethod`, requestBody);
  if (res.data.status == 200) {
    return res.data;
  }
};
var DelReportMeth = async (id) => {
  var res = await axios.get(`${endpoint}/deleteReportMethod?id=${id}`);
  if (res.data.status == 200) {
    return res.data;
  }
};

var GetTermReason = async () => {
  var res = await axios.get(`${endpoint}/getTerminate`);
  console.log(res);
  if (res.data.status == 200) {
    return res.data;
  }
};
var AddTermReason = async (requestBody) => {
  var res = await axios.post(`${endpoint}/addTerminate`, requestBody);
  if (res.data.status == 200) {
    return res.data;
  }
};
var UpdateTermReason = async (requestBody) => {
  var res = await axios.post(`${endpoint}/updateTerminate`, requestBody);
  if (res.data.status == 200) {
    return res.data;
  }
};
var DelTermReason = async (id) => {
  var res = await axios.get(`${endpoint}/deleteTerminate?id=${id}`);
  if (res.data.status == 200) {
    return res.data;
  }
};
var AddEmployee = async (requestBody) => {
  var res = await axios.post(`${endpoint}/addEmployee`, requestBody, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.status == 200) {
    return res.data;
  }
};
var DeleteEmployee = async (id) => {
  var res = await axios.get(`${endpoint}/deleteEmployee?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var UpdateEmployee = async (requestBody) => {
  var res = await axios.post(`${endpoint}/updateEmployee`, requestBody, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.status == 200) {
    return res.data;
  }
};

var GetReport = async () => {
  var res = await axios.get(`${endpoint}/getReport`);
  return res.data;
};

var GetReportSingle = async (id) => {
  var res = await axios.get(`${endpoint}/getReport?id=${id}`);
  return res.data;
};

var AddReport = async (requestBody) => {
  var res = await axios.post(`${endpoint}/addReport`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var UpdateReport = async (requestBody) => {
  var res = await axios.post(`${endpoint}/updateReport`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var DeleteReport = async (id) => {
  var res = await axios.get(`${endpoint}/deleteReport?id=${id}`);
  return res.data;
};

var ImportEmployee = async (data) => {
  var res = await axios.post(`${endpoint}/importEmployee`, data);
  return res.data;
};

export {
  UpdateEmployee,
  SearchEmployee,
  DeleteEmployee,
  AddEmployee,
  GetEmployee,
  GetEmployeeName,
  GetReportMeth,
  AddReportMeth,
  DelReportMeth,
  UpdateReportMeth,
  GetTermReason,
  AddTermReason,
  DelTermReason,
  UpdateTermReason,
  GetReport,
  AddReport,
  UpdateReport,
  DeleteReport,
  GetReportSingle,
  ImportEmployee,
};
