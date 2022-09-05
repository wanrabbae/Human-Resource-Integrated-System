import { useState } from "react";
import { Button, Modal,Table } from "react-bootstrap";
import Select from 'react-select';

function Job() {
    const [modal, setModal] = useState(false);
    const [ContractDetail, setContractDetail] = useState(false);
    return (
        <>
            <div >
                <div  className="mb-4">
                    <span style={{fontWeight:'600'}}>Job Details</span>
                </div>
                <form>    
                    <div className="row mb-4">
                        <div className='col-5'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Joined Date
                            </label>
                            <input disabled className=" appearance-none border rounded w-full py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="text" placeholder="2014-01-01"/>
                        </div>
                        <div className='col-5'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Job Title
                            </label>
                            <Select  
                                isFocused="appearance-none border-0 outline-0"
                                className="appearance-none"
                                classNamePrefix="appearance-none active:outline-0 active:border-0 focus:outline-0 focus:border-0 focus:shadow-outline"
                            />
                            {/* <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                                <option className="py-3">Select</option>
                            </select> */}
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className='col-5'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Job Category
                            </label>
                            <Select  
                                isFocused="appearance-none border-0 outline-0"
                                className="appearance-none"
                                classNamePrefix="appearance-none active:outline-0 active:border-0 focus:outline-0 focus:border-0 focus:shadow-outline"
                            />
                            {/* <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                                <option className="py-3">Select</option>
                            </select> */}
                        </div>
                        <div className='col-5'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Sub Unit
                            </label>
                            <Select  
                                isFocused="appearance-none border-0 outline-0"
                                className="appearance-none"
                                classNamePrefix="appearance-none active:outline-0 active:border-0 focus:outline-0 focus:border-0 focus:shadow-outline"
                            />
                            {/* <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                                <option className="py-3">Select</option>
                            </select> */}
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className='col-5'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Location
                            </label>
                            <Select  
                                isFocused="appearance-none border-0 outline-0"
                                className="appearance-none"
                                classNamePrefix="appearance-none active:outline-0 active:border-0 focus:outline-0 focus:border-0 focus:shadow-outline"
                            />
                            {/* <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                                <option className="py-3">Select</option>
                            </select> */}
                        </div>
                    </div>
                    <hr style={{backgroundColor:'#CACACA'}} className="mb-4"></hr>
                    <div className="d-flex justify-content-between my-4 align-middle">
                        <div className="align-middle align-items-center align-center">    
                            <label for="checked-toggle" className="inline-flex relative items-center cursor-pointer">
                                <input type="checkbox" value="" id="checked-toggle" onClick={() => setContractDetail(s => !s)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-0 dark:peer-focus:ring-0 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#669BBC]"></div>
                                <span className="ml-3 " style={{fontSize:'15px',color:'#737373'}}>Include Employment Contract Details</span>
                            </label>
                        </div>
                        <Button
                            style={{
                                border:'1px solid #CACACA',
                                fontSize:'14px',
                                backgroundColor: "#FFFFFF",
                                color: "#003049",
                                fontWeight:'500'
                            }}
                            className=""
                            onClick={() => setModal(true)}
                        >
                            Terminate Employement
                        </Button>
                    </div>
                    { ContractDetail
                    ? <div onHide={() => setContractDetail(false)}>
                        <div className="row mb-4">
                            <div className='col-4'>
                                <label className="block text-gray-700 text-sm mb-2" for="username">
                                Contract Start Date
                                </label>
                                <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="date"/>
                            </div>
                            <div className='col-4'>
                                <label className="block text-gray-700 text-sm mb-2" for="username">
                                Contract End Date
                                </label>
                                <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="date"/>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className='col-8'>
                                <label className="block text-gray-700 text-sm mb-2" for="username">
                                Contract Details
                                </label>
                                <input className="block text-sm w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>
                            </div>
                        </div>
                    </div>
                    :
                    <div></div>
                    }
                    {/* <div>
                    {!hidden ? <p>You can see me!</p> : null}
                    <button onClick={() => setHidden(s => !s)}>
                        react show hide component
                    </button>
                    </div> */}
                    <div className="d-flex justify-content-end mt-4">
                        <Button
                            style={{
                                border:'none',
                                fontSize:'14px',
                                backgroundColor: "#0E5073",
                                color: "#FFFFFF",
                            }}
                            className="px-4"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </div>
            <Modal show={modal} size="lg"  onHide={() => setModal(false)}>
                <Modal.Header  closeButton className="mx-4 mt-4"
                    style={{ borderBottomColor: "transparent", }}>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Terminate Employement
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-4">
                    <div className="row mb-4">
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Termination Date <span style={{color:"#780000"}}>*</span>
                            </label>
                            <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="date" />
                        </div>
                        <div className='col'>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Termination Reason <span style={{color:"#780000"}}>*</span>
                            </label>
                            <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                                <option className="py-3">Select</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-6">
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Note
                            </label>
                            <textarea rows="4" className=" appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"></textarea>
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
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default Job;