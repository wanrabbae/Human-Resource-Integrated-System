import { Button } from "@mui/material";
import { React, useEffect, useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { Modal, Table } from "react-bootstrap";
import { ModalDelete, SwalSuccess } from "../../../../Components/Modals";
import {
  AddTermReason,
  DelTermReason,
  GetTermReason,
  UpdateTermReason,
} from "../../../../Repository/EmployeeRepository";
import * as XLSX from "xlsx";

function TerminationReasons() {
  const [termReason, setTermReason] = useState([]);
  const [id, setId] = useState();
  const [editValues, setEditValues] = useState();
  const inAwait = async () => {
    var rec = await GetTermReason();
    setTermReason(rec["result"]);
    console.log(rec);
  };
  useEffect(() => {
    inAwait();
  }, []);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [isdelete, setDelete] = useState(false);

  const exportExcel = async () => {
    if (termReason.length > 0) {
      var wb = XLSX.utils.book_new();
      var data = [];

      await termReason.map((app) => {
        data.push({
          "Name" : app.name,
        });
      });

      var ws = XLSX.utils.json_to_sheet(data);

      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

      XLSX.writeFile(wb, `Terminating Reason.xlsx`);
      console.log("Exported excel!");
    } else {
      alert("Data masih kosong");
    }
  };

  return (
    <>
      <div className="bg-white p-3 rounded-lg space-y-5">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1>Termination Reasons</h1>
            <p className="text-xs text-gray-400">Record Found</p>
          </div>
        </div>
        <div className="flex gap-3 justify-between">
          <button
            className="flex gap-2 items-center px-3 py-2 text-gray-700 border border-gray-100 rounded-lg hover:bg-gray-300"
            onClick={() => {
              exportExcel();
            }}
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
          <button
            className="bg-[#0E5073] hover:bg[#003049] text-white flex items-center p-2 rounded-md"
            onClick={() => setModalAdd(true)}
          >
            <PlusIcon className="text-white 5 w-5" aria-hidden="true" />
            Add Reasons
          </button>
        </div>

        <div className="overflow-x-auto relative">
          <Table
            borderless
            responsive
            style={{ color: "#00000070", fontSize: "0.75rem" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#EBF7FF" }}>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {termReason.length > 0 ? (
                termReason.map((val) => {
                  return (
                    <tr>
                      <td
                        className="align-middle"
                        style={{ minWidth: "200px" }}
                      >
                        {val.name}
                      </td>
                      <td className="align-midlle">
                        <button
                          className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg me-2"
                          onClick={() => {
                            setDelete(true);
                            setId(val["id"]);
                          }}
                        >
                          <TrashIcon className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                          className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                          onClick={() => {
                            setModalEdit(true);
                            setId(val["id"]);
                            setEditValues(val);
                          }}
                        >
                          <PencilIcon className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <td colSpan={2}>
                  <div className="d-flex justify-content-center align-middle text-center">
                    No Data
                  </div>
                </td>
              )}
            </tbody>
          </Table>
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
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
          />
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
            onClick={async () => {
              var requestBody = {
                name: document.getElementById("name").value,
              };
              var res = await AddTermReason(requestBody);
              console.log(res);
              SwalSuccess({ message: "Success add termination reason" });
              setModalAdd(!modalAdd);
              inAwait();
            }}
            type="button"
            className="text-white bg-[#0E5073] hover:bg-[#003049] font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-[#0E5073] dark:hover:bg-[#003049] focus:outline-none"
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
            id="name"
            value={editValues?.name ?? null}
            onChange={(e) =>
              setEditValues({ ...editValues, name: e.target.value })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
          />
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
            onClick={async () => {
              var requestBody = {
                id: id,
                name: document.getElementById("name").value,
              };
              var res = await UpdateTermReason(requestBody);
              console.log(res);
              setModalEdit(!modalEdit);
              SwalSuccess({ message: "Success Update termination reason" });
              inAwait();
            }}
            type="button"
            className="text-white bg-[#0E5073] hover:bg-[#003049] font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-[#0E5073] dark:hover:bg-[#003049] focus:outline-none"
          >
            Add
          </button>
        </Modal.Footer>
      </Modal>
      <ModalDelete
        close={() => {
          setDelete(false);
        }}
        submit={() => {
          DelTermReason(id);
          setDelete(false);
          inAwait();
          SwalSuccess({ message: "Success delete termination reason" });
        }}
        active={isdelete}
      />
    </>
  );
}

export default TerminationReasons;
