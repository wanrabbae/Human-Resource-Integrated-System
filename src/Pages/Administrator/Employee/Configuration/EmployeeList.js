import { Button } from "@mui/material";
import { React, useEffect, useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { Modal, Table } from "react-bootstrap";
import profile from "../../../../Resourse/img/default-profile.png";
import {
  AddEmployee,
  DeleteEmployee,
  GetEmployee,
  SearchEmployee,
  UpdateEmployee,
} from "../../../../Repository/EmployeeRepository";
import {
  AddUser,
  GetEmployeeStatus,
  GetJobGrade,
  GetJobLevel,
  GetJobPosition,
  GetJobTittle,
} from "../../../../Repository/AdminRepository";
import { ModalDelete, SwalSuccess } from "../../../../Components/Modals";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

function EmployeeList() {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalFilter, setModalFilter] = useState(false);
  const [show, setShow] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [jobTitle, setJobTitle] = useState([]);
  const [employeeStatus, setEmployeeStatus] = useState([]);
  const [jobGrade, setJobGrade] = useState([]);
  const [jobLevel, setJobLevel] = useState([]);
  const [jobPosition, setJobPosition] = useState([]);
  const [isdelete, setDelete] = useState(false);
  const [id, setId] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [controller, setController] = useState({});
  const [profilePict, setProfilePict] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const navigate = useNavigate();
  let allPages = [];

  const inAwait = async () => {
    var dataEmployees = await GetEmployee({ page: 1, size: 10 });
    var _jobTitle = await GetJobTittle();
    var _employeeStatus = await GetEmployeeStatus();
    var _jobGrade = await GetJobGrade();
    var _jobLevel = await GetJobLevel();
    var _jobPosition = await GetJobPosition();
    // console.log(_jobPosition);
    setJobPosition(_jobPosition["result"]);
    setJobLevel(_jobLevel);
    setJobGrade(_jobGrade);
    setJobTitle(_jobTitle);
    setEmployeeStatus(_employeeStatus);
    setEmployees(dataEmployees.requests);
    setTotalItems(dataEmployees.totalItems);
    setTotalPage(dataEmployees.totalPages);
  };

  useEffect(() => {
    inAwait();
  }, []);

  const onEdit = (data) => {
    const params = {
      id: data,
    };
    navigate("/profile-employee", {
      state: params,
    });
  };

  const previousPage = async () => {
    setCurrentPage((current) => current - 1);
    if (currentPage == 1) {
      setCurrentPage(1);
    }
    const getEmployees = await GetEmployee({ page: currentPage, size: 10 });
    setEmployees(getEmployees.requests);
  };

  const nextPage = async () => {
    setCurrentPage((current) => current + 1);
    if (currentPage == totalPage) {
      setCurrentPage(1);
    }
    const getEmployees = await GetEmployee({ page: currentPage, size: 10 });
    setEmployees(getEmployees.requests);
  };

  const changePage = async (value) => {
    const getEmployees = await GetEmployee({ page: value, size: 10 });
    setEmployees(getEmployees.requests);
  };

  const searchEmp = async (keyword) => {
    try {
      const search = await SearchEmployee(keyword);
      setEmployees(search.requests);
      setTotalPage(search.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  for (let i = 0; i < totalPage; i++) {
    allPages.push(i + 1);
  }

  return (
    <>
      <div className="bg-white p-3 rounded-t-lg space-y-5">
        <div>
          <h1>List of Employee</h1>
          <p className="text-xs text-gray-400">
            list of employees in the company
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <button
            className="flex flex-row gap-2 bg-white hover:bg-[#003049] text-[#003049] border border-gray-200 flex items-center p-2 rounded-md"
            onClick={() => setModalFilter(true)}
          >
            <svg
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
          <div className="flex flex-row gap-2">
            <div className="flex flex-row rounded-lg bg-gray-50 border border-gray-300 mt-1">
              <div className="flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="text-sm appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none focus:ring-transparent"
                placeholder="Search by Employee Name or Employee ID..."
                onChange={(e) => searchEmp(e)}
              />
            </div>
            <button
              className="bg-[#0E5073] hover:bg-[#003049] text-white flex items-center px-2 py-1 rounded-md"
              onClick={() => {
                setController({
                  image: "",
                  firstName: "",
                  joinDate: "",
                  jobtitle_id: "",
                  employeestatus_id: "",
                  jobgrade_id: "",
                  joblevel_id: "",
                  jobposition_id: "",
                  location: "",
                  otherId: "",
                  username: "",
                  password: "",
                  confirm: "",
                  status: null,
                });
                setModalAdd(true);
              }}
            >
              <PlusIcon className="text-white 5 w-5" aria-hidden="true" /> Add
              Employee
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  id
                </th>
                <th scope="col" className="py-3 px-6 w-72 turncate">
                  Name
                </th>
                <th scope="col" className="py-3 px-6 w-96 turncate">
                  job title
                </th>
                <th scope="col" className="py-3 px-6 w-96">
                  employee status
                </th>
                <th scope="col" className="py-3 px-6">
                  supervisor
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {employee.id}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {employee.firstName}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {employee.jobtitle?.name}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {employee.employeestatus?.name}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {employee.otherId}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-row justify-end gap-3">
                      <button
                        onClick={() => {
                          setDelete(true);
                          setId(employee.id);
                        }}
                        className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                      >
                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => {
                          onEdit(employee.id);
                        }}
                        className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                      >
                        <PencilIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-[#FBFBFB] mt-0 px-4 py-3 rounded-b-xl d-flex align-items-center justify-content-between ">
        <div>
          <h6 className="text-[#A098AE]">
            Showing <span className="text-[#0E5073]">{employees?.length}</span>{" "}
            from <span className="text-[#0E5073]">{totalItems}</span> data
          </h6>
        </div>
        <div>
          <button className="btn btn-sm" onClick={() => previousPage()}>
            <ArrowLeft />
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
      {/* Modal Add */}
      <Modal
        show={modalAdd}
        size="lg"
        onHide={() => {
          setModalAdd(false);
          setController({});
          setProfilePict(null);
        }}
      >
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Add Employee
          </Modal.Title>
        </Modal.Header>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              var formData = new FormData();
              formData.append("image", controller.image);
              formData.append("firstName", controller.firstName);
              formData.append("lastName", "");
              formData.append("employeeId", "GENERATE001");
              formData.append("joinedDate", controller.joinDate);
              formData.append("jobtitle_id", controller.jobtitle_id);
              formData.append(
                "employeestatus_id",
                controller.employeestatus_id
              );
              formData.append("jobgrade_id", controller.jobgrade_id);
              formData.append("joblevel_id", controller.joblevel_id);
              formData.append("jobposition_id", controller.jobposition_id);
              formData.append("location", controller.location);

              if (show) {
                if (controller.confirm != controller.password) {
                  setErrorMsg("Confirmation password did not match!");
                  return false;
                }

                formData.append("createUser", true);
                formData.append("username", controller.username);
                formData.append("password", controller.password);
                formData.append("status", controller.status);

                // await AddUser({
                //   role: "user",
                //   employee_id: data.data.id, //BELUM
                //   status: controller.status,
                //   username: controller.username,
                //   password: controller.password,
                //   location: controller.location,
                // });
              }

              var data = await AddEmployee(formData);

              if (data.message == "Success") {
                await inAwait();
                setModalAdd(false);
                setErrorMsg("");
                setController({});
                SwalSuccess({ message: "Success add employee" });
                setProfilePict(null);
              }
            } catch (error) {
              setErrorMsg(error.response.data.message);
            }
          }}
        >
          <Modal.Body className="mx-4">
            <div>
              <label htmlFor="imagePicker">
                <img
                  src={profilePict ?? profile}
                  className="rounded-full w-20 h-20"
                  style={{ objectFit: "fill" }}
                ></img>
              </label>
              <input
                type="file"
                id="imagePicker"
                multiple={false}
                hidden
                onChange={(val) => {
                  var url = URL.createObjectURL(val.currentTarget.files[0]);
                  setProfilePict(url);
                  setController({
                    ...controller,
                    image: val.currentTarget.files[0],
                  });
                }}
              />
            </div>
            <div>
              <div className="w-full">
                <label className="text-xs">Employee Full Name</label>
                <input
                  onChange={(val) => {
                    setController({
                      ...controller,
                      firstName: val.target.value,
                    });
                  }}
                  value={controller?.firstName}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  placeholder="Full Name"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="w-full">
                <label className="text-xs">Employee ID</label>
                <input
                  readOnly
                  onChange={(val) => {}}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  placeholder=""
                  // readOnly
                />
              </div>
              <div className="w-full">
                <label className="text-xs">Joined Date</label>
                <input
                  required
                  onChange={(val) => {
                    setController({
                      ...controller,
                      joinDate: val.target.value,
                    });
                  }}
                  value={controller.joinDate}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="date"
                  placeholder=""
                />
              </div>
              <div className="w-full">
                <label className="text-xs">Employee Status</label>
                <select
                  required
                  onChange={(val) =>
                    setController({
                      ...controller,
                      employeestatus_id: val.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option hidden value="">
                    --Select--
                  </option>
                  {employeeStatus.map((e, i) => {
                    return <option value={e.id}>{e.name}</option>;
                  })}
                </select>
              </div>
              <div className="w-full">
                <label className="text-xs">Job Grade</label>
                <select
                  required
                  onChange={(val) =>
                    setController({
                      ...controller,
                      jobgrade_id: val.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option hidden value="">
                    --Select--
                  </option>
                  {jobGrade.map((e, i) => {
                    return <option value={e.id}>{e.name}</option>;
                  })}
                </select>
              </div>
              <div className="w-full">
                <label className="text-xs">Job Level</label>
                <select
                  required
                  onChange={(val) =>
                    setController({
                      ...controller,
                      joblevel_id: val.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option hidden value="">
                    --Select--
                  </option>
                  {jobLevel.map((e, i) => {
                    return <option value={e.id}>{e.name}</option>;
                  })}
                </select>
              </div>
              <div className="w-full">
                <label className="text-xs">Job Title</label>
                <select
                  required
                  onChange={(val) =>
                    setController({
                      ...controller,
                      jobtitle_id: val.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option hidden value="">
                    --Select--
                  </option>
                  {jobTitle.map((e, i) => {
                    return <option value={e.id}>{e.name}</option>;
                  })}
                </select>
              </div>
              <div className="w-full">
                <label className="text-xs">Job Position</label>
                <select
                  required
                  onChange={(val) =>
                    setController({
                      ...controller,
                      jobposition_id: val.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option hidden value="">
                    --Select--
                  </option>
                  {jobPosition.map((e, i) => {
                    return <option value={e.id}>{e?.name}</option>;
                  })}
                </select>
              </div>
              <div className="w-full"></div>
              <div className="w-full">
                <label className="text-xs">Location</label>
                <input
                  required
                  onChange={(val) =>
                    setController({ ...controller, location: val.target.value })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  placeholder="ex : California"
                />
              </div>
            </div>
            <div className="mt-3">
              <label
                for="default-toggle"
                className="inline-flex relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  value=""
                  id="default-toggle"
                  className="sr-only peer"
                  onClick={() => {
                    setShow((prev) => !prev);
                    setController({
                      ...controller,
                      username: "",
                      password: "",
                      confirm: "",
                      status: null,
                    });
                  }}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Create Login Details
                </span>
              </label>
            </div>
            {show && (
              <div className="mt-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="w-full">
                    <label className="text-xs">Username</label>
                    <input
                      required={show}
                      value={controller.username}
                      onChange={(val) =>
                        setController({
                          ...controller,
                          username: val.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="w-full">
                    <label className="text-xs">Password</label>
                    <input
                      required={show}
                      value={controller.password}
                      onChange={(val) =>
                        setController({
                          ...controller,
                          password: val.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="password"
                      placeholder=""
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-xs">Confirm Password</label>
                    <input
                      required={show}
                      value={controller.confirm}
                      onChange={(val) =>
                        setController({
                          ...controller,
                          confirm: val.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="password"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-3">
                  <label className="text-xs">Status</label>
                  <div className="flex flex-row gap-5">
                    <div className="flex items-center mb-4">
                      <input
                        id="default-radio-1"
                        type="radio"
                        value={"Enable"}
                        onChange={(val) =>
                          setController({
                            ...controller,
                            status: val.target.value,
                          })
                        }
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        for="default-radio-1"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Enable
                      </label>
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        id="default-radio-2"
                        type="radio"
                        onChange={(val) =>
                          setController({
                            ...controller,
                            status: val.target.value,
                          })
                        }
                        value={"Disable"}
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        for="default-radio-2"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Disable
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <p className={"text-danger text-sm"}>{errorMsg}</p>
          </Modal.Body>
          <Modal.Footer className="m-4">
            <button
              onClick={() => {
                setModalAdd(false);
                setController({});
                setProfilePict(null);
              }}
              type="button"
              className="text-[#003049] bg-gray-200 hover:bg-gray-300 font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-gray-200 dark:hover:bg-gray-300 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-white bg-[#0E5073] hover:bg-[#003049] font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-[#0E5073] dark:hover:bg-[#003049] focus:outline-none"
            >
              Create
            </button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* Modal Update */}
      <Modal
        show={modalUpdate}
        size="lg"
        onHide={() => {
          setModalUpdate(false);
          setController({});
          setProfilePict(null);
        }}
      >
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Update Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div>
            <label htmlFor="imagePicker">
              <img
                src={profilePict ?? profile}
                className="rounded-full w-20 h-20"
                style={{ objectFit: "fill" }}
              ></img>
            </label>
            <input
              type="file"
              id="imagePicker"
              multiple={false}
              hidden
              onChange={(val) => {
                var url = URL.createObjectURL(val.currentTarget.files[0]);
                setProfilePict(url);
                setController({
                  ...controller,
                  image: val.currentTarget.files[0],
                });
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="w-full">
              <label className="text-xs">Employee Full Name</label>
              <input
                onChange={(val) => {
                  setController({ ...controller, firstName: val.target.value });
                }}
                value={controller?.firstName}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="First Name"
              />
            </div>
            <div className="w-full">
              <label className="text-xs"></label>
              <input
                onChange={(val) => {}}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="Last Name"
              />
            </div>
            <div className="w-full">
              <label className="text-xs">Employee ID</label>
              <input
                readOnly
                onChange={(val) => {}}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder=""
                // readOnly
              />
            </div>
            <div className="w-full">
              <label className="text-xs">Joined Date</label>
              <input
                onChange={(val) => {
                  setController({ ...controller, joinDate: val.target.value });
                }}
                value={controller.joinDate}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="date"
                placeholder=""
              />
            </div>
            <div className="w-full">
              <label className="text-xs">Employee Status</label>
              <select
                onChange={(val) =>
                  setController({
                    ...controller,
                    employeestatus_id: val.target.value,
                  })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option hidden>--Select--</option>
                {employeeStatus.map((e, i) => {
                  return (
                    <option
                      selected={
                        controller.employeestatus_id == e.id ? true : false
                      }
                      value={e.id}
                    >
                      {e.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-full">
              <label className="text-xs">Job Grade</label>
              <select
                onChange={(val) =>
                  setController({
                    ...controller,
                    jobgrade_id: val.target.value,
                  })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option hidden>--Select--</option>
                {jobGrade.map((e, i) => {
                  return (
                    <option
                      selected={controller.jobgrade_id == e.id ? true : false}
                      value={e.id}
                    >
                      {e.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-full">
              <label className="text-xs">Job Level</label>
              <select
                onChange={(val) =>
                  setController({
                    ...controller,
                    joblevel_id: val.target.value,
                  })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option hidden>--Select--</option>
                {jobLevel.map((e, i) => {
                  return (
                    <option
                      selected={controller.joblevel_id == e.id ? true : false}
                      value={e.id}
                    >
                      {e.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-full">
              <label className="text-xs">Job Title</label>
              <select
                onChange={(val) =>
                  setController({
                    ...controller,
                    jobtitle_id: val.target.value,
                  })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option hidden>--Select--</option>
                {jobTitle.map((e, i) => {
                  return (
                    <option
                      selected={controller.jobtitle_id == e.id ? true : false}
                      value={e.id}
                    >
                      {e.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-full">
              <label className="text-xs">Job Position</label>
              <select
                onChange={(val) =>
                  setController({
                    ...controller,
                    jobposition_id: val.target.value,
                  })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option hidden>--Select--</option>
                {jobPosition.map((e, i) => {
                  return (
                    <option
                      selected={
                        controller.jobposition_id == e.id ? true : false
                      }
                      value={e.id}
                    >
                      {e?.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-full"></div>
            <div className="w-full">
              <label className="text-xs">Location</label>
              <input
                value={controller.location}
                onChange={(val) =>
                  setController({ ...controller, location: val.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="ex : California"
              />
            </div>
          </div>
          <div className="mt-3">
            <label
              for="default-toggle"
              className="inline-flex relative items-center cursor-pointer"
            >
              <input
                type="checkbox"
                value=""
                id="default-toggle"
                className="sr-only peer"
                onClick={() => {
                  setShow((prev) => !prev);
                  setController({
                    ...controller,
                    username: "",
                    password: "",
                    confirm: "",
                    status: null,
                  });
                }}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Create Login Details
              </span>
            </label>
          </div>
          {show && (
            <div className="mt-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="w-full">
                  <label className="text-xs">Username</label>
                  <input
                    value={controller.username}
                    onChange={(val) =>
                      setController({
                        ...controller,
                        username: val.target.value,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="w-full">
                  <label className="text-xs">Password</label>
                  <input
                    value={controller.password}
                    onChange={(val) =>
                      setController({
                        ...controller,
                        password: val.target.value,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    placeholder=""
                  />
                </div>
                <div className="w-full">
                  <label className="text-xs">Confirm Password</label>
                  <input
                    value={controller.confirm}
                    onChange={(val) =>
                      setController({
                        ...controller,
                        confirm: val.target.value,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-3">
                <label className="text-xs">Status</label>
                <div className="flex flex-row gap-5">
                  <div className="flex items-center mb-4">
                    <input
                      id="default-radio-1"
                      type="radio"
                      value={true}
                      onChange={(val) =>
                        setController({
                          ...controller,
                          status: val.target.value,
                        })
                      }
                      name="default-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="default-radio-1"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Enable
                    </label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      id="default-radio-2"
                      type="radio"
                      onChange={(val) =>
                        setController({
                          ...controller,
                          status: val.target.value,
                        })
                      }
                      value={false}
                      name="default-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="default-radio-2"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Disable
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="m-4">
          <button
            onClick={() => {
              setModalUpdate(false);
              setController({});
              setProfilePict(null);
            }}
            type="button"
            className="text-[#003049] bg-gray-200 hover:bg-gray-300 font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-gray-200 dark:hover:bg-gray-300 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              var formData = new FormData();
              formData.append("id", controller.id);
              formData.append("image", controller.image);
              formData.append("firstName", controller.firstName);
              formData.append("lastName", "");
              formData.append("employeeId", "GENERATE001");
              formData.append("joinDate", controller.joinDate);
              formData.append("jobtitle_id", controller.jobtitle_id);
              formData.append(
                "employeestatus_id",
                controller.employeestatus_id
              );
              formData.append("jobgrade_id", controller.jobgrade_id);
              formData.append("joblevel_id", controller.joblevel_id);
              formData.append("jobposition_id", controller.jobposition_id);
              formData.append("location", controller.location);

              // console.log(controller);
              var data = await UpdateEmployee(formData);
              if (data.message == "Success update employee") {
                alert("Update employee has been success");
                await inAwait();
                setModalUpdate(false);
                setController({});
                setProfilePict(null);
              }
            }}
            type="button"
            className="text-white bg-[#0E5073] hover:bg-[#003049] font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-[#0E5073] dark:hover:bg-[#003049] focus:outline-none"
          >
            Update
          </button>
        </Modal.Footer>
      </Modal>

      {/* Modal Filter */}
      <Modal show={modalFilter} size="lg" onHide={() => setModalFilter(false)}>
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Employee Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="w-full">
              <label className="text-xs">supervisor</label>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option hidden>--Select--</option>
              </select>
            </div>
            <div className="w-full">
              <label className="text-xs">Job Title</label>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option hidden>--Select--</option>
              </select>
            </div>
            <div className="w-full">
              <label className="text-xs">Employee Status</label>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option hidden>--Select--</option>
              </select>
            </div>
            <div className="w-full">
              <label className="text-xs">Sub Units</label>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option hidden>--Select--</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="m-4">
          <button
            // onClick={() => setModalFilter(false)}
            type="button"
            className="text-[#003049] bg-gray-200 hover:bg-gray-300 font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-gray-200 dark:hover:bg-gray-300 focus:outline-none"
          >
            Clear
          </button>
          <button
            type="button"
            className="text-white bg-[#0E5073] hover:bg-[#003049] font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-[#0E5073] dark:hover:bg-[#003049] focus:outline-none"
          >
            Search
          </button>
        </Modal.Footer>
      </Modal>
      <ModalDelete
        close={() => {
          setDelete(false);
        }}
        submit={() => {
          DeleteEmployee(id);
          inAwait();
          setDelete(false);
          SwalSuccess({ message: "Success delete employee" });
        }}
        active={isdelete}
      />
    </>
  );
}

export default EmployeeList;
