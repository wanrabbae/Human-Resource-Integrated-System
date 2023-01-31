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
import React, { useState, useEffect } from "react";
import { Dropdown, Table } from "react-bootstrap";
import { getApprovalTM, updateStatusTM } from "../../../../Repository/Inbox";
import { getLeaveDetail, getOvertimeDetail, getPermissionDetail } from "../../../../Repository/TimeManagementRepository";

function TimeManagement() {
  const [modalDetailApproval, setModalDetailApproval] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);

  const [dataTM, setDataTM] = useState([]);
  const [type, setType] = useState([]);

  const [detail, setDetail] = useState()

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
    var data = await getApprovalTM();
    setDataTM(data.data.data);
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
    await updateStatusTM(requestBody)
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

  const getDetail = async (id, type) => {
    console.log("id", id)
    console.log("type", type)
    switch (type) {
      case "Leave": {
        await getLeaveDetail(id)
          .then((response) => {
            console.log(response.data);
            setDetail(response.data);
            inAwait();
          })
          .catch((e) => {
            console.log("error", e.response);
            // if (e.response) {
            //   setMsg(e.response.data.message);
            // }
          });
      }
        break;
      case "Overtime": {
        await getOvertimeDetail(id)
          .then((response) => {
            console.log(response.data);
            setDetail(response.data);
            inAwait();
          })
          .catch((e) => {
            console.log("error", e.response);
            // if (e.response) {
            //   setMsg(e.response.data.message);
            // }
          });
      }
        break;
      case "Permission": {
        await getPermissionDetail(id)
          .then((response) => {
            console.log(response.data);
            setDetail(response.data);
            inAwait();
          })
          .catch((e) => {
            console.log("error", e.response);
            // if (e.response) {
            //   setMsg(e.response.data.message);
            // }
          });
      }
        break;

      default:
        console.log("default")
        break;
    }
  }

  return (
    <div className="border p-3 rounded-lg">
      <h2 className="font-semibold text-lg">Time Management</h2>
      <p className="font-thin text-sm text-gray-400">
        List of approval in Time Management
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
          {dataTM.length > 0 ? (
            dataTM.map((val, index) => (
              <tr key={index}>
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
                    <p className="truncate">{moment(val.date).format("LL")}</p>
                    <p className="tex-xs text-gray-400 font-light">
                      {moment(val.date).format("LT")}
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
                      // setDetail(val)
                      setModalDetail(true);
                      getDetail(val.id, val.type)
                      setType(val.type);
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
          maxWidth="lg"
        >
          <div className="m-5">
            <div className="flex justify-between mb-5">
              <h3 className="font-semibold text-xl">Detail</h3>
              <button onClick={() => setModalDetail(false)}>
                <Close />
              </button>
            </div>
            <div className="space-y-3">
              {type == "Leave" ?
                <div className="bg-[#F8F8F8] p-3">
                  <div className="grid grid-cols-2 border-b border-gray-300 py-2">
                    <div className="grid grid-cols-2 gap-2 py-2">
                      <p>Employee Name</p>
                      <p>: {detail?.employee ? detail?.employee.firstName : "-"}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 py-2">
                      <p>Job Position</p>
                      <p>: {detail?.jobposition ? detail?.jobposition?.name : "-"}</p>
                    </div>
                  </div>
                  <div className="">
                    <div className="grid grid-cols-4 gap-2 py-2">
                      <p>Start Date</p>
                      <p className="col-span-3">: {detail?.start_date ? detail?.start_date : "-"}</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-2">
                      <p>End Date</p>
                      <p className="col-span-3">: {detail?.end_date ? detail?.end_date : "-"}</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-2">
                      <p>Remaining Days Off</p>
                      <p className="col-span-3">: {detail?.remaining_days ? detail?.remaining_days : "-"} Days</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-2">
                      <p>Time Off Duration</p>
                      <p className="col-span-3">: 4 Days</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-2">
                      <p>Time off Type</p>
                      <p className="col-span-3">: {detail?.leave_type ? detail?.leave_type?.name : "-"}</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-2">
                      <p>Notes</p>
                      <p className="col-span-3">
                        : {detail?.note ? detail?.note : "-"}
                      </p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-2">
                      <p>Delegated Employee</p>
                      <p className="col-span-3">: {detail?.delegated_employee ? detail?.delegated_employee?.firstName : "-"}</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-2">
                      <p>Delegated Task</p>
                      <p className="col-span-3">
                        : {detail?.delegated_task ? detail?.delegated_task : "-"}
                      </p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-2">
                      <p>Emergency Contact</p>
                      <p className="col-span-3">: {detail?.emergency_contact ? detail?.emergency_contact?.name : "-"}</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-2">
                      <p>Emergency Phone Number</p>
                      <p className="col-span-3">: {detail?.emergency_contact ? detail?.emergency_contact?.mobilePhone : "-"}</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-2">
                      <p>Emergency Address</p>
                      <p className="col-span-3">
                        : Lorem ipsum dolor sit amet consectetur. Scelerisque erat
                        aenean pellentesque amet faucibus non. Condimentum dolor
                        scelerisque et diam et morbi hendrerit.
                      </p>
                    </div>
                  </div>
                </div>
                : null}
              {type == "Overtime" ?
                <div className="bg-[#F8F8F8] p-3">
                  <div className="grid grid-cols-4 gap-2 py-2">
                    <p>Employee Name</p>
                    <p className="col-span-3">: {detail?.employee ? detail?.employee.firstName : "-"}</p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-2">
                    <p>Job Position</p>
                    <p className="col-span-3">: {detail?.employee?.jobposition ? detail?.employee?.jobposition.name : "-"}</p>
                  </div>
                  <div className="">
                    <div className="grid grid-cols-4 gap-2 py-2">
                      <p>Overtime submission date</p>
                      <p className="col-span-3">:  {detail?.overtimeSubmissionDate ? detail?.overtimeSubmissionDate : "-"}</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-2">
                      <p>overtime on date</p>
                      <p className="col-span-3">:  {detail?.overtimeOnDate ? detail?.overtimeOnDate : "-"}</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-2">
                      <p>Start Time</p>
                      <p className="col-span-3">:  {detail?.startTime ? detail?.startTime : "-"}</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-2">
                      <p>End Time</p>
                      <p className="col-span-3">:  {detail?.endTime ? detail?.endTime : "-"}</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-2">
                      <p>Description</p>
                      <p className="col-span-3">:  {detail?.description ? detail?.description : "-"}</p>
                    </div>
                  </div>
                </div>
                : null}
              {type == "Permission" ?
                <div className="bg-[#F8F8F8] p-3">
                  <div className="grid grid-cols-4 gap-2 py-2">
                    <p>Employee Name</p>
                    <p className="col-span-3">: {detail?.employee ? detail?.employee.firstName : "-"}</p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-2">
                    <p>Job Position</p>
                    <p className="col-span-3">: {detail?.employee?.jobposition ? detail?.employee?.jobposition.name : "-"}</p>
                  </div>
                  <div className="">
                    <div className="grid grid-cols-4 gap-2 py-2">
                      <p>Permission Reason</p>
                      <p className="col-span-3">: {detail.permissionsReason ? detail.permissionsReason : "-"}</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-2">
                      <p>Date of Filling</p>
                      <p className="col-span-3">: {detail.dateOfFiling ? detail.dateOfFiling : "-"}</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-2">
                      <p>Submission Time</p>
                      <p className="col-span-3">: {detail.submissionTime ? detail.submissionTime : "-"}</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-2">
                      <p>Number of Days</p>
                      <p className="col-span-3">: {detail.numberOfDays ? detail.numberOfDays : "-"} Days</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-2">
                      <p>Start Time</p>
                      <p className="col-span-3">: {detail.startTime ? detail.startTime : "-"}</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-2">
                      <p>End Time</p>
                      <p className="col-span-3">: {detail.endTime ? detail.endTime : "-"}</p>
                    </div>
                    <h3 className="font-semibold text-lg">Back to Work</h3>
                    <div className="grid grid-cols-4 gap-2 py-2">
                      <p>Date</p>
                      <p className="col-span-3">: {detail.backToWorkDate ? detail.backToWorkDate : "-"}</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-2">
                      <p>Time</p>
                      <p className="col-span-3">: {detail.backToWorkTime ? detail.backToWorkTime : "-"}</p>
                    </div>
                  </div>
                </div>
                : null}
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
        </Dialog>
      </Modal>
    </div>
  );
}

export default TimeManagement;
