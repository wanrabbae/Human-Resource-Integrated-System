import axios from "axios";
import { endpoint } from "../Utils/constant";

var GetUser = async () => {
  var res = await axios.get(`${endpoint}/getUser`);
  if (res.status == 200) {
    return res.data;
  }
};
var GetApplicant = async () => {
  var res = await axios.get(`${endpoint}/getApplicant`);
  if (res.status == 200) {
    return res.data;
  }
};

// JOB

var GetJobTittle = async () => {
  var res = await axios.get(`${endpoint}/getJobTitle`);
  if (res.status == 200) {
    return res.data;
  }
};
var AddJobTittle = async (requestBody) => {
  var res = await axios.post(`${endpoint}/addJobTitle`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};
export { GetUser, GetApplicant, GetJobTittle, AddJobTittle };
