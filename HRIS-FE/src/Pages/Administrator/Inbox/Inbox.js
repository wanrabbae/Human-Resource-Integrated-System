import { React, useEffect, useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { Modal, Table } from "react-bootstrap";
import { Envelope, EnvelopeOpen } from "phosphor-react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Tooltip,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { deleteInbox, getListInbox, inboxRead } from "../../../Repository/Inbox";
import { ModalDelete } from "../../../Components/Modals";
import { Pagination, PaginationItem } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

function Inbox() {
  var dataUser = JSON.parse(window.localStorage.getItem("users"));
  const navigate = useNavigate();
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [refreshApi, setRefreshApi] = useState(false)
  const [isDelete, setDelete] = useState(false);
  const [users, setUsers] = useState({});

  const [id, setId] = useState("")

  const [data, setData] = useState([])

  var [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [allPages, setAllPages] = useState([]);

  console.log(users)
  const changePage = async (value, index) => {
    var dataInbox = await getListInbox({ page: index - 1, size: 25 });
    console.log("data leave", dataInbox)
    setData(dataInbox.requests);
    setTotalItems(dataInbox.totalItems);
    // setTotalPage(dataInbox.totalPages-1);
    currentPage = dataInbox.currentPage;
    var pageList = [];
    for (let i = 1; i <= dataInbox.totalPages; i++) {
      pageList.push(i);
    }
    setAllPages(pageList);
  };

  const inAwait = async () => {
    var dataInbox = await getListInbox({ page: 0, size: 25 });
    // setData(dataInbox.data.data.requests);
    // console.log(dataInbox.data.data);
    setData(dataInbox?.requests);
    console.log('data', dataInbox)
    setTotalItems(dataInbox?.totalItems)
    // console.log(respons);
    setTotalItems(dataInbox?.totalItems);
    setCurrentPage(dataInbox?.currentPage);
    setTotalPage(dataInbox?.totalPages);
    var pageList = [];
    for (let i = 1; i <= dataInbox.totalPages; i++) {
      pageList.push(i);
    }
    setAllPages(pageList);


    var data = JSON.parse(window.localStorage.getItem("users"));
    setUsers(data);
  };

  useEffect(() => {
    inAwait();
    setRefreshApi(false)
  }, [refreshApi]);

  const readInbox = async (id, link) => {
    var requestBody = {
      id: id,
    };
    console.log(requestBody)
    await inboxRead(requestBody)
      .then((response) => {
        console.log(response);
        setRefreshApi(true)
        link ?
          navigate(link) : navigate("/inbox/detail/", {
            state: requestBody,
          });
      })
      .catch((e) => {
        console.log("error", e.response);
        // if (e.response) {
        //   setMsg(e.response.data.message);
        // }
      });
  }
  const deleteData = async () => {
    await deleteInbox(id)
      .then((response) => {
        console.log(response);
        setRefreshApi(true);
      })
      .catch((e) => {
        console.log(e.response);
        // if (e.response) {
        //   setMsg(e.response.data.message);
        // }
      });
  };
  return (
    <>
      <div className="bg-white p-3 rounded-lg space-y-5">
        <div>
          <h1>Inbox</h1>
          <p className="text-xs text-gray-400">12 unread Message</p>
        </div>
        <div className="flex flex-row justify-between gap-3">
          <div className="flex flex-row items-center gap-3">
            {/* <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-transparent dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <Menu>
              <MenuHandler>
                <Button className="text-black p-0 shadow-none">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.77103 10.4854L12.5816 4.90723C12.7603 4.69922 12.5992 4.39453 12.3106 4.39453L2.68949 4.39453C2.40091 4.39453 2.23978 4.69922 2.41849 4.90723L7.22904 10.4854C7.36673 10.645 7.63334 10.645 7.77103 10.4854Z"
                      fill="#2E2E2E"
                    />
                  </svg>
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem>No One</MenuItem>
                <MenuItem>Select All</MenuItem>
                <MenuItem>Unread</MenuItem>
                <MenuItem>Already Unread</MenuItem>
              </MenuList>
            </Menu> */}
            <Tooltip content="Refresh">
              <a href="/Inbox">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.65 6.35C16.9099 5.60485 16.0296 5.01356 15.0599 4.61023C14.0902 4.2069 13.0503 3.99951 12 4C7.58001 4 4.01001 7.58 4.01001 12C4.01001 16.42 7.58001 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C17.2381 15.1695 16.4734 16.1824 15.4614 16.8988C14.4494 17.6153 13.24 18 12 18C8.69001 18 6.00001 15.31 6.00001 12C6.00001 8.69 8.69001 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z"
                    fill="#454545"
                  />
                </svg>
              </a>
            </Tooltip>
          </div>
          {dataUser?.role == "admin" || dataUser?.role == "subsdiary" || dataUser?.role == "subadmin" ? (
            <Link
              className="flex flex-row gap-2 bg-white hover:bg-[#003049] text-[#003049] border border-gray-200 flex items-center p-2 rounded-md"
              to="/inbox/approval-list"
            >
              <svg
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.35625 1.5C3.48555 1.13428 3.7251 0.817661 4.04189 0.593785C4.35867 0.36991 4.73709 0.249797 5.125 0.25H8.875C9.26291 0.249797 9.64133 0.36991 9.95811 0.593785C10.2749 0.817661 10.5144 1.13428 10.6438 1.5H11.375C11.8723 1.5 12.3492 1.69754 12.7008 2.04918C13.0525 2.40081 13.25 2.87772 13.25 3.375V15.875C13.25 16.3723 13.0525 16.8492 12.7008 17.2008C12.3492 17.5525 11.8723 17.75 11.375 17.75H2.625C2.12772 17.75 1.65081 17.5525 1.29917 17.2008C0.947544 16.8492 0.75 16.3723 0.75 15.875V3.375C0.75 2.87772 0.947544 2.40081 1.29917 2.04918C1.65081 1.69754 2.12772 1.5 2.625 1.5H3.35625ZM5.125 1.5C4.95924 1.5 4.80027 1.56585 4.68306 1.68306C4.56585 1.80027 4.5 1.95924 4.5 2.125C4.5 2.29076 4.56585 2.44973 4.68306 2.56694C4.80027 2.68415 4.95924 2.75 5.125 2.75H8.875C9.04076 2.75 9.19973 2.68415 9.31694 2.56694C9.43415 2.44973 9.5 2.29076 9.5 2.125C9.5 1.95924 9.43415 1.80027 9.31694 1.68306C9.19973 1.56585 9.04076 1.5 8.875 1.5H5.125ZM5.75 8.375C5.75 8.54076 5.81585 8.69973 5.93306 8.81694C6.05027 8.93415 6.20924 9 6.375 9H10.125C10.2908 9 10.4497 8.93415 10.5669 8.81694C10.6842 8.69973 10.75 8.54076 10.75 8.375C10.75 8.20924 10.6842 8.05027 10.5669 7.93306C10.4497 7.81585 10.2908 7.75 10.125 7.75H6.375C6.20924 7.75 6.05027 7.81585 5.93306 7.93306C5.81585 8.05027 5.75 8.20924 5.75 8.375ZM5.75 12.125C5.75 12.2908 5.81585 12.4497 5.93306 12.5669C6.05027 12.6842 6.20924 12.75 6.375 12.75H10.125C10.2908 12.75 10.4497 12.6842 10.5669 12.5669C10.6842 12.4497 10.75 12.2908 10.75 12.125C10.75 11.9592 10.6842 11.8003 10.5669 11.6831C10.4497 11.5658 10.2908 11.5 10.125 11.5H6.375C6.20924 11.5 6.05027 11.5658 5.93306 11.6831C5.81585 11.8003 5.75 11.9592 5.75 12.125ZM3.875 9C4.04076 9 4.19973 8.93415 4.31694 8.81694C4.43415 8.69973 4.5 8.54076 4.5 8.375C4.5 8.20924 4.43415 8.05027 4.31694 7.93306C4.19973 7.81585 4.04076 7.75 3.875 7.75C3.70924 7.75 3.55027 7.81585 3.43306 7.93306C3.31585 8.05027 3.25 8.20924 3.25 8.375C3.25 8.54076 3.31585 8.69973 3.43306 8.81694C3.55027 8.93415 3.70924 9 3.875 9ZM3.875 12.75C4.04076 12.75 4.19973 12.6842 4.31694 12.5669C4.43415 12.4497 4.5 12.2908 4.5 12.125C4.5 11.9592 4.43415 11.8003 4.31694 11.6831C4.19973 11.5658 4.04076 11.5 3.875 11.5C3.70924 11.5 3.55027 11.5658 3.43306 11.6831C3.31585 11.8003 3.25 11.9592 3.25 12.125C3.25 12.2908 3.31585 12.4497 3.43306 12.5669C3.55027 12.6842 3.70924 12.75 3.875 12.75Z"
                  fill="#737373"
                />
              </svg>

              <p>Approval List</p>
            </Link>) : null}
        </div>
        <div className="overflow-x-auto">
          {data.length > 0 ? data.map((val, index) => (
            users.employeeId == null ?
              (<div key={index}>
                <div className={val.isRead == 1 ?"h-14 flex flex-row justify-between items-center bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-700 my-1":"h-14 flex flex-row justify-between items-center bg-[#EBF7FF] border rounded-lg dark:bg-gray-800 dark:border-gray-700 my-1"}>
                  <a href="#" onClick={() => readInbox(val.id, val.link)} className="flex flex-row gap-3 py-1 px-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {/* <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-transparent dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        required
                      />
                    </div> */}
                    {val.isRead == 1 ? <EnvelopeOpen className="h-5 w-5" aria-hidden="true" /> :
                      <Envelope className="h-5 w-5" aria-hidden="true" />}
                    <p>{val.title}</p>
                  </a>
                  {/* <div className="flex flex-row justify-end items-center gap-3 py-1 px-6">
                    <p className="text-sm">{val.time}</p>
                    <button className="p-2"
                      onClick={() => {
                        setId(val.id);
                        setDelete(true);
                      }}>
                      <TrashIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div> */}
                </div>
              </div>) :
              null
          ))
            : null}
          {data.length > 0 ? data.map((val, index) => (
            users.employeeId == val.toEmployee ?
              (<div key={index}>
                <div className="h-14 flex flex-row justify-between items-center bg-[#EBF7FF] border rounded-lg dark:bg-gray-800 dark:border-gray-700 my-1">
                  <a href="#" onClick={() => readInbox(val.id, val.link)} className="flex flex-row gap-3 py-1 px-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-transparent dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        required
                      />
                    </div>
                    {val.isRead == 1 ? <EnvelopeOpen className="h-5 w-5" aria-hidden="true" /> :
                      <Envelope className="h-5 w-5" aria-hidden="true" />}
                    <p>{val.title}</p>
                  </a>
                  {/* <div className="flex flex-row justify-end items-center gap-3 py-1 px-6">
                    <p className="text-sm">{val.time}</p>
                    <button className="p-2"
                      onClick={() => {
                        setId(val.id);
                        setDelete(true);
                      }}>
                      <TrashIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div> */}
                </div>
              </div>) :
              null
          ))
            : <div className="flex justify-center items-center bg-gray-100 w-full h-1/2"><p>No Data</p></div>}

          {/* <a href="/inbox/detail">
            <div className="flex flex-row justify-between items-center bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-700 my-1">
              <div className="flex flex-row gap-3 py-1 px-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-transparent dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <EnvelopeOpen className="h-5 w-5" aria-hidden="true" />
                <p>Reimbursement has been approved</p>
              </div>
              <div className="flex flex-row justify-end items-center gap-3 py-1 px-6">
                <p className="text-sm">09.22</p>
                <button className="p-2">
                  <TrashIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </a> */}
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
      </div>
      {/* Modal Add */}
      <Modal show={modalAdd} size="lg" onHide={() => setModalAdd(false)}>
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Add Custom Field
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="flex flex-row gap-3 mb-3">
            <div className="w-1/2">
              <label className="text-xs">Field Name</label>
              <input
                onChange={(val) => { }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
              />
            </div>
            <div className="w-1/2">
              <label className="text-xs">Screen</label>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Personal Details</option>
                <option>Contact Details</option>
                <option>Emergency Contacts</option>
                <option>Dependents</option>
                <option>Immiration</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <div className="w-1/2">
              <label className="text-xs">Type Field</label>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Text or Number</option>
                <option>Dropdown</option>
              </select>
            </div>
          </div>
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
            type="button"
            className="text-white bg-[#0E5073] hover:bg-[#003049] font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-[#0E5073] dark:hover:bg-[#003049] focus:outline-none"
          >
            Add
          </button>
        </Modal.Footer>
      </Modal>

      {/* Modal Edit */}
      <Modal show={modalEdit} size="lg" onHide={() => setModalEdit(false)}>
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Custom Field
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="flex flex-row gap-3 mb-3">
            <div className="w-1/2">
              <label className="text-xs">Field Name</label>
              <input
                onChange={(val) => { }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
              />
            </div>
            <div className="w-1/2">
              <label className="text-xs">Sreen</label>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Personal Details</option>
                <option>Contact Details</option>
                <option>Emergency Contacts</option>
                <option>Dependents</option>
                <option>Immiration</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <div className="w-1/2">
              <label className="text-xs">Type Field</label>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Text or Number</option>
                <option>Dropdown</option>
              </select>
            </div>
          </div>
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
          deleteData(id);
          // inAwait();
          setDelete(false);
        }}
        active={isDelete}
      />
    </>
  );
}

export default Inbox;
