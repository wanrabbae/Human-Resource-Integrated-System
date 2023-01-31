import { ImportExport, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Tab,
    TextField,
  } from "@mui/material";
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { GetSubsidiaryDashboard } from '../../../../Repository/SubsidiaryRepository';
import AttendanceRecord from './subDetail/AttendanceRecord';
import JobManage from './subDetail/JobManage';
import OrganizationStructure from './subDetail/OrganizationStructure';

const SubsidiaryDetail = () => {
    
    const location = useLocation();
    const val = location.state;
    const [subsdash, setSubsi] = useState([])
    const [index, setIndex] = useState(1)
    const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const inAwait = async () => {
        var data = await GetSubsidiaryDashboard(val.unique_id);
        setSubsi(data.result);
    };
    
    useEffect(() => {
        inAwait();
    }, []);
    return (
        <div>
            <h1 className='text-black font-bold mb-6 text-[20px]'>{val.fullname}</h1>
            <div className='grid grid-cols-12 gap-5 mb-6'>
                <div className='col-span-3 bg-white rounded-[10px] p-9 w-full'>
                    <h1 className='text-[13px] text-[#737373] font-semibold mb-3'>Total Employees</h1>
                    <h1 className='text-[24px] text-[#C1121F] font-[700]'>{subsdash.totalEmployee}</h1>
                </div>
                <div className='col-span-3 bg-white rounded-[10px] p-9 w-full'>
                    <h1 className='text-[13px] text-[#737373] font-semibold mb-3'>Applied Employees</h1>
                    <h1 className='text-[24px] text-[#C1121F] font-[700]'>{subsdash.totalAppliedEmployee}</h1>
                </div>
                <div className='col-span-3 bg-white rounded-[10px] p-9 w-full'>
                    <h1 className='text-[13px] text-[#737373] font-semibold mb-3'>New Employees</h1>
                    <h1 className='text-[24px] text-[#C1121F] font-[700]'>{subsdash.totalNewEmployee}</h1>
                </div>
                <div className='col-span-3 bg-white rounded-[10px] p-9 w-full'>
                    <h1 className='text-[13px] text-[#737373] font-semibold mb-3'>Resigned Employees</h1>
                    <h1 className='text-[24px] text-[#C1121F] font-[700]'>{subsdash.totalResignedEmployee}</h1>
                </div>
            </div>
            <div className='bg-white rounded-xl'>
                <div className='px-6 py-9 '>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                        onChange={handleChange}
                        textColor="inherit"
                        TabIndicatorProps={
                            {
                                style: {
                                color: "#C1121F",
                                backgroundColor: "#C1121F",
                                },
                            }
                        }
                        >
                        <Tab style={{ minWidth: "300px" }} label="Job Management" value="1" />
                        <Tab style={{ minWidth: "300px" }} label="Organization Structure" value="2" />
                        <Tab style={{ minWidth: "300px" }} label="Attendance Record" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel className="py-5 px-0" value="1">
                        <JobManage/>
                    </TabPanel>
                    <TabPanel className="py-5 px-0" value="2">
                        <OrganizationStructure/>
                    </TabPanel>
                    <TabPanel className="py-5 px-0" value="3">
                        <AttendanceRecord/>
                    </TabPanel>
                </TabContext>
                    {/* <div className='flex items-center gap-5 border-b-2 border-b-[#EDEDED] px-3'>
                        <button className={`${index === 1 ? 'text-[#C1121F] border-b-2 border-b-[#C1121F]' : 'text-[#A8A8A8]' } py-2`} onClick={ () => setIndex(1) }>Job Management</button>
                        <button className={`${index === 2 ? 'text-[#C1121F] border-b-2 border-b-[#C1121F]' : 'text-[#A8A8A8]' } py-2`} onClick={ () => setIndex(2) }>Organization Structure</button>
                        <button className={`${index === 3 ? 'text-[#C1121F] border-b-2 border-b-[#C1121F]' : 'text-[#A8A8A8]' } py-2`} onClick={ () => setIndex(3) }>Attendance Record</button>
                    </div>
                    { index === 1 ?
                        <div className='bg-white rounded-xl shadow-sm mt-10'>
                            <div className='p-3'>
                                <div className='mb-9'>
                                    <h1 className='text-black mb-1'>Job Management</h1>
                                    <h1 className='text-[10px] text-[#737373]'>list of job Management </h1>
                                </div>
                                <div>
                                    <div className='w-full bg-[#EBF7FF] px-4 py-2 flex items-center gap-3 rounded-md mb-3'>
                                        <div className='min-w-[200px] max-w-[200px]'>
                                            <div className='w-full flex items-center gap-2'>
                                            <h1 className='text-[#737373] text-xs'>Job Grade</h1>
                                            <ImportExport fontSize="2px" className='mt-0.5 text-[#737373]'/></div>
                                        </div>
                                        <div className='min-w-[200px] max-w-[200px]'>
                                            <div className='w-full flex items-center gap-2'>
                                            <h1 className='text-[#737373] text-xs'>Job Level</h1>
                                            <ImportExport fontSize="2px" className='mt-0.5 text-[#737373]'/></div>
                                        </div>
                                        <div className='min-w-[200px] max-w-[200px]'>
                                            <div className='w-full flex items-center gap-2'>
                                            <h1 className='text-[#737373] text-xs'>Job Titles</h1>
                                            <ImportExport fontSize="2px" className='mt-0.5 text-[#737373]'/></div>
                                        </div>
                                        <div className='min-w-[200px] max-w-[200px]'>
                                            <div className='w-full flex items-center gap-2'>
                                            <h1 className='text-[#737373] text-xs'>Job Position</h1>
                                            <ImportExport fontSize="2px" className='mt-0.5 text-[#737373]'/></div>
                                        </div>
                                    </div>
                                    <div className={`px-4 flex items-center gap-3 w-full mb-3`}>
                                        <div className= 'min-w-[200px] max-w-[200px]'>
                                            <h1 className='text-xs truncate text-[#737373]'>XV</h1>
                                        </div>
                                        <div className= 'min-w-[200px] max-w-[200px]'>
                                            <h1 className='text-xs truncate text-[#737373]'>Director</h1>
                                        </div>
                                        <div className= 'min-w-[200px] max-w-[200px]'>
                                            <h1 className='text-xs truncate text-[#737373]'>Divison</h1>
                                        </div>
                                        <div className= 'min-w-[200px] max-w-[200px]'>
                                            <h1 className='text-xs truncate text-[#737373]'>ADM & F/A/T</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full rounded-b-xl bg-[#FBFBFB] h-16 px-6 justify-between items-center flex'>
                                <div>
                                    <h1 className='text-[10px] text-[#A098AE]'>Showing 1-5 from 100 data</h1>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <KeyboardArrowLeft/>
                                    <button className='bg-[#780000] bg-opacity-10 rounded-md w-6 h-6 flex items-center justify-center text-[10px] text-[#780000]'>1</button>
                                    <button className='bg-[#780000] rounded-md w-6 h-6 flex items-center justify-center text-[10px] text-white'>2</button>
                                    <button className='bg-[#780000] bg-opacity-10 rounded-md w-6 h-6 flex items-center justify-center text-[10px] text-[#780000]'>3</button>
                                    <KeyboardArrowRight/>
                                </div>
                            </div>
                        </div>
                    : index === 2 ?
                        <div className='mt-10'>
                            <div className='p-3'>
                                <div className='mb-9 border-b border-b-[#CACACA] pb-3'>
                                    <h1 className='text-black mb-1'>Structure Organization</h1>
                                    <h1 className='text-[10px] text-[#737373]'>Organizational structure of the company </h1>
                                </div>
                            </div>
                        </div>
                    : index === 3 ?
                        <div>

                        </div>
                    : null
                    } */}
                </div>
            </div>
        </div>
    )
}

export default SubsidiaryDetail