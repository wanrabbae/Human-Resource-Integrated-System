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
  LineAxisOutlined,
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
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "react-bootstrap";
import { TextFieldSearch } from "../../../../Components/TextField";
import {
  AddUser,
  DeleteUser,
  EditUser,
  GetUser,
} from "../../../../Repository/AdminRepository";
import { GetEmployeeName } from "../../../../Repository/EmployeeRepository";
import Select from "react-select";
import { ModalDelete } from "../../../../Components/Modals";

function Users() {
  const [user, setUserManagement] = useState([]);
  const [editUserData, setEditUserData] = useState();
  const [employeeNames, setEmployeeNames] = useState([]);
  const inAwait = async () => {
    var rec = await GetUser();
    console.log("USERS: ", rec);
    var dataEmployeeName = await GetEmployeeName();
    console.log("EMPLOYEES: ", dataEmployeeName);
    setEmployeeNames(dataEmployeeName);
    setUserManagement(rec["result"]);
  };
  useEffect(() => {
    inAwait();
  }, []);
  const [dialogUser, setUser] = useState(false);
  const [dialogEditUser, setEditUser] = useState(false);
  const [dialogFilter, setFilter] = useState(false);
  const [changePassword, setPassword] = useState(false);
  const [isdelete, setDelete] = useState(false);
  const [id, setId] = useState();
  const [employeeName, setEmployeeName] = useState({
    employeeName: "",
  });

  return (
    <>
      <div className="w-100 bg-light p-4" style={{ borderRadius: "10px" }}>
        <h5>
          <b>Users</b>
        </h5>
        <p>
          <small>list of users</small>
        </p>
        <br></br>
        <div className="d-flex justify-content-between">
          <div>
            <Button
              onClick={() => setFilter(!dialogFilter)}
              style={{
                color: "#003049",
                border: "1px solid #00000040",
                borderRadius: "7px",
                backgroundColor: "transparent",
              }}
              variant="contained"
              startIcon={<FilterList />}
            >
              Filter
            </Button>
          </div>
          <div className="d-flex">
            <TextFieldSearch />
            <div className="mx-2"></div>
            <Button
              onClick={() => {
                setUser(!dialogUser);
              }}
              style={{
                color: "#FFFFFF",
                borderRadius: "7px",
                backgroundColor: "#0E5073",
              }}
              variant="contained"
              startIcon={<Add />}
            >
              Add User
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
                Username <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}}>
                User Role <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}}>
                Employee Name <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}}>
                Status <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {user.length > 0 ? (
              user.map((val) => {
                return (
                  <tr key={val["id"]}>
                    <td className="align-middle">
                      <input type="checkbox" style={{ borderRadius: "2px" }} />
                    </td>
                    <td className="align-middle">{val["username"]}</td>
                    <td className="align-middle">{val["role"]}</td>
                    <td className="align-middle">{val["employee_id"]}</td>
                    <td className="align-middle">{val["status"]}</td>
                    <td className="align-middle">
                      <button
                        className="btn btn-sm mx-1"
                        style={{
                          backgroundColor: "#CEDFEA",
                          borderRadius: "8px",
                        }}
                        onClick={() => {
                          setDelete(true);
                          setId(val["id"]);
                        }}
                      >
                        <DeleteOutline fontSize="10px" />
                      </button>
                      <button
                        onClick={() => {
                          setEditUserData(val);
                          setEditUser(!dialogEditUser);
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

      <Modal show={dialogUser} size="lg" onHide={() => setUser(!dialogUser)}>
        <Modal.Header
          closeButton
          className="m-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  User Role <span className="text-danger">*</span>
                </label>
                <select className="form-control" id="role">
                  <option>Select User Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  Employee Name <span className="text-danger">*</span>
                </label>
                <Select
                  id="selectedEmployee"
                  isLoading={true}
                  onChange={(val) =>
                    setEmployeeName({ employeeName: val.value })
                  }
                  isFocused="appearance-none border-0 outline-0"
                  className="appearance-none"
                  classNamePrefix="appearance-none active:outline-0 active:border-0 focus:outline-0 focus:border-0 focus:shadow-outline"
                  options={employeeNames.map((val) => {
                    return {
                      value: val.id,
                      label: val.firstName + " " + val.lastName,
                    };
                  })}
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  Status <span className="text-danger">*</span>
                </label>
                <select className="form-control" id="status">
                  <option value={"selectStatus"}>Select Status</option>
                  <option value="Enable">Enable</option>
                  <option value="Disable">Disable</option>
                </select>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  Username <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  id="username"
                  placeholder="Your Username..."
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  Password <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  id="password"
                  placeholder="Your Password..."
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  Confirm Password <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm Password..."
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="m-4">
          <button
            className="btn"
            style={{
              backgroundColor: "#737373",
              border: "1px solid transparent",
              color: "#FFFFFF",
              width: "100px",
            }}
            onClick={() => setUser(!dialogUser)}
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
                role: document.getElementById("role").value,
                name: employeeName.employeeName,
                status: document.getElementById("status").value,
                username: document.getElementById("username").value,
                password: document.getElementById("password").value,
              };
              await AddUser(requestBody);
              setUser(false);
              inAwait();
              // var res = await axios.post;
            }}
          >
            Add
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={dialogEditUser}
        size="lg"
        onHide={() => setEditUser(!dialogEditUser)}
      >
        <Modal.Header
          closeButton
          className="m-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  User Role <span className="text-danger">*</span>
                </label>
                <select className="form-control" id="roleEdit">
                  <option>Select User Role</option>
                  {editUserData?.role === "admin" ? (
                    <>
                      <option value="user">User</option>
                      <option value="admin" selected>
                        Admin
                      </option>
                    </>
                  ) : (
                    <>
                      <option value="user" selected>
                        User
                      </option>
                      <option value="admin">Admin</option>
                    </>
                  )}
                </select>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  Employee Name <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  placeholder="Employee Name..."
                  id="employeeEdit"
                  onChange={(val) =>
                    setEmployeeName({ employeeName: val.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  Status <span className="text-danger">*</span>
                </label>
                <select className="form-control" id="statusEdit">
                  <option>Select Status</option>
                  {editUserData?.status === "Enable" ? (
                    <>
                      <option value="Enable" selected>
                        Enable
                      </option>
                      <option value="Disable">Disable</option>
                    </>
                  ) : (
                    <>
                      <option value="Enable">Enable</option>
                      <option value="Disable" selected>
                        Disable
                      </option>
                    </>
                  )}
                </select>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  Username <span className="text-danger">*</span>
                </label>
                <input
                  id="usernameEdit"
                  className="form-control"
                  placeholder="Your Username..."
                  value={editUserData?.username}
                  onChange={(e) =>
                    setEditUserData({
                      ...editUserData,
                      username: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="col-12 mb-3">
              <label>
                <small>Change Password?</small>
              </label>
              <div className="form-check">
                <input
                  onChange={(val) => {
                    setPassword(!changePassword);
                  }}
                  type="checkbox"
                  value={changePassword}
                  className="form-check-input"
                />
                <label className="form-check-label">Yes</label>
              </div>
            </div>
            {changePassword ? (
              <>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label className="mb-1">
                      Password <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      id="passwordEdit"
                      placeholder="Your Password..."
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label className="mb-1">
                      Confirm Password <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      id="confirmPasswordEdit"
                      placeholder="Confirm Password..."
                    />
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="m-4">
          <button
            className="btn"
            style={{
              backgroundColor: "#737373",
              border: "1px solid transparent",
              color: "#FFFFFF",
              width: "100px",
            }}
            onClick={() => setEditUser(!dialogEditUser)}
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
                id: editUserData.id,
                role: document.getElementById("roleEdit")?.value,
                name: employeeName.employeeName,
                status: document.getElementById("statusEdit")?.value,
                username: document.getElementById("usernameEdit")?.value,
                password: document.getElementById("passwordEdit")?.value,
              };
              await EditUser(requestBody);
              setEditUser(false);
              inAwait();
            }}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="lg"
        show={dialogFilter}
        onHide={() => setFilter(!dialogFilter)}
      >
        <Modal.Header
          closeButton
          className="m-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title>Users Filter</Modal.Title>
        </Modal.Header>

        <Modal.Body className="mx-4">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>User Role</label>
                <select className="form-control">
                  <option>Select user role</option>
                </select>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label>Status</label>
                <select className="form-control">
                  <option>Select status</option>
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="m-4">
          <button
            className="btn"
            style={{
              backgroundColor: "#737373",
              border: "1px solid transparent",
              color: "#FFFFFF",
              width: "100px",
            }}
            onClick={() => setFilter(!dialogFilter)}
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
          DeleteUser(id);
          inAwait();
          setDelete(false);
        }}
        active={isdelete}
      />
    </>
  );
}

export default Users;
