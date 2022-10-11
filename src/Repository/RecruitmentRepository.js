import axios from "axios";
import { endpoint } from "../Utils/constant";

var AddRecruitment = async (requestBody) => {
  var res = await axios.post(`${endpoint}/addRecruitment`, requestBody);

  return res;
};
var EditRecruitment = async (requestBody) => {
  var res = await axios.post(`${endpoint}/updateRecruitment`, requestBody);
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

var GetRecruitmentById = async (id) => {
  var res = await axios.get(`${endpoint}/getRecruitmentById?id=${id}`);
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

var DeleteRecruitment = async (id) => {
  var res = await axios.get(`${endpoint}/deleteRecruitment?id=${id}`);
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
var GetDetailApplicant = async (id) => {
  var res = await axios.get(`${endpoint}/getApplicant?applicant_id=${id}`);
  if (res.status == 200) {
    return res.data;
  }
};
var GetApplicantArchive = async () => {
  var res = await axios.get(`${endpoint}/getApplicantArchive`);
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

var GetApplicantByDate = async (data) => {
  var res = await axios.post(`${endpoint}/getApplicantByDate`, data);
  if (res.status == 200) {
    return res.data;
  }
};
var GetStageByDate = async (date) => {
  var res = await axios.get(`${endpoint}/getStage?date=${date.date}`);
  if (res.status == 200) {
    return res.data;
  }
};

var searchStage = async (keyword) => {
  var res = await axios.get(`${endpoint}/getStage?keyword=${keyword}`);
  if (res.status == 200) {
    return res.data.result;
  }
};
var searchApplicant = async (keyword) => {
  var res = await axios.get(`${endpoint}/getApplicant?keyword=${keyword}`);
  if (res.status == 200) {
    return res.data;
  }
};
var searchApplicantArchive = async (keyword) => {
  var res = await axios.get(
    `${endpoint}/getApplicantArchive?keyword=${keyword}`
  );
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

var GetStageRange = async (startDate, endDate) => {
  var res = await axios.get(
    `${endpoint}/getStageRange?startDate=${startDate}&endDate=${endDate}`
  );
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

var getNotif = async () => {
  var res = await axios.get(`${endpoint}/getNotif`);
  if (res.status == 200) {
    return res.data;
  }
};

export {
  AddRecruitment,
  DeleteRecruitment,
  RepostRecruitment,
  GetRecruitment,
  GetRecruitmentById,
  GetApplicant,
  FilterApplicant,
  GetStage,
  GetStageRange,
  AddStage,
  updateStatusStage,
  UpdateApplicant,
  searchData,
  searchApplicant,
  FilterStage,
  GetApplicantByDate,
  GetApplicantArchive,
  searchApplicantArchive,
  GetStageByDate,
  searchStage,
  EditRecruitment,
  GetDetailApplicant,
  getNotif,
};
