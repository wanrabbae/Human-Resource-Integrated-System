import { DownloadSimple } from 'phosphor-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as XLSX from "xlsx";
import { SwalError, SwalSuccess } from '../../../Components/Modals';
import { ImportPayrollC } from '../../../Repository/PayrollRepository';

const PayrollComponentBulkUpload = () => {
    const [file, setFile] = useState();
    const navigate = useNavigate()
    const employees = [];
    const handleChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleImport = async () => {
        try {
            const reader = new FileReader();
            reader.onload = async function (e) {
                try {
                    var data = e.target.result;
                    let readedData = XLSX.read(data, {
                        header: 0,
                        type: "binary",
                        cellText: false,
                        cellDates: true,
                        raw: false,
                    });
                    const wsname = readedData.SheetNames[0];
                    const ws = readedData.Sheets[wsname];

                    /* Convert array to json*/
                    const dataParse = XLSX.utils.sheet_to_json(ws, {
                        header: 0,
                        raw: false,
                        dateNF: "yyyy-mm-dd",
                    });
                    // console.log(dataParse);
                    const dt = await ImportPayrollC(dataParse);
                    console.log(dt);
                    SwalSuccess({ message: "Success import employees!" })
                    navigate("/payroll/payroll-component")
                } catch (error) {
                    console.log(error);
                    SwalError({ message: "Error while importing the employees data!" });
                }
            };
            await reader.readAsBinaryString(file);
            SwalSuccess({ message: "Success importing employee data" });
        } catch (error) {
            console.log(error);
            SwalError({ message: "Error while importing the employees data!" });
        }
    };

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
                    <button className='flex items-center gap-2 text-[#219EBCBF] opacity-75 hover:opacity-100 transition-opacity ease-in-out duration-200 font-semibold'>
                        <h1>Download Template</h1>
                        <DownloadSimple weight='bold' size={14} />
                    </button>
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-xs font-semibold'>Upload File *</h1>
                    <div className='flex items-center gap-2'>
                        <input className='border border-[#CACACA] rounded-md text-sm p-2 focus:border-none active:border-none outline-0 w-fit' placeholder='Choose File' type={"file"} onChange={(e) => handleChange(e)} />
                        <div className='bg-[#D9D9D9] px-2 py-0.5 rounded-sm flex items-center gap-3'>
                            <h1 className='text-xs text-[#737373]'>Payroll_component.xsxl</h1>
                            <button className='text-xs text-[#737373] hover:text-[#C1121F] mb-0.5'>x</button>
                        </div>
                    </div>
                    <h1 className='text-[#C1121F] text-[8px]'>*Max 10MB</h1>
                </div>
                <button onClick={() => handleImport()} className='bg-[#0E5073] px-4 py-2 rounded-md text-white w-fit'>
                    Upload
                </button>
            </div>
        </div>
    )
}

export default PayrollComponentBulkUpload