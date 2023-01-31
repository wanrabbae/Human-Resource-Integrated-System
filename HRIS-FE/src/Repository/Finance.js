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

var getReimbursementSetting = async () => {
  var res = await api.get(`/reimbursement/setting/all`);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};
var getRBSettingDetail = async (id) => {
  var res = await api.get(`/reimbursement/setting/${id}`);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};

var addReimbursementSetting = async (data) => {
  var res = await api.post(`/reimbursement/setting`, data);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};

var updateReimbursementSetting = async (id, data) => {
  var res = await api.put(`/reimbursement/setting/${id}`, data);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};

var deleteReimbursementSetting = async (id) => {
  var res = await api.delete(`/reimbursement/setting/${id}`);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};

var getReimbursement = async (paginate) => {
  var res;

  if (paginate) {
    res = await api.get(
      `${endpoint}/reimbursement/all?page=${paginate.page}&size=${paginate.size}`
    );
  } else {
    res = await api.get(`${endpoint}/reimbursement/all`);
  }
  if (res.status == 200) {
    return res.data.data;
  }
};

var searchReimbursement = async (keyword) => {
  var res = await api.get(`/reimbursement/all?keyword=${keyword}`);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};

var addReimbursement = async (data) => {
  var res = await api.post(`/reimbursement`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};

var updateReimbursement = async (id, data) => {
  var res = await api.put(`/reimbursement/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};

var deleteReimbursement = async (id) => {
  var res = await api.delete(`/reimbursement/${id}`);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};


var getCashAdvanceSetting = async () => {
  var res = await api.get(`/cash-advance/setting/all`);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};
var getCASettingDetail = async (id) => {
  var res = await api.get(`/cash-advance/setting/${id}`);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};

var addCashAdvanceSetting = async (data) => {
  var res = await api.post(`/cash-advance/setting`, data);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};

var updateCashAdvanceSetting = async (id, data) => {
  var res = await api.put(`/cash-advance/setting/${id}`, data);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};

var deleteCashAdvanceSetting = async (id) => {
  var res = await api.delete(`/cash-advance/setting/${id}`);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};


var getLoanSetting = async () => {
  var res = await api.get(`/loan/setting/all`);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};
var getLoanSettingDetail = async (id) => {
  var res = await api.get(`/loan/setting/${id}`);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};
var addLoanSetting = async (data) => {
  var res = await api.post(`/loan/setting`, data);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};

var updateLoanSetting = async (id, data) => {
  var res = await api.put(`/loan/setting/${id}`, data);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};

var deleteLoanSetting = async (id) => {
  var res = await api.delete(`/loan/setting/${id}`);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};

var getCashAdvance = async (paginate) => {
  var res;

  if (paginate) {
    res = await api.get(
      `${endpoint}/cash-advance/all?page=${paginate.page}&size=${paginate.size}`
    );
  } else {
    res = await api.get(`${endpoint}/cash-advance/all`);
  }
  if (res.status == 200) {
    return res.data.data;
  }
};

var searchCashAdvance = async (keyword) => {
  var res = await api.get(`/cash-advance/all?keyword=${keyword}`);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};

var addCashAdvance = async (data) => {
  var res = await api.post(`/cash-advance`, data);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};

var updateCashAdvance = async (id, data) => {
  var res = await api.put(`/cash-advance/${id}`, data);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};

var deleteCashAdvance = async (id) => {
  var res = await api.delete(`/cash-advance/${id}`);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};

var getLoan = async (paginate) => {
  var res;

  if (paginate) {
    res = await api.get(
      `${endpoint}/loan/all?page=${paginate.page}&size=${paginate.size}`
    );
  } else {
    res = await api.get(`${endpoint}/cash-advance/all`);
  }
  if (res.status == 200) {
    return res.data.data;
  }
};

var searchLoan = async (keyword) => {
  var res = await api.get(`/loan/all?keyword=${keyword}`);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};

var addLoan = async (data) => {
  var res = await api.post(`/loan`, data);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};

var updateLoan = async (id, data) => {
  var res = await api.put(`/loan/${id}`, data);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};

var deleteLoan = async (id) => {
  var res = await api.delete(`/loan/${id}`);
  if (res.status == 200) {
    return res;
  } else {
    return res;
  }
};

export {
  getReimbursementSetting,
  addReimbursementSetting,
  updateReimbursementSetting,
  deleteReimbursementSetting,
  getReimbursement,
  addReimbursement,
  deleteReimbursement,
  updateReimbursement,
  getCashAdvanceSetting,
  addCashAdvanceSetting,
  updateCashAdvanceSetting,
  deleteCashAdvanceSetting,
  getLoanSetting,
  addLoanSetting,
  updateLoanSetting,
  deleteLoanSetting,
  getCashAdvance,
  addCashAdvance,
  deleteCashAdvance,
  updateCashAdvance,
  getLoan,
  addLoan,
  deleteLoan,
  updateLoan,
  getRBSettingDetail,
  getCASettingDetail,
  searchReimbursement,
  searchCashAdvance,
  searchLoan,
  getLoanSettingDetail
};
