import { useEffect, useState } from "react";
import {
  Plus,
  Eye,
  FileText,
  DotsThreeOutline,
  MagnifyingGlass,
  FunnelSimple,
  DotsThreeOutlineVertical,
  ArrowRight,
} from "phosphor-react";
// import { Button, Modal, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ReactSelect from "react-select";
// import faker from 'faker';
import { components } from "react-select";
import {
  AnswerDoc,
  GetDetailDoc,
  GetDoc,
  GetRespondend,
} from "../../../Repository/DocumentRepository";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SwalError, SwalSuccess } from "../../../Components/Modals";
import { pushNotif } from "../../../Repository/NotifRepository";
import { getProfile } from "../../../Repository/ProfileRepository";
import { getReport } from "../../../Repository/ProfileEmployeeRepository";
import { GetJobPositionWithEmployee } from "../../../Repository/AdminRepository";
import { Box, Button, Dialog, Modal, Table, Typography } from "@mui/material";
import { blue, green, grey, red, teal, yellow } from "@mui/material/colors";
import * as XLSX from "xlsx";
import { Cancel, CheckCircle, Close, ImportExport, KeyboardArrowLeft, KeyboardArrowRight, WatchLater } from "@mui/icons-material";

function DocumentAnswer() {
  const { id } = useParams();
  const [modalDetailApproval, setModalDetailApproval] = useState(false);
  const [editUserData, setEditUserData] = useState();
  const [users, setUsers] = useState({});
  const [employeeLog, setEmployeeLog] = useState({});
  const [reportTo, setReportTo] = useState([]);
  const [Doc, setDoc] = useState([]);
  const [responden, setResponden] = useState([]);
  const [valueAns, setValueAns] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [supervisor, setSupervisor] = useState([]);
  const navigate = useNavigate();
  const inAwait = async () => {
    var empLog = await getProfile();
    var data = JSON.parse(window.localStorage.getItem("users"));
    var rec = await GetDetailDoc(id);
    var res = await GetRespondend(id);
    var report = await getReport(data?.employeeId);
    const getJobPositionWithEmployee = await GetJobPositionWithEmployee(
      empLog.result?.employee?.jobposition?.relation_code
    );
    setUsers(data);
    setReportTo(report.result);
    setSupervisor(getJobPositionWithEmployee.result?.employees);
    setEmployeeLog(empLog.result);
    setDoc(rec["result"]);
    setResponden(res);
    // console.log(res)
  };
  useEffect(() => {
    inAwait();
  }, []);

  const exportExcel = async () => {
    if (responden.length > 0) {
      var wb = XLSX.utils.book_new();
      var data = [];

      await responden.map((app) => {
        data.push({
          "Employee Name": app?.employee?.firstName,
          "Job Position": app?.jobposition?.name,
          "Form Filling Date": app?.date,
          "Form Filling Time": app?.time,
        });
      });

      var ws = XLSX.utils.json_to_sheet(data);

      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

      XLSX.writeFile(wb, "Answer Document.xlsx");
      console.log("Exported excel!");
    } else {
      alert("Data masih kosong");
    }
  };
  
  return (
    <>
      <div className="container-fluid mb-4">
        <div
          className="mt-3 p-4 row rounded-t-lg  flex-wrap space-y-5  "
          style={{ backgroundColor: "white" }}
        >
          <div className="p-0">
            <h1 className="font-bold">Example Document Answer</h1>
            <p className="text-xs text-gray-400">
            Answer List
            </p>
          </div>
          <div className="flex-row justify-start p-3" style={{width:'20%',border:'1px solid #EDEDED',boxShadow:'0px 0px 4px rgba(0, 0, 0, 0.12)',borderRadius:'12px' }}>
            <div >
                <p className="text-xs text-gray-400">Total Respondent</p>
                <h1 className="text-xl font-bold text-[#5C5C5C]">{responden.length}</h1>
            </div>
          </div>
          <div className="d-flex justify-content-between p-0">
            <div className="flex gap-3">
              <button
                style={{
                  borderRadius: "10px",
                  border: "1px solid #CACACA",
                  color: "#003049",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
                className="btn d-flex align-items-center"
                // onClick={() => {
                //   inAwait();
                //   setfilter(true);
                // }}
              >
                <svg
                  className="me-2"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.875 3.9375H13.125M3.0625 7H10.9375M5.6875 10.0625H8.3125"
                    stroke="#003049"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>Filter</p>
              </button>
              <button
                style={{
                  borderRadius: "10px",
                  border: "1px solid #CACACA",
                  color: "#003049",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
                className="btn d-flex align-items-center"
                onClick={() => {
                  exportExcel();
                }}
              ><svg
                width="14"
                height="16"
                viewBox="0 0 14 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.69 10.715C13.652 10.6241 13.5987 10.5404 13.5325 10.4675L11.2825 8.2175C11.1413 8.07627 10.9497 7.99693 10.75 7.99693C10.5503 7.99693 10.3587 8.07627 10.2175 8.2175C10.0763 8.35873 9.99693 8.55027 9.99693 8.75C9.99693 8.94973 10.0763 9.14127 10.2175 9.2825L11.1925 10.25H7C6.80109 10.25 6.61032 10.329 6.46967 10.4697C6.32902 10.6103 6.25 10.8011 6.25 11C6.25 11.1989 6.32902 11.3897 6.46967 11.5303C6.61032 11.671 6.80109 11.75 7 11.75H11.1925L10.2175 12.7175C10.1472 12.7872 10.0914 12.8702 10.0533 12.9616C10.0153 13.053 9.99565 13.151 9.99565 13.25C9.99565 13.349 10.0153 13.447 10.0533 13.5384C10.0914 13.6298 10.1472 13.7128 10.2175 13.7825C10.2872 13.8528 10.3702 13.9086 10.4616 13.9467C10.553 13.9847 10.651 14.0043 10.75 14.0043C10.849 14.0043 10.947 13.9847 11.0384 13.9467C11.1298 13.9086 11.2128 13.8528 11.2825 13.7825L13.5325 11.5325C13.602 11.4621 13.6556 11.3777 13.69 11.285C13.765 11.1024 13.765 10.8976 13.69 10.715ZM8.5 14H2.5C2.30109 14 2.11032 13.921 1.96967 13.7803C1.82902 13.6397 1.75 13.4489 1.75 13.25V2.75C1.75 2.55109 1.82902 2.36032 1.96967 2.21967C2.11032 2.07902 2.30109 2 2.5 2H6.25V4.25C6.25 4.84674 6.48705 5.41903 6.90901 5.84099C7.33097 6.26295 7.90326 6.5 8.5 6.5H11.5C11.6481 6.49926 11.7926 6.45471 11.9154 6.37196C12.0382 6.28921 12.1337 6.17196 12.19 6.035C12.2474 5.89842 12.2631 5.74788 12.2351 5.60239C12.2071 5.4569 12.1366 5.32297 12.0325 5.2175L7.5325 0.7175C7.4705 0.659162 7.39962 0.611061 7.3225 0.575H7.255L7.045 0.5H2.5C1.90326 0.5 1.33097 0.737053 0.90901 1.15901C0.487053 1.58097 0.25 2.15326 0.25 2.75V13.25C0.25 13.8467 0.487053 14.419 0.90901 14.841C1.33097 15.2629 1.90326 15.5 2.5 15.5H8.5C8.69891 15.5 8.88968 15.421 9.03033 15.2803C9.17098 15.1397 9.25 14.9489 9.25 14.75C9.25 14.5511 9.17098 14.3603 9.03033 14.2197C8.88968 14.079 8.69891 14 8.5 14ZM7.75 3.0575L9.6925 5H8.5C8.30109 5 8.11032 4.92098 7.96967 4.78033C7.82902 4.63968 7.75 4.44891 7.75 4.25V3.0575Z"
                  fill="#003049"
                />
              </svg>
                <p>Export</p>
              </button>
            </div>
            <div className="flex-row flex">
              <div
                className="input-group me-3 align-items-center w-auto"
                style={{
                  borderRadius: "10px",
                  border: "1.5px solid #CACACA",
                  backgroundColor: "transparent",
                  color: "#0E5073",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                <div class="input-group-prepend">
                  <span class="transparent ">
                    <MagnifyingGlass
                      size={20}
                      className="mx-2 form-control-feedback"
                      color="#CACACA"
                      weight="bold"
                    />
                  </span>
                </div>
                <input
                  style={{
                    border: "0",
                    outline: "none",
                    backgroundColor: "transparent",
                    color: "#0E5073",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                  // onChange={(val) => {
                  //   search(val.target.value);
                  // }}
                  className="focus:ring-0 focus:ring-offset-0 focus:outline-0"
                  type="search"
                  placeholder=" Search by Employee Name or Employee ID..."
                />
              </div>
              <Link
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#0E5073",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
                className="btn d-flex align-items-center text-white"
                type="button"
                to={`/document-management/detail/${id}/answer/statistic`}
                // onClick={() => answerDoc()}
              >
                <svg className="me-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196 15.021 0 14.55 0 14V7C0 6.45 0.196 5.979 0.588 5.587C0.979333 5.19567 1.45 5 2 5C2.55 5 3.02067 5.19567 3.412 5.587C3.804 5.979 4 6.45 4 7V14C4 14.55 3.804 15.021 3.412 15.413C3.02067 15.8043 2.55 16 2 16ZM8 16C7.45 16 6.97933 15.8043 6.588 15.413C6.196 15.021 6 14.55 6 14V2C6 1.45 6.196 0.979333 6.588 0.588C6.97933 0.196 7.45 0 8 0C8.55 0 9.021 0.196 9.413 0.588C9.80433 0.979333 10 1.45 10 2V14C10 14.55 9.80433 15.021 9.413 15.413C9.021 15.8043 8.55 16 8 16ZM14 16C13.45 16 12.979 15.8043 12.587 15.413C12.1957 15.021 12 14.55 12 14V11C12 10.45 12.1957 9.979 12.587 9.587C12.979 9.19567 13.45 9 14 9C14.55 9 15.021 9.19567 15.413 9.587C15.8043 9.979 16 10.45 16 11V14C16 14.55 15.8043 15.021 15.413 15.413C15.021 15.8043 14.55 16 14 16Z" fill="white"/>
                </svg>
                See Statistic
              </Link>
            </div>
          </div>
          <div className="table-responsive p-0">
            <table
              className="table mt-3 table-borderless"
              style={{ color: "#737373",fontSize:'14px' }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#EBF7FF",
                    fontSize: "14px",
                    writingMode: "horizontal-tb",
                  }}
                >
                  <th className="align-middle " onClick={() => {}}>
                    Employee Name
                    <ImportExport fontSize="2px" />
                  </th>
                  <th
                    className="align-middle "
                    onClick={() => {}}
                  >
                    Job Position <ImportExport fontSize="2px" />
                  </th>
                  <th
                    className="align-middle "
                    onClick={() => {}}
                  >
                    Form Filling Date <ImportExport fontSize="2px" />
                  </th>
                  <th
                    className="align-middle "
                    onClick={() => {}}
                  >
                    Form Filling Time <ImportExport fontSize="2px" />
                  </th>
                  <th
                    className="align-middle "
                    onClick={() => {}}
                  >
                    Approved Leader <ImportExport fontSize="2px" />
                  </th>
                  <th className="align-middle pe-5" onClick={() => {}}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  responden.length > 0 ? (
                    responden.map((val) => {
                        // console.log(val)
                      return (
                        <tr>
                          <td className="align-middle">
                          {val?.employee?.firstName}
                          </td>
                          <td className="align-middle">
                          {val?.jobposition?.name}
                          </td>
                          <td className="align-middle">
                          {val.date}
                          </td>
                          <td className="align-middle">
                          {val.time}
                          </td>
                          <td className="align-middle">
                            <div className="flex flex-col justify-center align-items-center align-middle gap-1 items-center">
                              <CheckCircle sx={{ color: teal[500] }} />
                              <p
                                onClick={() => setModalDetailApproval(true)}
                                className="text-xs text-gray-700 underline hover:text-black cursor-pointer"
                              >
                                Detail
                              </p>
                            </div>
                          </td>
                          <td className="align-middle">
                            <Link
                            className="btn bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                              to={`/document-management/detail/${id}/answer/employee/${val.employeeId}`}
                            >
                              <Eye
                                color="#003049"
                                weight="bold"
                                className="h-4 w-4"
                                aria-hidden="true"
                              />
                            </Link>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                  <td colSpan={5}>
                    <div className="d-flex justify-content-center align-middle text-center">
                      No Data
                    </div>
                  </td>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="mt-0 p-4 row  rounded-b-lg "
          style={{ backgroundColor: "#FBFBFB" }}
        >
          <div className="d-flex align-items-center justify-content-between">

              <div>
                  <h6 className="text-[#A098AE] text-[10px]">
                  Showing 1-5 from 100 data
                    {/* Showing <span className="text-[#0E5073]">{employees?.length}</span>{" "}
                    from <span className="text-[#0E5073]">{totalItems}</span> data */}
                  </h6>
                </div>
                <div>
                  <button 
                    className="btn btn-sm" 
                    // onClick={() => previousPage()}
                  >
                    <KeyboardArrowLeft />
                  </button>
                  <button className="btn mx-2 bg-[#78000010] rounded-md text-[#780000]">
                    1
                  </button>
                  <button className="btn bg-[#780000] rounded-md text-[#FFFFFF]">
                    2
                  </button>
                  {/* {allPages.map((page) => (
                    <button
                      onClick={() => changePage(page)}
                      className="btn mx-2 bg-[#78000010] text-[10px] rounded-md text-[#780000]"
                    >
                      {page}
                    </button>
                  ))} */}
                  <button 
                    className="btn btn-sm" 
                    // onClick={() => nextPage()}
                  >
                  <KeyboardArrowRight/>
                  </button>
                </div>
            </div>
          </div>
      </div>
      <Modal
        open={modalDetailApproval}
        onClose={() => setModalDetailApproval(false)}
      >
        <Dialog
          open={modalDetailApproval}
          onClose={() => setModalDetailApproval(false)}
          scroll="body"
          fullWidth={true}
          maxWidth="sm"
        >
          <div className="m-5">
            <div className="flex justify-between mb-5">
              <h3 className="font-semibold text-xl">Detail Approval</h3>
              <button onClick={() => setModalDetailApproval(false)}>
                <Close />
              </button>
            </div>
            <div className="space-y-3">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs bg-[#EBF7FF] text-gray-700 uppercase dark:text-gray-400">
                  <tr className="capitalize">
                    <th className="py-3 px-3">Leader Name</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-3">Abdan Syakuro</td>
                    <td className="py-2 px-3">
                      <CheckCircle sx={{ color: teal[500] }} />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">Abdan Syakuro</td>
                    <td className="py-2 px-3">
                      <WatchLater
                        sx={{ color: yellow[800] }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">Abdan Syakuro</td>
                    <td className="py-2 px-3">
                      <Cancel sx={{ color: red[800] }} />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-end gap-2 mt-5">
                <button
                  className="bg-[#0E5073] rounded-lg px-4 py-2 text-white"
                  onClick={() => setModalDetailApproval(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </Modal>
    </>
  );
}
export default DocumentAnswer;
