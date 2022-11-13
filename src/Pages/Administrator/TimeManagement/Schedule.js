import { Add, ArrowLeft, ArrowRight, ImportExport } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Camera } from "phosphor-react";
import { useEffect, useState } from "react";
import { Table, Modal } from "react-bootstrap";
import { TextFieldSearch } from "../../../Components/TextField";
import { GetEmployeeName } from "../../../Repository/EmployeeRepository";
import Select from "react-select";
import { ModalDelete, SwalSuccess } from "../../../Components/Modals";
import {
  DeleteSchedule,
  GetSchedule,
  AddSchedule,
  GetScheduleByDate,
} from "../../../Repository/TimeManagementRepository";

function Schedule() {
  const [editValues, setEditValues] = useState();
  const [schedules, setSchedules] = useState([]);
  const [dialogUser, setUser] = useState(false);
  const [dialogDetailUser, setDetailUser] = useState(false);
  const [isdelete, setDelete] = useState(false);
  const [id, setId] = useState();
  const [employeeNames, setEmployeeNames] = useState([]);
  const [employeeName, setEmployeeName] = useState({
    employeeName: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const inAwait = async () => {
    var dataSchedules = await GetSchedule();
    var dataEmployeeName = await GetEmployeeName();
    setEmployeeNames(dataEmployeeName);
    // console.log(dataSchedules[0].employee.jobtitle.name);
    setSchedules(dataSchedules);
  };
  // console.log(schedules)
  useEffect(() => {
    inAwait();
  }, []);
  return (
    <>
      <div className="w-100 bg-[#FFFFFF] p-4 rounded-t-xl">
        <h5>
          <b>Schedule</b>
        </h5>
        <p>
          <small>list of Schedule</small>
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
                const res = await GetScheduleByDate(e.target.value);
                console.log(res.result);
                setSchedules(res.result);
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
              Schedule
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
              <th onClick={() => {}}>
                Employee Name <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}}>
                Start Date <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}}>
                End Date <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}}>
                Job Title <ImportExport fontSize="2px" />
              </th>
            </tr>
          </thead>
          <tbody>
            {schedules.length > 0 ? (
              schedules.map((schedule, index) => (
                <tr key={index}>
                  <td className="align-middle">
                    <input type="checkbox" style={{ borderRadius: "2px" }} />
                  </td>
                  <td className="align-middle">
                    {schedule?.employee?.firstName}{" "}
                  </td>
                  <td className="align-middle">{schedule.startDate}</td>
                  <td className="align-middle">{schedule.endDate}</td>
                  <td className="align-middle">
                    {schedule?.employee?.jobtitle?.name}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
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
          <Modal.Title>Add Schedule</Modal.Title>
        </Modal.Header>
        <form
          method="POST"
          onSubmit={async (e) => {
            e.preventDefault();
            console.log(employeeName.employeeName);
            if (
              employeeName.employeeName == undefined ||
              employeeName.employeeName == null ||
              employeeName.employeeName == ""
            ) {
              setErrorMsg("Please choose the employee");
              return false;
            }

            var requestBody = {
              employeeId: employeeName.employeeName,
              startDate: employeeName.startDate,
              endDate: employeeName.endDate,
            };
            var res = await AddSchedule(requestBody);
            setUser(!dialogUser);
            setErrorMsg("");
            SwalSuccess({ message: "Success add schedule" });
            inAwait();
          }}
        >
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
                    onChange={(val) =>
                      setEmployeeName({
                        ...employeeName,
                        employeeName: val.value,
                      })
                    }
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
                  <p className={"text-danger text-sm"}>{errorMsg}</p>
                </div>
              </div>
              <div className="py-2">
                <label className="mb-1">
                  Schedule<span className="text-danger">*</span>
                </label>
                <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                  <option hidden className="py-3">
                    Select
                  </option>
                  <option value="Home Schedule" className="py-3">
                    Home Schedule
                  </option>
                  <option value="Office Schedule" className="py-3">
                    Office Schedule
                  </option>
                </select>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label className="mb-1">
                      Start Date <span className="text-danger">*</span>
                    </label>
                    <input
                      id="date1"
                      type="date"
                      onChange={(e) =>
                        setEmployeeName({
                          ...employeeName,
                          startDate: e.target.value,
                        })
                      }
                      required
                      className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label className="mb-1">
                      End Date <span className="text-danger">*</span>
                    </label>
                    <input
                      id="date2"
                      type="date"
                      onChange={(e) =>
                        setEmployeeName({
                          ...employeeName,
                          endDate: e.target.value,
                        })
                      }
                      required
                      className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
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
            <button
              className="btn"
              type="submit"
              style={{
                backgroundColor: "#0E5073",
                border: "1px solid transparent",
                color: "#FFFFFF",
                width: "100px",
              }}
            >
              Add
            </button>
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
                Employee Name : Akhamad Triaji
              </div>
              <div className="col-md-6 mb-2">Duration : 10 h 55 m</div>
              <div className="col-md-6 mb-2">Job Title : IT Manager</div>
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
                    title="test"
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
                    title="test2"
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

      <ModalDelete
        close={() => {
          setDelete(false);
        }}
        submit={() => {
          DeleteSchedule(id);
          setDelete(false);
          inAwait();
          SwalSuccess({ message: "Success delete schedule" });
        }}
        active={isdelete}
      />
    </>
  );
}

export default Schedule;
