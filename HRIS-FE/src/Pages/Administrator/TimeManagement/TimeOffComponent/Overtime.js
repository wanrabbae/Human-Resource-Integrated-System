import {
  Add,
  ArrowLeft,
  ArrowRight,
  Cancel,
  CheckCircle,
  Close,
  DeleteOutline,
  EditOutlined,
  FileDownloadOutlined,
  FilterList,
  ImportExport,
  Search,
  Visibility,
  WatchLater,
} from "@mui/icons-material";
import { Box, Button, Dialog, Modal, Table, Typography } from "@mui/material";
import { blue, green, grey, red, teal, yellow } from "@mui/material/colors";
import { borderColor } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { GetEmployeeName } from "../../../../Repository/EmployeeRepository";
import * as XLSX from "xlsx";
import { createOvertime, deleteOvertime, GetDetailOvertime, GetOvertime, updateOvertime } from "../../../../Repository/TimeManagementRepository";
import { ModalDelete } from "../../../../Components/Modals";

function Overtime() {
  const [refreshApi, setRefreshApi] = useState(false);
  const [modalDetailApproval, setModalDetailApproval] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  const [changePassword, setPassword] = useState(false);

  const [employeeNames, setEmployeeNames] = useState([]);
  const [overtime, setOvertime] = useState([]);
  const [dovertime, setDOvertime] = useState([]);
  const [jobPosition, setJobPosition] = useState("");

  const [isDelete, setDelete] = useState(false);
  const [id, setId] = useState([])

  const [employeeId, setEmployeeId] = useState("");
  const [reason, setReason] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [onDate, setOnDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [editEmployeeId, setEditEmployeeId] = useState("");
  const [editEmployeeName, setEditEmployeeName] = useState("");
  const [editJobPosition, setEditJobPosition] = useState("");
  const [editReason, setEditReason] = useState("");
  const [editSubmissionDate, setEditSubmissionDate] = useState("");
  const [editOnDate, setEditOnDate] = useState("");
  const [editStartTime, setEditStartTime] = useState("");
  const [editEndTime, setEditEndTime] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [allPages, setAllPages] = useState([]);

  const inAwait = async () => {
    var data = await GetOvertime();
    setOvertime(data?.data?.requests)
    setTotalItems(data?.data?.totalItems);
    setTotalPage(data?.data?.totalPages);
    var pageList = [];
    for (let i = 1; i <= data?.data?.totalPages; i++) {
      pageList.push(i);
    }
    setAllPages(pageList);
  };

  useEffect(() => {
    inAwait();
    GetEmployeeName().then((response) => {
      setEmployeeNames(response);
      // console.log("ini", response);
    });
    setRefreshApi(false);
  }, [refreshApi]);

  const exportExcel = async () => {
    if (overtime.length > 0) {
      var wb = XLSX.utils.book_new();
      var data = [];

      await overtime.map((app) => {
        data.push({
          "Employee Name": app?.employee?.firstName,
          "Job Position": app?.employee?.jobposition?.name,
          "Overtime Submission Date": app?.overtimeSubmissionDate,
          "Overtime On Date": app?.overtimeOnDate,
          "Start Time": app?.startTime,
          "End Time": app?.endTime,
          "Status": app?.status,
          "Description": app?.description,
        });
      });

      var ws = XLSX.utils.json_to_sheet(data);

      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

      XLSX.writeFile(wb, "Overtime.xlsx");
      console.log("Exported excel!");
    } else {
      alert("Data masih kosong");
    }
  };

  const postData = async (e) => {
    e.preventDefault();
    const form = {
      employeeId: employeeId,
      job_id: jobPosition,
      overtimeSubmissionDate: submissionDate,
      startTime: startTime,
      overtimeOnDate: onDate,
      endTime: endTime,
      description: reason,
    };
    console.log(form);
    await createOvertime(form, id)
      .then((response) => {
        console.log(response);
        setRefreshApi(true);
        setModalAdd(false);
        // SwalSuccess({ message: "Success Add Leave" });
      })
      .catch((e) => {
        console.log("error", e.response);
        // if (e.response) {
        //   setMsg(e.response.data.message);
        // }
      });
  };
  const postDataEdit = async (e) => {
    e.preventDefault();
    const form = {
      employeeId: editEmployeeId,
      job_id: editJobPosition,
      overtimeSubmissionDate: editSubmissionDate,
      startTime: editStartTime,
      overtimeOnDate: editOnDate,
      endTime: editEndTime,
      description: editReason,
    };
    console.log(form);
    await updateOvertime(form, id)
      .then((response) => {
        console.log(response);
        setRefreshApi(true);
        setModalEdit(false);
        // SwalSuccess({ message: "Success Add Leave" });
      })
      .catch((e) => {
        console.log("error", e.response);
        // if (e.response) {
        //   setMsg(e.response.data.message);
        // }
      });
  };

  const deleteData = async () => {
    await deleteOvertime(id)
      .then((response) => {
        console.log(response);
        setRefreshApi(true);
      })
      .catch((e) => {
        console.log(e.response);
        // if (e.response) {
        //   setMsg(e.response.data.message);
        // }
      });
  };

  return (
    <div className="bg-white p-5 rounded-lg">
      <h5>
        <b>Overtime</b>
      </h5>
      <p>
        <small>List of Overtime</small>
      </p>
      <br></br>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div>
            <input
              type="date"
              className="bg-gray-100 border border-none text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            //   onClick={() => inAwait()}
            //   onChange={async (e) => {
            //     console.log(e.target.value);
            //     const res = await GetAttendanceByDate(e.target.value);
            //     console.log(res);
            //     setDataAttendance(res);
            //   }}
            />
          </div>
          <button
            className="flex gap-2 items-center px-3 py-2 text-gray-700 border border-gray-100 rounded-lg hover:bg-gray-300"
            onClick={() => {
              exportExcel();
            }}
          >
            <svg
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
        <div className="flex gap-2">
          <div className="flex items-center py-2 px-1 justify-between border border-2 border-gray-300 rounded-lg">
            <Search className="mx-2 text-gray-400" />

            <input
              className="mr-2 bg-transparent focus:outline-none focus:ring-none focus:ring-none"
              // onChange={(e) => searchUser(e.target.value)}
              placeholder="Search"
            />
          </div>
          <Button
            onClick={() => setModalAdd(true)}
            style={{
              color: "#FFFFFF",
              borderRadius: "7px",
              backgroundColor: "#0E5073",
            }}
            variant="outline"
            startIcon={<Add />}
          >
            Add Overtime
          </Button>
        </div>
      </div>
      <br></br>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs bg-[#EBF7FF] text-gray-700 uppercase dark:text-gray-400">
            <tr className="capitalize">
              <th className="py-3 px-6">Employee Name</th>
              <th className="py-3 px-6">Job Position</th>
              <th className="py-3 px-6">Overtime on Date</th>
              <th className="py-3 px-6">Start Time</th>
              <th className="py-3 px-6">End Time</th>
              <th className="py-3 px-6 text-center">Approved Leader</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              overtime.length > 0 ? (
                overtime.map((x, index) => (
                  <tr key={index}>
                    <td className="py-2 px-6">{x?.employee?.firstName}</td>
                    <td className="py-2 px-6">{x?.employee?.jobposition?.name}</td>
                    <td className="py-2 px-6">{x.overtimeOnDate}</td>
                    <td className="py-2 px-6">{x.startTime}</td>
                    <td className="py-2 px-6">{x.endTime}</td>
                    <td className="py-2 px-6">
                      <div className="flex flex-col items-center gap-1">
                        {x.status == "approved" ? (
                          <>
                            <CheckCircle sx={{ color: teal[500] }} />
                            {/* <p
                              onClick={() => setModalDetailApproval(true)}
                              className="text-xs text-gray-700 underline hover:text-black cursor-pointer"
                            >
                              {x.status}
                            </p> */}
                          </>
                        ) : "pending" ? (
                          <>
                            <WatchLater sx={{ color: yellow[700] }} />
                            {/* <p
                              onClick={() => setModalDetailApproval(true)}
                              className="text-xs text-gray-700 underline hover:text-black cursor-pointer"
                            >
                              {x.status}
                            </p> */}
                          </>
                          // <CancelIcon sx={{ color: red[700] }} />
                        ) : (
                          <>
                            <Cancel sx={{ color: red[800] }} />
                            {/* <p
                              onClick={() => setModalDetailApproval(true)}
                              className="text-xs text-gray-700 underline hover:text-black cursor-pointer"
                            >
                              {x.status}
                            </p> */}
                          </>
                        )
                        }

                      </div>
                    </td>
                    <td className="py-2 px-6">
                      <div className="flex flex-row gap-3">
                        <button
                          className="bg-blue-100 hover:bg-blue-200 p-2 rounded-lg"
                          onClick={async () => {
                            setModalDetail(true)
                            var detdata = await GetDetailOvertime(x.id);
                            setDOvertime(detdata.data);
                            console.log(detdata)
                          }}
                        >
                          <Visibility style={{ color: "#003049" }} fontSize="small" />
                        </button>
                        <button
                          className="bg-blue-100 hover:bg-blue-200 p-2 rounded-lg"
                          onClick={() => {
                            setId(x.id);
                            setEditEmployeeId(x.employeeId);
                            setEditEmployeeName(x.employee.firstName);
                            setEditJobPosition(x.job_id);
                            setEditSubmissionDate(x.overtimeSubmissionDate)
                            setEditOnDate(x.overtimeOnDate)
                            setEditStartTime(x.startTime)
                            setEditEndTime(x.endTime)
                            setEditReason(x.description)
                            setModalEdit(true);
                          }}
                        >
                          <EditOutlined
                            style={{ color: "#003049" }}
                            fontSize="small"
                          />
                        </button>
                        <a
                          href="#"
                          className="bg-blue-100 hover:bg-blue-200 p-2 rounded-lg"
                          onClick={() => {
                            setId(x.id);
                            setDelete(true);
                          }}
                        >
                          <DeleteOutline
                            style={{ color: "#003049" }}
                            fontSize="small"
                          />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <td colSpan={6}>
                  <div>
                    No Data
                  </div>
                </td>
              )
            }
          </tbody>
        </table>
      </div>
      <div className="bg-[#FBFBFB] mt-0 px-4 py-3 rounded-b-xl flex items-center justify-between ">
        <div>
          <h6 className="text-sm text-[#A098AE]">
            Showing <span className="text-[#0E5073]">50</span> from{" "}
            <span className="text-[#0E5073]">100</span> data
          </h6>
        </div>
        <div>
          <button className="">
            <ArrowLeft />
          </button>
          <button className="bg-[#78000010] px-2 mx-2 rounded-md text-[#780000]">
            1
          </button>
          <button className="bg-[#780000] px-2 mx-2 rounded-md text-[#FFFFFF]">
            2
          </button>
          <button className="bg-[#78000010] px-2 mx-2 rounded-md text-[#780000]">
            3
          </button>
          <button className="">
            <ArrowRight />
          </button>
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
                        fontSize="large"
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
      <Modal open={modalAdd} onClose={() => setModalAdd(false)}>
        <Dialog
          open={modalAdd}
          onClose={() => setModalAdd(false)}
          scroll="body"
          fullWidth={true}
          maxWidth="sm"
        >
          <div className="m-5">
            <div className="flex justify-between mb-5">
              <h3 className="font-semibold text-xl">Add Permission</h3>
              <button onClick={() => setModalAdd(false)}>
                <Close />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Employee Name
                </label>
                <Select
                  required
                  id="selectedEmployee"
                  isLoading={true}
                  onChange={(e) => {
                    setEmployeeId(e.value);
                    setJobPosition(e.jobposition_id);
                  }}
                  isFocused="appearance-none border-0 outline-0"
                  className="appearance-none"
                  classNamePrefix="appearance-none active:outline-0 active:border-0 focus:outline-0 focus:border-0 focus:shadow-outline"
                  options={employeeNames.map((val) => {
                    return {
                      value: val.id,
                      label: val.firstName,
                      jobposition_id: val.jobposition_id,
                    };
                  })}
                // options={employee.map((val)=>
                //   {return{
                //     value: val.id,
                //     label: val.firstName,
                //   jobposition_id:val.jobposition_id};
                //   })}
                />
              </div>
              {/* <div>
                <label
                  htmlFor="jobPosotion"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Job Posotion
                </label>
                <input
                  type="text"
                  id="jobPosotion"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                  placeholder="Auto - fill"
                  value={jobPosition ? jobPosition : ""}
                  readOnly
                />
              </div> */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block mb-2 text-sm text-gray-600">
                    Overtime submission date
                  </label>
                  <input
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                    onChange={(e) => setSubmissionDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm text-gray-600">
                    Overtime on date
                  </label>
                  <input
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                    onChange={(e) => setOnDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block mb-2 text-sm text-gray-600">
                    Start Time
                  </label>
                  <input
                    type="time"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm text-gray-600">
                    End Time
                  </label>
                  <input
                    type="time"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="">
                <label className="block mb-2 text-sm text-gray-600">
                  Description
                </label>
                <textarea
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Overtime Reason ..."
                  rows={4}
                  required
                ></textarea>
              </div>
              <div className="flex justify-end gap-2 mt-5">
                <button
                  className="bg-gray-200 text-[#0E5073] rounded-lg px-4 py-2"
                  onClick={() => setModalAdd(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#0E5073] rounded-lg px-4 py-2 text-white"
                  onClick={postData}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </Modal>
      <Modal open={modalEdit} onClose={() => setModalEdit(false)}>
        <Dialog
          open={modalEdit}
          onClose={() => setModalEdit(false)}
          scroll="body"
          fullWidth={true}
          maxWidth="sm"
        >
          <div className="m-5">
            <div className="flex justify-between mb-5">
              <h3 className="font-semibold text-xl">Add Permission</h3>
              <button onClick={() => setModalEdit(false)}>
                <Close />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Employee Name
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                  placeholder="Auto - fill"
                  value={editEmployeeName}
                  readOnly
                />
              </div>
              {/* <div>
                <label
                  htmlFor="jobPosotion"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Job Posotion
                </label>
                <input
                  type="text"
                  id="jobPosotion"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                  placeholder="Auto - fill"
                  value={editJobPosition}
                  readOnly
                />
              </div> */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block mb-2 text-sm text-gray-600">
                    Overtime submission date
                  </label>
                  <input
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                    value={editSubmissionDate}
                    onChange={(e) => setEditSubmissionDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm text-gray-600">
                    Overtime on date
                  </label>
                  <input
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                    value={editOnDate}
                    onChange={(e) => setEditOnDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block mb-2 text-sm text-gray-600">
                    Start Time
                  </label>
                  <input
                    type="time"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                    value={editStartTime}
                    onChange={(e) => setEditStartTime(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm text-gray-600">
                    End Time
                  </label>
                  <input
                    type="time"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                    value={editEndTime}
                    onChange={(e) => setEditEndTime(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="">
                <label className="block mb-2 text-sm text-gray-600">
                  Description
                </label>
                <textarea
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                  value={editReason}
                  onChange={(e) => setEditReason(e.target.value)}
                  placeholder="Overtime Reason ..."
                  rows={4}
                  required
                ></textarea>
              </div>
              <div className="flex justify-end gap-2 mt-5">
                <button
                  className="bg-gray-200 text-[#0E5073] rounded-lg px-4 py-2"
                  onClick={() => setModalAdd(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#0E5073] rounded-lg px-4 py-2 text-white"
                  onClick={postDataEdit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </Modal>
      <Modal open={modalDetail} onClose={() => setModalDetail(false)}>
        <Dialog
          open={modalDetail}
          onClose={() => setModalDetail(false)}
          scroll="body"
          fullWidth={true}
          maxWidth="md"
        >
          <div className="m-5">
            <div className="flex justify-between mb-5">
              <h3 className="font-semibold text-xl">Detail Permission</h3>
              <button onClick={() => setModalDetail(false)}>
                <Close />
              </button>
            </div>
            <div className="space-y-3">
              <div className="bg-[#F8F8F8] p-3">
                <div className="grid grid-cols-4 gap-2 py-2">
                  <p>Employee Name</p>
                  <p className="col-span-3">: {dovertime?.employee?.firstName}</p>
                </div>
                <div className="grid grid-cols-4 gap-2 py-2">
                  <p>Job Position</p>
                  <p className="col-span-3">: {dovertime?.employee?.jobposition?.name}</p>
                </div>
                <div className="">
                  <div className="grid grid-cols-4 gap-2 py-2">
                    <p>Overtime submission date</p>
                    <p className="col-span-3">:  {dovertime?.overtimeSubmissionDate}</p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-2">
                    <p>overtime on date</p>
                    <p className="col-span-3">:  {dovertime?.overtimeOnDate}</p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-2">
                    <p>Start Time</p>
                    <p className="col-span-3">:  {dovertime?.startTime}</p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-2">
                    <p>End Time</p>
                    <p className="col-span-3">:  {dovertime?.endTime}</p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-2">
                    <p>Description</p>
                    <p className="col-span-3">:  {dovertime?.description}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-5">
                <button
                  className="bg-[#0E5073] rounded-lg px-4 py-2 text-white"
                  onClick={() => setModalDetail(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </Modal>
      <ModalDelete
        close={() => {
          setDelete(false);
        }}
        submit={() => {
          deleteData(id);
          // inAwait();
          setDelete(false);
        }}
        active={isDelete}
      />
    </div>
  );
}

export default Overtime;
