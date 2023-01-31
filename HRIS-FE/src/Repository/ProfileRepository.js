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
// const api2 = axios.create({
//   baseURL: endpoint,
// });

// api2.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     req.headers.Authorization = `${token}`;
//     req.headers.ContentType = `multipart/form-data`;
//   }
//   return req;
// });

const getProfile = async () => {
  var res = await api.get(`/getProfile`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const getEmergencyContact = async () => {
  var res = await api.get(`/mobile/profile/emergencyContact`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const addEmergencyContact = async (data) => {
  var res = await api.post(`/addEmergencyContact`, data);
  if (res.status == 200) {
    return res.data;
  }
};
const updateProfilePicture = async (reqbody) => {
  var res = await api.post(`/updateProfilePhoto`, reqbody, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.status == 200) {
    return res.data;
  }
};
const updateEmergencyContact = async (data) => {
  var res = await api.put(`/mobile/profile/emergencyContact`, data);
  if (res.status == 200) {
    return res.data;
  }
};
const deleteEmergencyContact = async (id) => {
  var res = await api.delete(`/mobile/profile/emergencyContact?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

const getDependents = async () => {
  var res = await api.get(`/mobile/profile/dependent`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const addDependent = async (data) => {
  var res = await api.post(`/addDependent`, data);
  if (res.status == 200) {
    return res.data;
  }
};
const updateDependent = async (data) => {
  var res = await api.put(`/mobile/profile/dependent`, data);
  if (res.status == 200) {
    return res.data;
  }
};
const deleteDependent = async (id) => {
  var res = await api.delete(`/mobile/profile/dependent?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

const updateProfile = async (data) => {
  var res = await api.post(`/updateProfile`, data);
  if (res.status == 200) {
    return res.data;
  }
};

const getWorkExperience = async () => {
  var res = await api.get(`/mobile/profile/experience`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};
const addWorkExperience = async (data) => {
  var res = await api.post(`/mobile/profile/experience`, data);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};
const updateWorkExperience = async (data) => {
  var res = await api.put(`/mobile/profile/experience`, data);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};
const deleteWorkExperience = async (data) => {
  var res = await api.delete(`/mobile/profile/experience?id=${data}`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const getSkill = async () => {
  var res = await api.get(`/mobile/profile/skill`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const addSkill = async (data) => {
  var res = await api.post(`/mobile/profile/skill`, data);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const updateSkill = async (data) => {
  var res = await api.put(`/mobile/profile/skill`, data);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const deleteSkill = async (data) => {
  var res = await api.delete(`/mobile/profile/skill?id=${data}`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const getEducation = async (data) => {
  var res = await api.get(`/mobile/profile/education`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const addEducation = async (data) => {
  var res = await api.post(`/mobile/profile/education`, data);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const updateEducation = async (data) => {
  var res = await api.put(`/mobile/profile/education`, data);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const deleteEducation = async (data) => {
  var res = await api.delete(`/mobile/profile/education?id=${data}`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const getLanguage = async () => {
  var res = await api.get(`/mobile/profile/language`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const addLanguage = async (data) => {
  var res = await api.post(`/mobile/profile/language`, data);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const editLanguage = async (data) => {
  var res = await api.put(`/mobile/profile/language`, data);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const deleteLanguage = async (data) => {
  var res = await api.delete(`/mobile/profile/language?id=${data}`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const getLincense = async () => {
  var res = await api.get(`/mobile/profile/license`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const addLincense = async (data) => {
  var res = await api.post(`/mobile/profile/license`, data);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};
const updateLincense = async (data) => {
  var res = await api.put(`/mobile/profile/license`, data);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};
const deleteLicense = async (data) => {
  var res = await api.delete(`/mobile/profile/license?id=${data}`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const getJob = async () => {
  var res = await api.get(`/mobile/profile/job`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const updateJob = async (data) => {
  var res = await api.put(`/mobile/profile/job`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const getImigration = async () => {
  var res = await api.get(`/mobile/profile/immigration`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};
const addImigration = async (data) => {
  var res = await api.post(`/addImmigration`, data);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};
const updateImigration = async (data) => {
  var res = await api.put(`/mobile/profile/immigration`, data);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};
const deleteImigration = async (data) => {
  var res = await api.delete(`/mobile/profile/immigration?id=${data}`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const getReport = async () => {
  var res = await api.get(`/getReportTo`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const addReportTo = async (data) => {
  var res = await api.post(`/addReportTo`, data);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const editReportTo = async (data) => {
  var res = await api.post(`/updateReportTo`, data);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const deleteReportTo = async (data) => {
  console.log(data);
  var res = await api.get(`/deleteReportTo?id=${data}`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const getFile = async () => {
  var res = await api.get(`/mobile/employee/file`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};

const addFile = async (data) => {
  var res = await api.post(`/mobile/employee/file`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};
const deleteFile = async (data) => {
  console.log(data);
  var res = await api.delete(`/mobile/employee/file?id=${data}`);
  if (res.status == 200) {
    return res.data;
  } else {
    return res;
  }
};
export {
  updateProfilePicture,
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
  getFile,addFile,deleteFile
};
