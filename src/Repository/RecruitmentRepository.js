import axios from "axios";

var AddRecruitment = async (requestBody) => {
    var res = await axios.post("https://hris.afkaaruna.sch.id/addReqruitment", requestBody);
    if (res.status == 200) {
        return res.data;
    }
}

export { AddRecruitment }
