import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
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
  getDependents,
  addDependent,
  updateDependent,
  deleteDependent,
} from "../../../../Repository/ProfileRepository";
import { useEffect } from "react";
import { ModalDelete, SwalSuccess } from "../../../../Components/Modals";

function Dependents() {
  const [modal, setModal] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [isdelete, setDelete] = useState(false);

  const [dependents, setDependents] = useState([]);
  const [name, setName] = useState([]);
  const [relationship, setRelationship] = useState([]);
  const [birthDate, setBirthDate] = useState([]);
  const [id, setId] = useState([]);
  const [editId, setEditId] = useState([]);
  const [editName, setEditName] = useState([]);
  const [editRelationship, setEditRelationship] = useState([]);
  const [editBirthDate, setEditBirthDate] = useState([]);

  const inAwait = async () => {
    var data = await getDependents();
    setDependents(data.result);
  };

  useEffect(() => {
    inAwait();
  }, []);

  const postDataAdd = async () => {
    var requestBody = {
      name: name,
      relationship: relationship,
      birthDate: birthDate,
    };
    console.log(requestBody);
    var res = await addDependent(requestBody);
    console.log(res);
    setModalAdd(false);
    SwalSuccess({ message: "Success Add Dependents" });
    inAwait();
  };
  const postDataEdit = async () => {
    var requestBody = {
      id: editId,
      name: editName,
      relationship: editRelationship,
      birthDate: editBirthDate,
    };
    console.log(requestBody);
    var res = await updateDependent(requestBody);
    console.log(res);
    setModal(false);
    SwalSuccess({ message: "Success Update Dependents" });
    inAwait();
  };

  console.log(id);
  // console.log(editName);
  // console.log(editRelationship);
  // console.log(editBirthDate);

  return (
    <>
      <div>
        <div className="mb-4 d-flex justify-content-between">
          <div className="row">
            <h3 style={{ fontSize: "20px", fontWeight: "600" }}>Dependents</h3>
            <span
              style={{ fontSize: "10px", fontWeight: "400", color: "#737373" }}
            >
              List of dependents{" "}
            </span>
          </div>
          <button
            style={{
              borderRadius: "10px",
              color: "white",
              fontSize: "14px",
              fontWeight: "500",
            }}
            className="bg-[#0E5073] me-3 btn d-flex align-items-center align-middle"
            onClick={() => setModalAdd(true)}
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
                <th className="align-middle " onClick={() => {}}>
                  Name <ImportExport fontSize="2px" />
                </th>
                <th className="align-middle " onClick={() => {}}>
                  Relationship <ImportExport fontSize="2px" />
                </th>
                <th className="align-middle " onClick={() => {}}>
                  Birth of Date
                  <ImportExport fontSize="2px" />
                </th>
                <th className="align-middle pe-5" onClick={() => {}}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {dependents ? (
                dependents.map((val, index) => (
                  <tr key={index} style={{ fontSize: "14px" }}>
                    <td className="align-middle">{val.name}</td>
                    <td className="align-middle">{val.relationship}</td>
                    <td className="align-middle">{val.birthDate}</td>
                    <td className="align-middle">
                      <div className="flex flex-row gap-2">
                        <button
                          className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                          onClick={() => {
                            setEditId(val.id);
                            setEditName(val.name);
                            setEditRelationship(val.relationship);
                            setEditBirthDate(val.birthDate);
                            setModal(true);
                          }}
                        >
                          <PencilSimple
                            color="#003049"
                            className="h-5 w-5"
                            weight="bold"
                            aria-hidden="true"
                          />
                        </button>
                        <button
                          className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                          onClick={() => {
                            setId(val.id);
                            setDelete(true);
                          }}
                        >
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
                ))
              ) : (
                <tr>
                  <td colSpan={4}>
                    <div className="d-flex justify-content-center align-middle text-center">
                      No Data
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Modal show={modal} size="lg" onHide={() => setModal(false)}>
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Dependents
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Name
              </label>
              <input
                value={editName}
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="text"
                placeholder="name"
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Relationship
              </label>
              <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                onChange={(e) => setEditRelationship(e.target.value)}
              >
                <option hidden value={editRelationship}>
                  {editRelationship != null
                    ? editRelationship
                    : "Select Relationship"}
                </option>
                <option value="child" className="py-3">
                  Child
                </option>
                <option value="other" className="py-3">
                  Other
                </option>
              </select>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-6">
              <label
                className=" block text-gray-700 text-sm mb-2"
                for="username"
              >
                Birth of Date
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                value={editBirthDate}
                onChange={(e) => setEditBirthDate(e.target.value)}
                type="date"
              />
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
            onClick={() => setModal(false)}
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
            onClick={postDataEdit}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={modalAdd} size="lg" onHide={() => setModalAdd(false)}>
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Add Dependents
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Name
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Dependents name..."
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Relationship <span style={{ color: "#780000" }}>*</span>
              </label>
              <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                onChange={(e) => setRelationship(e.target.value)}
              >
                <option hidden className="py-3">
                  Select Relationship
                </option>
                <option value="child" className="py-3">
                  Child
                </option>
                <option value="other" className="py-3">
                  Other
                </option>
              </select>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-6">
              <label
                className=" block text-gray-700 text-sm mb-2"
                for="username"
              >
                Birth of Date
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="date"
                onChange={(e) => setBirthDate(e.target.value)}
              />
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
            onClick={postDataAdd}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      <ModalDelete
        close={() => {
          setDelete(false);
        }}
        submit={() => {
          deleteDependent(id);
          inAwait();
          setDelete(false);
        }}
        active={isdelete}
      />
    </>
  );
}
export default Dependents;
