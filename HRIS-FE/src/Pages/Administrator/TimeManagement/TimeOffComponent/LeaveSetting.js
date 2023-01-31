import {
  Add,
  ArrowLeft,
  ArrowRight,
  Cancel,
  CheckCircle,
  Close,
  DeleteOutline,
  EditOutlined,
  FileDownloadOutlined,
  FilterList,
  ImportExport,
  Search,
  Visibility,
  WatchLater,
} from "@mui/icons-material";
import { Box, Button, Dialog, Modal, Table, Typography } from "@mui/material";
import { blue, green, grey, red, teal, yellow } from "@mui/material/colors";
import { borderColor } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ModalDelete, SwalSuccess } from "../../../../Components/Modals";
import {
  createLeaveType,
  deleteLeaveType,
  GetLeaveType,
  updateLeaveType,
} from "../../../../Repository/TimeManagementRepository";

function LeaveSetting() {
  const [modalDetailApproval, setModalDetailApproval] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  const [refreshApi, setRefreshApi] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");

  const [name, setName] = useState("");
  const [maxDuration, setMaxDuration] = useState("");
  const [submissionBefore, setSubmissionBefore] = useState("");

  const [editName, setEditName] = useState("");
  const [editMaxDuration, setEditMaxDuration] = useState("");
  const [editSubmissionBefore, setEditSubmissionBefore] = useState("");

  useEffect(() => {
    GetLeaveType().then((response) => {
      setData(response.data);
      console.log(response.data);
    });
    setRefreshApi(false);
  }, [refreshApi]);

  const postData = async (e) => {
    e.preventDefault();
    const form = {
      name: name,
      max_duration: maxDuration,
      submission_before: submissionBefore,
    };
    console.log(form);
    await createLeaveType(form)
      .then((response) => {
        console.log(response);
        setRefreshApi(true);
        setModalAdd(false);
        SwalSuccess({ message: "Success Add Leave Type" });
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
    const form = {
      name: editName,
      max_duration: editMaxDuration,
      submission_before: editSubmissionBefore,
    };
    // console.log(id,form);
    await updateLeaveType(form,id)
      .then((response) => {
        console.log(response);
        setRefreshApi(true);
        setModalEdit(false);
        SwalSuccess({ message: "Success Edit Leave Type" });
      })
      .catch((e) => {
        console.log("error", e.response);
        // if (e.response) {
        //   setMsg(e.response.data.message);
        // }
      });
  };

  const deteData = async () => {
    await deleteLeaveType(id)
      .then((response) => {
        console.log(response);
        setRefreshApi(true);
        setModalDelete(false);
      })
      .catch((e) => {
        console.log(e.response);
        // if (e.response) {
        //   setMsg(e.response.data.message);
        // }
      });
  };

  return (
    <div className="bg-white p-5 rounded-lg">
      <h5>
        <b>Leave Type Setting</b>
      </h5>
      <p>
        <small>List of Leave Type</small>
      </p>
      <br></br>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div>
            <input
              type="date"
              className="bg-gray-100 border border-none text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              //   onClick={() => inAwait()}
              //   onChange={async (e) => {
              //     console.log(e.target.value);
              //     const res = await GetAttendanceByDate(e.target.value);
              //     console.log(res);
              //     setDataAttendance(res);
              //   }}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center py-2 px-1 justify-between border border-2 border-gray-300 rounded-lg">
            <Search className="mx-2 text-gray-400" />

            <input
              className="mr-2 bg-transparent focus:outline-none focus:ring-none focus:ring-none"
              // onChange={(e) => searchUser(e.target.value)}
              placeholder="Search"
            />
          </div>
          <Button
            onClick={() => setModalAdd(true)}
            style={{
              color: "#FFFFFF",
              borderRadius: "7px",
              backgroundColor: "#0E5073",
            }}
            variant="outline"
            startIcon={<Add />}
          >
            Add Leave Type
          </Button>
          <div className="mx-2"></div>
        </div>
      </div>
      <br></br>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs bg-[#EBF7FF] text-gray-700 uppercase dark:text-gray-400">
            <tr className="capitalize">
              <th className="py-3 px-6">Type Name</th>
              <th className="py-3 px-6">Maximal Duration</th>
              <th className="py-3 px-6">Submission Before</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length != 0 ? (
              data.map((val, index) => (
                <tr key={index}>
                  <td className="py-2 px-6">{val.name}</td>
                  <td className="py-2 px-6">{val.max_duration}</td>
                  <td className="py-2 px-6">{val.submission_before}</td>
                  <td className="py-2 px-6">
                    <div className="flex flex-row gap-3">
                      <button
                        className="bg-blue-100 hover:bg-blue-200 p-2 rounded-lg"
                        onClick={() => {
                          setId(val.id);
                          setEditName(val.name);
                          setEditMaxDuration(val.max_duration);
                          setEditSubmissionBefore(val.submission_before);
                          setModalEdit(true);
                        }}
                      >
                        <EditOutlined
                          style={{ color: "#003049" }}
                          fontSize="small"
                        />
                      </button>
                      <a
                        href="#"
                        className="bg-blue-100 hover:bg-blue-200 p-2 rounded-lg"
                        onClick={() => {
                          setId(val.id);
                          setDelete(true);
                        }}
                      >
                        <DeleteOutline
                          style={{ color: "#003049" }}
                          fontSize="small"
                        />
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="bg-[#FBFBFB] mt-0 px-4 py-3 rounded-b-xl flex items-center justify-between ">
        <div>
          <h6 className="text-sm text-[#A098AE]">
            Showing <span className="text-[#0E5073]">50</span> from{" "}
            <span className="text-[#0E5073]">100</span> data
          </h6>
        </div>
        <div>
          <button className="">
            <ArrowLeft />
          </button>
          <button className="bg-[#78000010] px-2 mx-2 rounded-md text-[#780000]">
            1
          </button>
          <button className="bg-[#780000] px-2 mx-2 rounded-md text-[#FFFFFF]">
            2
          </button>
          <button className="bg-[#78000010] px-2 mx-2 rounded-md text-[#780000]">
            3
          </button>
          <button className="">
            <ArrowRight />
          </button>
        </div>
      </div>
      <Modal open={modalAdd} onClose={() => setModalAdd(false)}>
        <Dialog
          open={modalAdd}
          onClose={() => setModalAdd(false)}
          scroll="body"
          fullWidth={true}
          maxWidth="md"
        >
          <div className="m-5">
            <div className="flex justify-between mb-5">
              <h3 className="font-semibold text-xl">Add Leave Type</h3>
              <button onClick={() => setModalAdd(false)}>
                <Close />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label
                  for="typeName"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Type Name
                </label>
                <input
                  type="text"
                  id="typeName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                  placeholder="Type Name..."
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label for="max" className="block mb-2 text-sm text-gray-600">
                    Maximum Duration
                  </label>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <input
                      type="number"
                      id="max"
                      min={0}
                      className="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                      onChange={(e) => setMaxDuration(e.target.value)}
                      required
                    />
                    <p className="text-sm">Days</p>
                  </div>
                </div>
                <div>
                  <label for="max" className="block mb-2 text-sm text-gray-600">
                    Submission Before
                  </label>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <input
                      type="number"
                      id="max"
                      min={0}
                      className="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                      onChange={(e) => setSubmissionBefore(e.target.value)}
                      required
                    />
                    <p className="truncate text-sm">Days Before</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-5">
                <button
                  className="bg-gray-200 text-[#0E5073] rounded-lg px-4 py-2"
                  onClick={() => setModalAdd(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#0E5073] rounded-lg px-4 py-2 text-white"
                  onClick={postData}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </Modal>
      <Modal open={modalEdit} onClose={() => setModalEdit(false)}>
        <Dialog
          open={modalEdit}
          onClose={() => setModalEdit(false)}
          scroll="body"
          fullWidth={true}
          maxWidth="md"
        >
          <div className="m-5">
            <div className="flex justify-between mb-5">
              <h3 className="font-semibold text-xl">Edit Leave Type</h3>
              <button onClick={() => setModalEdit(false)}>
                <Close />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label
                  for="typeName"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Type Name
                </label>
                <input
                  type="text"
                  id="typeName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label for="max" className="block mb-2 text-sm text-gray-600">
                    Maximum Duration
                  </label>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <input
                      type="number"
                      id="max"
                      min={0}
                      className="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                      value={editMaxDuration}
                      onChange={(e) => setEditMaxDuration(e.target.value)}
                      required
                    />
                    <p className="text-sm">Days</p>
                  </div>
                </div>
                <div>
                  <label
                    for="submissionBefore"
                    className="block mb-2 text-sm text-gray-600"
                  >
                    Submission Before
                  </label>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <input
                      type="number"
                      id="submissionBefore"
                      min={0}
                      className="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                      value={editSubmissionBefore}
                      onChange={(e) => setEditSubmissionBefore(e.target.value)}
                      required
                    />
                    <p className="truncate text-sm">Days Before</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-5">
                <button
                  className="bg-gray-200 text-[#0E5073] rounded-lg px-4 py-2"
                  onClick={() => setModalEdit(false)}
                >
                  Cancel
                </button>
                <button className="bg-[#0E5073] rounded-lg px-4 py-2 text-white" onClick={postDataEdit}>
                  Submit
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
              <h3 className="font-semibold text-xl">Detail Time Off</h3>
              <button onClick={() => setModalDetail(false)}>
                <Close />
              </button>
            </div>
            <div className="space-y-3">
              <div className="bg-[#F8F8F8] p-3">
                <div className="grid grid-cols-2 border-b border-gray-300 py-2">
                  <div className="grid grid-cols-2 gap-2 py-2">
                    <p>Job Position</p>
                    <p>: Staff IT</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-2">
                    <p>Job Position</p>
                    <p>: Staff IT</p>
                  </div>
                </div>
                <div className="">
                  <div className="grid grid-cols-4 gap-2 py-2">
                    <p>Start Date</p>
                    <p className="col-span-3">: 26/11/2022</p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-2">
                    <p>End Date</p>
                    <p className="col-span-3">: 30/11/2022</p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-2">
                    <p>Remaining Days Off</p>
                    <p className="col-span-3">: 7 Days</p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-2">
                    <p>Time Off Duration</p>
                    <p className="col-span-3">: 4 Days</p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-2">
                    <p>Time off Type</p>
                    <p className="col-span-3">: Married</p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-2 border-b border-gray-300">
                    <p>Notes</p>
                    <p className="col-span-3">
                      : Lorem ipsum dolor sit amet consectetur. Scelerisque erat
                      aenean pellentesque amet faucibus non. Condimentum dolor
                      scelerisque et diam et morbi hendrerit.
                    </p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-2">
                    <p>Delegated Employee</p>
                    <p className="col-span-3">: M. Iqbal Ainurafie</p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-2 border-b border-gray-300">
                    <p>Delegated Task</p>
                    <p className="col-span-3">
                      : Lorem ipsum dolor sit amet consectetur. Scelerisque erat
                      aenean pellentesque amet faucibus non. Condimentum dolor
                      scelerisque et diam et morbi hendrerit.
                    </p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-2">
                    <p>Emergency Contact</p>
                    <p className="col-span-3">: Elzio Afroditya</p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-2">
                    <p>Emergency Phone Number</p>
                    <p className="col-span-3">: 081234567890</p>
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
      <ModalDelete
        close={() => {
          setDelete(false);
        }}
        submit={() => {
          deteData(id);
          // inAwait();
          setDelete(false);
        }}
        active={isDelete}
      />
    </div>
  );
}

export default LeaveSetting;
