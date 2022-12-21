import { EditOutlined, ImportExport, KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUp, Search } from '@mui/icons-material'
import { FileArrowUp } from 'phosphor-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const PayrollComponent = () => {

  const [Active, setActive] = useState(false)
  const [Current, setCurrent] = useState(0)
  const handleCollapse = (id) => {
    if(id){
      setCurrent(id)
      setActive(!Active)
    }
  }
  const data = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
  ]

  return (
    <div className='bg-white rounded-xl'>
      <div className='px-6 py-9 '>
        <div className='flex justify-between items-center'>
          <div>
              <h1 className='text-black'>Payroll Component</h1>
              <h1 className='text-xs text-[#737373]'>Payroll Setting</h1>
          </div>
          <div className='flex items-center gap-2'>
            <div className='relative'>
              <Search className='absolute top-2 left-2 text-[#A8A8A8]'/>
              <input type="text" id="table-search" className="text-sm rounded-md pl-10 border-[#A8A8A8] text-[#A8A8A8]" placeholder="Search..." />
            </div>
            <Link to={'/payroll/payroll-component/bulk-upload'} style={{ borderRadius: "6px", border: "1px solid #A9A9A9", color: "#003049", fontSize: "14px", fontWeight: "500", backgroundColor: "#F9F9F9", }} className="me-3 btn d-flex align-items-center">
              <FileArrowUp className="me-2" color="#003049" size={16} weight="fill" />
              Bulk Upload
            </Link>
          </div>
        </div>
        <div className='mt-16'>
          <div className='w-full bg-[#EBF7FF] px-4 py-2 flex items-center gap-3 rounded-md  '>
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
            <div className='min-w-[50px] max-w-[50px]'>
              <div className='w-full flex items-center justify-center gap-2'>
                <h1 className='text-[#737373] text-xs'>Action</h1>
              </div>
            </div>
            <div className='min-w-[50px] max-w-[50px]'>
              <div className='w-full  flex items-center gap-2'></div>
            </div>
          </div>
          {Object.values(data).map((x, i) => {
            return (
              <div>
                <div className={`px-4 py-2 mt-2 flex items-center gap-3 border ${ x.id === Current && !Active ? 'rounded-t-md' : 'rounded-md' } w-full`}>
                  <div className= 'min-w-[200px] max-w-[200px] pr-2'>
                    <h1 className='text-xs truncate text-[#737373]'>Muhammad Hidayat Syarifuddin Tirto Satria</h1>
                    <h1 className='text-[10px] text-[#CACACA]'>M001/I-II</h1>
                    <h1 className='text-[10px] text-[#A8A8A8]'>Fulltime - Contract</h1>
                  </div>
                  <div className= 'min-w-[140px] max-w-[140px]'>
                    <h1 className='text-xs truncate text-[#737373]'>Rp 135.000.000.000</h1>
                  </div>
                  <div className= 'min-w-[140px] max-w-[140px]'>
                    <h1 className='text-xs truncate text-[#737373]'>Rp 135.000.000.000</h1>
                  </div>
                  <div className= 'min-w-[140px] max-w-[140px]'>
                    <h1 className='text-xs truncate text-[#737373]'>Rp 135.000.000.000</h1>
                  </div>
                  <div className= 'min-w-[140px] max-w-[140px]'>
                    <h1 className='text-xs truncate text-[#737373]'>Rp 135.000.000.000</h1>
                  </div>
                  <div className= 'min-w-[50px] max-w-[50px] items-center justify-center flex'>
                    <div className= 'flex items-center justify-center bg-[#CEDFEA] rounded-md w-8 h-8'>
                      <button>
                        <EditOutlined fontSize="10px" />
                      </button>
                    </div>
                  </div>
                  <div className='min-w-[50px] max-w-[50px] flex items-center justify-end'>
                    <button onClick={ () => handleCollapse(x.id)}>
                      { x.id === Current && !Active ?
                        <KeyboardArrowUp/>
                        :
                        <KeyboardArrowDown/>
                      }
                    </button>
                  </div>
                </div>
                <div className={`w-full rounded-b-md bg-[#F9F9F9] transition-all ease-in-out duration-500 overflow-hidden ${ x.id === Current && !Active ? 'h-48' : 'h-0' }`}>
                  <div className='grid grid-cols-12 gap-5 p-4'>
                      <div className='col-span-4'>
                        <h1 className='text-[#737373] text-sm'>Detail Income</h1>
                        <div className='grid grid-cols-12 gap-2 mt-2'>
                          <div className='col-span-7 text-xs text-[#A8A8A8]'>Tunjangan Tetap </div>
                          <div className='col-span-1 text-xs text-[#A8A8A8]'>:</div>
                          <div className='col-span-4 text-xs text-[#A8A8A8]'>Rp 95.000.000</div>
                        </div>
                        <div className='grid grid-cols-12 gap-2 mt-2'>
                          <div className='col-span-7 text-xs text-[#A8A8A8]'>Tunjangan Tidak Tetap </div>
                          <div className='col-span-1 text-xs text-[#A8A8A8]'>:</div>
                          <div className='col-span-4 text-xs text-[#A8A8A8]'>Rp 95.000.000</div>
                        </div>
                        <div className='grid grid-cols-12 gap-2 mt-2'>
                          <div className='col-span-7 text-xs text-[#A8A8A8] truncate'>Tunjangan Telekomunikasi </div>
                          <div className='col-span-1 text-xs text-[#A8A8A8]'>:</div>
                          <div className='col-span-4 text-xs text-[#A8A8A8]'>Rp 95.000.000</div>
                        </div>
                      </div>
                      <div className='col-span-4'>
                        <h1 className='text-[#737373] text-sm'>Detail Deduction</h1>
                        <div className='grid grid-cols-12 gap-2 mt-2'>
                          <div className='col-span-6 text-xs text-[#A8A8A8]'>Absence</div>
                          <div className='col-span-1 text-xs text-[#A8A8A8]'>:</div>
                          <div className='col-span-5 text-xs text-[#A8A8A8]'>Rp 95.000.000</div>
                        </div>
                        <div className='grid grid-cols-12 gap-2 mt-2'>
                          <div className='col-span-6 text-xs text-[#A8A8A8]'>Late</div>
                          <div className='col-span-1 text-xs text-[#A8A8A8]'>:</div>
                          <div className='col-span-5 text-xs text-[#A8A8A8]'>Rp 95.000.000</div>
                        </div>
                        <div className='grid grid-cols-12 gap-2 mt-2'>
                          <div className='col-span-6 text-xs text-[#A8A8A8]'>Potongan Lain-lain</div>
                          <div className='col-span-1 text-xs text-[#A8A8A8]'>:</div>
                          <div className='col-span-5 text-xs text-[#A8A8A8]'>Rp 95.000.000</div>
                        </div>
                      </div>
                      <div className='col-span-4'>
                        <h1 className='text-[#737373] text-sm'>Detail Benefit</h1>
                        <div className='grid grid-cols-12 gap-2 mt-2'>
                          <div className='col-span-6 text-xs text-[#A8A8A8]'>BPJS Kesehatan</div>
                          <div className='col-span-1 text-xs text-[#A8A8A8]'>:</div>
                          <div className='col-span-5 text-xs text-[#A8A8A8]'>Rp 95.000.000</div>
                        </div>
                        <div className='grid grid-cols-12 gap-2 mt-2'>
                          <div className='col-span-6 text-xs text-[#A8A8A8]'>BPJS Ketenagakerjaan</div>
                          <div className='col-span-1 text-xs text-[#A8A8A8]'>:</div>
                          <div className='col-span-5 text-xs text-[#A8A8A8]'>Rp 95.000.000</div>
                        </div>
                        <div className='grid grid-cols-12 gap-2 mt-2'>
                          <div className='col-span-6 text-xs text-[#A8A8A8]'>Bonus CEO</div>
                          <div className='col-span-1 text-xs text-[#A8A8A8]'>:</div>
                          <div className='col-span-5 text-xs text-[#A8A8A8]'>Rp 95.000.000</div>
                        </div>
                        <div className='grid grid-cols-12 gap-2 mt-8'>
                          <div className='col-span-6 text-sm font-bold'>Total Pay</div>
                          <div className='col-span-1 text-sm font-bold'>:</div>
                          <div className='col-span-5 text-sm font-bold'>Rp 95.000.000</div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            )
          })}
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
  )
}

export default PayrollComponent