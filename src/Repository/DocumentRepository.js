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

export { GetDoc,GetDetailDoc };
