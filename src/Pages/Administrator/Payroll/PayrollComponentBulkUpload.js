import { DownloadSimple } from 'phosphor-react'
import React from 'react'

const PayrollComponentBulkUpload = () => {
  return (
    <div className='bg-white rounded-xl'>
        <div className='px-6 py-9 flex flex-col gap-5'>
            <div>
                <h1 className='text-black font-semibold'>Bulk Upload</h1>
                <h1 className='text-[#737373] text-[10px]'>Import a file to update external user data </h1>
            </div>
            <div>
                <h1 className='text-sm font-semibold'>Step :</h1>
                <ul className='list-disc list-inside pl-3 text-sm'>
                    <li>Download the template that has been provided</li>
                    <li>Fill in the data according to the available fields</li>
                    <li>Make sure the data entered is correct</li>
                    <li>Upload documents that have been confirmed to be correct</li>
                </ul>
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='text-black font-semibold'>Donwload Template :</h1>
                <div className='flex items-center gap-2 text-[#219EBCBF] opacity-75 font-semibold'>
                    <h1>Download Template</h1>
                    <DownloadSimple weight='bold' size={14}/>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='text-xs font-semibold'>Upload File *</h1>
                <div className='flex items-center gap-2'>
                    <input className='border border-[#CACACA] rounded-md text-sm p-2 focus:border-none active:border-none outline-0 w-fit' placeholder='Choose File'/>
                    <div className='bg-[#D9D9D9] px-2 py-0.5 rounded-sm flex items-center gap-3'>
                        <h1 className='text-xs text-[#737373]'>Payroll_component.xsxl</h1>
                        <button className='text-xs text-[#737373] hover:text-[#C1121F] mb-0.5'>x</button>
                    </div>
                </div>
                <h1 className='text-[#C1121F] text-[8px]'>*Max 10MB</h1>
            </div>
            <button className='bg-[#0E5073] px-4 py-2 rounded-md text-white w-fit'>
                Upload
            </button>
        </div>
    </div>
  )
}

export default PayrollComponentBulkUpload