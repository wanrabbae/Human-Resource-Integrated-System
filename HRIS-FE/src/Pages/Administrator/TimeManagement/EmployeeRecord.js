import {
  faArrowsUpDown,
  faArrowsUpDownLeftRight,
  faArrowsUpToLine,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EyeIcon } from "@heroicons/react/solid";
import moment from "moment";
import {
  Add,
  AlignVerticalCenter,
  ArrowLeft,
  ArrowRight,
  ArrowUpwardTwoTone,
  Delete,
  DeleteOutline,
  EditOutlined,
  Filter,
  Filter1,
  FilterCenterFocus,
  FilterList,
  ImportExport,
  Search,
  Visibility,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Camera } from "phosphor-react";
import { useState, useEffect } from "react";
import {
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { TextFieldSearch } from "../../../Components/TextField";
import { GetEmployeeName } from "../../../Repository/EmployeeRepository";
import {
  AddEmployeeRecord,
  GetEmployeeRecByDate,
  GetEmployeeRecord,
} from "../../../Repository/TimeManagementRepository";
import * as XLSX from "xlsx";

function EmployeeRecord() {
  const [dialogUser, setUser] = useState(false);
  const [dialogDetailUser, setDetailUser] = useState(false);
  const [employeeNames, setEmployeeNames] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [employeeId, setEmployeeId] = useState([
    {
      employeeId: "",
    },
  ]);
  const [detail, setDetail] = useState([]);
  const [det, setDet] = useState([]);
  const [detailEmployee, setDetailEmployee] = useState([]);
  const [time, setTime] = useState([]);
  const [note, setNote] = useState([]);
  const [employeeRecord, setEmployeeRecord] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);

<<<<<<< HEAD
=======
  const [dataExport, setDataExport] = useState([])

>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
  const navigate = useNavigate();
  let allPages = [];
  const inAwait = async () => {
    var dataEmployeeName = await GetEmployeeName();
    var dataEmployeeRecord = await GetEmployeeRecord({ page: 1, size: 10 });
    setEmployeeNames(dataEmployeeName);
    setEmployeeRecord(dataEmployeeRecord.requests);
    setTotalItems(dataEmployeeRecord.totalItems);
    setTotalPage(dataEmployeeRecord.totalPages);

<<<<<<< HEAD
=======
    var data = await GetEmployeeRecord({ page: 1, size: dataEmployeeRecord.totalItems });
    setDataExport(data.requests)

>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
    console.log(dataEmployeeName);
  };
  useEffect(() => {
    inAwait();
  }, []);

  // console.log(employeeNames)

  const previousPage = async () => {
    setCurrentPage((current) => current - 1);
    if (currentPage == 1) {
      setCurrentPage(1);
    }
    const getEmployeesRecord = await GetEmployeeRecord({
      page: currentPage,
      size: 10,
    });
    setEmployeeRecord(getEmployeesRecord.requests);
  };

  const nextPage = async () => {
    setCurrentPage((current) => current + 1);
    if (currentPage == totalPage) {
      setCurrentPage(1);
    }
    const getEmployeesRecord = await GetEmployeeRecord({
      page: currentPage,
      size: 10,
    });
    setEmployeeRecord(getEmployeesRecord.requests);
  };

  const changePage = async (value) => {
    const getEmployeesRecord = await GetEmployeeRecord({
      page: value,
      size: 10,
    });
    console.log(getEmployeesRecord);
    setEmployeeRecord(getEmployeesRecord.requests);
  };

  const postData = async (e) => {
    e.preventDefault();

    var requestBody = {
      employeeId: employeeId.employeeId,
      checkIn: time,
      noteCheckIn: `https://www.google.com/maps/?q=${latitude},${longitude}`,
    };
    if (employeeId.employeeId == undefined || employeeId.employeeId == null) {
      setErrorMsg("Please choose the employee");
      return false;
    }
    setUser(false);
    var res = await AddEmployeeRecord(requestBody);
    setErrorMsg("");
    inAwait();
  };
  for (let i = 0; i < totalPage; i++) {
    allPages.push(i + 1);
  }
  // console.log(detail);

  navigator.geolocation.getCurrentPosition(function (position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  });

  const duration = (then, now) => {
    var ms = moment(now, "HH:mm:ss").diff(moment(then, "HH:mm:ss"));
    var d = moment.duration(ms);
    return `${d._data.hours}:${d._data.minutes}:${d._data.seconds}`;
  };

<<<<<<< HEAD
  const exportExcel = async () => {
    if (employeeRecord.length > 0) {
      var wb = XLSX.utils.book_new();
      var data = [];

      await employeeRecord.map((app) => {
=======
  console.log(dataExport)
  const exportExcel = async () => {
    if (dataExport.length > 0) {
      var wb = XLSX.utils.book_new();
      var data = [];

      await dataExport.map((app) => {
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
        data.push({
          "Employee Name": app?.employee?.firstName,
          "Date": app?.date,
          "Check In": app?.checkIn,
          "Check In Location": app?.noteCheckIn,
          "Check Out": app?.checkOut,
          "Check Out Location": app?.noteCheckOut,
          "Duration": duration(app.checkIn, app.checkOut),
        });
      });

      var ws = XLSX.utils.json_to_sheet(data);

      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

      XLSX.writeFile(wb, "Employee Record.xlsx");
      console.log("Exported excel!");
    } else {
      alert("Data masih kosong");
    }
  };
  return (
    <>
      <div className="w-100 bg-light p-4 rounded-t-xl">
        <h5 className="text-black text-lg">Employee Record</h5>
        <p className="text-xs text-[#737373]">
          list of record employee attendance
        </p>
        <br></br>
        <div className="d-flex justify-content-between">
          <div className="flex gap-3">
            <input
              type="date"
              className="bg-light-50 border border-gray-300 text-[#00000030] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onClick={() => inAwait()}
              onChange={async (e) => {
                console.log(e.target.value);
                const res = await GetEmployeeRecByDate(e.target.value);
                console.log(res);
                setEmployeeRecord(res);
              }}
            />
            <button
              className="flex items-center gap-3 border border-gray-300 text-[#003049] text-sm rounded-lg p-2.5"
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
          <div className="d-flex">
            <TextFieldSearch />
            <div className="mx-2"></div>
            <Button
              onClick={() => {
                setUser(!dialogUser);
              }}
              style={{
                color: "#FFFFFF",
                borderRadius: "7px",
                backgroundColor: "#0E5073",
              }}
              variant="contained"
              startIcon={<Add />}
            >
              <span>
<<<<<<< HEAD
              Manual Check In / Out
=======
                Manual Check In / Out
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
              </span>
            </Button>
          </div>
        </div>
        <br></br>
        <Table
          borderless
          responsive
          style={{ color: "#00000070", fontSize: "0.75rem" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#EBF7FF" }}>
              <th width="10px">
                <input type="checkbox" style={{ borderRadius: "2px" }} />
              </th>
<<<<<<< HEAD
              <th onClick={() => {}} style={{ minWidth: "20em" }}>
                Employee Name <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}} style={{ minWidth: "10em" }}>
                Date <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}} style={{ minWidth: "10em" }}>
                Check In <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}} style={{ minWidth: "20em" }}>
                Check In Location <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}} style={{ minWidth: "10em" }}>
                Check Out <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}} style={{ minWidth: "20em" }}>
                Check Out Location <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}} style={{ minWidth: "10em" }}>
                Duration <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}} style={{ minWidth: "10em" }}>
