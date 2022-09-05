import { useState } from "react";
import { Button, Modal,Table } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { Trash, PencilSimple,Plus } from "phosphor-react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { Add, AlignVerticalCenter, ArrowUpwardTwoTone, Delete, Filter, Filter1, FilterCenterFocus, FilterList, ImportExport, Search } from "@mui/icons-material";

function Qualification() {
    const [modalAddWExperience, setModalAddWExperience] = useState(false);
    const [modalAddSkill, setModalAddSkill] = useState(false);
    const [modalAddLanguage, setModalAddLanguage] = useState(false);
    const [modalAddEducation, setModalAddEducation] = useState(false);
    const [modalAddLisence, setModalAddLisence] = useState(false);
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
                                    <td className="align-middle">GamaTech</td>
                                    <td className="align-middle">IT Staff</td>
                                    <td className="align-middle">01/01/2014</td>
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
                        <button style={{borderRadius:'10px',color:"white",fontSize:"14px",fontWeight:'500'}} className="bg-[#0E5073] btn d-flex align-items-center align-middle" onClick={() => setModalAddSkill(true)}  type=""><Plus className="me-2" size={20} weight="bold" />Add</button>
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
                                    <td className="align-middle">6 Years</td>
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
                        <button style={{borderRadius:'10px',color:"white",fontSize:"14px",fontWeight:'500'}} className="bg-[#0E5073] btn d-flex align-items-center align-middle" onClick={() => setModalAddEducation(true)} type=""><Plus className="me-2" size={20} weight="bold" />Add</button>
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
                                    <td className="align-middle">magister</td>
                                    <td className="align-middle">2014</td>
                                    <td className="align-middle">3.90</td>
                                </tr>
                                <tr style={{fontSize:'14px'}}>
                                    <td className="align-middle">Bachelor's Degree</td>
                                    <td className="align-middle">2012</td>
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
                        <button style={{borderRadius:'10px',color:"white",fontSize:"14px",fontWeight:'500'}} className="bg-[#0E5073] btn d-flex align-items-center align-middle" onClick={() => setModalAddLanguage(true)}type=""><Plus className="me-2" size={20} weight="bold" />Add</button>
                    </div>
                    <hr style={{backgroundColor:'#CACACA'}} className=""></hr>
                    <div className="w-100">
                        <table className="table mt-4 table-borderless" style={{ color: "#737373" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#EBF7FF", fontSize:'14px',writingMode:'horizontal-tb' }}>
                                    <th  className="align-middle " onClick={() => { }}>Language <ImportExport fontSize="2px" /></th>
                                    <th  className="align-middle " onClick={() => { }}>Fluency <ImportExport fontSize="2px" /></th>
                                    <th  className="align-middle " onClick={() => { }}>Competency <ImportExport fontSize="2px" /></th>
                                    <th  className="align-middle " onClick={() => { }}>Comment <ImportExport fontSize="2px" /></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{fontSize:'14px'}}>
                                    <td className="align-middle">Indonesian</td>
                                    <td className="align-middle">Writing, Speaking, Reading</td>
                                    <td className="align-middle">Mother Tongue </td>
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
                        <button style={{borderRadius:'10px',color:"white",fontSize:"14px",fontWeight:'500'}} className="bg-[#0E5073] btn d-flex align-items-center align-middle" onClick={() => setModalAddLisence(true)} type=""><Plus className="me-2" size={20} weight="bold" />Add</button>
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
                                    <td className="align-middle">Graphic Designer</td>
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
                            End Date <span style={{color:"#780000"}}>*</span>
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
            <Modal show={modalAddSkill} size="lg"  onHide={() => setModalAddSkill(false)}>
                <Modal.Header  closeButton className="mx-4 mt-4"
                    style={{ borderBottomColor: "transparent", }}>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Add Skill
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-4">
                    <div className="mb-4">
                        <div className='mb-4'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Skill <span style={{color:"#780000"}}>*</span>
                            </label>
                            <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                                <option className="py-3">Select</option>
                            </select>
                        </div>
                        <div className='mb-4'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Year of Experience
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="text" placeholder="Year of Experience"/>
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
                        onClick={() => setModalAddSkill(false)}
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
            <Modal show={modalAddEducation} size="lg"  onHide={() => setModalAddEducation(false)}>
                <Modal.Header  closeButton className="mx-4 mt-4"
                    style={{ borderBottomColor: "transparent", }}>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Add Educations
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-4">
                    <div className="mb-4">
                        <div className='mb-4'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Level <span style={{color:"#780000"}}>*</span>
                            </label>
                            <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                                <option className="py-3">Select</option>
                            </select>
                        </div>
                        <div className='mb-4'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Institute
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="text" placeholder="Institute name..."/>
                        </div>
                        <div className='mb-4'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Major/Specialization
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="text" placeholder="Specialization in Education...."/>
                        </div>
                    </div>
                    <div className="row">
                        <div className='col mb-4'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Year <span style={{color:"#780000"}}>*</span>
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="text" placeholder="Type for hints..."/>
                        </div>
                        <div className='col mb-4'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            GAP <span style={{color:"#780000"}}>*</span>
                            </label>
                            <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                                <option className="py-3">Select</option>
                            </select>
                        </div>
                        <div className="w-100">

                        </div>
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Start Date <span style={{color:"#780000"}}>*</span>
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="date" placeholder="Username"/>
                        </div>
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            End Date <span style={{color:"#780000"}}>*</span>
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="date" placeholder="Username"/>
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
                        onClick={() => setModalAddEducation(false)}
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
            <Modal show={modalAddLanguage} size="lg"  onHide={() => setModalAddLanguage(false)}>
                <Modal.Header  closeButton className="mx-4 mt-4"
                    style={{ borderBottomColor: "transparent", }}>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Add Language
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-4">
                    <div className="mb-4">
                        <div className='mb-4'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Skill <span style={{color:"#780000"}}>*</span>
                            </label>
                            <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                                <option className="py-3">Select</option>
                            </select>
                        </div>
                        <div className='mb-4'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Fluency <span style={{color:"#780000"}}>*</span>
                            </label>
                            <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                                <option className="py-3">Select</option>
                                <option className="py-3">Writting</option>
                                <option className="py-3">Speaking</option>
                                <option className="py-3">Reading</option>
                            </select>
                        </div>
                        <div className='mb-4'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Competency <span style={{color:"#780000"}}>*</span>
                            </label>
                            <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                                <option className="py-3">Select</option>
                                <option className="py-3">Poor</option>
                                <option className="py-3">Basic</option>
                                <option className="py-3">Good</option>
                                <option className="py-3">Mother Tongue</option>
                            </select>
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
                        onClick={() => setModalAddLanguage(false)}
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
            <Modal show={modalAddLisence} size="lg"  onHide={() => setModalAddLisence(false)}>
                <Modal.Header  closeButton className="mx-4 mt-4"
                    style={{ borderBottomColor: "transparent", }}>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Add Lisence
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-4">
                    <div className="mb-4">
                        <div className='mb-4'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Lisency Type <span style={{color:"#780000"}}>*</span>
                            </label>
                            <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                                <option className="py-3">Select</option>
                            </select>
                        </div>
                        <div className='mb-4'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Lisency Number <span style={{color:"#780000"}}>*</span>
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="text" placeholder="Institute name..."/>
                        </div>
                    </div>
                    <div className="row">
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Start Date <span style={{color:"#780000"}}>*</span>
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="date" placeholder="Username"/>
                        </div>
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            End Date <span style={{color:"#780000"}}>*</span>
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="date" placeholder="Username"/>
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
                        onClick={() => setModalAddLisence(false)}
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