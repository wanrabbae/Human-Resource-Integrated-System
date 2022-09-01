import { React, useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { Modal, Table } from "react-bootstrap";
import { Envelope, EnvelopeOpen } from "phosphor-react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Tooltip,
} from "@material-tailwind/react";

function DetailInbox() {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  return (
    <>
      <div className="bg-white p-3 rounded-lg space-y-5 h-96">
        <div className="border-b border-gray-900 p-3 space-y-3">
          <h1 className="font-bold text-lg">Reimbursement has been approved</h1>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2">
              <img
                src="https://yt3.ggpht.com/ytc/AMLnZu_dQcZgE7y2IBm3OM8Jv7xS9Y2WMmco3f9l5-Nc=s900-c-k-c0x00ffffff-no-rj"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "100px",
                  objectFit: "cover",
                }}
              />
              <div className="flex flex-col">
                <h5 className="text-sm text-black font-semibold">HRIS</h5>
                <p className="text-xs">to me</p>
              </div>
            </div>
            <p className="text-sm">30 August 2022 09:22</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-light">
            Reimbursement of funds has been approved on August 30, 2022
            amounting to Rp. 350,000 and has been sent to your bank account.
          </p>
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
            Add Custom Field
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="flex flex-row gap-3 mb-3">
            <div className="w-1/2">
              <label className="text-xs">Field Name</label>
              <input
                onChange={(val) => {}}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
              />
            </div>
            <div className="w-1/2">
              <label className="text-xs">Screen</label>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Personal Details</option>
                <option>Contact Details</option>
                <option>Emergency Contacts</option>
                <option>Dependents</option>
                <option>Immiration</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <div className="w-1/2">
              <label className="text-xs">Type Field</label>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Text or Number</option>
                <option>Dropdown</option>
              </select>
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
            type="button"
            className="text-white bg-[#0E5073] hover:bg-[#003049] font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-[#0E5073] dark:hover:bg-[#003049] focus:outline-none"
          >
            Add
          </button>
        </Modal.Footer>
      </Modal>

      {/* Modal Edit */}
      <Modal show={modalEdit} size="lg" onHide={() => setModalEdit(false)}>
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Custom Field
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="flex flex-row gap-3 mb-3">
            <div className="w-1/2">
              <label className="text-xs">Field Name</label>
              <input
                onChange={(val) => {}}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
              />
            </div>
            <div className="w-1/2">
              <label className="text-xs">Sreen</label>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Personal Details</option>
                <option>Contact Details</option>
                <option>Emergency Contacts</option>
                <option>Dependents</option>
                <option>Immiration</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <div className="w-1/2">
              <label className="text-xs">Type Field</label>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Text or Number</option>
                <option>Dropdown</option>
              </select>
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
            type="button"
            className="text-white bg-[#0E5073] hover:bg-[#003049] font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-[#0E5073] dark:hover:bg-[#003049] focus:outline-none"
          >
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DetailInbox;
