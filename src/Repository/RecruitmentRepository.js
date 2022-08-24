import axios from "axios";

var AddRecruitment = async (requestBody) => {
    var res = await axios.post("https://hris.afkaaruna.sch.id/addRecruitment", requestBody);
    if (res.status == 200) {
        return res.data;
    }
}

var GetRecruitment = async () => {
    var res = await axios.get("https://hris.afkaaruna.sch.id/getRecruitment");
    if (res.status == 200) {
        return res.data;
    }
}

export { AddRecruitment, GetRecruitment }
