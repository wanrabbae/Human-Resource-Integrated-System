
import { useState } from "react";
import { Plus,Eye,FileText,DotsThreeOutline,MagnifyingGlass } from "phosphor-react";
import { Button, Modal,Table } from "react-bootstrap";

function Recruitment() {
    const [modal, setModal] = useState(false);

    return(
        <>
            <div className="d-flex justify-content-between">
                <div className="row">
                    <h3 style={{fontSize:"20px",fontWeight:'600'}}>Requirment</h3>
                    <span style={{fontSize:"10px",fontWeight:'400',color:"#737373"}}>list of recruitment form </span>
                </div>
                <div className="d-flex">
                    <div className="input-group me-3 align-items-center w-auto" style={{borderRadius:'10px',border:'1.5px solid #CACACA',backgroundColor:'transparent',color:"#0E5073",fontSize:"14px",fontWeight:'500'}}>
                            <div class="input-group-prepend">
                                <span class="transparent "><MagnifyingGlass size={20} className="mx-2 form-control-feedback" color="#CACACA" weight="bold" /></span>
                            </div>
                            <input style={{border:'0',outline:'none',backgroundColor:'transparent',color:"#0E5073",fontSize:"14px",fontWeight:'500'}} onChange={(val)=>{}} className="focus:ring-0 focus:ring-offset-0 focus:outline-0"  type="search" placeholder=" Search Demand Letter"/>
                        </div>
                    <button style={{borderRadius:'10px',border:'1.5px solid #CACACA',color:"#0E5073",fontSize:"14px",fontWeight:'500'}} className="me-3 btn d-flex align-items-center" onClick={() => { window.location.href='/admin/recruitment/entry-application' }} type=""><Eye className="me-2" size={15} weight="bold" />Entry Application</button>
                    <button style={{borderRadius:'10px',backgroundColor:"#0E5073",fontSize:"14px",fontWeight:'500'}} className="btn d-flex align-items-center text-white" onClick={() => setModal(true)} type=""><Plus size={15} className="me-2" weight="bold" />Create Recruitment</button>
                </div>
            </div>
            <div className="container-fluid">
                <div className="mt-5 p-4 row justify-content-around flex-wrap" style={{backgroundColor:'#F3F6FF',borderRadius:'10px'}}>
                    <div className="p-3 me-3 mb-4 col d-flex align-items-center" style={{boxShadow:'0px 0px 3px 0px rgba(179,179,179,1)',backgroundColor:'white',color:'#003049',borderRadius:'10px'}}>
                        <FileText className="me-3" size={35} weight="fill" />
                        <div className="row">
                            <h2 style={{fontWeight:'600'}}>UI UX Designer</h2>
                            <span style={{fontSize:'10px',color:'#A8A8A8',fontWeight:'400'}}>Create on 11 July 2022</span>
                        </div>
                        <a href="" className="ms-auto">
                            <DotsThreeOutline size={20} weight="fill" />
                        </a>
                    </div>
                    <div className="p-3 me-3  mb-4 col d-flex align-items-center" style={{boxShadow:'0px 0px 3px 0px rgba(179,179,179,1)',backgroundColor:'white',color:'#003049',borderRadius:'10px'}}>
                        <FileText className="me-3" size={35} weight="fill" />
                        <div className="row">
                            <h2 style={{fontWeight:'600'}}>UI UX Designer</h2>
                            <span style={{fontSize:'10px',color:'#A8A8A8',fontWeight:'400'}}>Create on 11 July 2022</span>
                        </div>
                        <a href="" className="ms-auto">
                            <DotsThreeOutline size={20} weight="fill" />
                        </a>
                    </div>
                    <div className="p-3 col  mb-4 d-flex align-items-center" style={{boxShadow:'0px 0px 3px 0px rgba(179,179,179,1)',backgroundColor:'white',color:'#003049',borderRadius:'10px'}}>
                        <FileText className="me-3" size={35} weight="fill" />
                        <div className="row">
                            <h2 style={{fontWeight:'600'}}>UI UX Designer</h2>
                            <span style={{fontSize:'10px',color:'#A8A8A8',fontWeight:'400'}}>Create on 11 July 2022</span>
                        </div>
                        <a href="" className="ms-auto">
                            <DotsThreeOutline size={20} weight="fill" />
                        </a>
                    </div>
                    <div className="w-100">
                    </div>
                    <div className="p-3 me-3 mb-4 col d-flex align-items-center" style={{boxShadow:'0px 0px 3px 0px rgba(179,179,179,1)',backgroundColor:'white',color:'#003049',borderRadius:'10px'}}>
                        <FileText className="me-3" size={35} weight="fill" />
                        <div className="row">
                            <h2 style={{fontWeight:'600'}}>UI UX Designer</h2>
                            <span style={{fontSize:'10px',color:'#A8A8A8',fontWeight:'400'}}>Create on 11 July 2022</span>
                        </div>
                        <a href="" className="ms-auto">
                            <DotsThreeOutline size={20} weight="fill" />
                        </a>
                    </div>
                    <div className="p-3 me-3  mb-4 col d-flex align-items-center" style={{boxShadow:'0px 0px 3px 0px rgba(179,179,179,1)',backgroundColor:'white',color:'#003049',borderRadius:'10px'}}>
                        <FileText className="me-3" size={35} weight="fill" />
                        <div className="row">
                            <h2 style={{fontWeight:'600'}}>UI UX Designer</h2>
                            <span style={{fontSize:'10px',color:'#A8A8A8',fontWeight:'400'}}>Create on 11 July 2022</span>
                        </div>
                        <a href="" className="ms-auto">
                            <DotsThreeOutline size={20} weight="fill" />
                        </a>
                    </div>
                    <div className="p-3 col  mb-4 d-flex align-items-center" style={{boxShadow:'0px 0px 3px 0px rgba(179,179,179,1)',backgroundColor:'white',color:'#003049',borderRadius:'10px'}}>
                        <FileText className="me-3" size={35} weight="fill" />
                        <div className="row">
                            <h2 style={{fontWeight:'600'}}>UI UX Designer</h2>
                            <span style={{fontSize:'10px',color:'#A8A8A8',fontWeight:'400'}}>Create on 11 July 2022</span>
                        </div>
                        <a href="" className="ms-auto">
                            <DotsThreeOutline size={20} weight="fill" />
                        </a>
                    </div>
                    <div className="w-100">
                    </div>
                    <div className="p-3 me-3 col d-flex align-items-center" style={{boxShadow:'0px 0px 3px 0px rgba(179,179,179,1)',backgroundColor:'white',color:'#003049',borderRadius:'10px'}}>
                        <FileText className="me-3" size={35} weight="fill" />
                        <div className="row">
                            <h2 style={{fontWeight:'600'}}>UI UX Designer</h2>
                            <span style={{fontSize:'10px',color:'#A8A8A8',fontWeight:'400'}}>Create on 11 July 2022</span>
                        </div>
                        <a href="" className="ms-auto">
                            <DotsThreeOutline size={20} weight="fill" />
                        </a>
                    </div>
                    <div className="p-3 me-3  col d-flex align-items-center" style={{boxShadow:'0px 0px 3px 0px rgba(179,179,179,1)',backgroundColor:'white',color:'#003049',borderRadius:'10px'}}>
                        <FileText className="me-3" size={35} weight="fill" />
                        <div className="row">
                            <h2 style={{fontWeight:'600'}}>UI UX Designer</h2>
                            <span style={{fontSize:'10px',color:'#A8A8A8',fontWeight:'400'}}>Create on 11 July 2022</span>
                        </div>
                        <a href="" className="ms-auto">
                            <DotsThreeOutline size={20} weight="fill" />
                        </a>
                    </div>
                    <div className="p-3 col  d-flex align-items-center" style={{boxShadow:'0px 0px 3px 0px rgba(179,179,179,1)',backgroundColor:'white',color:'#003049',borderRadius:'10px'}}>
                        <FileText className="me-3" size={35} weight="fill" />
                        <div className="row">
                            <h2 style={{fontWeight:'600'}}>UI UX Designer</h2>
                            <span style={{fontSize:'10px',color:'#A8A8A8',fontWeight:'400'}}>Create on 11 July 2022</span>
                        </div>
                        <a href="" className="ms-auto">
                            <DotsThreeOutline size={20} weight="fill" />
                        </a>
                    </div>
                </div>
            </div>
            <Modal show={modal} size="lg"  onHide={() => setModal(false)}>
                <Modal.Header  closeButton className="mx-4 mt-4"
                    style={{ borderBottomColor: "transparent", }}>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Create Recruitment
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-4">
                    <div className="px-4 pb-4 mb-4 pt-2" style={{borderRadius:'10px',border:'0',borderLeft:'15px solid #780000',boxShadow:'0px 0px 3px 0px rgba(179,179,179,1)' }}>
                        <input style={{border:'0',outline:'none',borderBottom:'1px solid #EDEDED',backgroundColor:'transparent',fontSize:"20px",fontWeight:'500'}} onChange={(val)=>{}} className="focus:ring-0 focus:ring-offset-0 me-3 w-50 " type="text" placeholder="Recruitment Title Title"/>
                        <input style={{border:'0',outline:'none',borderBottom:'1px solid #EDEDED',backgroundColor:'transparent',fontSize:"12px",fontWeight:'500'}} onChange={(val)=>{}} className="focus:ring-0 focus:ring-offset-0 me-3 form-control" type="text" placeholder="Recruitment description"/>
                    </div>
                    <input style={{borderRadius:'10px',border:'1.5px solid #EDEDED',backgroundColor:'transparent',fontSize:"12px",fontWeight:'500'}} onChange={(val)=>{}} className="mb-3 focus:ring-0 focus:ring-offset-0 me-3 form-control" type="text" placeholder="Position"/>
                    <input style={{borderRadius:'10px',border:'1.5px solid #EDEDED',backgroundColor:'transparent',fontSize:"12px",fontWeight:'500'}} onChange={(val)=>{}} className="mb-3 focus:ring-0 focus:ring-offset-0 me-3 form-control" type="text" placeholder="Placement"/>
                    <textarea style={{borderRadius:'10px',border:'1.5px solid #EDEDED',backgroundColor:'transparent',fontSize:"12px",fontWeight:'500'}} className="mb-3 focus:ring-0 focus:ring-offset-0 me-3 form-control" rows="8" placeholder="Job Description"></textarea>
                    <textarea style={{borderRadius:'10px',border:'1.5px solid #EDEDED',backgroundColor:'transparent',fontSize:"12px",fontWeight:'500'}} className="mb-3 focus:ring-0 focus:ring-offset-0 me-3 form-control" rows="8" placeholder="Qualification"></textarea>
                    <div className="d-flex">
                        <input style={{borderRadius:'10px',border:'1.5px solid #EDEDED',backgroundColor:'transparent',fontSize:"12px",fontWeight:'500'}} onChange={(val)=>{}} className="focus:ring-0 focus:ring-offset-0 me-3 form-control" type="date" placeholder="Recruitment description"/>
                        <input style={{borderRadius:'10px',border:'1.5px solid #EDEDED',backgroundColor:'transparent',fontSize:"12px",fontWeight:'500'}} onChange={(val)=>{}} className="focus:ring-0 focus:ring-offset-0 me-3 form-control" type="date" placeholder="Recruitment description"/>
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
export default Recruitment;