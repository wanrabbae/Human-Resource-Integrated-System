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

function Loan() {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div>
          <h5>
            <b>Loan Policy</b>
          </h5>
          <p>
            <small>list of Loan Policy</small>
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
              Max Installment <ImportExport fontSize="2px" />
            </th>
            <th onClick={() => {}} style={{ minWidth: "11em" }}>
              Interest <ImportExport fontSize="2px" />
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
            <td className="align-middle">Pinjaman Pribadi 1</td>
            <td className="align-middle">!2</td>
            <td className="align-middle">0%</td>
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
            Add Policy Loan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4 space-y-5">
          <div className="w-full">
            <label className="text-xs">Policy Name</label>
            <input
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="Input Policy name for Loan"
            />
          </div>
          <div className="d-flex gap-3">
            <div className="w-full">
              <label className="text-xs">Max Installment</label>
              <div class="flex">
                <input
                  type="text"
                  id="website-admin"
                  class="rounded-none rounded-l-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-transparent focus:border-transparent block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                />
                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  Month
                </span>
              </div>
            </div>
            <div className="w-full">
              <label className="text-xs">Interest</label>
              <div class="flex">
                <input
                  type="text"
                  id="website-admin"
                  class="rounded-none rounded-l-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-transparent focus:border-transparent block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                />
                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  %
                </span>
              </div>
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
            Edit Policy Loan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4 space-y-5">
          <div className="w-full">
            <label className="text-xs">Policy Name</label>
            <input
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="Input Policy name for Loan"
            />
          </div>
          <div className="d-flex gap-3">
            <div className="w-full">
              <label className="text-xs">Max Installment</label>
              <div class="flex">
                <input
                  type="text"
                  id="website-admin"
                  class="rounded-none rounded-l-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-transparent focus:border-transparent block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                />
                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  Month
                </span>
              </div>
            </div>
            <div className="w-full">
              <label className="text-xs">Interest</label>
              <div class="flex">
                <input
                  type="text"
                  id="website-admin"
                  class="rounded-none rounded-l-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-transparent focus:border-transparent block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                />
                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  %
                </span>
              </div>
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

export default Loan;
