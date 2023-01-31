import { Add, ArrowLeft, ArrowRight, DeleteOutline, EditOutlined, ImportExport, VisibilityOutlined } from "@mui/icons-material";
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
  DetailSchedule,
} from "../../../Repository/TimeManagementRepository";
import * as XLSX from "xlsx";
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import moment from "moment/moment";

function Schedule() {
  const [editValues, setEditValues] = useState();
  const [schedules, setSchedules] = useState([]);
  const [dialogUser, setUser] = useState(false);
  const [dialogDetailUser, setDetailUser] = useState(false);
  const [isdelete, setDelete] = useState(false);
  const [id, setId] = useState();
  const [employeeNames, setEmployeeNames] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [role, setRole] = useState([]);
  const [scheduleName, setScheduleName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [byDate, setByDate] = useState(false)
  const [byDay, setByDay] = useState(false)

  const inAwait = async () => {
    var dataSchedules = await GetSchedule();
    var dataEmployeeName = await GetEmployeeName();
    setEmployeeNames(dataEmployeeName);
    // console.log(dataSchedules[0].employee.jobtitle.name);
    setSchedules(dataSchedules.requests);
    console.log(dataSchedules);
    var data = JSON.parse(window.localStorage.getItem("users"));
    setRole(data.role);
  };
  // console.log(schedules)

  const exportExcel = async () => {
    if (schedules.length > 0) {
      var wb = XLSX.utils.book_new();
      var data = [];

      await schedules.map((app) => {
        data.push({
          "Employee Name": app?.employee?.firstName,
          "Curent Schedule": app?.schedule,
          "Start Date": app?.startDate,
          "End Time": app?.endDate,
        });
      });

      var ws = XLSX.utils.json_to_sheet(data);

      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

      XLSX.writeFile(wb, "Time Management - Schedule.xlsx");
      console.log("Exported excel!");
    } else {
      alert("Data masih kosong");
    }
  };

  useEffect(() => {
    inAwait();
  }, []);

  const today = new Date()
  const tomorrow = new Date()
  console.log(employeeName)

  tomorrow.setDate(tomorrow.getDate() + 1)

  const [values, setValues] = useState([])
  const [valuesDayHome, setValuesDayHome] = useState([])
  const [valuesDayWork, setValuesDayWork] = useState([])

  const [detailSchedule, setDetailSchedule] = useState([])

  const dataByDate = () => {
    const data = []
    values.map((val, index) => (
      data.push(moment(val.toDate?.().toString()).format('YYYY-MM-DD'))
    ))
    return data
  }
  console.log(valuesDayHome)
  const day = ([{ label: "Sunday", value: "Sunday" }, { label: "Monday", value: "Monday" }, { label: "Tuesday", value: "Tuesday" }, { label: "Wednesday", value: "Wednesday" }, { label: "Thursday", value: "Thursday" }, { label: "Friday", value: "Friday" }, { label: "Saturday", value: "Saturday" }])
  // console.log(day)

  const postData = async (e) => {
    e.preventDefault();

    var requestBodyDate = {
      "employeeId": employeeName,
      "schedule_type": "by_date",
      "schedule": scheduleName,
      "dates": dataByDate()
    }
    var requestBodyDay = {
      "employeeId": employeeName,
      "schedule_type": "by_day",
      "schedule": scheduleName,
      "days": {
        "home_schedule": valuesDayHome,
        "work_schedule": valuesDayWork
      }
    }
    console.log(byDate == true ? requestBodyDate : requestBodyDay);
    await AddSchedule(byDate == true ? requestBodyDate : requestBodyDay)
      .then((response) => {
        console.log(response);
        inAwait();
        setUser(false);
      })
      .catch((e) => {
        console.log("error", e.response);
      });
  };
  const postDataByDay = async (e) => {
    e.preventDefault();

    var requestBody = {
      "employeeId": employeeName,
      "schedule_type": "by_days",
      "schedule": scheduleName,
      "days": {
        "home_schedule": valuesDayHome,
        "work_schedule": valuesDayWork
      }

    }
    console.log(requestBody);
    // await AddSchedule(requestBody)
    //   .then((response) => {
    //     console.log(response);
    //     inAwait();
    //     setUser(false);
    //   })
    //   .catch((e) => {
    //     console.log("error", e.response);
    //   });
  };

  const detail = async (e) => {
    console.log(e)
    await DetailSchedule(e)
      .then((response) => {
        setDetailSchedule(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log("error", e.response);
      });
  }

  const [a, setA] = useState()
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
          <div className="flex gap-2">
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
          <div className="d-flex">
            <TextFieldSearch />
            <div className="mx-2"></div>
            {role != "user" ? (
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
            ) : null}
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
              <th onClick={() => { }}>
                Employee Name <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => { }} className="text-center">
                Detail Schedule <ImportExport fontSize="2px" />
              </th>
              {/* <th onClick={() => { }} className="text-end">
                Action <ImportExport fontSize="2px" />
              </th> */}
            </tr>
          </thead>
          <tbody>
            {schedules?.length > 0 ? (
              schedules.map((schedule, index) => (
                <tr key={index}>
                  <td className="align-middle">
                    {schedule?.employee?.firstName}{" "}
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => {
                        setDetailUser(!dialogDetailUser)
                        detail(schedule.id)
                      }}
                      className="btn btn-sm mx-1"
                      style={{
                        backgroundColor: "#CEDFEA",
                        borderRadius: "8px",
                      }}
                    >
                      <VisibilityOutlined fontSize="10px" />
                    </button></td>
                  {/* <td className="p-2 flex items-center justify-end">
                    <button
                      // onClick={() => {
                      //   navigate(`/news/edit/${val.id}`);
                      // }}
                      className="btn btn-sm mx-1"
                      style={{
                        backgroundColor: "#CEDFEA",
                        borderRadius: "8px",
                      }}
                    >
                      <EditOutlined fontSize="10px" />
                    </button>
                    <button
                      onClick={() => {
                        setId(schedule.id);
                        setDelete(true);
                      }}
                      className="btn btn-sm mx-1"
                      style={{
                        backgroundColor: "#CEDFEA",
                        borderRadius: "8px",
                      }}
                    >
                      <DeleteOutline fontSize="10px" />
                    </button>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>
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
              schedule: scheduleName,
            };
            console.log(requestBody);
            var res = await AddSchedule(requestBody)
              .then((response) => {
                console.log(response);
                setUser(!dialogUser);
                setErrorMsg("");
                SwalSuccess({ message: "Success add schedule" });
                inAwait();
              })
              .catch((e) => {
                console.log(e.response);
                // if (e.response) {
                //   setMsg(e.response.data.message);
                // }
              });
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
                      setEmployeeName(val.value,)
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
                <select
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                  onChange={(e) => setScheduleName(e.target.value)}
                >
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
              <div className="w-full mt-3">
                <div>
                  <div className="d-flex gap-2 mb-2">
                    <input
                      required
                      className=""
                      type="radio"
                      name="schedule"
                      id="byDate"
                      // onChange={() => setAsignTo(databyDate)}
                      onClick={() => {
                        setByDate((prev) => !prev);
                        setByDay(false);
                      }}
                    />
                    <label for="byDate">By Date</label>
                  </div>
                  {byDate && (
                    <div className="ml-5 my-2">
                      <DatePicker
                        multiple
                        onChange={setValues}
                        plugins={[
                          <DatePanel />
                        ]}
                      />
                    </div>
                  )}
                  <div className="d-flex gap-2 mb-2">
                    <input
                      required
                      className=""
                      type="radio"
                      name="schedule"
                      id="byDay"
                      // onChange={() => setAsignTo(dataByDay)}
                      onClick={() => {
                        setByDay((prev) => !prev);
                        setByDate(false);
                      }}
                    />
                    <label for="ByDay">By Day</label>
                  </div>
                  {byDay && (
                    <div className="flex gap-2 ml-5 my-2">
                      <div className="w-full">
                        <label className="mb-1">
                          Home Schedule
                        </label>
                        <Select
                          isLoading={true}
                          onChange={(e) => {
                            var data = [];
                            for (var i in e) {
                              data.push(e[i].value);
                            }
                            setValuesDayHome(data)
                          }
                          }
                          isMulti
                          isFocused="appearance-none border-0 outline-0"
                          className="appearance-none"
                          classNamePrefix="appearance-none active:outline-0 active:border-0 focus:outline-0 focus:border-0 focus:shadow-outline"
                          options={day.map((val) => {
                            return {
                              value: val.value,
                              label: val.label,
                            };
                          })} />
                      </div>
                      <div className="w-full">
                        <label className="mb-1">
                          Work Schedule
                        </label>
                        <Select
                          isLoading={true}
                          onChange={(e) => {
                            var data = [];
                            for (var i in e) {
                              data.push(e[i].value);
                            }
                            setValuesDayWork(data)
                          }
                          }
                          isMulti
                          isFocused="appearance-none border-0 outline-0"
                          className="appearance-none"
                          classNamePrefix="appearance-none active:outline-0 active:border-0 focus:outline-0 focus:border-0 focus:shadow-outline"
                          options={day.map((val) => {
                            return {
                              value: val.value,
                              label: val.label,
                            };
                          })} />
                      </div>
                    </div>
                  )}
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
              onClick={postData}
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
          <Modal.Title>Detail Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4 mb-4 space-y-3">
          <div className="grid grid-cols-4">
            <p className="">Employee Name</p>
            <p className="col-span-3">: {detailSchedule.employee ? detailSchedule.employee.firstName : "-"}</p>
          </div>
          <div className="grid grid-cols-4">
            <p className="">Schedule</p>
            <p className="col-span-3 capitalize">: {detailSchedule.schedule_type ? detailSchedule.schedule_type.replace("_", " ") : "-"}</p>
          </div>
          {/* {console.log("parse", detailSchedule.days.replace(/\\/g, ""))} */}
          {detailSchedule.schedule_type == "by_day" ?
            <>
              {console.log(JSON.parse(detailSchedule.days.replace(/\\/g, "")))}
              <div className="grid grid-cols-4">
                <p className="">Home Shedule</p>
                <p className="col-span-3 capitalize">: {JSON.parse(detailSchedule.days.replace(/\\/g, "")).home_schedule.map((val) => val.toString()+", ")}</p>
              </div>
              <div className="grid grid-cols-4">
                <p className="">Office Schedule</p>
                <p className="col-span-3 capitalize">: {JSON.parse(detailSchedule.days.replace(/\\/g, "")).work_schedule.map((val) => val.toString()+", ")}</p>
              </div>
              {/* <Table
                borderless
                responsive
                style={{ color: "#00000070", fontSize: "0.75rem" }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#F6F6F6" }}>
                    <th onClick={() => { }} className="text-center">
                      Home Schedule
                    </th>
                    <th onClick={() => { }} className="text-center">
                      Work Schedule
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">
                      Monday
                    </td>
                    <td className="text-center">
                      Monday
                    </td>
                  </tr>
                </tbody>
              </Table> */}
            </> : null
          }
          {detailSchedule.schedule_type == "by_date" ?
            <div className="grid grid-cols-4">
              <p className="">date</p>
              <p className="col-span-3 capitalize">: {detailSchedule.dates ? detailSchedule.dates.map((val, index) => val + ", ") : "-"}</p>
            </div> : null}
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
