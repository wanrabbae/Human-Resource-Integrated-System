import {
  faArrowsUpDown,
  faArrowsUpDownLeftRight,
  faArrowsUpToLine,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EyeIcon } from "@heroicons/react/solid";
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
import Select from "react-select";
import { TextFieldSearch } from "../../../Components/TextField";
import { GetEmployeeName } from "../../../Repository/EmployeeRepository";
import {
  AddEmployeeRecord,
  GetEmployeeRecByDate,
  GetEmployeeRecord,
} from "../../../Repository/TimeManagementRepository";

function EmployeeRecord() {
  const [dialogUser, setUser] = useState(false);
  const [dialogDetailUser, setDetailUser] = useState(false);
  const [employeeNames, setEmployeeNames] = useState([]);
  const [employeeId, setEmployeeId] = useState([{
    employeeId: "",
  }]);
  const [detail, setDetail] = useState([]);
  const [detailEmployee, setDetailEmployee] = useState([]);
  const [time, setTime] = useState([]);
  const [note, setNote] = useState([]);
  const [employeeRecord, setEmployeeRecord] = useState([]);
  const inAwait = async () => {
    var dataEmployeeName = await GetEmployeeName();
    var dataEmployeeRecord = await GetEmployeeRecord();
    setEmployeeNames(dataEmployeeName);
    setEmployeeRecord(dataEmployeeRecord);
  };
  useEffect(() => {
    inAwait();
  }, []);
  const postData = async () => {
    var requestBody = {
      employeeId: employeeId.employeeId,
      checkIn: time,
      noteCheckIn: note,
    };
    console.log(requestBody);
    setUser(false);
    inAwait();
    var res = await AddEmployeeRecord(requestBody);
    console.log(res);
  };
  // console.log(detail);
  return (
    <>
      <div className="w-100 bg-light p-4 rounded-t-xl">
        <h5>
          <b>Employee Record</b>
        </h5>
        <p>
          <small>list of record employee attendance</small>
        </p>
        <br></br>
        <div className="d-flex justify-content-between">
          <div>
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
              Manual Check In / Out
            </Button>
          </div>
        </div>
        <br></br>
        <Table borderless responsive style={{ color: "#00000070" }}>
          <thead>
            <tr style={{ backgroundColor: "#EBF7FF" }}>
              <th width="10px">
                <input type="checkbox" style={{ borderRadius: "2px" }} />
              </th>
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
                Check In Note <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}} style={{ minWidth: "10em" }}>
                Check Out <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}} style={{ minWidth: "20em" }}>
                Check Out Note <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}} style={{ minWidth: "10em" }}>
                Duration <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {employeeRecord.length > 0 ? (
              employeeRecord.map((value, index) => (
                <tr key={index}>
                  <td className="align-middle">
                    <input type="checkbox" style={{ borderRadius: "2px" }} />
                  </td>
                  <td className="align-middle">
                    {value.employee.firstName} {value.employee.lastName}
                  </td>
                  <td className="align-middle">{value.date}</td>
                  <td className="align-middle">{value.checkIn}</td>
                  <td className="align-middle">{value.noteCheckIn}</td>
                  <td className="align-middle">{value.checkOut}</td>
                  <td className="align-middle">{value.noteCheckOut}</td>
                  <td className="align-middle">{value.duration}</td>
                  <td className="align-middle">
                    <button
                      onClick={() => {
                        setDetail(value.employee);
                        setDetailEmployee(value.employee.jobtitle);
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
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10}>
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
          <button className="btn btn-sm">
            <ArrowLeft />
          </button>
          <button className="btn mx-2 bg-[#78000010] rounded-md text-[#780000]">
            1
          </button>
          <button className="btn bg-[#780000] rounded-md text-[#FFFFFF]">
            2
          </button>
          <button className="btn mx-2 bg-[#78000010] rounded-md text-[#780000]">
            3
          </button>
          <button className="btn btn-sm">
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
        <form onSubmit={postData}>
          <Modal.Body className="mx-4">
            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    Employee Name <span className="text-danger">*</span>
                  </label>
                  <Select
                    id="selectedEmployee"
                    isLoading={true}
                    onChange={(val) => setEmployeeId({ employeeId: val.value })}
                    isFocused="appearance-none border-0 outline-0"
                    className="appearance-none"
                    classNamePrefix="appearance-none active:outline-0 active:border-0 focus:outline-0 focus:border-0 focus:shadow-outline"
                    options={employeeNames.map((val) => {
                      return {
                        value: val.id,
                        label: val.firstName + " " + val.lastName,
                      };
                    })}
                  />
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label className="mb-1">Time</label>
                  <input
                    className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="time"
                    placeholder="Select Time"
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    Note <span className="text-danger">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Note check in / out here"
                    className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setNote(e.target.value)}
                  ></textarea>
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
                Employee Name : {detail.firstName} {detail.lastName}
              </div>
              <div className="col-md-6 mb-2">Duration : 10 h 55 m</div>
              <div className="col-md-6 mb-2">Job Title : {detailEmployee.name}</div>
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
                <div className="col-6 font-bold">07.40</div>
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
                <div className="col-6 font-bold">07.40</div>
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
