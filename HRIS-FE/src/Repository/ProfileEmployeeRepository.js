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

const getProfile = async (id) => {
  var res = await api.get(`${endpoint}/getEmployee?id=${id}`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const getEmergencyContact = async (idEmployee) => {
  var res = await api.get(
    `${endpoint}/mobile/profile/emergencyContact?id_employee=${idEmployee}`
  );
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const addEmergencyContact = async (data, idEmployee) => {
  var res = await api.post(
    `${endpoint}/addEmergencyContact?id_employee=${idEmployee}`,
    data
  );
  if (res.status == 200) {
    return res.data;
  }
};
const updateEmergencyContact = async (data, idEmployee) => {
  var res = await api.put(
    `${endpoint}/mobile/profile/emergencyContact?id_employee=${idEmployee}`,
    data
  );
  if (res.status == 200) {
    return res.data;
  }
};
const deleteEmergencyContact = async (id) => {
  var res = await api.delete(
    `${endpoint}/mobile/profile/emergencyContact?id=${id}`
  );
  if (res.status == 200) {
    return res.data;
  }
};

const getDependents = async (idEmployee) => {
  var res = await api.get(
    `${endpoint}/mobile/profile/dependent?id_employee=${idEmployee}`
  );
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const addDependent = async (data, idEmployee) => {
  var res = await api.post(
    `${endpoint}/addDependent?id_employee=${idEmployee}`,
    data
  );
  if (res.status == 200) {
    return res.data;
  }
};
const updateDependent = async (data) => {
  var res = await api.put(`${endpoint}/mobile/profile/dependent`, data);
  if (res.status == 200) {
    return res.data;
  }
};
const getCountry = async () => {
  var res = await axios.get(`https://covid19.mathdro.id/api/countries`);
  if (res.status == 200) {
    return res.data;
  }
};
const deleteDependent = async (id) => {
  var res = await api.delete(`${endpoint}/mobile/profile/dependent?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

const updateProfile = async (data) => {
  var res = await api.post(`${endpoint}/updateProfile`, data);
  if (res.status == 200) {
    return res.data;
  }
};

const getWorkExperience = async (idEmployee) => {
  var res = await api.get(
    `${endpoint}/mobile/profile/experience?id_employee=${idEmployee}`
  );
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};
const addWorkExperience = async (data, idEmployee) => {
  var res = await api.post(
    `${endpoint}/mobile/profile/experience?id_employee=${idEmployee}`,
    data
  );
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};
const updateWorkExperience = async (data) => {
  var res = await api.put(`${endpoint}/mobile/profile/experience`, data);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};
const deleteWorkExperience = async (data) => {
  var res = await api.delete(
    `${endpoint}/mobile/profile/experience?id=${data}`
  );
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const getSkill = async (idEmployee) => {
  var res = await api.get(
    `${endpoint}/mobile/profile/skill?id_employee=${idEmployee}`
  );
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const addSkill = async (data, idEmployee) => {
  var res = await api.post(
    `${endpoint}/mobile/profile/skill?id_employee=${idEmployee}`,
    data
  );
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const updateSkill = async (data) => {
  var res = await api.put(`${endpoint}/mobile/profile/skill`, data);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const deleteSkill = async (data) => {
  var res = await api.delete(`${endpoint}/mobile/profile/skill?id=${data}`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const getEducation = async (idEmployee) => {
  var res = await api.get(
    `${endpoint}/mobile/profile/education?id_employee=${idEmployee}`
  );
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const addEducation = async (data, idEmployee) => {
  var res = await api.post(
    `${endpoint}/mobile/profile/education?id_employee=${idEmployee}`,
    data
  );
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const updateEducation = async (data) => {
  var res = await api.put(`${endpoint}/mobile/profile/education`, data);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const deleteEducation = async (data) => {
  var res = await api.delete(`${endpoint}/mobile/profile/education?id=${data}`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const getLanguage = async (idEmployee) => {
  var res = await api.get(
    `${endpoint}/mobile/profile/language?id_employee=${idEmployee}`
  );
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const addLanguage = async (data, idEmployee) => {
  var res = await api.post(
    `${endpoint}/mobile/profile/language?id_employee=${idEmployee}`,
    data
  );
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const editLanguage = async (data) => {
  var res = await api.put(`${endpoint}/mobile/profile/language`, data);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const deleteLanguage = async (data) => {
  var res = await api.delete(`${endpoint}/mobile/profile/language?id=${data}`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const getLincense = async (idEmployee) => {
  var res = await api.get(
    `${endpoint}/mobile/profile/license?id_employee=${idEmployee}`
  );
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const addLincense = async (data, idEmployee) => {
  var res = await api.post(
    `${endpoint}/mobile/profile/license?id_employee=${idEmployee}`,
    data
  );
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};
const updateLincense = async (data) => {
  var res = await api.put(`${endpoint}/mobile/profile/license`, data);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};
const deleteLicense = async (data) => {
  var res = await api.delete(`${endpoint}/mobile/profile/license?id=${data}`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const getJob = async (idEmployee) => {
  var res = await api.get(
    `${endpoint}/mobile/profile/job?id_employee=${idEmployee}`
  );
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const updateJob = async (data, idEmployee) => {
  var res = await api.put(
    `${endpoint}/mobile/profile/job?id_employee=${idEmployee}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const getImigration = async (idEmployee) => {
  var res = await api.get(
    `${endpoint}/mobile/profile/immigration?id_employee=${idEmployee}`
  );
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};
const addImigration = async (data, idEmployee) => {
  var res = await api.post(
    `${endpoint}/addImmigration?id_employee=${idEmployee}`,
    data
  );
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};
const updateImigration = async (data) => {
  var res = await api.put(`${endpoint}/mobile/profile/immigration`, data);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};
const deleteImigration = async (data) => {
  var res = await api.delete(
    `${endpoint}/mobile/profile/immigration?id=${data}`
  );
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const getReport = async (idEmployee) => {
  var res = await api.get(`${endpoint}/getReportTo?id_employee=${idEmployee}`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const addReportTo = async (data, idEmployee) => {
  var res = await api.post(
    `${endpoint}/addReportTo?id_employee=${idEmployee}`,
    data
  );
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const editReportTo = async (data, idEmployee) => {
  var res = await api.post(
    `${endpoint}/updateReportTo?id_employee=${idEmployee}`,
    data
  );
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const deleteReportTo = async (data) => {
  console.log(data);
  var res = await api.get(`${endpoint}/deleteReportTo?id=${data}`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const updatePersonalDetail = async (request) => {
  var res = await api.post(`${endpoint}/updatePersonalDetail`, request);
  if (res.status == 200) {
    return res.data;
  }
};
const updateContactDetail = async (request) => {
  var res = await api.post(`${endpoint}/updateContactDetail`, request);
  if (res.status == 200) {
    return res.data;
  }
};
export {
  updatePersonalDetail,
  updateContactDetail,
  getProfile,
  updateProfile,
  getEmergencyContact,
  addEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact,
  getDependents,
  addDependent,
  updateDependent,
  deleteDependent,
  getWorkExperience,
  getSkill,
  updateSkill,
  getEducation,
  getLanguage,
  getLincense,
  addWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
  addEducation,
  updateEducation,
  addLincense,
  updateLincense,
  addSkill,
  addLanguage,
  editLanguage,
  getJob,
  updateJob,
  getImigration,
  addImigration,
  updateImigration,
  deleteImigration,
  deleteSkill,
  deleteEducation,
  deleteLanguage,
  deleteLicense,
  getReport,
  addReportTo,
  editReportTo,
  deleteReportTo,
  getCountry
};
