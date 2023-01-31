import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  updateContactDetail,
  getProfile,
  getCountry,
} from "../../../../Repository/ProfileEmployeeRepository";
import { SwalSuccess } from "../../../../Components/Modals";
import { getProvince } from "../../../../Repository/AdminRepository";

function ContactDetail({ data }) {
  const provinces = ["Jawa Tengah", "Jawa Barat", "Jawa Timur", "DKI Jakarta"];
  // const countries = ["Indonesia", "Malaysia", "Arab", "Jepang", "Korea"];

  const [street, setStreet] = useState([]);
  const [city, setCity] = useState([]);
  const [province, setProvince] = useState([]);
  const [postalCode, setPostalCode] = useState([]);
  const [country, setCountry] = useState([]);
  const [countries, setCountries] = useState([]);
  const [prov, setProv] = useState([]);
  const [phone, setPhone] = useState([]);
  const [mPhone, setMPhone] = useState([]);
  const [email, setEmail] = useState([]);
  const [otherEmail, setOtherEmail] = useState([]);

  const location = useLocation();
  const idEmployee = location.state.id;

  const inAwait = async () => {
    var dataProfile = await getProfile(idEmployee);
    setStreet(dataProfile.result?.street);
    setCity(dataProfile.result?.city);
    setProvince(dataProfile.result?.province);
    setPostalCode(dataProfile.result?.postalCode);
    setCountry(dataProfile.result?.country);
    setPhone(dataProfile.result?.phone);
    setMPhone(dataProfile.result?.mobilePhone);
    setEmail(dataProfile.result?.email);
    setOtherEmail(dataProfile.result?.otherEmail);
    var con = await getCountry();
    setCountries(con["countries"]);
    var provin = await getProvince();
    setProv(provin["provinsi"]);
  };

  useEffect(() => {
    inAwait();
  }, []);
  const postData = async (e) => {
    e.preventDefault();

    var requestBody = {
      id: idEmployee,
      street: street ?? null,
      city: city ?? null,
      province: province ?? null,
      postalCode: postalCode ?? null,
      country: country ?? null,
      phone: phone ?? null,
      mobilePhone: mPhone ?? null,
      email: email ?? null,
      otherEmail: otherEmail ?? null,
    };

    var res = await updateContactDetail(requestBody);
    if (res?.message == "success") {
      SwalSuccess({ message: "Success update contact detail employee" });
    }
    inAwait();
  };
  return (
    <>
      <div>
        <div className="mb-4">
          <span style={{ fontWeight: "600" }}>Contact Detail</span>
        </div>
        <form onSubmit={(e) => postData(e)}>
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Street <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Street"
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                City <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                // value="Banyumas"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
              />
            </div>
          </div>
          <hr style={{ backgroundColor: "#CACACA" }} className="mb-4"></hr>
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="province"
              >
                Province
              </label>
              <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                onChange={(e) => setProvince(e.target.value)}
              >
                <option className="py-3" value={province} hidden>
                  {province != null ? province : "Select Provinces"}
                </option>
                {
                  prov.map((val) => {
                    return(
                      <option selected={province == val.nama ? true : false} value={val.nama}>
                        {val.nama}
                      </option>
                    )
                  })
                }
                {/* <option className="py-3" selected>
                  Jawa Tengah
                </option>
                <option className="py-3">Jawa Barat</option>
                <option className="py-3">Jawa Timut</option>
                <option className="py-3">DKI Jakarta</option> */}
              </select>
            </div>
            <div className="col-3">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Zip/ Postal Code
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                type="text"
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Country
              </label>
              <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                onChange={(e) => setCountry(e.target.value)}
              >
                <option className="py-3" hidden>
                  {"Select Country"}
                </option>
                {
                  countries.map((val) => {
                    return(
                      <option selected={country == val.name ? true : false} value={val.name}>
                        {val.name}
                      </option>
                    )
                  })
                }
                {/* {countries.map((val) => (
                  <option
                    className="py-3"
                    value={val}
                    selected={val == country ? true : false}
                  >
                    {val}
                  </option>
                ))} */}
              </select>
            </div>
          </div>
          <hr style={{ backgroundColor: "#CACACA" }} className="mb-4"></hr>
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Telephone
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="ex: (123) 445566"
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Mobile
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                placeholder="ex : 0812xxxxxxxx"
                id="username"
                type="text"
                value={mPhone}
                onChange={(e) => setMPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Email
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="email"
                type="text"
                placeholder="ex : vinahaha@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Other Email
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                placeholder="another email"
                id="username"
                type="text"
                value={otherEmail}
                onChange={(e) => setOtherEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end mt-4">
            <input
              type="submit"
              value="submit"
              className="btn"
              style={{
                border: "none",
                fontSize: "14px",
                backgroundColor: "#0E5073",
                color: "#FFFFFF",
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
}
export default ContactDetail;
