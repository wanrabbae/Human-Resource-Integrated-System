import axios from "axios";
import { endpoint } from "../Utils/constant";

var GetLanguages = async () => {
  var res = await axios.get(`${endpoint}/getLanguage`);
  console.log(res);
  if (res.status == 200) {
    return res.data.result;
  }
};

var AddLanguages = async (data) => {
  var res = await axios.post(`${endpoint}/addLanguage`, { name: data });
  console.log(res);
  if (res.status == 200) {
    return res.data;
  }
};

var DeleteLanguages = async (id) => {
  var res = await axios.get(`${endpoint}/deleteLanguage?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

var EditLanguages = async (data) => {
  var res = await axios.post(`${endpoint}/updateLanguage`, data);
  if (res.status == 200) {
    return res.data;
  }
};

export { GetLanguages, AddLanguages, DeleteLanguages, EditLanguages };
