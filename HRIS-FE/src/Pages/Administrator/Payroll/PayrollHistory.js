import { EditOutlined, ImportExport, KeyboardArrowLeft, KeyboardArrowRight, Search } from '@mui/icons-material'
import { FileArrowUp, FunnelSimple } from 'phosphor-react'
import { TbFileExport } from 'react-icons/tb';
import { HiOutlineClipboardList } from 'react-icons/hi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';
import * as XLSX from "xlsx";
import { GetPayrollHistory } from '../../../Repository/PayrollRepository';

function PayrollHistory() {
    const [phistory, setPhistory] = useState([]);

    const inAwait = async () => {
        var res = await GetPayrollHistory();
        setPhistory(res.data);
    };

    useEffect(() => {
      inAwait()
    }, []);
    
    const rupiah = (number)=>{
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR"
        }).format(number);
      }
      const exportExcel = async () => {
        if (phistory.length > 0) {
          var wb = XLSX.utils.book_new();
          var data = [];
    
          await phistory.map((app) => {
            data.push({
              "Payment Date ": moment(app.payment_date).format('DD MMMM YYYY'),
              "Payment Time ": app.payment_time,
              "Total Employee": app?.total_employee,
              "Total Pay": app?.total_pay,
              "Run By": app?.run_by,
            });
          });
    
          var ws = XLSX.utils.json_to_sheet(data);
    
          XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    
          XLSX.writeFile(wb, "Payroll History.xlsx");
          console.log("Exported excel!");
        } else {
          alert("Data masih kosong");
        }
      };
    return (
        <>
            <div className='bg-white rounded-xl'>
                <div className='flex flex-col  px-6 py-9 gap-5'>
                    <div>
                        <h1 className='text-sm text-black'>Payroll History</h1>
                        <h1 className='text-[10px] text-[#7F7F7F]'>History for the previous payroll </h1>
                    </div>
                    <div className='flex items-center justify-between gap-2'>
                        <div className='flex items-center gap-1'>
                            <Link to={''} style={{ borderRadius: "6px", border: "1px solid #A9A9A9", color: "#003049", fontSize: "14px", fontWeight: "500", backgroundColor: "#F9F9F9", }} className="me-3 btn d-flex align-items-center">
                                <FunnelSimple className="me-2" color="#003049" size={16} weight="fill" />
                                Filter
                            </Link>
                            <button onClick={()=> exportExcel()} style={{ borderRadius: "6px", border: "1px solid #A9A9A9", color: "#003049", fontSize: "14px", fontWeight: "500", backgroundColor: "#F9F9F9", }} className="me-3 btn d-flex align-items-center">
                                <TbFileExport className="me-2" color="#003049" size={16} weight="fill" />
                                Export
                            </button>
                        </div>
                        <div className='relative'>
                            <Search className='absolute top-2 left-2 text-[#A8A8A8]' />
                            <input type="text" id="table-search" className="text-sm rounded-md pl-10 w-[301px] border-[#A8A8A8] text-[#A8A8A8]" placeholder="Search..." />
                        </div>
                    </div>
                    <div className='table-responsive'>
                        <div className='w-full bg-[#EBF7FF] px-4 py-2 flex items-center gap-3 rounded-md mb-3'>
                            <div className='min-w-[150px] max-w-[150px]'>
                                <div className='w-full flex items-center gap-2'>
                                    <h1 className='text-[#737373] text-xs'>Payment Date</h1>
                                    <ImportExport fontSize="2px" className='mt-0.5 text-[#737373]' /></div>
                            </div>
                            <div className='min-w-[150px] max-w-[150px]'>
                                <div className='w-full flex items-center gap-2'>
                                    <h1 className='text-[#737373] text-xs'>Payment Time</h1>
                                    <ImportExport fontSize="2px" className='mt-0.5 text-[#737373]' /></div>
                            </div>
                            <div className='min-w-[150px] max-w-[150px]'>
                                <div className='w-full flex items-center gap-2'>
                                    <h1 className='text-[#737373] text-xs'>Total Employee</h1>
                                    <ImportExport fontSize="2px" className='mt-0.5 text-[#737373]' /></div>
                            </div>
                            <div className='min-w-[150px] max-w-[150px]'>
                                <div className='w-full flex items-center gap-2'>
                                    <h1 className='text-[#737373] text-xs'>Total Pay</h1>
                                    <ImportExport fontSize="2px" className='mt-0.5 text-[#737373]' /></div>
                            </div>
                            <div className='min-w-[150px] max-w-[150px]'>
                                <div className='w-full flex items-center gap-2'>
                                    <h1 className='text-[#737373] text-xs'>Run By</h1>
                                    <ImportExport fontSize="2px" className='mt-0.5 text-[#737373]' /></div>
                            </div>
                            <div className='min-w-[150px] max-w-[150px]'>
                                <div className='w-full flex items-center justify-center gap-2'>
                                    <h1 className='text-[#737373] text-xs'>Action</h1>
                                </div>
                            </div>
                        </div>
                        {
                            phistory.length > 0 ? (
                                phistory.map((x) => {
                                    return(
                                        <div className={`px-4 flex items-center gap-3 w-full mb-3`}>
                                            <>
                                            <div className='min-w-[150px] max-w-[150px] pr-2'>
                                                <h1 className='text-xs truncate text-[#737373]'>{moment(x.payment_date).format('DD MMMM YYYY')}</h1>
                                            </div>
                                            <div className='min-w-[150px] max-w-[150px]'>
                                                <h1 className='text-xs truncate text-[#737373]'>{x.payment_time}</h1>
                                            </div>
                                            <div className='min-w-[150px] max-w-[150px]'>
                                                <h1 className='text-xs truncate text-[#737373]'>{x.total_employee}</h1>
                                            </div>
                                            <div className='min-w-[150px] max-w-[150px]'>
                                                <h1 className='text-xs truncate text-[#737373]'>{rupiah(x.total_pay)}</h1>
                                            </div>
                                            <div className='min-w-[150px] max-w-[150px]'>
                                                <h1 className='text-xs truncate text-[#737373]'>{x.run_by}</h1>
                                            </div>
                                            <div className='min-w-[150px] max-w-[150px] items-center justify-center flex'>
                                                <button onClick={''} className='flex items-center justify-center bg-[#CEDFEA] rounded-md px-3 py-2 gap-2'>
                                                    <HiOutlineClipboardList fontSize="14px" />
                                                    <span className='text-[10px] text-black'>Download Report</span>
                                                </button>
                                            </div>
                                            </>
                                        </div>
                                        );
                                    })
                                ) : (
                                    <>
                                    <div className='flex justify-center text-center'>
                                        No Data
                                    </div>
                                    </>
                                )
                            }
                    </div>
                </div>
                <div className='w-full rounded-b-xl bg-[#FBFBFB] h-16 px-6 justify-between items-center flex'>
                    <div>
                        <h1 className='text-[10px] text-[#A098AE]'>Showing 1-5 from 100 data</h1>
                    </div>
                    <div className='flex items-center gap-2'>
                        <KeyboardArrowLeft />
                        <button className='bg-[#780000] bg-opacity-10 rounded-md w-6 h-6 flex items-center justify-center text-[10px] text-[#780000]'>1</button>
                        <button className='bg-[#780000] rounded-md w-6 h-6 flex items-center justify-center text-[10px] text-white'>2</button>
                        <button className='bg-[#780000] bg-opacity-10 rounded-md w-6 h-6 flex items-center justify-center text-[10px] text-[#780000]'>3</button>
                        <KeyboardArrowRight />
                    </div>
                </div>
            </div>
        </>
    );
}

export default PayrollHistory