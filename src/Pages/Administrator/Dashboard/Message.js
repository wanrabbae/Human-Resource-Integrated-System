import { Button } from "@mui/material";
import { React, useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { Modal, Table } from "react-bootstrap";
import { Envelope,EnvelopeOpen } from "phosphor-react";

function Message() {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  return (
    <>
      <div className="bg-white p-3 rounded-lg space-y-5">
        <div>
          <h1>Message</h1>
          <p className="text-xs text-gray-400">12 unread messages</p>
        </div>
        <button className="flex flex-row gap-2 bg-white hover:bg[#003049] text-[#003049] border border-gray-200 flex items-center p-2 rounded-md">
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
        <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            {/* <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Custom Field
                </th>
                <th scope="col" className="py-3 px-6">
                  Screen
                </th>
                <th scope="col" className="py-3 px-6">
                  Field Type
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead> */}

            <tbody className="space-y-3">
              <tr className="bg-[#EBF7FF] border rounded-lg dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="py-1 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="flex flex-row gap-2">
                    <Envelope className="h-5 w-5" aria-hidden="true"/>
                    <p>Your contract expires this month</p></div>
                </th>
                <td className="py-1 px-6">
                  <div className="flex flex-row justify-end gap-3">
                    <button className="p-2">
                      <TrashIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="bg-[#EBF7FF] border rounded-lg dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="py-1 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="flex flex-row gap-2">
                    <Envelope className="h-5 w-5" aria-hidden="true"/>
                    <p>Your contract expires this month</p></div>
                </th>
                <td className="py-1 px-6">
                  <div className="flex flex-row justify-end gap-3">
                    <button className="p-2">
                      <TrashIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="py-1 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="flex flex-row gap-2">
                    <EnvelopeOpen className="h-5 w-5" aria-hidden="true"/>
                    <p>Your contract expires this month</p></div>
                </th>
                <td className="py-1 px-6">
                  <div className="flex flex-row justify-end gap-3">
                    <button className="p-2">
                      <TrashIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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

export default Message;
