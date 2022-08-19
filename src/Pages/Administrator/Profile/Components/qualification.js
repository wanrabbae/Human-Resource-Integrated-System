import { useState } from "react";
import { Button, Modal,Table } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { Trash, PencilSimple,Plus } from "phosphor-react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { Add, AlignVerticalCenter, ArrowUpwardTwoTone, Delete, Filter, Filter1, FilterCenterFocus, FilterList, ImportExport, Search } from "@mui/icons-material";

function Qualification() {
    const [modalAddWExperience, setModalAddWExperience] = useState(false);
    return(
        <>
            <div>
                <div className="mb-3 d-flex justify-content-between">
                    <div className="row">
                        <h3 style={{fontSize:"20px",fontWeight:'600'}}>Qualifications</h3>
                        <span style={{fontSize:"10px",fontWeight:'400',color:"#737373"}}>List of  record employee qualifications</span>
                    </div>
                </div>
                <hr style={{backgroundColor:'#CACACA'}} className="mb-3"></hr>
                <div className="p-3 mb-5 rounded-2xl" style={{boxShadow:'0px 0px 3px rgba(0, 0, 0, 0.25)'}}>
                    <div className="mt-4 mb-3 d-flex justify-content-between">
                        <div className="row">
                            <h3 style={{fontSize:"20px",fontWeight:'600'}}>Work Experience</h3>
                            <span style={{fontSize:"10px",fontWeight:'400',color:"#737373"}}>List of work experience</span>
                        </div>
                        <button style={{borderRadius:'10px',color:"white",fontSize:"14px",fontWeight:'500'}} className="bg-[#0E5073] btn d-flex align-items-center align-middle" onClick={() => setModalAddWExperience(true)} type=""><Plus className="me-2" size={20} weight="bold" />Add</button>
                    </div>
                    <hr style={{backgroundColor:'#CACACA'}} className=""></hr>
                    <div className="w-100">
                        <table className="table mt-4 table-borderless" style={{ color: "#737373" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#EBF7FF", fontSize:'14px',writingMode:'horizontal-tb' }}>
                                    <th  className="align-middle " onClick={() => { }}>Company<ImportExport fontSize="2px" /></th>
                                    <th  className="align-middle " onClick={() => { }}>Job Title<ImportExport fontSize="2px" /></th>
                                    <th  className="align-middle " onClick={() => { }}>Start Date<ImportExport fontSize="2px" /></th>
                                    <th  className="align-middle " onClick={() => { }}>End Date <ImportExport fontSize="2px" /></th>
                                    <th  className="align-middle " onClick={() => { }}>Comment <ImportExport fontSize="2px" /></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{fontSize:'14px'}}>
                                    <td className="align-middle">Haruka</td>
                                    <td className="align-middle">IT Staff</td>
                                    <td className="align-middle">20/01/2021</td>
                                    <td className="align-middle">20/01/2021</td>
                                    <td className="align-middle">Lorem Ipsum dolor </td>
                                </tr>
                                <tr style={{fontSize:'14px'}}>
                                    <td className="align-middle">Haruka</td>
                                    <td className="align-middle">IT Staff</td>
                                    <td className="align-middle">20/01/2021</td>
                                    <td className="align-middle">20/01/2021</td>
                                    <td className="align-middle">Lorem Ipsum dolor </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="p-3 mb-5 rounded-2xl" style={{boxShadow:'0px 0px 3px rgba(0, 0, 0, 0.25)'}}>
                    <div className="mt-4 mb-3 d-flex justify-content-between">
                        <div className="row">
                            <h3 style={{fontSize:"20px",fontWeight:'600'}}>Skills</h3>
                            <span style={{fontSize:"10px",fontWeight:'400',color:"#737373"}}>List of  employee skills</span>
                        </div>
                        <button style={{borderRadius:'10px',color:"white",fontSize:"14px",fontWeight:'500'}} className="bg-[#0E5073] btn d-flex align-items-center align-middle" onClick={{}} type=""><Plus className="me-2" size={20} weight="bold" />Add</button>
                    </div>
                    <hr style={{backgroundColor:'#CACACA'}} className=""></hr>
                    <div className="w-100">
                        <table className="table mt-4 table-borderless" style={{ color: "#737373" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#EBF7FF", fontSize:'14px',writingMode:'horizontal-tb' }}>
                                    <th  className="align-middle " onClick={() => { }}>Skills <ImportExport fontSize="2px" /></th>
                                    <th  className="align-middle " onClick={() => { }}>Year of Experience <ImportExport fontSize="2px" /></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{fontSize:'14px'}}>
                                    <td className="align-middle">Graphic Designer</td>
                                    <td className="align-middle">3 Years</td>
                                </tr>
                                <tr style={{fontSize:'14px'}}>
                                    <td className="align-middle">GamaTech</td>
                                    <td className="align-middle">3 Years</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="p-3 mb-5 rounded-2xl" style={{boxShadow:'0px 0px 3px rgba(0, 0, 0, 0.25)'}}>
                    <div className="mt-4 mb-3 d-flex justify-content-between">
                        <div className="row">
                            <h3 style={{fontSize:"20px",fontWeight:'600'}}>Educations</h3>
                            <span style={{fontSize:"10px",fontWeight:'400',color:"#737373"}}>List of  employee educations</span>
                        </div>
                        <button style={{borderRadius:'10px',color:"white",fontSize:"14px",fontWeight:'500'}} className="bg-[#0E5073] btn d-flex align-items-center align-middle" onClick={{}} type=""><Plus className="me-2" size={20} weight="bold" />Add</button>
                    </div>
                    <hr style={{backgroundColor:'#CACACA'}} className=""></hr>
                    <div className="w-100">
                        <table className="table mt-4 table-borderless" style={{ color: "#737373" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#EBF7FF", fontSize:'14px',writingMode:'horizontal-tb' }}>
                                    <th  className="align-middle " onClick={() => { }}>Level <ImportExport fontSize="2px" /></th>
                                    <th  className="align-middle " onClick={() => { }}>Year <ImportExport fontSize="2px" /></th>
                                    <th  className="align-middle " onClick={() => { }}>GAP/Score <ImportExport fontSize="2px" /></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{fontSize:'14px'}}>
                                    <td className="align-middle">Bachelor's Degree</td>
                                    <td className="align-middle">2022</td>
                                    <td className="align-middle">3.90</td>
                                </tr>
                                <tr style={{fontSize:'14px'}}>
                                    <td className="align-middle">High School</td>
                                    <td className="align-middle">2018</td>
                                    <td className="align-middle">3.90</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="p-3 mb-5 rounded-2xl" style={{boxShadow:'0px 0px 3px rgba(0, 0, 0, 0.25)'}}>
                    <div className="mt-4 mb-3 d-flex justify-content-between">
                        <div className="row">
                            <h3 style={{fontSize:"20px",fontWeight:'600'}}>Languages</h3>
                            <span style={{fontSize:"10px",fontWeight:'400',color:"#737373"}}>List of  employee languages</span>
                        </div>
                        <button style={{borderRadius:'10px',color:"white",fontSize:"14px",fontWeight:'500'}} className="bg-[#0E5073] btn d-flex align-items-center align-middle" onClick={{}} type=""><Plus className="me-2" size={20} weight="bold" />Add</button>
                    </div>
                    <hr style={{backgroundColor:'#CACACA'}} className=""></hr>
                    <div className="w-100">
                        <table className="table mt-4 table-borderless" style={{ color: "#737373" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#EBF7FF", fontSize:'14px',writingMode:'horizontal-tb' }}>
                                    <th  className="align-middle " onClick={() => { }}>Language <ImportExport fontSize="2px" /></th>
                                    <th  className="align-middle " onClick={() => { }}>Fluency <ImportExport fontSize="2px" /></th>
                                    <th  className="align-middle " onClick={() => { }}>Compelency <ImportExport fontSize="2px" /></th>
                                    <th  className="align-middle " onClick={() => { }}>Comment <ImportExport fontSize="2px" /></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{fontSize:'14px'}}>
                                    <td className="align-middle">GamaTech</td>
                                    <td className="align-middle">IT Staff</td>
                                    <td className="align-middle">20/01/2021</td>
                                    <td className="align-middle">Lorem Ipsum dolor Set amet</td>
                                </tr>
                                <tr style={{fontSize:'14px'}}>
                                    <td className="align-middle">GamaTech</td>
                                    <td className="align-middle">IT Staff</td>
                                    <td className="align-middle">20/01/2021</td>
                                    <td className="align-middle">Lorem Ipsum dolor Set amet</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="p-3 mb-5 rounded-2xl" style={{boxShadow:'0px 0px 3px rgba(0, 0, 0, 0.25)'}}>
                    <div className="mt-4 mb-3 d-flex justify-content-between">
                        <div className="row">
                            <h3 style={{fontSize:"20px",fontWeight:'600'}}>License</h3>
                            <span style={{fontSize:"10px",fontWeight:'400',color:"#737373"}}>List of  employee educations</span>
                        </div>
                        <button style={{borderRadius:'10px',color:"white",fontSize:"14px",fontWeight:'500'}} className="bg-[#0E5073] btn d-flex align-items-center align-middle" onClick={{}} type=""><Plus className="me-2" size={20} weight="bold" />Add</button>
                    </div>
                    <hr style={{backgroundColor:'#CACACA'}} className=""></hr>
                    <div className="w-100">
                        <table className="table mt-4 table-borderless" style={{ color: "#737373" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#EBF7FF", fontSize:'14px',writingMode:'horizontal-tb' }}>
                                    <th  className="align-middle " onClick={() => { }}>License Type <ImportExport fontSize="2px" /></th>
                                    <th  className="align-middle " onClick={() => { }}>Issued Date <ImportExport fontSize="2px" /></th>
                                    <th  className="align-middle " onClick={() => { }}>ExpiryDate <ImportExport fontSize="2px" /></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{fontSize:'14px'}}>
                                    <td className="align-middle">GamaTech</td>
                                    <td className="align-middle">20/01/2021</td>
                                    <td className="align-middle">20/01/2021</td>
                                </tr>
                                <tr style={{fontSize:'14px'}}>
                                    <td className="align-middle">GamaTech</td>
                                    <td className="align-middle">20/01/2021</td>
                                    <td className="align-middle">20/01/2021</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Modal show={modalAddWExperience} size="lg"  onHide={() => setModalAddWExperience(false)}>
                <Modal.Header  closeButton className="mx-4 mt-4"
                    style={{ borderBottomColor: "transparent", }}>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Add Work Experience
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-4">
                    <div className="mb-4">
                        <div className='mb-4'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Comany Name <span style={{color:"#780000"}}>*</span>
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="text" placeholder="Username"/>
                        </div>
                        <div className='mb-4'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Job Title<span style={{color:"#780000"}}>*</span>
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="text" placeholder="Username"/>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Start Date <span style={{color:"#780000"}}>*</span>
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="date" placeholder="Username"/>
                        </div>
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Start Date <span style={{color:"#780000"}}>*</span>
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="date" placeholder="Username"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Comment
                            </label>
                            <textarea rows="4" className=" appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"></textarea>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="m-4" style={{ borderTopColor: "transparent", }}>
                    <Button
                        style={{
                            border:'none',
                            fontSize:'14px',
                            backgroundColor: "#ECECEC",
                            color: "#003049",
                        }}
                        className="px-3"
                        onClick={() => setModalAddWExperience(false)}
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
                        className="px-4"
                    >
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default Qualification;