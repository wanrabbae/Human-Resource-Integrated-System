import {
    EditOutlined,
    ImportExport,
    KeyboardArrowLeft,
    KeyboardArrowRight,
  } from "@mui/icons-material";
  import { Plus, Trash, X } from "phosphor-react";
  import {
    Table,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Form
  } from "react-bootstrap";
  import React, { useEffect, useState } from "react";
  import {
      Divider,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
  } from "@mui/material";
  import Select from "react-select";
  import { GetEmployeeName } from "../../../../../Repository/EmployeeRepository";
  import { GetJobGrade, GetJobLevel, GetJobPosition, GetJobTittle } from "../../../../../Repository/AdminRepository";
import { AddTHR, GetTHR } from "../../../../../Repository/PayrollRepository";
import { SwalSuccess } from "../../../../../Components/Modals";

function THR() {
    const [addincome, setAddincome] = useState(false);
    const [editincome, setEditincome] = useState(false);
    const [adddeduction, setAdddeduction] = useState(false);
    const [editdeduction, setEditdeduction] = useState(false);
    const [addbenefit, setAddbenefit] = useState(false);
    const [editbenefit, setEditbenefit] = useState(false);
    const [thr, setTHR] = useState(false);
    const [addbpjs, setAddBPJS] = useState(false);
    const [editbpjs, setEditBPJS] = useState(false);
    const [isEmp, setEmp] = useState(false);
    const [isFilter, setFilter] = useState(false);
    const [employee, setEmployee] = useState([]);
    const [jposi, setJobPosi] = useState([]);
    const [jgrade, setJobGrade] = useState([]);
    const [jlevel, setJobLevel] = useState([]);
    const [jtitle, setJobtitle] = useState([]);


    const [fields, setField] = useState([]);
    const [data, setData] = useState([]);
    const [dtthr, setThr] = useState([]);

    const jgradeoption = [];
    const jlevoption = [];
    const jtitoption = [];
    const jposoption = [];
    const inAwait = async () => {
        var datathr = await GetTHR();
        setThr(datathr);
        console.log(datathr)
        var emp = await GetEmployeeName();
        setEmployee(emp);
        var jgra = await GetJobGrade();
        jgra.map((em) => jgradeoption.push({ value: em.id, label: em.name }));
        setJobGrade(jgradeoption);
        var jlev = await GetJobLevel();
        jlev.map((em) => jlevoption.push({ value: em.id, label: em.name }));
        setJobLevel(jlevoption);
        var jtit = await GetJobTittle();
        jtit.map((em) => jtitoption.push({ value: em.id, label: em.name }));
        setJobtitle(jtitoption);
        var jpos = await GetJobPosition();
        jpos?.result.map((em) => jposoption.push({ value: em.id, label: em.name }));
        setJobPosi(jposoption);

    };
    useEffect(() => {
        inAwait();
    }, []);
    return (
        <>
            <div className="pb-2 mb-5">
                <div className="flex items-center align-center ">
                    <div>
                        <h5>
                            <b>THR</b>
                        </h5>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="btn"
                            onClick={() => {
                                setTHR(true);
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
                <form
                    onSubmit={async(e)=>{
                        e.preventDefault();

                        var requestbody = {
                            prorate: dtthr.prorate,
                            new_employee_month: dtthr.new_employee_month,
                            thr_component: dtthr.thr_component,
                            data: data,
                        }
                        // const rest = await AddTHR(requestbody);
                        console.log(requestbody)
                        inAwait();
                        SwalSuccess({message:"Success Setting THR"})
                    }}
                >
                <div className="row">
                    <div className="col-md-6 my-3">
                        <div className="form-group">
                            <label className="mb-1">
                                Prorate <span className="text-danger">*</span>
                            </label>
                            <select
                                id="country"
                                required
                                onChange={(e) => setThr({...dtthr, prorate: e.target.value})}
                                className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="">Select Prorate</option>
                                <option value="Daily">Daily</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6 my-3">
                        <div className="form-group">
                            <label className="mb-1">
                            New Employee can get THR after <span className="text-danger">*</span>
                            </label>
                            <div className="flex gap-3 align-center items-center">
                                <div className="col-md-3">
                                    <input
                                        className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="name"
                                        required
                                        onChange={(e) => setThr({...dtthr, new_employee_month: e.target.value})}
                                        placeholder="0"
                                    />
                                </div>
                                <div className="col-md-3">
                                    Month
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 mb-3">
                        <label className="mb-1">
                        THR Component <span className="text-danger">*</span>
                            </label>
                                <div className="form-group">
                                    <FormControl
                                        sx={{
                                            width: '60%'
                                        }}
                                    >
                                        <RadioGroup
                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                            name="controlled-radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value="Default"
                                                control={<Radio />}
                                                label="Default"
                                                onChange={async (e) => {
                                                    setThr({...dtthr, thr_component: e.target.value})
                                                    setData(null)
                                                    setEmp(false);
                                                    setFilter(false);
                                                } } />
                                            <FormControlLabel
                                                value="Custom THR Component"
                                                control={<Radio />}
                                                label="Custom THR Component"
                                                checked={isEmp}
                                                onChange={async (e) => {
                                                    setThr({...dtthr, thr_component: e.target.value})
                                                    setData([])
                                                    setEmp(true);
                                                    setFilter(false);
                                                } } />
                                                <div className="grid gap-3 align-center items-center" 
                                                    style={{
                                                        display: isEmp ? "grid" : !isEmp ? "none" : "none",
                                                    }}
                                                >
                                                {
                                                    fields.filter((e) => e.status != "remove").map((e,i) => {
                                                        return(
                                                            <>
                                                            <div className="flex gap-3"
                                                                style={{
                                                                    display: isEmp ? "flex" : !isEmp ? "none" : "none",
                                                                }}
                                                            >
                                                                <select
                                                                    required={isEmp}
                                                                    // onChange={(val) => {
                                                                    //     var data = [...fields];
                                                                    //     data[i]["data"] = val.target.value;
                                                                    //     if (
                                                                    //       val.target.value == "option" ||
                                                                    //       val.target.value == "checkbox" ||
                                                                    //       val.target.value == "dropdown"
                                                                    //     ) {
                                                                    //       if (data[i]["options"].length == 0) {
                                                                    //         data[i]["options"].push({
                                                                    //           field_name: "",
                                                                    //         });
                                                                    //       }
                                                                    //     } else {
                                                                    //       data[i]["options"] = [];
                                                                    //     }
                                                                    //     setField(data);
                                                                    //   }}
                                                                    onChange={(val) => {
                                                                        var data = [...fields];
                                                                        data[i]["data"] = val.target.value;
                                                                        setField(data);
                                                                      }}
                                                                    className="w-100 bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                >
                                                                    <option value="">Select Component</option>
                                                                    <option value="Tunjangan Pokok">Tunjangan Pokok</option>
                                                                    <option value="Tunjangan Telekomunikasi">Tunjangan Telekomunikasi</option>
                                                                    {/* {employee.map((val) => {
                                                                        return (
                                                                            <option value={val["id"]}>
                                                                                {val["firstName"]}
                                                                            </option>
                                                                        );
                                                                    })} */}
                                                                </select>
                                                                {/* {i == fields.length - 1 ? (
                                                                    <button 
                                                                        style={{
                                                                            borderRadius: "10px",
                                                                            backgroundColor: "#0E5073",
                                                                            fontSize: "14px",
                                                                            fontWeight: "500",
                                                                        }}
                                                                        onClick={() => {
                                                                            setField([
                                                                              ...fields,
                                                                              {
                                                                                data: [],
                                                                                options: [],
                                                                              },
                                                                            ]);
                                                                          }}
                                                                        className="btn d-flex align-items-center text-white"
                                                                        >
                                                                        <Plus size={20} className="my-1" weight="bold" />
                                                                    </button>
                                                                ) :(
                                                                    <></>
                                                                )} */}
                                                                    {fields.length > 1 ? (
                                                                            <button
                                                                                type="button"
                                                                                className="bg-transparent btn rounded-lg"
                                                                                onClick={() => {
                                                                                    var data = [...fields];
                                                                                    data.splice(i, 1);
                                                                                    setField(data);
                                                                                  }}
                                                                            >
                                                                                <Trash
                                                                                    color="#C1121F"
                                                                                    weight="bold"
                                                                                    className="h-5 w-5"
                                                                                    aria-hidden="true" />
                                                                            </button>
                                                                        ) : (
                                                                            <></>
                                                                        )
                                                                    }
                                                            </div>
                                                            </>
                                                        )
                                                    })
                                                }
                                                <div className="flex gap-3"
                                                    style={{
                                                        display: isEmp ? "flex" : !isEmp ? "none" : "none",
                                                    }}
                                                >
                                                    <select
                                                        required={isEmp}
                                                        // onChange={(val) => {
                                                        //     var data = [...fields];
                                                        //     data[i]["data"] = val.target.value;
                                                        //     if (
                                                        //       val.target.value == "option" ||
                                                        //       val.target.value == "checkbox" ||
                                                        //       val.target.value == "dropdown"
                                                        //     ) {
                                                        //       if (data[i]["options"].length == 0) {
                                                        //         data[i]["options"].push({
                                                        //           field_name: "",
                                                        //         });
                                                        //       }
                                                        //     } else {
                                                        //       data[i]["options"] = [];
                                                        //     }
                                                        //     setField(data);
                                                        //   }}
                                                        onChange={(val) => {
                                                            // var data = [...fields];
                                                            // data[i]["data"] = val.target.value;
                                                            // setField(data);
                                                        }}
                                                        className="w-100 bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    >
                                                        <option value="">Select Component</option>
                                                        <option value="Tunjangan Pokok">Tunjangan Pokok</option>
                                                        <option value="Tunjangan Telekomunikasi">Tunjangan Telekomunikasi</option>
                                                        {/* {employee.map((val) => {
                                                            return (
                                                                <option value={val["id"]}>
                                                                    {val["firstName"]}
                                                                </option>
                                                            );
                                                        })} */}
                                                    </select>
                                                    <button 
                                                        style={{
                                                            borderRadius: "10px",
                                                            backgroundColor: "#0E5073",
                                                            fontSize: "14px",
                                                            fontWeight: "500",
                                                        }}
                                                        type="button"
                                                        onClick={() => {
                                                            setField([
                                                            ...fields,
                                                            {
                                                                data: [],
                                                                // options: [],
                                                            },
                                                            ]);
                                                        }}
                                                        className="btn d-flex align-items-center text-white"
                                                        >
                                                        <Plus size={20} className="my-1" weight="bold" />
                                                    </button>
                                                    {/* <button
                                                        className="bg-transparent btn rounded-lg"
                                                        onClick={() => {
                                                            // var data = [...fields];
                                                            // data.splice(i, 1);
                                                            // setField(data);
                                                        }}
                                                    >
                                                        <Trash
                                                            color="#C1121F"
                                                            weight="bold"
                                                            className="h-5 w-5"
                                                            aria-hidden="true" />
                                                    </button> */}
                                                </div>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
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
                    type=""
                >
                    Save
                </button>
                </form>
            </div>
            <Modal show={thr} size="lg" onHide={() => setTHR(!thr)}
            >
                <Modal.Header
                    closeButton
                    className="m-4"
                    style={{ borderBottomColor: "transparent" }}
                >
                    <Modal.Title>Formula for calculating Employee THR</Modal.Title>
                </Modal.Header>
                <form>
                    <Modal.Body className="mx-4">
                        <div className="row">
                            <div>
                                <p style={{ fontWeight: "400" }}>
                                In general, the formula for calculating THR holiday allowances is 
                                </p>
                                <div className="flex gap-4 bg-[#ECECEC] p-4 align-center items-center justify-center rounded-lg my-4" >
                                    <div className="grid grid-row items-center align-center">
                                        <div className="font-semibold text-center">
                                        Employee's years of service
                                        </div> 
                                        <Divider  sx={{ height:'2px!important',margin:'10px 0 10px 0' }}/>
                                        <div className="font-semibold text-center">
                                        12
                                        </div>
                                    </div>
                                    <div className="font-semibold">
                                    x 1 (one) month's wages.
                                    </div>
                                </div>
                                <p style={{ fontWeight: "400" }}>
                                This formula also applies to calculating THR for employees of any status, including how to calculate THR for contract employees. 
                                </p>
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
                            onClick={() => setTHR(!thr)}
                        >
                            Okay, I Understand
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default THR;
