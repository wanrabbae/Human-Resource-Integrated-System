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

var GetDoc = async (users) => {
  var res = await api.get(
    users?.role == "admin" || users?.role == "subadmin" || users?.role == "subsdiary" ? `/getDocument` : `/mobile/employee/document`
  );
  if (res.status == 200) {
    return res.data;
  }
};
var GetDetailDoc = async (id) => {
  var res = await api.get(`/getDocument?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

var AddDocument = async (data) => {
  var res = await api.post(`/addDocument`, data);
  return res.data;
};

var UpdateDocument = async (data) => {
  var res = await api.post(`/updateDocument`, data);
  return res.data;
};

var DeleteDocument = async (data) => {
  var res = await api.get(`/deleteDocument?id=${data}`);
  return res.data;
};

var AddDetailDocument = async (data) => {
  var res = await api.post(`/addDocumentDetail`, data);
  return res.data;
};

var UpdateDetailDocument = async (data) => {
  var res = await api.post(`/updateDocumentDetail`, data);
  return res.data;
};

var AddFieldDocument = async (data) => {
  var res = await api.post(`/addFieldDocument`, data);
  return res.data;
};

var UpdateFieldDocument = async (data) => {
  var res = await api.post(`/updateFieldDocument`, data);
  return res.data;
};

var AnswerDoc = async (data) => {
  var res = await api.post("/addAnswer", data);
  return res.data;
};

var GetAnswerByIdDetailDoc = async (id) => {
  var res = await api.get(`/document/answer/${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

var GetDetailDocWithAnswer = async (id, id_employee) => {
  var res = await api.get(`/document/${id}/employee/${id_employee}`);
  if (res.status == 200) {
    return res.data;
  }
};

var AddRespondend = async (data) => {
  var res = await api.post(`/respondents`, data);
  return res.data;
};
var GetRespondend = async (id) => {
  var res = await api.get(`/respondents/all?document_id=${id}`);
  if (res.status == 200) {
    return res?.data?.data;
  }
};
var SearchDocument = async (keyword) => {
  var res = await api.get(`/getDocument?keyword=${keyword}`);
  if (res.status == 200) {
    return res.data.result;
  }
};
var FilterDocument = async (data) => {
  var res = await api.post(`/filterDocument`, data);
  if (res.status == 200) {
    return res.data;
  }
};
export {
  GetAnswerByIdDetailDoc,
  GetDetailDocWithAnswer,
  AnswerDoc,
  GetDoc,
  GetDetailDoc,
  AddDocument,
  AddDetailDocument,
  AddFieldDocument,
  DeleteDocument,
  UpdateDetailDocument,
  UpdateDocument,
  UpdateFieldDocument,
  GetRespondend,
  AddRespondend,
  SearchDocument,
  FilterDocument
};
