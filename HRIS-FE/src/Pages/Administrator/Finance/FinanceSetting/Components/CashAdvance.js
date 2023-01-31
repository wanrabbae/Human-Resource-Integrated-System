import {
  Add,
  DeleteOutline,
  EditOutlined,
  ImportExport,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { ModalDelete } from "../../../../../Components/Modals";
import { TextFieldSearch } from "../../../../../Components/TextField";
import {
  filterEmployeeJob,
  GetEmployeeName,
} from "../../../../../Repository/EmployeeRepository";
import {
  addCashAdvanceSetting,
  deleteCashAdvanceSetting,
  getCashAdvanceSetting,
  updateCashAdvanceSetting,
} from "../../../../../Repository/Finance";
import Select from "react-select";
import {
  GetJobGrade,
  GetJobLevel,
  GetJobPosition,
  GetJobTittle,
} from "../../../../../Repository/AdminRepository";

function CashAdvance() {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [search, setSearch] = useState(false);
  const [filter, setFilter] = useState(false);

  const [employeeNames, setEmployeeNames] = useState([]);
  const [option, setOption] = useState([]);

  const [dataCA, setDataCA] = useState([]);
  const [id, setId] = useState("");

  const [name, setName] = useState("");
  const [settlementDue, setSettlementDue] = useState("");
  const [limitAmount, setLimitAmount] = useState("");
  const [asignTo, setAsignTo] = useState([]);

  const [editName, setEditName] = useState("");
  const [editSettlementDue, setEditSettlementDue] = useState("");
  const [editLimitAmount, setEditLimitAmount] = useState("");
  const [editAsignTo, setEditAsignTo] = useState([]);

  const [dataJobGrade, setDataJobGrade] = useState([]);
  const [dataJobLevel, setDataJobLevel] = useState([]);
  const [dataJobTitle, setDataJobTitle] = useState([]);
  const [dataJobPosition, setDataJobPosition] = useState([]);

  const [jobGrade, setJobGrade] = useState("");
  const [jobLevel, setJobLevel] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [totalPosition, setTotalPosition] = useState([]);

  const [editJobGrade, setEditJobGrade] = useState("");
  const [editJobLevel, setEditJobLevel] = useState("");
  const [editJobTitle, setEditJobTitle] = useState("");
  const [editJobPosition, setEditJobPosition] = useState("");
  const [editTotalPosition, setEditTotalPosition] = useState([]);

  const filterEmployee = async (e) => {
    e.preventDefault();

    var requestBody = {
      jobgrade: jobGrade,
      joblevel: jobLevel,
      jobtitle: jobTitle,
      jobposition: jobPosition,
    };
    console.log(requestBody);
    await filterEmployeeJob(requestBody)
      .then((response) => {
        console.log("hasil", response);
        var data = [];
        for (var i in response) {
          data.push(parseInt(response[i].id));
        }
        // setDataSearch(data);
        setAsignTo(data);
        setTotalPosition(data);
        console.log("hasil 2", data);
      })
      .catch((e) => {
        console.log("error", e.response);
      });
  };
  const filterEmployeeEdit = async (e) => {
    e.preventDefault();

    var requestBody = {
      jobgrade: editJobGrade,
      joblevel: editJobLevel,
      jobtitle: editJobTitle,
      jobposition: editJobPosition,
    };
    console.log(requestBody);
    await filterEmployeeJob(requestBody)
      .then((response) => {
        console.log("hasil", response);
        var data = [];
        for (var i in response) {
          data.push(parseInt(response[i].id));
        }
        // setDataSearch(data);
        setEditAsignTo(data);
        setEditTotalPosition(data);
        console.log("hasil 3", data);
      })
      .catch((e) => {
        console.log("error", e.response);
      });
  };

  const postData = async (e) => {
    e.preventDefault();

    var requestBody = {
      name: name,
      limit_amount: limitAmount,
      settlement_due: settlementDue,
      assign_to: `[${asignTo}]`,
    };
    console.log(requestBody);
    await addCashAdvanceSetting(requestBody)
      .then((response) => {
        console.log(response);
        inAwait();
        setModalAdd(false);
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

    var requestBody = {
      name: editName,
      limit_amount: editLimitAmount,
      settlement_due: editSettlementDue,
      assign_to: `[${editAsignTo}]`,
    };
    console.log(requestBody);
    await updateCashAdvanceSetting(id, requestBody)
      .then((response) => {
        console.log(response);
        inAwait();
        setModalEdit(false);
      })
      .catch((e) => {
        console.log("error", e.response);
        // if (e.response) {
        //   setMsg(e.response.data.message);
        // }
      });
  };

  const employee = [];

  const inAwait = async () => {
    var dataEmployeeName = await GetEmployeeName();
    dataEmployeeName.map((em) =>
      employee.push({ value: em.id, label: em.firstName })
    );
    setEmployeeNames(dataEmployeeName);
    setOption(employee);

    var data = await getCashAdvanceSetting();
    setDataCA(data.data.data);
    console.log(data.data.data);

    var jobGrade = await GetJobGrade();
    setDataJobGrade(jobGrade);
    // console.log("ini", dataJobGrade);

    var jobLevel = await GetJobLevel();
    setDataJobLevel(jobLevel);
    // console.log("ini", dataJobLevel);

    var jobTitle = await GetJobTittle();
    setDataJobTitle(jobTitle);
    // console.log("ini", JobTitle);

    var jobPosition = await GetJobPosition();
    setDataJobPosition(jobPosition.result);
  };

  useEffect(() => {
    inAwait();
  }, []);

  const allEmployee = [];

  for (let i = 0; i < employeeNames.length; i++) {
    allEmployee[i] = employeeNames[i].id;
  }
  // console.log("id", allEmployee);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div>
          <h5>
            <b>Cash Advance Policy</b>
          </h5>
          <p>
            <small>list of Cash Advance Policy</small>
          </p>
        </div>
        <div className="d-flex">
          <div className="mx-2"></div>
          <Button
            onClick={() => {
              setModalAdd(!modalAdd);
            }}
            style={{
              color: "#FFFFFF",
              borderRadius: "7px",
              backgroundColor: "#0E5073",
            }}
            variant="contained"
            startIcon={<Add />}
          >
            Add
          </Button>
        </div>
      </div>
      <br></br>
      <Table borderless responsive style={{ color: "#00000070" }}>
        <thead>
          <tr style={{ backgroundColor: "#EBF7FF" }}>
            {/* <th width="10px">
                <input type="checkbox" style={{ borderRadius: "2px" }} />
              </th> */}
            <th onClick={() => {}} className="truncate">
              Policy Name <ImportExport fontSize="2px" />
            </th>
            <th onClick={() => {}} className="truncate">
              Settlement Due <ImportExport fontSize="2px" />
            </th>
            <th onClick={() => {}} className="truncate">
              Limit Amount <ImportExport fontSize="2px" />
            </th>
            <th onClick={() => {}} className="truncate">
              Asign To <ImportExport fontSize="2px" />
            </th>
            <th onClick={() => {}} className="truncate">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {dataCA.length > 0 ? (
            dataCA.map((val, index) => (
              <tr key={index}>
                {/* <td className="align-middle">
                <input type="checkbox" style={{ borderRadius: "2px" }} />
              </td> */}
                <td className="align-middle truncate">
                  {val.name ? val.name : "-"}
                </td>
                <td className="align-middle truncate">
                  {val.settlement_due ? val.settlement_due : 0}
                </td>
                <td className="align-middle truncate">
                  Rp.{" "}
                  {val.limit_amount
                    ? parseInt(val.limit_amount).toLocaleString()
                    : 0}
                </td>
                <td className="align-middle text-blue-500 truncate">
                  {val.assign_to ? val.assign_to.split(",").length : 0} Position
                </td>
                <td className="align-middle d-flex">
                  <button
                    onClick={() => {
                      setId(val.id);
                      setEditName(val.name);
                      setEditSettlementDue(val.settlement_due);
                      setEditLimitAmount(val.limit_amount);
                      setModalEdit(!modalEdit);
                    }}
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
                      setId(val.id);
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
                </td>
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
      <Modal
        show={modalAdd}
        size="lg"
        onHide={() => {
          setModalAdd(false);
        }}
      >
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Add Policy Cash Advance
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4 space-y-5">
          <div className="w-full">
            <label className="text-xs">Policy Name</label>
            <input
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="Input Policy name for Cash Advance"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-1/3">
            <label className="text-xs">Settlement Due</label>
            <div class="flex">
              <input
                type="number"
                min={0}
                class="rounded-none rounded-l-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-transparent focus:border-transparent block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                onChange={(e) => setSettlementDue(e.target.value)}
              />
              <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                Days
              </span>
            </div>
          </div>

          <div className="w-full">
            <label className="text-xs">Limit Amount</label>
            <input
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              min={0}
              placeholder="Rp"
              onChange={(e) => setLimitAmount(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="text-xs mb-2">Asign to</label>
            <div>
              <div className="d-flex gap-2 mb-2">
                <input
                  required
                  className=""
                  type="radio"
                  id="all"
                  name="asign"
                  onChange={() => setAsignTo(allEmployee)}
                  onClick={() => {
                    setSearch(false);
                    setFilter(false);
                  }}
                />
                <label for="all">All Employee</label>
              </div>
              <div className="d-flex gap-2 mb-2">
                <input
                  required
                  className=""
                  type="radio"
                  name="asign"
                  id="search"
                  // onChange={() => setAsignTo(dataSearch)}
                  onClick={() => {
                    setSearch((prev) => !prev);
                    setFilter(false);
                  }}
                />
                <label for="search">Search by Employee</label>
              </div>
              {search && (
                <div className="ml-8">
                  <Select
                    options={option}
                    isMulti
                    onChange={(e) => {
                      var data = [];
                      for (var i in e) {
                        data.push(parseInt(e[i].value));
                      }
                      // setDataSearch(data);
                      setAsignTo(data);
                      console.log("ini", data);
                    }}
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    // components={{
                    //   Option,
                    // }}
                  />
                </div>
              )}
              <div className="d-flex gap-2 mb-2">
                <input
                  required
                  className=""
                  type="radio"
                  name="asign"
                  id="filter"
                  // onChange={() => setAsignTo([4, 5, 6])}
                  onClick={() => {
                    setFilter((prev) => !prev);
                    setSearch(false);
                    setAsignTo([4, 5, 6]);
                  }}
                />
                <label for="filter">Select Filter</label>
              </div>

              {filter && (
                <div className="ml-8 space-y-3">
                  <div className="w-full">
                    <label className="text-xs">Job Grade</label>
                    <select
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                      onChange={(e) => setJobGrade(e.target.value)}
                    >
                      <option className="py-3" value="">
                        -- Select --
                      </option>
                      {dataJobGrade &&
                        dataJobGrade.map((val, index) => (
                          <option value={val.id} key={index}>
                            {val.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="text-xs">Job Level</label>
                    <select
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                      onChange={(e) => setJobLevel(e.target.value)}
                    >
                      <option className="py-3" value="">
                        -- Select --
                      </option>
                      {dataJobLevel &&
                        dataJobLevel.map((val, index) => (
                          <option value={val.id} key={index}>
                            {val.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="text-xs">Job Title</label>
                    <select
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                      onChange={(e) => setJobTitle(e.target.value)}
                    >
                      <option className="py-3" value="">
                        -- Select --
                      </option>
                      {dataJobTitle &&
                        dataJobTitle.map((val, index) => (
                          <option value={val.id} key={index}>
                            {val.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="text-xs">Job Position</label>
                    <select
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                      onChange={(e) => setJobPosition(e.target.value)}
                    >
                      <option className="py-3" value="">
                        -- Select --
                      </option>
                      {dataJobPosition &&
                        dataJobPosition.map((val, index) => (
                          <option value={val.id} key={index}>
                            {val.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      className="text-white bg-[#0E5073] hover:bg-[#003049] font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-[#0E5073] dark:hover:bg-[#003049] focus:outline-none"
                      onClick={filterEmployee}
                    >
                      Filter
                    </button>
                    <p className="text-sm text-blue-400">
                      {totalPosition.length ? totalPosition.length : 0} Position
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="m-4">
          <button
            type="button"
            className="text-[#003049] bg-gray-200 hover:bg-gray-300 font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-gray-200 dark:hover:bg-gray-300 focus:outline-none"
            onClick={() => setModalAdd(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-white bg-[#0E5073] hover:bg-[#003049] font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-[#0E5073] dark:hover:bg-[#003049] focus:outline-none"
            onClick={postData}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={modalEdit}
        size="lg"
        onHide={() => {
          setModalEdit(false);
        }}
      >
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Policy Cash Advance
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4 space-y-5">
          <div className="w-full">
            <label className="text-xs">Policy Name</label>
            <input
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="Input Policy name for Cash Advance"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </div>
          <div className="w-1/3">
            <label className="text-xs">Settlement Due</label>
            <div class="flex">
              <input
                type="number"
                min={0}
                class="rounded-none rounded-l-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-transparent focus:border-transparent block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                value={editSettlementDue}
                onChange={(e) => setEditSettlementDue(e.target.value)}
              />
              <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                Days
              </span>
            </div>
          </div>

          <div className="w-full">
            <label className="text-xs">Limit Amount</label>
            <input
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              min={0}
              placeholder="Rp"
              value={editLimitAmount}
              onChange={(e) => setEditLimitAmount(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="text-xs mb-2">Asign to</label>
            <div>
              <div className="d-flex gap-2 mb-2">
                <input
                  required
                  className=""
                  type="radio"
                  id="all"
                  name="asign"
                  onChange={() => setEditAsignTo(allEmployee)}
                  onClick={() => {
                    setSearch(false);
                    setFilter(false);
                  }}
                />
                <label for="all">All Employee</label>
              </div>
              <div className="d-flex gap-2 mb-2">
                <input
                  required
                  className=""
                  type="radio"
                  name="asign"
                  id="search"
                  // onChange={() => setEditAsignTo(dataSearch)}
                  onClick={() => {
                    setSearch((prev) => !prev);
                    setFilter(false);
                  }}
                />
                <label for="search">Search by Employee</label>
              </div>
              {search && (
                <div className="ml-8">
                  <Select
                    options={option}
                    isMulti
                    onChange={(e) => {
                      var data = [];
                      for (var i in e) {
                        data.push(parseInt(e[i].value));
                      }
                      // setDataSearch(data);
                      setEditAsignTo(data);
                      console.log(data);
                    }}
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    // components={{
                    //   Option,
                    // }}
                  />
                </div>
              )}
              <div className="d-flex gap-2 mb-2">
                <input
                  required
                  className=""
                  type="radio"
                  name="asign"
                  id="filter"
                  // onChange={() => setEditAsignTo([4, 5, 6])}
                  onClick={() => {
                    setFilter((prev) => !prev);
                    setSearch(false);
                    setEditAsignTo([4, 5, 6]);
                  }}
                />
                <label for="filter">Select Filter</label>
              </div>
              {filter && (
                <div className="ml-8 space-y-3">
                  <div className="w-full">
                    <label className="text-xs">Job Grade</label>
                    <select
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                      onChange={(e) => setEditJobGrade(e.target.value)}
                    >
                      <option className="py-3" value="">
                        -- Select --
                      </option>
                      {dataJobGrade &&
                        dataJobGrade.map((val, index) => (
                          <option value={val.id} key={index}>
                            {val.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="text-xs">Job Level</label>
                    <select
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                      onChange={(e) => setEditJobLevel(e.target.value)}
                    >
                      <option className="py-3" value="">
                        -- Select --
                      </option>
                      {dataJobLevel &&
                        dataJobLevel.map((val, index) => (
                          <option value={val.id} key={index}>
                            {val.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="text-xs">Job Title</label>
                    <select
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                      onChange={(e) => setEditJobTitle(e.target.value)}
                    >
                      <option className="py-3" value="">
                        -- Select --
                      </option>
                      {dataJobTitle &&
                        dataJobTitle.map((val, index) => (
                          <option value={val.id} key={index}>
                            {val.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="text-xs">Job Position</label>
                    <select
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                      onChange={(e) => setEditJobPosition(e.target.value)}
                    >
                      <option className="py-3" value="">
                        -- Select --
                      </option>
                      {dataJobPosition &&
                        dataJobPosition.map((val, index) => (
                          <option value={val.id} key={index}>
                            {val.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      className="text-white bg-[#0E5073] hover:bg-[#003049] font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-[#0E5073] dark:hover:bg-[#003049] focus:outline-none"
                      onClick={filterEmployeeEdit}
                    >
                      Filter
                    </button>
                    <p className="text-sm text-blue-400">
                      {editTotalPosition.length ? editTotalPosition.length : 0}{" "}
                      Position
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="m-4">
          <button
            type="button"
            className="text-[#003049] bg-gray-200 hover:bg-gray-300 font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-gray-200 dark:hover:bg-gray-300 focus:outline-none"
            onClick={() => setModalEdit(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-white bg-[#0E5073] hover:bg-[#003049] font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-[#0E5073] dark:hover:bg-[#003049] focus:outline-none"
            onClick={postDataEdit}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
      <ModalDelete
        close={() => {
          setDelete(false);
        }}
        submit={() => {
          deleteCashAdvanceSetting(id);
          inAwait();
          setDelete(false);
        }}
        active={isDelete}
      />
    </div>
  );
}

export default CashAdvance;
