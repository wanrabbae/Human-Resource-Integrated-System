import axios from "axios";
import { endpoint } from "../Utils/constant";

var postMaintenance = async (requestBody) => {
  var res = await axios.get(`${endpoint}/maintainance`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

export {
  postMaintenance
};
