import axios from "axios";
import { endpoint } from "../Utils/constant";

var GetAttendance = async () => {
  var res = await axios.get(`${endpoint}/getAttendance`);
  if (res.status == 200) {
    return res.data;
  }
};

var GetAttendanceByDate = async (date) => {
  var res = await axios.get(`${endpoint}/getAttendance?date=${date}`);
  if (res.status == 200) {
    return res.data;
  }
};

var AddAttendance = async (data) => {
  var res = await axios.post(`${endpoint}/addAttendance`, data);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

var GetEmployeeRecord = async () => {
  var res = await axios.get(`${endpoint}/getEmployeeRecord`);
  if (res.status == 200) {
    return res.data;
  }
};

var GetEmployeeRecByDate = async (date) => {
  var res = await axios.get(`${endpoint}/getEmployeeRecord?date=${date}`);
  if (res.status == 200) {
    return res.data;
  }
};

var AddEmployeeRecord = async (data) => {
  var res = await axios.post(`${endpoint}/addEmployeeRecord`, data);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

var GetSchedule = async () => {
  var res = await axios.get(`${endpoint}/getSchedule`);
  if (res.status == 200) {
    return res.data.result;
  }
};

var GetScheduleByDate = async (date) => {
  var res = await axios.get(`${endpoint}/getSchedule?date=${date}`);
  if (res.status == 200) {
    return res.data;
  }
};

var AddSchedule = async (requestBody) => {
  var res = await axios.post(`${endpoint}/addSchedule`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var EditSchedule = async (requestBody) => {
  var res = await axios.post(`${endpoint}/updateSchedule`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var DeleteSchedule = async (id) => {
  var res = await axios.get(`${endpoint}/deleteSchedule?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

var GetEmployeeProfile = async (auth) => {
  var res = await axios.get(`${endpoint}/getProfile`, {
    headers: {
      Authorization: auth,
    },
  });
  if (res.status == 200) {
    return res.data;
  }
};

export {
  GetSchedule,
  AddSchedule,
  EditSchedule,
  DeleteSchedule,
  GetAttendance,
  GetEmployeeRecord,
  GetAttendanceByDate,
  GetEmployeeRecByDate,
  GetScheduleByDate,
  AddAttendance,
  AddEmployeeRecord,
  GetEmployeeProfile,
};
