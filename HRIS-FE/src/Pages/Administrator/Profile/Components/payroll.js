import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import Select from "react-select";
import {
  getCompanyLocation,
  GetJobLevel,
  GetJobPosition,
  GetJobTittle,
} from "../../../../Repository/AdminRepository";
import {
  getTerminateEmployee,
  GetTermReason,
  terminateEmployee,
} from "../../../../Repository/EmployeeRepository";
import {
  getJob,
  updateJob,
} from "../../../../Repository/ProfileEmployeeRepository";
import { SwalError, SwalSuccess } from "../../../../Components/Modals";
import { DeleteOutline } from "@mui/icons-material";

function Payroll({ idEmployee }) {
  // const [modal, setModal] = useState(false);
  // const [ContractDetail, setContractDetail] = useState(false);
  // const [job, setJob] = useState([]);

  // const [contractStart, setContractStart] = useState([]);
  // const [contractEnd, setContractEnd] = useState([]);
  // const [contractFile, setContractFile] = useState([]);
  // const [jobLevel, setJobLevel] = useState([]);
  // const [jobTitle, setJobTitle] = useState([]);
  // const [jobPost, setJobPost] = useState([]);
  // const [location, setLocation] = useState([]);
  // const [jobLevelId, setJobLevelId] = useState([]);
  // const [jobTitleId, setJobTitleId] = useState([]);
  // const [jobPostId, setJobPostId] = useState([]);
  // const [locationName, setLocationName] = useState([]);
  // const [terminate, setTerminate] = useState({});
  // const [reason, setReason] = useState([]);

  const inAwait = async () => {
    var data = await getJob(idEmployee);
    console.log(data);
  };

  useEffect(() => {
    inAwait();
  }, []);

  return (
    <>
      <div>
        <div className="mb-4 border-b pb-4">
          <h2 className="text-xl font-bold">Payroll</h2>
        </div>
        <div className="space-y-3 border-b py-3">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Payroll Info</h3>
            <p className="text-xs font-light">Payroll info for this employee</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="">
              <label className="block text-gray-700 text-sm mb-2">
                PTKP Status
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 bg-gray-50 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="text"
                value="TK 0"
                disabled
              />
            </div>
            <div className="">
              <label className="block text-gray-700 text-sm mb-2">
                Salary Type
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 bg-gray-50 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="text"
                value="Monthly"
                disabled
              />
            </div>
            <div className="">
              <label className="block text-gray-700 text-sm mb-2">
                Prorate
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 bg-gray-50 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="text"
                value="Based on Working Day"
                disabled
              />
            </div>
            <div className="">
              <label className="block text-gray-700 text-sm mb-2">
                NPP BPJS Ketenagakerjaan
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 bg-gray-50 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="text"
                value="Default"
                disabled
              />
            </div>
            <div className="">
              <label className="block text-gray-700 text-sm mb-2">
                Tax Configuration
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 bg-gray-50 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="text"
                value="Gross"
                disabled
              />
            </div>
            <div className="">
              <label className="block text-gray-700 text-sm mb-2">
                Salary Tax Configuration
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 bg-gray-50 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="text"
                value="Non Taxable"
                disabled
              />
            </div>
            <div className="">
              <label className="block text-gray-700 text-sm mb-2">
                BPJS Kesehatan
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 bg-gray-50 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="text"
                value="By Employee"
                disabled
              />
            </div>
            <div className="">
              <label className="block text-gray-700 text-sm mb-2">
                BPJS Ketenagakerjaan
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 bg-gray-50 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="text"
                value="By Company"
                disabled
              />
            </div>
            <div className="">
              <label className="block text-gray-700 text-sm mb-2">NPWP</label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 bg-gray-50 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                value="7869-9878X-N0987"
                type="text"
                disabled
              />
            </div>
          </div>
        </div>
        <div className="space-y-3 border-b py-3">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Bank Info</h3>
            <p className="text-xs font-light">Payroll info for this employee</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="">
              <label className="block text-gray-700 text-sm mb-2">
                Bank Name
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 bg-gray-50 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="text"
                value="BCA"
                disabled
              />
            </div>
            <div></div>
            <div className="">
              <label className="block text-gray-700 text-sm mb-2">
                Bank Holder Name
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 bg-gray-50 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="text"
                value="Lalisa"
                disabled
              />
            </div>
            <div className="">
              <label className="block text-gray-700 text-sm mb-2">
                Bank Account Number
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 bg-gray-50 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="text"
                value="53474890"
                disabled
              />
            </div>
          </div>
        </div>
        <div className="space-y-3 py-3">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Payroll</h3>
            <p className="text-xs font-light">Payroll info for this employee</p>
          </div>

          <div className="border rounded-xl">
            <div className="bg-gray-100 p-3 rounded-t-xl">8 Component</div>
            <div className="p-3 space-y-3">
              <div className="flex items-center gap-3">
                <label className="truncate block text-gray-700 text-sm mb-2">
                  Basic Salary
                </label>
                <input
                  className="appearance-none border rounded w-52 py-2 px-3 bg-gray-50 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                  type="text"
                  value="Rp. 10.000"
                  disabled
                />
              </div>
              <div>
                <div className="bg-[#EBF7FF] p-3 rounded">Incomes</div>
                <div className="grid grid-cols-3 items-center gap-2 m-3">
                  <label className="block text-gray-700 text-sm mb-2">
                    Tunjangan Tetap
                  </label>
                  <input
                    className="col-span-2 appearance-none border rounded w-full py-2 px-3 bg-gray-50 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                    type="text"
                    value="Rp. 10.000"
                    disabled
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-2 m-3">
                  <label className="block text-gray-700 text-sm mb-2">
                    Tunjangan Tidak Tetap
                  </label>
                  <input
                    className="col-span-2 appearance-none border rounded w-full py-2 px-3 bg-gray-50 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                    type="text"
                    value="Rp. 10.000"
                    disabled
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-2 m-3">
                  <label className="block text-gray-700 text-sm mb-2">
                    Tunjangan Telekomunikasi
                  </label>
                  <input
                    className="col-span-2 appearance-none border rounded w-full py-2 px-3 bg-gray-50 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                    type="text"
                    value="Rp. 10.000"
                    disabled
                  />
                </div>
              </div>
              <div>
                <div className="bg-[#EBF7FF] p-3 rounded">Deduction</div>
                <div className="grid grid-cols-3 items-center gap-2 m-3">
                  <label className="block text-gray-700 text-sm mb-2">
                    Potongan Koperasi
                  </label>
                  <input
                    className="col-span-2 appearance-none border rounded w-full py-2 px-3 bg-gray-50 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                    type="text"
                    value="Rp. 10.000"
                    disabled
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-2 m-3">
                  <label className="block text-gray-700 text-sm mb-2">
                    Potongan Lain - lain
                  </label>
                  <input
                    className="col-span-2 appearance-none border rounded w-full py-2 px-3 bg-gray-50 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                    type="text"
                    value="Rp. 10.000"
                    disabled
                  />
                </div>
              </div>
              <div>
                <div className="bg-[#EBF7FF] p-3 rounded">Benefit</div>
                <div className="grid grid-cols-3 items-center gap-2 m-3">
                  <label className="block text-gray-700 text-sm mb-2">
                    BPJS Ketenagakerjaan
                  </label>
                  <input
                    className="col-span-2 appearance-none border rounded w-full py-2 px-3 bg-gray-50 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                    type="text"
                    value="Rp. 10.000"
                    disabled
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-2 m-3">
                  <label className="block text-gray-700 text-sm mb-2">
                    BPJS Kesehatan
                  </label>
                  <input
                    className="col-span-2 appearance-none border rounded w-full py-2 px-3 bg-gray-50 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                    type="text"
                    value="Rp. 10.000"
                    disabled
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-2 m-3">
                  <label className="block text-gray-700 text-sm mb-2">
                    Bonus CEO
                  </label>
                  <input
                    className="col-span-2 appearance-none border rounded w-full py-2 px-3 bg-gray-50 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                    type="text"
                    value="Rp. 10.000"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Payroll;
