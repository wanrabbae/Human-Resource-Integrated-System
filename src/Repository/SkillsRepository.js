import axios from "axios";
import { endpoint } from "../Utils/constant";

var GetSkills = async () => {
  var res = await axios.get(`${endpoint}/getSkill`);
  if (res.status == 200) {
    return res.data.result;
  }
};

var AddSkill = async (requestBody) => {
  var res = await axios.post(`${endpoint}/addSkill`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var EditSkill = async (requestBody) => {
  var res = await axios.post(`${endpoint}/updateSkill`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var DeleteSkills = async (id) => {
  var res = await axios.get(`${endpoint}/deleteSkill?id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

export { GetSkills, AddSkill, EditSkill, DeleteSkills };
