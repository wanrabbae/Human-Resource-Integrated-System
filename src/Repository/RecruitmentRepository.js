import axios from "axios";
import { endpoint } from "../Utils/constant";

var AddRecruitment = async (requestBody) => {
  var res = await axios.post(`${endpoint}/addRecruitment`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var RepostRecruitment = async (requestBody) => {
  var res = await axios.post(`${endpoint}/repostRecruitment`, requestBody);
  if (res.status == 200) {
    return res.data;
  }
};

var GetRecruitment = async () => {
  var res = await axios.get(`${endpoint}/getRecruitment`);
  if (res.status == 200) {
    return res.data;
  }
};

const searchData = async (keyword) => {
  var res = await axios.get(
    `https://hris.afkaaruna.sch.id/getRecruitment?keyword=${keyword}`
  );
  if (res.status == 200) {
    return res.data.result;
  }
};

var GetApplicant = async () => {
  var res = await axios.get(`${endpoint}/getApplicant`);
  if (res.status == 200) {
    return res.data;
  }
};

var FilterApplicant = async (data) => {
  var res = await axios.post(`${endpoint}/getApplicantFilter`, data);
  if (res.status == 200) {
    return res.data;
  }
};

var searchApplicant = async (keyword) => {
  var res = await axios.get(`${endpoint}/getApplicant?keyword=${keyword}`);
  if (res.status == 200) {
    return res.data;
  }
};

var GetStage = async (data) => {
  var res;
  if (data != null) {
    res = await axios.get(`${endpoint}/getStage?applicant_id=${data}`);
  } else {
    res = await axios.get(`${endpoint}/getStage`);
  }
  if (res.status == 200) {
    return res.data["result"];
  }
};

var FilterStage = async (data) => {
  var res = await axios.post(`${endpoint}/getStageFilter`, data);
  if (res.status == 200) {
    return res.data;
  }
};

var AddStage = async (requestBody) => {
  var res = await axios.post(`${endpoint}/addStage`, requestBody);
  if (res.status == 200) {
    return res.data["message"];
  }
};

var updateStatusStage = async (requestBody) => {
  var res = await axios.post(`${endpoint}/updateStatusStage`, requestBody);
  if (res.status == 200) {
    return res.data["message"];
  }
};

var UpdateApplicant = async (requestBody) => {
  var res = await axios.post(`${endpoint}/updateStatusApplicant`, requestBody);
  console.log(res.data);
  if (res.status == 200) {
    return res.data;
  }
};

export {
  AddRecruitment,
  RepostRecruitment,
  GetRecruitment,
  GetApplicant,
  FilterApplicant,
  GetStage,
  AddStage,
  updateStatusStage,
  UpdateApplicant,
  searchData,
  searchApplicant,
  FilterStage,
};
