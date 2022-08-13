import { faArrowsUpDown, faArrowsUpDownLeftRight, faArrowsUpToLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Add, AlignVerticalCenter, ArrowUpwardTwoTone, Delete, Filter, Filter1, FilterCenterFocus, FilterList, ImportExport, Search } from "@mui/icons-material";
import { Box, Button, InputAdornment, OutlinedInput, TextField } from "@mui/material";

function  EntryApplication() {
    return (
        <>
            <div className="bg-light p-4" style={{ borderRadius: "10px" }}>
                <div className="d-flex justify-content-between">
                    <div className="row">
                        <h3 style={{fontSize:"20px",fontWeight:'600'}}>Entry Application</h3>
                        <span style={{fontSize:"10px",fontWeight:'400',color:"#737373"}}>List of  job applicant</span>
                    </div>
                    <div className="d-flex">
                    <input style={{borderRadius:'10px',border:'1.5px solid #CACACA',backgroundColor:'transparent',color:"#0E5073",fontSize:"14px",fontWeight:'500'}} onChange={(val)=>{}} className="me-3" type="search" placeholder=" Search Demand Letter"/>
                    </div>
                </div>
                <div className="table-responsive">
                    
                    <table className="table mt-5 table-borderless" style={{ color: "#737373" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#EBF7FF", fontSize:'14px',writingMode:'horizontal-tb' }}>
                                <th  className="align-middle px-3"  width="10px"><input type="checkbox" /></th>
                                <th  className="align-middle " style={{minWidth:'250px'}} onClick={() => { }}>Recruitment Title <ImportExport fontSize="2px" /></th>
                                <th  className="align-middle " style={{minWidth:'250px'}} onClick={() => { }}>Recruitment Description <ImportExport fontSize="2px" /></th>
                                <th  className="align-middle " style={{minWidth:'150px'}} onClick={() => { }}>Position <ImportExport fontSize="2px" /></th>
                                <th  className="align-middle " style={{minWidth:'150px'}} onClick={() => { }}>Placement <ImportExport fontSize="2px" /></th>
                                <th  className="align-middle " style={{minWidth:'250px'}} onClick={() => { }}>Job Description <ImportExport fontSize="2px" /></th>
                                <th  className="align-middle " style={{minWidth:'250px'}} onClick={() => { }}>Qualification <ImportExport fontSize="2px" /></th>
                                <th  className="align-middle " style={{minWidth:'150px'}} onClick={() => { }}>Publish Date <ImportExport fontSize="2px" /></th>
                                <th  className="align-middle " style={{minWidth:'150px'}} onClick={() => { }}>Remove Date <ImportExport fontSize="2px" /></th>
                                <th  className="align-middle pe-5" onClick={() => { }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{fontSize:'14px'}}>
                                <td className="align-middle px-3"><input type="checkbox" /></td>
                                <td className="align-middle">UI UX Designer Recruitment</td>
                                <td className="align-middle">We again open internship opportunities for students or fresh graduates who are interested and have a passion for exploring the world of tourism at DigiTiket as a tourism & event ticket management platform.</td>
                                <td className="align-middle">UI UX Designer</td>
                                <td className="align-middle">Cilacap</td>
                                <td className="align-middle">We again open internship opportunities for students or fresh graduates who are interested and have a passion for exploring the world of tourism at DigiTiket as a tourism & event ticket management platform.</td>
                                <td className="align-middle">We again open internship opportunities for students or fresh graduates who are interested and have a passion for exploring the world of tourism at DigiTiket as a tourism & event ticket management platform.</td>
                                <td className="align-middle">26/02/2022</td>
                                <td className="align-middle">26/02/2022</td>
                                <td className="align-middle"><button className="btn btn-primary btn-sm"><Delete fontSize="5px" /></button></td>
                            </tr>
                            <tr style={{fontSize:'14px'}}>
                                <td className="align-middle px-3"><input type="checkbox" /></td>
                                <td className="align-middle">UI UX Designer Recruitment</td>
                                <td className="align-middle">We again open internship opportunities for students or fresh graduates who are interested and have a passion for exploring the world of tourism at DigiTiket as a tourism & event ticket management platform.</td>
                                <td className="align-middle">UI UX Designer</td>
                                <td className="align-middle">Cilacap</td>
                                <td className="align-middle">We again open internship opportunities for students or fresh graduates who are interested and have a passion for exploring the world of tourism at DigiTiket as a tourism & event ticket management platform.</td>
                                <td className="align-middle">We again open internship opportunities for students or fresh graduates who are interested and have a passion for exploring the world of tourism at DigiTiket as a tourism & event ticket management platform.</td>
                                <td className="align-middle">26/02/2022</td>
                                <td className="align-middle">26/02/2022</td>
                                <td className="align-middle"><button className="btn btn-primary btn-sm"><Delete fontSize="5px" /></button></td>
                            </tr>
                            <tr style={{fontSize:'14px'}}>
                                <td className="align-middle px-3"><input type="checkbox" /></td>
                                <td className="align-middle">UI UX Designer Recruitment</td>
                                <td className="align-middle">We again open internship opportunities for students or fresh graduates who are interested and have a passion for exploring the world of tourism at DigiTiket as a tourism & event ticket management platform.</td>
                                <td className="align-middle">UI UX Designer</td>
                                <td className="align-middle">Cilacap</td>
                                <td className="align-middle">We again open internship opportunities for students or fresh graduates who are interested and have a passion for exploring the world of tourism at DigiTiket as a tourism & event ticket management platform.</td>
                                <td className="align-middle">We again open internship opportunities for students or fresh graduates who are interested and have a passion for exploring the world of tourism at DigiTiket as a tourism & event ticket management platform.</td>
                                <td className="align-middle">26/02/2022</td>
                                <td className="align-middle">26/02/2022</td>
                                <td className="align-middle"><button className="btn btn-primary btn-sm"><Delete fontSize="5px" /></button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default EntryApplication;