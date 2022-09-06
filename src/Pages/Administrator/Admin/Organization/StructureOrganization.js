import { Button, FormControlLabel, Switch } from "@mui/material";
import { DeleteOutlineOutlined, CreateOutlined } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Modal } from "react-bootstrap";

function StructureOrganization() {
  const [isSelected, setSelected] = useState(true);
  const [modalAdd, setModalAdd] = useState(false);
  return (
    <>
      <div
        className="py-4 px-4"
        style={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
      >
        <div className="d-flex justify-content-between align-items-center pb-3">
          <div>
            <h2 className="text-lg">
              <b>Structure Organization</b>
            </h2>
            <h6 className="text-[#00000030] text-xs">
              Organizational structure of the company
            </h6>
          </div>
          <FormControlLabel
            value={isSelected}
            control={<Switch color="primary" />}
            label="Edit"
            labelPlacement="start"
            onChange={(val) => {
              setSelected(!isSelected);
            }}
          />
        </div>
        <hr></hr>
        {/* <div onClick={() => { }} className="mt-3 py-2 px-3 w-100 border-2 p-2 border-[#00000020] rounded-xl">
                    Organization
                </div> */}
        <ul>
          <li className="">
            <p className="mt-3 py-2 px-3 w-full shadow-md rounded-xl flex justify-between items-center">
              <span className="">Organization</span>
              <button
                className="bg-[#0E5073] hover:bg-[#003049] text-white flex items-center px-2 py-1 rounded-md"
                onClick={() => setModalAdd(true)}
              >
                <AddIcon className="text-white h-5 w-5" aria-hidden="true" />{" "}
                Add
              </button>
            </p>
            <ul className="ml-10">
              <li className="">
                <p className="mt-3 py-2 px-3 w-full shadow-md rounded-xl flex justify-between items-center">
                  <span>CEO</span>
                  <div className="flex space-x-3">
                    <button
                      className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                      //   onClick={() => setModalAdd(true)}
                    >
                      <DeleteOutlineOutlined
                        className="text-[#003049] h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                    <button
                      className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                      //   onClick={() => setModalAdd(true)}
                    >
                      <CreateOutlined
                        className="text-[#003049] h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                    <button
                      className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                      onClick={() => setModalAdd(true)}
                    >
                      <AddIcon
                        className="text-[#003049] h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </p>
                <ul className="ml-10">
                  <li className="">
                    <p className="mt-3 py-2 px-3 w-full shadow-md rounded-xl flex justify-between items-center">
                      <span>ADM dan F/T/A</span>
                      <div className="flex space-x-3">
                        <button
                          className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                          //   onClick={() => setModalAdd(true)}
                        >
                          <DeleteOutlineOutlined
                            className="text-[#003049] h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                        <button
                          className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                          //   onClick={() => setModalAdd(true)}
                        >
                          <CreateOutlined
                            className="text-[#003049] h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                        <button
                          className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                          onClick={() => setModalAdd(true)}
                        >
                          <AddIcon
                            className="text-[#003049] h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </p>
                    <ul className="ml-10">
                      <li className="">
                        <p className="mt-3 py-2 px-3 w-full shadow-md rounded-xl flex justify-between items-center">
                          <span>HR/GA</span>
                          <div className="flex space-x-3">
                            <button
                              className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                              //   onClick={() => setModalAdd(true)}
                            >
                              <DeleteOutlineOutlined
                                className="text-[#003049] h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                            <button
                              className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                              //   onClick={() => setModalAdd(true)}
                            >
                              <CreateOutlined
                                className="text-[#003049] h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                            <button
                              className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                              onClick={() => setModalAdd(true)}
                            >
                              <AddIcon
                                className="text-[#003049] h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </p>
                      </li>
                      <li className="">
                        <p className="mt-3 py-2 px-3 w-full shadow-md rounded-xl flex justify-between items-center">
                          <span>F/T/A</span>
                          <div className="flex space-x-3">
                            <button
                              className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                              //   onClick={() => setModalAdd(true)}
                            >
                              <DeleteOutlineOutlined
                                className="text-[#003049] h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                            <button
                              className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                              //   onClick={() => setModalAdd(true)}
                            >
                              <CreateOutlined
                                className="text-[#003049] h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                            <button
                              className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                              onClick={() => setModalAdd(true)}
                            >
                              <AddIcon
                                className="text-[#003049] h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </p>
                      </li>
                    </ul>
                  </li>
                  <li className="">
                    <p className="mt-3 py-2 px-3 w-full shadow-md rounded-xl flex justify-between items-center">
                      <span>BBISDEV/ COMMERCE</span>
                      <div className="flex space-x-3">
                        <button
                          className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                          //   onClick={() => setModalAdd(true)}
                        >
                          <DeleteOutlineOutlined
                            className="text-[#003049] h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                        <button
                          className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                          //   onClick={() => setModalAdd(true)}
                        >
                          <CreateOutlined
                            className="text-[#003049] h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                        <button
                          className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                          onClick={() => setModalAdd(true)}
                        >
                          <AddIcon
                            className="text-[#003049] h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      {/* Modal Add */}
      <Modal show={modalAdd} size="lg" onHide={() => setModalAdd(false)}>
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Add Organization Unit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="grid grid-cols-1 gap-3 mt-3">
            <div className="w-full">
              <label className="text-xs">ID</label>
              <input
                onChange={(val) => {}}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="ID..."
              />
            </div>
            <div className="w-full">
              <label className="text-xs">Unit</label>
              <select className="appearance-none border rounded w-full text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                <option className="py-3" hidden>
                  Select
                </option>
                <option className="py-3">Division</option>
                <option className="py-3">Department</option>
                <option className="py-3">Sub Department</option>
                <option className="py-3">Section</option>
                <option className="py-3">Sub Section</option>
              </select>
            </div>
            <div className="w-full">
              <label className="text-xs">Name</label>
              <input
                onChange={(val) => {}}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="Organization name..."
                readOnly
              />
            </div>
            <div className="w-full">
              <label className="text-xs">Description</label>
              <textarea
                onChange={(val) => {}}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Description..."
                rows="5"
              ></textarea>
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
    </>
  );
}

export default StructureOrganization;
