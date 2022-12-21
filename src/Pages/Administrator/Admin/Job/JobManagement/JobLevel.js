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
  AddJobLevel,
  AddJobTittle,
  DeleteJobLevel,
  delJobTittle,
  EditJobLevel,
  EditJobTittle,
  GetJobGrade,
  GetJobLevel,
  GetJobTittle,
} from "../../../../../Repository/AdminRepository";
import { ModalDelete, SwalSuccess } from "../../../../../Components/Modals";

function JobLevel() {
  const [joblevel, setJobLevel] = useState([]);
  const [jobgrade, setJobGrade] = useState([]);
  const [editValues, setEditValues] = useState();
  const inAwait = async () => {
    var rec = await GetJobLevel();
    setJobLevel(rec);
    var grd = await GetJobGrade();
    setJobGrade(grd);
  };
  useEffect(() => {
    inAwait();
  }, []);
  const [isCheckedAll, setCheckedAll] = useState(false);
  const [isDelAll, setDelAll] = useState([]);
  const [isCheck, setIsCheck] = useState([]);

  const handleSelectAll = async (e) => {
    setCheckedAll(!isCheckedAll);
    setIsCheck(joblevel.map(li => li.id));
    if (isCheckedAll) {
      setIsCheck([]);
    }
  };

  const handleClick = async (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };
  var spesificationRef = useRef();
  const [isdelete, setDelete] = useState(false);
  const [id, setId] = useState();
  const [spesification, setSpesification] = useState();
  const [dialogTitle, setTitle] = useState(false);
  const [dialogEditTitle, setEditTitle] = useState(false);
  const [isdelete2, setDelete2] = useState(false);
  return (
    <>
      <div
        className="w-100 p-4"
        style={{ backgroundColor: "#FFFFFF", borderRadius: "15px",boxShadow:'0px 0px 3px rgba(0, 0, 0, 0.25)'}}
      >
        <h5>
          <b>Job Level</b>
        </h5>
        <p>
          <small>list of Job Level</small>
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
              // onClick={() => {
              //   setDelete2(true);
              // }}
              variant="contained"
              startIcon={<DeleteOutline />}
              onClick={async () => {
                isCheck.map(async(all) => (
                  // setDelAll(all)
                  await DeleteJobLevel(all)
                ))
                // console.log(isDelAll)
                SwalSuccess({ message: "Success Delete All Job Level" });
                await inAwait();
                setCheckedAll(!isCheckedAll)
              }}
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
              Add Job Level
            </Button>
          </div>
        </div>
        <br></br>
        <Table borderless responsive style={{ color: "#00000070", fontSize: "0.75rem"}}>
          <thead>
            <tr style={{ backgroundColor: "#EBF7FF" }}>
              <th width="10px">
                <input
                  type="checkbox"
                  style={{ borderRadius: "2px" }}
                  onChange={handleSelectAll} checked={isCheckedAll}
                />
              </th>
              <th onClick={() => {}}>
              Level Name <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}}>Grade</th>
              <th onClick={() => {}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {joblevel.length > 0 ? (
              joblevel.map((val) => {
                return (
                  <tr>
                    <td className="align-middle">
                      <input
                        key={val.id}
                        type="checkbox" 
                        style={{ borderRadius: "2px" }} 
                        // checked={isCheckedAll ? true : false}
                        checked={isCheck.includes(val.id)}
                        // onChange={(e) => console.log(skill["id"])}
                        onChange={handleClick} 
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
              <td colSpan={4}>
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
          <Modal.Title>Add Job Level</Modal.Title>
        </Modal.Header>
        <form 
        onSubmit={async (e) => {
          e.preventDefault();
          var requestBody = {
            name: document.getElementById("name").value,
            grade_id: document.getElementById("grade_id").value,
          };
          var res = await AddJobLevel(requestBody);
          console.log(res);
          setTitle(!dialogTitle);
          SwalSuccess({ message: "Success Add job level" });
          inAwait();
        }}
        >

        <Modal.Body className="mx-4">
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  Level Name <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  required
                  id="name"
                  placeholder="Level Name..."
                />
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <label className="mb-1">Job Grade</label>
                <select
                  className="form-control"
                  id="grade_id"
                  required
                  onChange={(e) =>
                    setEditValues({ ...editValues, grade_id: e.target.value })
                  }
                  >
                  <option value="">Select Job Grade</option>
                  {
                    jobgrade.map((val) => {
                      return (
                        <option selected={editValues?.grade_id == val.id ? true : false } value={val.id}>{val.name}</option>
                        )
                    })
                  }
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
            type="button"
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
            type="submit"
            >
            Add
          </button>
        </Modal.Footer>
        </form>
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
          <Modal.Title>Edit Job Level</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
        <div className="row">
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  Level Name <span className="text-danger">*</span>
                </label>
                <input
                  value={editValues?.name ?? null}
                  onChange={(e) =>
                    setEditValues({ ...editValues, name: e.target.value })
                  }
                  className="form-control"
                  id="name"
                  placeholder="Level Name..."
                />
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <label className="mb-1">Job Grade</label>
                <select
                  className="form-control"
                  id="grade_id"
                  onChange={(e) =>
                    setEditValues({ ...editValues, grade_id: e.target.value })
                  }
                >
                  <option>Select Job Grade</option>
                  {
                    jobgrade.map((val) => {
                      return (
                        <option selected={editValues?.grade_id == val.id ? true : false } value={val.id}>{val.name}</option>
                      )
                    })
                  }
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
                name: document.getElementById("name").value,
                grade_id: document.getElementById("grade_id").value,
              };

              var res = await EditJobLevel(requestBody);
              console.log(res);
              setEditTitle(!dialogEditTitle);
              SwalSuccess({ message: "Success edit job level" });
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
        submit={async() => {
          await DeleteJobLevel(id);
          setDelete(false);
          SwalSuccess({ message: "Success delete job level" });
          await inAwait();
        }}
        active={isdelete}
      />
      <ModalDelete
        close={() => {
          setDelete2(false);
        }}
        submit={() => {
          setDelete2(false);
          SwalSuccess({ message: "Success delete job level" });
        }}
        active={isdelete2}
      />
    </>
  );
}

export default JobLevel;
