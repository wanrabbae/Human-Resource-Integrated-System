import * as React from 'react';
import { faArrowsUpDown, faArrowsUpDownLeftRight, faArrowsUpToLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Plus,Eye,FileText,DotsThreeOutline,MagnifyingGlass } from "phosphor-react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
                        <div className="input-group me-3 align-items-center" style={{borderRadius:'10px',border:'1.5px solid #CACACA',backgroundColor:'transparent',color:"#0E5073",fontSize:"14px",fontWeight:'500'}}>
                            <div class="input-group-prepend">
                                <span class="transparent "><MagnifyingGlass size={20} className="mx-2 form-control-feedback" color="#CACACA" weight="bold" /></span>
                            </div>
                            <input style={{border:'0',outline:'none',backgroundColor:'transparent',color:"#0E5073",fontSize:"14px",fontWeight:'500'}} onChange={(val)=>{}} className="focus:ring-0 focus:ring-offset-0 focus:outline-0"  type="search" placeholder=" Search Demand Letter"/>
                        </div>
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
                                <td className="align-middle" style={{ lineHeight:'30px',display:'-webkit-box',WebkitLineClamp:'1',WebkitBoxOrient:'vertical',overflow:'hidden',textOverflow:'ellipsis' }}>We again open internship opportunities for students or fresh graduates who are interested and have a passion for exploring the world of tourism at DigiTiket as a tourism & event ticket management platform.</td>
                                <td className="align-middle">UI UX Designer</td>
                                <td className="align-middle">Cilacap</td>
                                <div style={{ display:'table-cell' }}>
                                    <td className="align-middle" style={{ lineHeight:'30px',display:'-webkit-box',WebkitLineClamp:'1',WebkitBoxOrient:'vertical',overflow:'hidden',textOverflow:'ellipsis' }}>We again open internship opportunities for students or fresh graduates who are interested and have a passion for exploring the world of tourism at DigiTiket as a tourism & event ticket management platform.</td>
                                </div>
                                    <td className="align-middle" style={{ lineHeight:'30px',display:'-webkit-box',WebkitLineClamp:'1',WebkitBoxOrient:'vertical',overflow:'hidden',textOverflow:'ellipsis' }}>We again open internship opportunities for students or fresh graduates who are interested and have a passion for exploring the world of tourism at DigiTiket as a tourism & event ticket management platform.</td>
                                <td className="align-middle">26/02/2022</td>
                                <td className="align-middle">26/02/2022</td>
                                <td className="align-middle">
                                    <DropdownButton variant='light ' className='focus:ring-0 focus:ring-offset-0' id="actionbtn dropdown-item-button" title="Action" style={{ color:'#003049',backgroundColor:'transparent',borderRadius:'5px',border:'1px solid #CACACA' }}>
                                        <Dropdown.Item  as="button">Approved</Dropdown.Item>
                                        <Dropdown.Item as="button">Rejected</Dropdown.Item>
                                        <Dropdown.Item as="button">Delete</Dropdown.Item>
                                    </DropdownButton>   
                                </td>
                            </tr>
                            <tr style={{fontSize:'14px'}}>
                                <td className="align-middle px-3"><input type="checkbox" /></td>
                                <td className="align-middle">Developer Recruitment</td>
                                <td className="align-middle" style={{ lineHeight:'30px',display:'-webkit-box',WebkitLineClamp:'1',WebkitBoxOrient:'vertical',overflow:'hidden',textOverflow:'ellipsis' }}>We again open internship opportunities for students or fresh graduates who are interested and have a passion for exploring the world of tourism at DigiTiket as a tourism & event ticket management platform.</td>
                                <td className="align-middle">Developer</td>
                                <td className="align-middle">Jakarta</td>
                                <div style={{ display:'table-cell' }}>
                                    <td className="align-middle" style={{ lineHeight:'30px',display:'-webkit-box',WebkitLineClamp:'1',WebkitBoxOrient:'vertical',overflow:'hidden',textOverflow:'ellipsis' }}>We again open internship opportunities for students or fresh graduates who are interested and have a passion for exploring the world of tourism at DigiTiket as a tourism & event ticket management platform.</td>
                                </div>
                                    <td className="align-middle" style={{ lineHeight:'30px',display:'-webkit-box',WebkitLineClamp:'1',WebkitBoxOrient:'vertical',overflow:'hidden',textOverflow:'ellipsis' }}>We again open internship opportunities for students or fresh graduates who are interested and have a passion for exploring the world of tourism at DigiTiket as a tourism & event ticket management platform.</td>
                                <td className="align-middle">26/02/2022</td>
                                <td className="align-middle">26/02/2022</td>
                                <td className="align-middle">
                                    <DropdownButton variant='light ' className='focus:ring-0 focus:ring-offset-0' id="actionbtn dropdown-item-button" title="Action" style={{ color:'#003049',backgroundColor:'transparent',borderRadius:'5px',border:'1px solid #CACACA' }}>
                                        <Dropdown.Item  as="button">Approved</Dropdown.Item>
                                        <Dropdown.Item as="button">Rejected</Dropdown.Item>
                                        <Dropdown.Item as="button">Delete</Dropdown.Item>
                                    </DropdownButton>    
                                </td>
                            </tr>
                            <tr style={{fontSize:'14px'}}>
                                <td className="align-middle px-3"><input type="checkbox" /></td>
                                <td className="align-middle">Sales Recruitment</td>
                                <td className="align-middle" style={{ lineHeight:'30px',display:'-webkit-box',WebkitLineClamp:'1',WebkitBoxOrient:'vertical',overflow:'hidden',textOverflow:'ellipsis' }}>We again open internship opportunities for students or fresh graduates who are interested and have a passion for exploring the world of tourism at DigiTiket as a tourism & event ticket management platform.</td>
                                <td className="align-middle">Sales & Marketing</td>
                                <td className="align-middle">Purwokerto</td>
                                <div style={{ display:'table-cell' }}>
                                    <td className="align-middle" style={{ lineHeight:'30px',display:'-webkit-box',WebkitLineClamp:'1',WebkitBoxOrient:'vertical',overflow:'hidden',textOverflow:'ellipsis' }}>We again open internship opportunities for students or fresh graduates who are interested and have a passion for exploring the world of tourism at DigiTiket as a tourism & event ticket management platform.</td>
                                </div>
                                    <td className="align-middle" style={{ lineHeight:'30px',display:'-webkit-box',WebkitLineClamp:'1',WebkitBoxOrient:'vertical',overflow:'hidden',textOverflow:'ellipsis' }}>We again open internship opportunities for students or fresh graduates who are interested and have a passion for exploring the world of tourism at DigiTiket as a tourism & event ticket management platform.</td>
                                <td className="align-middle">26/02/2022</td>
                                <td className="align-middle">26/02/2022</td>
                                <td className="align-middle">
                                    <DropdownButton variant='light ' className='focus:ring-0 focus:ring-offset-0' id="actionbtn dropdown-item-button" title="Action" style={{ color:'#003049',backgroundColor:'transparent',borderRadius:'5px',border:'1px solid #CACACA' }}>
                                        <Dropdown.Item  as="button">Approved</Dropdown.Item>
                                        <Dropdown.Item as="button">Rejected</Dropdown.Item>
                                        <Dropdown.Item as="button">Delete</Dropdown.Item>
                                    </DropdownButton>   
                                </td>
                            </tr>
                            <tr style={{fontSize:'14px'}}>
                                <td className="align-middle px-3"><input type="checkbox" /></td>
                                <td className="align-middle">Manager Recruitment</td>
                                <td className="align-middle" style={{ lineHeight:'30px',display:'-webkit-box',WebkitLineClamp:'1',WebkitBoxOrient:'vertical',overflow:'hidden',textOverflow:'ellipsis' }}>We again open internship opportunities for students or fresh graduates who are interested and have a passion for exploring the world of tourism at DigiTiket as a tourism & event ticket management platform.</td>
                                <td className="align-middle">Manager</td>
                                <td className="align-middle">Cilacap</td>
                                <div style={{ display:'table-cell' }}>
                                    <td className="align-middle" style={{ lineHeight:'30px',display:'-webkit-box',WebkitLineClamp:'1',WebkitBoxOrient:'vertical',overflow:'hidden',textOverflow:'ellipsis' }}>We again open internship opportunities for students or fresh graduates who are interested and have a passion for exploring the world of tourism at DigiTiket as a tourism & event ticket management platform.</td>
                                </div>
                                    <td className="align-middle" style={{ lineHeight:'30px',display:'-webkit-box',WebkitLineClamp:'1',WebkitBoxOrient:'vertical',overflow:'hidden',textOverflow:'ellipsis' }}>We again open internship opportunities for students or fresh graduates who are interested and have a passion for exploring the world of tourism at DigiTiket as a tourism & event ticket management platform.</td>
                                <td className="align-middle">26/02/2022</td>
                                <td className="align-middle">26/02/2022</td>
                                <td className="align-middle">
                                    <DropdownButton variant='light ' className='focus:ring-0 focus:ring-offset-0' id="actionbtn dropdown-item-button" title="Action" style={{ color:'#003049',backgroundColor:'transparent',borderRadius:'5px',border:'1px solid #CACACA' }}>
                                        <Dropdown.Item  as="button">Approved</Dropdown.Item>
                                        <Dropdown.Item as="button">Rejected</Dropdown.Item>
                                        <Dropdown.Item as="button">Delete</Dropdown.Item>
                                    </DropdownButton>   
                                </td>
                            </tr>
                            <tr style={{fontSize:'14px'}}>
                                <td className="align-middle px-3"><input type="checkbox" /></td>
                                <td className="align-middle">Support Recruitment</td>
                                <td className="align-middle" style={{ lineHeight:'30px',display:'-webkit-box',WebkitLineClamp:'1',WebkitBoxOrient:'vertical',overflow:'hidden',textOverflow:'ellipsis' }}>We again open internship opportunities for students or fresh graduates who are interested and have a passion for exploring the world of tourism at DigiTiket as a tourism & event ticket management platform.</td>
                                <td className="align-middle">Support</td>
                                <td className="align-middle">Purwokerto</td>
                                <div style={{ display:'table-cell' }}>
                                    <td className="align-middle" style={{ lineHeight:'30px',display:'-webkit-box',WebkitLineClamp:'1',WebkitBoxOrient:'vertical',overflow:'hidden',textOverflow:'ellipsis' }}>We again open internship opportunities for students or fresh graduates who are interested and have a passion for exploring the world of tourism at DigiTiket as a tourism & event ticket management platform.</td>
                                </div>
                                    <td className="align-middle" style={{ lineHeight:'30px',display:'-webkit-box',WebkitLineClamp:'1',WebkitBoxOrient:'vertical',overflow:'hidden',textOverflow:'ellipsis' }}>We again open internship opportunities for students or fresh graduates who are interested and have a passion for exploring the world of tourism at DigiTiket as a tourism & event ticket management platform.</td>
                                <td className="align-middle">26/02/2022</td>
                                <td className="align-middle">26/02/2022</td>
                                <td className="align-middle">
                                    <DropdownButton variant='light ' className='focus:ring-0 focus:ring-offset-0' id="actionbtn dropdown-item-button" title="Action" style={{ color:'#003049',backgroundColor:'transparent',borderRadius:'5px',border:'1px solid #CACACA' }}>
                                        <Dropdown.Item  as="button">Approved</Dropdown.Item>
                                        <Dropdown.Item as="button">Rejected</Dropdown.Item>
                                        <Dropdown.Item as="button">Delete</Dropdown.Item>
                                    </DropdownButton>   
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default EntryApplication;