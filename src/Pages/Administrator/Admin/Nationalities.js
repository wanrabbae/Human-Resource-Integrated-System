
import { Add, AlignVerticalCenter, ArrowUpwardTwoTone, Close, Delete, DeleteOutline, EditOutlined, Filter, Filter1, FilterCenterFocus, FilterList, ImportExport, Search } from "@mui/icons-material";

import { useState } from "react";
import { Button } from "@mui/material";
import { Table, Modal, ModalBody, ModalHeader, ModalFooter, Form } from "react-bootstrap";

function Nationalities() {
    const [dialogTitle, setTitle] = useState(false);
    const [dialogEditTitle, setEditTitle] = useState(false);
    return (
        <>
            <div className="w-100 p-4" style={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}>
                <h5><b>Nationalities</b></h5>
                <p><small>list of Nationalities</small></p>
                <br></br>
                <div className="d-flex justify-content-between">
                    <div>
                        <Button disabled style={{ color: "#003049", border: "1px solid #00000040", borderRadius: "7px", backgroundColor: "transparent", }} variant="contained" startIcon={<DeleteOutline />}>Delete</Button>
                    </div>
                    <div>
                        <Button onClick={() => {
                            setTitle(!dialogTitle);
                        }} style={{ color: "#FFFFFF", borderRadius: "7px", backgroundColor: "#0E5073", }} variant="contained" startIcon={<Add />}>Add Nationalities</Button>
                    </div>
                </div>
                <br></br>
                <Table borderless responsive style={{ color: "#00000070" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#EBF7FF" }}>
                            <th width="10px"><input type="checkbox" style={{ borderRadius: "2px", }} /></th>
                            <th onClick={() => { }}>Nationalities <ImportExport fontSize="2px" /></th>
                            <th onClick={() => { }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="align-middle"><input type="checkbox" style={{ borderRadius: "2px", }} /></td>
                            <td className="align-middle" style={{ minWidth: "200px", }}>Indonesian</td>
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
                    <Modal.Title>Add Nationalities</Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-4">
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <label className="mb-1">Nationalities<span className="text-danger">*</span></label>
                                <input className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nationalities..." />
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
                    <Modal.Title>Edit Nationalities</Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-4">
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <label className="mb-1">Nationalities<span className="text-danger">*</span></label>
                                <input className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nationalities..." />
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

export default Nationalities