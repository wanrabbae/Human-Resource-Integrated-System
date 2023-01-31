import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { GetNational } from "../../../../Repository/NationalitiesRepository";
import {
  getProfile,
  updateProfile,
} from "../../../../Repository/ProfileRepository";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { SwalSuccess } from "../../../../Components/Modals";

function PersonalDetail({data}) {
  const [nationalities, setNationalities] = useState([]);
  const [selectedNationalities, setSelectedNationalities] = useState([]);
  const [profile, setProfile] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otherId, setOtherId] = useState("");
  const [driverLicence, setDriverLicence] = useState("");
  const [gender, setGender] = useState("");
  const [religion, setReligion] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [licenceExpire, setLicenceExpire] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const inAwait = async () => {
    // console.log(data);
    var national = await GetNational();
    var dataProfile = await getProfile();
    console.log(dataProfile);
    setNationalities(national);
    setProfile(dataProfile.result);
    setFirstName(dataProfile.result.employee?.firstName);
    setLastName(dataProfile.result.employee?.lastName);
    setOtherId(dataProfile.result.employee?.otherId);
    setDriverLicence(dataProfile.result.employee?.driverLicence);
    setGender(dataProfile.result.employee?.gender);
    setReligion(dataProfile.result.employee?.religion);
    setMaritalStatus(dataProfile.result.employee?.maritalStatus);
    setSelectedNationalities(dataProfile.result.employee?.nationality?.id);
    setLicenceExpire(dataProfile.result.employee?.licenceExpire);
    setBirthDate(dataProfile.result.employee?.birthDate);
  };

  useEffect(() => {
    inAwait();
    
  }, []);

  // console.log("nasionalis",nationalities)
  // console.log(firstName);
  // console.log(lastName);
  // console.log(otherId);
  // console.log(driverLicence);
  // console.log(gender);
  // console.log(maritalStatus);
  // console.log(selectedNationalities);
  // console.log(licenceExpire);
  // console.log(birthDate);

  const postData = async () => {
    var requestBody = {
      firstName: firstName,
      otherId: otherId,
      driverLicence: driverLicence,
      licenceExpire: licenceExpire,
      nationality_id: selectedNationalities,
      maritalStatus: maritalStatus,
      birthDate: birthDate,
      gender: gender,
      religion: religion
    };
    console.log(requestBody);
    var res = await updateProfile(requestBody);
    console.log(res);
    inAwait();
    SwalSuccess({ message: "Success Update Personal Detail" });
  };
  return (
    <>
      <div>
        <div className="mb-4">
          <span style={{ fontWeight: "600" }}>Personal Detail</span>
        </div>
        {/* <form onSubmit={postData}> */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" for="fName">
            Employee Full Name <span style={{ color: "#780000" }}>*</span>
          </label>
          <div className="row">
            <div className="col">
              <input
                value={firstName}
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="fName"
                type="text"
                placeholder="Full Name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <hr style={{ backgroundColor: "#CACACA" }} className="mb-4"></hr>
        <div className="row mb-4">
          <div className="col">
            <label className="block text-gray-700 text-sm mb-2" for="username">
            Job Position
            </label>
            <input
              disabled
              value={profile.employee?.position_id}
              // value="010114-0001"
              className=" appearance-none border rounded w-full py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="col">
            <label className="block text-gray-700 text-sm mb-2" for="username">
              Other ID
            </label>
            <input
              // value="3301062408860006"
              value={otherId}
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
              id="username"
              type="text"
              onChange={(e) => {
                setOtherId(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col">
            <label className="block text-gray-700 text-sm mb-2" for="username">
              Driver's License Number
            </label>
            <input
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
              id="username"
              type="text"
              value={driverLicence}
              onChange={(e) => {
                setDriverLicence(e.target.value);
              }}
            />
          </div>
          <div className="col">
            <label className="block text-gray-700 text-sm mb-2" for="username">
              License Expiry Date
            </label>
            <input
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
              id="username"
              type="date"
              value={licenceExpire}
              onChange={(e) => setLicenceExpire(e.target.value)}
            />
          </div>
        </div>
        <hr style={{ backgroundColor: "#CACACA" }} className="mb-4"></hr>
        <div className="row mb-4">
          <div className="col">
            <label className="block text-gray-700 text-sm mb-2" for="national">
              Nationality
            </label>
            <select
              id="national"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
              onChange={(e) => setSelectedNationalities(e.target.value)}
            >
              <option hidden value={selectedNationalities}>
                {selectedNationalities != null
                  ? profile?.employee?.nationality?.name
                  : "Select Marital Status"}
              </option>
              {nationalities.length > 0 ? (
                nationalities.map((national) => (
                  <option className="py-3" value={national.id}>
                    {national.name}
                  </option>
                ))
              ) : null}
            </select>
          </div>
          <div className="col">
            <label className="block text-gray-700 text-sm mb-2" for="martial">
              Marital Status
            </label>
            {/* <Select  options={marital} /> */}
            <select
              id="martial"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
              onChange={(e) => setMaritalStatus(e.target.value)}
            >
              <option hidden value={maritalStatus}>
                {maritalStatus != null
                  ? maritalStatus
                  : "Select Marital Status"}
              </option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
            </select>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col">
            <label className="block text-gray-700 text-sm mb-2" for="username">
              Birth of Date
            </label>
            <input
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
              id="username"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <div className="col">
          <label className="block text-gray-700 text-sm mb-2" for="username">
              Religion
            </label>
            <input
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
              id="username"
              type="input"
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col">
            <label className="block text-gray-700 text-sm mb-2" for="username">
              Gender
            </label>
            <div className="py-2">
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <FormControlLabel
                    value="Perempuan"
                    control={<Radio />}
                    label="Perempuan"
                  />
                  <FormControlLabel
                    value="Laki - Laki"
                    control={<Radio />}
                    label="Laki - Laki"
                  />
                </RadioGroup>
              </FormControl>
            </div>
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
export default PersonalDetail;
