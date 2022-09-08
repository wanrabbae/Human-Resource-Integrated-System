import {
  Add,
  AlignVerticalCenter,
  ArrowUpuseEffect,
  wardTwoTone,
  Close,
  Delete,
  DeleteOutline,
  EditOutlined,
  Filter,
  Filter1,
  FilterCenterFocus,
  FilterList,
  ImportExport,
  Search,
} from "@mui/icons-material";

import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import {
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
} from "react-bootstrap";
import { ModalDelete, SwalSuccess } from "../../../../Components/Modals";
import {
  AddCompanyLocation,
  deleteCompanyLocation,
  EditCompanyLocation,
  getCompanyLocation,
} from "../../../../Repository/AdminRepository";

function Locations() {
  const [locations, setLocations] = useState([]);
  const [editValues, setEditValues] = useState();
  const [dialogTitle, setTitle] = useState(false);
  const [dialogEditTitle, setEditTitle] = useState(false);
  const [isdelete, setDelete] = useState(false);
  const [id, setId] = useState();
  const inAwait = async () => {
    var rec = await getCompanyLocation();
    setLocations(rec);
  };
  useEffect(() => {
    inAwait();
  }, []);
  return (
    <>
      <div
        className="w-100 p-4"
        style={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
      >
        <h5>
          <b>Company Locations</b>
        </h5>
        <p>
          <small>list of Company Locations</small>
        </p>
        <br></br>
        <div className="d-flex justify-content-between">
          <div>
            <Button
              style={{
                color: "#003049",
                border: "1px solid #00000040",
                borderRadius: "7px",
                backgroundColor: "transparent",
              }}
              variant="contained"
              startIcon={<DeleteOutline />}
            >
              Delete
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                setTitle(!dialogTitle);
              }}
              style={{
                color: "#FFFFFF",
                borderRadius: "7px",
                backgroundColor: "#0E5073",
              }}
              variant="contained"
              startIcon={<Add />}
            >
              Add Location
            </Button>
          </div>
        </div>
        <br></br>
        <Table borderless responsive style={{ color: "#00000070" }}>
          <thead>
            <tr style={{ backgroundColor: "#EBF7FF" }}>
              <th width="10px">
                <input type="checkbox" style={{ borderRadius: "2px" }} />
              </th>
              <th onClick={() => {}}>
                Name <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}}>
                City <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}}>
                Country <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}}>
                Phone <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {locations.length > 0 ? (
              locations.map((location) => (
                <tr>
                  <td className="align-middle">
                    <input type="checkbox" style={{ borderRadius: "2px" }} />
                  </td>
                  <td className="align-middle" style={{ minWidth: "200px" }}>
                    {location.name}
                  </td>
                  <td className="align-middle" style={{ minWidth: "200px" }}>
                    {location.city}
                  </td>
                  <td className="align-middle" style={{ minWidth: "200px" }}>
                    {location.country}
                  </td>
                  <td className="align-middle" style={{ minWidth: "200px" }}>
                    {location.phone}
                  </td>
                  <td className="align-middle" style={{ minWidth: "100px" }}>
                    <button
                      onClick={() => {
                        setDelete(true);
                        setId(location.id);
                      }}
                      className="btn btn-sm mx-1"
                      style={{
                        backgroundColor: "#CEDFEA",
                        borderRadius: "8px",
                      }}
                    >
                      <DeleteOutline fontSize="10px" />
                    </button>
                    <button
                      onClick={() => {
                        setId(location.id);
                        setEditValues(location);
                        setEditTitle(!dialogEditTitle);
                      }}
                      className="btn btn-sm mx-1"
                      style={{
                        backgroundColor: "#CEDFEA",
                        borderRadius: "8px",
                      }}
                    >
                      <EditOutlined fontSize="10px" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <td rowSpan={2} colSpan={2}>
                <div className="d-flex justify-content-center align-middle text-center">
                  No Data
                </div>
              </td>
            )}
          </tbody>
        </Table>
      </div>

      <Modal show={dialogTitle} size="lg" onHide={() => setTitle(!dialogTitle)}>
        <Modal.Header
          closeButton
          className="m-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title>Add Location</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  Location Name <span className="text-danger">*</span>
                </label>
                <input
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Location Name..."
                  id="name"
                />
              </div>
            </div>
            <div className="col-md-6 my-3">
              <div className="form-group">
                <label className="mb-1">
                  City <span className="text-danger">*</span>
                </label>
                <select
                  id="city"
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>Select City</option>
                  <option>Banyumas</option>
                  <option>Solo</option>
                  <option>Yogyakartya</option>
                  <option>Jakarta</option>
                </select>
              </div>
            </div>
            <div className="col-md-6 my-3">
              <div className="form-group">
                <label className="mb-1">
                  Province <span className="text-danger">*</span>
                </label>
                <select
                  id="province"
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>Select Province</option>
                  <option>Jawa Tengah</option>
                  <option>Jawa Barat</option>
                  <option>Jawa Timur</option>
                  <option>DKI Jakarta</option>
                </select>
              </div>
            </div>
            <div className="col-md-6 my-3">
              <div className="form-group">
                <label className="mb-1">
                  Country <span className="text-danger">*</span>
                </label>
                <select
                  id="country"
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>Select Country</option>
                  <option>Indonesia</option>
                  <option>Malaysia</option>
                  <option>Maroko</option>
                  <option>Arab</option>
                </select>
              </div>
            </div>
            <div className="col-md-6 my-3">
              <div className="form-group">
                <label className="mb-1">
                  Postal Code <span className="text-danger">*</span>
                </label>
                <input
                  id="postalCode"
                  placeholder="Postal Code..."
                  type="number"
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>

            <div className="col-md-6 my-3">
              <div className="form-group">
                <label className="mb-1">
                  Phone <span className="text-danger">*</span>
                </label>
                <input
                  id="phone"
                  placeholder="Phone number..."
                  type="number"
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>

            <div className="col-md-6 my-3">
              <div className="form-group">
                <label className="mb-1">
                  Fax <span className="text-danger">*</span>
                </label>
                <input
                  id="fax"
                  placeholder="Fax number..."
                  type="number"
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>

            <div className="col-md-12 my-3">
              <div className="form-group">
                <label className="mb-1">
                  Address <span className="text-danger">*</span>
                </label>
                <textarea
                  id="address"
                  rows={4}
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Address..."
                ></textarea>
              </div>
            </div>
            <div className="col-md-12 my-3">
              <div className="form-group">
                <label className="mb-1">Note</label>
                <textarea
                  id="note"
                  rows={4}
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Note..."
                ></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="m-4">
          <button
            className="btn"
            style={{
              backgroundColor: "#00000010",
              border: "1px solid transparent",
              color: "#0E5073",
              width: "100px",
            }}
            onClick={() => setTitle(!dialogTitle)}
          >
            Cancel
          </button>
          <button
            className="btn"
            style={{
              backgroundColor: "#0E5073",
              border: "1px solid transparent",
              color: "#FFFFFF",
              width: "100px",
            }}
            onClick={async () => {
              var requestBody = {
                name: document.getElementById("name").value,
              };
              var res = await AddCompanyLocation(requestBody);
              setTitle(!dialogTitle);
              SwalSuccess({ message: "Success add location" });
              inAwait();
            }}
          >
            Add
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={dialogEditTitle}
        size="lg"
        onHide={() => setEditTitle(!dialogEditTitle)}
      >
        <Modal.Header
          closeButton
          className="m-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title>Edit Location</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  Location Name <span className="text-danger">*</span>
                </label>
                <input
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Location Name..."
                />
              </div>
            </div>
            <div className="col-md-6 my-3">
              <div className="form-group">
                <label className="mb-1">
                  City <span className="text-danger">*</span>
                </label>
                <select className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option>Select City</option>
                  <option>Banyumas</option>
                  <option>Solo</option>
                  <option>Yogyakartya</option>
                  <option>Jakarta</option>
                </select>
              </div>
            </div>
            <div className="col-md-6 my-3">
              <div className="form-group">
                <label className="mb-1">
                  Province <span className="text-danger">*</span>
                </label>
                <select className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option>Select Province</option>
                  <option>Jawa Tengah</option>
                  <option>Jawa Barat</option>
                  <option>Jawa Timur</option>
                  <option>DKI Jakarta</option>
                </select>
              </div>
            </div>
            <div className="col-md-6 my-3">
              <div className="form-group">
                <label className="mb-1">
                  Country <span className="text-danger">*</span>
                </label>
                <select className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option>Select Country</option>
                  <option>Indonesia</option>
                  <option>Malaysia</option>
                  <option>Maroko</option>
                  <option>Arab</option>
                </select>
              </div>
            </div>
            <div className="col-md-6 my-3">
              <div className="form-group">
                <label className="mb-1">
                  Postal Code <span className="text-danger">*</span>
                </label>
                <input
                  placeholder="Postal Code..."
                  type="number"
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>

            <div className="col-md-6 my-3">
              <div className="form-group">
                <label className="mb-1">
                  Phone <span className="text-danger">*</span>
                </label>
                <input
                  placeholder="Phone number..."
                  type="number"
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>

            <div className="col-md-6 my-3">
              <div className="form-group">
                <label className="mb-1">
                  Fax <span className="text-danger">*</span>
                </label>
                <input
                  placeholder="Fax number..."
                  type="number"
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>

            <div className="col-md-12 my-3">
              <div className="form-group">
                <label className="mb-1">
                  Address <span className="text-danger">*</span>
                </label>
                <textarea
                  rows={4}
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Address..."
                ></textarea>
              </div>
            </div>
            <div className="col-md-12 my-3">
              <div className="form-group">
                <label className="mb-1">Note</label>
                <textarea
                  rows={4}
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Note..."
                ></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="m-4">
          <button
            className="btn"
            style={{
              backgroundColor: "#00000010",
              border: "1px solid transparent",
              color: "#0E5073",
              width: "100px",
            }}
            onClick={() => setEditTitle(!dialogEditTitle)}
          >
            Cancel
          </button>
          <button
            className="btn"
            style={{
              backgroundColor: "#0E5073",
              border: "1px solid transparent",
              color: "#FFFFFF",
              width: "100px",
            }}
            onClick={async () => {
              var requestBody = {
                id: editValues.id,
                name: editValues.name,
              };
              var res = await EditCompanyLocation(requestBody);
              setEditTitle(!dialogEditTitle);
              SwalSuccess({ message: "Success edit location" });
              inAwait();
            }}
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
          deleteCompanyLocation(id);
          setDelete(false);
          inAwait();
          SwalSuccess({ message: "Success delete location" });
        }}
        active={isdelete}
      />
    </>
  );
}

export default Locations;
