import {
  faArrowsUpDown,
  faArrowsUpDownLeftRight,
  faArrowsUpToLine,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Add,
  AlignVerticalCenter,
  ArrowUpwardTwoTone,
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
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "react-bootstrap";
import {
  AddJobTittle,
  delJobTittle,
  EditJobTittle,
  GetJobPosition,
  GetJobTittle,
} from "../../../../../Repository/AdminRepository";
import { ModalDelete, SwalSuccess } from "../../../../../Components/Modals";

function JobPosition() {
  const [jobposition, setJobPosition] = useState([]);
  const [editValues, setEditValues] = useState();
  const inAwait = async () => {
    var rec = await GetJobPosition();
    setJobPosition(rec["result"]);
  };
  useEffect(() => {
    inAwait();
  }, []);
  var spesificationRef = useRef();
  const [isdelete, setDelete] = useState(false);
  const [id, setId] = useState();
  const [spesification, setSpesification] = useState();
  const [dialogTitle, setTitle] = useState(false);
  const [dialogEditTitle, setEditTitle] = useState(false);
  const [isCheckedAll, setCheckedAll] = useState(false);
  const [isdelete2, setDelete2] = useState(false);
  return (
    <>
      <div
        className="w-100 p-4"
        style={{ backgroundColor: "#FFFFFF", borderRadius: "15px",boxShadow:'0px 0px 3px rgba(0, 0, 0, 0.25)'}}
      >
        <h5>
          <b>Job Position</b>
        </h5>
        <p>
          <small>list of Job Position</small>
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
              onClick={() => {
                setDelete2(true);
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
              Add Job Position
            </Button>
          </div>
        </div>
        <br></br>
        <Table borderless responsive style={{ color: "#00000070" }}>
          <thead>
            <tr style={{ backgroundColor: "#EBF7FF" }}>
              <th width="10px">
                <input
                  type="checkbox"
                  style={{ borderRadius: "2px" }}
                  onChange={() => setCheckedAll(!isCheckedAll)}
                />
              </th>
              <th onClick={() => {}}>
              Position Name <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}}>Grade</th>
              <th onClick={() => {}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobposition.length > 0 ? (
              jobposition.map((val) => {
                return (
                  <tr>
                    <td className="align-middle">
                      <input
                        type="checkbox"
                        checked={isCheckedAll ? true : false}
                        style={{ borderRadius: "2px" }}
                        onChange={(e) => console.log(val["id"])}
                      />
                    </td>
                    <td className="align-middle" style={{ minWidth: "200px" }}>
                      {val["name"]}
                    </td>
                    <td className="align-middle">{val.jobgrade?.name}</td>
                    <td className="align-middle" style={{ minWidth: "100px" }}>
                      <button
                        onClick={() => {
                          setId(val["id"]);
                          setEditValues(val);
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
                      <button
                        onClick={() => {
                          setDelete(true);
                          setId(val["id"]);
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
                );
              })
            ) : (
              <td>
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
          <Modal.Title>Add Job Postition</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  Job Position <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  id="name"
                  placeholder="Job title..."
                />
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  Job Id <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  id="name"
                  placeholder="Job title..."
                />
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <label className="mb-1">Job Grade</label>
                <select
                  className="form-control"
                  onChange={(e) =>
                    setEditValues({ ...editValues, type: e.target.value })
                  }
                >
                  <option>Select Job Grade</option>
                  <option value="IDR">XV</option>
                  <option value="USD">I-III</option>
                </select>
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
                description: document.getElementById("description").value,
                spesification: spesification,
                note: document.getElementById("note").value,
              };
              var res = await AddJobTittle(requestBody);
              console.log(res);
              setTitle(!dialogTitle);
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
          <Modal.Title>Edit Job Position</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  Job Position <span className="text-danger">*</span>
                </label>
                <input
                  id="nameEdit"
                  className="form-control"
                  placeholder="Job title..."
                  value={editValues?.name ?? null}
                  onChange={(e) =>
                    setEditValues({ ...editValues, name: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  Job Id <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  id="name"
                  placeholder="Job title..."
                />
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <label className="mb-1">Job Grade</label>
                <select
                  className="form-control"
                  onChange={(e) =>
                    setEditValues({ ...editValues, type: e.target.value })
                  }
                >
                  <option>Select Job Grade</option>
                  <option value="IDR">XV</option>
                  <option value="USD">I-III</option>
                </select>
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
            onClick={async () => {
              var requestBody = {
                id: id,
                name: document.getElementById("nameEdit").value,
                description: document.getElementById("descriptionEdit").value,
                spesification: spesification,
                note: document.getElementById("noteEdit").value,
              };

              var res = await EditJobTittle(requestBody);
              console.log(res);
              setEditTitle(!dialogEditTitle);
              SwalSuccess({ message: "Success edit job title" });
              inAwait();
            }}
            className="btn"
            style={{
              backgroundColor: "#0E5073",
              border: "1px solid transparent",
              color: "#FFFFFF",
              width: "100px",
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
          delJobTittle(id);
          setDelete(false);
          inAwait();
          SwalSuccess({ message: "Success delete job title" });
        }}
        active={isdelete}
      />
      <ModalDelete
        close={() => {
          setDelete2(false);
        }}
        submit={() => {
          setDelete2(false);
          SwalSuccess({ message: "Success delete job title" });
        }}
        active={isdelete2}
      />
    </>
  );
}

export default JobPosition;
