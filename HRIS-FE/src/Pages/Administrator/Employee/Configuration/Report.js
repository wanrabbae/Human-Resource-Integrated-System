import { Button } from "@mui/material";
import { React, useEffect, useState } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  DocumentIcon,
  XIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { Modal, Table } from "react-bootstrap";
import profile from "../../../../Resourse/img/default-profile.png";
import {
  ModalDelete,
  SwalError,
  SwalSuccess,
} from "../../../../Components/Modals";
import {
  GetReport,
  AddReport,
  UpdateReport,
  DeleteReport,
  GetEmployee,
  GetEmployeeName,
  SearchReport,
} from "../../../../Repository/EmployeeRepository.js";
import { ReportSharp } from "@mui/icons-material";
import {
  GetEmployeeStatus,
  GetJobGrade,
} from "../../../../Repository/AdminRepository";
import { GetEducation } from "../../../../Repository/EducationRepository";
import { useNavigate } from "react-router-dom";

function Report() {
  const [reports, setReports] = useState([]);
  const [addReport, setAddReport] = useState({});
  const [editReport, setEditReport] = useState({});
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [isdelete, setDelete] = useState(false);
  const [id, setId] = useState();
  const navigate = useNavigate();
  const [criteriaType, setCriteriaType] = useState("");
  const [dataCriteria, setDataCriteria] = useState([]);
  const [showCriteria, setShowCriteria] = useState(false);

  const inAwait = async () => {
    var data = await GetReport();
    setReports(data.result);
  };

  const postReport = async (e) => {
    e.preventDefault();
    const add = await AddReport(addReport);
    if (add.message == "Success Create") {
      SwalSuccess({ message: "Success create report" });
      setModalAdd(false);
      setAddReport({});
      inAwait();
    } else {
      SwalError({ message: "Error create report" });
      setModalAdd(false);
    }
  };

  const putReport = async (e) => {
    e.preventDefault();
    const edit = await UpdateReport(editReport);
    if (edit.message == "Success Updating") {
      SwalSuccess({ message: "Success edit report" });
      setModalEdit(false);
      setEditReport({});
      inAwait();
    } else {
      SwalError({ message: "Error edit report" });
      setModalEdit(false);
    }
  };

  useEffect(() => {
    inAwait();
  }, []);

  const searchRep  = async (keyword) => {
    try {
      const search = await SearchReport(keyword);
      setReports(search.result);
      console.log(search)
    } catch (error) {
      console.log(error);
    }
  };
  const criterias = [
    {
      name: "Employee Name",
      value: "Employee Name",
    },
    {
      name: "Pay Grade ",
      value: "Pay Grade",
    },
    {
      name: "Education ",
      value: "Education",
    },
    {
      name: "Employment Status",
      value: "Employment Status",
    },
  ];
  const includes = [
    {
      value: "Current Employee Only",
      name: "Current Employee Only",
    },
    {
      value: "Current & Past Employee",
      name: "Current & Past Employee",
    },
    {
      value: "Past Employees Only",
      name: "Past Employees Only",
    },
  ];
  const fieldGroup = [
    {
      value: "Personal",
      name: "Personal",
    },
    {
      value: "Contact Details",
      name: "Contact Details",
    },
    {
      value: "Dependents",
      name: "Dependents",
    },
    {
      value: "Membership",
      name: "Membership",
    },
  ];
  const fieldDisplay = [
    {
      value: "Skill Name",
      name: "Skill Name",
    },
    {
      value: "Years of Experience",
      name: "Years of Experience",
    },
    {
      value: "Comments",
      name: "Comments",
    },
  ];

  const handleChangeCriteria = async (criteria) => {
    if (criteria == "Employee Name") {
      const employees = await GetEmployeeName();
      setDataCriteria(employees);
    } else if (criteria == "Pay Grade") {
      const jobGrade = await GetJobGrade();
      setDataCriteria(jobGrade);
    } else if (criteria == "Education") {
      const educations = await GetEducation();
      setDataCriteria(educations);
    } else if (criteria == "Employment Status") {
      const statuses = await GetEmployeeStatus();
      setDataCriteria(statuses);
    } else {
      setDataCriteria([]);
    }
  };

  const criteriaInput = (criteria) => {
    if (criteria == "Employee Name") {
      return (
        <div className="pe-3 py-4">
          <select
            required
            onChange={(e) =>
              setAddReport({ ...addReport, employeeId: e.target.value })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option hidden value="">
              --Select Employee Name--
            </option>
            {dataCriteria.map((emp) => {
              return <option value={emp.id}>{emp.firstName}</option>;
            })}
          </select>
        </div>
      );
    } else if (criteria == "Pay Grade") {
      return (
        <div className="pe-3 py-4">
          <select
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option hidden value="">
              --Select Job Grade--
            </option>
            {dataCriteria.map((emp) => {
              return <option value={emp.id}>{emp.name}</option>;
            })}
          </select>
        </div>
      );
    } else if (criteria == "Education") {
      return (
        <div className="pe-3 py-4">
          <select
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option hidden value="">
              --Select Education--
            </option>
            {dataCriteria.map((edu) => {
              return <option value={edu.id}>{edu.name}</option>;
            })}
          </select>
        </div>
      );
    } else if (criteria == "Employment Status") {
      return (
        <div className="pe-3 py-4">
          <select
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option hidden value="">
              --Select Employment Status--
            </option>
            {dataCriteria.map((emp) => {
              return <option value={emp.id}>{emp.name}</option>;
            })}
          </select>
        </div>
      );
    }
  };

  return (
    <>
      <div className="bg-white p-3 rounded-lg space-y-5">
        <div>
          <h1>Report</h1>
          <p className="text-xs text-gray-400">
            {reports?.length} Record Found
          </p>
        </div>
        <div className="flex flex-row justify-end">
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
                placeholder="Search by Name.."
                onChange={(e) => searchRep(e.target.value)}
              />
            </div>
            <button
              className="bg-[#0E5073] hover:bg[#003049] text-white flex items-center px-2 py-1 rounded-md"
              onClick={() => setModalAdd(true)}
            >
              <PlusIcon className="text-white h-5 w-5" aria-hidden="true" /> Add
              Report
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table borderless responsive style={{ color: "#00000070", fontSize: "0.75rem"}}>
            <thead>
              <tr style={{ backgroundColor: "#EBF7FF" }}>
                <th >
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </th>
                <th >
                  Name
                </th>
                <th>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map((report) => (
                  <tr>
                    <td className="align-middle">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </td>
                    <td className="align-middle" style={{ minWidth: "200px" }}>
                      {report.name}
                    </td>
                    <td className="align-middle">
                      <div className="flex flex-row gap-2">
                        <button
                          className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                          onClick={() => {
                            setDelete(true);
                            setId(report.id);
                          }}
                        >
                          <TrashIcon className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                          className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                          onClick={() => {
                            setEditReport(report);
                            setModalEdit(true);
                          }}
                        >
                          <PencilIcon className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <span
                          onClick={() =>
                            navigate(`/employee/detail-report`, {
                              state: report,
                            })
                          }
                          className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                        >
                          <DocumentIcon
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <td colSpan={3}>
                  <div className="d-flex justify-content-center align-middle text-center">
                    No Data
                  </div>
                </td>
              )}
            </tbody>
          </Table>
        </div>
      </div>
      {/* Modal Add */}
      <Modal show={modalAdd} size="lg" onHide={() => setModalAdd(false)}>
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Add Report
          </Modal.Title>
        </Modal.Header>
        <form method="POST" onSubmit={(e) => postReport(e)}>
          <Modal.Body className="mx-4 space-y-4">
            <div className="w-full">
              <label className="text-xs">Report Name</label>
              <input
                required
                onChange={(val) => {
                  setAddReport({ ...addReport, name: val.target.value });
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="Type here"
              />
            </div>
            <label className="mt-4 font-semibold">Selection Criteria</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="w-full">
                <label className="text-xs">Select Criteria</label>
                <div className="wrapper">
                  <div className="flex flex-row gap-3">
                    <select
                      required={true}
                      onChange={(val) => {
                        setAddReport({
                          ...addReport,
                          criteria: val.target.value,
                        });
                        setCriteriaType(val.target.value);
                        handleChangeCriteria(val.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option hidden value="">
                        --Select--
                      </option>
                      <option value="Employee Name">Employee Name</option>
                      <option value="Pay Grade">Job Grade</option>
                      <option value="Education">Education</option>
                      <option value="Employment Status">
                        Employment Status
                      </option>
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        setShowCriteria(!showCriteria);
                      }}
                      className="bg-[#E0EBF2] hover:bg[#003049] text-white flex items-center px-2 py-1 rounded-md"
                    >
                      {showCriteria ? (
                        <XIcon
                          className="text-[#669BBC] h-5 w-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <PlusIcon
                          className="text-[#669BBC] h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </div>
                  {showCriteria ? criteriaInput(criteriaType) : ""}
                </div>
              </div>
              {criteriaType !== "Employee Name" ? (
                ""
              ) : (
                <div className="w-full">
                  <label className="text-xs">Include</label>
                  <select
                    required={true}
                    onChange={(val) => {
                      setAddReport({ ...addReport, include: val.target.value });
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option hidden value="">
                      --Select--
                    </option>
                    <option value="Current Employee Only">
                      Current Employee Only
                    </option>
                    <option value="Current & Past Employee">
                      Current & Past Employee
                    </option>
                    <option value="Past Employees Only">
                      Past Employees Only
                    </option>
                  </select>
                </div>
              )}
            </div>
            <label className="mt-4 font-semibold">Display Fields</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="w-full">
                <label className="text-xs">Select Display Field Group</label>
                <select
                  required={true}
                  onChange={(val) => {
                    setAddReport({
                      ...addReport,
                      displayFieldGroup: val.target.value,
                    });
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option hidden value="">
                    --Select Field --
                  </option>
                  <option value="Personal">Personal</option>
                  <option value="Contact Details">Contact Details</option>
                  <option value="Dependents">Dependents</option>
                  <option value="Membership">Membership</option>
                </select>
              </div>
              <div className="w-full">
                <label className="text-xs">Select Display Field</label>
                <div className="flex flex-row gap-3">
                  <select
                    required={true}
                    onChange={(val) => {
                      setAddReport({
                        ...addReport,
                        displayField: val.target.value,
                      });
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option hidden value="">
                      --Select--
                    </option>
                    <option value="Skill Name">Skill Name</option>
                    <option value="Years of Experience">
                      Years of Experience
                    </option>
                    <option value="Comments">Comments</option>
                  </select>
                  <button
                    type="button"
                    className="bg-[#E0EBF2] hover:bg[#003049] text-white flex items-center px-2 py-1 rounded-md"
                  >
                    <PlusIcon
                      className="text-[#669BBC] h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="m-4">
            <button
              onClick={() => setModalAdd(false)}
              type="button"
              className="text-[#003049] bg-gray-200 hover:bg-gray-300 font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-gray-200 dark:hover:bg-gray-300 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-white bg-[#0E5073] hover:bg-[#003049] font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-[#0E5073] dark:hover:bg-[#003049] focus:outline-none"
            >
              Add
            </button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* Modal Edit */}
      <Modal show={modalEdit} size="lg" onHide={() => setModalEdit(false)}>
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Report
          </Modal.Title>
        </Modal.Header>
        <form method="POST" onSubmit={(e) => putReport(e)}>
          <Modal.Body className="mx-4 space-y-4">
            <div className="w-full">
              <label className="text-xs">Report Name</label>
              <input
                required={true}
                onChange={(val) => {
                  setEditReport({ ...editReport, name: val.target.value });
                }}
                value={editReport?.name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="Type here"
              />
            </div>
            <label className="text-xsfont-bold">Selection Criteria</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="w-full">
                <label className="text-xs">Select Criteria</label>
                <div className="flex flex-row gap-3">
                  <select
                    required={true}
                    onChange={(val) => {
                      setEditReport({
                        ...editReport,
                        criteria: val.target.value,
                      });
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option hidden value="">
                      --Select--
                    </option>
                    {criterias.map((cri) => {
                      return (
                        <option
                          value={cri.value}
                          selected={
                            editReport?.criteria == cri.value ? true : false
                          }
                        >
                          {cri.name}
                        </option>
                      );
                    })}
                  </select>
                  <button
                    type="button"
                    className="bg-[#E0EBF2] hover:bg[#003049] text-white flex items-center px-2 py-1 rounded-md"
                  >
                    <PlusIcon
                      className="text-[#669BBC] h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
              <div className="w-full">
                <label className="text-xs">Include</label>
                <select
                  required={true}
                  onChange={(val) => {
                    setEditReport({ ...editReport, include: val.target.value });
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option hidden value="">
                    --Select--
                  </option>
                  {includes.map((cri) => {
                    return (
                      <option
                        value={cri.value}
                        selected={
                          editReport?.include == cri.value ? true : false
                        }
                      >
                        {cri.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <label className="text-xs font-bold">Display Fields</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="w-full">
                <label className="text-xs">Select Display Field Group</label>
                <select
                  required={true}
                  onChange={(val) => {
                    setEditReport({
                      ...editReport,
                      displayFieldGroup: val.target.value,
                    });
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option hidden value="">
                    --Select Field --
                  </option>
                  {fieldGroup.map((cri) => {
                    return (
                      <option
                        value={cri.value}
                        selected={
                          editReport?.displayFieldGroup == cri.value
                            ? true
                            : false
                        }
                      >
                        {cri.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="w-full">
                <label className="text-xs">Select Display Field</label>
                <div className="flex flex-row gap-3">
                  <select
                    required={true}
                    onChange={(val) => {
                      setEditReport({
                        ...editReport,
                        displayField: val.target.value,
                      });
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option hidden value="">
                      --Select--
                    </option>
                    {fieldDisplay.map((cri) => {
                      return (
                        <option
                          value={cri.value}
                          selected={
                            editReport?.displayField == cri.value ? true : false
                          }
                        >
                          {cri.name}
                        </option>
                      );
                    })}
                  </select>
                  <button
                    type="button"
                    className="bg-[#E0EBF2] hover:bg[#003049] text-white flex items-center px-2 py-1 rounded-md"
                  >
                    <PlusIcon
                      className="text-[#669BBC] h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-2">
              <div>
                <button
                  type="button"
                  className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                >
                  <TrashIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <div className="col-span-3 flex flex-col gap-2">
                <h4>Personal</h4>
                <div className="flex flex-wrap">
                  <div className="flex flex-row gap-1 bg-gray-200 text-sm items-center py-1 px-2 rounded-full">
                    <p>Employee ID</p>
                    <a href="#">
                      <XCircleIcon className="text-gray-400 h-5 w-5" />
                    </a>
                  </div>
                  <div className="flex flex-row gap-1 bg-gray-200 text-sm items-center py-1 px-2 rounded-full">
                    <p>Employee ID</p>
                    <a href="#">
                      <XCircleIcon className="text-gray-400 h-5 w-5" />
                    </a>
                  </div>
                  <div className="flex flex-row gap-1 bg-gray-200 text-sm items-center py-1 px-2 rounded-full">
                    <p>Employee ID</p>
                    <a href="#">
                      <XCircleIcon className="text-gray-400 h-5 w-5" />
                    </a>
                  </div>
                  <div className="flex flex-row gap-1 bg-gray-200 text-sm items-center py-1 px-2 rounded-full">
                    <p>Employee ID</p>
                    <a href="#">
                      <XCircleIcon className="text-gray-400 h-5 w-5" />
                    </a>
                  </div>
                  <div className="flex flex-row gap-1 bg-gray-200 text-sm items-center py-1 px-2 rounded-full">
                    <p>Employee ID</p>
                    <a href="#">
                      <XCircleIcon className="text-gray-400 h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <label
                  for="default-toggle2"
                  className="inline-flex relative items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value=""
                    id="default-toggle2"
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Include Header
                  </span>
                </label>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="m-4">
            <button
              onClick={() => setModalEdit(false)}
              type="button"
              className="text-[#003049] bg-gray-200 hover:bg-gray-300 font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-gray-200 dark:hover:bg-gray-300 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-white bg-[#0E5073] hover:bg-[#003049] font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-[#0E5073] dark:hover:bg-[#003049] focus:outline-none"
            >
              Save
            </button>
          </Modal.Footer>
        </form>
      </Modal>
      <ModalDelete
        close={() => {
          setDelete(false);
        }}
        submit={() => {
          DeleteReport(id);
          inAwait();
          setDelete(false);
          SwalSuccess({ message: "Success delete report" });
        }}
        active={isdelete}
      />
    </>
  );
}

export default Report;
