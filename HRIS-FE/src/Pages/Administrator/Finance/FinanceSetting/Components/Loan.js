import {
  Add,
  DeleteOutline,
  EditOutlined,
  ImportExport,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { ModalDelete } from "../../../../../Components/Modals";
import { TextFieldSearch } from "../../../../../Components/TextField";
import {
  addLoanSetting,
  deleteLoanSetting,
  getLoanSetting,
  updateLoanSetting,
} from "../../../../../Repository/Finance";

function Loan() {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [isDelete, setDelete] = useState(false);

  const [dataLoan, setDataLoan] = useState([]);
  const [id, setId] = useState("");

  const [name, setName] = useState("");
  const [maxInstallment, setMaxInstallment] = useState("");
  const [interest, setInterest] = useState("");

  const [editName, setEditName] = useState("");
  const [editMaxInstallment, setEditMaxInstallment] = useState("");
  const [editInterest, setEditInterest] = useState("");

  const postData = async (e) => {
    e.preventDefault();

    var requestBody = {
      name: name,
      max_installment: maxInstallment,
      interest: interest,
    };
    console.log(requestBody);
    // if (name.name == undefined || name.name == null) {
    //   console.log("Please choose the employee");
    //   return false;
    // }
    // setUser(false);
    await addLoanSetting(requestBody)
      .then((response) => {
        console.log(response);
        inAwait();
        setModalAdd(false);
      })
      .catch((e) => {
        console.log("error", e.response);
        // if (e.response) {
        //   setMsg(e.response.data.message);
        // }
      });
  };

  const postDataEdit = async (e) => {
    e.preventDefault();

    var requestBody = {
      name: editName,
      max_installment: editMaxInstallment,
      interest: editInterest,
    };
    console.log(requestBody);
    // if (name.name == undefined || name.name == null) {
    //   console.log("Please choose the employee");
    //   return false;
    // }
    // setUser(false);
    await updateLoanSetting(id, requestBody)
      .then((response) => {
        console.log(response);
        inAwait();
        setModalEdit(false);
      })
      .catch((e) => {
        console.log("error", e.response);
        // if (e.response) {
        //   setMsg(e.response.data.message);
        // }
      });
  };

  const inAwait = async () => {
    var data = await getLoanSetting();
    setDataLoan(data.data.data);
    console.log(data.data.data);
  };

  useEffect(() => {
    inAwait();
  }, []);

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
            <th onClick={() => {}} className="truncate">
              Policy Name <ImportExport fontSize="2px" />
            </th>
            <th onClick={() => {}} className="truncate">
              Max Installment <ImportExport fontSize="2px" />
            </th>
            <th onClick={() => {}} className="truncate">
              Interest <ImportExport fontSize="2px" />
            </th>
            <th onClick={() => {}} className="truncate">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {dataLoan.length > 0 ? (
            dataLoan.map((val, index) => (
              <tr key={index}>
                {/* <td className="align-middle">
                <input type="checkbox" style={{ borderRadius: "2px" }} />
              </td> */}
                <td className="align-middle">{val.name}</td>
                <td className="align-middle">{val.max_installment}</td>
                <td className="align-middle">{val.interest}</td>
                <td className="align-middle d-flex">
                  <button
                    onClick={() => {
                      setId(val.id);
                      setEditName(val.name);
                      setEditMaxInstallment(val.max_installment);
                      setEditInterest(val.interest);
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
                      setId(val.id);
                      setDelete(true);
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
            ))
          ) : (
            <tr>
              <td colSpan={4}>
                <div className="d-flex justify-content-center align-middle text-center">
                  No Data
                </div>
              </td>
            </tr>
          )}
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
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="d-flex gap-3">
            <div className="w-full">
              <label className="text-xs">Max Installment</label>
              <div class="flex">
                <input
                  type="number"
                  min={0}
                  class="rounded-none rounded-l-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-transparent focus:border-transparent block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                  onChange={(e) => setMaxInstallment(e.target.value)}
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
                  type="number"
                  min={0}
                  class="rounded-none rounded-l-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-transparent focus:border-transparent block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                  onChange={(e) => setInterest(e.target.value)}
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
            onClick={postData}
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
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </div>
          <div className="d-flex gap-3">
            <div className="w-full">
              <label className="text-xs">Max Installment</label>
              <div class="flex">
                <input
                  type="number"
                  min={0}
                  class="rounded-none rounded-l-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-transparent focus:border-transparent block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                  value={editMaxInstallment}
                  onChange={(e) => setEditMaxInstallment(e.target.value)}
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
                  type="number"
                  min={0}
                  class="rounded-none rounded-l-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-transparent focus:border-transparent block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                  value={editInterest}
                  onChange={(e) => setEditInterest(e.target.value)}
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
            onClick={postDataEdit}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
      <ModalDelete
        close={() => {
          setDelete(false);
        }}
        submit={() => {
          deleteLoanSetting(id);
          inAwait();
          setDelete(false);
        }}
        active={isDelete}
      />
    </div>
  );
}

export default Loan;
