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
  FilterUser,
  GetUser,
  SearchUser,
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
    var dataEmployeeName = await GetEmployeeName();
    setEmployeeNames(dataEmployeeName);
    setUserManagement(rec["result"]);
    console.log(rec);
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
  const [isCheckedAll, setCheckedAll] = useState(false);
  const [employeeName, setEmployeeName] = useState({
    employeeName: "",
  });
  const [error, setError] = useState("");

  const searchUser = async (keyword) => {
    const data = await SearchUser(keyword);
    setUserManagement(data.result);
  };

  const filterUser = async (data2) => {
    const data = await FilterUser(data2);
    console.log(data);
    setUserManagement(data.result);
    setFilter(!dialogFilter);
  };

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
              onClick={() => {
                inAwait();
                setFilter(!dialogFilter);
              }}
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
            <div
              className="d-flex align-items-center py-2 px-1 justify-content-between"
              style={{
                border: "1px solid #00000050",
                width: "auto",
                borderRadius: "7px",
              }}
            >
              <Search className="mx-2" style={{ color: "#00000050" }} />

              <input
                className="mr-2"
                onChange={(e) => searchUser(e.target.value)}
                placeholder="Search by Employee Name"
                style={{
                  width: "auto",
                  fontSize: "12px",
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none",
                }}
              />
            </div>
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
                <input
                  type="checkbox"
                  style={{ borderRadius: "2px" }}
                  onChange={() => setCheckedAll(!isCheckedAll)}
                />
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
                      <input
                        type="checkbox"
                        checked={isCheckedAll ? true : false}
                        style={{ borderRadius: "2px" }}
                        onChange={(e) => console.log(val["id"])}
                      />
                    </td>
                    <td className="align-middle">{val["username"]}</td>
                    <td className="align-middle">{val?.roles?.name}</td>
                    <td className="align-middle">{val?.employee?.firstName}</td>
                    <td className="align-middle">{val["status"]}</td>
                    <td className="align-middle">
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
                    </td>
                  </tr>
                );
              })
            ) : (
              <td colSpan={6}>
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
        <form 
          onSubmit={async(e)=> {
            e.preventDefault();
            try {
              var requestBody = {
                role_id: document.getElementById("role").value,
                employee_id: employeeName.employeeName,
                status: document.getElementById("status").value,
                username: document.getElementById("username").value,
                password: document.getElementById("password").value,
                location: document.getElementById("asignto").value,
              };
              if (
                employeeName.employeeName == undefined ||
                employeeName.employeeName == null ||
                employeeName.employeeName == ""
                ) {
                  setError("Please choose the employee");
                  return false;
              }
              await AddUser(requestBody);
              setUser(false);
              inAwait();
            } catch (error) {
              setError(error.response.data.message);
            }
          }}
        >
        <Modal.Body className="mx-4">
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  User Role <span className="text-danger">*</span>
                </label>
                <select required className="form-control" id="role">
                  <option value="">Select User Role</option>
                  <option value="5">Employee</option>
                  <option value="2">Admin</option>
                  <option value="3">Subadmin</option>
                  <option value="4">Subsidiary</option>
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
                      label: val.firstName,
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
                  required
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
                  required
                  className="form-control"
                  id="password"
                  type={"password"}
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
                  required
                  className="form-control"
                  id="confirmPassword"
                  type={"password"}
                  placeholder="Confirm Password..."
                  />
              </div>
            </div>
            <div className="col-12 mb-3">
              <div className="form-group">
                <label className="mb-1">Assigned to Location</label>
                <input
                  required
                  className="form-control"
                  id="asignto"
                  placeholder="Search location"
                  />
              </div>
            </div>
          </div>
          <p className="text-danger text-sm">{error}</p>
        </Modal.Body>
        <Modal.Footer className="m-4">
          <button
            className="btn"
            type="button"
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
            type="submit"
            style={{
              backgroundColor: "#0E5073",
              border: "1px solid transparent",
              color: "#FFFFFF",
              width: "100px",
            }}
            // onClick={async () => {
            //   try {
            //     var requestBody = {
            //       role: document.getElementById("role").value,
            //       employee_id: employeeName.employeeName,
            //       status: document.getElementById("status").value,
            //       username: document.getElementById("username").value,
            //       password: document.getElementById("password").value,
            //       location: document.getElementById("asignto").value,
            //     };
            //     if (
            //       employeeName.employeeName == undefined ||
            //       employeeName.employeeName == null ||
            //       employeeName.employeeName == ""
            //       ) {
            //         setError("Please choose the employee");
            //         return false;
            //     }
            //     await AddUser(requestBody);
            //     setUser(false);
            //     inAwait();
            //   } catch (error) {
            //     setError(error.response.data.message);
            //   }
            //   // var res = await axios.post;
            // }}
          >
            Add
          </button>
        </Modal.Footer>
        </form>
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
                  {editUserData?.roles?.name === "admin" ? (
                    <>
                      <option value="5">Employee</option>
                      <option value="2" selected>
                        Admin
                      </option>
                      <option value="3">Subadmin</option>
                      <option value="4">Subsidiary</option>
                    </>
                  ) : ""
                  }
                  {
                    editUserData?.roles?.name == "employee" ? <>
                    <option value="5" selected>Employee</option>
                    <option value="2">
                      Admin
                    </option>
                    <option value="3">Subadmin</option>
                    <option value="4">Subsidiary</option>
                  </> : ""
                  }
                  {
                    editUserData?.roles?.name == "subadmin" ? <>
                    <option value="5">Employee</option>
                    <option value="2">
                      Admin
                    </option>
                    <option value="3" selected>Subadmin</option>
                    <option value="4">Subsidiary</option>
                  </> : ""
                  }
                  {
                    editUserData?.roles?.name == "subsdiary" ? <>
                    <option value="5">Employee</option>
                    <option value="2">
                      Admin
                    </option>
                    <option value="3">Subadmin</option>
                    <option value="4" selected>Subsidiary</option>
                  </> : ""
                  }
                </select>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  Employee Name <span className="text-danger">*</span>
                </label>
                {/* <input
                  className="form-control"
                  placeholder="Employee Name..."
                  id="employeeEdit"
                  value={editUserData?.employee?.firstName}
                  onChange={(val) =>
                    setEmployeeName({ employeeName: val.target.value })
                  }
                /> */}
                <Select
                  id="selectedEmployee"
                  onChange={(val) =>
                    setEmployeeName({ employeeName: val.value })
                  }
                  isFocused="appearance-none border-0 outline-0"
                  className="appearance-none"
                  defaultValue={
                    { label: editUserData?.employee?.firstName, value: editUserData?.employee?.id }  
                  }
                  classNamePrefix="appearance-none active:outline-0 active:border-0 focus:outline-0 focus:border-0 focus:shadow-outline"
                  options={employeeNames.map((val) => {
                    return {
                      value: val.id,
                      label: val.firstName,
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
              <div className="form-group">
                <label className="mb-1">Assigned to Location</label>
                <input
                  className="form-control"
                  id="asigntoEdit"
                  value={editUserData?.location}
                  placeholder="Search location"
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
                      type={"password"}
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
                      type={"password"}
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
                role_id: document.getElementById("roleEdit")?.value,
                employee_id: employeeName.employeeName,
                status: document.getElementById("statusEdit")?.value,
                username: document.getElementById("usernameEdit")?.value,
                password: document.getElementById("passwordEdit")?.value,
                location: document.getElementById("asigntoEdit").value,
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
                <select id="roleFilter" className="form-control">
                  <option>Select user role</option>
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                  <option value="subadmin">Subadmin</option>
                  <option value="subsdiary">Subsdiary</option>
                </select>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label>Status</label>
                <select id="statusFilter" className="form-control">
                  <option>Select status</option>
                  <option value="Enable">Enable</option>
                  <option value="Disable">Disable</option>
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
            onClick={() =>
              filterUser({
                role: document.getElementById("roleFilter").value,
                status: document.getElementById("statusFilter").value,
              })
            }
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
