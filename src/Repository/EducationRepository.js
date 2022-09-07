import axios from "axios";
import { endpoint } from "../Utils/constant";

var GetEducation = async () => {
  var res = await axios.get(`${endpoint}/getEducation`);
  if (res.status == 200) {
    return res.data.result;
  }
};

var AddEducation = async (requestBody) => {
  var res = await axios.post(`${endpoint}/addEducation`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var EditEducation = async (requestBody) => {
  var res = await axios.post(`${endpoint}/updateEducation`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var DeleteEducation = async (id) => {
  var res = await axios.get(`${endpoint}/deleteEducation?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

export { GetEducation, AddEducation, EditEducation, DeleteEducation };
