import axios from "axios";
import { endpoint } from "../Utils/constant";

var GetEmployee = async () => {
  var res = await axios.get(`${endpoint}/getEmployee`);
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

export { GetEmployee, GetEmployeeName, GetReportMeth,AddReportMeth,DelReportMeth,UpdateReportMeth,GetTermReason,AddTermReason,DelTermReason,UpdateTermReason };
