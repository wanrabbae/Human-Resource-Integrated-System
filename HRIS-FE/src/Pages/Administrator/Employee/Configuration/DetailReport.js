import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GetReportSingle } from "../../../../Repository/EmployeeRepository";

function DetailReport() {
  const [reports, setReports] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const inAwait = async () => {
    var rec = await GetReportSingle(location.state.id);
    setReports(rec.result);
  };
  useEffect(() => {
    inAwait();
  }, []);
  return (
    <>
      <div className="space-y-5">
        <div className="bg-white p-3 rounded-lg">
          <div>
            <h1 className="font-bold">Personal</h1>
            <div className="mt-4 grid grid-cols-3 gap-3 items-center text-xs">
              <p>Employee Full Name</p>
              <p className="col-span-2">: {reports?.employee?.firstName}</p>
              <p>Employee ID</p>
              <p className="col-span-2">: {reports?.employee?.id}</p>
              <p>Birth of Date</p>
              <p className="col-span-2">: {reports?.employee?.birthDate}</p>
              <p>Gender</p>
              <p className="col-span-2">: {reports?.employee?.gender}</p>
              <p>Nationality</p>
              <p className="col-span-2">
                : {reports?.employee?.nationality?.name}
              </p>
              <p>Drive’s License Number</p>
              <p className="col-span-2">: {reports?.employee?.driverLicence}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg">
          <div>
            <h1 className="font-bold">Contact Details</h1>
            <div className="mt-4 grid grid-cols-3 gap-3 items-center text-xs">
              <p>Address</p>
              <p className="col-span-2">: {reports?.employee?.street}</p>
              <p>Telephone</p>
              <p className="col-span-2">: {reports?.employee?.phone}</p>
              <p>Mobile</p>
              <p className="col-span-2">: {reports?.employee?.mobilePhone}</p>
              <p>Email</p>
              <p className="col-span-2">: {reports?.employee?.email}</p>
              <p>Other Email</p>
              <p className="col-span-2">: {reports?.employee?.otherEmail}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg">
          <div>
            <h1 className="font-bold">Emergency Contact</h1>
            <div className="mt-4 grid grid-cols-3 gap-3 items-center text-xs">
              <p>Name</p>
              <p className="col-span-2">
                : {reports?.employee?.emergencycontacts[0]?.name}
              </p>
              <p>Relationship</p>
              <p className="col-span-2">
                : {reports?.employee?.emergencycontacts[0]?.relationship}
              </p>
              <p>Telephone</p>
              <p className="col-span-2">
                : {reports?.employee?.emergencycontacts[0]?.phone}
              </p>
              <p>Mobile</p>
              <p className="col-span-2">
                : {reports?.employee?.emergencycontacts[0]?.mobilePhone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailReport;
