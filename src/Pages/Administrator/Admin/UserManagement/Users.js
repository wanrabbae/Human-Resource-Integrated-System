import { faArrowsUpDown, faArrowsUpDownLeftRight, faArrowsUpToLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Add, AlignVerticalCenter, ArrowUpwardTwoTone, Delete, DeleteOutline, EditOutlined, Filter, Filter1, FilterCenterFocus, FilterList, ImportExport, Search } from "@mui/icons-material";
import { Box, Button, IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";
import { Table, Modal, ModalBody, ModalHeader, ModalFooter } from "react-bootstrap";
import TextFieldSearch from "../../../../Components/TextField";


function Users() {
    const [dialogUser, setUser] = useState(false);
    const [dialogEditUser, setEditUser] = useState(false);
    const [dialogFilter, setFilter] = useState(false);
    const [changePassword, setPassword] = useState(false);
    return (
        <>
            <div className="w-100 bg-light p-4" style={{ borderRadius: "10px" }}>
                <h5><b>Users</b></h5>
                <p><small>list of users</small></p>
                <br></br>
                <div className="d-flex justify-content-between">
                    <div>
                        <Button onClick={() => setFilter(!dialogFilter)} style={{ color: "#003049", border: "1px solid #00000040", borderRadius: "7px", backgroundColor: "transparent", }} variant="contained" startIcon={<FilterList />}>Filter</Button>
                    </div>
                    <div className="d-flex">
                        <TextFieldSearch />
                        <div className="mx-2"></div>
                        <Button onClick={() => {
                            setUser(!dialogUser);
                        }} style={{ color: "#FFFFFF", borderRadius: "7px", backgroundColor: "#0E5073", }} variant="contained" startIcon={<Add />}>Add User</Button>
                    </div>
                </div>
                <br></br>
                <Table borderless responsive>
                    <thead>
                        <tr style={{ backgroundColor: "#EBF7FF" }}>
                            <th width="10px"><input type="checkbox" style={{ borderRadius: "2px", }} /></th>
                            <th onClick={() => { }}>Username <ImportExport fontSize="2px" /></th>
                            <th onClick={() => { }}>User Role <ImportExport fontSize="2px" /></th>
                            <th onClick={() => { }}>Employee Name <ImportExport fontSize="2px" /></th>
                            <th onClick={() => { }}>Status <ImportExport fontSize="2px" /></th>
                            <th onClick={() => { }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="align-middle"><input type="checkbox" style={{ borderRadius: "2px", }} /></td>
                            <td className="align-middle">Admin</td>
                            <td className="align-middle">Admin</td>
                            <td className="align-middle">Vina Afrilia</td>
                            <td className="align-middle">Enable</td>
                            <td className="align-middle">
                                <button className="btn btn-sm mx-1" style={{ backgroundColor: "#CEDFEA", borderRadius: "8px", }}><DeleteOutline fontSize="10px" /></button>
                                <button onClick={() => setEditUser(!dialogEditUser)} className="btn btn-sm mx-1" style={{ backgroundColor: "#CEDFEA", borderRadius: "8px", }}><EditOutlined fontSize="10px" /></button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            <Modal show={dialogUser} size="lg" onHide={() => setUser(!dialogUser)}>
                <Modal.Header

                    closeButton
                    className="m-4"
                    style={{ borderBottomColor: "transparent", }}
                >
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-4">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <label className="mb-1">User Role <span className="text-danger">*</span></label>
                                <select className="form-control">
                                    <option>Select User Role</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <label className="mb-1">Employee Name <span className="text-danger">*</span></label>
                                <input className="form-control" placeholder="Employee Name..." />
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <label className="mb-1">Status <span className="text-danger">*</span></label>
                                <select className="form-control">
                                    <option>Select Status</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <label className="mb-1">Username <span className="text-danger">*</span></label>
                                <input className="form-control" placeholder="Your Username..." />
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <label className="mb-1">Password <span className="text-danger">*</span></label>
                                <input className="form-control" placeholder="Your Password..." />
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <label className="mb-1">Confirm Password <span className="text-danger">*</span></label>
                                <input className="form-control" placeholder="Confirm Password..." />
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
                    >
                        Add
                    </button>
                </Modal.Footer>
            </Modal>

            <Modal show={dialogEditUser} size="lg" onHide={() => setEditUser(!dialogEditUser)}>
                <Modal.Header

                    closeButton
                    className="m-4"
                    style={{ borderBottomColor: "transparent", }}
                >
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-4">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <label className="mb-1">User Role <span className="text-danger">*</span></label>
                                <select className="form-control">
                                    <option>Select User Role</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <label className="mb-1">Employee Name <span className="text-danger">*</span></label>
                                <input className="form-control" placeholder="Employee Name..." />
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <label className="mb-1">Status <span className="text-danger">*</span></label>
                                <select className="form-control">
                                    <option>Select Status</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <label className="mb-1">Username <span className="text-danger">*</span></label>
                                <input className="form-control" placeholder="Your Username..." />
                            </div>
                        </div>
                        <div className="col-12 mb-3">
                            <label><small>Change Password?</small></label>
                            <div className="form-check">
                                <input onChange={(val) => {
                                    setPassword(!changePassword);
                                }} type="checkbox" value={changePassword} className="form-check-input" />
                                <label className="form-check-label">Yes</label>
                            </div>
                        </div>
                        {
                            changePassword ?
                                <>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label className="mb-1">Password <span className="text-danger">*</span></label>
                                            <input className="form-control" placeholder="Your Password..." />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label className="mb-1">Confirm Password <span className="text-danger">*</span></label>
                                            <input className="form-control" placeholder="Confirm Password..." />
                                        </div>
                                    </div>
                                </>
                                :
                                <></>
                        }

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
                    >
                        Submit
                    </button>
                </Modal.Footer>
            </Modal>

            <Modal size="lg" show={dialogFilter} onHide={() => setFilter(!dialogFilter)}>
                <Modal.Header
                    closeButton
                    className="m-4"
                    style={{ borderBottomColor: "transparent", }}>
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
        </>
    );
}

export default Users;