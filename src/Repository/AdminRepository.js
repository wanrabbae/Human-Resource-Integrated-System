import axios from "axios";

var GetUser = async () => {
  var res = await axios.get("https://hris.afkaaruna.sch.id/getUser");
  if (res.status == 200) {
    return res.data;
  }
};
var GetApplicant = async () => {
  var res = await axios.get("https://hris.afkaaruna.sch.id/getApplicant");
  if (res.status == 200) {
    return res.data;
  }
};

export { GetUser, GetApplicant };
