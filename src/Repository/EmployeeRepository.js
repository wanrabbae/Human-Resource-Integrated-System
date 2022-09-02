import axios from "axios";
import { endpoint } from "../Utils/constant";

var GetEmployee = async () => {
  var res = await axios.get(`${endpoint}/getEmployee`);
  if (res.data.status == 200) {
    return res.data.result;
  }
};

var GetEmployeeName = async () => {
  var res = await axios.get(`${endpoint}/getEmployeeName`);
  if (res.data.status == 200) {
    return res.data.result;
  }
};

export { GetEmployee, GetEmployeeName };
