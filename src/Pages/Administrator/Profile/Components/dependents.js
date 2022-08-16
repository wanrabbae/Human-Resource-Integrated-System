import { useState } from "react";
import { Button, Modal,Table } from "react-bootstrap";
import Select from 'react-select';
import { Trash, PencilSimple } from "phosphor-react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { Add, AlignVerticalCenter, ArrowUpwardTwoTone, Delete, Filter, Filter1, FilterCenterFocus, FilterList, ImportExport, Search } from "@mui/icons-material";

function Dependents() {
    const [modal, setModal] = useState(false);
    return (
        <>
            <div >
                <div  className="mb-4">
                    <span style={{fontWeight:'600'}}>Dependents</span>
                </div>
                <form>    
                    <div className="row mb-4">
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Name <span style={{color:"#780000"}}>*</span>
                            </label>
                            <input value="Kim Woo Bin" className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="text" placeholder="Username"/>
                        </div>
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Relationship <span style={{color:"#780000"}}>*</span>
                            </label>
                            <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                                <option className="py-3">Select</option>
                                <option className="py-3">Child</option>
                                <option className="py-3">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className='col-6'>
                            <label className=" block text-gray-700 text-sm mb-2" for="username">
                            Birth of Date
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="date"/>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end mt-4">
                        <Button
                            style={{
                                border:'none',
                                fontSize:'14px',
                                backgroundColor: "#ECECEC",
                                color: "#003049",
                            }}
                            className="px-4"
                        >
                            Add
                        </Button>
                    </div>
                </form>
                <hr style={{backgroundColor:'#CACACA'}} className="my-4"></hr>
                <div className="w-100">
                    <table className="table mt-5 table-borderless" style={{ color: "#737373" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#EBF7FF", fontSize:'14px',writingMode:'horizontal-tb' }}>
                                <th  className="align-middle " onClick={() => { }}>Name <ImportExport fontSize="2px" /></th>
                                <th  className="align-middle " onClick={() => { }}>Relationship <ImportExport fontSize="2px" /></th>
                                <th  className="align-middle " onClick={() => { }}>Birth of Date<ImportExport fontSize="2px" /></th>
                                <th  className="align-middle pe-5" onClick={() => { }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{fontSize:'14px'}}>
                                <td className="align-middle">Kim Woo Bin</td>
                                <td className="align-middle">Child</td>
                                <td className="align-middle">12 - 12 - 2012</td>
                                <td className="align-middle">
                                    <div className="flex flex-row gap-2">
                                        <button className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg">
                                            <Trash color="#003049" weight="bold" className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                        <button
                                        className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                                        onClick={() => setModal(true)}
                                        >
                                            <PencilSimple color="#003049" className="h-5 w-5" weight="bold" aria-hidden="true" />
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
                            Name <span style={{color:"#780000"}}>*</span>
                            </label>
                            <input value="Kim Woo Bin" className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="text" placeholder="Username"/>
                        </div>
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Relationship <span style={{color:"#780000"}}>*</span>
                            </label>
                            <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                                <option className="py-3">Select</option>
                                <option className="py-3">Child</option>
                                <option className="py-3">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className='col-6'>
                            <label className=" block text-gray-700 text-sm mb-2" for="username">
                            Birth of Date
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="date"/>
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
        </>
    )
}
export default Dependents;