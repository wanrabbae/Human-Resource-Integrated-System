
import { Add, AlignVerticalCenter, ArrowUpwardTwoTone, Close, Delete, DeleteOutline, EditOutlined, Filter, Filter1, FilterCenterFocus, FilterList, ImportExport, Search } from "@mui/icons-material";

import { useState } from "react";
import { Table, Modal, ModalBody, ModalHeader, ModalFooter, Button, Form } from "react-bootstrap";

function WorkShift() {
    var array = ["Faris", "Ahmad", "Subarja", "Soleh", "Pesulap Merah", "Pesulap Hijau", "Pesulap Pink", "Pesulap Biru", "Pesulap Kuning",];
    const [dialogTitle, setTitle] = useState(false);
    const [dialogEditTitle, setEditTitle] = useState(false);
    const [selected, setSelected] = useState([]);
    return (
        <>
            <div className="w-100 bg-light p-4" style={{ borderRadius: "10px" }}>
                <h5><b>Work Shift</b></h5>
                <p><small>list of Work Shift</small></p>
                <br></br>
                <div className="d-flex justify-content-between">
                    <div>
                        <Button style={{ color: "#003049", border: "1px solid #00000040", borderRadius: "7px", backgroundColor: "transparent", }} variant="contained" startIcon={<DeleteOutline />}>Delete</Button>
                    </div>
                    <div>
                        <Button onClick={() => {
                            setTitle(!dialogTitle);
                        }} style={{ color: "#FFFFFF", borderRadius: "7px", backgroundColor: "#0E5073", }} variant="contained" startIcon={<Add />}>Add Work Shift</Button>
                    </div>
                </div>
                <br></br>
                <Table borderless responsive style={{ color: "#00000070" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#EBF7FF" }}>
                            <th width="10px"><input type="checkbox" style={{ borderRadius: "2px", }} /></th>
                            <th onClick={() => { }}>Work Shift <ImportExport fontSize="2px" /></th>
                            <th onClick={() => { }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="align-middle"><input type="checkbox" style={{ borderRadius: "2px", }} /></td>
                            <td className="align-middle" style={{ minWidth: "200px", }}>Work Shift</td>
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
                    <Modal.Title>Add Work Shift</Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-4">
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <label className="mb-1">Work Shift Name <span className="text-danger">*</span></label>
                                <input className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Work Shift..." />
                            </div>
                        </div>
                        <h1>Working hours</h1>
                        <div className="col-md-4 my-3">
                            <div className="form-group">
                                <label className="mb-1">Start</label>
                                <input type="time" className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                        </div>
                        <div className="col-md-4 my-3">
                            <div className="form-group">
                                <label className="mb-1">End</label>
                                <input type="time" className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                        </div>
                        <div className="col-md-4 my-3">
                            <div className="form-group">
                                <label className="mb-1">Duration per day</label>
                                <h6>--:--</h6>
                            </div>
                        </div>
                        <div className="col-md-12 my-3">
                            <div className="form-group">
                                <label className="mb-1">Assign Employee</label>
                                <select onChange={(val) =>
                                    setSelected(current => [...current, val.target.value])} className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option>Search Employee</option>
                                    {
                                        array.map((val, index) =>
                                            <option key={index} value={val}>{val}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className="d-flex flex-wrap justify-content-start mt-3">
                                {
                                    selected.map((value, index) =>
                                        <div key={index} className="px-2 d-flex align-items-center my-2 mr-3" style={{ backgroundColor: "#00000030", color: "#00000050", borderRadius: "5px", }}>
                                            {value}
                                            <button onClick={() => setSelected(current => current.filter((val, i) => {
                                                return i !== index
                                            }))} className="btn btn-sm" style={{ color: "#00000030" }}><Close /></button>
                                        </div>)
                                }
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
                    <Modal.Title>Edit Job Categories</Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-4">
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <label className="mb-1">Work Shift Name <span className="text-danger">*</span></label>
                                <input className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Work Shift..." />
                            </div>
                        </div>
                        <h1>Working hours</h1>
                        <div className="col-md-4 my-3">
                            <div className="form-group">
                                <label className="mb-1">Start</label>
                                <input type="time" className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                        </div>
                        <div className="col-md-4 my-3">
                            <div className="form-group">
                                <label className="mb-1">End</label>
                                <input type="time" className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                        </div>
                        <div className="col-md-4 my-3">
                            <div className="form-group">
                                <label className="mb-1">Duration per day</label>
                                <h6>--:--</h6>
                            </div>
                        </div>
                        <div className="col-md-12 my-3">
                            <div className="form-group">
                                <label className="mb-1">Assign Employee</label>
                                <select onChange={(val) =>
                                    setSelected(current => [...current, val.target.value])} className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option>Search Employee</option>
                                    {
                                        array.map((val, index) =>
                                            <option key={index} value={val}>{val}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className="d-flex flex-wrap justify-content-start mt-3">
                                {
                                    selected.map((value, index) =>
                                        <div key={index} className="px-2 d-flex align-items-center my-2 mr-3" style={{ backgroundColor: "#00000030", color: "#00000050", borderRadius: "5px", }}>
                                            {value}
                                            <button onClick={() => setSelected(current => current.filter((val, i) => {
                                                return i !== index
                                            }))} className="btn btn-sm" style={{ color: "#00000030" }}><Close /></button>
                                        </div>)
                                }
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

export default WorkShift