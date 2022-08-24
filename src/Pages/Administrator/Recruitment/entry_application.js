import { useState,useEffect, } from 'react';
import { faArrowsUpDown, faArrowsUpDownLeftRight, faArrowsUpToLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Plus,Eye,FileText,DotsThreeOutline,Export ,MagnifyingGlass } from "phosphor-react";
import {Dropdown, Modal, Button} from 'react-bootstrap';
import { Add, AlignVerticalCenter, ArrowUpwardTwoTone, Delete, Filter, Filter1, FilterCenterFocus, FilterList, ImportExport, Search } from "@mui/icons-material";
import { GetApplicant } from '../../../Repository/RecruitmentRepository';

function  EntryApplication() {
    const [modal, setModal] = useState(false);
    const [applicant, setApplicant] = useState([]);
    const inAwait = async () => {
        var rec = await GetApplicant();
        setApplicant(rec);
        console.log(rec);
      }
    useEffect(() => {
        inAwait();
    }, []);
    return (
        <>
            <div className="bg-light p-4" style={{ borderRadius: "10px" }}>
                <div className="mb-5 d-flex justify-content-between">
                    <div className="row">
                        <h3 style={{fontSize:"20px",fontWeight:'600'}}>Entry Application</h3>
                        <span style={{fontSize:"10px",fontWeight:'400',color:"#737373"}}>List of  job applicant</span>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="d-flex">
                        <input style={{borderRadius:'10px',backgroundColor:'#F5F8FA',color:"#7E8299",fontSize:"14px",fontWeight:'500',width:'51%'}} className="appearance-none border-0 py-2 px-3 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="date"/>
                        <button style={{borderRadius:'10px',border:'1px solid #CACACA',color:"#003049",fontSize:"14px",fontWeight:'500'}} className="ms-3 btn d-flex align-items-center" onClick={() => { }} type=""><Export  className="me-2" size={15} weight="bold" />Export</button>
                    </div>
                    <div className="d-flex">
                        <div className="input-group me-3 align-items-center" style={{borderRadius:'10px',border:'1.5px solid #CACACA',backgroundColor:'transparent',color:"#0E5073",fontSize:"14px",fontWeight:'500'}}>
                            <div class="input-group-prepend">
                                <span class="transparent "><MagnifyingGlass size={20} className="mx-2 form-control-feedback" color="#CACACA" weight="bold" /></span>
                            </div>
                            <input style={{border:'0',outline:'none',backgroundColor:'transparent',color:"#0E5073",fontSize:"14px",fontWeight:'500'}} onChange={(val)=>{}} className="focus:ring-0 focus:ring-offset-0 focus:outline-0"  type="search" placeholder="Search..."/>
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    
                    <table className="table mt-3 table-borderless" style={{ color: "#737373" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#EBF7FF", fontSize:'14px',writingMode:'horizontal-tb' }}>
                                <th  className="align-middle px-3"  width="10px"><input type="checkbox" /></th>
                                <th  className="align-middle "  onClick={() => { }}>Position<ImportExport fontSize="2px" /></th>
                                <th  className="align-middle "  onClick={() => { }}>Sumber Lowongan <ImportExport fontSize="2px" /></th>
                                <th  className="align-middle "  onClick={() => { }}>Tanggal Melamar <ImportExport fontSize="2px" /></th>
                                <th  className="align-middle "  onClick={() => { }}>Nama Lengkap <ImportExport fontSize="2px" /></th>
                                <th  className="align-middle "  onClick={() => { }}>Nomor Telepon <ImportExport fontSize="2px" /></th>
                                <th  className="align-middle pe-5" onClick={() => { }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                applicant.length > 0 ?
                                    applicant.map((val) => {
                                    return (
                                        <tr style={{fontSize:'14px'}}>
                                            <td className="align-middle px-3"><input type="checkbox" /></td>
                                            <td className="align-middle">{val['source']}</td>
                                            <td className="align-middle">{val['source']}</td>
                                            <td className="align-middle">{val['date']}</td>
                                            <td className="align-middle">{val['name']}</td>
                                            <td className="align-middle">{val['phone']}</td>
                                            <td className="align-middle">
                                                <button className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg" onClick={() => setModal(true)}>
                                                    <Eye color="#003049" weight="bold" className="h-5 w-5" aria-hidden="true" />
                                                </button>  
                                            </td>
                                        </tr>
                                    )
                                }) :
                                <td >
                                    <div className='d-flex justify-content-center align-middle text-center' >No Data</div>
                                </td>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal show={modal} size="lg"  onHide={() => setModal(false)}>
                <Modal.Header  closeButton className="mx-4 mt-4"
                    style={{ borderBottomColor: "transparent", }}>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Detail Applicant
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="m-4">
                    <div className="mb-5 bg-[#F8F8F8] rounded-xl px-3 py-5" style={{color:'#737373'}}>
                        <h1 className='mb-3' style={{color:'#5C5C5C', fontWeight:'600'}}>Personal details</h1>
                        <div className='row gap-x-6 gap-y-1' style={{fontSize:'14px'}}>    
                            <div className='col' style={{fontSize:'14px'}}>
                                <div class="grid grid-cols-2 gap-x-4 gap-y-3">
                                    <div style={{fontWeight:'600'}}>Employee Name </div>
                                    <div style={{fontWeight:'500'}}>: David Kurniawan </div>
                                    <div style={{fontWeight:'600'}}>Sumber Lowongan  </div>
                                    <div style={{fontWeight:'500'}}>: Sponsor Instagram/Facebook </div>
                                    <div style={{fontWeight:'600'}}>Jenis Kelamin  </div>
                                    <div style={{fontWeight:'500'}}>: Laki-Laki  </div>
                                    <div style={{fontWeight:'600'}}>Usia  </div>
                                    <div style={{fontWeight:'500'}}>: 23 </div>
                                    {/* <div style={{fontWeight:'600'}}>Email  </div>
                                    <div style={{fontWeight:'500'}}>: davidkurniawan@gmail.com</div> */}
                                </div>
                            </div>
                            <div className='col' style={{fontSize:'14px'}}>
                                <div class="grid grid-cols-2 gap-3">
                                    <div style={{fontWeight:'600'}}>Position </div>
                                    <div style={{fontWeight:'500'}}>: IT Staff</div>
                                    <div style={{fontWeight:'600'}}>Tanggal Melamar  </div>
                                    <div style={{fontWeight:'500'}}>: 16/08/2022 </div>
                                    <div style={{fontWeight:'600'}}>Tanggal Lahir  </div>
                                    <div style={{fontWeight:'500'}}>: 16 September 1998 </div>
                                    <div style={{fontWeight:'600'}}>Nomor Telepon</div>
                                    <div style={{fontWeight:'500'}}>: 081223212345 </div>
                                </div>
                            </div>
                            
                            <div className='w-100'>
                                
                            </div>
                            <div className='col'>    
                                <table className=''>
                                    <tbody className='gap-y-4'>
                                        <tr>
                                            <td className='my-3 ' style={{fontWeight:'600',minWidth: '167px',height:'50px'}}>Email</td>
                                            <td className='my-3' style={{fontWeight:'500'}}>: davidkurniawan@gmail.com</td>
                                        </tr>
                                        <tr>
                                            <td   className='align-top py-1 '  style={{fontWeight:'600',minWidth: '167px',height:'50px'}}>Alamat KTP</td>
                                            <td  style={{fontWeight:'500'}}>: Jl Patimura timur gg. Melati No.2, Kecamatan Ambal, Kabupaten Kebument, Jawa Tengah , Indonesia </td>
                                        </tr>
                                        <tr>
                                            <td  className='align-top py-1 ' style={{fontWeight:'600',minWidth: '167px',height:'50px'}}>Alamat Domisili</td>
                                            <td  style={{fontWeight:'500'}}>: Jl Patimura timur gg. Melati No.2, Kecamatan Ambal, Kabupaten Kebument, Jawa Tengah , Indonesia </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <hr className='my-3 px-5' style={{backgroundColor:'#EAEAEA'}}></hr>
                            <div className='col' style={{fontSize:'14px'}}>
                                <div class="grid grid-cols-2 grid-rows-2 gap-2">
                                    <div style={{fontWeight:'600'}}>Nama Sekolah  </div>
                                    <div style={{fontWeight:'500'}}>: Universitas Gajah Mada </div>
                                    <div style={{fontWeight:'600'}}>Nilai Akhir/ IPK   </div>
                                    <div style={{fontWeight:'500'}}>: 3.51  </div>
                                </div>
                            </div>
                            <div className='col' style={{fontSize:'14px'}}>
                                <div class="grid grid-cols-2 grid-rows-2 gap-4">
                                    <div style={{fontWeight:'600'}}>Jurusan  </div>
                                    <div style={{fontWeight:'500'}}>: Teknik Fisika</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-2 bg-[#F8F8F8] rounded-xl px-3 py-5" style={{color:'#737373'}}>
                        <h1 className='mb-3' style={{color:'#5C5C5C', fontWeight:'600'}}>Experience details</h1>
                        <div className='row gap-x-6 gap-y-1' style={{fontSize:'14px'}}>
                            <div className='col'>    
                                <table className=''>
                                    <tbody className='gap-y-4'>
                                        <tr>
                                            <td className='my-3 ' style={{fontWeight:'600',minWidth: '167px',height:'50px'}}>Pengalaman Kerja</td>
                                            <td className='my-3' style={{fontWeight:'500'}}>: Data Scientist di PT Balai Lelang Serasi </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='w-100'>
                                
                            </div>
                            <div className='col-7' style={{fontSize:'14px'}}>
                                <div class="grid grid-cols-2 grid-rows-2 gap-2">
                                    <div className=''>
                                        <div style={{fontWeight:'600'}}>Berkas Requitment</div>
                                        <Button style={{background:'linear-gradient(90.2deg, #06B6D4 0.17%, #3B82F6 99.83%)'}} className='btn border-0 m-1 rounded text-white'> Download</Button>
                                    </div>
                                    <div className=''>
                                        <div style={{fontWeight:'600'}}>Surat Pengalaman</div>
                                        <Button style={{background:'linear-gradient(90.2deg, #06B6D4 0.17%, #3B82F6 99.83%)'}} className='btn border-0 m-1 rounded text-white'> Download</Button>
                                    </div>
                                    <div className=''>
                                        <div style={{fontWeight:'600'}}>Portofolio</div>
                                        <Button style={{background:'linear-gradient(90.2deg, #06B6D4 0.17%, #3B82F6 99.83%)'}} className='btn border-0 m-1 rounded text-white'> Download</Button>
                                    </div>
                                    <div className=''>
                                        <div style={{fontWeight:'600'}}>Sertifikat Vaksin</div>
                                        <Button style={{background:'linear-gradient(90.2deg, #06B6D4 0.17%, #3B82F6 99.83%)'}} className='btn border-0 m-1 rounded text-white'> Download</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default EntryApplication;