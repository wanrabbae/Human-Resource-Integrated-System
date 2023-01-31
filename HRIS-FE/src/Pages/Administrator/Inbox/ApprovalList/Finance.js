import {
  ArrowDropDown,
  Cancel,
  Check,
  CheckCircle,
  Clear,
  Close,
  DeleteOutline,
  EditOutlined,
  FileDownloadOutlined,
  ImportExport,
  WatchLater,
} from "@mui/icons-material";
import { Dialog, Modal } from "@mui/material";
import { red, teal, yellow } from "@mui/material/colors";
import moment from "moment/moment";
import { Eye, FunnelSimple } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { Dropdown, Table } from "react-bootstrap";
import {
  getApprovalfinance,
  getDetailCashAdvance,
  getDetailLoan,
  getDetailReimbursment,
  updateStatusFinance,
} from "../../../../Repository/Inbox";

function Finance() {
  const [modalDetail, setModalDetail] = useState(false);
  const [modalDetailApproval, setModalDetailApproval] = useState(false);
  const [dataFinance, setDataFinance] = useState([]);
  const [type, setType] = useState([]);

  const FilterToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      style={{
        borderRadius: "10px",
        border: "1.5px solid #CACACA",
        color: "#000000",
        fontSize: "14px",
        fontWeight: "500",
        backgroundColor: "#E8E8E8",
      }}
      className=" btn d-flex align-items-center"
      href=""
      ref={ref}
      // style={{
      //   color: "#003049",
      // }}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      Action
      <ArrowDropDown className="me-2" size={15} weight="bold" />
      {children}
    </a>
  ));

  const inAwait = async () => {
    var data = await getApprovalfinance();
    setDataFinance(data.data.data);
    console.log(data.data.data);
  };

  useEffect(() => {
    inAwait();
  }, []);

  const postData = async (id, type, status) => {
    var requestBody = {
      id: id,
      type: type,
      status: status,
    };
    console.log(requestBody);
    await updateStatusFinance(requestBody)
      .then((response) => {
        console.log(response);
        inAwait();
      })
      .catch((e) => {
        console.log("error", e.response);
        // if (e.response) {
        //   setMsg(e.response.data.message);
        // }
      });
  };


  const [typeDetail, setTypeDetail] = useState([])
  const detail = async (id, type) => {
    switch (type) {
      case "Reimbursment": {
        var data = await getDetailReimbursment(id);
        setTypeDetail(data.data.data);
      }
        break;
      case "Cash Advance": {
        var data = await getDetailCashAdvance(id);
        setTypeDetail(data.data.data);
      }
        break;
      case "Loan": {
        var data = await getDetailLoan(id);
        setTypeDetail(data.data.data);
      }
        break;

      default:
        setTypeDetail([])
        break;
    }
  }

  console.log(typeDetail)
  return (
    <div className="border p-3 rounded-lg">
      <h2 className="font-semibold text-lg">Finance</h2>
      <p className="font-thin text-sm text-gray-400">
        List of approval in Finance
      </p>
      <div className="flex my-3 gap-3">
        <button className="flex flex-row gap-2 bg-white hover:bg-[#003049] text-[#003049] border border-gray-200 flex items-center p-2 rounded-md">
          <DeleteOutline />

          <p>Delete</p>
        </button>
        <button className="flex flex-row gap-2 bg-white hover:bg-[#003049] text-[#003049] border border-gray-200 flex items-center p-2 rounded-md">
          <Check />

          <p>Approve All</p>
        </button>
        <button className="flex flex-row gap-2 bg-white hover:bg-[#003049] text-[#003049] border border-gray-200 flex items-center p-2 rounded-md">
          <Clear />

          <p>Reject All</p>
        </button>
      </div>

      <Table borderless responsive style={{ color: "#00000070" }}>
        <thead>
          <tr style={{ backgroundColor: "#EBF7FF" }}>
            <th width="10px">
              <input type="checkbox" style={{ borderRadius: "2px" }} />
            </th>
            <th onClick={() => { }} className="truncate">
              Employee Name <ImportExport fontSize="2px" />
            </th>
            <th onClick={() => { }} className="truncate">
              Form Filling Timestamp <ImportExport fontSize="2px" />
            </th>
            <th onClick={() => { }} className="truncate">
              Type <ImportExport fontSize="2px" />
            </th>
            <th onClick={() => { }} className="truncate">
              Approved <ImportExport fontSize="2px" />
            </th>
            <th onClick={() => { }} className="truncate">
              Action <ImportExport fontSize="2px" />
            </th>
            <th onClick={() => { }} className="truncate text-center">
              Detail <ImportExport fontSize="2px" />
            </th>
          </tr>
        </thead>
        <tbody>
          {dataFinance.length > 0 ? (
            dataFinance.map((val, i) => (
              <tr key={i}>
                <td className="align-middle">
                  <input type="checkbox" style={{ borderRadius: "2px" }} />
                </td>
                <td className="align-middle">
                  <div>
                    <p className="truncate">
                      {val?.employee ? val.employee?.firstName : "-"}
                    </p>
                    <p className="tex-xs text-gray-400 font-light">
                      {val?.employee?.jobposition
                        ? val?.employee?.jobposition?.job_id
                        : "-"}
                    </p>
                  </div>
                </td>
                <td className="align-middle">
                  <div>
                    <p className="truncate">{moment(val.createdAt).format("LL")}</p>
                    <p className="tex-xs text-gray-400 font-light">
                      {moment(val.createdAt).format("LT")}
                    </p>
                  </div>
                </td>
                <td className="align-middle truncate">{val.type}</td>
                <td className="align-middle">
                  <td className="px-6 py-2 text-sm">
                    <div className="flex flex-col gap-1 items-center">
                      {val.status == "pending" ? (
                        <WatchLater sx={{ color: yellow[800] }} />
                      ) : null}
                      {val.status == "approved" ? (
                        <CheckCircle sx={{ color: teal[500] }} />
                      ) : null}
                      {val.status == "rejected" ? (
                        <Cancel sx={{ color: red[800] }} />
                      ) : null}
                      {/* <p
                        onClick={() => setModalDetailApproval(true)}
                        className="text-xs text-gray-700 underline hover:text-black cursor-pointer"
                      >
                        Detail
                      </p> */}
                    </div>
                  </td>
                </td>
                <td className="align-middle text-center">
                  <Dropdown id="dropdown-menu-align-end">
                    <Dropdown.Toggle
                      as={FilterToggle}
                      id="dropdown-menu-align-end"
                      align="end"
                    />
                    <Dropdown.Menu size="sm">
                      <Dropdown.Item
                        onClick={() => postData(val.id, val.type, "approved")}
                        className="text-sm"
                      >
                        Approve
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => postData(val.id, val.type, "rejected")}
                        className="text-sm"
                      >
                        Reject
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td className="align-middle">
                  <button
                    onClick={() => {
                      setModalDetail(true);
                      setType(val.type);
                      detail(val.id, val.type)
                    }}
                    className="btn btn-sm mx-1"
                    style={{
                      backgroundColor: "#CEDFEA",
                      borderRadius: "8px",
                    }}
                  >
                    <Eye fontSize="20px" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>
                <div className="d-flex justify-content-center align-middle text-center">
                  No Data
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal
        open={modalDetailApproval}
        onClose={() => setModalDetailApproval(false)}
      >
        <Dialog
          open={modalDetailApproval}
          onClose={() => setModalDetailApproval(false)}
          scroll="body"
          fullWidth={true}
          maxWidth="sm"
        >
          <div className="m-5">
            <div className="flex justify-between mb-5">
              <h3 className="font-semibold text-xl">Detail Approval</h3>
              <button onClick={() => setModalDetailApproval(false)}>
                <Close />
              </button>
            </div>
            <div className="space-y-3">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs bg-[#EBF7FF] text-gray-700 uppercase dark:text-gray-400">
                  <tr className="capitalize">
                    <th className="py-3 px-3">Leader Name</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-3">Abdan Syakuro</td>
                    <td className="py-2 px-3">
                      <CheckCircle sx={{ color: teal[500] }} />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">Abdan Syakuro</td>
                    <td className="py-2 px-3">
                      <WatchLater
                        sx={{ color: yellow[800] }}
                        fontSize="large"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">Abdan Syakuro</td>
                    <td className="py-2 px-3">
                      <Cancel sx={{ color: red[800] }} />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-end gap-2 mt-5">
                <button
                  className="bg-[#0E5073] rounded-lg px-4 py-2 text-white"
                  onClick={() => setModalDetailApproval(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </Modal>

      <Modal open={modalDetail} onClose={() => setModalDetail(false)}>
        <Dialog
          open={modalDetail}
          onClose={() => setModalDetail(false)}
          scroll="body"
          fullWidth={true}
          maxWidth="md"
        >
          <div className="m-5">
            <div className="flex justify-between mb-5">
              <h3 className="font-semibold text-xl">Detail {type}</h3>
              <button onClick={() => setModalDetail(false)}>
                <Close />
              </button>
            </div>
            <div className="space-y-3">
              <div className="bg-gray-100 w-full rounded-lg p-3">
                {type == "Reimbursment" ? (
                  <div className="space-y-2">
                    <div className="grid grid-cols-3">
                      <p>Employee Name</p>
                      <p className="col-span-2">: {typeDetail.employee ? typeDetail.employee?.firstName : "-"}</p>
                    </div>
                    <div className="grid grid-cols-3">
                      <p>Reimbursment Policy</p>
                      <p className="col-span-2">: {typeDetail.reimbursement_setting ? typeDetail.reimbursement_setting?.name : "-"}</p>
                    </div>
                    <div className="grid grid-cols-3">
                      <p>Amount</p>
                      <p className="col-span-2">: {typeDetail.amount ? typeDetail.amount : "-"}</p>
                    </div>
                    <div className="grid grid-cols-3">
                      <p>Use Date</p>
                      <p className="col-span-2">: {typeDetail.use_date ? moment(typeDetail.use_date).format('L') : "-"}</p>
                    </div>
                    <div className="grid grid-cols-3">
                      <p>Notes</p>
                      <p className="col-span-2">: {typeDetail.note ? typeDetail.note : "-"}</p>
                    </div>
                    <div className="grid grid-cols-3">
                      <p>Attachment</p>
                      <a href={typeDetail.file ? typeDetail.file : "#"} download target="_blank" className="bg-gray-300 rounded-lg text-xs w-fit h-fit px-4 py-2">
                        Download File
                      </a>
                    </div>
                  </div>
                ) : null}
                {type == "Cash Advance" ? (
                  <div className="space-y-2">
                    <div className="grid grid-cols-3">
                      <p>Employee Name</p>
                      <p className="col-span-2">: {typeDetail.employee ? typeDetail.employee?.firstName : "-"}</p>
                    </div>
                    <div className="grid grid-cols-3">
                      <p>Cash Advance Policy</p>
                      <p className="col-span-2">: {typeDetail.cash_setting ? typeDetail.cash_setting?.name : "-"}</p>
                    </div>
                    <div className="grid grid-cols-3">
                      <p>Request Date</p>
                      <p className="col-span-2">: {typeDetail.request_date ? moment(typeDetail.request_date).format('L') : "-"}</p>
                    </div>
                    <div className="grid grid-cols-3">
                      <p>Date of Use</p>
                      <p className="col-span-2">: {typeDetail.use_date ? moment(typeDetail.use_date).format('L') : "-"}</p>
                    </div>
                    <div className="grid grid-cols-3">
                      <p>Amount</p>
                      <p className="col-span-2">: Rp. {typeDetail.amount ? typeDetail.amount : "-"}</p>
                    </div>
                    <div className="grid grid-cols-3">
                      <p>Note</p>
                      <p className="col-span-2">: {typeDetail.note ? typeDetail.note : "-"}</p>
                    </div>
                  </div>
                ) : null}
                {type == "Loan" ? (
                  <div className="space-y-2">
                    <div className="grid grid-cols-3">
                      <p>Employee Name</p>
                      <p className="col-span-2">: {typeDetail.employee ? typeDetail.employee?.firstName : "-"}</p>
                    </div>
                    <div className="grid grid-cols-3">
                      <p>Loan Policy</p>
                      <p className="col-span-2">: {typeDetail.loan_setting ? typeDetail.loan_setting?.name : "-"}</p>
                    </div>
                    <div className="grid grid-cols-3">
                      <p>Request Date</p>
                      <p className="col-span-2">: {typeDetail.request_date ? moment(typeDetail.request_date).format('L') : "-"}</p>
                    </div>
                    <div className="grid grid-cols-3">
                      <p>Date of Use</p>
                      <p className="col-span-2">: {typeDetail.use_date ? moment(typeDetail.use_date).format('L') : "-"}</p>
                    </div>
                    <div className="grid grid-cols-3">
                      <p>Interest</p>
                      <p className="col-span-2">: {typeDetail.interest ? typeDetail.interest : "0"}%</p>
                    </div>
                    <div className="grid grid-cols-3">
                      <p>Max Installment</p>
                      <p className="col-span-2">: {typeDetail.max_installment ? typeDetail.max_installment : "-"} Month</p>
                    </div>
                    <div className="grid grid-cols-3">
                      <p>Amount</p>
                      <p className="col-span-2">: Rp. {typeDetail.amount ? typeDetail.amount : "-"}</p>
                    </div>
                    <div className="grid grid-cols-3">
                      <p>Note</p>
                      <p className="col-span-2">: {typeDetail.note ? typeDetail.note : "-"}</p>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="flex justify-end gap-2 mt-5">
                <button
                  className="bg-[#0E5073] rounded-lg px-4 py-2 text-white"
                  onClick={() => setModalDetail(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </Modal>
    </div>
  );
}

export default Finance;
