import {
  Add,
  DeleteOutline,
  EditOutlined,
  ImportExport,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { TextFieldSearch } from "../../../../../Components/TextField";

function CashAdvance() {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [search, setSearch] = useState(false);
  const [filter, setFilter] = useState(false);

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
            <th onClick={() => {}} style={{ minWidth: "20em" }}>
              Policy Name <ImportExport fontSize="2px" />
            </th>
            <th onClick={() => {}} style={{ minWidth: "11em" }}>
              Settiement Due <ImportExport fontSize="2px" />
            </th>
            <th onClick={() => {}} style={{ minWidth: "11em" }}>
              Limit Amount <ImportExport fontSize="2px" />
            </th>
            <th onClick={() => {}} style={{ minWidth: "10em" }}>
              Asign To <ImportExport fontSize="2px" />
            </th>
            <th onClick={() => {}} style={{ minWidth: "10em" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {/* {dataAttendance.length > 0 ? (
          dataAttendance.map((value, index) => ( */}
          <tr>
            {/* <td className="align-middle">
                <input type="checkbox" style={{ borderRadius: "2px" }} />
              </td> */}
            <td className="align-middle">Business Travel Ticket</td>
            <td className="align-middle">Rp. 2.000.000</td>
            <td className="align-middle">Rp. 2.000.000</td>
            <td className="align-middle text-blue-500">8 Postiton</td>
            <td className="align-middle d-flex">
              <button
                onClick={() => {
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
                // onClick={() => {
                //   setModalEdit(!modalEdit);
                // }}
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
          {/* ))
        ) : (
          <tr>
            <td colSpan={8}>
              <div className="d-flex justify-content-center align-middle text-center">
                No Data
              </div>
            </td>
          </tr>
        )} */}
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
            />
          </div>
          <div className="w-full">
            <label className="text-xs">Seittement Due</label>
            <input
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="Rp"
            />
          </div>
          <div className="w-1/3">
            <label className="text-xs">Min Next Claim</label>
            <div class="flex">
              <input
                type="text"
                id="website-admin"
                class="rounded-none rounded-l-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-transparent focus:border-transparent block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
              />
              <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                Days
              </span>
            </div>
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
                />
                <label
                  for="search"
                  onClick={() => {
                    setSearch((prev) => !prev);
                  }}
                >
                  Search by Employee
                </label>
              </div>
              {search && (
                <div className="ml-8 w-1/3">
                  <TextFieldSearch />
                </div>
              )}
              <div className="d-flex gap-2 mb-2">
                <input
                  required
                  className=""
                  type="radio"
                  name="asign"
                  id="filter"
                />
                <label
                  for="filter"
                  onClick={() => {
                    setFilter((prev) => !prev);
                  }}
                >
                  Select Filter
                </label>
              </div>
              {filter && (
                <div className="ml-8 space-y-3">
                  <div className="w-full">
                    <label className="text-xs">Job Grade</label>
                    <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                      <option className="py-3" hidden>
                        -- Select --
                      </option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="text-xs">Job Level</label>
                    <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                      <option className="py-3" hidden>
                        -- Select --
                      </option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="text-xs">Job Title</label>
                    <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                      <option className="py-3" hidden>
                        -- Select --
                      </option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="text-xs">Job Position</label>
                    <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                      <option className="py-3" hidden>
                        -- Select --
                      </option>
                    </select>
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
            />
          </div>
          <div className="w-full">
            <label className="text-xs">Seittement Due</label>
            <input
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="Rp"
            />
          </div>
          <div className="w-1/3">
            <label className="text-xs">Min Next Claim</label>
            <div class="flex">
              <input
                type="text"
                id="website-admin"
                class="rounded-none rounded-l-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-transparent focus:border-transparent block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
              />
              <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                Days
              </span>
            </div>
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
                />
                <label
                  for="search"
                  onClick={() => {
                    setSearch((prev) => !prev);
                  }}
                >
                  Search by Employee
                </label>
              </div>
              {search && (
                <div className="ml-8 w-1/3">
                  <TextFieldSearch />
                </div>
              )}
              <div className="d-flex gap-2 mb-2">
                <input
                  required
                  className=""
                  type="radio"
                  name="asign"
                  id="filter"
                />
                <label
                  for="filter"
                  onClick={() => {
                    setFilter((prev) => !prev);
                  }}
                >
                  Select Filter
                </label>
              </div>
              {filter && (
                <div className="ml-8 space-y-3">
                  <div className="w-full">
                    <label className="text-xs">Job Grade</label>
                    <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                      <option className="py-3" hidden>
                        -- Select --
                      </option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="text-xs">Job Level</label>
                    <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                      <option className="py-3" hidden>
                        -- Select --
                      </option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="text-xs">Job Title</label>
                    <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                      <option className="py-3" hidden>
                        -- Select --
                      </option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="text-xs">Job Position</label>
                    <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                      <option className="py-3" hidden>
                        -- Select --
                      </option>
                    </select>
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
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CashAdvance;
