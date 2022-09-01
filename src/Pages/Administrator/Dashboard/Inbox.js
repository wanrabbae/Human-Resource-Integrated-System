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

function Inbox() {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  return (
    <>
      <div className="bg-white p-3 rounded-lg space-y-5">
        <div>
          <h1>Inbox</h1>
          <p className="text-xs text-gray-400">12 unread Message</p>
        </div>
        <div className="flex flex-row gap-3">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-transparent dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
            />
          </div>
          <Menu>
            <MenuHandler>
              <Button className="text-black p-0 shadow-none">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.77103 10.4854L12.5816 4.90723C12.7603 4.69922 12.5992 4.39453 12.3106 4.39453L2.68949 4.39453C2.40091 4.39453 2.23978 4.69922 2.41849 4.90723L7.22904 10.4854C7.36673 10.645 7.63334 10.645 7.77103 10.4854Z"
                    fill="#2E2E2E"
                  />
                </svg>
              </Button>
            </MenuHandler>
            <MenuList>
              <MenuItem>No One</MenuItem>
              <MenuItem>Select All</MenuItem>
              <MenuItem>Unread</MenuItem>
              <MenuItem>Already Unread</MenuItem>
            </MenuList>
          </Menu>
          <Tooltip content="Refresh">
            <a href="/Inbox">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.65 6.35C16.9099 5.60485 16.0296 5.01356 15.0599 4.61023C14.0902 4.2069 13.0503 3.99951 12 4C7.58001 4 4.01001 7.58 4.01001 12C4.01001 16.42 7.58001 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C17.2381 15.1695 16.4734 16.1824 15.4614 16.8988C14.4494 17.6153 13.24 18 12 18C8.69001 18 6.00001 15.31 6.00001 12C6.00001 8.69 8.69001 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z"
                  fill="#454545"
                />
              </svg>
            </a>
          </Tooltip>
        </div>
        <div className="overflow-x-auto">
          <a href="/inbox/detail">
            <div className="flex flex-row justify-between items-center bg-[#EBF7FF] border rounded-lg dark:bg-gray-800 dark:border-gray-700 my-1">
              <div className="flex flex-row gap-3 py-1 px-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-transparent dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <Envelope className="h-5 w-5" aria-hidden="true" />
                <p>Reimbursement has been approved</p>
              </div>
              <div className="flex flex-row justify-end items-center gap-3 py-1 px-6">
                <p className="text-sm">09.22</p>
                <button className="p-2">
                  <TrashIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </a>
          <a href="/inbox/detail">
            <div className="flex flex-row justify-between items-center bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-700 my-1">
              <div className="flex flex-row gap-3 py-1 px-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-transparent dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <EnvelopeOpen className="h-5 w-5" aria-hidden="true" />
                <p>Reimbursement has been approved</p>
              </div>
              <div className="flex flex-row justify-end items-center gap-3 py-1 px-6">
                <p className="text-sm">09.22</p>
                <button className="p-2">
                  <TrashIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </a>
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

export default Inbox;
