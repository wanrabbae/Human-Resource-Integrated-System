import axios from "axios";
import { endpoint } from "../Utils/constant";

var GetSchedule = async () => {
  var res = await axios.get(`${endpoint}/getSchedule`);
  if (res.status == 200) {
    return res.data.result;
  }
};

var AddSchedule = async (requestBody) => {
  var res = await axios.post(`${endpoint}/addSchedule`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var EditSchedule = async (requestBody) => {
  var res = await axios.post(`${endpoint}/updateSchedule`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var DeleteSchedule = async (id) => {
  var res = await axios.get(`${endpoint}/deleteSchedule?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

export { GetSchedule, AddSchedule, EditSchedule, DeleteSchedule };
