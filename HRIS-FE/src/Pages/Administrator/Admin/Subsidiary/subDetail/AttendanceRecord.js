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
  ArrowBack,
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
  KeyboardArrowLeft,
  KeyboardArrowRight,
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
import { useEffect } from "react";
import { useState } from "react";
import {
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "react-bootstrap";
import {
  AddAttendance,
  GetAttendance,
  GetAttendanceByDate,
  GetEmployeeProfile,
} from "../../../../../Repository/TimeManagementRepository";
import { useLocation } from "react-router-dom";
import { GetSubsidiaryAttendance } from "../../../../../Repository/SubsidiaryRepository";

function AttendanceRecord() {
  const [dialogUser, setUser] = useState(false);
  const [dialogDetailUser, setDetailUser] = useState(false);
  const [dataAttendance, setDataAttendance] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [allPages, setAllPages] = useState([]);
  const [time, setTime] = useState([]);
  const [note, setNote] = useState([]);
  const location = useLocation();
  const val = location.state;
  const [detail, setDetail] = useState([]);
  const [dataProfile, setDataProfile] = useState([]);
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const inAwait = async () => {
    var data = await GetSubsidiaryAttendance({id: val.unique_id, limit:10, page:1});
    setDataAttendance(data.requests);
    setTotalItems(data.totalItems);
    setTotalPage(data.totalPages);
    console.log(dataAttendance);
    var pageList = [];
    for (let i = 1; i <= data.totalPages; i++) {
      pageList.push(i);
    }
    setAllPages(pageList);
    console.log(data);
  };

  useEffect(() => {
    inAwait();
  }, []);
  
  const previousPage = async () => {
    setCurrentPage((current) => current - 1);
    if (currentPage == 1) {
      setCurrentPage(1);
    }
    var data = await GetSubsidiaryAttendance({id: val.unique_id, limit:10,  page: currentPage});
    setDataAttendance(data.requests);
  };

  const nextPage = async () => {
    setCurrentPage((current) => current + 1);
    if (currentPage == totalPage) {
      setCurrentPage(1);
    }
    var data = await GetSubsidiaryAttendance({id: val.unique_id, limit:10,  page: currentPage});
    setDataAttendance(data.requests);
  };

  const changePage = async (value) => {
    var data = await GetSubsidiaryAttendance({id: val.unique_id, limit:10,  page: value});
    setDataAttendance(data.requests);
  };

  const postData = async (e) => {
    e.preventDefault();

    var requestBody = {
      checkIn: time,
      noteCheckIn: `https://www.google.com/maps/?q=${latitude},${longitude}`,
    };
    setUser(false);
    var res = await AddAttendance(requestBody);
    inAwait();
  };

  navigator.geolocation.getCurrentPosition(function (position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  });

  const duration = (then, now) => {
    var ms = moment(now, "HH:mm:ss").diff(moment(then, "HH:mm:ss"));
    var d = moment.duration(ms);
    var h = d._data.hours;
    var m = d._data.minutes;
    var s = d._data.seconds;

    if (h != 0) {
      return `${h} hours ${m} Minutes`;
    } else {
      return `${m} Minutes`;
    }
    // return `${d._data.hours}:${d._data.minutes}:${d._data.seconds}`;
  };
  return (
    <>
      <div className="w-100 bg-[#FFFFFF] rounded-xl"
      style={{ backgroundColor: "#FFFFFF", boxShadow:'0px 0px 3px rgba(0, 0, 0, 0.25)'}}
      >
        <div className="p-4 ">

          <h5>
            <b>My Attendance</b>
          </h5>
          <p>
            <small>List of Attendance</small>
          </p>
          <br></br>
          <br></br>
          <Table
            borderless
            responsive
            style={{ color: "#00000070", fontSize: "0.75rem" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#EBF7FF" }}>
                <th style={{ minWidth: "10em" }} onClick={() => {}}>
                  Date <ImportExport fontSize="2px" />
                </th>
                <th style={{ minWidth: "10em" }} onClick={() => {}}>
                  Check In <ImportExport fontSize="2px" />
                </th>
                <th style={{ minWidth: "20em" }} onClick={() => {}}>
                  Check In Location <ImportExport fontSize="2px" />
                </th>
                <th style={{ minWidth: "10em" }} onClick={() => {}}>
                  Check Out <ImportExport fontSize="2px" />
                </th>
                <th style={{ minWidth: "20em" }} onClick={() => {}}>
                  Check Out Location <ImportExport fontSize="2px" />
                </th>
                <th style={{ minWidth: "10em" }} onClick={() => {}}>
                  Duration <ImportExport fontSize="2px" />
                </th>
                <th style={{ minWidth: "10em" }} onClick={() => {}}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {dataAttendance.length > 0 ? (
                dataAttendance.map((value, index) => {
                  console.log(val)
                  return (
                    <tr key={index}>
                    <td className="align-middle">{value}</td>
                    <td className="align-middle">{value}</td>
                    <td className="align-middle">
                      {/* {value.noteCheckIn ? (
                        <a href={value.noteCheckIn} target="_blank">
                          See Location
                        </a>
                      ) : null} */}
                    </td>
                    <td className="align-middle">{value}</td>
                    <td className="align-middle">
                      {/* {value.noteCheckOut ? (
                        <a href={value.noteCheckOut} target="_blank">
                          See Location
                        </a>
                      ) : null} */}
                    </td>
                    <td className="align-middle">
                      {duration(value, value)}
                    </td>
                    <td className="align-middle d-flex gap-2">
                      <button
                        onClick={() => {
                          setDetail(value);
                          setDetailUser(!dialogDetailUser);
                        }}
                        className="btn btn-sm mx-1"
                        style={{
                          backgroundColor: "#CEDFEA",
                          borderRadius: "8px",
                        }}
                      >
                        <VisibilityOutlined fontSize="10px" />
                      </button>
                      <Button
                        onClick={() => {
                          setUser(!dialogUser);
                        }}
                        style={{
                          color: "#454545",
                          fontWeight: "600",
                          fontSize: "11px",
                          borderRadius: "8px",
                          backgroundColor: "#CEDFEA",
                        }}
                        >
                        Check Out
                      </Button>
                    </td>
                  </tr>
                )
              })
              ) : (
                <tr>
                  <td colSpan={7}>
                    <div className="d-flex justify-content-center align-middle text-center">
                      No Data
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <div className="bg-[#FBFBFB] mt-0 px-4 py-2 rounded-b-xl d-flex align-items-center justify-content-between ">
            <div>
                <h6 className="text-[#A098AE] text-[10px]">
                Showing <span className="text-[#0E5073]">{dataAttendance?.length}</span>{" "}
                from <span className="text-[#0E5073]">{totalItems}</span> data
                </h6>
            </div>
            <div>
                <button className="btn btn-sm" 
                onClick={() => previousPage()}
                >
                <KeyboardArrowLeft />
                </button>
                {/* <button className="btn mx-2 bg-[#78000010] rounded-md text-[#780000]">
                1
                </button>
                <button className="btn bg-[#780000] rounded-md text-[#FFFFFF]">
                2
                </button> */}
                {allPages.map((page) => (
                <button
                    onClick={() => changePage(page)}
                    className="btn mx-2 bg-[#78000010] text-[10px] rounded-md text-[#780000]"
                >
                    {page}
                </button>
                ))}
                <button className="btn btn-sm" 
                onClick={() => nextPage()}
                >
                <KeyboardArrowRight/>
                </button>
            </div>
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
                    // onChange={(e) => setNote(e.target.value)}
                    value={`https://www.google.com/maps/?q=${latitude},${longitude}`}
                    readOnly
                  ></textarea> */}
                  <p className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-3">{`https://www.google.com/maps/?q=${latitude},${longitude}`}</p>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="m-4">
            <button
              className="btn"
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
                Employee Name : {dataProfile?.firstName} {dataProfile?.lastName}
              </div>
              <div className="col-md-6 mb-2">
                Duration : {duration(detail.checkIn, detail.checkOut)}
              </div>
              <div className="col-md-6 mb-2">
                Job Title : {dataProfile?.jobtitle?.name}
              </div>
              <div className="col-md-6 mb-2">
                Work Shift : {dataProfile?.workshift?.name}
              </div>
              <div className="col-md-6 mb-2">
                Company Location : {dataProfile?.location}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 border-r-2">
              <div className="row">
                <div className="col-6 font-bold">Clock In</div>
                <div className="col-6 font-bold">{detail.checkIn}</div>
                <div className="col-md-5">
                  <h6>Photo</h6>
                  <div className="mt-2 px-2 py-4 text-center rounded-xl bg-[#EDEDED]">
                    <center>
                      <Camera size={50} className="text-[#00000050]" />
                    </center>
                    <h6 className="text-[#00000050]">No Photo</h6>
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
                  {/* <div className="d-flex align-items-start justify-content-start mt-2">
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
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-md-6 border-l-2">
              <div className="row">
                <div className="col-6 font-bold">Clock Out</div>
                <div className="col-6 font-bold">{detail.checkOut}</div>
                <div className="col-md-5">
                  <h6>Photo</h6>
                  <div className="mt-2 px-2 py-4 text-center rounded-xl bg-[#EDEDED]">
                    <center>
                      <Camera size={50} className="text-[#00000050]" />
                    </center>
                    <h6 className="text-[#00000050]">No Photo</h6>
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
                  {/* <div className="d-flex align-items-start justify-content-start mt-2">
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
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AttendanceRecord;
