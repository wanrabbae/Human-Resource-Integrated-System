import axios from "axios";
import { endpoint } from "../Utils/constant";

var AddRecruitment = async (requestBody) => {
    var res = await axios.post(`${endpoint}/addRecruitment`, requestBody);
    if (res.status == 200) {
        return res.data;
    }
}

var GetRecruitment = async () => {
    var res = await axios.get(`${endpoint}/getRecruitment`);
    if (res.status == 200) {
        return res.data;
    }
}
var GetApplicant = async () => {
    var res = await axios.get(`${endpoint}/getApplicant`);
    if (res.status == 200) {
        return res.data;
    }
}

export { AddRecruitment, GetRecruitment, GetApplicant }
