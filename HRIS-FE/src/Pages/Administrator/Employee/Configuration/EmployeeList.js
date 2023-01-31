import { Button, Pagination, PaginationItem } from "@mui/material";
import { React, useEffect, useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { Modal, Table } from "react-bootstrap";
import profile from "../../../../Resourse/img/default-profile.png";
import {
  AddEmployee,
  DeleteEmployee,
  filterEmployee,
  GetEmployee,
  GetEmployeeName,
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
import {
  ArrowLeft,
  ArrowRight,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import * as XLSX from "xlsx";

function EmployeeList() {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalFilter, setModalFilter] = useState(false);
  const [show, setShow] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [jobTitle, setJobTitle] = useState([]);
  const [employeeStatus, setEmployeeStatus] = useState([]);
  const [ename, setEName] = useState([]);
  const [jobGrade, setJobGrade] = useState([]);
  const [jobLevel, setJobLevel] = useState([]);
  const [jobPosition, setJobPosition] = useState([]);
  const [isdelete, setDelete] = useState(false);
  const [id, setId] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [controller, setController] = useState({});
  const [profilePict, setProfilePict] = useState(null);
  var [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [allPages, setAllPages] = useState([]);
  const navigate = useNavigate();

  const inAwait = async () => {
    var dataEmployees = await GetEmployee({ page: 1, size: 25 });
    var _jobTitle = await GetJobTittle();
    var _employeeStatus = await GetEmployeeStatus();
    var _jobGrade = await GetJobGrade();
    var _jobLevel = await GetJobLevel();
    var _jobPosition = await GetJobPosition();
    var _employname = await GetEmployeeName();
    // console.log(_employname);
    setJobPosition(_jobPosition["result"]);
    setJobLevel(_jobLevel);
    setJobGrade(_jobGrade);
    setJobTitle(_jobTitle);
    setEmployeeStatus(_employeeStatus);
    setEmployees(dataEmployees.requests);
    setTotalItems(dataEmployees.totalItems);
    setCurrentPage(dataEmployees?.currentPage);
    setTotalPage(dataEmployees.totalPages - 1);
    setEName(_employname);
    console.log(dataEmployees);
    var pageList = [];
    for (let i = 1; i <= dataEmployees.totalPages; i++) {
      pageList.push(i);
    }
    setAllPages(pageList);
  };

  useEffect(() => {
    inAwait();
  }, []);

  const onEdit = (data) => {
    const params = {
      id: data.id,
      relation_code_id: data.relation_code_id,
    };
    navigate("/profile-employee", {
      state: params,
    });
  };

  const exportExcel = async () => {
    if (employees.length > 0) {
      var wb = XLSX.utils.book_new();
      var data = [];

      await employees.map((app) => {
        data.push({
          "Full Name": app.firstName,
          NIK: app.npwp,
          NPWP: app.npwp,
          Email: app.email,
          "Joined Date": app.joinDate,
          Status: app?.employeestatus?.name,
          "Job Grade": app?.jobgrade?.name,
          "Job Level": app?.joblevel?.name,
          "Job Title": app?.jobtitle?.name,
          "Job Position": app?.jobposition?.name,
          Location: app.location,
          Gender: app.gender,
          Nationality: app.nationality_id,
          "Birth Date": app.birthDate,
          "Marital Status": app.maritalStatus,
          "Driver Lisence": app.driverLicence,
          "Driver Lisence Expiry": app.licenceExpire,
          Street: app.street,
          City: app.city,
          Province: app.province,
          "Postal Code": app.postalCode,
          Country: app.country,
          Religion: app.religion,
          "Phone Number": app.phone,
          "Start Contract": app.contractStart,
          "End Contract": app.contractEnd,
        });
      });

      var ws = XLSX.utils.json_to_sheet(data);

      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

      XLSX.writeFile(wb, `Employee List.xlsx`);
      console.log("Exported excel!");
    } else {
      alert("Data masih kosong");
    }
  };

  const previousPage = async () => {
    setCurrentPage((current) => current - 1);
    if (currentPage == 1) {
      setCurrentPage(1);
    }
    const getEmployees = await GetEmployee({ page: currentPage, size: 25 });
    setEmployees(getEmployees.requests);
  };

  const nextPage = async () => {
    setCurrentPage((current) => current + 1);
    if (currentPage == totalPage) {
      setCurrentPage(1);
    }
    const getEmployees = await GetEmployee({ page: currentPage, size: 25 });
    setEmployees(getEmployees.requests);
  };

  const changePage = async (value, index) => {
    const dataEmployees = await GetEmployee({ page: index, size: 25 });
    setEmployees(dataEmployees.requests);
    setTotalItems(dataEmployees.totalItems);
    setTotalPage(dataEmployees.totalPages - 1);
    currentPage = dataEmployees?.currentPage;
    var pageList = [];
    for (let i = 1; i <= dataEmployees.totalPages; i++) {
      pageList.push(i);
    }
    setAllPages(pageList);
  };

  const searchEmp = async (keyword) => {
    try {
      const search = await SearchEmployee(keyword);
      setEmployees(search.requests);
      setTotalPage(search.totalPages - 1);
      setTotalItems(search.totalItems);
    } catch (error) {
      console.log(error);
    }
  };

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
          <div className="flex gap-3">
            <button
              className="flex-row gap-2 bg-white hover:bg-[#003049] text-[#003049] border border-gray-200 flex items-center p-2 rounded-md"
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
                placeholder="Search by Name"
                onChange={(e) => searchEmp(e.target.value)}
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
          <Table
            borderless
            responsive
            style={{ color: "#00000070", fontSize: "0.75rem" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#EBF7FF" }}>
                <th className="truncate" 
                style={{ maxWidth: "50px" }}
                >
                Job Position
                </th>
                <th>Name</th>
                {/* <th>Job Title</th> */}
                <th>Employee Status</th>
                <th>Supervisor</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr>
                  <td
                    className="align-middle truncate"
                    style={{ maxWidth: "30px" }}
                  >
                    {employee.position_id != null ||
                    employee.position_id != undefined
                      ? employee.position_id
                      : employee?.jobposition?.job_id}
                  </td>
                  <td className="align-middle ">{employee.firstName}</td>
                  {/* <td className="align-middle ">{employee.jobtitle?.name}</td> */}
                  <td className="align-middle ">
                    {employee.employeestatus?.name}
                  </td>
                  <td className="align-middle ">{employee.otherId}</td>
                  <td className="align-middle">
                    <div className="flex flex-row gap-3">
                      <button
                        onClick={() => {
                          setDelete(true);
                          setId(employee.id);
                        }}
                        className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                      >
                        <TrashIcon className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => {
                          onEdit(employee);
                        }}
                        className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                      >
                        <PencilIcon className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <div className="bg-[#FBFBFB] mt-0 px-4 py-3 rounded-b-xl d-flex align-items-center justify-content-between ">
        <div>
          <h6 className="text-[#A098AE] text-[10px]">
            Showing <span className="text-[#0E5073]">{employees?.length}</span>{" "}
            from <span className="text-[#0E5073]">{totalItems}</span> data
          </h6>
        </div>
        <div class="d-flex justify-content-center">
          {/* <button className="btn btn-sm" onClick={() => previousPage()}>
            <KeyboardArrowLeft />
          </button> */}
          <Pagination 
            count={totalPage} 
            onChange={changePage} 
            siblingCount={1}
            renderItem={(item) => (
              <PaginationItem
                className="btn p-2 bg-[#78000010] text-[10px] rounded-md text-[#780000]"
                slots={{ previous: <KeyboardArrowLeft />, next: <KeyboardArrowRight />}}
                {...item}
              />
            )}
          />
          {/* {allPages.map((page) => (
            <button
              onClick={() => changePage(page)}
              className="btn mx-2 bg-[#78000010] text-[10px] rounded-md text-[#780000]"
            >
              {page}
            </button>
          ))} */}
          {/* <button className="btn btn-sm" onClick={() => nextPage()}>
            <KeyboardArrowRight />
          </button> */}
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
              if (
                (error.response.data.message =
                  "ErrorTypeError: Cannot read property 'employees' of null")
              ) {
                inAwait();
                setModalAdd(false);
                setErrorMsg("");
                setController({});
                SwalSuccess({ message: "Success add employee" });
                setProfilePict(null);
                return true;
              } else {
                setErrorMsg(error.response.data.message);
              }
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
              <select
                id="supervisor"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option hidden>--Select--</option>
                {ename.map((e, i) => {
                  return <option value={e.firstName}>{e.firstName}</option>;
                })}
              </select>
            </div>
            <div className="w-full">
              <label className="text-xs">Employee Status</label>
              <select
                id="employeestatus"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option hidden>--Select--</option>
                {employeeStatus.map((e, i) => {
                  return <option value={e.name}>{e.name}</option>;
                })}
              </select>
            </div>
            {/* <div className="w-full">
              <label className="text-xs">Sub Units</label>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option hidden>--Select--</option>
              </select>
            </div> */}
          </div>
        </Modal.Body>
        <Modal.Footer className="m-4">
          <button
            onClick={async () => {
              await inAwait();
              setModalFilter(false);
            }}
            type="button"
            className="text-[#003049] bg-gray-200 hover:bg-gray-300 font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-gray-200 dark:hover:bg-gray-300 focus:outline-none"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={async () => {
              var requestBody = {
                // jobtitle: document.getElementById("jobtitle").value,
                supervisor: document.getElementById("supervisor").value,
                employeestatus: document.getElementById("employeestatus").value,
              };

              var res = await filterEmployee(requestBody);
              console.log(res)
              setEmployees(res.requests);
              setTotalPage(res.totalPages - 1);
              setTotalItems(res.totalItems);
              var pageList = [];
              for (let i = 1; i <= res.totalPages; i++) {
                pageList.push(i);
              }
              setAllPages(pageList);
              setModalFilter(false);
            }}
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
