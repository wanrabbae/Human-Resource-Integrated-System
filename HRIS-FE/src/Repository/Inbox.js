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

var getApprovalDocument = async () => {
  var res = await api.get(`/respondents/all`);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};

var getApprovalfinance = async () => {
  var res = await api.get(`/finances`);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};

var updateStatusDocument = async (id, data) => {
  var res = await api.put(`/respondents/${id}`, data);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};
var updateStatusFinance = async (data) => {
  var res = await api.put(`/finance/status`, data);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};

var getApprovalTM = async () => {
  var res = await api.get(`/time-approval/all`);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};
var updateStatusTM = async (data) => {
  var res = await api.put(`/time-approval/status`, data);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};
var getDetailReimbursment = async (id) => {
  var res = await api.get(`/reimbursement/all?id=${id}`);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};
var getDetailCashAdvance = async (id) => {
  var res = await api.get(`/cash-advance/all?id=${id}`);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};
var getDetailLoan = async (id) => {
  var res = await api.get(`/loan/all?id=${id}`);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};
var getListInbox = async (paginate) => {
  var res;

  if (paginate) {
    res = await api.get(
      `${endpoint}/inbox/all?page=${paginate.page}&size=${paginate.size}`
    );
  } else {
    res = await api.get(`${endpoint}/inbox/all`);
  }
  if (res.status == 200) {
    return res.data.data;
  }
};
var inboxRead = async (id) => {
  var res = await api.put(`/inbox/read`, id);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};
var deleteInbox = async (id) => {
  var res = await api.delete(`/inbox/delete?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
}; var getDetailInbox = async (id) => {
  var res = await api.get(`/inbox/${id}`);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};
export {
  getApprovalDocument,
  getApprovalfinance,
  updateStatusDocument,
  updateStatusFinance,
  getApprovalTM,
  updateStatusTM,
  getDetailReimbursment,
  getDetailCashAdvance,
  getDetailLoan,
  getListInbox,
  inboxRead,
  deleteInbox,
  getDetailInbox
};
