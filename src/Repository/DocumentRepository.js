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
    users?.role == "admin" ? `/getDocument` : `/mobile/employee/document`
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

export {
  GetDoc,
  GetDetailDoc,
  AddDocument,
  AddDetailDocument,
  AddFieldDocument,
  DeleteDocument,
  UpdateDetailDocument,
  UpdateDocument,
  UpdateFieldDocument,
};
