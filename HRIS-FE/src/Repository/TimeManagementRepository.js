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

var AddTodo = async (data) => {
  var res = await api.post(`/addMyTodo`, data);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

var UpdateTodo = async (data) => {
  var res = await api.post(`/updateMyTodo`, data);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const GetTodo = async () => {
  var res = await api.get(`/getMyTodo`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};
var DeleteTodo = async (id) => {
  var res = await api.get(`/deleteMyTodo?id=${id}`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

var GetEvent = async () => {
  var res = await api.get(`/getEvent`);
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
var UpdateEvent = async (data) => {
  var res = await api.post(`/updateEvent`, data);
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

var GetEmployeeRecord = async (paginate) => {
  var res;

  if (paginate) {
    res = await api.get(
      `/getEmployeeRecord?page=${paginate.page}&size=${paginate.size}`
    );
  } else {
    res = await api.get(`/getEmployeeRecord`);
  }

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

var DetailSchedule = async (id) => {
  var res = await api.get(`/getSchedule/${id}`);
  if (res.status == 200) {
    return res.data;
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
  } else {
    return res
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

var updateLeave = async (requestBody, id) => {
  var res = await api.put(`/leave/${id}`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var createLeave = async (requestBody) => {
  var res = await api.post(`/leave`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var GetLeave = async (paginate) => {
  var res;

  if (paginate) {
    res = await api.get(
      `${endpoint}/leave/all?page=${paginate.page}&size=${paginate.size}`
    );
  } else {
    res = await api.get(`${endpoint}/leave/all`);
  }
  if (res.status == 200) {
    return res.data.data;
  }
};

var getLeaveDetail = async (id) => {
  var res = await api.get(`/leave/${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var deleteLeave = async (id) => {
  var res = await api.delete(`/leave/${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var GetLeaveType = async () => {
  var res = await api.get(`/leave/type/all`);
  if (res.status == 200) {
    return res.data;
  }
};

var createLeaveType = async (requestBody) => {
  var res = await api.post(`/leave/type`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
var updateLeaveType = async (requestBody, id) => {
  var res = await api.put(`/leave/type/${id}`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var deleteLeaveType = async (id) => {
  var res = await api.delete(`/leave/type/${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

var createOvertime = async (requestBody) => {
  var res = await api.post(`/overtime`, requestBody);
  return res
};
var GetOvertime = async () => {
  var res = await api.get(`/overtime/all`);
  if (res.status == 200) {
    return res.data;
  }
};
var getOvertimeDetail = async (id) => {
  var res = await api.get(`/overtime/${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

var deleteOvertime = async (id) => {
  var res = await api.delete(`/overtime/${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var GetDetailOvertime = async (id) => {
  var res = await api.get(`/overtime/${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

var updateOvertime = async (requestBody, id) => {
  var res = await api.put(`/overtime/${id}`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var deleteLeaveType = async (id) => {
  var res = await api.delete(`/leave/type/${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var GetPermission = async () => {
  var res = await api.get(`/permissions/all`);
  // if (res.status == 200) {
  return res;
  // }
};

var getPermissionDetail = async (id) => {
  var res = await api.get(`/permissions/${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

var createPermission = async (requestBody) => {
  var res = await api.post(`/permissions`, requestBody);
  return res
};
var updatePermission = async (requestBody, id) => {
  var res = await api.put(`/permissions/${id}`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var deletePermission = async (id) => {
  var res = await api.delete(`/permissions/${id}`);
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
  UpdateEvent,
  DeleteEvent,
  GetTodo,
  DeleteTodo,
  AddTodo,
  UpdateTodo,
  GetLeave,
  GetLeaveType,
  createLeaveType,
  deleteLeaveType,
  deleteLeave,
  createLeave,
  updateLeaveType,
  updateLeave,
  GetOvertime,
  GetDetailOvertime,
  createPermission,
  GetPermission,
  deletePermission,
  updatePermission,
  createOvertime,
  updateOvertime,
  deleteOvertime,
  DetailSchedule,
  getLeaveDetail,
  getOvertimeDetail,
  getPermissionDetail
};
