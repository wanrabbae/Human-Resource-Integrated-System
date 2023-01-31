import { React, useEffect, useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { Modal, Table } from "react-bootstrap";
import { ModalDelete, SwalSuccess } from "../../../../Components/Modals";
import {
  GetReportMeth,
  AddReportMeth,
  DelReportMeth,
  UpdateReportMeth,
} from "../../../../Repository/EmployeeRepository";

function ReportingMethods() {
  const [reportingMeth, setReportingMeth] = useState([]);
  const [id, setId] = useState();
  const [editValues, setEditValues] = useState();
  const inAwait = async () => {
    var rec = await GetReportMeth();
    setReportingMeth(rec["result"]);
    console.log(rec);
  };
  useEffect(() => {
    inAwait();
  }, []);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [isdelete, setDelete] = useState(false);
  return (
    <>
      <div className="bg-white p-3 rounded-lg space-y-5">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1>Reporting Methods</h1>
            <p className="text-xs text-gray-400">
              {reportingMeth.length} Record Found
            </p>
          </div>
          <button
            className="bg-[#0E5073] hover:bg[#003049] text-white flex items-center p-2 rounded-md"
            onClick={() => setModalAdd(true)}
            disabled
          >
            <PlusIcon className="text-white 5 w-5" aria-hidden="true" /> Add
            Methods
          </button>
        </div>

        <div className="overflow-x-auto relative">
          <Table borderless responsive style={{ color: "#00000070", fontSize: "0.75rem"}}>
            <thead>
              <tr style={{ backgroundColor: "#EBF7FF" }}>
                <th >
                  Name
                </th>
                <th >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {reportingMeth.length > 0 ? (
                reportingMeth.map((val) => {
                  return (
                    <tr >
                      <td
                        className="align-middle" style={{ minWidth: "200px" }}
                      >
                        {val.name}
                      </td>
                      <td className="align-middle">
                          <button
                            className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg me-2"
                            onClick={() => {
                              setDelete(true);
                              setId(val["id"]);
                              console.log(id);
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
                            <PencilIcon
                              className="h-4 w-4"
                              aria-hidden="true"
                            />
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
            Add Reporting Methods
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <label className="text-xs">Name Reporting Methods</label>
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
              var res = await AddReportMeth(requestBody);
              console.log(res);
              SwalSuccess({ message: "Success add Reporting Method" });
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
            Edit Reporting Methods
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <label className="text-xs">Name Reporting Methods</label>
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
              var res = await UpdateReportMeth(requestBody);
              console.log(res);
              setModalEdit(!modalEdit);
              SwalSuccess({ message: "Success Update Reporting Method" });
              inAwait();
            }}
            className="text-white bg-[#0E5073] hover:bg-[#003049] font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-[#0E5073] dark:hover:bg-[#003049] focus:outline-none"
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
      <ModalDelete
        close={() => {
          setDelete(false);
        }}
        submit={() => {
          DelReportMeth(id);
          setDelete(false);
          inAwait();
          SwalSuccess({ message: "Success delete reporting method" });
        }}
        active={isdelete}
      />
    </>
  );
}

export default ReportingMethods;
