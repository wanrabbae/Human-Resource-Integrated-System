import { useState } from "react";
import { Plus,Eye,FileText,DotsThreeOutline,MagnifyingGlass,FunnelSimple,DotsThreeOutlineVertical ,ArrowRight } from "phosphor-react";
import { Button, Modal,Table } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ReactSelect from "react-select";
// import faker from 'faker';
import { components } from "react-select";
  
  


function DocumentManagement() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );
    const [modal, setModal] = useState(false);
    const options = {
        responsive: true,
        plugins: {
            legend:{
                display:false,
            }
        },
        scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
                grid: {
                  display: false,
                },
              },
            },
      };
      
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Okt','Nov','Des'];
      
    const data = {
        labels,
        datasets: [
          {
            label: 'Document',
            data:[80,30,90,100,80,90,110,40,20,90,100,60],
            backgroundColor: '#780000',
            borderRadius:'20px'
          },
        ],
      };
    const Option = (props) => {
        return (
          <div>
            <components.Option {...props}>
                <Form.Check 
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                    id="default-checkbox"
                    label={props.label}
                /> 
            </components.Option>
          </div>
        );
    };
    const showTo = [
        { value: "1", label: "Manager" },
        { value: "2", label: "Human Resources" },
        { value: "3", label: "Sales Acquisition" },
        { value: "4", label: "Sales External" },
        { value: "5", label: "Sales Research and Media Social" },
        { value: "6", label: "Advertiser" },
        { value: "7", label: "Finance" },
        { value: "8", label: "Support and Analyst" },
        { value: "9", label: "Information and Technology Development" },
      ];
      
    return(
        <>
            <div className="d-flex justify-content-between">
                <div className="row">
                    <h3 style={{fontSize:"20px",fontWeight:'600'}}>Document Management System</h3>
                    <span style={{fontSize:"10px",fontWeight:'400',color:"#737373"}}>list of document </span>
                </div>
                <div className="d-flex">
                    <div className="input-group me-3 align-items-center w-auto" style={{borderRadius:'10px',border:'1.5px solid #CACACA',backgroundColor:'transparent',color:"#0E5073",fontSize:"14px",fontWeight:'500'}}>
                            <div className="input-group-prepend">
                                <span className="transparent "><MagnifyingGlass size={20} className="mx-2 form-control-feedback" color="#CACACA" weight="bold" /></span>
                            </div>
                            <input style={{border:'0',outline:'none',backgroundColor:'transparent',color:"#0E5073",fontSize:"14px",fontWeight:'500'}} onChange={(val)=>{}} className="focus:ring-0 focus:ring-offset-0 focus:outline-0"  type="search" placeholder="Search Document..."/>
                        </div>
                    <button style={{borderRadius:'10px',backgroundColor:"#0E5073",fontSize:"14px",fontWeight:'500'}} className="btn d-flex align-items-center text-white" onClick={() => setModal(true)} type=""><Plus size={15} className="me-2" weight="bold" />Create Document</button>
                </div>
            </div>
            <div className="container-fluid mb-4">
                <div className="mt-5 py-2  row justify-content-around flex-wrap" style={{backgroundColor:'#F3F6FF',borderRadius:'10px'}}>
                    <div className="col-3" style={{borderRight:'1px solid #EDEDED'}}>
                        <div className="py-16 px-4 " style={{borderBottom:'1px solid #EDEDED'}}>
                            <h3 className="mb-1" style={{fontSize:"14px",opacity:'0.85',fontWeight:'600',color:'#C1121F',textTransform: 'uppercase'}}>Total respondent</h3>
                            <h3 style={{fontSize:"15px",fontWeight:'700',color:'#C1121F',textTransform: 'uppercase'}}>7,482</h3>
                        </div>
                        <div className="py-16 px-4" >
                            <h3 className="mb-1" style={{fontSize:"14px",opacity:'0.85',fontWeight:'600',color:'#C1121F',textTransform: 'uppercase'}}>Total document</h3>
                            <h3 style={{fontSize:"15px",fontWeight:'700',color:'#C1121F',textTransform: 'uppercase'}}>100</h3>
                        </div>
                    </div>
                    <div className="col-9 p-2 px-4 justify-content-center align-middle align-items-center align-center">
                        <Bar options={options} data={data} />
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="mt-5 p-4 row justify-content-around flex-wrap" style={{backgroundColor:'#F3F6FF',borderRadius:'10px'}}>
                    <div className="d-flex justify-content-between my-4">
                        <h3 style={{fontSize:"20px",fontWeight:'600'}}>Document</h3>
                        <button style={{borderRadius:'10px',border:'1.5px solid #CACACA',color:"#0E5073",fontSize:"14px",fontWeight:'500'}} className=" btn d-flex align-items-center" type=""><FunnelSimple  className="me-2" size={15} weight="bold" />Filter</button>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        <div className="px-3 py-4" style={{backgroundColor:'#669BBC',borderRadius:'10px',fontWeight:'600'}}>
                            <div>
                                <div className="d-flex justify-content-end mb-2 ">
                                    <a href="" className="ms-auto">
                                        <DotsThreeOutlineVertical size={20} weight="fill" color="white"/>
                                    </a>
                                </div>
                                <h3 className="mb-2" style={{fontSize:"20px",fontWeight:'600',color:'white'}}>Time Off</h3>
                                <p className="mb-2" style={{fontSize:"12px",fontWeight:'400',color:"white",lineHeight:'15px'}}>Provide a description of the time off here</p>
                                <h3 className="mb-2" style={{fontSize:"14px",fontWeight:'600',color:'#003049'}}>Show to 5 Role</h3>
                                <div className="d-flex justify-content-end mt-3 ">
                                    <a href="" className="ms-auto">
                                        <ArrowRight size={30} weight="bold" color="white"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 py-4" style={{backgroundColor:'#669BBC',borderRadius:'10px',fontWeight:'600'}}>
                            <div>
                                <div className="d-flex justify-content-end mb-2 ">
                                    <a href="" className="ms-auto">
                                        <DotsThreeOutlineVertical size={20} weight="fill" color="white"/>
                                    </a>
                                </div>
                                <h3 className="mb-2" style={{fontSize:"20px",fontWeight:'600',color:'white'}}>Permission</h3>
                                <p className="mb-2" style={{fontSize:"12px",fontWeight:'400',color:"white",lineHeight:'15px'}}>Provide a description of the permission here</p>
                                <h3 className="mb-2" style={{fontSize:"14px",fontWeight:'600',color:'#003049'}}>Show to 10 Role</h3>
                                <div className="d-flex justify-content-end mt-3 ">
                                    <a href="" className="ms-auto">
                                        <ArrowRight size={30} weight="bold" color="white"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 py-4" style={{backgroundColor:'#669BBC',borderRadius:'10px',fontWeight:'600'}}>
                            <div>
                                <div className="d-flex justify-content-end mb-2 ">
                                    <a href="" className="ms-auto">
                                        <DotsThreeOutlineVertical size={20} weight="fill" color="white"/>
                                    </a>
                                </div>
                                <h3 className="mb-2" style={{fontSize:"20px",fontWeight:'600',color:'white'}}>Time Off CS</h3>
                                <p className="mb-2" style={{fontSize:"12px",fontWeight:'400',color:"white",lineHeight:'15px'}}>Provide a description of the time off CS here</p>
                                <h3 className="mb-2" style={{fontSize:"14px",fontWeight:'600',color:'#003049'}}>Show to 3 Role</h3>
                                <div className="d-flex justify-content-end mt-3 ">
                                    <a href="" className="ms-auto">
                                        <ArrowRight size={30} weight="bold" color="white"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 py-4" style={{backgroundColor:'#669BBC',borderRadius:'10px',fontWeight:'600'}}>
                            <div>
                                <div className="d-flex justify-content-end mb-2 ">
                                    <a href="" className="ms-auto">
                                        <DotsThreeOutlineVertical size={20} weight="fill" color="white"/>
                                    </a>
                                </div>
                                <h3 className="mb-2" style={{fontSize:"20px",fontWeight:'600',color:'white'}}>Overtime</h3>
                                <p className="mb-2" style={{fontSize:"12px",fontWeight:'400',color:"white",lineHeight:'15px'}}>Provide a description of the overtime here</p>
                                <h3 className="mb-2" style={{fontSize:"14px",fontWeight:'600',color:'#003049'}}>Show to 15 Role</h3>
                                <div className="d-flex justify-content-end mt-3 ">
                                    <a href="" className="ms-auto">
                                        <ArrowRight size={30} weight="bold" color="white"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 py-4" style={{backgroundColor:'#669BBC',borderRadius:'10px',fontWeight:'600'}}>
                            <div>
                                <div className="d-flex justify-content-end mb-2 ">
                                    <a href="" className="ms-auto">
                                        <DotsThreeOutlineVertical size={20} weight="fill" color="white"/>
                                    </a>
                                </div>
                                <h3 className="mb-2" style={{fontSize:"20px",fontWeight:'600',color:'white'}}>Labor Demand</h3>
                                <p className="mb-2" style={{fontSize:"12px",fontWeight:'400',color:"white",lineHeight:'15px'}}>Provide a description of the Labor Demand here</p>
                                <h3 className="mb-2" style={{fontSize:"14px",fontWeight:'600',color:'#003049'}}>Show to 9 Role</h3>
                                <div className="d-flex justify-content-end mt-3 ">
                                    <a href="" className="ms-auto">
                                        <ArrowRight size={30} weight="bold" color="white"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 py-4" style={{backgroundColor:'#669BBC',borderRadius:'10px',fontWeight:'600'}}>
                            <div>
                                <div className="d-flex justify-content-end mb-2 ">
                                    <a href="" className="ms-auto">
                                        <DotsThreeOutlineVertical size={20} weight="fill" color="white"/>
                                    </a>
                                </div>
                                <h3 className="mb-2" style={{fontSize:"20px",fontWeight:'600',color:'white'}}>Employee Transfer</h3>
                                <p className="mb-2" style={{fontSize:"12px",fontWeight:'400',color:"white",lineHeight:'15px'}}>Provide a description of the Labor Demand here</p>
                                <h3 className="mb-2" style={{fontSize:"14px",fontWeight:'600',color:'#003049'}}>Show to 15 Role</h3>
                                <div className="d-flex justify-content-end mt-3 ">
                                    <a href="" className="ms-auto">
                                        <ArrowRight size={30} weight="bold" color="white"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={modal} size="lg"  onHide={() => setModal(false)}>
                <Modal.Header  closeButton className="mx-4 mt-4"
                    style={{ borderBottomColor: "transparent", }}>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Create Document Management System
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-4">
                    <div className="px-4 pb-4 mb-4 pt-2" style={{borderRadius:'10px',border:'0',borderLeft:'15px solid #780000',boxShadow:'0px 0px 3px 0px rgba(179,179,179,1)' }}>
                        <input style={{border:'0',outline:'none',borderBottom:'1px solid #EDEDED',backgroundColor:'transparent',fontSize:"20px",fontWeight:'500'}} onChange={(val)=>{}} className="focus:ring-0 focus:ring-offset-0 me-3 w-50 " type="text" placeholder="Document Title"/>
                        <input style={{border:'0',outline:'none',borderBottom:'1px solid #EDEDED',backgroundColor:'transparent',fontSize:"12px",fontWeight:'500'}} onChange={(val)=>{}} className="focus:ring-0 focus:ring-offset-0 me-3 form-control" type="text" placeholder="Document description"/>
                    </div>
                    <div className="row mb-4">
                        <div className="col-5">
                            <input onChange={(val)=>{}} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" type="text" placeholder="Field Name"/>
                        </div>
                        <div className="col-3">
                            <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                                <option className="py-3">Field Type</option>
                                <option className="py-3">Short Answer</option>
                                <option className="py-3">Paragraph</option>
                                <option className="py-3">Multiple Choice</option>
                                <option className="py-3">Check Box</option>
                                <option className="py-3">Dropdown</option>
                                <option className="py-3">Upload File</option>
                                <option className="py-3">Date</option>
                                <option className="py-3">Time</option>
                            </select>
                        </div>
                        <div className="col-3">
                            <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                                <option className="py-3">Data Type</option>
                                <option className="py-3">String</option>
                                <option className="py-3">Interger</option>
                                <option className="py-3">File</option>
                            </select>
                        </div>
                        <div className="col">
                            <button type="submit" className="rounded leading-tight p-2 btn bg-[#669BBC]"><Plus size={18} weight="bold" color="white" /></button>
                        </div>
                    </div>
                        <div className=''>
                            <label className="block text-gray-700 text-sm mb-2" for="username">
                            Show To
                            </label>
                                <ReactSelect
                                options={showTo}
                                isMulti
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                components={{
                                    Option
                                }}
                                />
                        </div>
                </Modal.Body>
                <Modal.Footer className="m-4" style={{borderTop:'0'}}>
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
export default DocumentManagement;