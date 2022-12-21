import { EditOutlined, ImportExport, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { FileArrowUp } from 'phosphor-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const PayrollComponent = () => {

  const [Active, setActive] = useState(false)

  return (
    <div className='bg-white rounded-xl px-6 py-9 '>
      <div className='flex justify-between'>
        <div>
            <h1 className='text-black'>Payroll Component</h1>
            <h1 className='text-xs text-[#737373]'>Payroll Setting</h1>
        </div>
        <button style={{ borderRadius: "10px", border: "1.5px solid #A9A9A9", color: "#003049", fontSize: "14px", fontWeight: "600", backgroundColor: "#F9F9F9", }} className="me-3 btn d-flex align-items-center">
          <FileArrowUp className="me-2" color="#003049" size={16} weight="fill" />
          Bulk Upload
        </button>
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
        <div className={`px-4 py-2 mt-2 flex items-center gap-3 border ${!Active ? 'rounded-md' : 'rounded-t-md' } w-full`}>
          <div className= 'min-w-[200px] max-w-[200px] pr-2'>
            <h1 className='text-xs truncate'>Muhammad Hidayat Syarifuddin Tirto Satria</h1>
            <h1 className='text-[10px] text-[#CACACA]'>M001/I-II</h1>
            <h1 className='text-[10px] text-[#A8A8A8]'>Fulltime - Contract</h1>
          </div>
          <div className= 'min-w-[140px] max-w-[140px]'>
            <h1 className='text-xs truncate'>Rp 135.000.000.000</h1>
          </div>
          <div className= 'min-w-[140px] max-w-[140px]'>
            <h1 className='text-xs truncate'>Rp 135.000.000.000</h1>
          </div>
          <div className= 'min-w-[140px] max-w-[140px]'>
            <h1 className='text-xs truncate'>Rp 135.000.000.000</h1>
          </div>
          <div className= 'min-w-[140px] max-w-[140px]'>
            <h1 className='text-xs truncate'>Rp 135.000.000.000</h1>
          </div>
          <div className= 'min-w-[50px] max-w-[50px] items-center justify-center flex'>
            <div className= 'flex items-center justify-center bg-[#CEDFEA] rounded-md w-8 h-8'>
              <button>
                <EditOutlined fontSize="10px" />
              </button>
            </div>
          </div>
          <div className='min-w-[50px] max-w-[50px] flex items-center justify-end'>
            <button onClick={ () => setActive(!Active)}>
              { !Active ?
                <KeyboardArrowDown/>
                :
                <KeyboardArrowUp/>
              }
            </button>
          </div>
        </div>
        <div className={`w-full rounded-b-md bg-[#F9F9F9] transition-all ease-in-out duration-500 overflow-hidden ${Active ? 'h-44' : 'h-0'}`}>
          <div className='grid grid-cols-12 gap-5 p-4'>
              <div className='col-span-4'>
                <h1 className='text-[#737373] text-sm'>Detail Income</h1>
                <div className='grid grid-cols-12 gap-2 mt-2'>
                  <div className='col-span-6 text-xs'>Tunjangan Tetap </div>
                  <div className='col-span-1 text-xs'>:</div>
                  <div className='col-span-5 text-xs'></div>
                </div>
                <div className='grid grid-cols-12 gap-2 mt-2'>
                  <div className='col-span-6 text-xs'>Tunjangan Tidak Tetap </div>
                  <div className='col-span-1 text-xs'>:</div>
                  <div className='col-span-5 text-xs'></div>
                </div>
                <div className='grid grid-cols-12 gap-2 mt-2'>
                  <div className='col-span-6 text-xs'>Tunjangan Telekomunikasi </div>
                  <div className='col-span-1 text-xs'>:</div>
                  <div className='col-span-5 text-xs'></div>
                </div>
              </div>
              <div className='col-span-4'>
                <h1 className='text-[#737373] text-sm'>Detail Deduction</h1>
                <div className='grid grid-cols-12 gap-2 mt-2'>
                  <div className='col-span-6 text-xs'>Absence</div>
                  <div className='col-span-1 text-xs'>:</div>
                  <div className='col-span-5 text-xs'></div>
                </div>
                <div className='grid grid-cols-12 gap-2 mt-2'>
                  <div className='col-span-6 text-xs'>Late</div>
                  <div className='col-span-1 text-xs'>:</div>
                  <div className='col-span-5 text-xs'></div>
                </div>
                <div className='grid grid-cols-12 gap-2 mt-2'>
                  <div className='col-span-6 text-xs'>Potongan Lain-lain</div>
                  <div className='col-span-1 text-xs'>:</div>
                  <div className='col-span-5 text-xs'></div>
                </div>
              </div>
              <div className='col-span-4'>
                <h1 className='text-[#737373] text-sm'>Rincian Income</h1>
                <div className='grid grid-cols-12 gap-2 mt-2'>
                  <div className='col-span-6 text-xs'>BPJS Kesehatan</div>
                  <div className='col-span-1 text-xs'>:</div>
                  <div className='col-span-5 text-xs'></div>
                </div>
                <div className='grid grid-cols-12 gap-2 mt-2'>
                  <div className='col-span-6 text-xs'>BPJS Ketenagakerjaan</div>
                  <div className='col-span-1 text-xs'>:</div>
                  <div className='col-span-5 text-xs'></div>
                </div>
                <div className='grid grid-cols-12 gap-2 mt-2'>
                  <div className='col-span-6 text-xs'>Bonus CEO</div>
                  <div className='col-span-1 text-xs'>:</div>
                  <div className='col-span-5 text-xs'></div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PayrollComponent