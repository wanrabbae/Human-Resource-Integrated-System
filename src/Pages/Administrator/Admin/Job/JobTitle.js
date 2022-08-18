import { faArrowsUpDown, faArrowsUpDownLeftRight, faArrowsUpToLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Add, AlignVerticalCenter, ArrowUpwardTwoTone, Delete, DeleteOutline, EditOutlined, Filter, Filter1, FilterCenterFocus, FilterList, ImportExport, Search } from "@mui/icons-material";
import { Box, Button, IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";
import { Table, Modal, ModalBody, ModalHeader, ModalFooter } from "react-bootstrap";

function JobTitle() {
    const [dialogTitle, setTitle] = useState(false);
    const [dialogEditTitle, setEditTitle] = useState(false);
    return (
        <>
            <div className="w-100 p-4" style={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}>
                <h5><b>Job Title</b></h5>
                <p><small>list of job title</small></p>
                <br></br>
                <div className="d-flex justify-content-between">
                    <div>
                        <Button style={{ color: "#003049", border: "1px solid #00000040", borderRadius: "7px", backgroundColor: "transparent", }} variant="contained" startIcon={<DeleteOutline />}>Delete</Button>
                    </div>
                    <div>
                        <Button onClick={() => {
                            setTitle(!dialogTitle);
                        }} style={{ color: "#FFFFFF", borderRadius: "7px", backgroundColor: "#0E5073", }} variant="contained" startIcon={<Add />}>Add Job Title</Button>
                    </div>
                </div>
                <br></br>
                <Table borderless responsive style={{ color: "#00000070" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#EBF7FF" }}>
                            <th width="10px"><input type="checkbox" style={{ borderRadius: "2px", }} /></th>
                            <th onClick={() => { }}>Job Title <ImportExport fontSize="2px" /></th>
                            <th onClick={() => { }}>Job Description</th>
                            <th onClick={() => { }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="align-middle"><input type="checkbox" style={{ borderRadius: "2px", }} /></td>
                            <td className="align-middle" style={{ minWidth: "200px", }}>IT Manager</td>
                            <td className="align-middle">oakdoakodkao kaodkadokaodak oakdoakdoakdoakdao kdwadkwad oakdao dkaodakodako aoakdoak</td>
                            <td className="align-middle" style={{ minWidth: "100px", }}>
                                <button className="btn btn-sm mx-1" style={{ backgroundColor: "#CEDFEA", borderRadius: "8px", }}><DeleteOutline fontSize="10px" /></button>
                                <button onClick={() => setEditTitle(!dialogEditTitle)} className="btn btn-sm mx-1" style={{ backgroundColor: "#CEDFEA", borderRadius: "8px", }}><EditOutlined fontSize="10px" /></button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            <Modal show={dialogTitle} size="lg" onHide={() => setTitle(!dialogTitle)}>
                <Modal.Header

                    closeButton
                    className="m-4"
                    style={{ borderBottomColor: "transparent", }}
                >
                    <Modal.Title>Add Job Title</Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-4">
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <label className="mb-1">Job Title <span className="text-danger">*</span></label>
                                <input className="form-control" placeholder="Jobl title..." />
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <label className="mb-1">Job Description <span className="text-danger">*</span></label>
                                <textarea className="form-control" rows={4} placeholder="Job Description..." ></textarea>
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <label className="mb-1">Job Specification <span className="text-danger">*</span></label>
                                <input className="form-control" type="file" />
                                <small>* No more than 64 MB</small>
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <label className="mb-1">Job Description <span className="text-danger">*</span></label>
                                <textarea className="form-control" rows={4} placeholder="Job Description..." ></textarea>
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
                    >
                        Add
                    </button>
                </Modal.Footer>
            </Modal>

            <Modal show={dialogEditTitle} size="lg" onHide={() => setEditTitle(!dialogEditTitle)}>
                <Modal.Header

                    closeButton
                    className="m-4"
                    style={{ borderBottomColor: "transparent", }}
                >
                    <Modal.Title>Add Job Title</Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-4">
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <label className="mb-1">Job Title <span className="text-danger">*</span></label>
                                <input className="form-control" placeholder="Jobl title..." />
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <label className="mb-1">Job Description</label>
                                <textarea className="form-control" rows={4} placeholder="Job Description..." ></textarea>
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <label className="mb-1">Job Specification</label>
                                <input className="form-control" type="file" />
                                <small>* No more than 64 MB</small>
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <label className="mb-1">Job Description</label>
                                <textarea className="form-control" rows={4} placeholder="Job Description..." ></textarea>
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
                    >
                        Add
                    </button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default JobTitle;