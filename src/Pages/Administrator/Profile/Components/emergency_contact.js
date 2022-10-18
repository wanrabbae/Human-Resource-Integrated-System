import { useState } from "react";
import { Button, Modal,Table } from "react-bootstrap";
import Select from 'react-select';
import { Trash, PencilSimple, Plus } from "phosphor-react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { Add, AlignVerticalCenter, ArrowUpwardTwoTone, Delete, Filter, Filter1, FilterCenterFocus, FilterList, ImportExport, Search } from "@mui/icons-material";

function EmergencyContact() {
    const [modal, setModal] = useState(false);
    const [modalAdd, setModalAdd] = useState(false);
    return (
        <>
            <div >
            <div className="mb-4 d-flex justify-content-between">
                    <div className="row">
                        <h3 style={{fontSize:"20px",fontWeight:'600'}}>Emergency Contact</h3>
                        <span style={{fontSize:"10px",fontWeight:'400',color:"#737373"}}>List of Emergency contract  </span>
                    </div>
                    <button style={{borderRadius:'10px',color:"white",fontSize:"14px",fontWeight:'500'}} className="bg-[#0E5073] me-3 btn d-flex align-items-center align-middle" onClick={() => setModalAdd(true)} type=""><Plus className="me-2" size={20} weight="bold" />Add</button>
                </div>
                <hr style={{backgroundColor:'#CACACA'}} className="my-4"></hr>
                <div className="w-100">
                    <table className="table mt-4 table-borderless" style={{ color: "#737373" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#EBF7FF", fontSize:'14px',writingMode:'horizontal-tb' }}>
                                <th  className="align-middle " onClick={() => { }}>Name <ImportExport fontSize="2px" /></th>
                                <th  className="align-middle " onClick={() => { }}>Telephone <ImportExport fontSize="2px" /></th>
                                <th  className="align-middle " onClick={() => { }}>Mobile <ImportExport fontSize="2px" /></th>
                                <th  className="align-middle " onClick={() => { }}>Relationship <ImportExport fontSize="2px" /></th>
                                <th  className="align-middle pe-5" onClick={() => { }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{fontSize:'14px'}}>
                                <td className="align-middle">Kim Woo Bin</td>
                                <td className="align-middle">-</td>
                                <td className="align-middle">081234567809</td>
                                <td className="align-middle">Wife</td>
                                <td className="align-middle">
                                    <div className="flex flex-row gap-2">
                                        <button
                                        className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                                        onClick={() => setModal(true)}
                                        >
                                            <PencilSimple color="#003049" className="h-5 w-5" weight="bold" aria-hidden="true" />
                                        </button>
                                        <button className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg">
                                            <Trash color="#003049" weight="bold" className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal show={modal} size="lg"  onHide={() => setModal(false)}>
                <Modal.Header  closeButton className="mx-4 mt-4"
                    style={{ borderBottomColor: "transparent", }}>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Edit Emergency Contact
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-4">
                    <div className="row mb-4">
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Name
                            </label>
                            <input value="Kim Woo Bin" className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="text" placeholder="Username"/>
                        </div>
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Relationship
                            </label>
                            <input value="Husband" className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="text"/>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Telephone
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="text" placeholder=""/>
                        </div>
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Mobile
                            </label>
                            <input value="081234567809" className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" placeholder="ex : 0812xxxxxxxx" id="username" type="text"/>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="m-4">
                    <Button
                        style={{
                            border:'none',
                            fontSize:'14px',
                            backgroundColor: "#ECECEC",
                            color: "#003049",
                        }}
                        className="px-3"
                        onClick={() => setModal(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        style={{
                            border:'none',
                            fontSize:'14px',
                            backgroundColor: "#0E5073",
                            color: "#FFFFFF",
                        }}
                        className="px-3"
                    >
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={modalAdd} size="lg"  onHide={() => setModalAdd(false)}>
                <Modal.Header  closeButton className="mx-4 mt-4"
                    style={{ borderBottomColor: "transparent", }}>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Add Emergency Contact
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-4">
                    <div className="row mb-4">
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Name
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="text" placeholder="Contact name..."/>
                        </div>
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Relationship
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="text"/>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Telephone
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="text" placeholder=""/>
                        </div>
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Mobile
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" placeholder="ex : 0812xxxxxxxx" id="username" type="text"/>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="m-4">
                    <Button
                        style={{
                            border:'none',
                            fontSize:'14px',
                            backgroundColor: "#ECECEC",
                            color: "#003049",
                        }}
                        className="px-3"
                        onClick={() => setModalAdd(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        style={{
                            border:'none',
                            fontSize:'14px',
                            backgroundColor: "#0E5073",
                            color: "#FFFFFF",
                        }}
                        className="px-3"
                    >
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default EmergencyContact;