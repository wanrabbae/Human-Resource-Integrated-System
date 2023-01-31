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
import { useLocation } from "react-router-dom";
import { getDetailInbox } from "../../../Repository/Inbox";
import ProfileDefault from "../../../Resourse/img/logos.png";
import moment from "moment/moment";

function DetailInbox() {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const location = useLocation();

  const [data, setData] = useState([])
  
  const id = location.state.id;

  console.log(id)
  const inAwait = async () => {
    var dataInbox = await getDetailInbox(id);
    console.log(dataInbox.data.data);
    setData(dataInbox.data.data);
  };

  useEffect(() => {
    inAwait();
  }, []);
  return (
    <>
      <div className="bg-white p-3 rounded-lg space-y-5">
        <div className="border-b border-gray-900 p-3 space-y-3">
          <h1 className="font-bold text-lg">{data.title}</h1>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2">
              <img
                src={ProfileDefault}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "100px",
                  objectFit: "cover",
                }}
              />
              <div className="flex flex-col">
                <h5 className="text-sm text-black font-semibold">
                  {data?.employee?.firstName}
                </h5>
                {/* <p className="text-xs">to me</p> */}
              </div>
            </div>
            <p className="text-sm">{moment(data.notified_at).format("lll")}</p>
          </div>
        </div>
        <div className="space-y-5">
          <p className="h-[300px]">
            {data.message}
          </p>
          {/* <h4 className="font-bold">Detail Request</h4>
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
              <div className="grid grid-cols-4 gap-2 py-2">
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
              <div className="grid grid-cols-4 gap-2 py-2">
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
          <div className="text-end my-5">
            <button
              type="button"
              className="text-white bg-[#C1121F] hover:bg-[#900E18] font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-gray-200 dark:hover:bg-gray-300 focus:outline-none"
            >
              Reject
            </button>
            <button
              type="button"
              className="text-white bg-[#04BB00] hover:bg-[#048501] font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 focus:outline-none"
            >
              Approve
            </button>
          </div> */}
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
                onChange={(data) => {}}
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
                onChange={(data) => {}}
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
    </>
  );
}

export default DetailInbox;
