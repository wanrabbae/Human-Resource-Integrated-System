import { ArrowBack, ArrowDropDown, ArrowForward, ArrowLeft, ArrowLeftSharp, Assignment, Check, Close, EditOutlined, GroupsSharp, ImportExport, KeyboardArrowLeft, KeyboardArrowRight, RateReviewSharp, Search, Summarize } from '@mui/icons-material'
import { Dialog, Modal } from '@mui/material'
import moment from 'moment/moment'
import { ArrowArcLeft, ArrowLineLeft, DownloadSimple, FileArrowUp, Minus, Plus, Trash, TrashSimple } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const RunPayroll = () => {
    const navigation = useNavigate()
    const [index, setIndex] = useState(1)
    const [newDatas, setNewDatas] = useState([])
    const [editActive, setEditActive] = useState(false)
    const [income, setIncome] = useState(false)
    const [deduction, setDeduction] = useState(false)
    const [benefit, setBenefit] = useState(false)
    const data = [
        {
            id: 1,
            name: 'Muhammad Faizal',
            jobGrade: 'M001/I-II',
            status: 'Fulltime - Contract',
        },
        {
            id: 2,
            name: 'Muhammad Habib',
            jobGrade: 'M001/IV-VII',
            status: 'Fulltime - Contract',
        },
        {
            id: 3,
            name: 'Muhammad Abdan',
            jobGrade: 'M001/V-VI',
            status: 'Fulltime - Contract',
        },
        {
            id: 4,
            name: 'Muhammad Elen',
            jobGrade: 'M001/II-IV',
            status: 'Fulltime - Contract',
        },
    ]

    const handleNext = () => {
        if(index === 4) {
            navigation('/payroll')
        } else {
            setIndex(index+1)
        }
    }
    const handlePrev = () => {
        setIndex(index-1)
    }


    return (
        <div>
            <div className='py-9 flex flex-col gap-4'>
                <h1 className=''>Run Payroll</h1>
                <div className='px-28'>
                    <div className='flex items-center justify-between relative'>
                        <div className='w-20 h-20 rounded-full bg-[#CACACA] z-50 flex items-center justify-center'>
                            <div className={`${index >= 1 ? 'h-20 w-20' : 'h-0 w-0'} bg-[#780000] rounded-full flex items-center justify-center transition-all ease-in-out duration-500`}>
                                {index > 1 ? 
                                <Check className={`text-white`}/>
                                :
                                <GroupsSharp className={`text-white`}/>
                                }
                            </div>
                        </div>
                        <div className={`absolute w-1/2 bg-[#CACACA] h-1 left-0 overflow-hidden`}>
                            <div className={`absolute bg-[#780000] ${ index > 1 ? 'w-[500px]' : 'w-0'} h-1 left-0 transition-all ease-in-out duration-500`}/>
                        </div>
                        <div className='w-20 h-20 rounded-full bg-[#CACACA] z-50 flex items-center justify-center'>
                            <div className={`${index > 1 ? 'h-20 w-20' : 'h-0 w-0'} bg-[#780000] rounded-full flex items-center justify-center transition-all ease-in-out duration-500`}>
                                {index > 2 ?
                                <Check className={`text-white`}/>
                                :
                                <RateReviewSharp className={`text-white`}/>
                                }
                            </div>
                        </div>
                        <div className={`absolute w-1/2 bg-[#CACACA] h-1 right-0 overflow-hidden`}>
                            <div className={`absolute bg-[#780000] ${ index > 2 ? 'w-[500px]' : 'w-0'} h-1 right-0 transition-all ease-in-out duration-500`}/>
                        </div>
                        <div className='w-20 h-20 rounded-full bg-[#CACACA] z-50 flex items-center justify-center'>
                            <div className={`${index > 2 ? 'h-20 w-20' : 'h-0 w-0'} bg-[#780000] rounded-full flex items-center justify-center transition-all ease-in-out duration-500`}>
                                {index > 3 ?
                                <Check className={`text-white`}/>
                                :
                                <Summarize className={`text-white`}/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {index === 1 ?
                <div className='bg-white rounded-xl px-6 py-9'>
                    <div className='flex flex-col gap-5'>
                        <div>
                            <h1 className='text-sm text-black'>Select Employee</h1>
                            <h1 className='text-[10px] text-[#7F7F7F]'>Make sure employee payroll data </h1>
                        </div>
                        <div className='flex items-center gap-3'>
                            <div>
                                <h1 className='text-[#737373] text-[10px] mb-2'>Payment Date <span className='text-[#780000]'>*</span></h1>
                                <input type='date' className='outline-none text-[#A8A8A8] py-2 rounded-md border border-[#CACACA] text-xs w-56'/>
                            </div>
                            <div>
                                <h1 className='text-[#737373] text-[10px] mb-2'>Payment Time <span className='text-[#780000]'>*</span></h1>
                                <input type='time' className='outline-none text-[#A8A8A8] py-2 rounded-md border border-[#CACACA] text-xs w-56'/>
                            </div>
                            <div>
                                <h1 className='text-[#737373] text-[10px] mb-2'>Payroll Component <span className='text-[#780000]'>*</span></h1>
                                <select className='outline-none text-[#A8A8A8] py-2 rounded-md border border-[#CACACA] text-xs w-56'>
                                    <option selected disabled>Select Payroll Component</option>
                                    <option value=''>Take Home Pay (THP)</option>
                                    <option value=''>Bonus</option>
                                    <option value=''>Tunjangan Hari Raya (THR)</option>
                                    <option value=''>Severance</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <h1 className='text-[#737373] text-[10px] mb-2'>Select Employee <span className='text-[#780000]'>*</span></h1>
                            <div className='grid grid-cols-12'>
                                <div className='col-span-6 border rounded-l-xl'>
                                    <div className='px-4 py-3 bg-[#F6F6F6] rounded-tl-xl'>
                                        <h1 className='text-[#5C5C5C] text-[10px]'>Employee Total : 160</h1>
                                    </div>
                                    <div className='p-4'>
                                        <div className='flex items-center justify-between gap-2 mb-3'>
                                            <div className='relative w-full'>
                                                <Search className='text-[#A8A8A8] absolute left-2 top-1.5'/>
                                                <input type='text' className='pl-10 w-full outline-none text-[#A8A8A8] py-2 rounded-md border border-[#CACACA] text-xs' placeholder='Search by Employee Name...'/>
                                            </div>
                                            <button className='h-8 w-8 rounded-md bg-[#0E5073] flex items-center justify-center'>
                                                <Plus weight='bold' className='text-white text-xl' onClick={''}/>
                                            </button>
                                        </div>
                                        <div>
                                            <div className='grid grid-cols-12 bg-[#EBF7FF] items-center px-3 py-2 rounded-md mb-2'>
                                                <div className='col-span-1 mb-0.5'>
                                                    <input type={'checkbox'} className='bg-[#EBF7FF] focus:ring-0 outline-none border-2 rounded-md'/>
                                                </div>
                                                <div className='col-span-11'>
                                                    <div className='w-full flex items-center gap-2'>
                                                        <h1 className='text-[#737373] text-xs'>Employee</h1>
                                                        <ImportExport fontSize="2px" className='mt-0.5 text-[#737373]'/>
                                                    </div>
                                                </div>
                                            </div>
                                            {data.map((data, index) => {
                                                return (
                                                    <div className='grid grid-cols-12 items-center px-3 py-2 mb-2' key={index}>
                                                        <div className='col-span-1 mb-0.5'>
                                                            <input type={'checkbox'} id={data.id} name={data.name} className='bg-[#EBF7FF] focus:ring-0 outline-none border-2 rounded-md'/>
                                                        </div>
                                                        <div className='col-span-11 flex flex-col gap-1'>
                                                            <h1 className='text-xs truncate text-[#737373]'>{data.name}</h1>
                                                            <h1 className='text-[10px] text-[#CACACA]'>{data.jobGrade}</h1>
                                                            <h1 className='text-[10px] text-[#A8A8A8]'>{data.status}</h1>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className='col-span-6 border rounded-r-xl'>
                                    <div className='px-4 py-3 bg-[#F6F6F6] rounded-tr-xl'>
                                        <h1 className='text-[#5C5C5C] text-[10px]'>Employee Total : 160</h1>
                                    </div>
                                    <div className='p-4'>
                                        <div className='flex items-center justify-between gap-2 mb-3'>
                                            <div className='relative w-full'>
                                                <Search className='text-[#A8A8A8] absolute left-2 top-1.5'/>
                                                <input type='text' className='pl-10 w-full outline-none text-[#A8A8A8] py-2 rounded-md border border-[#CACACA] text-xs' placeholder='Search by Employee Name...'/>
                                            </div>
                                            <button className='h-8 w-8 rounded-md bg-[#780000] flex items-center justify-center'>
                                                <TrashSimple weight='bold' className='text-white text-xl' onClick={ () => setNewDatas([]) }/>
                                            </button>
                                        </div>
                                        <div>
                                            <div className='grid grid-cols-12 bg-[#EBF7FF] items-center px-3 py-2 rounded-md mb-2'>
                                                <div className='col-span-1 mb-0.5'>
                                                    <input type={'checkbox'} className='bg-[#EBF7FF] focus:ring-0 outline-none border-2 rounded-md'/>
                                                </div>
                                                <div className='col-span-11'>
                                                    <div className='w-full flex items-center gap-2'>
                                                        <h1 className='text-[#737373] text-xs'>Employee</h1>
                                                        <ImportExport fontSize="2px" className='mt-0.5 text-[#737373]'/>
                                                    </div>
                                                </div>
                                            </div>
                                            {newDatas.map((data, index) => {
                                                return (
                                                    <div className='grid grid-cols-12 items-center px-3 py-2 mb-2' key={index}>
                                                        <div className='col-span-1 mb-0.5'>
                                                            <input type={'checkbox'} className='bg-[#EBF7FF] focus:ring-0 outline-none border-2 rounded-md'/>
                                                        </div>
                                                        <div className='col-span-11 flex flex-col gap-1'>
                                                            <h1 className='text-xs truncate text-[#737373]'>{data.name}</h1>
                                                            <h1 className='text-[10px] text-[#CACACA]'>{data.jobGrade}</h1>
                                                            <h1 className='text-[10px] text-[#A8A8A8]'>{data.status}</h1>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            : index === 2 ?
                <div className='bg-white rounded-xl'>
                    <div className='flex flex-col  px-6 py-9 gap-5'>
                        <div>
                            <h1 className='text-sm text-black'>Select Employee</h1>
                            <h1 className='text-[10px] text-[#7F7F7F]'>Make sure employee payroll data </h1>
                        </div>
                        <div className='flex items-center justify-end gap-2'>
                            <div className='relative'>
                                <Search className='absolute top-2 left-2 text-[#A8A8A8]'/>
                                <input type="text" id="table-search" className="text-sm rounded-md pl-10 border-[#A8A8A8] text-[#A8A8A8]" placeholder="Search..." />
                            </div>
                            <Link to={''} style={{ borderRadius: "6px", border: "1px solid #A9A9A9", color: "#003049", fontSize: "14px", fontWeight: "500", backgroundColor: "#F9F9F9", }} className="me-3 btn d-flex align-items-center">
                            <FileArrowUp className="me-2" color="#003049" size={16} weight="fill" />
                                Bulk Upload
                            </Link>
                        </div>
                        <div>
                            <Modal open={editActive} onClose={() => setEditActive(!editActive)}>
                                <Dialog open={editActive} onClose={() => setEditActive(!editActive)} scroll="body" fullWidth={true} maxWidth="md">
                                    <div className='p-4 flex flex-col gap-4'>
                                        <div className='flex items-center justify-between'>
                                            <h1>Edit Component for Run Payroll</h1>
                                            <button onClick={ () => setEditActive(!editActive)}>
                                                <Close/>
                                            </button>
                                        </div>
                                        <div>
                                            <h1 className='text-[11px] text-[#737373]'>Employee</h1>
                                            <h1 className='text-sm text-black'>Muhammad Hidayat Syarifuddin Tirto Satria</h1>
                                        </div>
                                        <div>
                                            <input type='text' className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0' placeholder='Rp.'/>
                                        </div>
                                        <div className='flex flex-col gap-3'>
                                            <div className={`flex flex-col ${income ? 'gap-3' : 'gap-0'} bg-[#FAFAFA] border border-[#CACACA] rounded-md w-full px-9 py-3`}>
                                                <div className='flex items-center justify-between' onClick={ () => setIncome(!income)}>
                                                    <h1 className='text-sm text-[#5C5C5C]'>Income</h1>
                                                    <button onClick={ () => setIncome(!income)}>
                                                        <ArrowDropDown className='text-[#5C5C5C]'/>
                                                    </button>
                                                </div>
                                                <div className={`${income ? 'h-[200px]' : 'h-0'} overflow-hidden transition-[height] ease-in-out duration-500`}>
                                                    <div className='grid grid-cols-12 items-center mb-3'>
                                                        <div className='col-span-4'>
                                                            <h1 className='text-xs text-[#5C5C5C]'>Tunjangan Tetap </h1>
                                                        </div>
                                                        <div className='col-span-8'>
                                                            <input type='text' className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0' placeholder='Rp.'/>
                                                        </div>
                                                    </div>
                                                    <div className='grid grid-cols-12 items-center mb-3'>
                                                        <div className='col-span-4'>
                                                            <h1 className='text-xs text-[#5C5C5C]'>Tunjangan Tidak Tetap </h1>
                                                        </div>
                                                        <div className='col-span-8'>
                                                            <input type='text' className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0' placeholder='Rp.'/>
                                                        </div>
                                                    </div>
                                                    <div className='grid grid-cols-12 items-center mb-3'>
                                                        <div className='col-span-4'>
                                                            <h1 className='text-xs text-[#5C5C5C]'>Tunjangan Telekomunikasi</h1>
                                                        </div>
                                                        <div className='col-span-8'>
                                                            <input type='text' className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0' placeholder='Rp.'/>
                                                        </div>
                                                    </div>
                                                    <div className='grid grid-cols-12 items-center mb-3'>
                                                        <div className='col-span-4'>
                                                            <h1 className='text-xs text-[#5C5C5C]'>Overtime</h1>
                                                        </div>
                                                        <div className='col-span-8'>
                                                            <input type='text' className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0' placeholder='Rp.'/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`flex flex-col ${deduction ? 'gap-3' : 'gap-0'} bg-[#FAFAFA] border border-[#CACACA] rounded-md w-full px-9 py-3`}>
                                                <div className='flex items-center justify-between' onClick={ () => setDeduction(!deduction)}>
                                                    <h1 className='text-sm text-[#5C5C5C]'>Deductions</h1>
                                                    <button onClick={ () => setDeduction(!deduction)}>
                                                    <ArrowDropDown className='text-[#5C5C5C]'/>
                                                    </button>
                                                </div>
                                                <div className={`${deduction ? 'h-[200px]' : 'h-0'} overflow-hidden transition-[height] ease-in-out duration-500`}>
                                                    <div className='grid grid-cols-12 items-center mb-3'>
                                                        <div className='col-span-4'>
                                                            <h1 className='text-xs text-[#5C5C5C]'>BPJS Kesehatan </h1>
                                                        </div>
                                                        <div className='col-span-8'>
                                                            <input type='text' className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0' placeholder='Rp.'/>
                                                        </div>
                                                    </div>
                                                    <div className='grid grid-cols-12 items-center mb-3'>
                                                        <div className='col-span-4'>
                                                            <h1 className='text-xs text-[#5C5C5C]'>BPJS Ketenagakerjaan </h1>
                                                        </div>
                                                        <div className='col-span-8'>
                                                            <input type='text' className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0' placeholder='Rp.'/>
                                                        </div>
                                                    </div>
                                                    <div className='grid grid-cols-12 items-center mb-3'>
                                                        <div className='col-span-4'>
                                                            <h1 className='text-xs text-[#5C5C5C]'>Late</h1>
                                                        </div>
                                                        <div className='col-span-8'>
                                                            <input type='text' className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0' placeholder='Rp.'/>
                                                        </div>
                                                    </div>
                                                    <div className='grid grid-cols-12 items-center mb-3'>
                                                        <div className='col-span-4'>
                                                            <h1 className='text-xs text-[#5C5C5C]'>Izin Tak dibayar</h1>
                                                        </div>
                                                        <div className='col-span-8'>
                                                            <input type='text' className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0' placeholder='Rp.'/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`flex flex-col ${benefit ? 'gap-3' : 'gap-0'} bg-[#FAFAFA] border border-[#CACACA] rounded-md w-full px-9 py-3`}>
                                                <div className='flex items-center justify-between' onClick={ () => setBenefit(!benefit)}>
                                                    <h1 className='text-sm text-[#5C5C5C]'>Benefit</h1>
                                                    <button onClick={ () => setBenefit(!benefit)}>
                                                        <ArrowDropDown className='text-[#5C5C5C]'/>
                                                    </button>
                                                </div>
                                                <div className={`${benefit ? 'h-[200px]' : 'h-0'} overflow-hidden transition-[height] ease-in-out duration-500`}>
                                                    <div className='grid grid-cols-12 items-center mb-3'>
                                                        <div className='col-span-4'>
                                                            <h1 className='text-xs text-[#5C5C5C]'>Bonus </h1>
                                                        </div>
                                                        <div className='col-span-8'>
                                                            <input type='text' className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0' placeholder='Rp.'/>
                                                        </div>
                                                    </div>
                                                    <div className='grid grid-cols-12 items-center mb-3'>
                                                        <div className='col-span-4'>
                                                            <h1 className='text-xs text-[#5C5C5C]'>Bonus CEO </h1>
                                                        </div>
                                                        <div className='col-span-8'>
                                                            <input type='text' className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0' placeholder='Rp.'/>
                                                        </div>
                                                    </div>
                                                    <div className='grid grid-cols-12 items-center mb-3'>
                                                        <div className='col-span-4'>
                                                            <h1 className='text-xs text-[#5C5C5C]'>Bonus Progress</h1>
                                                        </div>
                                                        <div className='col-span-8'>
                                                            <input type='text' className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0' placeholder='Rp.'/>
                                                        </div>
                                                    </div>
                                                    <div className='grid grid-cols-12 items-center mb-3'>
                                                        <div className='col-span-4'>
                                                            <h1 className='text-xs text-[#5C5C5C]'>Bonus Pulsa</h1>
                                                        </div>
                                                        <div className='col-span-8'>
                                                            <input type='text' className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0' placeholder='Rp.'/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-end gap-3'>
                                            <button className='bg-[#ECECEC] w-[100px] h-[38px] text-center rounded-md text-[#003049]' onClick={ () => setEditActive(!editActive) }>Cancel</button>
                                            <button className='bg-[#0E5073] w-[100px] h-[38px] text-center rounded-md text-white' onClick={ () => setEditActive(!editActive) }>Save</button>
                                        </div>
                                    </div>
                                </Dialog>
                            </Modal>
                            <div className='table-responsive'>
                                <div className='w-full bg-[#EBF7FF] px-4 py-2 flex items-center gap-3 rounded-md mb-3'>
                                    <div className='min-w-[200px] max-w-[200px]'>
                                        <div className='w-full flex items-center gap-2'>
                                        <h1 className='text-[#737373] text-xs'>Employee</h1>
                                        <ImportExport fontSize="2px" className='mt-0.5 text-[#737373]'/></div>
                                    </div>
                                    <div className='min-w-[120px] max-w-[120px]'>
                                        <div className='w-full flex items-center gap-2'>
                                        <h1 className='text-[#737373] text-xs'>Basic Salary</h1>
                                        <ImportExport fontSize="2px" className='mt-0.5 text-[#737373]'/></div>
                                    </div>
                                    <div className='min-w-[120px] max-w-[120px]'>
                                        <div className='w-full flex items-center gap-2'>
                                        <h1 className='text-[#737373] text-xs'>Total Income</h1>
                                        <ImportExport fontSize="2px" className='mt-0.5 text-[#737373]'/></div>
                                    </div>
                                    <div className='min-w-[120px] max-w-[120px]'>
                                        <div className='w-full flex items-center gap-2'>
                                        <h1 className='text-[#737373] text-xs'>Total Deduction</h1>
                                        <ImportExport fontSize="2px" className='mt-0.5 text-[#737373]'/></div>
                                    </div>
                                    <div className='min-w-[120px] max-w-[120px]'>
                                        <div className='w-full flex items-center gap-2'>
                                        <h1 className='text-[#737373] text-xs'>Total Benefit</h1>
                                        <ImportExport fontSize="2px" className='mt-0.5 text-[#737373]'/></div>
                                    </div>
                                    <div className='min-w-[120px] max-w-[120px]'>
                                        <div className='w-full flex items-center gap-2'>
                                        <h1 className='text-[#737373] text-xs'>Total Pay</h1>
                                        <ImportExport fontSize="2px" className='mt-0.5 text-[#737373]'/></div>
                                    </div>
                                    <div className='min-w-[50px] max-w-[50px]'>
                                        <div className='w-full flex items-center justify-center gap-2'>
                                            <h1 className='text-[#737373] text-xs'>Action</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className={`px-4 flex items-center gap-3 w-full mb-3`}>
                                    <div className= 'min-w-[200px] max-w-[200px] pr-2'>
                                        <h1 className='text-xs truncate text-[#737373]'>Muhammad Hidayat Syarifuddin Tirto Satria</h1>
                                        <h1 className='text-[10px] text-[#CACACA]'>M001/I-II</h1>
                                        <h1 className='text-[10px] text-[#A8A8A8]'>Fulltime - Contract</h1>
                                    </div>
                                    <div className= 'min-w-[120px] max-w-[120px]'>
                                        <h1 className='text-xs truncate text-[#737373]'>Rp 95.000.000.000</h1>
                                    </div>
                                    <div className= 'min-w-[120px] max-w-[120px]'>
                                        <h1 className='text-xs truncate text-[#737373]'>Rp 95.000.000.000</h1>
                                    </div>
                                    <div className= 'min-w-[120px] max-w-[120px]'>
                                        <h1 className='text-xs truncate text-[#737373]'>Rp 95.000.000.000</h1>
                                    </div>
                                    <div className= 'min-w-[120px] max-w-[120px]'>
                                        <h1 className='text-xs truncate text-[#737373]'>Rp 95.000.000.000</h1>
                                    </div>
                                    <div className= 'min-w-[120px] max-w-[120px]'>
                                        <h1 className='text-xs truncate text-[#737373]'>Rp 95.000.000.000</h1>
                                    </div>
                                    <div className= 'min-w-[50px] max-w-[50px] items-center justify-center flex'>
                                        <div className= 'flex items-center justify-center bg-[#CEDFEA] rounded-md w-8 h-8'>
                                            <button onClick={ () => setEditActive(!editActive)}>
                                                <EditOutlined fontSize="10px" />
                                            </button>
                                        </div>
                                    </div>
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
            : index === 3 ?
                <div className='bg-white rounded-xl'>
                    <div className='flex flex-col px-6 py-9 gap-5'>
                        <div>
                            <h1 className='text-sm text-black'>Select Employee</h1>
                            <h1 className='text-[10px] text-[#7F7F7F]'>Make sure employee payroll data </h1>
                        </div>
                        <div className='flex items-center justify-start gap-2'>
                            <div className='pr-4'>
                                <h1 className='text-[10px] text-[#737373] mb-2'>Payment Date </h1>
                                <h1 className='text-[#5C5C5C]'>{moment().format('DD MMMM YYYY')}</h1>
                            </div>
                            <div className='border-l-2 border-r-2 border-[#5C5C5C] px-4'>
                                <h1 className='text-[10px] text-[#737373] mb-2'>Payment Time </h1>
                                <h1 className='text-[#5C5C5C]'>{moment().format('hh:mm')}</h1>
                            </div>
                            <div className='px-4'>
                                <h1 className='text-[10px] text-[#737373] mb-2'>Total Pay </h1>
                                <h1 className='text-[#5C5C5C]'>Rp 180.000.000</h1>
                            </div>
                        </div>
                        <div>
                            <div className='w-full bg-[#EBF7FF] px-4 py-2 flex items-center gap-3 rounded-md mb-3'>
                                <div className='min-w-[200px] max-w-[200px]'>
                                    <div className='w-full flex items-center gap-2'>
                                    <h1 className='text-[#737373] text-xs'>Employee</h1>
                                    <ImportExport fontSize="2px" className='mt-0.5 text-[#737373]'/></div>
                                </div>
                                <div className='min-w-[140px] max-w-[140px]'>
                                    <div className='w-full flex items-center gap-2'>
                                    <h1 className='text-[#737373] text-xs'>Basic Salary</h1>
                                    <ImportExport fontSize="2px" className='mt-0.5 text-[#737373]'/></div>
                                </div>
                                <div className='min-w-[140px] max-w-[140px]'>
                                    <div className='w-full flex items-center gap-2'>
                                    <h1 className='text-[#737373] text-xs'>Total Income</h1>
                                    <ImportExport fontSize="2px" className='mt-0.5 text-[#737373]'/></div>
                                </div>
                                <div className='min-w-[140px] max-w-[140px]'>
                                    <div className='w-full flex items-center gap-2'>
                                    <h1 className='text-[#737373] text-xs'>Total Deduction</h1>
                                    <ImportExport fontSize="2px" className='mt-0.5 text-[#737373]'/></div>
                                </div>
                                <div className='min-w-[140px] max-w-[140px]'>
                                    <div className='w-full flex items-center gap-2'>
                                    <h1 className='text-[#737373] text-xs'>Total Benefit</h1>
                                    <ImportExport fontSize="2px" className='mt-0.5 text-[#737373]'/></div>
                                </div>
                                <div className='min-w-[140px] max-w-[140px]'>
                                    <div className='w-full flex items-center gap-2'>
                                    <h1 className='text-[#737373] text-xs'>Total Pay</h1>
                                    <ImportExport fontSize="2px" className='mt-0.5 text-[#737373]'/></div>
                                </div>
                            </div>
                            <div className={`px-4 flex items-center gap-3 w-full mb-3`}>
                                <div className= 'min-w-[200px] max-w-[200px] pr-2'>
                                    <h1 className='text-xs truncate text-[#737373]'>Muhammad Hidayat Syarifuddin Tirto Satria</h1>
                                    <h1 className='text-[10px] text-[#CACACA]'>M001/I-II</h1>
                                    <h1 className='text-[10px] text-[#A8A8A8]'>Fulltime - Contract</h1>
                                </div>
                                <div className= 'min-w-[140px] max-w-[140px]'>
                                    <h1 className='text-xs truncate text-[#737373]'>Rp 95.000.000.000</h1>
                                </div>
                                <div className= 'min-w-[140px] max-w-[140px]'>
                                    <h1 className='text-xs truncate text-[#737373]'>Rp 95.000.000.000</h1>
                                </div>
                                <div className= 'min-w-[140px] max-w-[140px]'>
                                    <h1 className='text-xs truncate text-[#737373]'>Rp 95.000.000.000</h1>
                                </div>
                                <div className= 'min-w-[140px] max-w-[140px]'>
                                    <h1 className='text-xs truncate text-[#737373]'>Rp 95.000.000.000</h1>
                                </div>
                                <div className= 'min-w-[140px] max-w-[140px]'>
                                    <h1 className='text-xs truncate text-[#737373]'>Rp 95.000.000.000</h1>
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
            :
                <div className='bg-white rounded-xl'>
                    <div className='flex flex-col px-6 py-9 gap-5'>
                        <div>
                            <h1 className='text-sm text-black'>Select Employee</h1>
                            <h1 className='text-[10px] text-[#7F7F7F]'>Make sure employee payroll data </h1>
                        </div>
                        <div className='flex items-center justify-start gap-2'>
                            <div className='pr-4'>
                                <h1 className='text-[10px] text-[#737373] mb-2'>Payment Date </h1>
                                <h1 className='text-[#5C5C5C]'>{moment().format('DD MMMM YYYY')}</h1>
                            </div>
                            <div className='border-l-2 border-r-2 border-[#5C5C5C] px-4'>
                                <h1 className='text-[10px] text-[#737373] mb-2'>Payment Time </h1>
                                <h1 className='text-[#5C5C5C]'>{moment().format('hh:mm')}</h1>
                            </div>
                            <div className='px-4'>
                                <h1 className='text-[10px] text-[#737373] mb-2'>Total Pay </h1>
                                <h1 className='text-[#5C5C5C]'>Rp 180.000.000</h1>
                            </div>
                        </div>
                        <div>
                            <div className='px-3 py-2 bg-[#EDF3FC] flex items-center justify-between gap-2 w-[450px] rounded-md mb-6'>
                                <div className='flex items-center gap-2'>
                                    <Assignment/>
                                    <h1 className='text-black text-xs'>Salary Report 28 November 2022</h1>
                                </div>
                                <DownloadSimple weight='bold'/>
                            </div>
                            <div className='px-3 py-2 bg-[#EDF3FC] flex items-center justify-between gap-2 w-[450px] rounded-md mb-6'>
                                <div className='flex items-center gap-2'>
                                    <Assignment/>
                                    <h1 className='text-black text-xs'>Bank Report 28 November 2022</h1>
                                </div>
                                <DownloadSimple weight='bold'/>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className='mt-3 flex gap-3 items-center justify-end'>
                <button className={`bg-[#E2E2E2] flex items-center gap-2 rounded-md px-4 w-44 text-xs justify-center py-2 text-[#003049] font-bold ${index === 1 ? 'hidden' : index === 4 ? 'hidden' : 'block'}`} onClick={handlePrev} disabled={ index === 1 ? true : false }>
                    <ArrowBack fontSize='10'/>
                    Back
                </button>
                <button className='bg-[#0E5073] text-white flex items-center gap-2 rounded-md px-4 w-44 text-xs justify-center py-2 font-bold' onClick={handleNext}>
                    { index === 3 ? 
                    <h1>Finish</h1>
                    :
                    index < 3 ?
                    <div className='flex items-center gap-2'>
                        Continue
                        <ArrowForward fontSize='10'/>
                    </div>
                    :
                    <h1>Back To Dashboard</h1>
                    }
                </button>
            </div>
        </div>
    )
}

export default RunPayroll