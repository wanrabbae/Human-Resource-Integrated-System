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

var GetStage = async (data) => {
    var res;
    if (data != null) {
        res = await axios.get(`${endpoint}/getStage?applicant_id=${data}`);
    } else {
        res = await axios.get(`${endpoint}/getStage`);
    }
    if (res.status == 200) {
        return res.data['result'];
    }
}

var AddStage = async (requestBody) => {
    var res = await axios.post(`${endpoint}/addStage`, requestBody);
    if (res.status == 200) {
        return res.data['message'];
    }
}

var updateStatusStage = async (requestBody) => {
    var res = await axios.post(`${endpoint}/updateStatusStage`, requestBody);
    if (res.status == 200) {
        console.log(res.data);
        return res.data['message'];
    }
}
export { AddRecruitment, GetRecruitment, GetApplicant, GetStage, AddStage, updateStatusStage }
