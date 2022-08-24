import { Button } from "@mui/material";
import { React, useState } from "react";
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

function Report() {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  return (
    <>
      <div className="bg-white p-3 rounded-lg space-y-5">
        <div>
          <h1>Report</h1>
          <p className="text-xs text-gray-400">1 Record Found</p>
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
                placeholder="Search by Employee Name or Employee ID..."
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
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6 w-10">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </th>
                <th scope="col" className="py-3 px-6 w-36">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </td>
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Fakhri
                </td>
                <td className="py-4 px-6">
                  <div className="flex flex-row justify-end gap-2">
                    <button className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg">
                      <TrashIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                      onClick={() => setModalEdit(true)}
                    >
                      <PencilIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <a
                      href="/employee/detail-report"
                      className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                    >
                      <DocumentIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
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
            Add Report
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4 space-y-4">
          <div className="w-full">
            <label className="text-xs">Report Name</label>
            <input
              onChange={(val) => {}}
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
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option hidden>--Select--</option>
                </select>
                <button className="bg-[#E0EBF2] hover:bg[#003049] text-white flex items-center px-2 py-1 rounded-md">
                  <PlusIcon
                    className="text-[#669BBC] h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
            <div className="w-full">
              <label className="text-xs">Include</label>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option hidden>--Select--</option>
              </select>
            </div>
          </div>
          <label className="text-xs font-bold">Display Fields</label>
          <div className="grid grid-cols-2 gap-3">
            <div className="w-full">
              <label className="text-xs">Select Display Field Group</label>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option hidden>--Select Field --</option>
              </select>
            </div>
            <div className="w-full">
              <label className="text-xs">Select Display Field</label>
              <div className="flex flex-row gap-3">
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option hidden>--Select--</option>
                </select>
                <button className="bg-[#E0EBF2] hover:bg[#003049] text-white flex items-center px-2 py-1 rounded-md">
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
              <button className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg">
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
                for="default-toggle"
                class="inline-flex relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  value=""
                  id="default-toggle"
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Include Header
                </span>
              </label>
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
            Edit Report
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4 space-y-4">
          <div className="w-full">
            <label className="text-xs">Report Name</label>
            <input
              onChange={(val) => {}}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="Type here"
            />
          </div>
          <label className="text-xs font-bold">Selection Criteria</label>
          <div className="grid grid-cols-2 gap-3">
            <div className="w-full">
              <label className="text-xs">Select Criteria</label>
              <div className="flex flex-row gap-3">
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option hidden>--Select--</option>
                </select>
                <button className="bg-[#E0EBF2] hover:bg[#003049] text-white flex items-center px-2 py-1 rounded-md">
                  <PlusIcon
                    className="text-[#669BBC] h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
            <div className="w-full">
              <label className="text-xs">Include</label>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option hidden>--Select--</option>
              </select>
            </div>
          </div>
          <label className="text-xs mt-4 font-bold">Display Fields</label>
          <div className="grid grid-cols-2 gap-3">
            <div className="w-full">
              <label className="text-xs">Select Display Field Group</label>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option hidden>--Select Field --</option>
              </select>
            </div>
            <div className="w-full">
              <label className="text-xs">Select Display Field</label>
              <div className="flex flex-row gap-3">
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option hidden>--Select--</option>
                </select>
                <button className="bg-[#E0EBF2] hover:bg[#003049] text-white flex items-center px-2 py-1 rounded-md">
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
              <button className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg">
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
                class="inline-flex relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  value=""
                  id="default-toggle2"
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Include Header
                </span>
              </label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="m-4">
          <button
            // onClick={() => setModalEdit(false)}
            type="button"
            className="text-[#003049] bg-gray-200 hover:bg-gray-300 font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-gray-200 dark:hover:bg-gray-300 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="button"
            className="text-white bg-[#0E5073] hover:bg-[#003049] font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-[#0E5073] dark:hover:bg-[#003049] focus:outline-none"
          >
            Search
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Report;
