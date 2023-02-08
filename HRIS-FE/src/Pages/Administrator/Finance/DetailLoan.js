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
<<<<<<< HEAD
import React, { useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { TextFieldSearch } from "../../../Components/TextField";
=======
import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { TextFieldSearch } from "../../../Components/TextField";
import moment from "moment/moment";
import { addLoanInstallemnt, deleteLoanInstallment, getLoanInstallment, updateLoanInstallment } from "../../../Repository/Finance";
import { ModalDelete } from "../../../Components/Modals";
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1

function DetailLoan() {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
<<<<<<< HEAD
  const { id } = useParams()

  console.log("id", id)
=======
  const [isDelete, setDelete] = useState(false);
  const location = useLocation();
  const dataLoan = location.state

  const [dataIstallment, setDataInstallment] = useState([])
  const [id, setId] = useState()

  const [installmentTo, setInstallmentTo] = useState("")
  const [date, setDate] = useState("")
  const [amount, setAmount] = useState("")

  const [editInstallmentTo, setEditInstallmentTo] = useState("")
  const [editDate, setEditDate] = useState("")
  const [editAmount, setEditAmount] = useState("")

  const convertDate = (data) => {
    var data1 = moment(data).format("L");
    var data2 = data1.split("/");
    return `${data2[2]}-${data2[0]}-${data2[1]}`;
  };

  console.log(dataLoan)

  const inAwait = async () => {
    var data = await getLoanInstallment(dataLoan.id);
    setDataInstallment(data.data.data);
    console.log(data.data.data);
  }
  useEffect(() => {
    inAwait()
  }, [])

  const postData = async (e) => {
    e.preventDefault();

    var requestBody = {
      loan_id: dataLoan.id,
      installment_to: installmentTo,
      payment_nominal: amount,
      payment_date: date
    };

    console.log(requestBody);
    await addLoanInstallemnt(requestBody)
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
      loan_id: dataLoan.id,
      installment_to: editInstallmentTo,
      payment_nominal: editAmount,
      payment_date: editDate
    };

    console.log(requestBody);
    await updateLoanInstallment(id, requestBody)
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

>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
  return (
    <>
      <div className="w-100 bg-[#FFFFFF] p-4 rounded-t-xl">
        <h2 className="text-lg">
<<<<<<< HEAD
          <b>Dona Adiloviana</b>
=======
          <b>{dataLoan.employeeName}</b>
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
        </h2>
        <br></br>
        <div className="space-y-3 mb-3">
          <div>
            <h3>Loan Name</h3>
<<<<<<< HEAD
            <p className="text-gray-400">Keperluan pribadi</p>
=======
            <p className="text-gray-400">{dataLoan.loanName}</p>
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
          </div>
          <div className="flex justify-between">
            <div className="flex gap-5">
              <div>
                <h3>Loan Date</h3>
<<<<<<< HEAD
                <p className="text-gray-400">15/01/2021</p>
              </div>
              <div>
                <h3>Expired Date</h3>
                <p className="text-gray-400">15/01/2022</p>
=======
                <p className="text-gray-400">{moment(dataLoan.use_date).format("L")}</p>
              </div>
              <div>
                <h3>Expired Date</h3>
                <p className="text-gray-400">{moment(dataLoan.use_date).add(dataLoan.max_installment, 'months').format("L")}</p>
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
              </div>
            </div>
            <Button
              className=""
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
              Add Installment
            </Button>
          </div>
        </div>
        <Table borderless responsive style={{ color: "#00000070" }}>
          <thead>
            <tr style={{ backgroundColor: "#EBF7FF" }}>
              {/* <th width="10px">
                <input type="checkbox" style={{ borderRadius: "2px" }} />
              </th> */}
              <th className="truncate" onClick={() => { }} style={{ minWidth: "10em" }}>
                Installment <ImportExport fontSize="2px" />
              </th>
              <th className="truncate" onClick={() => { }} style={{ minWidth: "10em" }}>
                Payment Date <ImportExport fontSize="2px" />
              </th>
              <th className="truncate" onClick={() => { }} style={{ minWidth: "10em" }}>
                Payment <ImportExport fontSize="2px" />
              </th>
<<<<<<< HEAD
              <th className="truncate" onClick={() => { }} style={{ minWidth: "11em" }}>
                Remaining Payment <ImportExport fontSize="2px" />
              </th>
=======
              {/* <th className="truncate" onClick={() => { }} style={{ minWidth: "11em" }}>
                Remaining Payment <ImportExport fontSize="2px" />
              </th> */}
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
              <th className="text-center" onClick={() => { }} style={{ minWidth: "11em" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
<<<<<<< HEAD
            {/* {dataAttendance.length > 0 ? (
          dataAttendance.map((value, index) => ( */}
            <tr>
              {/* <td className="align-middle">
                <input type="checkbox" style={{ borderRadius: "2px" }} />
              </td> */}
              <td className="align-middle">1</td>
              <td className="align-middle">15 Feb 2022</td>
              <td className="align-middle">Rp. 530.000</td>
              <td className="align-middle">Rp. 5.324.000</td>
              <td className="align-middle flex justify-center">
                <button
                  onClick={() => {
                    setModalEdit(true)
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
                  //   setId(val.id);
                  //   setDelete(true);
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
            <tr>
              {/* <td className="align-middle">
                <input type="checkbox" style={{ borderRadius: "2px" }} />
              </td> */}
              <td className="align-middle">2</td>
              <td className="align-middle">15 Mar 2022</td>
              <td className="align-middle">Rp. 530.000</td>
              <td className="align-middle">Rp. 5.324.000</td>
              <td className="align-middle flex justify-center">
                <button
                  onClick={() => {
                    setModalEdit(true)
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
                  //   setId(val.id);
                  //   setDelete(true);
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
            <tr>
              {/* <td className="align-middle">
                <input type="checkbox" style={{ borderRadius: "2px" }} />
              </td> */}
              <td className="align-middle">3</td>
              <td className="align-middle">15 Apr 2022</td>
              <td className="align-middle">Rp. 530.000</td>
              <td className="align-middle">Rp. 5.324.000</td>
              <td className="align-middle flex justify-center">
                <button
                  onClick={() => {
                    setModalEdit(true)
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
                  //   setId(val.id);
                  //   setDelete(true);
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
=======
            {dataIstallment.length > 0 ? (
              dataIstallment.map((val, index) => (
                <tr key={index}>
                  {/* <td className="align-middle">
                <input type="checkbox" style={{ borderRadius: "2px" }} />
              </td> */}
                  <td className="align-middle">{val.installment_to}</td>
                  <td className="align-middle">{moment(val.payment_date).format("LL")}</td>
                  <td className="align-middle">Rp. {parseInt(val.payment_nominal)}</td>
                  {/* <td className="align-middle">Rp. 5.324.000</td> */}
                  <td className="align-middle flex justify-center">
                    <button
                      onClick={() => {
                        setModalEdit(true);
                        setId(val.id)
                        setEditInstallmentTo(val.installment_to);
                        setEditDate(convertDate(val.payment_date));
                        setEditAmount(val.payment_nominal);
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
                <td colSpan={5}>
                  <div className="d-flex justify-content-center align-middle text-center">
                    No Data
                  </div>
                </td>
              </tr>
            )}
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
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
          <div className="flex gap-3">
            <div className="w-full">
              <label className="text-xs">Installment to</label>
<<<<<<< HEAD
                <input
                  type="number"
                  className="rounded-none rounded-l-lg border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                />
            </div>
            <div className="w-full">
              <label className="text-xs">Date of Payment</label>
                <input
                  type="date"
                  className="rounded-none rounded-l-lg border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                // onChange={(e) => setMaxInstallment(e.target.value)}
                />
=======
              <input
                type="number"
                className="rounded-none rounded-l-lg border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                onChange={(e) => setInstallmentTo(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label className="text-xs">Date of Payment</label>
              <input
                type="date"
                className="rounded-none rounded-l-lg border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setDate(e.target.value)}
              />
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
            </div>
          </div>
          <div className="w-full">
            <label className="text-xs">Amount</label>
            <input
              required
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              placeholder="Rp"
              min={0}
<<<<<<< HEAD
=======
              onChange={(e) => setAmount(e.target.value)}
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
            />
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
<<<<<<< HEAD
          // onClick={postData}
=======
            onClick={postData}
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
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
          <Modal.Title id="contained-modal-title-vcenter">Add Loan</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4 space-y-5">
          <div className="flex gap-3">
            <div className="w-full">
              <label className="text-xs">Installment to</label>
              <input
                type="number"
                className="rounded-none rounded-l-lg border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
<<<<<<< HEAD
=======
                value={editInstallmentTo}
                onChange={(e) => setEditInstallmentTo(e.target.value)}
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
              />
            </div>
            <div className="w-full">
              <label className="text-xs">Date of Payment</label>
              <input
                type="date"
                className="rounded-none rounded-l-lg border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
<<<<<<< HEAD
              // onChange={(e) => setMaxInstallment(e.target.value)}
=======
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
              />
            </div>
          </div>
          <div className="w-full">
            <label className="text-xs">Amount</label>
            <input
              required
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              placeholder="Rp"
              min={0}
<<<<<<< HEAD
=======
              value={editAmount}
              onChange={(e) => setEditAmount(e.target.value)}
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
            />
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
<<<<<<< HEAD
          // onClick={postData}
=======
          onClick={postDataEdit}
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
<<<<<<< HEAD
=======
      <ModalDelete
        close={() => {
          setDelete(false);
        }}
        submit={() => {
          deleteLoanInstallment(id);
          inAwait();
          setDelete(false);
        }}
        active={isDelete}
      />
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
    </>
  );
}

export default DetailLoan;
