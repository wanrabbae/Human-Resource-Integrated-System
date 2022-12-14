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
  AddJobPosition,
  AddJobTittle,
  DelJobPosition,
  delJobTittle,
  EditJobTittle,
  GetJobGrade,
  GetJobPosition,
  GetJobTittle,
  getStructure,
  UpdateJobPosition,
} from "../../../../../Repository/AdminRepository";
import { ModalDelete, SwalSuccess } from "../../../../../Components/Modals";
import { positions } from "@mui/system";

function JobPosition() {
  const [jobposition, setJobPosition] = useState([]);
  const [jobgrade, setJobGrade] = useState([]);
  const [editValues, setEditValues] = useState();
  const [allStruct, setStruct] = useState([]);
  const inAwait = async () => {
    var rec = await GetJobPosition();
    setJobPosition(rec["result"]);
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
    setIsCheck(jobposition.map(li => li.id));
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
        style={{ backgroundColor: "#FFFFFF", borderRadius: "15px", boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.25)' }}
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
              onClick={async () => {
                isCheck.map(async(all) => (
                  // setDelAll(all)
                  await DelJobPosition(all)
                ))
                // console.log(isDelAll)
                SwalSuccess({ message: "Success Delete All Job Position" });
                await inAwait();
                setCheckedAll(!isCheckedAll)
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
        <Table borderless responsive style={{ color: "#00000070", fontSize: "0.75rem" }}>
          <thead>
            <tr style={{ backgroundColor: "#EBF7FF" }}>
              <th width="10px">
                <input
                  type="checkbox"
                  style={{ borderRadius: "2px" }}
                  onChange={handleSelectAll} checked={isCheckedAll}
                />
              </th>
              <th onClick={() => { }}>
                Position Name <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => { }}>Grade</th>
              <th onClick={() => { }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobposition.length > 0 ? (
              jobposition.map((val) => {
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
          <Modal.Title>Add Job Postition</Modal.Title>
        </Modal.Header>
        <form
        onSubmit={
          async (e) => {
            e.preventDefault();
            var requestBody = {
              name: document.getElementById("name").value,
              job_id: document.getElementById("job_id").value,
              grade_id: document.getElementById("grade_id").value,
              relation_code: document.getElementById("relation_code").value,
              color: document.getElementById("color").value,
            };
            var res = await AddJobPosition(requestBody);
            console.log(res);
            setTitle(!dialogTitle);
            await inAwait();
            SwalSuccess({ message: "Success add job position" });
          }
        }
        >
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
                  required
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
                  id="job_id"
                  placeholder="Job title..."
                  required
                />
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <label className="mb-1">Job Grade</label>
                <select
                  required
                  className="form-control"
                  id="grade_id"
                  onChange={(e) =>
                    setEditValues({ ...editValues, grade_id: e.target.value })
                  }
                >
                  <option value="">Select Job Grade</option>
                  {
                    jobgrade.map((val) => {
                      return (
                        <option selected={val?.grade_id == val.id ? true : false} value={val.id}>{val.name}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
          </div>
          <div className="w-full mb-3">
            <label className="mb-1">Relation Code</label>
            <select
              required
              id="relation_code"
              className="form-control"
            >
              <option className="py-3" value="">
                Select Relation Code
              </option>
              <option className="py-3" value="Select">
                  As Parent
              </option>
              {jobposition.map((e, i) => {
                return (
                  <option
                    className="py-3"
                    value={e?.id}
                  >
                    {`${e?.name} | ${e?.job_id}`}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-md-12 mb-3">
            <div className="form-group">
              <label className="mb-1">
                Color
              </label>
              <input
                type="color"
                className="form-control"
                id="color"
                required
              />
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
            // onClick={async () => {
            //   var requestBody = {
            //     name: document.getElementById("name").value,
            //     job_id: document.getElementById("job_id").value,
            //     grade_id: document.getElementById("grade_id").value,
            //     relation_code: document.getElementById("relation_code").value,
            //     color: document.getElementById("color").value,
            //   };
            //   var res = await AddJobPosition(requestBody);
            //   console.log(res);
            //   setTitle(!dialogTitle);
            //   await inAwait();
            //   SwalSuccess({ message: "Success add job position" });
            // }}
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
                  id="name"
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
                  id="job_id"
                  value={editValues?.job_id ?? null}
                  onChange={(e) =>
                    setEditValues({ ...editValues, job_id: e.target.value })
                  }
                  placeholder="Job title..."
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
                        <option selected={editValues?.grade_id == val.id ? true : false} value={val.id}>{val.name}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
            <div className="w-full mb-3">
              <label className="mb-1">Relation Code</label>
              <select
                id="relation_code"
                className="form-control"
              >
                <option className="py-3">
                  Select
                </option>
                {jobposition.map((e, i) => {
                  if (editValues?.id != e?.id) {
                    return (
                      <option
                        selected={editValues?.relation_code == e?.id ? true : false}
                        className="py-3"
                        value={e?.id}
                      >
                        {`${e?.name} | ${e?.job_id}`}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <div className="w-full">
              <label className="mb-1">Color</label>
              <input type="color" id="color" value={editValues?.color} className="form-control" onChange={(e) => setEditValues({ ...editValues, color: e.target.value })} />
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
                job_id: document.getElementById("job_id").value,
                relation_code: document.getElementById("relation_code").value,
                grade_id: document.getElementById("grade_id").value,
                color: editValues.color,
              };
              // console.log(requestBody);
              // return 1;
              var res = await UpdateJobPosition(requestBody);
              console.log(res);
              setEditTitle(!dialogEditTitle);
              SwalSuccess({ message: "Success edit job position" });
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
          await DelJobPosition(id);
          setDelete(false);
          SwalSuccess({ message: "Success delete job position" });
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
          SwalSuccess({ message: "Success delete job title" });
        }}
        active={isdelete2}
      />
    </>
  );
}

export default JobPosition;
