import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { GetNational } from "../../../../Repository/NationalitiesRepository";

function PersonalDetail({ data }) {
  const [nationalities, setNationalities] = useState([]);
  const marital = [
    { value: "single", label: "Single" },
    { value: "mariied", label: "Married" },
  ];

  const inAwait = async () => {
    var data = await GetNational();
    setNationalities(data);
  };

  useEffect(() => {
    inAwait();
  }, []);

  return (
    <>
      <div>
        <div className="mb-4">
          <span style={{ fontWeight: "600" }}>Personal Detail</span>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2" for="username">
              Employee Full Name <span style={{ color: "#780000" }}>*</span>
            </label>
            <div className="row">
              <div className="col">
                <input
                  value={data?.employee?.firstName}
                  className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div className="col">
                <input
                  value={data?.employee?.lastName}
                  className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Username"
                />
              </div>
            </div>
          </div>
          <hr style={{ backgroundColor: "#CACACA" }} className="mb-4"></hr>
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Employee ID
              </label>
              <input
                disabled
                value={data?.employee?.id}
                // value="010114-0001"
                className=" appearance-none border rounded w-full py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Other ID
              </label>
              <input
                // value="3301062408860006"
                value={data?.employee?.otherId}
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Driver's License Number
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                License Expiry Date
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="date"
                value={data?.employee?.licenceExpire}
              />
            </div>
          </div>
          <hr style={{ backgroundColor: "#CACACA" }} className="mb-4"></hr>
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="national"
              >
                Nationality
              </label>
              <select
                id="national"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
              >
                <option className="py-3" hidden>
                  Select
                </option>
                {nationalities.length > 0 ? (
                  nationalities.map((national) => (
                    <option
                      className="py-3"
                      selected={
                        data?.employee?.nationality?.name === national.name
                          ? true
                          : false
                      }
                    >
                      {national.name}
                    </option>
                  ))
                ) : (
                  <option className="py-3">Indondesia</option>
                )}
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
              >
                <option className="py-3" hidden>
                  Select
                </option>
                <option
                  className="py-3"
                  selected={
                    data?.employee?.maritalStatus === "Belum Kawin"
                      ? true
                      : false
                  }
                >
                  Single
                </option>
                <option
                  className="py-3"
                  selected={
                    data?.employee?.maritalStatus === "Kawin" ? true : false
                  }
                >
                  Married
                </option>
              </select>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Birth of Date
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="date"
                // value="1985-07-24"
                value={data?.employee?.birthDate}
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Gender
              </label>
              <div className="row py-2">
                <div className="flex items-center col">
                  <input
                    checked={
                      data?.employee?.gender === "Laki - Laki" ? true : false
                    }
                    id="default-radio-1"
                    type="radio"
                    value="Laki - Laki"
                    name="default-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-1"
                    className="ml-2 text-sm text-gray-900 dark:text-gray-300"
                  >
                    Male
                  </label>
                </div>
                <div className="flex items-center col">
                  <input
                    checked={
                      data?.employee?.gender === "Perempuan" ? true : false
                    }
                    id="default-radio-2"
                    type="radio"
                    value="Perempuan"
                    name="default-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-2"
                    className="ml-2 text-sm text-gray-900 dark:text-gray-300"
                  >
                    Female
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-4">
            <Button
              style={{
                border: "none",
                fontSize: "14px",
                backgroundColor: "#0E5073",
                color: "#FFFFFF",
              }}
              className="px-4"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
export default PersonalDetail;
