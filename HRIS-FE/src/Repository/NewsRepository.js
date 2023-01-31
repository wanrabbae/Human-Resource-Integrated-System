import axios from "axios";
import { endpoint } from "../Utils/constant";

const api = axios.create({
  baseURL: endpoint,
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `${token}`;
  }
  return req;
});

var GetNews = async () => {
  var res = await api.get(`${endpoint}/news/all`);
  if (res.status == 200) {
    return res.data;
  }
};

var GetNewsDetail = async (id) => {
  var res = await api.get(`${endpoint}/news/${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

var DeleteNews = async (id) => {
  var res = await api.delete(`${endpoint}/news/${id}`);
  if (res.status == 200) {
    return res.data;
  }
};

var CreateNews = async (data) => {
  var res = await api.post(`${endpoint}/news`, data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  if (res.status == 200) {
    return res;
  }
};

var UpdateNews = async (id, data) => {
  var res = await api.put(`${endpoint}/news/${id}`, data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  if (res.status == 200) {
    return res;
  }
};

export { GetNews, DeleteNews, CreateNews, UpdateNews, GetNewsDetail };