=======
              <th onClick={() => { }} style={{ minWidth: "20em" }}>
                Employee Name <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => { }} style={{ minWidth: "10em" }}>
                Date <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => { }} style={{ minWidth: "10em" }}>
                Check In <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => { }} style={{ minWidth: "20em" }}>
                Check In Location <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => { }} style={{ minWidth: "10em" }}>
                Check Out <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => { }} style={{ minWidth: "20em" }}>
                Check Out Location <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => { }} style={{ minWidth: "10em" }}>
                Duration <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => { }} style={{ minWidth: "10em" }}>
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {employeeRecord.length > 0 ? (
              employeeRecord.map((value, index) => (
                <tr key={index}>
                  <td className="align-middle">
                    <input type="checkbox" style={{ borderRadius: "2px" }} />
                  </td>
                  <td className="align-middle">{value.employee?.firstName}</td>
                  <td className="align-middle">{moment(value.date).format('YYYY-MM-DD')}</td>
                  <td className="align-middle">{value.checkIn}</td>
                  <td className="align-middle">
                    {value.noteCheckIn ? (
                      <a href={value.noteCheckIn} target="_blank">
                        See Location
                      </a>
                    ) : null}
                  </td>
                  <td className="align-middle">{value.checkOut}</td>
                  <td className="align-middle">
                    {value.noteCheckOut ? (
                      <a href={value.noteCheckOut} target="_blank">
                        See Location
                      </a>
                    ) : null}
                  </td>
                  <td className="align-middle">
                    {duration(value.checkIn, value.checkOut)}
                  </td>
                  <td className="align-middle d-flex gap-2">
                    <button
                      onClick={() => {
                        setDet(value);
                        setDetail(value.employee);
                        setDetailEmployee(value?.employee.jobtitle);
                        setDetailUser(!dialogDetailUser);
                      }}
                      className="flex items-center gap-3 border border-gray-300 bg-[#CEDFEA] text-[#003049] text-sm rounded-lg p-2.5"
                    >
                      <VisibilityOutlined fontSize="10px" />
                    </button>
                    <button
                      onClick={() => {
                        setUser(!dialogUser);
                      }}
                      className="flex items-center gap-3 border border-gray-300 bg-[#CEDFEA] text-[#003049] text-sm rounded-lg p-2.5 truncate"
                    >
                      Check Out
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9}>
                  <div className="d-flex justify-content-center align-middle text-center">
                    No Data
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <div className="bg-[#FBFBFB] mt-0 px-4 py-3 rounded-b-xl d-flex align-items-center justify-content-between ">
        <div>
          <h6 className="text-[#A098AE]">
            Showing <span className="text-[#0E5073]">1-5</span> from{" "}
            <span className="text-[#0E5073]">100</span> data
          </h6>
        </div>
        <div>
          <button className="btn btn-sm" onClick={() => previousPage()}>
            <ArrowLeft />
          </button>
          {allPages.map((page, index) => (
            <button
              key={index}
              onClick={() => changePage(page)}
              className="btn mx-2 bg-[#78000010] rounded-md text-[#780000]"
            >
              {page}
            </button>
          ))}
          <button className="btn btn-sm" onClick={() => nextPage()}>
            <ArrowRight />
          </button>
        </div>
      </div>

      <Modal show={dialogUser} size="lg" onHide={() => setUser(!dialogUser)}>
        <Modal.Header
          closeButton
          className="m-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title>Check In / Out</Modal.Title>
        </Modal.Header>
        <form onSubmit={(e) => postData(e)}>
          <Modal.Body className="mx-4">
            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    Employee Name <span className="text-danger">*</span>
                  </label>
                  <Select
                    required
                    id="selectedEmployee"
                    isLoading={true}
                    onChange={(val) => setEmployeeId({ employeeId: val.value })}
                    isFocused="appearance-none border-0 outline-0"
                    className="appearance-none"
                    classNamePrefix="appearance-none active:outline-0 active:border-0 focus:outline-0 focus:border-0 focus:shadow-outline"
                    options={employeeNames.map((val) => {
                      return {
                        value: val.id,
                        label: val.firstName,
                      };
                    })}
                  />
                </div>
                <p className={"text-danger text-sm"}>{errorMsg}</p>
              </div>
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label className="mb-1">Time</label>
                  <input
                    className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="time"
                    required
                    placeholder="Select Time"
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label className="mb-1">Location</label>
                  {/* <textarea
                    rows={4}
                    placeholder="Note check in / out here"
                    className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setNote(e.target.value)}
                  ></textarea> */}
                  <p className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-3">{`https://www.google.com/maps/?q=${latitude},${longitude}`}</p>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="m-4">
            <button
              className="btn"
              type="button"
              style={{
                backgroundColor: "#737373",
                border: "1px solid transparent",
                color: "#FFFFFF",
                width: "100px",
              }}
              onClick={() => setUser(!dialogUser)}
            >
              Cancel
            </button>
            <input
              type="submit"
              value="submit"
              className="btn"
              style={{
                backgroundColor: "#0E5073",
                border: "1px solid transparent",
                color: "#FFFFFF",
                width: "100px",
              }}
            />
          </Modal.Footer>
        </form>
      </Modal>

      <Modal
        show={dialogDetailUser}
        size="lg"
        onHide={() => setDetailUser(!dialogDetailUser)}
      >
        <Modal.Header
          closeButton
          className="m-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title>Detail Attendance</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4 mb-4">
          <div className="p-4 bg-[#00000005] rounded-xl mb-3">
            <h3 className="font-bold mb-3">Attendance Information</h3>
            <div className="row">
              <div className="col-md-6 mb-2">
                Employee Name : {detail.firstName} {detail.lastName}
              </div>
              <div className="col-md-6 mb-2">
                Duration : {duration(det.checkIn, det.checkOut)}
              </div>
              <div className="col-md-6 mb-2">
                Job Title : {detail?.jobtitle?.name}
              </div>
              <div className="col-md-6 mb-2">Work Shift : General Shift</div>
              <div className="col-md-6 mb-2">
                Company Location : Ethos Pusat
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 border-r-2">
              <div className="row">
                <div className="col-6 font-bold">Clock In</div>
                <div className="col-6 font-bold">{det.checkIn}</div>
                <div className="col-md-5">
                  <h6>Photo</h6>
<<<<<<< HEAD
                  <div className="mt-2 px-2 py-4 text-center rounded-xl bg-[#EDEDED]">
                    <center>
                      <Camera size={50} className="text-[#00000050]" />
                    </center>
                    <h6 className="text-[#00000050]">No Photo</h6>
=======
                  <div className="mt-2 w-fit text-center rounded-xl bg-[#EDEDED] flex justify-center items-center">
                    <div className="overflow-hidden relative w-20 h-20 bg-gray-100 rounded-lg dark:bg-gray-600">
                      {det.imageIn ? (
                        <img src={det.imageIn} />
                      ) : (
                        <svg
                          className="absolute w-20 h-20 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      )}
                    </div>
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
                  </div>
                </div>
                <div className="col-md-7">
                  <h6>Location</h6>
                  <iframe
                    className="mt-2"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253037.7496484048!2d108.73959703281248!3d-7.713716100000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e656d247d578533%3A0x96fd507454419e96!2sEthos%20Work%20Space!5e0!3m2!1sen!2sid!4v1661136050554!5m2!1sen!2sid"
                    width="170em"
                    height="150em"
                  ></iframe>
                  <div className="d-flex align-items-start justify-content-start mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12"
                      viewBox="0 0 20 20"
                      fill="#00000050"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <small className="ml-3">
                      Gg. Satria II, Sokayasa, RT04/RW01, Kec. Purwokerto Tim.,
                      Kabupaten Banyumas, Jawa Tengah ,
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 border-l-2">
              <div className="row">
                <div className="col-6 font-bold">Clock Out</div>
                <div className="col-6 font-bold">{det.checkOut}</div>
                <div className="col-md-5">
                  <h6>Photo</h6>
<<<<<<< HEAD
                  <div className="mt-2 px-2 py-4 text-center rounded-xl bg-[#EDEDED]">
                    <center>
                      <Camera size={50} className="text-[#00000050]" />
                    </center>
                    <h6 className="text-[#00000050]">No Photo</h6>
=======
                  <div className="mt-2 w-fit text-center rounded-xl bg-[#EDEDED] flex justify-center items-center">
                    <div className="overflow-hidden relative w-20 h-20 bg-gray-100 rounded-lg dark:bg-gray-600">
                      {det.imageOut ? (
                        <img src={"det.imageOut"} />
                      ) : (
                        <svg
                          className="absolute w-20 h-20 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      )}
                    </div>
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
                  </div>
                </div>
                <div className="col-md-7">
                  <h6>Location</h6>
                  <iframe
                    className="mt-2"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253037.7496484048!2d108.73959703281248!3d-7.713716100000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e656d247d578533%3A0x96fd507454419e96!2sEthos%20Work%20Space!5e0!3m2!1sen!2sid!4v1661136050554!5m2!1sen!2sid"
                    width="170em"
                    height="150em"
                  ></iframe>
                  <div className="d-flex align-items-start justify-content-start mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12"
                      viewBox="0 0 20 20"
                      fill="#00000050"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <small className="ml-3">
                      Gg. Satria II, Sokayasa, RT04/RW01, Kec. Purwokerto Tim.,
                      Kabupaten Banyumas, Jawa Tengah ,
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EmployeeRecord;
