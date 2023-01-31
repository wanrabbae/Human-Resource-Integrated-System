import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { SwalSuccess } from "../../../../Components/Modals";
import {
  getCityProvince,
  getCountries,
  getProvince,
} from "../../../../Repository/AdminRepository";
import {
  getProfile,
  updateProfile,
} from "../../../../Repository/ProfileRepository";

function ContactDetail() {
  const provinces = ["Jawa Tengah", "Jawa Barat", "Jawa Timur", "DKI Jakarta"];
  // const countries = ["Indonesia", "Malaysia", "Arab", "Jepang", "Korea"];

  const [street, setStreet] = useState([]);
  const [idProvince, setIdProvince] = useState(0);
  const [countries, SetCountries] = useState([]);
  const [prov, setProv] = useState([]);
  const [cprovince, setCityProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [province, setProvince] = useState([]);
  const [postalCode, setPostalCode] = useState([]);
  const [country, setCountry] = useState([]);
  const [phone, setPhone] = useState([]);
  const [mPhone, setMPhone] = useState([]);
  const [email, setEmail] = useState([]);
  const [otherEmail, setOtherEmail] = useState([]);

  const inAwait = async () => {
    var data = await getProfile();
    // console.log(data)
    var pro = await getProvince();
    var con = await getCountries();
    setProv(pro["provinsi"]);
    SetCountries(con);
    setStreet(data.result?.employee?.street);
    setCity(data.result?.employee?.city);
    setProvince(data.result?.employee?.province);
    setPostalCode(data.result?.employee?.postalCode);
    setCountry(data.result?.employee?.country);
    setPhone(data.result?.employee?.phone);
    setMPhone(data.result?.employee?.mobilePhone);
    setEmail(data.result?.employee?.email);
    setOtherEmail(data.result?.employee?.otherEmail);
  };

  useEffect(() => {
    inAwait();
  }, []);
  const postData = async () => {
    var requestBody = {
      street: street,
      city: city,
      province: province,
      postalCode: postalCode,
      country: country,
      phone: phone,
      mobilePhone: mPhone,
      email: email,
      otherEmail: otherEmail,
    };
    console.log(requestBody);
    var res = await updateProfile(requestBody);
    console.log(res);
    inAwait();
    SwalSuccess({ message: "Success Update Contact Detail" });
  };
  // console.log(street);
  // console.log(city);
  // console.log(province);
  // console.log(postalCode);
  // console.log(country);
  // console.log(phone);
  // console.log(mPhone);
  // console.log(email);
  // console.log(otherEmail);
  return (
    <>
      <div>
        <div className="mb-4">
          <span style={{ fontWeight: "600" }}>Contact Detail</span>
        </div>
        {/* <form onSubmit={postData}> */}
        <div className="row mb-4">
          <div className="col">
            <label className="block text-gray-700 text-sm mb-2" for="username">
              Street <span style={{ color: "#780000" }}>*</span>
            </label>
            <input
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
              type="text"
              placeholder="Street"
            />
          </div>
          <div className="col">
            <label className="block text-gray-700 text-sm mb-2" for="username">
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
        </div>
        <hr style={{ backgroundColor: "#CACACA" }} className="mb-4"></hr>
        <div className="row mb-4">
          <div className="col">
            <label className="block text-gray-700 text-sm mb-2" for="username">
              Country
            </label>
            <select
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="py-3" value={country} hidden>
                {country != null ? country : "Select Country"}
              </option>
              {countries.map((val) => (
                <option className="py-3" value={val.name}>
                  {val.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <label className="block text-gray-700 text-sm mb-2" for="username">
              Province
            </label>
            <select
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
              onChange={async (e) => {
                var Cprov = await getCityProvince(e.target.value);
                setIdProvince(e.target.value);
                setCityProvince(Cprov["kota_kabupaten"]);
                setProvince(e.target.value);
              }}
            >
              <option className="py-3" value={province} hidden>
                {province != null ? province : "Select Provinces"}
              </option>
              {prov.map((val) => {
                return <option value={val.id}>{val.nama}</option>;
              })}
              {/* {provinces.map((val) => (
                  <option className="py-3" value={val}>
                    {val}
                  </option>
                ))} */}
              {/* <option className="py-3" selected>
                  Jawa Tengah
                </option>
                <option className="py-3">Jawa Barat</option>
                <option className="py-3">Jawa Timut</option>
                <option className="py-3">DKI Jakarta</option> */}
            </select>
          </div>

          <div className="col">
            <label className="block text-gray-700 text-sm mb-2" for="username">
              City <span style={{ color: "#780000" }}>*</span>
            </label>
            <select
              // value="Banyumas"
              onChange={async (e) => {
                setCity(e.target.value);
              }}
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
            >
              <option className="py-3" value={city} hidden>
                {city != null ? city : "Select City"}
              </option>
              {cprovince.map((val) => {
                return <option value={val.nama}>{val.nama}</option>;
              })}
            </select>
          </div>
        </div>
        <hr style={{ backgroundColor: "#CACACA" }} className="mb-4"></hr>
        <div className="row mb-4">
          <div className="col">
            <label className="block text-gray-700 text-sm mb-2" for="username">
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
            <label className="block text-gray-700 text-sm mb-2" for="username">
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
            <label className="block text-gray-700 text-sm mb-2" for="username">
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
            <label className="block text-gray-700 text-sm mb-2" for="username">
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
          <button
            onClick={postData}
            className="btn"
            style={{
              border: "none",
              fontSize: "14px",
              backgroundColor: "#0E5073",
              color: "#FFFFFF",
            }}
          >
            Submit
          </button>
        </div>
        {/* </form> */}
      </div>
    </>
  );
}
export default ContactDetail;
