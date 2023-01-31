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

var GetEmployee = async (paginate) => {
  var res;

  if (paginate) {
    res = await api.get(
      `${endpoint}/getEmployee?page=${paginate.page}&size=${paginate.size}`
    );
  } else {
    res = await api.get(`${endpoint}/getEmployee`);
  }

  if (res.data.status == 200) {
    return res.data.result;
  }
};

var SearchEmployee = async (keyword) => {
  var res = await api.get(`/getEmployee?keyword=${keyword}`);
  if (res.data.status == 200) {
    return res.data.result;
  }
};

var GetEmployeeName = async () => {
  var res = await api.get(`/getEmployeeName`);
  if (res.data.status == 200) {
    return res.data.result;
  }
};

var GetReportMeth = async () => {
  var res = await api.get(`${endpoint}/getReportMethod`);
  if (res.data.status == 200) {
    return res.data;
  }
};
var AddReportMeth = async (requestBody) => {
  var res = await api.post(`${endpoint}/addReportMethod`, requestBody);
  if (res.data.status == 200) {
    return res.data;
  }
};
var UpdateReportMeth = async (requestBody) => {
  var res = await api.post(`${endpoint}/updateReportMethod`, requestBody);
  if (res.data.status == 200) {
    return res.data;
  }
};
var DelReportMeth = async (id) => {
  var res = await api.get(`${endpoint}/deleteReportMethod?id=${id}`);
  if (res.data.status == 200) {
    return res.data;
  }
};

var GetTermReason = async () => {
  var res = await api.get(`${endpoint}/getTerminate`);
  if (res.data.status == 200) {
    return res.data;
  }
};
var AddTermReason = async (requestBody) => {
  var res = await api.post(`${endpoint}/addTerminate`, requestBody);
  if (res.data.status == 200) {
    return res.data;
  }
};
var UpdateTermReason = async (requestBody) => {
  var res = await api.post(`${endpoint}/updateTerminate`, requestBody);
  if (res.data.status == 200) {
    return res.data;
  }
};
var DelTermReason = async (id) => {
  var res = await api.get(`${endpoint}/deleteTerminate?id=${id}`);
  if (res.data.status == 200) {
    return res.data;
  }
};
var AddEmployee = async (requestBody) => {
  var res = await api.post(`${endpoint}/addEmployee`, requestBody, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.status == 200) {
    return res.data;
  }
};
var DeleteEmployee = async (id) => {
  var res = await api.get(`${endpoint}/deleteEmployee?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var UpdateEmployee = async (requestBody) => {
  var res = await api.post(`${endpoint}/updateEmployee`, requestBody, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.status == 200) {
    return res.data;
  }
};

var GetReport = async () => {
  var res = await api.get(`${endpoint}/getReport`);
  return res.data;
};
var SearchReport = async (keyword) => {
  var res = await api.get(`/getReport?keyword=${keyword}`);
  if (res.status == 200) {
    return res.data;
  }
};

var GetReportSingle = async (id) => {
  var res = await api.get(`${endpoint}/getReport?id=${id}`);
  return res.data;
};

var AddReport = async (requestBody) => {
  var res = await api.post(`${endpoint}/addReport`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var UpdateReport = async (requestBody) => {
  var res = await api.post(`${endpoint}/updateReport`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var DeleteReport = async (id) => {
  var res = await api.get(`${endpoint}/deleteReport?id=${id}`);
  return res.data;
};

var ImportEmployee = async (data) => {
  var res = await api.post(`${endpoint}/importEmployee`, data);
  return res.data;
};

var terminateEmployee = async (data) => {
  var res = await api.post(`${endpoint}/employeeTerminate`, data);
  return res.data;
};

var getTerminateEmployee = async (id) => {
  var res = await api.get(`${endpoint}/getEmployeeTerminate?id_employee=${id}`);
  return res.data;
};

var filterEmployee = async (requestBody) => {
  var res = await api.post(`${endpoint}/filterEmployee`,requestBody,);
  return res.data?.result;
}

var filterEmployeeJob = async (requestBody) => {
  var res = await api.post(`${endpoint}/filterEmployeeWithJob`,requestBody,);
  return res.data.data;
}

export {
  filterEmployee,
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
  terminateEmployee,
  getTerminateEmployee,
  SearchReport,
  filterEmployeeJob
};
