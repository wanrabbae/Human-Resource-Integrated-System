import {
  EditOutlined,
  ImportExport,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { Check, Plus, X } from "phosphor-react";
import {
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Select from "react-select";
import { GetEmployeeName } from "../../../../../Repository/EmployeeRepository";
import {
  getCompanyLocation,
  GetJobGrade,
  GetJobLevel,
  GetJobPosition,
  GetJobTittle,
} from "../../../../../Repository/AdminRepository";
import {
  AddComponentPayroll,
  AddSetBpjs,
  DeleteComponentPayroll,
  GetComponentPayroll,
  GetSetBpjs,
  UpdateComponentPayroll,
} from "../../../../../Repository/PayrollRepository";
import { LoadingDialog } from "../../../../../Components/Modals";

function THP() {
  const [isLoading, setLoading] = useState(false);
  const [addincome, setAddincome] = useState(false);
  const [editincome, setEditincome] = useState(false);
  const [selected, setSelected] = useState([]);
  const [bpjs, setBPJS] = useState(false);
  const [addbpjs, setAddBPJS] = useState(false);
  const [editbpjs, setEditBPJS] = useState(false);
  const [isWork, setWork] = useState(false);
  const [isCallender, setCallender] = useState(false);
  const [isAll, setAll] = useState(false);
  const [isEmp, setEmp] = useState(false);
  const [isFilter, setFilter] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [jposi, setJobPosi] = useState([]);
  const [jgrade, setJobGrade] = useState([]);
  const [jlevel, setJobLevel] = useState([]);
  const [jtitle, setJobtitle] = useState([]);
  const [databpjs, setDatabpjs] = useState([]);
  const [editval, setEditValues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [allPages, setAllPages] = useState([]);
  const [locations, setLocations] = useState([]);
  const [isCount, setCount] = useState(0);
  const [editController, setEditController] = useState({});

  const [nppname, setNppname] = useState("");
  const [nppnumber, setNppnumber] = useState("");
  const [branch, setBranch] = useState("");
  const [jkk, setJKK] = useState("");

  const [incomes, setIncomes] = useState([]);
  const [deductions, setDeductions] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [type, setType] = useState(String);

  const inAwait = async (_count = null) => {
    let counting = _count ?? isCount;
    setCount((counting += 1));
    let jgradeoption = [];
    let jlevoption = [];
    let jtitoption = [];
    let jposoption = [];
    let _incomes = [];
    let _deduction = [];
    let _benefit = [];
    let data = await GetSetBpjs({ page: 1, size: 10 });
    let _component = await GetComponentPayroll();
    for (let i = 0; i < _component?.data.length; i++) {
      let rows = _component?.data[i];
      rows["status"] = rows["sub_type"];
      rows["changes"] = "update";

      if (rows?.type == "income") {
        _incomes.push(rows);
      } else if (rows?.type == "deduction") {
        _deduction.push(rows);
      } else {
        _benefit.push(rows);
      }
    }
    if (isCount >= 1 && isCount <= 3) {
      console.log(_component?.data);
      setIncomes(_incomes);
      setDeductions(_deduction);
      setBenefits(_benefit);
    }
    setDatabpjs(data?.data?.requests);
    setTotalItems(data?.data?.totalItems);
    setTotalPage(data?.data?.totalPages);
    let pageList = [];
    for (let i = 1; i <= data?.data?.totalPages; i++) {
      pageList.push(i);
    }
    setAllPages(pageList);
    let emp = await GetEmployeeName();
    setEmployee(emp);
    let jgra = await GetJobGrade();
    jgra.map((em) => jgradeoption.push({ value: em.id, label: em.name }));
    setJobGrade(jgradeoption);
    let jlev = await GetJobLevel();
    jlev.map((em) => jlevoption.push({ value: em.id, label: em.name }));
    setJobLevel(jlevoption);
    let jtit = await GetJobTittle();
    jtit.map((em) => jtitoption.push({ value: em.id, label: em.name }));
    setJobtitle(jtitoption);
    let jpos = await GetJobPosition();
    jpos?.result.map((em) => jposoption.push({ value: em.id, label: em.name }));
    setJobPosi(jposoption);
    let rec = await getCompanyLocation();
    setLocations(rec);
  };

  const previousPage = async () => {
    setCurrentPage((current) => current - 1);
    if (currentPage == 1) {
      setCurrentPage(1);
    }
    let data = await GetSetBpjs({ page: currentPage, size: 10 });
    setDatabpjs(data?.data?.requests);
  };

  const nextPage = async () => {
    setCurrentPage((current) => current + 1);
    if (currentPage == totalPage) {
      setCurrentPage(1);
    }
    let data = await GetSetBpjs({ page: currentPage, size: 10 });
    setDatabpjs(data?.data?.requests);
  };

  const changePage = async (value) => {
    let data = await GetSetBpjs({ page: value, size: 10 });
    setDatabpjs(data?.data?.requests);
  };

  useEffect(() => {
    inAwait();
  }, [employee]);

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          let _incomes = incomes;
          let _deduction = deductions;
          let _benefit = benefits;
          let data;
          setLoading(true);
          for (let i = 0; i < _incomes.length; i++) {
            _incomes[i]["delegated_to"] = JSON.stringify(
              _incomes[i]["delegated_to"]
            );
            if (_incomes[i]["changes"] == "update") {
              data = await UpdateComponentPayroll(_incomes[i]);
            } else if (_incomes[i]["changes"] == "insert") {
              data = await AddComponentPayroll(_incomes[i]);
            } else if (_incomes[i]["changes"] == "delete") {
              data = await DeleteComponentPayroll(_incomes[i]["id"]);
            }
          }
          for (let i = 0; i < _deduction.length; i++) {
            _deduction[i]["delegated_to"] = JSON.stringify(
              _deduction[i]["delegated_to"]
            );
            if (_deduction[i]["changes"] == "update") {
              data = await UpdateComponentPayroll(_deduction[i]);
            } else if (_deduction[i]["changes"] == "insert") {
              data = await AddComponentPayroll(_deduction[i]);
            } else if (_deduction[i]["changes"] == "delete") {
              data = await DeleteComponentPayroll(_deduction[i]["id"]);
            }
          }
          for (let i = 0; i < _benefit.length; i++) {
            _benefit[i]["delegated_to"] = JSON.stringify(
              _benefit[i]["delegated_to"]
            );
            if (_benefit[i]["changes"] == "update") {
              data = await UpdateComponentPayroll(_benefit[i]);
            } else if (_benefit[i]["changes"] == "insert") {
              data = await AddComponentPayroll(_benefit[i]);
            } else if (_benefit[i]["changes"] == "delete") {
              data = await DeleteComponentPayroll(_benefit[i]["id"]);
            }
          }
          await inAwait(0);
          setLoading(false);
        }}
      >
        <div>
          <div className="flex flex-col gap-1 mb-5">
            <h1 className="text-[18px] text-[#272B30] font-semibold">
              Take Home Pay Setting
            </h1>
            <h1 className="text-[#737373] text-xs">Setting Menu for Payroll</h1>
          </div>
          <div className="border-b border-[#A8A8A8] py-2">
            <div className="flex flex-col gap-1 mb-3">
              <h1 className="text-[15px] text-[#282828] font-semibold">
                Prorate Setting
              </h1>
            </div>
            <div>
            <FormControl
                    sx={{
                      width: "100%",
                    }}
                  >
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                    >
                      <div className="flex align-center justify-between">
                        <FormControlLabel
                          value="Custom on Working Day"
                          control={<Radio />}
                          label="Custom on Working Day"
                          checked={isWork}
                          onChange={async () => {
                            setWork(true);
                            setCallender(false)
                            setSelected([]);
                          }}
                        />
                        <div 
                          style={{
                            display: isWork ? "block" : !isWork ? "none" : "none",
                          }}
                          >
                            <div className="form-group">
                              <label className="mb-1">
                              Custom Number
                              </label>
                              <input
                                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  id="name"
                                  required
                                  // onChange={(e) => setThr({...dtthr, new_employee_month: e.target.value})}
                                  placeholder="0"
                              />
                          </div>
                        </div>
                      </div>
                      <div className="flex align-center justify-between">
                        <FormControlLabel
                          value="Custom on Calendar Day"
                          control={<Radio />}
                          label="Custom on Calendar Day"
                          checked={isCallender}
                          onChange={async () => {
                            setWork(false);
                            setCallender(true)
                            setSelected([]);
                          }}
                        />
                        <div 
                          style={{
                            display: isCallender ? "block" : !isCallender ? "none" : "none",
                          }}
                          >
                            <div className="form-group">
                              <label className="mb-1">
                              Custom Number
                              </label>
                              <input
                                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  id="name"
                                  required
                                  // onChange={(e) => setThr({...dtthr, new_employee_month: e.target.value})}
                                  placeholder="0"
                              />
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: isCallender ? "block" : !isCallender ? "none" : "none",
                        }}
                      >
                        <div className="form-check">
                          <input
                            onChange={(val) => {
                              // setPassword(!changePassword);
                            }}
                            id="count"
                            type="checkbox"
                            // value={changePassword}
                            className="form-check-input"
                          />
                          <label for="count" className="form-check-label">Count national holiday as a working day</label>
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
            </div>
          </div>
          <div className="border-b border-[#A8A8A8] pb-2 pt-[50px]">
            <h1 className="text-[15px] text-[#282828] font-semibold">
              Payroll Component
            </h1>
            <div className="grid grid-cols-12 gap-2 pt-7 pb-2">
              <div className="col-span-4 px-[9px] py-[10px] rounded-[10px] bg-[#ECECEC] max-h-[400px] min-h-[400px] flex flex-col justify-between">
                <div>
                  <div className="mb-6 bg-[#219EBC] py-[10px] w-full rounded-md text-center font-semibold text-white">
                    Income
                  </div>
                  <div className="flex-col flex gap-2">
                    <div className="d-block text-xs py-2 p-2 flex d-inline border border-[#454545] rounded">
                      Basic Salary
                    </div>
                    {incomes.map((e, i) => {
                      return e.changes != "delete" ? (
                        <div className="d-flex align-items-center" key={i}>
                          <div className="border border-[#454545] rounded">
                            <button
                              className="btn btn-sm text-xs"
                              type="button"
                              onClick={() => {
                                if (e.changes != "delete") {
                                  setEmp(
                                    e?.status == "employee" ? true : false
                                  );
                                  setFilter(
                                    e?.status == "filter" ? true : false
                                  );
                                  setAll(e?.status == "all" ? true : false);
                                  setEditController({
                                    id: e?.id,
                                    name: e?.name,
                                    amount: e?.amount,
                                    payment_period: e?.payment_period,
                                    tax: e?.tax,
                                    payment_date: e?.payment_date,
                                    delegated_to: e?.delegated_to,
                                    type: e?.type,
                                    status: e?.status,
                                    index: i,
                                    changes: e?.changes,
                                  });
                                  setSelected(e?.delegated_to);
                                  setEditincome(true);
                                }
                              }}
                            >
                              {e.name}
                            </button>
                            <button
                              onClick={() => {
                                if (e.changes == "insert") {
                                  setIncomes(
                                    incomes.filter((ele, index) => index !== i)
                                  );
                                } else if (e?.changes == "update") {
                                  incomes[i]["changes"] = "delete";
                                  setIncomes(incomes);
                                }
                              }}
                              type="button"
                              className="btn btn-sm"
                            >
                              <X className="text-[#C1121F]" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <></>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    className="flex item-center gap-2 bg-white text-sm rounded-md px-[10px] py-[10px]"
                    onClick={() => {
                      setAddincome(!addincome);
                      setType("income");
                    }}
                  >
                    <Plus className="mt-0.5" />
                    Add Income
                  </button>
                </div>
              </div>
              <div className="col-span-4 px-[9px] py-[10px] rounded-[10px] bg-[#ECECEC] max-h-[400px] min-h-[400px] flex flex-col justify-between">
                <div>
                  <div className="mb-6 bg-[#219EBC] py-[10px] w-full rounded-md text-center font-semibold text-white">
                    Deductions
                  </div>
                  <div className="flex-col flex gap-2">
                    <div className="d-block text-xs py-2 p-2 flex d-inline border border-[#454545] rounded">
                      Absence
                    </div>
                    {deductions.map((e, i) => {
                      return e.changes != "delete" ? (
                        <div className="d-flex align-items-center" key={i}>
                          <div className="border border-[#454545] rounded">
                            <button
                              className="btn btn-sm text-xs"
                              type="button"
                              onClick={() => {
                                if (e.changes != "delete") {
                                  setEmp(
                                    e?.status == "employee" ? true : false
                                  );
                                  setFilter(
                                    e?.status == "filter" ? true : false
                                  );
                                  setAll(e?.status == "all" ? true : false);
                                  setEditController({
                                    id: e?.id,
                                    name: e?.name,
                                    amount: e?.amount,
                                    payment_period: e?.payment_period,
                                    tax: e?.tax,
                                    payment_date: e?.payment_date,
                                    delegated_to: e?.delegated_to,
                                    type: e?.type,
                                    status: e?.status,
                                    index: i,
                                    changes: e?.changes,
                                  });
                                  setSelected(e?.delegated_to);
                                  setEditincome(true);
                                }
                              }}
                            >
                              {e.name}
                            </button>
                            <button
                              onClick={() => {
                                if (e.changes == "insert") {
                                  setDeductions(
                                    deductions.filter(
                                      (ele, index) => index !== i
                                    )
                                  );
                                } else if (e?.changes == "update") {
                                  deductions[i]["changes"] = "delete";
                                  setDeductions(deductions);
                                }
                              }}
                              type="button"
                              className="btn btn-sm"
                            >
                              <X className="text-[#C1121F]" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <></>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    className="flex item-center gap-2 bg-white text-sm rounded-md px-[10px] py-[10px]"
                    onClick={() => {
                      setAddincome(!addincome);
                      setType("deduction");
                    }}
                  >
                    <Plus className="mt-0.5" />
                    Add Deductions
                  </button>
                </div>
              </div>
              <div className="col-span-4 px-[9px] py-[10px] rounded-[10px] bg-[#ECECEC] max-h-[400px] min-h-[400px] flex flex-col justify-between">
                <div>
                  <div className="mb-6 bg-[#219EBC] py-[10px] w-full rounded-md text-center font-semibold text-white">
                    Benefit
                  </div>
                  <div className="flex-col flex gap-2">
                    <div className="d-block text-xs py-2 p-2 flex d-inline border border-[#454545] rounded">
                      BPJS Kesehatan
                    </div>
                    {benefits.map((e, i) => {
                      return e.changes != "delete" ? (
                        <div className="d-flex align-items-center" key={i}>
                          <div className="border border-[#454545] rounded">
                            <button
                              className="btn btn-sm text-xs"
                              type="button"
                              onClick={() => {
                                if (e.changes != "delete") {
                                  setEmp(
                                    e?.status == "employee" ? true : false
                                  );
                                  setFilter(
                                    e?.status == "filter" ? true : false
                                  );
                                  setAll(e?.status == "all" ? true : false);
                                  setEditController({
                                    id: e?.id,
                                    name: e?.name,
                                    amount: e?.amount,
                                    payment_period: e?.payment_period,
                                    tax: e?.tax,
                                    payment_date: e?.payment_date,
                                    delegated_to: e?.delegated_to,
                                    type: e?.type,
                                    status: e?.status,
                                    index: i,
                                    changes: e?.changes,
                                  });
                                  setSelected(e?.delegated_to);
                                  setEditincome(true);
                                }
                              }}
                            >
                              {e.name}
                            </button>
                            <button
                              onClick={() => {
                                if (e.changes == "insert") {
                                  setBenefits(
                                    benefits.filter((ele, index) => index !== i)
                                  );
                                } else if (e?.changes == "update") {
                                  benefits[i]["changes"] = "delete";
                                  setBenefits(benefits);
                                }
                              }}
                              type="button"
                              className="btn btn-sm"
                            >
                              <X className="text-[#C1121F]" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <></>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    className="flex item-center gap-2 bg-white text-sm rounded-md px-[10px] py-[10px]"
                    onClick={() => {
                      setAddincome(!addincome);
                      setType("benefit");
                    }}
                  >
                    <Plus className="mt-0.5" />
                    Add Benefit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-[#A8A8A8] pb-2 pt-[50px]">
            <h1 className="text-[15px] text-[#282828] font-semibold">
              BPJS Ketenagakerjaan Setting
            </h1>
            <div
              className="my-4 w-100 rounded-xl"
              style={{
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div className="p-4">
                <div className="flex justify-between items-center align-center">
                  <div className="flex items-center align-center ">
                    <div>
                      <h5>
                        <b>NPP BPJS Ketenagakerjaan</b>
                      </h5>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn"
                        onClick={() => {
                          setBPJS(true);
                        }}
                      >
                        <svg
                          width="10"
                          height="11"
                          viewBox="0 0 10 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.535 5.125L6.085 5.585C5.725 5.945 5.5 6.25 5.5 7H4.5V6.75C4.5 6.195 4.725 5.695 5.085 5.335L5.705 4.705C5.89 4.525 6 4.275 6 4C6 3.73478 5.89464 3.48043 5.70711 3.29289C5.51957 3.10536 5.26522 3 5 3C4.73478 3 4.48043 3.10536 4.29289 3.29289C4.10536 3.48043 4 3.73478 4 4H3C3 3.46957 3.21071 2.96086 3.58579 2.58579C3.96086 2.21071 4.46957 2 5 2C5.53043 2 6.03914 2.21071 6.41421 2.58579C6.78929 2.96086 7 3.46957 7 4C6.99928 4.42162 6.83217 4.82591 6.535 5.125ZM5.5 9H4.5V8H5.5M5 0.5C4.34339 0.5 3.69321 0.629329 3.08658 0.880602C2.47995 1.13188 1.92876 1.50017 1.46447 1.96447C0.526784 2.90215 0 4.17392 0 5.5C0 6.82608 0.526784 8.09785 1.46447 9.03553C1.92876 9.49983 2.47995 9.86812 3.08658 10.1194C3.69321 10.3707 4.34339 10.5 5 10.5C6.32608 10.5 7.59785 9.97322 8.53553 9.03553C9.47322 8.09785 10 6.82608 10 5.5C10 2.735 7.75 0.5 5 0.5Z"
                            fill="black"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <button
                    style={{
                      borderRadius: "10px",
                      backgroundColor: "#0E5073",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                    className="btn d-flex align-items-center text-white"
                    onClick={() => {
                      setAddBPJS(!addbpjs);
                    }}
                    type=""
                  >
                    <Plus size={15} className="me-2" weight="bold" />
                    Add
                  </button>
                </div>
                <br></br>
                <br></br>
                <Table
                  borderless
                  responsive
                  style={{ color: "#00000070", fontSize: "0.75rem" }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#EBF7FF" }}>
                      <th onClick={() => {}}>
                        NPP Name <ImportExport fontSize="2px" />
                      </th>
                      <th onClick={() => {}}>
                        NPP Number <ImportExport fontSize="2px" />
                      </th>
                      <th onClick={() => {}}>
                        Branch <ImportExport fontSize="2px" />
                      </th>
                      <th onClick={() => {}}>
                        JKK
                        <ImportExport fontSize="2px" />
                      </th>
                      <th onClick={() => {}}>
                        Action
                        <ImportExport fontSize="2px" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {databpjs.length > 0 ? (
                      databpjs.map((x) => {
                        return (
                          <tr>
                            <td className="align-middle">{x.npp_name}</td>
                            <td className="align-middle">{x.npp_number}</td>
                            <td className="align-middle">{x.branch}</td>
                            <td className="align-middle">{x.jkk} %</td>
                            <td className="align-middle">
                              <button
                                onClick={() => {
                                  setEditValues(x);
                                  setEditBPJS(true);
                                }}
                                className="btn btn-sm mx-1"
                                style={{
                                  backgroundColor: "#CEDFEA",
                                  borderRadius: "8px",
                                }}
                              >
                                <EditOutlined fontSize="10px" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center">
                          {" "}
                          No Data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
              <div className="bg-[#FBFBFB] mt-0 px-4 py-2 rounded-b-xl w-2/3 d-flex align-items-center justify-between ">
                <div>
                  <h6 className="text-[#A098AE] text-[10px]">
                    Showing{" "}
                    <span className="text-[#0E5073]">{databpjs.length}</span>{" "}
                    from <span className="text-[#0E5073]">{totalItems}</span>{" "}
                    data
                  </h6>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn btn-sm" onClick={() => previousPage()}>
                    <KeyboardArrowLeft />
                  </button>
                  {allPages.map((page) => (
                    <button
                      onClick={() => changePage(page)}
                      className="bg-[#780000] bg-opacity-10 rounded-md w-6 h-6 flex items-center justify-center text-[10px] text-[#780000]"
                    >
                      {page}
                    </button>
                  ))}
                  <button className="btn btn-sm" onClick={() => nextPage()}>
                    <KeyboardArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-[#A8A8A8] pb-2 pt-[50px] mb-5">
            <h1 className="text-[15px] text-[#282828] font-semibold">
              Cut Off Setting
            </h1>
            <div className="col-md-6 my-3">
              <div className="form-group">
                <label className="mb-1">
                  Employee Salary Tax Setting{" "}
                  <span className="text-danger">*</span>
                </label>
                <select
                  id="country"
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>Select Employee Salary Tax Setting</option>
                  <option>Gross</option>
                  <option>Gross Up</option>
                  <option>Netto</option>
                </select>
              </div>
            </div>
          </div>
          <button
            style={{
              borderRadius: "10px",
              backgroundColor: "#0E5073",
              fontSize: "14px",
              fontWeight: "500",
            }}
            className="btn px-3 d-flex align-items-center text-white"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>

      <Modal
        show={addincome}
        size="lg"
        onHide={() => {
          setAddincome(!addincome);
          setType();
          setSelected([]);
          setEmp(false);
          setAll(false);
          setFilter(false);
        }}
      >
        <Modal.Header
          closeButton
          className="m-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title>Add {type}</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            let requestBody = {
              id: null,
              name: document.getElementById("name").value,
              amount: document.getElementById("amount").value,
              payment_period: document.getElementById("payment").value,
              tax: document.getElementById("tax").value,
              payment_date: document.getElementById("payment_date").value,
              delegated_to: selected,
              type: type,
              sub_type:
                isEmp == true
                  ? "employee"
                  : isFilter == true
                  ? "filter"
                  : "all",
              status:
                isEmp == true
                  ? "employee"
                  : isFilter == true
                  ? "filter"
                  : "all",
              changes: "insert",
            };
            if (type == "income") {
              setIncomes([...incomes, requestBody]);
            } else if (type == "deduction") {
              setDeductions([...deductions, requestBody]);
            } else {
              setBenefits([...benefits, requestBody]);
            }
            setSelected([]);
            setEmp(false);
            setAll(false);
            setFilter(false);
            setType();
            setAddincome(!addincome);
            console.log(
              type == "income"
                ? incomes
                : type == "deduction"
                ? deductions
                : benefits
            );
          }}
        >
          <Modal.Body className="mx-4">
            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    {type} Name<span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    id="name"
                    required
                    placeholder={`${type} name...`}
                  />
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    Amount <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    id="amount"
                    required
                    placeholder="Nominal or Persentage"
                  />
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    Select Payment Type <span className="text-danger">*</span>
                  </label>
                  <select className="form-control" id="payment" required>
                    <option value="" hidden>
                      Select Payment Type
                    </option>
                    <option value="Monthly">Monthly </option>
                    <option value="Weekly">Weekly </option>
                    <option value="Daily">Daily </option>
                    <option value="One Time">One Time </option>
                  </select>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    Tax <span className="text-danger">*</span>
                  </label>
                  <select className="form-control" id="tax" required>
                    <option value="">Select Tax</option>
                    <option value="tax">Taxable</option>
                    <option value="nontax">Non Taxable </option>
                  </select>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label className="mb-1">Payment Date/Day</label>
                  <input
                    className="form-control border"
                    id="payment_date"
                    required
                    type="date"
                  />
                </div>
              </div>
              <div className="w-100"></div>
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <FormControl
                    sx={{
                      width: "100%",
                    }}
                  >
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="All Employee"
                        control={<Radio />}
                        label="All Employee"
                        checked={isAll}
                        onChange={async () => {
                          setEmp(false);
                          setFilter(false);
                          setAll(true);
                          setSelected([]);
                        }}
                      />
                      <FormControlLabel
                        value="Search by Employee"
                        control={<Radio />}
                        label="Search by Employee"
                        checked={isEmp}
                        onChange={async () => {
                          setEmp(true);
                          setFilter(false);
                          setAll(false);
                          setSelected([]);
                        }}
                      />
                      <select
                        required={isEmp}
                        style={{
                          display: isEmp ? "block" : !isEmp ? "none" : "none",
                        }}
                        onChange={(val) => {
                          let fromJson = JSON.parse(val.target.value);
                          let data = selected;
                          data.push({
                            name: fromJson[1],
                            id: fromJson[0],
                          });
                          setSelected(data);
                        }}
                        className="w-100 bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="" hidden>
                          Search Employee
                        </option>
                        {employee.map((val) => {
                          return (
                            <option
                              hidden={
                                selected.find((e, i) => e["id"] == val["id"]) !=
                                null
                                  ? true
                                  : false
                              }
                              value={JSON.stringify([
                                val["id"],
                                val["firstName"],
                              ])}
                            >
                              {val["firstName"]}
                            </option>
                          );
                        })}
                      </select>
                      <div
                        className={
                          isEmp == false ? "d-none" : `d-flex flex-wrap`
                        }
                      >
                        {selected.map((e, index) => (
                          <div
                            style={{
                              border: "1px solid black",
                              borderRadius: "5px",
                            }}
                            className="d-flex justify-content-between align-items-center px-2 mr-2 my-2"
                          >
                            <p>{e["name"]}</p>
                            <button
                              type="button"
                              onClick={() => {
                                let data = selected;
                                data = data.filter((e, i) => i !== index);
                                setSelected(data);
                              }}
                              className="btn btn-sm text-danger"
                            >
                              X
                            </button>
                          </div>
                        ))}
                      </div>
                      <FormControlLabel
                        value="Select Filter"
                        control={<Radio />}
                        label="Select Filter"
                        checked={isFilter}
                        onChange={async () => {
                          setEmp(false);
                          setFilter(true);
                          setAll(false);
                          setSelected([
                            {
                              name: "Job Grade",
                              data: [],
                            },
                            {
                              name: "Job Level",
                              data: [],
                            },
                            {
                              name: "Job Title",
                              data: [],
                            },
                            {
                              name: "Job Position",
                              data: [],
                            },
                          ]);
                        }}
                      />
                      <div
                        className="grid gap-3"
                        style={{
                          display: isFilter
                            ? "grid"
                            : !isFilter
                            ? "none"
                            : "none",
                        }}
                      >
                        <div className="">
                          <label
                            className="block text-gray-700 text-sm mb-2"
                            for="username"
                          >
                            Job Grade
                          </label>
                          <Select
                            options={jgrade}
                            onChange={(e) => {
                              selected[0]["data"] = e;
                              setSelected(selected);
                            }}
                            isMulti
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                          />
                        </div>
                        <div className="">
                          <label
                            className="block text-gray-700 text-sm mb-2"
                            for="username"
                          >
                            Job Level
                          </label>
                          <Select
                            options={jlevel}
                            isMulti
                            onChange={(e) => {
                              selected[1]["data"] = e;
                              setSelected(selected);
                            }}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                          />
                        </div>
                        <div className="">
                          <label
                            className="block text-gray-700 text-sm mb-2"
                            for="username"
                          >
                            Job Title
                          </label>
                          <Select
                            options={jtitle}
                            isMulti
                            onChange={(e) => {
                              selected[2]["data"] = e;
                              setSelected(selected);
                            }}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                          />
                        </div>
                        <div className="">
                          <label
                            className="block text-gray-700 text-sm mb-2"
                            for="username"
                          >
                            Job Postition
                          </label>
                          <Select
                            options={jposi}
                            isMulti
                            onChange={(e) => {
                              selected[3]["data"] = e;
                              setSelected(selected);
                            }}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                          />
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="m-4">
            <button
              className="btn"
              style={{
                backgroundColor: "#00000010",
                border: "1px solid transparent",
                color: "#0E5073",
                width: "100px",
              }}
              type="button"
              onClick={() => setAddincome(!addincome)}
            >
              Cancel
            </button>
            <button
              className="btn"
              style={{
                backgroundColor: "#0E5073",
                border: "1px solid transparent",
                color: "#FFFFFF",
                width: "100px",
              }}
              type="submit"
            >
              Add
            </button>
          </Modal.Footer>
        </form>
      </Modal>
      <Modal
        show={editincome}
        size="lg"
        onHide={() => {
          setEditincome(!editincome);
          setType();
          setSelected([]);
          setEmp(false);
          setAll(false);
          setEditController({});
          setFilter(false);
        }}
      >
        <Modal.Header
          closeButton
          className="m-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title>Edit {editController?.type}</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            let data =
              editController?.type == "income"
                ? incomes
                : editController?.type == "deduction"
                ? deductions
                : benefits;
            editController["delegated_to"] = selected;
            editController["sub_type"] =
              isEmp == true ? "employee" : isFilter == true ? "filter" : "all";
            editController["status"] =
              isEmp == true ? "employee" : isFilter == true ? "filter" : "all";
            data[editController?.index] = editController;
            if (editController?.type == "income") {
              setIncomes(data);
            } else if (editController?.type == "deduction") {
              setDeductions(data);
            } else {
              console.log(data);
              setBenefits(data);
            }
            setType();
            setFilter(false);
            setEmp(false);
            setAll(false);
            setSelected([]);
            setEditController({});
            setEditincome(false);
          }}
        >
          <Modal.Body className="mx-4">
            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    {editController?.type} Name
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    id="name"
                    onChange={(e) =>
                      setEditController({
                        ...editController,
                        name: e.target.value,
                      })
                    }
                    value={editController?.name}
                    required
                    placeholder={`${editController?.type} name...`}
                  />
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    Amount <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    id="amount"
                    onChange={(e) =>
                      setEditController({
                        ...editController,
                        amount: e.target.value,
                      })
                    }
                    value={editController?.amount}
                    required
                    placeholder="Nominal or Persentage"
                  />
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    Select Payment Type <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    id="payment"
                    required
                    onChange={(e) =>
                      setEditController({
                        ...editController,
                        payment_period: e.target.value,
                      })
                    }
                  >
                    <option value="" hidden>
                      Select Payment Type
                    </option>
                    <option
                      value="Monthly"
                      selected={
                        editController?.payment_period == "Monthly"
                          ? true
                          : false
                      }
                    >
                      Monthly{" "}
                    </option>
                    <option
                      value="Weekly"
                      selected={
                        editController?.payment_period == "Weekly"
                          ? true
                          : false
                      }
                    >
                      Weekly{" "}
                    </option>
                    <option
                      value="Daily"
                      selected={
                        editController?.payment_period == "Daily" ? true : false
                      }
                    >
                      Daily{" "}
                    </option>
                    <option
                      value="One Time"
                      selected={
                        editController?.payment_period == "One Time"
                          ? true
                          : false
                      }
                    >
                      One Time{" "}
                    </option>
                  </select>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    Tax <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    id="tax"
                    onChange={(e) =>
                      setEditController({
                        ...editController,
                        tax: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="" hidden>
                      Select Tax
                    </option>
                    <option
                      value="tax"
                      selected={editController?.tax == "tax" ? true : false}
                    >
                      Taxable
                    </option>
                    <option
                      value="nontax"
                      selected={editController?.tax == "nontax" ? true : false}
                    >
                      Non Taxable{" "}
                    </option>
                  </select>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label className="mb-1">Payment Date/Day</label>
                  <input
                    className="form-control border"
                    value={editController?.payment_date}
                    onChange={(e) =>
                      setEditController({
                        ...editController,
                        payment_date: e.target.value,
                      })
                    }
                    id="name"
                    type="date"
                    required
                  />
                </div>
              </div>
              <div className="w-100"></div>
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <FormControl
                    sx={{
                      width: "100%",
                    }}
                  >
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="All Employee"
                        control={<Radio />}
                        checked={isAll}
                        label="All Employee"
                        onChange={async () => {
                          setEmp(false);
                          setFilter(false);
                          setSelected([]);
                          setAll(true);
                        }}
                      />
                      <FormControlLabel
                        value="Search by Employee"
                        control={<Radio />}
                        label="Search by Employee"
                        checked={isEmp}
                        onChange={async () => {
                          setEmp(true);
                          setFilter(false);
                          setAll(false);
                          setSelected([]);
                        }}
                      />
                      <select
                        style={{
                          display: isEmp ? "block" : !isEmp ? "none" : "none",
                        }}
                        onChange={(val) => {
                          let fromJson = JSON.parse(val.target.value);

                          let data = selected;
                          data.push({
                            name: fromJson[1],
                            id: fromJson[0],
                          });
                          setSelected(data);
                        }}
                        className="w-100 bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="" hidden>
                          Search Employee
                        </option>
                        {employee.map((val) => {
                          return (
                            <option
                              hidden={
                                selected.find((e, i) => e["id"] == val["id"]) !=
                                null
                                  ? true
                                  : false
                              }
                              value={JSON.stringify([
                                val["id"],
                                val["firstName"],
                              ])}
                            >
                              {val["firstName"]}
                            </option>
                          );
                        })}
                      </select>
                      <div
                        className={
                          isEmp == false ? "d-none" : `d-flex flex-wrap`
                        }
                      >
                        {selected.map((e, index) => (
                          <div
                            className="d-flex justify-content-between align-items-center px-2 mr-2 my-2"
                            style={{
                              border: "1px solid black",
                              borderRadius: "5px",
                            }}
                          >
                            <p>{e["name"]}</p>
                            <button
                              type="button"
                              onClick={() => {
                                let data = selected;
                                data = data.filter((e, i) => i !== index);
                                setSelected(data);
                              }}
                              className="btn btn-sm text-danger"
                            >
                              X
                            </button>
                          </div>
                        ))}
                      </div>
                      <FormControlLabel
                        value="Select Filter"
                        control={<Radio />}
                        label="Select Filter"
                        checked={isFilter}
                        onChange={async () => {
                          setEmp(false);
                          setAll(false);
                          setSelected([
                            {
                              name: "Job Grade",
                              data: [],
                            },
                            {
                              name: "Job Level",
                              data: [],
                            },
                            {
                              name: "Job Title",
                              data: [],
                            },
                            {
                              name: "Job Position",
                              data: [],
                            },
                          ]);
                          setFilter(true);
                        }}
                      />
                      <div
                        className="grid gap-3"
                        style={{
                          display: isFilter
                            ? "grid"
                            : !isFilter
                            ? "none"
                            : "none",
                        }}
                      >
                        <div className="">
                          <label
                            className="block text-gray-700 text-sm mb-2"
                            for="username"
                          >
                            Job Grade
                          </label>
                          <Select
                            options={jgrade}
                            isMulti
                            value={isFilter == false ? [] : selected[0]["data"]}
                            onChange={(e) => {
                              selected[0]["data"] = e;
                              setSelected(selected);
                            }}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                          />
                        </div>
                        <div className="">
                          <label
                            className="block text-gray-700 text-sm mb-2"
                            for="username"
                          >
                            Job Level
                          </label>
                          <Select
                            options={jlevel}
                            value={isFilter == false ? [] : selected[1]["data"]}
                            isMulti
                            onChange={(e) => {
                              selected[1]["data"] = e;
                              setSelected(selected);
                            }}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                          />
                        </div>
                        <div className="">
                          <label
                            className="block text-gray-700 text-sm mb-2"
                            for="username"
                          >
                            Job Title
                          </label>
                          <Select
                            options={jtitle}
                            value={isFilter == false ? [] : selected[2]["data"]}
                            isMulti
                            onChange={(e) => {
                              selected[2]["data"] = e;
                              setSelected(selected);
                            }}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                          />
                        </div>
                        <div className="">
                          <label
                            className="block text-gray-700 text-sm mb-2"
                            for="username"
                          >
                            Job Postition
                          </label>
                          <Select
                            options={jposi}
                            value={isFilter == false ? [] : selected[3]["data"]}
                            isMulti
                            onChange={(e) => {
                              selected[3]["data"] = e;
                              setSelected(selected);
                            }}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                          />
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="m-4">
            <button
              className="btn"
              style={{
                backgroundColor: "#00000010",
                border: "1px solid transparent",
                color: "#0E5073",
                width: "100px",
              }}
              type="button"
              onClick={() => setEditincome(!editincome)}
            >
              Cancel
            </button>
            <button
              className="btn"
              style={{
                backgroundColor: "#0E5073",
                border: "1px solid transparent",
                color: "#FFFFFF",
                width: "100px",
              }}
              type="submit"
            >
              Save
            </button>
          </Modal.Footer>
        </form>
      </Modal>
      <Modal show={addbpjs} size="lg" onHide={() => setAddBPJS(!addbpjs)}>
        <Modal.Header
          closeButton
          className="m-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title>Add NPP BPJS Ketenagakerjaan</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            let requestbody = {
              npp_name: nppname,
              npp_number: nppnumber,
              branch: branch,
              jkk: jkk,
            };

            let addbpjs = await AddSetBpjs(requestbody);
            await inAwait();
            setAddBPJS(addbpjs);
          }}
        >
          <Modal.Body className="mx-4">
            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    NPP Name<span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    id="name"
                    required
                    onChange={(e) => setNppname(e.target.value)}
                    placeholder="NPP name..."
                  />
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    NPP Number<span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    id="name"
                    required
                    onChange={(e) => setNppnumber(e.target.value)}
                    placeholder="NPP Number..."
                  />
                </div>
              </div>

              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    Branch <span className="text-danger">*</span>
                  </label>
                  <select
                    onChange={(e) => setBranch(e.target.value)}
                    className="form-control"
                    id="payment"
                    required
                  >
                    <option value="">Select Company Branch</option>
                    {locations.map((x) => {
                      return <option value={X.name}>{x.name} </option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    JKK <span className="text-danger">*</span>
                  </label>
                  <select
                    onChange={(e) => setJKK(e.target.value)}
                    className="form-control"
                    id="payment"
                    required
                  >
                    <option value="">Select Risk Level </option>
                    <option value="0.24">0,24% = Very low level of risk</option>
                    <option value="0.54">0,54% = Low level of risk </option>
                    <option value="0.89">0,89% = Medium risk level</option>
                    <option value="1.27">1,27% = High risk level</option>
                    <option value="1.74">1,74% = Very high risk level</option>
                  </select>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="m-4">
            <button
              className="btn"
              style={{
                backgroundColor: "#00000010",
                border: "1px solid transparent",
                color: "#0E5073",
                width: "100px",
              }}
              type="button"
              onClick={() => setAddBPJS(!addbpjs)}
            >
              Cancel
            </button>
            <button
              className="btn"
              style={{
                backgroundColor: "#0E5073",
                border: "1px solid transparent",
                color: "#FFFFFF",
                width: "100px",
              }}
              type="submit"
            >
              Add
            </button>
          </Modal.Footer>
        </form>
      </Modal>
      <Modal show={bpjs} size="lg" onHide={() => setBPJS(!bpjs)}>
        <Modal.Header
          closeButton
          className="m-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title>JKK BPJS Ketenagakerjaan</Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body className="mx-4">
            <div className="row">
              <div>
                <p style={{ fontWeight: "400" }}>
                  BPJS Ketenagakerjaan has several types of programs, one of
                  which is JKK. The JKK (Jaminan Kecelakaan Kerja) program is a
                  program that provides protection against the risk of accidents
                  that occur in work relationships.
                </p>
              </div>
              <div>
                <ol
                  style={{ listStyle: "decimal", listStylePosition: "inside" }}
                >
                  <li className="font-semibold">
                    Very low risk level of 0.24% of wages per month.
                  </li>
                  <li className="font-semibold">
                    Low risk level of 0.54% of wages per month.
                  </li>
                  <li className="font-semibold">
                    Medium risk level is 0.89% of wages per month.
                  </li>
                  <li className="font-semibold">
                    High risk level is 1.27% of wages per month.
                  </li>
                  <li className="font-semibold">
                    Very high risk level is 1.74% of wages per month.
                  </li>
                </ol>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="m-4">
            <button
              className="btn"
              style={{
                backgroundColor: "#0E5073",
                border: "1px solid transparent",
                color: "#FFFFFF",
              }}
              type="button"
              onClick={() => setBPJS(!bpjs)}
            >
              Okay, I Understand
            </button>
          </Modal.Footer>
        </form>
      </Modal>
      <Modal show={editbpjs} size="lg" onHide={() => setEditBPJS(!editbpjs)}>
        <Modal.Header
          closeButton
          className="m-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title>Edit NPP BPJS Ketenagakerjaan</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            let requestbody = {
              npp_name: nppname,
              npp_number: nppnumber,
              branch: branch,
              jkk: jkk,
            };

            await inAwait();
            setEditBPJS(!editbpjs);
          }}
        >
          <Modal.Body className="mx-4">
            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    NPP Name<span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    id="name"
                    required
                    value={editval.npp_name}
                    onChange={(e) => setNppname(e.target.value)}
                    placeholder="Income name..."
                  />
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    NPP Number<span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    id="name"
                    required
                    value={editval.npp_number}
                    onChange={(e) => setNppnumber(e.target.value)}
                    placeholder="Income name..."
                  />
                </div>
              </div>

              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    Branch <span className="text-danger">*</span>
                  </label>
                  <select
                    onChange={(e) => setBranch(e.target.value)}
                    value={editval.branch}
                    className="form-control"
                    id="payment"
                    required
                  >
                    <option value="">Select Company Branch</option>
                    <option value="">Monthly </option>
                    <option value="">Weekly </option>
                    <option value="">Daily </option>
                    <option value="">One Time </option>
                  </select>
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    JKK <span className="text-danger">*</span>
                  </label>
                  <select
                    onChange={(e) => setJKK(e.target.value)}
                    className="form-control"
                    id="payment"
                    required
                  >
                    <option value="">Select Risk Level </option>
                    <option
                      selected={editval?.jkk == "0.24" ? true : false}
                      value="0.24"
                    >
                      0,24% = Very low level of risk
                    </option>
                    <option
                      selected={editval?.jkk == "0.54" ? true : false}
                      value="0.54"
                    >
                      0,54% = Low level of risk{" "}
                    </option>
                    <option
                      selected={editval?.jkk == "0.89" ? true : false}
                      value="0.89"
                    >
                      0,89% = Medium risk level
                    </option>
                    <option
                      selected={editval?.jkk == "1.27" ? true : false}
                      value="1.27"
                    >
                      1,27% = High risk level
                    </option>
                    <option
                      selected={editval?.jkk == "1.74" ? true : false}
                      value="1.74"
                    >
                      1,74% = Very high risk level
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="m-4">
            <button
              className="btn"
              style={{
                backgroundColor: "#00000010",
                border: "1px solid transparent",
                color: "#0E5073",
                width: "100px",
              }}
              type="button"
              onClick={() => setEditBPJS(!editbpjs)}
            >
              Cancel
            </button>
            <button
              className="btn"
              style={{
                backgroundColor: "#0E5073",
                border: "1px solid transparent",
                color: "#FFFFFF",
                width: "100px",
              }}
              type="submit"
            >
              Add
            </button>
          </Modal.Footer>
        </form>
      </Modal>

      <LoadingDialog active={isLoading} />
    </>
  );
}

export default THP;
