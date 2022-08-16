import { Button } from "@mui/material";
import { React, useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { Modal, Table } from "react-bootstrap";

function TerminationReasons() {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  return (
    <>
      <div className="bg-white p-3 rounded-lg space-y-5">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1>Termination Reasons</h1>
            <p className="text-xs text-gray-400">2 Record Found</p>
          </div>
          <button
            className="bg-[#0E5073] hover:bg[#003049] text-white flex items-center p-2 rounded-md"
            onClick={() => setModalAdd(true)}
          >
            <PlusIcon className="text-white 5 w-5" aria-hidden="true" />
            Add Reasons
          </button>
        </div>

        <div class="overflow-x-auto relative">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6">
                  Name
                </th>
                <th scope="col" class="py-3 px-6 text-end">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Direct
                </th>
                <td class="py-4 px-6">
                  <div className="flex flex-row justify-end gap-3">
                    <button className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg">
                      <TrashIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                      onClick={() => setModalEdit(true)}
                    >
                      <PencilIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal Add */}
      <Modal show={modalAdd} size="md" onHide={() => setModalAdd(false)}>
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Add Termination Reasons
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <label className="text-xs">Name Reason</label>
          <input
            onChange={(val) => {}}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
          />
        </Modal.Body>
        <Modal.Footer className="m-4">
          <button
            onClick={() => setModalAdd(false)}
            type="button"
            class="text-[#003049] bg-gray-200 hover:bg-gray-300 font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-gray-200 dark:hover:bg-gray-300 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="button"
            class="text-white bg-[#0E5073] hover:bg-[#003049] font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-[#0E5073] dark:hover:bg-[#003049] focus:outline-none"
          >
            Add
          </button>
        </Modal.Footer>
      </Modal>

      {/* Modal Edit */}
      <Modal show={modalEdit} size="md" onHide={() => setModalEdit(false)}>
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Termination Reasons
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <label className="text-xs">Name Reason</label>
          <input
            onChange={(val) => {}}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
          />
        </Modal.Body>
        <Modal.Footer className="m-4">
          <button
            onClick={() => setModalEdit(false)}
            type="button"
            class="text-[#003049] bg-gray-200 hover:bg-gray-300 font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-gray-200 dark:hover:bg-gray-300 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="button"
            class="text-white bg-[#0E5073] hover:bg-[#003049] font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-[#0E5073] dark:hover:bg-[#003049] focus:outline-none"
          >
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TerminationReasons;
