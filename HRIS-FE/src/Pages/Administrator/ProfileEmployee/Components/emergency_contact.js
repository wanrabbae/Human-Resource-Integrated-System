import { useEffect, useState } from "react";
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
  addEmergencyContact,
  deleteEmergencyContact,
  getEmergencyContact,
  updateEmergencyContact,
} from "../../../../Repository/ProfileEmployeeRepository";

import { ModalDelete } from "../../../../Components/Modals";

function EmergencyContact({ idEmployee }) {
  const [modal, setModal] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [isdelete, setDelete] = useState(false);

  const [id, setId] = useState([]);
  const [emergencyContact, setEmergencyContact] = useState([]);
  const [name, setName] = useState([]);
  const [relationship, setRelationship] = useState([]);
  const [phone, setPhone] = useState([]);
  const [mobilePhone, setMobilePhone] = useState([]);
  const [editId, setEditId] = useState([]);
  const [editName, setEditName] = useState([]);
  const [editRelationship, setEditRelationship] = useState([]);
  const [editPhone, setEditPhone] = useState([]);
  const [editMobilePhone, setEditMobilePhone] = useState([]);

  const inAwait = async () => {
    var data = await getEmergencyContact(idEmployee);
    setEmergencyContact(data.result);
  };

  useEffect(() => {
    inAwait();
  }, [inAwait]);

  const postDataAdd = async () => {
    var requestBody = {
      name: name,
      relationship: relationship,
      phone: phone,
      mobilePhone: mobilePhone,
    };
    console.log(requestBody);
    setModalAdd(false);
    var res = await addEmergencyContact(requestBody, idEmployee);
    inAwait();
    console.log(res);
  };
  const postDataEdit = async () => {
    var requestBody = {
      id: editId,
      name: editName,
      relationship: editRelationship,
      phone: editPhone,
      mobilePhone: editMobilePhone,
    };
    console.log(requestBody);
    setModal(false);
    var res = await updateEmergencyContact(requestBody, idEmployee);
    inAwait();
    console.log(res);
  };

  // console.log(id);
  return (
    <>
      <div>
        <div className="mb-4 d-flex justify-content-between">
          <div className="row">
            <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
              Emergency Contact
            </h3>
            <span
              style={{ fontSize: "10px", fontWeight: "400", color: "#737373" }}
            >
              List of Emergency contract{" "}
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
            type=""
          >
            <Plus className="me-2" size={20} weight="bold" />
            Add
          </button>
        </div>
        <hr style={{ backgroundColor: "#CACACA" }} className="my-4"></hr>
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
                  Telephone <ImportExport fontSize="2px" />
                </th>
                <th className="align-middle " onClick={() => {}}>
                  Mobile <ImportExport fontSize="2px" />
                </th>
                <th className="align-middle " onClick={() => {}}>
                  Relationship <ImportExport fontSize="2px" />
                </th>
                <th className="align-middle pe-5" onClick={() => {}}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {emergencyContact.map((val, index) => (
                <tr key={index} style={{ fontSize: "14px" }}>
                  <td className="align-middle">{val.name}</td>
                  <td className="align-middle">{val.phone}</td>
                  <td className="align-middle">{val.mobilePhone}</td>
                  <td className="align-middle">{val.relationship}</td>
                  <td className="align-middle">
                    <div className="flex flex-row gap-2">
                      <button
                        className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                        onClick={() => {
                          setEditId(val.id);
                          setEditName(val.name);
                          setEditPhone(val.phone);
                          setEditMobilePhone(val.mobilePhone);
                          setEditRelationship(val.relationship);
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
              ))}
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
            Edit Emergency Contact
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
                id="username"
                type="text"
                placeholder="Namme"
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
              <input
                value={editRelationship}
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                onChange={(e) => setEditRelationship(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Telephone
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                placeholder=""
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Mobile
              </label>
              <input
                value={editMobilePhone}
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                placeholder="ex : 0812xxxxxxxx"
                id="username"
                type="text"
                onChange={(e) => setEditMobilePhone(e.target.value)}
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
            Add Emergency Contact
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
                placeholder="Username"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Relationship
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                onChange={(e) => setRelationship(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Telephone
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                placeholder=""
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Mobile
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                placeholder="ex : 0812xxxxxxxx"
                id="username"
                type="text"
                onChange={(e) => setMobilePhone(e.target.value)}
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
          deleteEmergencyContact(id);
          inAwait();
          setDelete(false);
        }}
        active={isdelete}
      />
    </>
  );
}
export default EmergencyContact;
