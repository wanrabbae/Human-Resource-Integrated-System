import axios from "axios";
import { endpoint } from "../Utils/constant";

var GetDoc = async () => {
  var res = await axios.get(`${endpoint}/getDocument`);
  if (res.status == 200) {
    return res.data;
  }
};
var GetDetailDoc = async (id) => {
  var res = await axios.get(`${endpoint}/getDocument?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

var AddDocument = async (data) => {
  var res = await axios.post(`${endpoint}/addDocument`, data);
  return res.data;
};

var UpdateDocument = async (data) => {
  var res = await axios.post(`${endpoint}/updateDocument`, data);
  return res.data;
};

var DeleteDocument = async (data) => {
  var res = await axios.get(`${endpoint}/deleteDocument?id=${data}`);
  return res.data;
};

var AddDetailDocument = async (data) => {
  var res = await axios.post(`${endpoint}/addDocumentDetail`, data);
  return res.data;
};

var UpdateDetailDocument = async (data) => {
  var res = await axios.post(`${endpoint}/updateDocumentDetail`, data);
  return res.data;
};

var AddFieldDocument = async (data) => {
  var res = await axios.post(`${endpoint}/addFieldDocument`, data);
  return res.data;
};

var UpdateFieldDocument = async (data) => {
  var res = await axios.post(`${endpoint}/updateFieldDocument`, data);
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
