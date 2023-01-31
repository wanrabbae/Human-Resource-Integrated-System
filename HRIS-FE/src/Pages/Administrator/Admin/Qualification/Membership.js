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
  GetMembership,
  AddMembership,
  DeleteMembership,
  EditMembership,
} from "../../../../Repository/MembershipsRepository";

function Membership() {
  const [editValues, setEditValues] = useState();
  const [memberships, setMemberships] = useState([]);
  const [dialogTitle, setTitle] = useState(false);
  const [dialogEditTitle, setEditTitle] = useState(false);
  const [isdelete, setDelete] = useState(false);
  const [id, setId] = useState();
  const [isCheckedAll, setCheckedAll] = useState(false);
  const [isDelAll, setDelAll] = useState([]);
  const [isCheck, setIsCheck] = useState([]);

  const inAwait = async () => {
    var data = await GetMembership();
    setMemberships(data);
  };
  useEffect(() => {
    inAwait();
  }, []);

  const handleSelectAll = async (e) => {
    setCheckedAll(!isCheckedAll);
    var arr = [];
    if (!isCheckedAll) {
      for (var x = 0;x < memberships.length;x++) {
        arr.push(memberships[x].id);
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

  return (
    <>
      <div
        className="w-100 p-4"
        style={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
      >
        <h5>
          <b>Membership</b>
        </h5>
        <p>
          <small>list of Membership</small>
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
                  await DeleteMembership(isCheck[x]);
                };
                // console.log(isDelAll)
                SwalSuccess({ message: "Success Delete All Membership" });
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
              Add Membership
            </Button>
          </div>
        </div>
        <br></br>
        <Table borderless responsive style={{ color: "#00000070", fontSize: "0.75rem" }}>
          <thead>
            <tr style={{ backgroundColor: "#EBF7FF" }}>
              <th width="10px">
                <input type="checkbox" style={{ borderRadius: "2px" }} 
                  onChange={handleSelectAll}
                  checked={isCheckedAll}
                />
              </th>
              <th onClick={() => {}}>
                Membership <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {memberships.length > 0 ? (
              memberships.map((member) => (
                <tr>
                  <td className="align-middle">
                    <input 
                      key={member.id}
                      type="checkbox"
                      value={member.id}
                      style={{ borderRadius: "2px" }} 
                      // checked={isCheckedAll ? true : false}
                      checked={isCheck.includes(member.id)}
                      // onChange={(e) => console.log(skill["id"])}
                      onChange={handleClick}
                    />
                  </td>
                  <td className="align-middle" style={{ minWidth: "200px" }}>
                    {member.name}
                  </td>
                  <td className="align-middle" style={{ minWidth: "100px" }}>
                    <button
                      className="btn btn-sm mx-1"
                      style={{
                        backgroundColor: "#CEDFEA",
                        borderRadius: "8px",
                      }}
                      onClick={() => {
                        setId(member.id);
                        setEditValues(member);
                        setEditTitle(!dialogEditTitle);
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
                        setId(member.id);
                      }}
                    >
                      <DeleteOutline fontSize="10px" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <td colSpan={3}>
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
          <Modal.Title>Add Membership</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  Membership Name <span className="text-danger">*</span>
                </label>
                <input
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Membership name..."
                  id="name"
                />
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
              var res = await AddMembership(requestBody);
              setTitle(!dialogTitle);
              SwalSuccess({ message: "Success add membership" });
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
          <Modal.Title>Edit Membership</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  Membership Name<span className="text-danger">*</span>
                </label>
                <input
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Membership name..."
                  value={editValues?.name ?? null}
                  onChange={(e) =>
                    setEditValues({ ...editValues, name: e.target.value })
                  }
                />
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
              var res = await EditMembership(requestBody);
              setEditTitle(!dialogEditTitle);
              SwalSuccess({ message: "Success edit membership" });
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
          DeleteMembership(id);
          setDelete(false);
          inAwait();
          SwalSuccess({ message: "Success delete membership" });
        }}
        active={isdelete}
      />
    </>
  );
}

export default Membership;
