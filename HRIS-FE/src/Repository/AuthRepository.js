import axios from "axios";
import { endpoint } from "../Utils/constant";

var PostLogin = async (requestBody) => {
  var res = await axios.post(`${endpoint}/checkLogin`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

export { PostLogin };
