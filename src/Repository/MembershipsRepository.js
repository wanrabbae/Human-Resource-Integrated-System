import axios from "axios";
import { endpoint } from "../Utils/constant";

var GetMembership = async () => {
  var res = await axios.get(`${endpoint}/getMembership`);
  if (res.status == 200) {
    return res.data.result;
  }
};

var AddMembership = async (requestBody) => {
  var res = await axios.post(`${endpoint}/addMembership`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var EditMembership = async (requestBody) => {
  var res = await axios.post(`${endpoint}/updateMembership`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var DeleteMembership = async (id) => {
  var res = await axios.get(`${endpoint}/deleteMembership?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

export { GetMembership, AddMembership, EditMembership, DeleteMembership };
