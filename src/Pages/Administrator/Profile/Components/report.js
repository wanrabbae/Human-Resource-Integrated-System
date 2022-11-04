import { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { Trash, PencilSimple, Plus } from "phosphor-react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import {
  Add,
  AlignVerticalCenter,
  ArrowUpwardTwoTone,
  Delete,
  Filter,
  Filter1,
  FilterCenterFocus,
  FilterList,
  ImportExport,
  Search,
} from "@mui/icons-material";
import {
  addReportTo,
  getReport,
} from "../../../../Repository/ProfileRepository";
import {
  GetEmployee,
  GetReportMeth,
} from "../../../../Repository/EmployeeRepository";

function ReportTo() {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalAddSub, setModalAddSub] = useState(false);

  const [data, setData] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [structureId, setStructureId] = useState([]);
  const [reportingMethod, setReportingMethod] = useState([]);
  const [reportId, setReportId] = useState([]);
  const [status, setStatus] = useState([]);
  const [name, setName] = useState([]);

  const inAwait = async () => {
    var data = await getReport();
    setData(data.result);
    // console.log(data.result);
    var dataEmployee = await GetEmployee();
    console.log(dataEmployee);
    setEmployee(dataEmployee);
    var method = await GetReportMeth();
    // console.log(method.result);
    setReportingMethod(method.result);
  };

  useEffect(() => {
    inAwait();
  }, []);

  const postData = async () => {
    var requestBody = {
      name: name,
      status: status,
      reporting_method_id: reportId,
      structureId: structureId,
    };
    console.log(requestBody);
    inAwait();
    setModalAdd(false);
    setModalAddSub(false);
    var res = await addReportTo(requestBody);
    console.log(res);
  };
  const code = (id) => {
    employee.map((val) => {
      return val.id == id
        ? setStructureId(
            val.jobposition?.relation_code + val.jobposition?.job_id
          )
        : null;
    });
  };

  return (
    <>
      <div>
        <div className="mb-4 d-flex justify-content-between">
          <div className="row">
            <h3 style={{ fontSize: "20px", fontWeight: "600" }}>Report-to</h3>
            <span
              style={{ fontSize: "10px", fontWeight: "400", color: "#737373" }}
            >
              List of record employee attendance
            </span>
          </div>
        </div>
        <hr style={{ backgroundColor: "#CACACA" }} className=""></hr>
        <div className="w-100">
          <div
            className="p-3 mb-5 rounded-2xl"
            style={{ boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="mt-4 mb-3 d-flex justify-content-between">
              <div className="row">
                <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
                  Supervisor
                </h3>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "#737373",
                  }}
                >
                  List of Supervisor
                </span>
              </div>
              <button
                style={{
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
                className="bg-[#0E5073] btn d-flex align-items-center align-middle"
                onClick={() => {
                  setModalAdd(true);
                  setStatus("supervisor");
                }}
              >
                <Plus className="me-2" size={20} weight="bold" />
                Add
              </button>
            </div>
            <hr style={{ backgroundColor: "#CACACA" }} className=""></hr>
            <div className="w-100">
              <table
                className="table mt-4 table-borderless"
                style={{ color: "#737373" }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: "#EBF7FF",
                      fontSize: "14px",
                      writingMode: "horizontal-tb",
                    }}
                  >
                    <th className="align-middle">
                      <Form.Check type="checkbox" id="default-checkbox" />
                    </th>
                    <th className="align-middle " onClick={() => {}}>
                      Name <ImportExport fontSize="2px" />
                    </th>
                    <th className="align-middle " onClick={() => {}}>
                      Reporting Method <ImportExport fontSize="2px" />
                    </th>
                    <th className="align-middle pe-5" onClick={() => {}}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((val, index) => {
                    return val.status == "supervisor" ? (
                      <tr key={index} style={{ fontSize: "14px" }}>
                        <td className="align-middle">
                          <Form.Check type="checkbox" id="default-checkbox" />
                        </td>
                        <td className="align-middle">{val.name}</td>
                        <td className="align-middle">
                          {val.reportingmethod.name}
                        </td>
                        <td className="align-middle">
                          <div className="flex flex-row gap-2">
                            <button
                              className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                              onClick={() => setModalEdit(true)}
                            >
                              <PencilSimple
                                color="#003049"
                                className="h-5 w-5"
                                weight="bold"
                                aria-hidden="true"
                              />
                            </button>
                            <button className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg">
                              <Trash
                                color="#003049"
                                weight="bold"
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : null;
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div
            className="p-3 mb-5 rounded-2xl"
            style={{ boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="mt-4 mb-3 d-flex justify-content-between">
              <div className="row">
                <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
                  Subordinate
                </h3>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "#737373",
                  }}
                >
                  List of Subordinate
                </span>
              </div>
              <button
                style={{
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
                className="bg-[#0E5073] btn d-flex align-items-center align-middle"
                onClick={() => {
                  setModalAddSub(true);

                  setStatus("subordinate");
                }}
                type=""
              >
                <Plus className="me-2" size={20} weight="bold" />
                Add
              </button>
            </div>
            <hr style={{ backgroundColor: "#CACACA" }} className=""></hr>
            <div className="w-100">
              <table
                className="table mt-4 table-borderless"
                style={{ color: "#737373" }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: "#EBF7FF",
                      fontSize: "14px",
                      writingMode: "horizontal-tb",
                    }}
                  >
                    <th className="align-middle">
                      <Form.Check type="checkbox" id="default-checkbox" />
                    </th>
                    <th className="align-middle " onClick={() => {}}>
                      Name <ImportExport fontSize="2px" />
                    </th>
                    <th className="align-middle " onClick={() => {}}>
                      Reporting Method <ImportExport fontSize="2px" />
                    </th>
                    <th className="align-middle pe-5" onClick={() => {}}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((val, index) => {
                    return val.status != "supervisor" ? (
                      <tr key={index} style={{ fontSize: "14px" }}>
                        <td className="align-middle">
                          <Form.Check type="checkbox" id="default-checkbox" />
                        </td>
                        <td className="align-middle">{val.name}</td>
                        <td className="align-middle">
                          {val.reportingmethod.name}
                        </td>
                        <td className="align-middle">
                          <div className="flex flex-row gap-2">
                            <button
                              className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                              onClick={() => setModalEdit(true)}
                            >
                              <PencilSimple
                                color="#003049"
                                className="h-5 w-5"
                                weight="bold"
                                aria-hidden="true"
                              />
                            </button>
                            <button className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg">
                              <Trash
                                color="#003049"
                                weight="bold"
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : null;
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {/* <table className="table mt-4 table-borderless" style={{ color: "#737373" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#EBF7FF", fontSize:'14px',writingMode:'horizontal-tb' }}>
                                <th className="align-middle">
                                    <Form.Check 
                                        type="checkbox"
                                        id="default-checkbox"
                                    />
                                </th>
                                <th  className="align-middle " onClick={() => { }}>Name <ImportExport fontSize="2px" /></th>
                                <th  className="align-middle " onClick={() => { }}>Reporting Method <ImportExport fontSize="2px" /></th>
                                <th  className="align-middle pe-5" onClick={() => { }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{fontSize:'14px'}}>
                                <td className="align-middle">
                                    <Form.Check 
                                        type="checkbox"
                                        id="default-checkbox"
                                    />
                                </td>
                                <td className="align-middle">Haruka</td>
                                <td className="align-middle">Direct</td>
                                <td className="align-middle">
                                    <div className="flex flex-row gap-2">
                                        <button
                                        className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                                        onClick={() => setModalEdit(true)}
                                        >
                                            <PencilSimple color="#003049" className="h-5 w-5" weight="bold" aria-hidden="true" />
                                        </button>
                                        <button className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg">
                                            <Trash color="#003049" weight="bold" className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table> */}
        </div>
      </div>
      <Modal show={modalAdd} size="lg" onHide={() => setModalAdd(false)}>
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Add Supervisor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Name <span style={{ color: "#780000" }}>*</span>
              </label>
              <Select
                id="selectedEmployee"
                isLoading={true}
                onChange={(e) => {
                  code(e.value);
                  setName(e.label);
                }}
                isFocused="appearance-none border-0 outline-0"
                className="appearance-none"
                classNamePrefix="appearance-none active:outline-0 active:border-0 focus:outline-0 focus:border-0 focus:shadow-outline"
                options={
                  employee &&
                  employee.map((val) => {
                    return {
                      value: val.id,
                      label: val.firstName + " " + val.lastName,
                    };
                  })
                }
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Stucture ID
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                value={structureId}
                readOnly
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-6">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Reporting Method <span style={{ color: "#780000" }}>*</span>
              </label>
              <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                onChange={(e) => setReportId(e.target.value)}
              >
                <option className="py-3" hidden>
                  Select
                </option>
                {reportingMethod.map((val, index) => (
                  <option key={index} value={val.id} className="py-3">
                    {val.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="m-4">
          <Button
            style={{
              border: "none",
              fontSize: "14px",
              backgroundColor: "#ECECEC",
              color: "#003049",
            }}
            className="px-3"
            onClick={() => setModalAdd(false)}
          >
            Cancel
          </Button>
          <Button
            style={{
              border: "none",
              fontSize: "14px",
              backgroundColor: "#0E5073",
              color: "#FFFFFF",
            }}
            className="px-3"
            onClick={postData}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={modalEdit} size="lg" onHide={() => setModalEdit(false)}>
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Report-To
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="row mb-4">
            <h1
              className="mb-3  "
              style={{ fontSize: "16px", fontWeight: "500" }}
            >
              Add Supervisor
            </h1>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Name <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                value="Kim Woo Bin"
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Reporting Method <span style={{ color: "#780000" }}>*</span>
              </label>
              <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                <option className="py-3" hidden>
                  Select
                </option>
                <option className="py-3">Direct</option>
                <option className="py-3">Indirect</option>
              </select>
            </div>
          </div>
          <div className="row mb-4">
            <h1
              className="mb-3  "
              style={{ fontSize: "16px", fontWeight: "500" }}
            >
              Add Subordinate
            </h1>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Name <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                value="Kim Woo Bin"
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Reporting Method <span style={{ color: "#780000" }}>*</span>
              </label>
              <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                <option className="py-3" hidden>
                  Select
                </option>
                <option className="py-3">Direct</option>
                <option className="py-3">Indirect</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="m-4">
          <Button
            style={{
              border: "none",
              fontSize: "14px",
              backgroundColor: "#ECECEC",
              color: "#003049",
            }}
            className="px-3"
            onClick={() => setModalEdit(false)}
          >
            Cancel
          </Button>
          <Button
            style={{
              border: "none",
              fontSize: "14px",
              backgroundColor: "#0E5073",
              color: "#FFFFFF",
            }}
            className="px-3"
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={modalAddSub} size="lg" onHide={() => setModalAddSub(false)}>
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Add Subordinate
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Name <span style={{ color: "#780000" }}>*</span>
              </label>
              <Select
                id="selectedEmployee"
                isLoading={true}
                onChange={(e) => {
                  code(e.value);
                  setName(e.label);
                }}
                isFocused="appearance-none border-0 outline-0"
                className="appearance-none"
                classNamePrefix="appearance-none active:outline-0 active:border-0 focus:outline-0 focus:border-0 focus:shadow-outline"
                options={
                  employee &&
                  employee.map((val) => {
                    return {
                      value: val.id,
                      label: val.firstName + " " + val.lastName,
                    };
                  })
                }
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Stucture ID
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                value={structureId}
                readOnly
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-6">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Reporting Method <span style={{ color: "#780000" }}>*</span>
              </label>
              <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                onChange={(e) => setReportId(e.target.value)}
              >
                <option className="py-3" hidden>
                  Select
                </option>
                {reportingMethod.map((val, index) => (
                  <option key={index} value={val.id} className="py-3">
                    {val.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="m-4">
          <Button
            style={{
              border: "none",
              fontSize: "14px",
              backgroundColor: "#ECECEC",
              color: "#003049",
            }}
            className="px-3"
            onClick={() => setModalAddSub(false)}
          >
            Cancel
          </Button>
          <Button
            style={{
              border: "none",
              fontSize: "14px",
              backgroundColor: "#0E5073",
              color: "#FFFFFF",
            }}
            className="px-3"
            onClick={postData}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ReportTo;
