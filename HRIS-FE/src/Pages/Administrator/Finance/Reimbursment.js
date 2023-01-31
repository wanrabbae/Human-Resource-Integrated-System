import {
  AccessTimeFilled,
  Add,
  Cancel,
  CheckCircle,
  DeleteOutline,
  EditOutlined,
  FileDownloadOutlined,
  ImportExport,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  VisibilityOutlined,
  WatchLater,
} from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, Pagination, PaginationItem } from "@mui/material";
import { red, teal, yellow } from "@mui/material/colors";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { TextFieldSearch } from "../../../Components/TextField";
import Select from "react-select";
import { GetEmployeeName } from "../../../Repository/EmployeeRepository";
import {
  addReimbursement,
  deleteReimbursement,
  getRBSettingDetail,
  getReimbursement,
  getReimbursementSetting,
  searchReimbursement,
  updateReimbursement,
} from "../../../Repository/Finance";
import moment from "moment/moment";
import { ModalDelete } from "../../../Components/Modals";
import * as XLSX from "xlsx";

function Reimbursment() {
  var employee = JSON.parse(window.localStorage.getItem("users"));
  console.log(employee?.employeeId)

  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [isDelete, setDelete] = useState(false);

  const [employeeNames, setEmployeeNames] = useState([]);
  const [data, setData] = useState([]);
  const [dataPolicy, setDataPolicy] = useState([]);

  const [id, setId] = useState("");
  const [assignEmployee, setAssignEmployee] = useState([])
  const [detailRM, setDetailRM] = useState([])
  console.log("detail", detailRM)

  const [employeeName, setEmployeeName] = useState(employee?.employeeId);
  const [reimbursement, setReimbursement] = useState("");
  const [amount, setAmount] = useState("");
  const [useDate, setUseDate] = useState("");
  const [note, setNote] = useState("");
  const [file, setFile] = useState();

  const [editEmployeeId, setEditEmployeeId] = useState("");
  const [editEmployeeName, setEditEmployeeName] = useState("");
  const [editReimbursementId, setEditReimbursementId] = useState("");
  const [editReimbursement, setEditReimbursement] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editUseDate, setEditUseDate] = useState("");
  const [editNote, setEditNote] = useState("");
  const [editFile, setEditFile] = useState();

  var [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [allPages, setAllPages] = useState([]);

  const searchData = async (keyword) => {
    try {
      const search = await searchReimbursement(keyword);
      setData(search.data.requests);
    } catch (error) {
      console.log(error);
    }
  };
  const detailSetting = async (id) => {
    var data = await getRBSettingDetail(id);
    console.log("ini", data.data.data);
    setAssignEmployee(data.data.data.assign_to)
    setDetailRM(data.data.data)
  }
  const postData = async (e) => {
    e.preventDefault();

    var requestBody = {
      employeeId: employeeName,
      reimbursement_setting_id: reimbursement,
      amount: amount,
      use_date: useDate,
      note: note,
      file: file,
    };
    console.log(requestBody);
    await addReimbursement(requestBody)
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
      employeeId: editEmployeeId,
      reimbursement_setting_id: editReimbursementId,
      amount: editAmount,
      use_date: editUseDate,
      note: editNote,
      file: editFile,
    };
    console.log(requestBody);
    await updateReimbursement(id, requestBody)
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

  const changePage = async (value, index) => {
    const data = await getReimbursement({ page: index - 1, size: 25 });
    console.log("data leave", data)
    setData(data.requests);
    setTotalItems(data.totalItems);
    // setTotalPage(data.totalPages-1);
    currentPage = data.currentPage;
    var pageList = [];
    for (let i = 1; i <= data.totalPages; i++) {
      pageList.push(i);
    }
    setAllPages(pageList);
  };

  const inAwait = async () => {
    var dataEmployeeName = await GetEmployeeName();
    setEmployeeNames(dataEmployeeName);
    // console.log(dataEmployeeName);

    var policy = await getReimbursementSetting();
    // console.log("ini", policy.data.data);
    setDataPolicy(policy.data.data);

    var dataReimbursment = await getReimbursement({ page: 0, size: 25 });
    // console.log("ini", data.data.data.requests);
    // setData(data.data.data.requests);
    setData(dataReimbursment?.requests);
    console.log('data', dataReimbursment)
    setTotalItems(dataReimbursment?.totalItems)
    // console.log(respons);
    setTotalItems(dataReimbursment?.totalItems);
    setCurrentPage(dataReimbursment?.currentPage);
    setTotalPage(dataReimbursment?.totalPages);
    var pageList = [];
    for (let i = 1; i <= dataReimbursment.totalPages; i++) {
      pageList.push(i);
    }
    setAllPages(pageList);
  };
  useEffect(() => {
    inAwait();
  }, []);

  const convertDate = (data) => {
    var data1 = moment(data).format("L");
    var data2 = data1.split("/");
    return `${data2[2]}-${data2[0]}-${data2[1]}`;
  };
  const exportExcel = async () => {
    if (data.length > 0) {
      var wb = XLSX.utils.book_new();
      var dataR = [];

      await data.map((app) => {
        dataR.push({
          "Employee Name": app?.employee?.firstName,
          "Reimbursment Policy": app?.reimbursement_setting?.name,
          "Amount": `Rp ${parseInt(app.amount).toLocaleString()}`,
          "Use Date": moment(app?.use_date).format("L"),
          "Note": app?.note,
          "Status": app?.status,
        });
      });

      var ws = XLSX.utils.json_to_sheet(dataR);

      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

      XLSX.writeFile(wb, `Reimbursment.xlsx`);
      console.log("Exported excel!");
    } else {
      alert("Data masih kosong");
    }
  };

  return (
    <>
      <div className="w-100 bg-[#FFFFFF] p-4 rounded-t-xl">
        <h5>
          <b>Reimbursment</b>
        </h5>
        <p>
          <small>list of reimbursment</small>
        </p>
        <br></br>
        <div className="d-flex justify-content-between">
          <div className="d-flex gap-3">
            <button
              className="flex flex-row gap-2 bg-white hover:bg-[#003049] text-[#003049] border border-gray-200 flex items-center p-2 rounded-md"
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
          </div>
          <div className="d-flex">
            {/* <TextFieldSearch /> */}
            <div className="flex flex-row rounded-lg bg-gray-50 border border-gray-300 mt-1">
              <div className="flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="text-sm appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none focus:ring-transparent"
                placeholder="Search by Name"
                onChange={(e) => searchData(e.target.value)}
              />
            </div>
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
              Add Reimbursment
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
              <th onClick={() => { }} className="truncate">
                Employee Name <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => { }} className="truncate">
                Reimbursment Policy <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => { }} className="truncate">
                Amount <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => { }} className="truncate">
                Use Date <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => { }} className="truncate">
                Note <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => { }} className="truncate text-center">
                Status <ImportExport fontSize="2px" />
              </th>
              {employee?.role == "admin" || employee?.role == "subsdiary" || employee?.role == "subadmin" ? (
                <th onClick={() => { }} className="truncate text-center">
                  Action
                </th>) : null}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((value, index) => (
                <tr key={index}>
                  {/* <td className="align-middle">
                <input type="checkbox" style={{ borderRadius: "2px" }} />
              </td> */}
                  <td className="align-middle">
                    {value.employee ? value.employee.firstName : "-"}
                  </td>
                  <td className="align-middle">
                    {value.reimbursement_setting
                      ? value.reimbursement_setting.name
                      : "-"}
                  </td>
                  <td className="align-middle truncate">
                    Rp.{" "}
                    {value.amount ? parseInt(value.amount).toLocaleString() : 0}
                  </td>
                  <td className="align-middle">
                    {value.use_date ? moment(value.use_date).format("L") : "-"}
                  </td>
                  <td className="align-middle">
                    {value.note ? value.note : "-"}
                  </td>
                  <td className="align-middle text-center">
                    {value.status == "pending" ? (
                      <WatchLater sx={{ color: yellow[800] }} />
                    ) : null}
                    {value.status == "approved" ? (
                      <CheckCircle sx={{ color: teal[500] }} />
                    ) : null}
                    {value.status == "rejected" ? (
                      <Cancel sx={{ color: red[800] }} />
                    ) : null}
                  </td>
                  {employee?.role == "admin" || employee?.role == "subsdiary" || employee?.role == "subadmin" ? (
                    <td className="align-middle d-flex justify-content-evenly">
                      <a href={value.file} download target="_blank"
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
                        <FileDownloadOutlined fontSize="10px" />
                      </a>
                      <button
                        onClick={() => {
                          setId(value.id);
                          setEditEmployeeName(value?.employee?.firstName);
                          setEditEmployeeId(value?.employee?.id);
                          setEditReimbursement(value?.reimbursement_setting?.name);
                          setEditReimbursementId(value?.reimbursement_setting_id);
                          setEditAmount(value?.amount);
                          setEditUseDate(convertDate(value.use_date));
                          setEditNote(value?.note);
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
                          setId(value.id);
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
                    </td>) : null}
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
      </div>
      <div className="bg-[#FBFBFB] mt-0 px-4 py-3 rounded-b-xl d-flex align-items-center justify-content-between ">
        <div>
          <h6 className="text-[#A098AE] text-[10px]">
            Showing <span className="text-[#0E5073]">{data?.length}</span>{" "}
            from <span className="text-[#0E5073]">{totalItems}</span> data
          </h6>
        </div>
        <div class="d-flex justify-content-center">
          <Pagination
            count={totalPage}
            onChange={changePage}
            siblingCount={1}
            renderItem={(item) => (
              <PaginationItem
                className="btn bg-[#78000010] text-[10px] rounded-md text-[#780000]"
                slots={{ previous: <KeyboardArrowLeft />, next: <KeyboardArrowRight /> }}
                {...item}
              />
            )}
          />
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
          <Modal.Title id="contained-modal-title-vcenter">
            Add Reimbursement
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4 space-y-5">
          <div className="w-full">
            <label className="text-xs">Reimbursement Policy</label>
            {/* <input
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="Input reimbersement name"
              onChange={(e) => setReimbursement(e.target.value)}
            /> */}
            <select
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
              onChange={(e) => {
                setReimbursement(e.target.value);
                detailSetting(e.target.value)
              }}
            >
              <option hidden>Select Reimbursement Policy</option>
              {dataPolicy &&
                dataPolicy.map((val, index) => (
                  <option value={val.id} key={index}>
                    {val.name}
                  </option>
                ))}
            </select>
          </div>
          {detailRM != null ?
            <div>
              <p className="italic text-red-600 text-xs">*The policy you choose has a limit of Rp. {detailRM.limit_amount}</p>
              <p className="italic text-red-600 text-xs">*The policy you choose has a Min Next Claim for {detailRM.min_next_claim} days</p>
            </div>
            : null
          }
          <div className="w-full">
            <label className="text-xs">Employee</label>
            {employee?.role == "admin" || employee?.role == "subsdiary" || employee?.role == "subadmin" ? (
              <Select
                required
                id="selectedEmployee"
                isLoading={true}
                onChange={(e) => setEmployeeName(e.value)}
                isFocused="appearance-none border-0 outline-0"
                className="appearance-none"
                classNamePrefix="appearance-none active:outline-0 active:border-0 focus:outline-0 focus:border-0 focus:shadow-outline"
                options={assignEmployee.map((val) => {
                  return {
                    value: val.id,
                    label: val.firstName,
                  };
                })}
              />) :
              (<input
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="Input employee name"
                value={employee?.username}
                onChange={(e) => setEmployeeName(employee?.employeeId)}
                readOnly
              />)}
          </div>
          <div className="d-flex gap-3">
            <div className="w-full">
              <label className="text-xs">Amount</label>
              <input
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                min={0}
                max={parseInt(detailRM.limit_amount)}
                placeholder="Rp"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label className="text-xs">Use Date</label>
              <input
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="date"
                onChange={(e) => setUseDate(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full">
            <label className="text-xs">Note</label>
            <textarea
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Note ..."
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>
          <div className="w-full">
            <label className="text-xs">Upload File</label>
            <input
              required
              className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <p className="text-xs text-danger">Max. 10 Mb</p>
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
            Edit Reimbursement
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4 space-y-5">
          <div className="w-full">
            <label className="text-xs">Employee</label>
            <input
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="Input employee name"
              value={editEmployeeName}
              onChange={(e) => setEditEmployeeId(editEmployeeId)}
              readOnly
            />
          </div>
          <div className="w-full">
            <label className="text-xs">Reimbursement Policy</label>
            <input
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="Input employee name"
              value={editReimbursement}
              onChange={(e) => setEditReimbursementId(editReimbursementId)}
              readOnly
            />
            {/* <select
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
              value={editReimbursement}
              onChange={(e) => setEditReimbursement(e.target.value)}
            >
              <option hidden>Select Loan policy</option>
              {dataPolicy &&
                dataPolicy.map((val, index) => (
                  <option value={val.id} key={index}>
                    {val.name}
                  </option>
                ))}
            </select> */}
          </div>
          <div className="d-flex gap-3">
            <div className="w-full">
              <label className="text-xs">Amount</label>
              <input
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="Rp"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label className="text-xs">Use Date</label>
              <input
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="date"
                value={editUseDate}
                onChange={(e) => setEditUseDate(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full">
            <label className="text-xs">Note</label>
            <textarea
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Note ..."
              value={editNote}
              onChange={(e) => setEditNote(e.target.value)}
            ></textarea>
          </div>
          <div className="w-full">
            <label className="text-xs">Upload File</label>
            <input
              required
              className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="file"
              // value={edit}
              onChange={(e) => setEditFile(e.target.files[0])}
            />
            <p className="text-xs text-danger">Max. 10 Mb</p>
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
          deleteReimbursement(id);
          inAwait();
          setDelete(false);
        }}
        active={isDelete}
      />
    </>
  );
}

export default Reimbursment;
