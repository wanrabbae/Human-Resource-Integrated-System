import axios from "axios";
import { endpoint } from "../Utils/constant";

var GetDashboard = async () => {
  var res = await axios.get(`${endpoint}/getDashboardData`);
  if (res.status == 200) {
    return res.data;
  }
};

export { GetDashboard };
