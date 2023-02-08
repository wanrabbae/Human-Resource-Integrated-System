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
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Search,
  SettingsSystemDaydreamTwoTone,
  Visibility,
  WatchLater,
} from "@mui/icons-material";
import { Box, Button, Dialog, Modal, Pagination, PaginationItem, Table, Typography } from "@mui/material";
import { blue, green, grey, red, teal, yellow } from "@mui/material/colors";
import { borderColor } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  GetEmployeeName,
  SearchEmployee,
} from "../../../../Repository/EmployeeRepository";
import {
  createLeave,
  deleteLeave,
  GetEmployeeRecord,
  GetLeave,
  GetLeaveType,
  updateLeave,
} from "../../../../Repository/TimeManagementRepository";
import Select from "react-select";
import moment from "moment";
import { ModalDelete, SwalSuccess } from "../../../../Components/Modals";
import { start } from "@popperjs/core";
import * as XLSX from "xlsx";
import { getEmergencyContact } from "../../../../Repository/ProfileEmployeeRepository";

function Leave() {
  const [refreshApi, setRefreshApi] = useState(false);
  const [modalDetailApproval, setModalDetailApproval] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  const [data, setData] = useState([]);
  const [leaveType, setLeaveType] = useState([]);
  const [employeeNames, setEmployeeNames] = useState([]);
  const [jobPosition, setJobPosition] = useState("");
  const [dataEmergency, setDataEmergency] = useState([])

  const [id, setId] = useState("");
  const [detail, setDetail] = useState([]);
  const [edit, setEdit] = useState();

  const [employeeId, setEmployeeId] = useState("");
  const [leaveTypeId, setLeaveTypeId] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [note, setNote] = useState("");
  const [delegetedEmployee, setDelegetedEmployee] = useState("")
  const [delegetedTask, setDelegetedTask] = useState("")
  const [emergencyContact, setEmergencyContact] = useState("")
  const [leaveDuration, setLeaveDuration] = useState("")
  const [remainingDays, setRemainingDays] = useState("")

  const [editEmployeeName, setEditEmployeeName] = useState("");
  const [editEmployeeId, setEditEmployeeId] = useState("");
  const [editJobPositionId, setEditJobPositionId] = useState("");
  const [editLeaveTypeId, setEditLeaveTypeId] = useState("");
  const [editStart, setEditStart] = useState("");
  const [editEnd, setEditEnd] = useState("");
  const [editNote, setEditNote] = useState("");
  const [editDelegetedEmployee, setEditDelegetedEmployee] = useState("")
  const [editDelegetedTask, setEditDelegetedTask] = useState("")
  const [editEmergencyContact, setEditEmergencyContact] = useState("")
  const [editLeaveDuration, setEditLeaveDuration] = useState("")
  const [editRemainingDays, setEditRemainingDays] = useState("")


  var [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [allPages, setAllPages] = useState([]);

<<<<<<< HEAD
=======
  console.log("employee", employeeNames)
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
  useEffect(() => {
    GetLeave({ page: 0, size: 25 }).then((response) => {
      setData(response?.requests);
      console.log('data', response)
      setTotalItems(response?.totalItems)
      // console.log(respons);
      setTotalItems(response?.totalItems);
      setCurrentPage(response?.currentPage);
      setTotalPage(response?.totalPages);
      var pageList = [];
      for (let i = 1; i <= response.totalPages; i++) {
        pageList.push(i);
      }
      setAllPages(pageList);
    });
    GetEmployeeName().then((response) => {
      setEmployeeNames(response);
      // console.log("ini", response);
    });
    GetLeaveType().then((response) => {
      setLeaveType(response.data);
      // console.log(response.data);
    });

    setRefreshApi(false);
  }, [refreshApi]);

  const getEmergency = (id) => {
    getEmergencyContact(id).then((response) => {
      setDataEmergency(response.result);
      console.log("emergency", response.result);
    });
  }
  console.log("data emergency contact", emergencyContact)
  const postData = async (e) => {
    e.preventDefault();
    const form = {
      employeeId: employeeId,
      jobposition_id: jobPosition,
      leave_type_id: leaveTypeId,
      start_date: start,
      end_date: end,
      note: note,
      delegated_to: delegetedEmployee,
      delegated_task: delegetedTask,
      emergencycontact_id: emergencyContact,
      leave_duration: leaveDuration,
      remaining_days: remainingDays
    };
    console.log(form);
    await createLeave(form)
      .then((response) => {
        console.log(response);
        setRefreshApi(true);
        setModalAdd(false);
        SwalSuccess({ message: "Success Add Leave" });
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
      jobposition_id: editJobPositionId,
      leave_type_id: editLeaveTypeId,
      start_date: editStart,
      end_date: editEnd,
      note: editNote,
    };
    // console.log(form);
    await updateLeave(form, id)
      .then((response) => {
        console.log(response);
        setRefreshApi(true);
        setModalEdit(false);
        SwalSuccess({ message: "Success Edit Leave" });
      })
      .catch((e) => {
        console.log("error", e.response);
        // if (e.response) {
        //   setMsg(e.response.data.message);
        // }
      });
  };
  const deleteData = async () => {
    await deleteLeave(id)
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

  const exportExcel = async () => {
    if (data.length > 0) {
      console.log(data);
      var wb = XLSX.utils.book_new();
      var dataExcel = [];

      data.map((app) => {
        dataExcel.push({
          "Employee Name": app?.employee?.firstName,
          "Job Position": app?.jobposition?.name,
          "Start Date": moment(app.start_date).utc().format("YYYY-MM-DD"),
          "End Date": moment(app.end_date).utc().format("YYYY-MM-DD"),
          "Type": app?.leave_type?.name,
        });
      });

      var ws = XLSX.utils.json_to_sheet(dataExcel);

      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

      XLSX.writeFile(wb, "Time Off Leave.xlsx");
      console.log("Exported excel!");
    } else {
      alert("Data masih kosong");
    }
  };

  const changePage = async (value, index) => {
    const dataLeave = await GetLeave({ page: index - 1, size: 25 });
    console.log("data leave", dataLeave)
    setData(dataLeave.requests);
    setTotalItems(dataLeave.totalItems);
    // setTotalPage(dataLeave.totalPages-1);
    currentPage = dataLeave.currentPage;
    var pageList = [];
    for (let i = 1; i <= dataLeave.totalPages; i++) {
      pageList.push(i);
    }
    setAllPages(pageList);
  };

  console.log(totalPage)

  return (
    <div className="bg-white p-5 rounded-lg">
      <h5>
        <b>Leave</b>
      </h5>
      <p>
        <small>List of Leave Employee</small>
      </p>
      <br></br>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
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
          <div>
            <Link
              to="/timeManagement/time-off/leave-setting"
              className="px-3 py-2 text-gray-700 border border-gray-100 rounded-lg hover:bg-gray-300"
            >
              Leave Setting
            </Link>
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
            Add Leave
          </Button>
          <div className="mx-2"></div>
        </div>
      </div>
      <br></br>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs bg-[#EBF7FF] text-gray-700 uppercase dark:text-gray-400">
            <tr className="capitalize">
              <th className="px-6 py-2 truncate">Employee Name</th>
              <th className="px-6 py-2 truncate">Job Position</th>
              <th className="px-6 py-2 truncate">Start Date</th>
              <th className="px-6 py-2 truncate">End Date</th>
              <th className="px-6 py-2 truncate">Type</th>
              {/* <th className="px-6 py-2 truncate">Approved Leader</th> */}
              <th className="px-6 py-2 truncate">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length != 0 ? (
              data.map((val, index) => (
                <tr key={index}>
                  <td className="px-6 py-2 text-sm">
                    {val.employee ? val.employee.firstName : "-"}
                  </td>
                  <td className="px-6 py-2 text-sm">
                    {val.jobposition ? val.jobposition.name : "-"}
                  </td>
                  <td className="px-6 py-2 text-sm">
                    {moment(val.start_date).utc().format("YYYY-MM-DD")}
                  </td>
                  <td className="px-6 py-2 text-sm">
                    {moment(val.end_date).utc().format("YYYY-MM-DD")}
                  </td>
                  <td className="px-6 py-2 text-sm">
                    {val.leave_type ? val.leave_type.name : "-"}
                  </td>
                  {/* <td className="px-6 py-2 text-sm">
                    <div className="flex flex-col gap-1 items-center">
                      {val.status == "pending" ? (
                        <WatchLater sx={{ color: yellow[800] }} />
                      ) : (
                        <CheckCircle sx={{ color: teal[500] }} />
                      )}
                      <p
                        onClick={() => setModalDetailApproval(true)}
                        className="text-xs text-gray-700 underline hover:text-black cursor-pointer"
                      >
                        Detail
                      </p>
                    </div>
                  </td> */}
                  <td className="px-6 py-2 text-sm">
                    <div className="flex flex-row gap-3">
                      <button
                        className="bg-blue-100 hover:bg-blue-200 p-2 rounded-lg"
                        onClick={() => {
                          setModalDetail(true);
                          setDetail({
                            name: val.employee.firstName,
                            jobposition: val.jobposition.name,
                            start_date: val.start_date,
                            end_date: val.end_date,
                            leave_type: val.leave_type.name,
                            note: val.note,
<<<<<<< HEAD
=======
                            remaining_days: val.remaining_days,
                            delegated_employee: val.delegated_employee.firstName,
                            delegated_task: val.delegated_task
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
                          });
                        }}
                      >
                        <Visibility
                          style={{ color: "#003049" }}
                          fontSize="small"
                        />
                      </button>
                      <button
                        className="bg-blue-100 hover:bg-blue-200 p-2 rounded-lg"
                        onClick={() => {
                          setId(val.id);
                          setEditEmployeeId(val.employeeId);
                          setEditEmployeeName(val.employee.firstName);
                          setEditJobPositionId(val.jobposition_id);
                          setEditLeaveTypeId(val.leave_type_id);
                          setEditStart(val.start_date);
                          setEditEnd(val.end_date);
                          setEditNote(val.note);
<<<<<<< HEAD
                          setEditDelegetedEmployee(val.delegated_employee.id)
                          setEditDelegetedTask(val.delegated_task)
                          setEditEmergencyContact(val?.emergency_contact.id)
=======
                          setEditDelegetedEmployee(val.delegated_employee?.id)
                          setEditDelegetedTask(val.delegated_task)
                          setEditEmergencyContact(val?.emergency_contact?.id)
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
                          setEditLeaveDuration(val?.leave_duration)
                          setEditRemainingDays(val?.remaining_days)
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
                          setId(val.id);
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
              <tr>
                <td colSpan={7} className="text-center bg-gray-200 py-3">
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="bg-[#FBFBFB] mt-0 px-4 py-3 rounded-b-xl d-flex align-items-center justify-content-between ">
        <div>
          <h6 className="text-[#A098AE] text-[10px]">
            Showing <span className="text-[#0E5073]">{data?.length}</span>{" "}
            from <span className="text-[#0E5073]">{totalItems}</span> data
          </h6>
        </div>
        <div class="d-flex justify-content-center">
          <Pagination
            count={totalPage}
            onChange={changePage}
            siblingCount={1}
            renderItem={(item) => (
              <PaginationItem
                className="btn bg-[#78000010] text-[10px] rounded-md text-[#780000]"
                slots={{ previous: <KeyboardArrowLeft />, next: <KeyboardArrowRight /> }}
                {...item}
              />
            )}
          />
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
              <h3 className="font-semibold text-xl">Add Leave</h3>
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
                    getEmergency(e.value)
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
              <div>
                <label
                  htmlFor="type"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Leave Type
                </label>
                <select
                  id="type"
                  class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-gray-300 block w-full p-2.5 "
                  onChange={(e) => setLeaveTypeId(e.target.value)}
                >
                  <option hidden>Select Leave Type ...</option>
                  {leaveType &&
                    leaveType.map((val, index) => (
                      <option key={index} value={val.id}>
                        {val.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label
                    htmlFor="start"
                    className="block mb-2 text-sm text-gray-600"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="start"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                    onChange={(e) => setStart(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="end"
                    className="block mb-2 text-sm text-gray-600"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    id="end"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                    onChange={(e) => setEnd(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label
                    className="block mb-2 text-sm text-gray-600"
                  >
                    Leave Duration
                  </label>
                  <input
                    type="number"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                    onChange={(e) => setLeaveDuration(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm text-gray-600"
                  >
                    Remaining Days Off
                  </label>
                  <input
                    type="number"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                    onChange={(e) => setRemainingDays(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="note"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Notes
                </label>
                <textarea
                  id="note"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                  onChange={(e) => setNote(e.target.value)}
                  required
                ></textarea>
              </div>
              <hr className=""></hr>
              <div>
                <label
                  className="block mb-2 text-sm text-gray-600"
                >
                  Delegeted Employee
                </label>
                <Select
                  required
                  id="selectedEmployee"
                  isLoading={true}
                  onChange={(e) => {
                    setDelegetedEmployee(e.value);
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
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm text-gray-600"
                >
                  Delegeted Task
                </label>
                <textarea
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                  onChange={(e) => setDelegetedTask(e.target.value)}
                  required
                ></textarea>
              </div>
              <hr className=""></hr>
<<<<<<< HEAD
              <div>
=======
              {/* <div>
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
                <label
                  htmlFor="type"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Emergency Contact
                </label>
                <select
                  id="type"
                  class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-gray-300 block w-full p-2.5 "
                  onChange={(e) => setEmergencyContact(e.target.value)}
                >
                  <option hidden>Select Emergency Contact ...</option>
                  {dataEmergency &&
                    dataEmergency.map((val, index) => (
                      <option key={index} value={val.id}>
                        {val.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label
                  className="block mb-2 text-sm text-gray-600"
                >
                  Emergency Phone Number
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                  placeholder="Auto - fill"
                  // value={emergencyContact ? emergencyContact?.mobilePhone : ""}
                  readOnly
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm text-gray-600"
                >
                  Emergency Address
                </label>
                <textarea
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                  placeholder="Auto - fill"
                  // value={emergencyContact ? emergencyContact?.addres : ""}
                  readOnly
                />
<<<<<<< HEAD
              </div>
=======
              </div> */}
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
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
              <h3 className="font-semibold text-xl">Edit Leave</h3>
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
                  id="jobPosotion"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                  value={editEmployeeName ? editEmployeeName : ""}
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
                  value={editJobPositionId ? editJobPositionId : ""}
                  readOnly
                />
              </div> */}
              <div>
                <label
                  htmlFor="type"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Leave Type
                </label>
                <select
                  id="type"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-gray-300 block w-full p-2.5 "
                  value={editLeaveTypeId}
                  onChange={(e) => setEditLeaveTypeId(e.target.value)}
                >
                  <option hidden>Select Leave Type ...</option>
                  {leaveType &&
                    leaveType.map((val, index) => (
                      <option key={index} value={val.id}>
                        {val.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label
                    htmlFor="start"
                    className="block mb-2 text-sm text-gray-600"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="start"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                    value={moment(editStart).utc().format("YYYY-MM-DD")}
                    onChange={(e) => setEditStart(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="end"
                    className="block mb-2 text-sm text-gray-600"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    id="end"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                    value={moment(editEnd).utc().format("YYYY-MM-DD")}
                    onChange={(e) => setEditEnd(e.target.value)}
                    required
                  />
                </div>
              </div>
<<<<<<< HEAD
              
=======

>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label
                    className="block mb-2 text-sm text-gray-600"
                  >
                    Leave Duration
                  </label>
                  <input
                    type="number"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                    value={editLeaveDuration}
                    onChange={(e) => setEditLeaveDuration(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm text-gray-600"
                  >
                    Remaining Days Off
                  </label>
                  <input
                    type="number"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                    value={editRemainingDays}
                    onChange={(e) => setEditRemainingDays(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="note"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Notes
                </label>
                <textarea
                  type="date"
                  id="note"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                  value={editNote}
                  onChange={(e) => setEditNote(e.target.value)}
                  required
                ></textarea>
              </div>
              <hr className=""></hr>
              <div>
                <label
                  className="block mb-2 text-sm text-gray-600"
                >
                  Delegeted Employee
                </label>
                <Select
                  required
                  id="selectedEmployee"
                  isLoading={true}
                  onChange={(e) => {
                    setEditDelegetedEmployee(e.value);
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
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm text-gray-600"
                >
                  Delegeted Task
                </label>
                <textarea
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                  value={editDelegetedTask}
                  onChange={(e) => setEditDelegetedTask(e.target.value)}
                  required
                ></textarea>
              </div>
              <hr className=""></hr>
<<<<<<< HEAD
              <div>
=======
              {/* <div>
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
                <label
                  htmlFor="type"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Emergency Contact
                </label>
                <select
                  id="type"
                  class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-gray-300 block w-full p-2.5 "
                  value={editEmergencyContact}
                  onChange={(e) => setEditEmergencyContact(e.target.value)}
                >
                  <option hidden>Select Emergency Contact ...</option>
                  {dataEmergency &&
                    dataEmergency.map((val, index) => (
                      <option key={index} value={val.id}>
                        {val.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label
                  className="block mb-2 text-sm text-gray-600"
                >
                  Emergency Phone Number
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                  placeholder="Auto - fill"
                  // value={emergencyContact ? emergencyContact?.mobilePhone : ""}
                  readOnly
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm text-gray-600"
                >
                  Emergency Address
                </label>
                <textarea
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                  placeholder="Auto - fill"
                  // value={emergencyContact ? emergencyContact?.addres : ""}
                  readOnly
                />
<<<<<<< HEAD
              </div>
=======
              </div> */}
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
              <div className="flex justify-end gap-2 mt-5">
                <button
                  className="bg-gray-200 text-[#0E5073] rounded-lg px-4 py-2"
                  onClick={() => setModalEdit(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#0E5073] rounded-lg px-4 py-2 text-white"
                  onClick={postDataEdit}
                >
                  Submit
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
          maxWidth="lg"
        >
          <div className="m-5">
            <div className="flex justify-between mb-5">
              <h3 className="font-semibold text-xl">Detail Time Off</h3>
              <button onClick={() => setModalDetail(false)}>
                <Close />
              </button>
            </div>
            <div className="space-y-3">
              <div className="bg-[#F8F8F8] p-3">
                <div className="grid grid-cols-2 border-b border-gray-300 py-2">
                  <div className="grid grid-cols-2 gap-2 py-2">
                    <p>Nama Lengkap</p>
                    <p>: {detail?.name ? detail?.name : "-"}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-2">
                    <p>Job Position</p>
                    <p>: {detail?.jobposition ? detail?.jobposition : "-"}</p>
                  </div>
                </div>
                <div className="">
                  <div className="grid grid-cols-4 gap-2 py-2">
                    <p>Start Date</p>
                    <p className="col-span-3">
                      :{" "}
                      {detail?.end_date
                        ? moment(detail?.start_date).utc().format("YYYY-MM-DD")
                        : "-"}
                    </p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-2">
                    <p>End Date</p>
                    <p className="col-span-3">
                      :{" "}
                      {detail?.end_date
                        ? moment(detail?.end_date).utc().format("YYYY-MM-DD")
                        : "-"}
                    </p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-2">
                    <p>Remaining Days Off</p>
<<<<<<< HEAD
                    <p className="col-span-3">: -</p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-2">
                    <p>Time Off Duration</p>
                    <p className="col-span-3">: -</p>
                  </div>
=======
                    <p className="col-span-3">: {detail.remaining_days ? detail.remaining_days : "-"}</p>
                  </div>
                  {/* <div className="grid grid-cols-4 gap-2 py-2">
                    <p>Time Off Duration</p>
                    <p className="col-span-3">: -</p>
                  </div> */}
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
                  <div className="grid grid-cols-4 gap-2 py-2">
                    <p>Time off Type</p>
                    <p className="col-span-3">
                      : {detail?.leave_type ? detail?.leave_type : "-"}
                    </p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-2 border-b border-gray-300">
                    <p>Notes</p>
                    <p className="col-span-3">
                      : {detail?.note ? detail?.note : "-"}
                    </p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-2">
                    <p>Delegated Employee</p>
<<<<<<< HEAD
                    <p className="col-span-3">: -</p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-2 border-b border-gray-300">
                    <p>Delegated Task</p>
                    <p className="col-span-3">: -</p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-2">
=======
                    <p className="col-span-3">: {detail.delegated_employee ? detail.delegated_employee : "-"}</p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-2 border-b border-gray-300">
                    <p>Delegated Task</p>
                    <p className="col-span-3">: {detail.delegated_task ? detail.delegated_task : "-"}</p>
                  </div>
                  {/* <div className="grid grid-cols-4 gap-2 py-2">
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
                    <p>Emergency Contact</p>
                    <p className="col-span-3">: -</p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-2">
                    <p>Emergency Phone Number</p>
                    <p className="col-span-3">: -</p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-2">
                    <p>Emergency Address</p>
                    <p className="col-span-3">: -</p>
<<<<<<< HEAD
                  </div>
=======
                  </div> */}
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
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

export default Leave;
