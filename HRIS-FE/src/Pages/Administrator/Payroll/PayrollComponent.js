import {
  ArrowDropDown,
  Close,
  EditOutlined,
  ImportExport,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardArrowUp,
  Search,
} from "@mui/icons-material";
import { Dialog, Modal } from "@mui/material";
import { FileArrowUp, Plus, Trash } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CurrencyFormatter from "react-native-currency-formatter";
import {
  DeletePayrollComponent,
  GetPayrolComponent,
} from "../../../Repository/PayrollRepository";
import * as XLSX from "xlsx";
import { ModalDelete, SwalSuccess } from "../../../Components/Modals";
import { Dropdown } from "react-bootstrap";

const PayrollComponent = () => {
  const navigate = useNavigate();
  const [pcomponen, setPcomponen] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [Active, setActive] = useState(false);
  const [add, setAdd] = useState(false);
  const [isdelete, setDelete] = useState(false);
  const [Current, setCurrent] = useState(0);
  const [editActive, setEditActive] = useState(false);
  const [income, setIncome] = useState(false);
  const [deduction, setDeduction] = useState(false);
  const [benefit, setBenefit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [allPages, setAllPages] = useState([]);
  const [id, setId] = useState();

  const inAwait = async () => {
    var data = await GetPayrolComponent({ page: 1, size: 10 });
    // console.log(data)
    setPcomponen(data?.data?.requests);
    setTotalItems(data?.data?.totalItems);
    setTotalPage(data?.data?.totalPages);
    var pageList = [];
    for (let i = 1; i <= data?.data?.totalPages; i++) {
      pageList.push(i);
    }
    setAllPages(pageList);
    setIncomes(data?.data?.requests?.incomes);
  };

  useEffect(() => {
    inAwait();
  }, []);
  console.log(incomes);

  const handleCollapse = (id) => {
    if (id) {
      setCurrent(id);
      setActive(!Active);
    }
  };
  const exportExcel = async () => {
    if (pcomponen.length > 0) {
      var wb = XLSX.utils.book_new();
      var data = [];

      await pcomponen.map((app) => {
        data.push({
          Name: app?.employee?.firstName,
          Position: app?.employee?.jobposition?.name,
          "Employee Status": app?.employee?.employeestatus?.name,
          "Basic Salary": rupiah(app.basic_salary),
          "Tunjangan Tetap": rupiah(app?.incomes?.tunjangan_tetap),
          "Tunjangan Tidak Tetap": rupiah(app?.incomes?.tunjangan_tidak_tetap),
          "Tunjangan Telekomunikasi": rupiah(
            app?.incomes?.tunjangan_telekomunikasi
          ),
          Late: rupiah(app?.deductions?.late),
          Absence: rupiah(app?.deductions?.late),
          "Potongan Lain Lain": rupiah(app?.deductions?.late),
          "BPJS Kesehatan": rupiah(app?.deductions?.bpjs_kesehatan),
          "BPJS Ketenagakerjaan": rupiah(app?.deductions?.bpjs_ketenagakerjaan),
          "Bonus Ceo": rupiah(app?.benefits?.bonus_ceo),
        });
      });

      var ws = XLSX.utils.json_to_sheet(data);

      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

      XLSX.writeFile(wb, `Payroll Component.xlsx`);
      console.log("Exported excel!");
    } else {
      alert("Data masih kosong");
    }
  };
  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };
  const previousPage = async () => {
    setCurrentPage((current) => current - 1);
    if (currentPage == 1) {
      setCurrentPage(1);
    }
    const getPc = await GetPayrolComponent({ page: currentPage, size: 10 });
    setPcomponen(getPc.requests);
  };

  const nextPage = async () => {
    setCurrentPage((current) => current + 1);
    if (currentPage == totalPage) {
      setCurrentPage(1);
    }
    const getPc = await GetPayrolComponent({ page: currentPage, size: 10 });
    setPcomponen(getPc.requests);
  };

  const changePage = async (value) => {
    const getPc = await GetPayrolComponent({ page: value, size: 10 });
    setPcomponen(getPc.requests);
  };
  const AddToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      style={{
        borderRadius: "6px",
        border: "1px solid #A9A9A9",
        color: "#ffff",
        fontSize: "14px",
        fontWeight: "500",
        backgroundColor: "#0E5073",
      }}
      className=' btn d-flex align-items-center'
      href=''
      ref={ref}
      // style={{
      //   color: "#003049",
      // }}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <Plus className='me-2' color='#ffff' size={16} weight='bold' />
      Add Payroll Component
      {children}
    </a>
  ));
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
  ];

  return (
    <>
      <div className='bg-white rounded-xl'>
        <div className='px-6 pt-9 '>
          <div className='flex justify-between items-center'>
            <div>
              <h1 className='text-black'>Payroll Component</h1>
              <h1 className='text-xs text-[#737373]'>Payroll Setting</h1>
            </div>
          </div>
          <div className='flex pt-4 justify-between items-center gap-2'>
            <button
              onClick={() => {
                exportExcel();
              }}
              style={{
                borderRadius: "6px",
                border: "1px solid #A9A9A9",
                color: "#0E5073",
                fontSize: "14px",
                fontWeight: "500",
                backgroundColor: "#ffff",
              }}
              className='me-3 btn d-flex align-items-center'
            >
              <FileArrowUp
                className='me-2'
                color='#0E5073'
                size={16}
                weight='bold'
              />
              Export
            </button>
            <div className='flex items-center gap-2'>
              <div className='relative'>
                <Search className='absolute top-2 left-2 text-[#A8A8A8]' />
                <input
                  type='text'
                  id='table-search'
                  className='text-sm rounded-md pl-10 border-[#A8A8A8] text-[#A8A8A8] focus:ring-0'
                  placeholder='Search...'
                />
              </div>
              {/* <button
              onClick={() => setAdd(!add)}
              style={{
                borderRadius: "6px",
                border: "1px solid #A9A9A9",
                color: "#ffff",
                fontSize: "14px",
                fontWeight: "500",
                backgroundColor: "#0E5073",
              }}
              className="me-3 btn d-flex align-items-center"
            >
              <Plus className="me-2" color="#ffff" size={16} weight="bold" />
              Add Payroll Component
            </button> */}
              <Dropdown id='dropdown-menu-align-end' align='end'>
                <Dropdown.Toggle
                  as={AddToggle}
                  id='dropdown-menu-align-end'
                  align='end'
                />
                <Dropdown.Menu size='sm'>
                  <Dropdown.Item
                    className='text-sm'
                    onClick={() => {
                      setAdd(!add);
                    }}
                  >
                    Add Payroll Component
                  </Dropdown.Item>
                  <Dropdown.Item
                    className='text-sm'
                    onClick={async () => {
                      navigate("/payroll/payroll-component/bulk-upload");
                    }}
                  >
                    Bulk Payroll Component
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className='mt-2 relative'>
            <div className='table-responsive '>
              <div className='w-full bg-[#EBF7FF] px-4 py-2 flex items-center gap-3 rounded-md '>
                <div className='min-w-[200px] max-w-[200px]'>
                  <div className='w-full flex items-center gap-2'>
                    <h1 className='text-[#737373] text-xs'>Employee</h1>
                    <ImportExport
                      fontSize='2px'
                      className='mt-0.5 text-[#737373]'
                    />
                  </div>
                </div>
                <div className='min-w-[140px] max-w-[140px]'>
                  <div className='w-full flex items-center gap-2'>
                    <h1 className='text-[#737373] text-xs'>Basic Salary</h1>
                    <ImportExport
                      fontSize='2px'
                      className='mt-0.5 text-[#737373]'
                    />
                  </div>
                </div>
                <div className='min-w-[140px] max-w-[140px]'>
                  <div className='w-full flex items-center gap-2'>
                    <h1 className='text-[#737373] text-xs'>Total Income</h1>
                    <ImportExport
                      fontSize='2px'
                      className='mt-0.5 text-[#737373]'
                    />
                  </div>
                </div>
                <div className='min-w-[140px] max-w-[140px]'>
                  <div className='w-full flex items-center gap-2'>
                    <h1 className='text-[#737373] text-xs'>Total Deduction</h1>
                    <ImportExport
                      fontSize='2px'
                      className='mt-0.5 text-[#737373]'
                    />
                  </div>
                </div>
                <div className='min-w-[140px] max-w-[140px]'>
                  <div className='w-full flex items-center gap-2'>
                    <h1 className='text-[#737373] text-xs'>Total Benefit</h1>
                    <ImportExport
                      fontSize='2px'
                      className='mt-0.5 text-[#737373]'
                    />
                  </div>
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
              {pcomponen.length > 0 ? (
                pcomponen.map((x, i) => {
                  var totincome =
                    x?.incomes?.tunjangan_tetap +
                    x?.incomes?.tunjangan_tidak_tetap +
                    x?.incomes?.tunjangan_telekomunikasi;
                  var totdeductions =
                    x?.deductions?.late +
                    x?.deductions?.late +
                    x?.deductions?.late;
                  var totbenefit =
                    x?.deductions?.bpjs_kesehatan +
                    x?.deductions?.bpjs_ketenagakerjaan +
                    x?.benefits?.bonus_ceo;
                  return (
                    <div>
                      <div
                        className={`px-4 py-2 mt-2 flex items-center gap-3 border ${
                          x.id === Current && !Active
                            ? "rounded-t-md"
                            : "rounded-md"
                        } w-full`}
                      >
                        <div className='min-w-[200px] max-w-[200px] pr-2'>
                          <h1 className='text-xs truncate text-[#737373]'>
                            {x?.employee?.firstName}
                          </h1>
                          <h1 className='text-[10px] text-[#CACACA]'>
                            {x?.employee?.jobposition?.name}
                          </h1>
                          <h1 className='text-[10px] text-[#A8A8A8]'>
                            {x?.employee?.employeestatus?.name}
                          </h1>
                        </div>
                        <div className='min-w-[140px] max-w-[140px]'>
                          <h1 className='text-xs truncate text-[#737373]'>
                            {/* Rp {x.basic_salary} */}
                            {rupiah(x.basic_salary)}
                          </h1>
                        </div>
                        <div className='min-w-[140px] max-w-[140px]'>
                          <h1 className='text-xs truncate text-[#737373]'>
                            {rupiah(x?.totalIncome)}
                          </h1>
                        </div>
                        <div className='min-w-[140px] max-w-[140px]'>
                          <h1 className='text-xs truncate text-[#737373]'>
                            {rupiah(x?.totalDeduction)}
                          </h1>
                        </div>
                        <div className='min-w-[140px] max-w-[140px]'>
                          <h1 className='text-xs truncate text-[#737373]'>
                            {rupiah(x?.totalBenefit)}
                          </h1>
                        </div>
                        <div className='min-w-[100px] max-w-[100px] items-center justify-center flex gap-2'>
                          <button
                            className='flex items-center justify-center bg-[#CEDFEA] rounded-md w-8 h-8'
                            onClick={() => setEditActive(!editActive)}
                          >
                            <EditOutlined fontSize='10px' />
                          </button>
                          <button
                            className='flex items-center justify-center bg-[#CEDFEA] rounded-md w-8 h-8'
                            onClick={() => {
                              setDelete(true);
                              setId(x.id);
                            }}
                          >
                            <Trash fontSize='14px' />
                          </button>
                        </div>
                        <div className='min-w-[50px] max-w-[50px] flex items-center justify-end'>
                          <button onClick={() => handleCollapse(x.id)}>
                            {x.id === Current && !Active ? (
                              <KeyboardArrowUp />
                            ) : (
                              <KeyboardArrowDown />
                            )}
                          </button>
                        </div>
                      </div>
                      <div
                        className={`w-full rounded-b-md bg-[#F9F9F9] transition-all ease-in-out duration-500 overflow-hidden ${
                          x.id === Current && !Active ? "h-48" : "h-0"
                        }`}
                      >
                        <div className='grid grid-cols-12 gap-5 p-4'>
                          <div className='col-span-4'>
                            <h1 className='text-[#737373] text-sm'>
                              Detail Income
                            </h1>
                            {
                              x.incomes.map((val) => {
                                console.log(val)
                                return(
                                  <>
                                    <div className='grid grid-cols-12 gap-2 mt-2'>
                                      <div className='col-span-7 text-xs text-[#A8A8A8]'>
                                        {val?.name}
                                      </div>
                                      <div className='col-span-1 text-xs text-[#A8A8A8]'>
                                        :
                                      </div>
                                      <div className='col-span-4 text-xs text-[#A8A8A8]'>
                                        {/* Rp {x?.incomes?.tunjangan_tetap} */}
                                        {rupiah(val?.value)}
                                      </div>
                                    </div>
                                  </>
                                )
                              })
                            }
                          </div>
                          <div className='col-span-4'>
                            <h1 className='text-[#737373] text-sm'>
                              Detail Deduction
                            </h1>
                              {
                                x.deductions.map((val)=> {
                                  return(
                                    <>
                                    <div className='grid grid-cols-12 gap-2 mt-2'>
                                    <div className='col-span-6 text-xs text-[#A8A8A8]'>
                                      {val.name}
                                    </div>
                                    <div className='col-span-1 text-xs text-[#A8A8A8]'>
                                      :
                                    </div>
                                    <div className='col-span-5 text-xs text-[#A8A8A8]'>
                                    {rupiah(val?.value)}
                                    </div>
                                    </div>
                                    </>
                                  )
                                })
                              }
                          </div>
                          <div className='col-span-4'>
                            <h1 className='text-[#737373] text-sm'>
                              Detail Benefit
                            </h1>
                            {
                                x.benefits.map((val)=> {
                                  return(
                                    <>
                                    <div className='grid grid-cols-12 gap-2 mt-2'>
                                    <div className='col-span-6 text-xs text-[#A8A8A8]'>
                                      {val.name}
                                    </div>
                                    <div className='col-span-1 text-xs text-[#A8A8A8]'>
                                      :
                                    </div>
                                    <div className='col-span-5 text-xs text-[#A8A8A8]'>
                                    {rupiah(val?.value)}
                                    </div>
                                    </div>
                                    </>
                                  )
                                })
                              }
                            <div className='grid grid-cols-12 gap-2 mt-8'>
                              <div className='col-span-6 text-sm font-bold'>
                                Total Pay
                              </div>
                              <div className='col-span-1 text-sm font-bold'>
                                :
                              </div>
                              <div className='col-span-5 text-sm font-bold'>
                                {rupiah(x.totalIncome + x.totalDeduction + x.totalBenefit)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className='flex justify-center text-[#A8A8A8] font-[400]'>
                  No data
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='w-full rounded-b-xl bg-[#FBFBFB] h-16 px-6 justify-between items-center flex'>
          <div>
            <h1 className='text-[10px] text-[#A098AE]'>
              Showing <span>{pcomponen.length}</span>
              from<span>{totalItems}</span>data
            </h1>
          </div>
          <div className='flex items-center gap-2'>
            <button className='btn btn-sm' onClick={() => previousPage()}>
              <KeyboardArrowLeft />
            </button>
            {/* <button className="bg-[#780000] bg-opacity-10 rounded-md w-6 h-6 flex items-center justify-center text-[10px] text-[#780000]">
            1
          </button>
          <button className="bg-[#780000] rounded-md w-6 h-6 flex items-center justify-center text-[10px] text-white">
            2
          </button>
          <button className="bg-[#780000] bg-opacity-10 rounded-md w-6 h-6 flex items-center justify-center text-[10px] text-[#780000]">
            3
          </button> */}
            {allPages.map((page) => (
              <button
                onClick={() => changePage(page)}
                className='bg-[#780000] bg-opacity-10 rounded-md w-6 h-6 flex items-center justify-center text-[10px] text-[#780000]'
              >
                {page}
              </button>
            ))}
            <button className='btn btn-sm' onClick={() => nextPage()}>
              <KeyboardArrowRight />
            </button>
          </div>
        </div>
      </div>
      <Modal open={editActive} onClose={() => setEditActive(!editActive)}>
        <Dialog
          open={editActive}
          onClose={() => setEditActive(!editActive)}
          scroll='body'
          fullWidth={true}
          maxWidth='md'
        >
          <div className='p-4 flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <h1>Edit Component for Run Payroll</h1>
              <button onClick={() => setEditActive(!editActive)}>
                <Close />
              </button>
            </div>
            <div>
              <h1 className='text-[11px] text-[#737373]'>Employee</h1>
              <h1 className='text-sm text-black'>
                Muhammad Hidayat Syarifuddin Tirto Satria
              </h1>
            </div>
            <div>
              <input
                type='text'
                className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0'
                placeholder='Rp.'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <div
                className={`flex flex-col ${
                  income ? "gap-3" : "gap-0"
                } bg-[#FAFAFA] border border-[#CACACA] rounded-md w-full px-9 py-3`}
              >
                <div
                  className='flex items-center justify-between'
                  onClick={() => setIncome(!income)}
                >
                  <h1 className='text-sm text-[#5C5C5C]'>Income</h1>
                  <button onClick={() => setIncome(!income)}>
                    <ArrowDropDown className='text-[#5C5C5C]' />
                  </button>
                </div>
                <div
                  className={`${
                    income ? "h-[200px]" : "h-0"
                  } overflow-hidden transition-[height] ease-in-out duration-500`}
                >
                  <div className='grid grid-cols-12 items-center mb-3'>
                    <div className='col-span-4'>
                      <h1 className='text-xs text-[#5C5C5C]'>
                        Tunjangan Tetap{" "}
                      </h1>
                    </div>
                    <div className='col-span-8'>
                      <input
                        type='text'
                        className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0'
                        placeholder='Rp.'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-12 items-center mb-3'>
                    <div className='col-span-4'>
                      <h1 className='text-xs text-[#5C5C5C]'>
                        Tunjangan Tidak Tetap{" "}
                      </h1>
                    </div>
                    <div className='col-span-8'>
                      <input
                        type='text'
                        className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0'
                        placeholder='Rp.'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-12 items-center mb-3'>
                    <div className='col-span-4'>
                      <h1 className='text-xs text-[#5C5C5C]'>
                        Tunjangan Telekomunikasi
                      </h1>
                    </div>
                    <div className='col-span-8'>
                      <input
                        type='text'
                        className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0'
                        placeholder='Rp.'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-12 items-center mb-3'>
                    <div className='col-span-4'>
                      <h1 className='text-xs text-[#5C5C5C]'>Overtime</h1>
                    </div>
                    <div className='col-span-8'>
                      <input
                        type='text'
                        className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0'
                        placeholder='Rp.'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`flex flex-col ${
                  deduction ? "gap-3" : "gap-0"
                } bg-[#FAFAFA] border border-[#CACACA] rounded-md w-full px-9 py-3`}
              >
                <div
                  className='flex items-center justify-between'
                  onClick={() => setDeduction(!deduction)}
                >
                  <h1 className='text-sm text-[#5C5C5C]'>Deductions</h1>
                  <button onClick={() => setDeduction(!deduction)}>
                    <ArrowDropDown className='text-[#5C5C5C]' />
                  </button>
                </div>
                <div
                  className={`${
                    deduction ? "h-[200px]" : "h-0"
                  } overflow-hidden transition-[height] ease-in-out duration-500`}
                >
                  <div className='grid grid-cols-12 items-center mb-3'>
                    <div className='col-span-4'>
                      <h1 className='text-xs text-[#5C5C5C]'>
                        BPJS Kesehatan{" "}
                      </h1>
                    </div>
                    <div className='col-span-8'>
                      <input
                        type='text'
                        className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0'
                        placeholder='Rp.'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-12 items-center mb-3'>
                    <div className='col-span-4'>
                      <h1 className='text-xs text-[#5C5C5C]'>
                        BPJS Ketenagakerjaan{" "}
                      </h1>
                    </div>
                    <div className='col-span-8'>
                      <input
                        type='text'
                        className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0'
                        placeholder='Rp.'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-12 items-center mb-3'>
                    <div className='col-span-4'>
                      <h1 className='text-xs text-[#5C5C5C]'>Late</h1>
                    </div>
                    <div className='col-span-8'>
                      <input
                        type='text'
                        className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0'
                        placeholder='Rp.'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-12 items-center mb-3'>
                    <div className='col-span-4'>
                      <h1 className='text-xs text-[#5C5C5C]'>
                        Izin Tak dibayar
                      </h1>
                    </div>
                    <div className='col-span-8'>
                      <input
                        type='text'
                        className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0'
                        placeholder='Rp.'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`flex flex-col ${
                  benefit ? "gap-3" : "gap-0"
                } bg-[#FAFAFA] border border-[#CACACA] rounded-md w-full px-9 py-3`}
              >
                <div
                  className='flex items-center justify-between'
                  onClick={() => setBenefit(!benefit)}
                >
                  <h1 className='text-sm text-[#5C5C5C]'>Benefit</h1>
                  <button onClick={() => setBenefit(!benefit)}>
                    <ArrowDropDown className='text-[#5C5C5C]' />
                  </button>
                </div>
                <div
                  className={`${
                    benefit ? "h-[200px]" : "h-0"
                  } overflow-hidden transition-[height] ease-in-out duration-500`}
                >
                  <div className='grid grid-cols-12 items-center mb-3'>
                    <div className='col-span-4'>
                      <h1 className='text-xs text-[#5C5C5C]'>Bonus </h1>
                    </div>
                    <div className='col-span-8'>
                      <input
                        type='text'
                        className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0'
                        placeholder='Rp.'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-12 items-center mb-3'>
                    <div className='col-span-4'>
                      <h1 className='text-xs text-[#5C5C5C]'>Bonus CEO </h1>
                    </div>
                    <div className='col-span-8'>
                      <input
                        type='text'
                        className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0'
                        placeholder='Rp.'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-12 items-center mb-3'>
                    <div className='col-span-4'>
                      <h1 className='text-xs text-[#5C5C5C]'>Bonus Progress</h1>
                    </div>
                    <div className='col-span-8'>
                      <input
                        type='text'
                        className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0'
                        placeholder='Rp.'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-12 items-center mb-3'>
                    <div className='col-span-4'>
                      <h1 className='text-xs text-[#5C5C5C]'>Bonus Pulsa</h1>
                    </div>
                    <div className='col-span-8'>
                      <input
                        type='text'
                        className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0'
                        placeholder='Rp.'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex items-center justify-end gap-3'>
              <button
                className='bg-[#ECECEC] w-[100px] h-[38px] text-center rounded-md text-[#003049]'
                onClick={() => setEditActive(!editActive)}
              >
                Cancel
              </button>
              <button
                className='bg-[#0E5073] w-[100px] h-[38px] text-center rounded-md text-white'
                onClick={() => setEditActive(!editActive)}
              >
                Save
              </button>
            </div>
          </div>
        </Dialog>
      </Modal>
      <Modal open={add} onClose={() => setAdd(!add)}>
        <Dialog
          open={add}
          onClose={() => setAdd(!add)}
          scroll='body'
          fullWidth={true}
          maxWidth='md'
        >
          <div className='p-4 flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <h1>Edit Component for Run Payroll</h1>
              <button onClick={() => setAdd(!add)}>
                <Close />
              </button>
            </div>
            <div>
              <h1 className='text-[11px] text-[#737373]'>Employee</h1>
              <h1 className='text-sm text-black'>...</h1>
            </div>
            <div>
              <input
                type='text'
                className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0'
                placeholder='Rp.'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <div
                className={`flex flex-col ${
                  income ? "gap-3" : "gap-0"
                } bg-[#FAFAFA] border border-[#CACACA] rounded-md w-full px-9 py-3`}
              >
                <div
                  className='flex items-center justify-between'
                  onClick={() => setIncome(!income)}
                >
                  <h1 className='text-sm text-[#5C5C5C]'>Income</h1>
                  <button onClick={() => setIncome(!income)}>
                    <ArrowDropDown className='text-[#5C5C5C]' />
                  </button>
                </div>
                <div
                  className={`${
                    income ? "h-[200px]" : "h-0"
                  } overflow-hidden transition-[height] ease-in-out duration-500`}
                >
                  <div className='grid grid-cols-12 items-center mb-3'>
                    <div className='col-span-4'>
                      <h1 className='text-xs text-[#5C5C5C]'>
                        Tunjangan Tetap{" "}
                      </h1>
                    </div>
                    <div className='col-span-8'>
                      <input
                        type='text'
                        className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0'
                        placeholder='Rp.'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-12 items-center mb-3'>
                    <div className='col-span-4'>
                      <h1 className='text-xs text-[#5C5C5C]'>
                        Tunjangan Tidak Tetap{" "}
                      </h1>
                    </div>
                    <div className='col-span-8'>
                      <input
                        type='text'
                        className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0'
                        placeholder='Rp.'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-12 items-center mb-3'>
                    <div className='col-span-4'>
                      <h1 className='text-xs text-[#5C5C5C]'>
                        Tunjangan Telekomunikasi
                      </h1>
                    </div>
                    <div className='col-span-8'>
                      <input
                        type='text'
                        className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0'
                        placeholder='Rp.'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-12 items-center mb-3'>
                    <div className='col-span-4'>
                      <h1 className='text-xs text-[#5C5C5C]'>Overtime</h1>
                    </div>
                    <div className='col-span-8'>
                      <input
                        type='text'
                        className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0'
                        placeholder='Rp.'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`flex flex-col ${
                  deduction ? "gap-3" : "gap-0"
                } bg-[#FAFAFA] border border-[#CACACA] rounded-md w-full px-9 py-3`}
              >
                <div
                  className='flex items-center justify-between'
                  onClick={() => setDeduction(!deduction)}
                >
                  <h1 className='text-sm text-[#5C5C5C]'>Deductions</h1>
                  <button onClick={() => setDeduction(!deduction)}>
                    <ArrowDropDown className='text-[#5C5C5C]' />
                  </button>
                </div>
                <div
                  className={`${
                    deduction ? "h-[200px]" : "h-0"
                  } overflow-hidden transition-[height] ease-in-out duration-500`}
                >
                  <div className='grid grid-cols-12 items-center mb-3'>
                    <div className='col-span-4'>
                      <h1 className='text-xs text-[#5C5C5C]'>
                        BPJS Kesehatan{" "}
                      </h1>
                    </div>
                    <div className='col-span-8'>
                      <input
                        type='text'
                        className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0'
                        placeholder='Rp.'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-12 items-center mb-3'>
                    <div className='col-span-4'>
                      <h1 className='text-xs text-[#5C5C5C]'>
                        BPJS Ketenagakerjaan{" "}
                      </h1>
                    </div>
                    <div className='col-span-8'>
                      <input
                        type='text'
                        className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0'
                        placeholder='Rp.'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-12 items-center mb-3'>
                    <div className='col-span-4'>
                      <h1 className='text-xs text-[#5C5C5C]'>Late</h1>
                    </div>
                    <div className='col-span-8'>
                      <input
                        type='text'
                        className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0'
                        placeholder='Rp.'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-12 items-center mb-3'>
                    <div className='col-span-4'>
                      <h1 className='text-xs text-[#5C5C5C]'>
                        Izin Tak dibayar
                      </h1>
                    </div>
                    <div className='col-span-8'>
                      <input
                        type='text'
                        className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0'
                        placeholder='Rp.'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`flex flex-col ${
                  benefit ? "gap-3" : "gap-0"
                } bg-[#FAFAFA] border border-[#CACACA] rounded-md w-full px-9 py-3`}
              >
                <div
                  className='flex items-center justify-between'
                  onClick={() => setBenefit(!benefit)}
                >
                  <h1 className='text-sm text-[#5C5C5C]'>Benefit</h1>
                  <button onClick={() => setBenefit(!benefit)}>
                    <ArrowDropDown className='text-[#5C5C5C]' />
                  </button>
                </div>
                <div
                  className={`${
                    benefit ? "h-[200px]" : "h-0"
                  } overflow-hidden transition-[height] ease-in-out duration-500`}
                >
                  <div className='grid grid-cols-12 items-center mb-3'>
                    <div className='col-span-4'>
                      <h1 className='text-xs text-[#5C5C5C]'>Bonus </h1>
                    </div>
                    <div className='col-span-8'>
                      <input
                        type='text'
                        className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0'
                        placeholder='Rp.'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-12 items-center mb-3'>
                    <div className='col-span-4'>
                      <h1 className='text-xs text-[#5C5C5C]'>Bonus CEO </h1>
                    </div>
                    <div className='col-span-8'>
                      <input
                        type='text'
                        className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0'
                        placeholder='Rp.'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-12 items-center mb-3'>
                    <div className='col-span-4'>
                      <h1 className='text-xs text-[#5C5C5C]'>Bonus Progress</h1>
                    </div>
                    <div className='col-span-8'>
                      <input
                        type='text'
                        className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0'
                        placeholder='Rp.'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-12 items-center mb-3'>
                    <div className='col-span-4'>
                      <h1 className='text-xs text-[#5C5C5C]'>Bonus Pulsa</h1>
                    </div>
                    <div className='col-span-8'>
                      <input
                        type='text'
                        className='text-sm rounded-md w-[473px] border-[#A8A8A8] text-[#A8A8A8] focus:ring-0'
                        placeholder='Rp.'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex items-center justify-end gap-3'>
              <button
                className='bg-[#ECECEC] w-[100px] h-[38px] text-center rounded-md text-[#003049]'
                onClick={() => setAdd(!add)}
              >
                Cancel
              </button>
              <button
                className='bg-[#0E5073] w-[100px] h-[38px] text-center rounded-md text-white'
                onClick={() => setAdd(!add)}
              >
                Save
              </button>
            </div>
          </div>
        </Dialog>
      </Modal>
      <ModalDelete
        close={() => {
          setDelete(false);
        }}
        submit={async () => {
          await DeletePayrollComponent(id);
          inAwait();
          setDelete(false);
          SwalSuccess({ message: "Success delete Payroll Component" });
        }}
        active={isdelete}
      />
    </>
  );
};

export default PayrollComponent;
