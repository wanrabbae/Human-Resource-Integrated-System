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

var GetEvent = async () => {
  var res = await api.get(`/getEvent`);
  if (res.status == 200) {
    return res.data.result;
  }
};

var GetTodo = async () => {
  var res = await api.get(`/getMyTodo`);
  if (res.status == 200) {
    return res.data.result;
  }
};
var AddEvent = async (data) => {
  var res = await api.post(`/addEvent`, data);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};
var DeleteEvent = async (id) => {
  var res = await api.get(`/deleteEvent?id=${id}`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

var GetAttendance = async () => {
  var res = await api.get(`/mobile/user/getAttendances`);
  if (res.status == 200) {
    return res.data.result;
  }
};

var GetAttendanceByDate = async (date) => {
  var res = await api.get(`/getAttendance?date=${date}`);
  if (res.status == 200) {
    return res.data;
  }
};

var AddAttendance = async (data) => {
  var res = await api.post(`/mobile/user/postRecord`, data);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

var GetEmployeeRecord = async () => {
  var res = await api.get(`/getEmployeeRecord`);
  if (res.status == 200) {
    return res.data;
  }
};

var GetEmployeeRecByDate = async (date) => {
  var res = await api.get(`/getEmployeeRecord?date=${date}`);
  if (res.status == 200) {
    return res.data;
  }
};

var AddEmployeeRecord = async (data) => {
  var res = await api.post(`/addEmployeeRecord`, data);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

var GetSchedule = async () => {
  var res = await api.get(`/getSchedule`);
  if (res.status == 200) {
    return res.data.result;
  }
};

var GetScheduleByDate = async (date) => {
  var res = await api.get(`/getSchedule?date=${date}`);
  if (res.status == 200) {
    return res.data;
  }
};

var AddSchedule = async (requestBody) => {
  var res = await api.post(`/addSchedule`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var EditSchedule = async (requestBody) => {
  var res = await api.post(`/updateSchedule`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var DeleteSchedule = async (id) => {
  var res = await api.get(`/deleteSchedule?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

var GetEmployeeProfile = async (auth) => {
  var res = await api.get(`/getProfile`, {
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
  GetEvent,
  AddEvent,
  DeleteEvent,
  GetTodo
};
