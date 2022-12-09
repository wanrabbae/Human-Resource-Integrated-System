import {
  AccessTimeFilled,
  Add,
  CheckCircle,
  DeleteOutline,
  EditOutlined,
  ImportExport,
  VisibilityOutlined,
} from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button } from "@mui/material";
import { red, teal, yellow } from "@mui/material/colors";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import React, { useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TextFieldSearch } from "../../../Components/TextField";

function Loan() {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const navigate = useNavigate()
  return (
    <>
      <div className="w-100 bg-[#FFFFFF] p-4 rounded-t-xl">
        <h5>
          <b>Loan</b>
        </h5>
        <p>
          <small>list of Loan</small>
        </p>
        <br></br>
        <div className="d-flex justify-content-between">
          <div className="d-flex gap-3">
            <button
              className="flex flex-row gap-2 bg-white hover:bg-[#003049] text-[#003049] border border-gray-200 flex items-center p-2 rounded-md"
              // onClick={() => setModalFilter(true)}
            >
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
            <button
              className="flex flex-row gap-2 bg-white hover:bg-[#003049] text-[#003049] border border-gray-200 flex items-center p-2 rounded-md"
              // onClick={() => setModalFilter(true)}
            >
              <svg
                width="14"
                height="16"
                viewBox="0 0 14 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.69 10.715C13.652 10.6241 13.5987 10.5404 13.5325 10.4675L11.2825 8.2175C11.1413 8.07627 10.9497 7.99693 10.75 7.99693C10.5503 7.99693 10.3587 8.07627 10.2175 8.2175C10.0763 8.35873 9.99693 8.55027 9.99693 8.75C9.99693 8.94973 10.0763 9.14127 10.2175 9.2825L11.1925 10.25H7C6.80109 10.25 6.61032 10.329 6.46967 10.4697C6.32902 10.6103 6.25 10.8011 6.25 11C6.25 11.1989 6.32902 11.3897 6.46967 11.5303C6.61032 11.671 6.80109 11.75 7 11.75H11.1925L10.2175 12.7175C10.1472 12.7872 10.0914 12.8702 10.0533 12.9616C10.0153 13.053 9.99565 13.151 9.99565 13.25C9.99565 13.349 10.0153 13.447 10.0533 13.5384C10.0914 13.6298 10.1472 13.7128 10.2175 13.7825C10.2872 13.8528 10.3702 13.9086 10.4616 13.9467C10.553 13.9847 10.651 14.0043 10.75 14.0043C10.849 14.0043 10.947 13.9847 11.0384 13.9467C11.1298 13.9086 11.2128 13.8528 11.2825 13.7825L13.5325 11.5325C13.602 11.4621 13.6556 11.3777 13.69 11.285C13.765 11.1024 13.765 10.8976 13.69 10.715ZM8.5 14H2.5C2.30109 14 2.11032 13.921 1.96967 13.7803C1.82902 13.6397 1.75 13.4489 1.75 13.25V2.75C1.75 2.55109 1.82902 2.36032 1.96967 2.21967C2.11032 2.07902 2.30109 2 2.5 2H6.25V4.25C6.25 4.84674 6.48705 5.41903 6.90901 5.84099C7.33097 6.26295 7.90326 6.5 8.5 6.5H11.5C11.6481 6.49926 11.7926 6.45471 11.9154 6.37196C12.0382 6.28921 12.1337 6.17196 12.19 6.035C12.2474 5.89842 12.2631 5.74788 12.2351 5.60239C12.2071 5.4569 12.1366 5.32297 12.0325 5.2175L7.5325 0.7175C7.4705 0.659162 7.39962 0.611061 7.3225 0.575H7.255L7.045 0.5H2.5C1.90326 0.5 1.33097 0.737053 0.90901 1.15901C0.487053 1.58097 0.25 2.15326 0.25 2.75V13.25C0.25 13.8467 0.487053 14.419 0.90901 14.841C1.33097 15.2629 1.90326 15.5 2.5 15.5H8.5C8.69891 15.5 8.88968 15.421 9.03033 15.2803C9.17098 15.1397 9.25 14.9489 9.25 14.75C9.25 14.5511 9.17098 14.3603 9.03033 14.2197C8.88968 14.079 8.69891 14 8.5 14ZM7.75 3.0575L9.6925 5H8.5C8.30109 5 8.11032 4.92098 7.96967 4.78033C7.82902 4.63968 7.75 4.44891 7.75 4.25V3.0575Z"
                  fill="#003049"
                />
              </svg>

              <p>Export</p>
            </button>
          </div>
          <div className="d-flex">
            <TextFieldSearch />
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
              Add Loan
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
              <th onClick={() => {}} style={{ minWidth: "10em" }}>
                Employee <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}} style={{ minWidth: "10em" }}>
                Loan Policy <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}} style={{ minWidth: "10em" }}>
                Interest <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}} style={{ minWidth: "11em" }}>
                Max Installment <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}} style={{ minWidth: "10em" }}>
                Amount <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}} style={{ minWidth: "20em" }}>Note</th>
              <th onClick={() => {}} style={{ minWidth: "10em" }}>Status</th>
              <th onClick={() => {}} style={{ minWidth: "10em" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* {dataAttendance.length > 0 ? (
          dataAttendance.map((value, index) => ( */}
            <tr>
              {/* <td className="align-middle">
                <input type="checkbox" style={{ borderRadius: "2px" }} />
              </td> */}
              <td className="align-middle">Dona Adiloviana</td>
              <td className="align-middle">Transportation</td>
              <td className="align-middle">3%</td>
              <td className="align-middle">24</td>
              <td className="align-middle">Rp. 8.000.000</td>
              <td className="align-middle">Konsumsi Acara Gathering</td>
              <td className="align-middle">
                <CheckCircle sx={{ color: teal[700] }} />
              </td>
              <td className="align-middle d-flex justify-content-evenly">
                <button
                    onClick={() => {
                  navigate('/finance/detail-loan')
                    }}
                  className="btn btn-sm mx-1"
                  style={{
                    backgroundColor: "#CEDFEA",
                    borderRadius: "8px",
                  }}
                >
                  <VisibilityOutlined fontSize="10px" />
                </button>
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
                    onClick={() => {
                  navigate('/finance/detail-loan')
                    }}
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
            <tr>
              {/* <td className="align-middle">
                <input type="checkbox" style={{ borderRadius: "2px" }} />
              </td> */}
              <td className="align-middle">Dona Adiloviana</td>
              <td className="align-middle">Transportation</td>
              <td className="align-middle">3%</td>
              <td className="align-middle">24</td>
              <td className="align-middle">Rp. 8.000.000</td>
              <td className="align-middle">Konsumsi Acara Gathering</td>
              <td className="align-middle">
                <CancelIcon sx={{ color: red[700] }} />
              </td>
              <td className="align-middle d-flex justify-content-evenly">
                <button
                    onClick={() => {
                  navigate('/finance/detail-loan')
                    }}
                  className="btn btn-sm mx-1"
                  style={{
                    backgroundColor: "#CEDFEA",
                    borderRadius: "8px",
                  }}
                >
                  <VisibilityOutlined fontSize="10px" />
                </button>
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
                  //   onClick={() => {
                  //     setDetail(value);
                  //     setDetailUser(!dialogDetailUser);
                  //   }}
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
            <tr>
              {/* <td className="align-middle">
                <input type="checkbox" style={{ borderRadius: "2px" }} />
              </td> */}
              <td className="align-middle">Dona Adiloviana</td>
              <td className="align-middle">Transportation</td>
              <td className="align-middle">3%</td>
              <td className="align-middle">24</td>
              <td className="align-middle">Rp. 8.000.000</td>
              <td className="align-middle">Konsumsi Acara Gathering</td>
              <td className="align-middle">
                <AccessTimeFilled sx={{ color: yellow[700] }} />
              </td>
              <td className="align-middle d-flex justify-content-evenly">
                <button
                  //   onClick={() => {
                  //     setDetail(value);
                  //     setDetailUser(!dialogDetailUser);
                  //   }}
                  className="btn btn-sm mx-1"
                  style={{
                    backgroundColor: "#CEDFEA",
                    borderRadius: "8px",
                  }}
                >
                  <VisibilityOutlined fontSize="10px" />
                </button>
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
                  //   onClick={() => {
                  //     setDetail(value);
                  //     setDetailUser(!dialogDetailUser);
                  //   }}
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
      </div>
      <div className="bg-[#FBFBFB] mt-0 px-4 py-3 rounded-b-xl d-flex align-items-center justify-content-between ">
        <div>
          <h6 className="text-[#A098AE]">
            Showing <span className="text-[#0E5073]">1-5</span> from{" "}
            <span className="text-[#0E5073]">100</span> data
          </h6>
        </div>
        <div>
          <button className="btn btn-sm">
            <ArrowLeft />
          </button>
          <button className="btn mx-2 bg-[#78000010] rounded-md text-[#780000]">
            1
          </button>
          <button className="btn bg-[#780000] rounded-md text-[#FFFFFF]">
            2
          </button>
          <button className="btn mx-2 bg-[#78000010] rounded-md text-[#780000]">
            3
          </button>
          <button className="btn btn-sm">
            <ArrowRight />
          </button>
        </div>
      </div>
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
          <Modal.Title id="contained-modal-title-vcenter">Add Loan</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4 space-y-5">
          <div className="w-full">
            <label className="text-xs">Employee Name</label>
            <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
              <option className="py-3" hidden>
                Select Employee Name
              </option>
            </select>
          </div>
          <div className="w-full">
            <label className="text-xs">Loan Policy</label>
            <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
              <option className="py-3" hidden>
                Select cash advance policy
              </option>
            </select>
          </div>
          <div className="d-flex gap-3">
            <div className="w-full">
              <label className="text-xs">Interest</label>
              <div class="flex">
                <input
                  type="text"
                  id="website-admin"
                  class="rounded-none rounded-l-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Auto Fill"
                  readOnly
                />
                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  %
                </span>
              </div>
            </div>
            <div className="w-full">
              <label className="text-xs">Max Installment</label>
              <div class="flex">
                <input
                  type="text"
                  id="website-admin"
                  class="rounded-none rounded-l-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                />
                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  Month
                </span>
              </div>
            </div>
          </div>
          <div className="w-full">
            <label className="text-xs">Amount</label>
            <input
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
            />
          </div>
          <div className="w-full">
            <label className="text-xs">Note</label>
            <textarea
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Note"
            ></textarea>
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
          <Modal.Title id="contained-modal-title-vcenter">Edit Loan</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4 space-y-5">
          <div className="w-full">
            <label className="text-xs">Employee Name</label>
            <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
              <option className="py-3" hidden>
                Select Employee Name
              </option>
            </select>
          </div>
          <div className="w-full">
            <label className="text-xs">Loan Policy</label>
            <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
              <option className="py-3" hidden>
                Select cash advance policy
              </option>
            </select>
          </div>
          <div className="d-flex gap-3">
            <div className="w-full">
              <label className="text-xs">Interest</label>
              <div class="flex">
                <input
                  type="text"
                  id="website-admin"
                  class="rounded-none rounded-l-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Auto Fill"
                  readOnly
                />
                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  %
                </span>
              </div>
            </div>
            <div className="w-full">
              <label className="text-xs">Max Installment</label>
              <div class="flex">
                <input
                  type="text"
                  id="website-admin"
                  class="rounded-none rounded-l-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                />
                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  Month
                </span>
              </div>
            </div>
          </div>
          <div className="w-full">
            <label className="text-xs">Amount</label>
            <input
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
            />
          </div>
          <div className="w-full">
            <label className="text-xs">Note</label>
            <textarea
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Note"
            ></textarea>
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
    </>
  );
}

export default Loan;
