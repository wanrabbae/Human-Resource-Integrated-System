import axios from "axios";
import { endpoint } from "../Utils/constant";

var GetNational = async () => {
  var res = await axios.get(`${endpoint}/getNationalities`);
  if (res.status == 200) {
    return res.data;
  }
};

var AddNational = async (data) => {
  var res = await axios.post(`${endpoint}/addNationalities`, { name: data });
  if (res.status == 200) {
    return res.data;
  }
};

var DeleteNational = async (id) => {
  var res = await axios.get(`${endpoint}/deleteNationalities?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

var EditNational = async (data) => {
  var res = await axios.post(`${endpoint}/updateNationalities`, data);
  if (res.status == 200) {
    return res.data;
  }
};

export { GetNational, AddNational, DeleteNational, EditNational };
