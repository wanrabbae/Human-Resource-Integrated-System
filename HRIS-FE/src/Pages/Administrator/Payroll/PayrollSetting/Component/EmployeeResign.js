import {
    EditOutlined,
    ImportExport,
    KeyboardArrowLeft,
    KeyboardArrowRight,
  } from "@mui/icons-material";
import { PencilSimple, Plus, Trash, X } from "phosphor-react";
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
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
  } from "@mui/material";
import { ModalDelete, SwalSuccess } from "../../../../../Components/Modals";
import Select from "react-select";
import { GetEmployeeName } from "../../../../../Repository/EmployeeRepository";
import { GetJobGrade, GetJobLevel, GetJobPosition, GetJobTittle } from "../../../../../Repository/AdminRepository";
import { AddUP, AddUPH, DeletePkp, DeleteUP, DeleteUPH, GetUP, GetUPH, UpdateUP, UpdateUp, UpdateUPH } from "../../../../../Repository/PayrollRepository";

function EmployeeResign() {
    const [adduph, setAdduph] = useState(false);
    const [edituph, setEdituph] = useState(false);
    const [isdelete, setDelete] = useState(false);
    const [delid, setdelId] = useState([]);

    const [up, setUP] = useState([]);
    const [umpk, setUMPK] = useState([]);
    const [uph, setUPH] = useState([]);
    
    const [createuph, setCreateUPH] = useState([]);
    const [updateuph, setUpdateUPH] = useState([]);
    const [fields, setField] = useState([]);
    const [fieldsUM, setFieldUM] = useState([]);
    

    const inAwait = async () => {
        var datauph = await GetUPH()
        setUPH(datauph?.data)
        // console.log(datauph)

        let field = [];
        let fieldumpk = [];

        const dataup = await GetUP()
        for (var i =0;i < dataup.data.length;i++ ) {
            var dat = dataup.data[i];
            if(dat.type == "up"){
                field.push({
                    operator: dat.operator,
                    tahun: dat.tahun,
                    gaji_bulanan: dat.gaji_bulanan,
                    type: dat.type,
                    id: dat.id,
                    options: dat.length ?? [],
                });
            } else {
                fieldumpk.push({
                    id: dat.id,
                    umpk: dat.umpk,
                    umpk1: dat.umpk1,
                    tahun: dat.tahun,
                    gaji_bulanan: dat.gaji_bulanan,
                    type: dat.type,
                    options: dat.length ?? [],
                });
            }
        }
        setUP(field)
        setUMPK(fieldumpk)
    }

    useEffect(() => {
        inAwait()
    }, [])
    
    return (
        <>
            <div className="flex flex-col gap-1 mb-4">
                <h1 className="text-[18px] text-[#272B30] font-semibold">
                Terms of Termination of Employment
                </h1>
            </div>
            <div
                className="my-4 w-100 rounded-xl"
                style={{
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.25)",
                }}
            >
                <form
                    onSubmit={async (e)=>{
                        e.preventDefault();

                        for (var i = 0;i < up.length;i++) {
                            var field = up[i];
    
                            if (field.status == "remove") {
                                var remove = await DeleteUP(field.id);
                                console.log(remove);
                            } else if (field.status == "insert") {
                                const addpkp = await AddUP({
                                    operator: field.operator,
                                    tahun: field.tahun,
                                    gaji_bulanan: field.gaji_bulanan,
                                    type: field.type,
                                });
                                console.log(addpkp);
                            } else if (field.status == "update") {
                                const updatePkp = await UpdateUP({
                                    id: field.id,
                                    operator: field.operator,
                                    tahun: field.operator,
                                    gaji_bulanan: field.gaji_bulanan,
                                    type: field.type,
                                });
                                console.log(updatePkp);
                            }
                        }
                        inAwait();
                        SwalSuccess({ message: "Success Setting Up" });
                    }}
                >

                <div className="p-4">
                    <div className="flex justify-between">
                        <div className="flex items-center align-center ">
                            <div>
                                <ul>
                                    <li className="font-semibold" style={{ display: 'list-item', listStyleType: 'disc', listStylePosition: 'inside' }}>Uang Pesangon (UP)</li>
                                </ul>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => {
                                        // setTHR(true);
                                    } }
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
                                            fill="black" />
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
                                className="my-4 btn px-3 d-flex align-items-center text-white"
                                type="submit"
                            >
                                Save
                        </button>
                    </div>
                    <br></br>
                    <div className="grid gap-3">
                        {
                            up.filter(async(e) => e.status != "remove").map((e,i) => {
                                return(
                                    <>
                                        <div key={i} className="grid gap-3 grid-cols-7 align-center items-center justify-center text-center">
                                            <div className="flex">
                                            Masa kerja
                                            </div>
                                            <select
                                                id="country"
                                                value={e.operator}
                                                onChange={(val) => {
                                                    var data = [...up];
                                                    data[i]["operator"] = val.target.value;
                                                    setUP(data);
                                                }}
                                                className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                                <option value="<">{'<'}</option>
                                                <option value=">">{">"}</option>
                                                <option value="=">{'='}</option>
                                                <option value="≥">{'≥'}</option>
                                                <option value="≤">{'≤'}</option>
                                            </select> 
                                            <input
                                                onChange={(val) => {
                                                    var data = [...up];
                                                    data[i]["tahun"] = val.target.value;
                                                    setUP(data);
                                                }}
                                                value={e.tahun}
                                                className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                id="name"
                                                type="number"
                                                required
                                                placeholder="0"
                                                />
                                            <div className="flex">
                                            year =
                                            </div>
                                            <input
                                                onChange={(val) => {
                                                    var data = [...up];
                                                    data[i]["gaji_bulanan"] = val.target.value;
                                                    setUP(data);
                                                }}
                                                className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                id="name"
                                                value={e.gaji_bulanan}
                                                required
                                                placeholder="1"
                                                />
                                            <div className="flex">
                                            bulan upah
                                            </div>
                                            {
                                                up.length > 1 ? (
                                                            <div className="">
                                                                
                                                                <button
                                                                    type="button"
                                                                    className="bg-[#FFE1E1] btn rounded-lg"
                                                                    onClick={() => {
                                                                        var data = [...up];
                                                                        data[i]['status'] = "remove";
                                                                        setUP(data);
                                                                    }}
                                                                >
                                                                    <Trash
                                                                        color="#C1121F"
                                                                        weight="bold"
                                                                        className="h-5 w-5"
                                                                        aria-hidden="true" />
                                                                </button>
                                                            </div>
                                                ) : (
                                                    <></>
                                                    )
                                                }
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                    <button
                        style={{
                            borderRadius: "10px",
                            backgroundColor: "#E1F4FF",
                            fontSize: "14px",
                            fontWeight: "500",
                        }}
                        className="mt-4 text-[#219EBC] btn d-flex align-items-center"
                        onClick={() => {
                            setUP([
                                ...up,
                                {
                                    id: null,
                                    operator: "",
                                    tahun: "",
                                    gaji_bulanan: "",
                                    type: 'up',
                                    options: [],
                                    status:'insert'
                                },
                            ]);
                        } }
                        type="button"
                        >
                        <Plus size={15} className="me-2 text-[#219EBC]" weight="bold" />
                        Add
                    </button>
                </div>
            </form>
            </div>
            <div
                className="my-4 w-100 rounded-xl"
                style={{
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.25)",
                }}
            >
                <form
                    onSubmit={async(e)=> {
                        e.preventDefault();

                        for (var i = 0;i < umpk.length;i++) {
                            var fieldumpk = umpk[i];
                            var tahun = fieldumpk.umpk - fieldumpk.umpk1;
    
                            if (fieldumpk.status == "remove") {
                                var remove = await DeleteUP(fieldumpk.id);
                                console.log(remove);
                            } else if (fieldumpk.status == "insert") {
                                const addpkp = await AddUP({
                                    // operator: fieldumpk.operator,
                                    umpk: fieldumpk.umpk,
                                    umpk1: fieldumpk.umpk1,
                                    tahun: tahun,
                                    gaji_bulanan: fieldumpk.gaji_bulanan,
                                    type: "umpk",
                                });
                                console.log(addpkp);
                            } else if (fieldumpk.status == "update") {
                                const updatePkp = await UpdateUP({
                                    umpk: fieldumpk.umpk,
                                    umpk1: fieldumpk.umpk1,
                                    tahun: tahun,
                                    gaji_bulanan: fieldumpk.gaji_bulanan,
                                    type: "umpk",
                                });
                                console.log(updatePkp);
                            }
                        }
                        inAwait();
                        SwalSuccess({ message: "Success Setting Umpk" });
                    }}
                >

                    <div className="p-4">
                        <div className="flex justify-between">
                            <div className="flex items-center align-center ">
                                <div>
                                    <ul>
                                        <li className="font-semibold" style={{ display: 'list-item', listStyleType: 'disc', listStylePosition: 'inside' }}>Uang Penghargaan Masa Kerja (UMPK)</li>
                                    </ul>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={() => {
                                            // setTHR(true);
                                        } }
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
                                                fill="black" />
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
                                    className="my-4 btn px-3 d-flex align-items-center text-white"
                                    type="submit"
                                    >
                                    Save
                            </button>
                        </div>
                        <br></br>
                        <div className="grid gap-3">
                            {
                                umpk.filter((e) => e.status != "remove").map((e,i) => {
                                    return(
                                        <div key={i} className="grid gap-3 grid-cols-7 align-center items-center justify-center text-center">
                                            <div className="flex">
                                            Masa kerja
                                            </div> 
                                            <div className="flex gap-2 items-center col-span-2">
                                                <input
                                                    className="w-100 bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    id="name"
                                                    type="number"
                                                    required
                                                    value={e.umpk}
                                                    placeholder="0"
                                                    onChange={(val) => {
                                                        var data = [...umpk];
                                                        data[i]["umpk"] = val.target.value;
                                                        setUMPK(data);
                                                    }}
                                                />
                                                -
                                                <input
                                                    className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    id="name"
                                                    type="number"
                                                    required
                                                    value={e.umpk1}
                                                    placeholder="0"
                                                    onChange={(val) => {
                                                        var data = [...umpk];
                                                        data[i]["umpk1"] = val.target.value;
                                                        setUMPK(data);
                                                    }}
                                                />
                                            </div>
                                            <div className="flex">
                                            year =
                                            </div>
                                            <input
                                                className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                id="name"
                                                required
                                                placeholder="1"
                                                value={e.gaji_bulanan}
                                                onChange={(val) => {
                                                    var data = [...umpk];
                                                    data[i]["gaji_bulanan"] = val.target.value;
                                                    setUMPK(data);
                                                }}
                                            />
                                            <div className="flex">
                                            bulan upah
                                            </div>
                                            {
                                                umpk.length > 1 ? (
                                                    <div className="">
                                                        <button
                                                        type="button"
                                                            className="bg-[#FFE1E1] btn rounded-lg"
                                                            onClick={() => {
                                                                var data = [...umpk];
                                                                data[i]['status'] = "remove";
                                                                setUMPK(data);
                                                            }}
                                                            >
                                                            <Trash
                                                                color="#C1121F"
                                                                weight="bold"
                                                                className="h-5 w-5"
                                                                aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <></>
                                                )
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <button
                            style={{
                                borderRadius: "10px",
                                backgroundColor: "#E1F4FF",
                                fontSize: "14px",
                                fontWeight: "500",
                            }}
                            className="mt-4 text-[#219EBC] btn d-flex align-items-center"
                            onClick={() => {
                                setUMPK([
                                    ...umpk,
                                    {
                                        id: null,
                                        umpk: "",
                                        umpk1: "",
                                        gaji_bulanan: "",
                                        type: 'umpk',
                                        options: [],
                                        status: 'insert'
                                    },
                                ]);
                            }}
                            type=""
                            >
                            <Plus size={15} className="me-2 text-[#219EBC]" weight="bold" />
                            Add
                        </button>
                    </div>
                </form>
            </div>
            <div
                className="my-4 w-100 rounded-xl"
                style={{
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.25)",
                }}
            >
                <div className="p-4">
                    <div className="flex items-center align-center ">
                        <div>
                            <ul>
                                <li className="font-semibold" style={{ display: 'list-item', listStyleType: 'disc', listStylePosition: 'inside' }}>Uang Penggantian Hak (UPH)</li>
                            </ul>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="btn"
                                onClick={() => {
                                    // setTHR(true);
                                } }
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
                                        fill="black" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <br></br>
                    <div className="flex-col flex gap-2">
                        {
                            uph.map((val)=> {
                                return(
                                    <div className="d-block">
                                        <div className="flex gap-3">
                                            <button className="btn text-xs flex item-center align-center align-items-center d-inline border border-[#737373] rounded-md"
                                                onClick={() => {
                                                    setEdituph(true);
                                                    setUpdateUPH(val)
                                                } }
                                            >
                                                {val.name} 
                                                <button className="btn me-0 py-0.5 pe-0" onClick={() => {
                                                    setEdituph(true);
                                                    setUpdateUPH(val)
                                                } }>
                                                    <PencilSimple className="text-[#737373]" />
                                                </button>
                                            </button>
                                            <div className="flex">
                                                <button
                                                    className="bg-[#FFE1E1] btn rounded-lg"
                                                    onClick={() => {
                                                        setdelId(val.id)
                                                        setDelete(true);
                                                    } }
                                                >
                                                    <Trash
                                                        color="#C1121F"
                                                        weight="bold"
                                                        // className="h-5 w-5"
                                                        aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }            
                    </div>
                    <button
                        style={{
                            borderRadius: "10px",
                            backgroundColor: "#E1F4FF",
                            fontSize: "14px",
                            fontWeight: "500",
                        }}
                        className="mt-4 text-[#219EBC] btn d-flex align-items-center"
                        onClick={() => {
                            setAdduph(!adduph);
                        } }
                        type=""
                    >
                        <Plus size={15} className="me-2 text-[#219EBC]" weight="bold" />
                        Add
                    </button>
                </div>
            </div>
            <Modal show={adduph} size="lg" onHide={() => setAdduph(!adduph)}>
                <Modal.Header
                    closeButton
                    className="m-4"
                    style={{ borderBottomColor: "transparent" }}
                >
                    <Modal.Title>Add UPH</Modal.Title>
                </Modal.Header>
                <form
                    onSubmit={async(e) => {
                        e.preventDefault();

                        var requestbody = {
                            name: createuph.name,
                            amount: createuph.amount,
                        }
                        var res = await AddUPH(requestbody);
                        console.log(res)
                        inAwait();
                        setAdduph(!adduph);
                        SwalSuccess({ message: "Success Create UPH" });
                    }}
                >
                    <Modal.Body className="mx-4">
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <div className="form-group">
                                    <label className="mb-1">
                                        UPH Name<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        className="form-control"
                                        id="name"
                                        required
                                        onChange={(e) => setCreateUPH({...createuph, name:e.target.value})}
                                        placeholder="Income name..." />
                                </div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <div className="form-group">
                                    <label className="mb-1">
                                        Amount <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        className="form-control"
                                        id="name"
                                        required
                                        onChange={(e) => setCreateUPH({...createuph, amount:e.target.value})}
                                        placeholder="Nominal or Persentage" />
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
                            onClick={() => setAdduph(!adduph)}
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
            <Modal show={edituph} size="lg" onHide={() => setEdituph(!edituph)}>
                <Modal.Header
                    closeButton
                    className="m-4"
                    style={{ borderBottomColor: "transparent" }}
                >
                    <Modal.Title>Edit UPH</Modal.Title>
                </Modal.Header>
                <form
                    onSubmit={async(e) => {
                        e.preventDefault();

                        var requestbody = {
                            id: updateuph.id,
                            name: updateuph.name,
                            amount: updateuph.amount,
                        }
                        var res = await UpdateUPH(requestbody);
                        inAwait();
                        setEdituph(!edituph);
                        SwalSuccess({ message: "Success Edit UPH" });
                    }}
                >
                    <Modal.Body className="mx-4">
                        <div className="row">
                        <div className="col-md-12 mb-3">
                                <div className="form-group">
                                    <label className="mb-1">
                                        UPH Name<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        className="form-control"
                                        id="name"
                                        value={updateuph.name}
                                        required
                                        onChange={(e) => setUpdateUPH({...updateuph, name:e.target.value})}
                                        placeholder="Income name..." />
                                </div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <div className="form-group">
                                    <label className="mb-1">
                                        Amount <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        className="form-control"
                                        id="name"
                                        value={updateuph.amount}
                                        required
                                        onChange={(e) => setUpdateUPH({...updateuph, amount:e.target.value})}
                                        placeholder="Nominal or Persentage" />
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
                            onClick={() => setEdituph(!edituph)}
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
            <ModalDelete
                close={() => {
                setDelete(false);
                }}
                submit={async () => {
                setDelete(false);
                await DeleteUPH(delid);
                await inAwait();
                SwalSuccess({ message: "Success Delete UPH" });
                }}
                active={isdelete}
            />
        </>
    );
}

export default EmployeeResign