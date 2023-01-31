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

var GetPayrolComponent = async (paginate) => {
  var res;

  if (paginate) {
    res = await api.get(
      `${endpoint}/payroll-component/all?page=${paginate.page}&size=${paginate.size}`
    );
  } else {
    res = await api.get(`${endpoint}/payroll-component/all`);
  }

  if (res.status == 200) {
    return res.data;
  }
};

var ImportPayrollC = async (data) => {
  var res = await api.post(`${endpoint}/payroll-component/bulk`, data);
  return res.data;
};

var getSubsidiaryStructure = async (data = 0, id) => {
  if (data == 1) {
    var res = await api.get(`${endpoint}/subsdiary/dashboard?unique_id=${id}`);
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
var GetSubsidiaryDashboard = async (id) => {
  var res = await api.get(`${endpoint}/subsdiary/dashboard?unique_id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var GetSubsidiaryJob = async (id) => {
  var res = await api.get(`${endpoint}/subsdiary/job?unique_id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var GetSubsidiaryAttendance = async (paginate) => {
  var res = await api.get(
    `${endpoint}/subsdiary/attendance?unique_id=${paginate.id}&limit=${paginate.limit}&page=${paginate.page}`
  );
  if (res.status == 200) {
    return res.data;
  }
};
var AddSubsidiary = async (reqbody) => {
  var res = await api.post(`${endpoint}/subsdiary`, reqbody);
  if (res.status == 200) {
    return res.data;
  }
};

var GetComponentPayroll = async (body) => {
  try {
    var res = await api.get(`${endpoint}/payroll/setting/component/all`);

    if (res.status == 200) {
      return res.data;
    }
  } catch (e) {}
};

var AddComponentPayroll = async (reqbody) => {
  var res = await api.post(`${endpoint}/payroll/setting/component`, reqbody);
  if (res.status == 201) {
    return res.data;
  }
};

var UpdateComponentPayroll = async (reqbody) => {
  var res = await api.put(
    `${endpoint}/payroll/setting/component/${reqbody["id"]}`,
    reqbody
  );
  if (res.status == 200) {
    return res.data;
  }
};

var DeleteComponentPayroll = async (id) => {
  var res = await api.delete(`${endpoint}/payroll/setting/component/${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var UpdatePayrollComponent = async (id) => {
  var res = await api.put(`${endpoint}/payroll-component/${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var DeletePayrollComponent = async (id) => {
  var res = await api.delete(`${endpoint}/payroll-component/${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var GetPayrollBonus = async (paginate) => {
  var res = await api.get(
    `/payroll/bonus/all?page=${paginate.page}&size=${paginate.size}`
  );
  if (res.status == 200) {
    return res.data;
  }
};
var AddPayrollBonus = async (reqbody) => {
  var res = await api.post(`${endpoint}/payroll/bonus/add`, reqbody);
  if (res.status == 200) {
    return res.data;
  }
};
var UpdatePayrollBonus = async (id) => {
  var res = await api.put(`${endpoint}/payroll/bonus/put${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var DeletePayrollBonus = async (id) => {
  var res = await api.delete(`${endpoint}/payroll/bonus/delete?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var GetSetBpjs = async (paginate) => {
  var res = await api.get(
    `/payroll/setting/bpjs/all?page=${paginate.page}&size=${paginate.size}`
  );
  if (res.status == 200) {
    return res.data;
  }
};
var AddSetBpjs = async (reqbody) => {
  var res = await api.post(`${endpoint}/payroll/setting/bpjs`, reqbody);
  if (res.status == 200) {
    return res.data;
  }
};
var UpdateSetBpjs = async (id) => {
  var res = await api.put(`${endpoint}/payroll/setting/bpjs/${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var DeleteSetBpjs = async (id) => {
  var res = await api.delete(`${endpoint}/payroll/setting/bpjs/${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var GetPtkp = async () => {
  var res = await api.get(`${endpoint}/payroll/setting/ptkp`);
  if (res.status == 200) {
    console.log(res.data);
    return res.data;
  }
};
var AddPtkp = async (reqbody) => {
  var res = await api.post(`${endpoint}/payroll/setting/ptkp/set`, reqbody);
  if (res.status == 200) {
    return res.data;
  }
};
var GetPkp = async () => {
  var res = await api.get(`${endpoint}/payroll/setting/pkp`);
  if (res.status == 200) {
    return res.data;
  }
};
var AddPkp = async (reqbody) => {
  var res = await api.post(`${endpoint}/payroll/setting/pkp`, reqbody);
  if (res.status == 200) {
    return res.data;
  }
};

var DeletePkp = async (id) => {
  var res = await api.delete(`${endpoint}/payroll/setting/pkp/${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

var UpdatePkp = async (reqbody) => {
  var res = await api.put(
    `${endpoint}/payroll/setting/pkp/${reqbody["id"]}`,
    reqbody
  );
  if (res.status == 200) {
    return res.data;
  }
};
var GetUPH = async () => {
  var res = await api.get(`${endpoint}/payroll/setting/uph`);
  if (res.status == 200) {
    return res.data;
  }
};
var AddUPH = async (reqbody) => {
  var res = await api.post(`${endpoint}/payroll/setting/uph`, reqbody);
  if (res.status == 200) {
    return res.data;
  }
};

var DeleteUPH = async (id) => {
  var res = await api.delete(`${endpoint}/payroll/setting/uph/${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

var UpdateUPH = async (reqbody, id) => {
  var res = await api.put(
    `${endpoint}/payroll/setting/uph/${reqbody["id"]}`,
    reqbody
  );
  if (res.status == 200) {
    return res.data;
  }
};

var GetTHR = async () => {
  var res = await api.get(`${endpoint}/payroll/setting/thr`);
  if (res.status == 200) {
    return res.data;
  }
};
var AddTHR = async (reqbody) => {
  var res = await api.post(`${endpoint}/payroll/setting/thr/set`, reqbody);
  if (res.status == 200) {
    return res.data;
  }
};
var GetPayrollHistory = async () => {
  var res = await api.get(`${endpoint}/payroll/histories`);
  if (res.status == 200) {
    return res.data;
  }
};
var GetUP = async () => {
  var res = await api.get(`${endpoint}/payroll/setting/upumpk`);
  if (res.status == 200) {
    return res.data;
  }
};
var AddUP = async (reqbody) => {
  var res = await api.post(`${endpoint}/payroll/setting/upumpk`, reqbody);
  if (res.status == 200) {
    return res.data;
  }
};
var DeleteUP = async (id) => {
  var res = await api.delete(`${endpoint}/payroll/setting/upumpk/${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var UpdateUP = async (reqbody, id) => {
  var res = await api.put(
    `${endpoint}/payroll/setting/upumpk/${reqbody["id"]}`,
    reqbody
  );
  if (res.status == 200) {
    return res.data;
  }
};

export {
  UpdateComponentPayroll,
  DeleteComponentPayroll,
  GetComponentPayroll,
  AddComponentPayroll,
  UpdatePkp,
  DeletePkp,
  GetPayrolComponent,
  AddSubsidiary,
  ImportPayrollC,
  DeletePayrollComponent,
  UpdatePayrollComponent,
  GetSubsidiaryDashboard,
  GetSubsidiaryJob,
  GetSubsidiaryAttendance,
  GetPayrollBonus,
  AddPayrollBonus,
  UpdatePayrollBonus,
  DeletePayrollBonus,
  GetSetBpjs,
  AddSetBpjs,
  UpdateSetBpjs,
  DeleteSetBpjs,
  AddPtkp,
  AddPkp,
  GetPtkp,
  GetPkp,
  GetPayrollHistory,
  GetTHR,
  AddTHR,
  GetUPH,
  AddUPH,
  UpdateUPH,
  DeleteUPH,
  GetUP,
  AddUP,
  DeleteUP,
  UpdateUP,
};
