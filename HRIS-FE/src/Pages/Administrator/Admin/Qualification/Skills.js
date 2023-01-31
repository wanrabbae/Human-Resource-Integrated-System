import {
  Add,
  AlignVerticalCenter,
  ArrowUpwardTwoTone,
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

import { useEffect, useState } from "react";
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
  AddSkill,
  DeleteSkills,
  EditSkill,
  GetSkills,
} from "../../../../Repository/SkillsRepository";

function Skills() {
  const [editValues, setEditValues] = useState();
  const [skills, setSkills] = useState([]);
  const [dialogTitle, setTitle] = useState(false);
  const [dialogEditTitle, setEditTitle] = useState(false);
  const [isdelete, setDelete] = useState(false);
  const [isdeleteAll, setDeleteAll] = useState(false);
  const [id, setId] = useState();
  const [skillAdd, setSkillAdd] = useState({});
  const [isCheckedAll, setCheckedAll] = useState(false);
  const [isDelAll, setDelAll] = useState([]);
  const [isCheck, setIsCheck] = useState([]);

  const inAwait = async () => {
    var data = await GetSkills();
    setSkills(data);
  };
  useEffect(() => {                                              
    inAwait();
  }, []);
  const handleSelectAll = async (e) => {
    setCheckedAll(!isCheckedAll);
    var arr = [];
    if (!isCheckedAll) {
      for (var x = 0;x < skills.length;x++) {
        arr.push(skills[x].id);
      }
    }
    setIsCheck(arr);
  };

  const handleClick = async (e) => {
    setCheckedAll(false);
    const value = parseInt(e.target.value);
    var data = [...isCheck];
    if (isCheck.includes(value)) {
      var index = data.indexOf(value);
      data.splice(index,1);
    } else {
      data.push(value);
    }
    setIsCheck(data);
  };

  console.log(isCheck);

  return (
    <>
      <div
        className="w-100 p-4"
        style={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
      >
        <h5>
          <b>Skills</b>
        </h5>
        <p>
          <small>list of Skills</small>
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
              onClick={async () => {
                for (var x = 0;x < isCheck.length;x++) {
                  await DeleteSkills(isCheck[x]);
                };
                // console.log(isDelAll)
                SwalSuccess({ message: "Success Delete All skill" });
                setIsCheck([]);
                await inAwait();
                setCheckedAll(false);
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
              Add Skills
            </Button>
          </div>
        </div>
        <br></br>
        <Table borderless responsive style={{ color: "#00000070", fontSize: "0.75rem" }}>
          <thead>
            <tr style={{ backgroundColor: "#EBF7FF" }}>
              <th width="10px">
                <input 
                  type="checkbox" style={{ borderRadius: "2px" }} 
                  onChange={handleSelectAll}
                  checked={isCheckedAll}
                />
              </th>
              <th onClick={() => { }}>
                Skills <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => { }}>Description</th>
              <th onClick={() => { }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {skills.length > 0 ? (
              skills.map((skill) => (
                <tr  key={skill["id"]}>
                  <td className="align-middle">
                    <input 
                      key={skill.id}
                      type="checkbox"
                      value={skill.id}
                      style={{ borderRadius: "2px" }} 
                      // checked={isCheckedAll ? true : false}
                      checked={isCheck.includes(skill.id)}
                      // onChange={(e) => console.log(skill["id"])}
                      onChange={handleClick}
                      />
                  </td>
                  <td className="align-middle" style={{ minWidth: "200px" }}>
                    {skill.name}
                  </td>
                  <td className="align-middle" style={{ minWidth: "200px" }}>
                    {skill.description}
                  </td>
                  <td className="align-middle" style={{ minWidth: "100px" }}>
                    <button
                      onClick={() => {
                        setId(skill.id);
                        setEditValues(skill);
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
                      className="btn btn-sm mx-1"
                      style={{
                        backgroundColor: "#CEDFEA",
                        borderRadius: "8px",
                      }}
                      onClick={() => {
                        setDelete(true);
                        setId(skill.id);
                      }}
                    >
                      <DeleteOutline fontSize="10px" />
                    </button>
                  </td>
                </tr>
              ))
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
          <Modal.Title>Add Skill</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            var requestBody = {
              name: skillAdd?.name,
              description: skillAdd?.description,
            };
            await AddSkill(requestBody);
            setTitle(!dialogTitle);
            SwalSuccess({ message: "Success add skill" });
            inAwait();
          }}
        >
          <Modal.Body className="mx-4">
            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    Skill Name <span className="text-danger">*</span>
                  </label>
                  <input
                    id="name"
                    required
                    onChange={(e) =>
                      setSkillAdd({ ...skillAdd, name: e.target.value })
                    }
                    className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Skill Name..."
                  />
                </div>
              </div>
              <div className="col-md-12 my-3">
                <div className="form-group">
                  <label className="mb-1">
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    rows="4"
                    required
                    id="description"
                    onChange={(e) =>
                      setSkillAdd({ ...skillAdd, description: e.target.value })
                    }
                    placeholder="description..."
                    className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ></textarea>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="m-4">
            <button
              className="btn"
              type={"button"}
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
              type={"submit"}
              className="btn"
              style={{
                backgroundColor: "#0E5073",
                border: "1px solid transparent",
                color: "#FFFFFF",
                width: "100px",
              }}
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
          <Modal.Title>Edit Skill</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            var requestBody = {
              id: editValues.id,
              name: editValues.name,
              description: editValues.description,
            };
            var res = await EditSkill(requestBody);
            console.log("TREST");
            setEditTitle(!dialogEditTitle);
            SwalSuccess({ message: "Success edit skill" });
            inAwait();
          }}
        >
          <Modal.Body className="mx-4">
            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    Skill Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Skill Name..."
                    required
                    id="nameEdit"
                    value={editValues?.name ?? null}
                    onChange={(e) =>
                      setEditValues({ ...editValues, name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-md-12 my-3">
                <div className="form-group">
                  <label className="mb-1">
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={editValues?.description ?? null}
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        description: e.target.value,
                      })
                    }
                    id="descriptionEdit"
                    placeholder="description..."
                    className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ></textarea>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="m-4">
            <button
              className="btn"
              type="button"
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
              type="submit"
            >
              Submit
            </button>
          </Modal.Footer>
        </form>
      </Modal>

      <ModalDelete
        close={() => {
          setDelete(false);
        }}
        submit={() => {
          DeleteSkills(id);
          setDelete(false);
          inAwait();
          SwalSuccess({ message: "Success delete skill" });
        }}
        active={isdelete}
      />
    </>
  );
}

export default Skills;
