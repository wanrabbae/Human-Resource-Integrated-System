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
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Leave() {
  const [modalDetailApproval, setModalDetailApproval] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  const [changePassword, setPassword] = useState(false);
  return (
    <div className="bg-white p-5 rounded-lg">
      <h5>
        <b>Leave</b>
      </h5>
      <p>
        <small>List of Leave Employee</small>
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
          <div>
            <button className="px-3 py-2 text-gray-700 border border-gray-100 rounded-lg hover:bg-gray-300 ">
              Leave Setting
            </button>
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
            Add Leave
          </Button>
          <div className="mx-2"></div>
        </div>
      </div>
      <br></br>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs bg-[#EBF7FF] text-gray-700 uppercase dark:text-gray-400">
            <tr className="capitalize">
              <th className="py-3 px-6">Employee Name</th>
              <th className="py-3 px-6">Job Position</th>
              <th className="py-3 px-6">Start Date</th>
              <th className="py-3 px-6">End Date</th>
              <th className="py-3 px-6">Type</th>
              <th className="py-3 px-6">Approved Leader</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-4 px-6">Veza Adi</td>
              <td className="py-4 px-6">Staff IT</td>
              <td className="py-4 px-6">26/02/2022</td>
              <td className="py-4 px-6">28/02/2022</td>
              <td className="py-4 px-6">Cuti Menikah</td>
              <td className="py-4 px-6">
                <div className="flex flex-col gap-1 items-center">
                  <CheckCircle sx={{ color: teal[500] }} fontSize="large" />
                  <p
                    onClick={() => setModalDetailApproval(true)}
                    className="text-xs text-gray-700 underline hover:text-black cursor-pointer"
                  >
                    Detail
                  </p>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex flex-row gap-3">
                  <button
                    className="bg-blue-100 hover:bg-blue-200 p-2 rounded-lg"
                    onClick={() => setModalDetail(true)}
                  >
                    <Visibility style={{ color: "#003049" }} />
                  </button>
                  <button
                    className="bg-blue-100 hover:bg-blue-200 p-2 rounded-lg"
                    onClick={() => setModalEdit(true)}
                  >
                    <EditOutlined style={{ color: "#003049" }} />
                  </button>
                  <a
                    href="#"
                    className="bg-blue-100 hover:bg-blue-200 p-2 rounded-lg"
                    // onClick={() => {
                    //   setSelectedProduct(index);
                    //   setShowDelete(true);
                    // }}
                  >
                    <DeleteOutline style={{ color: "#003049" }} />
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6">Veza Adi</td>
              <td className="py-4 px-6">Staff IT</td>
              <td className="py-4 px-6">26/02/2022</td>
              <td className="py-4 px-6">28/02/2022</td>
              <td className="py-4 px-6">Cuti Menikah</td>
              <td className="py-4 px-6">
                <div className="flex flex-col gap-1 items-center">
                  <Cancel sx={{ color: red[800] }} fontSize="large" />
                  <p
                    onClick={() => setModalDetailApproval(true)}
                    className="text-xs text-gray-700 underline hover:text-black cursor-pointer"
                  >
                    Detail
                  </p>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex flex-row gap-3">
                  <button
                    className="bg-blue-100 hover:bg-blue-200 p-2 rounded-lg"
                    onClick={() => setModalDetail(true)}
                  >
                    <Visibility style={{ color: "#003049" }} />
                  </button>
                  <button
                    className="bg-blue-100 hover:bg-blue-200 p-2 rounded-lg"
                    onClick={() => setModalEdit(true)}
                  >
                    <EditOutlined style={{ color: "#003049" }} />
                  </button>
                  <a
                    href="#"
                    className="bg-blue-100 hover:bg-blue-200 p-2 rounded-lg"
                    // onClick={() => {
                    //   setSelectedProduct(index);
                    //   setShowDelete(true);
                    // }}
                  >
                    <DeleteOutline style={{ color: "#003049" }} />
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6">Veza Adi</td>
              <td className="py-4 px-6">Staff IT</td>
              <td className="py-4 px-6">26/02/2022</td>
              <td className="py-4 px-6">28/02/2022</td>
              <td className="py-4 px-6">Cuti Menikah</td>
              <td className="py-4 px-6">
                <div className="flex flex-col gap-1 items-center">
                  <WatchLater sx={{ color: yellow[800] }} fontSize="large" />
                  <p
                    onClick={() => setModalDetailApproval(true)}
                    className="text-xs text-gray-700 underline hover:text-black cursor-pointer"
                  >
                    Detail
                  </p>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex flex-row gap-3">
                  <button
                    className="bg-blue-100 hover:bg-blue-200 p-2 rounded-lg"
                    onClick={() => setModalDetail(true)}
                  >
                    <Visibility style={{ color: "#003049" }} />
                  </button>
                  <button
                    className="bg-blue-100 hover:bg-blue-200 p-2 rounded-lg"
                    onClick={() => setModalEdit(true)}
                  >
                    <EditOutlined style={{ color: "#003049" }} />
                  </button>
                  <a
                    href="#"
                    className="bg-blue-100 hover:bg-blue-200 p-2 rounded-lg"
                    // onClick={() => {
                    //   setSelectedProduct(index);
                    //   setShowDelete(true);
                    // }}
                  >
                    <DeleteOutline style={{ color: "#003049" }} />
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-[#FBFBFB] mt-0 px-4 py-3 rounded-b-xl flex items-center justify-between ">
        <div>
          <h6 className="text-[#A098AE]">
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
                      <CheckCircle sx={{ color: teal[500] }} fontSize="large" />
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
                      <Cancel sx={{ color: red[800] }} fontSize="large" />
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
      <Modal open={modalAdd} onClose={() => setModalAdd(false)}>
        <Dialog
          open={modalAdd}
          onClose={() => setModalAdd(false)}
          scroll="body"
          fullWidth={true}
          maxWidth="sm"
        >
          <div className="m-5">
            <div className="flex justify-between mb-5">
              <h3 className="font-semibold text-xl">Add Leave</h3>
              <button onClick={() => setModalAdd(false)}>
                <Close />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label for="name" className="block mb-2 text-sm text-gray-600">
                  Employee Name
                </label>
                <select
                  id="employee"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-gray-300 block w-full p-2.5 "
                >
                  <option hidden>Select Employee ...</option>
                  <option>Uli</option>
                  <option>Ahda</option>
                </select>
              </div>
              <div>
                <label
                  for="jobPosotion"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Job Posotion
                </label>
                <input
                  type="text"
                  id="jobPosotion"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                  placeholder="Auto - fill"
                  readOnly
                />
              </div>
              <div>
                <label for="type" className="block mb-2 text-sm text-gray-600">
                  Leave Type
                </label>
                <select
                  id="type"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-gray-300 block w-full p-2.5 "
                >
                  <option hidden>Select Leave Type ...</option>
                  <option>Cuti Menikah</option>
                  <option>Cuti Hamil</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label
                    for="start"
                    className="block mb-2 text-sm text-gray-600"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="start"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                    required
                  />
                </div>
                <div>
                  <label for="end" className="block mb-2 text-sm text-gray-600">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="end"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-5">
                <button
                  className="bg-gray-200 text-[#0E5073] rounded-lg px-4 py-2"
                  onClick={() => setModalAdd(false)}
                >
                  Cancel
                </button>
                <button className="bg-[#0E5073] rounded-lg px-4 py-2 text-white">
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
          maxWidth="sm"
        >
          <div className="m-5">
            <div className="flex justify-between mb-5">
              <h3 className="font-semibold text-xl">Edit Leave</h3>
              <button onClick={() => setModalEdit(false)}>
                <Close />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label for="name" className="block mb-2 text-sm text-gray-600">
                  Employee Name
                </label>
                <select
                  id="employee"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-gray-300 block w-full p-2.5 "
                >
                  <option hidden>Select Employee ...</option>
                  <option>Uli</option>
                  <option>Ahda</option>
                </select>
              </div>
              <div>
                <label
                  for="jobPosotion"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Job Posotion
                </label>
                <input
                  type="text"
                  id="jobPosotion"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                  placeholder="Auto - fill"
                  readOnly
                />
              </div>
              <div>
                <label for="type" className="block mb-2 text-sm text-gray-600">
                  Leave Type
                </label>
                <select
                  id="type"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-gray-300 block w-full p-2.5 "
                >
                  <option hidden>Select Leave Type ...</option>
                  <option>Cuti Menikah</option>
                  <option>Cuti Hamil</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label
                    for="start"
                    className="block mb-2 text-sm text-gray-600"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="start"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                    required
                  />
                </div>
                <div>
                  <label for="end" className="block mb-2 text-sm text-gray-600">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="end"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-transparent focus:border-transparent block w-full p-2.5"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-5">
                <button
                  className="bg-gray-200 text-[#0E5073] rounded-lg px-4 py-2"
                  onClick={() => setModalEdit(false)}
                >
                  Cancel
                </button>
                <button className="bg-[#0E5073] rounded-lg px-4 py-2 text-white">
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
    </div>
  );
}

export default Leave;
