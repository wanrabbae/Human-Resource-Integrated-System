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
import { LoadingDialog, ModalDelete, SwalSuccess } from "../../../../../Components/Modals";
import Select from "react-select";
import { GetEmployeeName } from "../../../../../Repository/EmployeeRepository";
import { GetJobGrade, GetJobLevel, GetJobPosition, GetJobTittle } from "../../../../../Repository/AdminRepository";
import { AddPkp, AddPtkp, DeletePkp, GetPkp, GetPtkp, UpdatePkp } from "../../../../../Repository/PayrollRepository";

function PPH21() {
    const [ptkp, setPtkp] = useState([]);
    const [pkp, setPkp] = useState([]);

    const [adduph, setAdduph] = useState(false);
    const [edituph, setEdituph] = useState(false);

    const [indivtaxpayer, setIndivtaxpayer] = useState("");
    const [addindivtaxpayer, setAddindivtaxpayer] = useState("");
    const [addmarriedtaxpayer, setAddmarriedtaxpayer] = useState("");
    const [adddependent, setAdddependent] = useState("");
    const [isLoading, setLoading] = useState(false);

    const [fields, setField] = useState([]);

    const inAwait = async () => {
        var res = await GetPtkp();
        setPtkp(res.data);
        console.log(res)
        var rest = await GetPkp();
        setPkp(rest.data);

        // getpkp();
        let field = [];

        const datapkp = await GetPkp()
        setPkp(datapkp.data)
        for (var i =0;i < datapkp.data.length;i++) {
            var dat = datapkp.data[i];
            field.push({
                id: dat.id,
                income_from: dat.income_from,
                income_to: dat.income_to,
                rate: dat.rate,
                options: dat.length ?? [],
                status: "update",
            });
        }
        setField(field)
    };

    useEffect(() => {
        inAwait();
    },[]);

    return (
        <>
            <div className="flex flex-col gap-1 mb-4">
                <h1 className="text-[18px] text-[#272B30] font-semibold">
                PPH 21 Setting 
                </h1>
                <h1 className="text-[#737373] text-xs">Setting Menu for PPH 21</h1>
            </div>
            <form 
                onSubmit={async(e) => {
                    e.preventDefault();
                    setLoading(true);
                    const reqptkp = await AddPtkp({
                        individual_taxpayer: ptkp.individual_taxpayer,
                        additional_individual_taxpayer: ptkp.additional_individual_taxpayer,
                        additional_married_taxpayers: ptkp.additional_married_taxpayers,
                        additional_dependents: ptkp.additional_dependents
                    });
                    
                    // console.log(fields);
                    for (var i = 0;i < fields.length;i++) {
                        var field = fields[i];

                        if (field.status == "remove") {
                            var remove = await DeletePkp(field.id);
                        } else if (field.status == "insert") {
                            const addpkp = await AddPkp({
                                income_from: field.income_from,
                                income_to: field.income_to,
                                rate: field.rate,
                            });
                        } else if (field.status == "update") {
                            const updatePkp = await UpdatePkp({
                                id: field.id,
                                income_from: field.income_from,
                                income_to: field.income_to,
                                rate: field.rate,
                            });
                        }
                    }
                    await inAwait();
                    setLoading(false);
                    // fields.forEach(async (field) => {
                        // const addpkp = await AddPkp({
                        //     income_from: field.income_from,
                        //     income_to: field.income_to,
                        //     rate: field.rate,
                        // });
                        // console.log(addpkp);
                    //   });
                    SwalSuccess({ message: "Success Setting PPH21" });
                }}
            >

                <div className="mt-5 pb-3 border-b border-[#A8A8A8]">
                    <h1 className="text-[18px] text-[#272B30] font-semibold">
                    PTKP Setting
                    </h1>
                    <div className="col-md-6 my-3">
                        <div className="grid gap-4">
                            <div className="form-group">
                                <label className="mb-1">
                                Individual Taxpayer <span className="text-danger">*</span>
                                </label>
                                <div className="flex items-center ps-2 bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    Rp
                                    <input
                                    className="ps-2 border-0 rounded-lg focus:ring-0 focus:border-0 focus:outline-0 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-blue-500"
                                    id="name"
                                    required
                                    value={
                                        ptkp 
                                            ? ptkp.individual_taxpayer 
                                                ? ptkp.individual_taxpayer
                                                : "" 
                                            : ""
                                    }
                                    onChange={(e) => setPtkp({...ptkp, individual_taxpayer: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="mb-1">
                                Additional Individual Taxpayer<span className="text-danger">*</span>
                                </label>
                                <div className="flex items-center ps-2 bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    Rp
                                    <input
                                    className="ps-2 border-0 rounded-lg focus:ring-0 focus:border-0 focus:outline-0 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-blue-500"
                                    id="name"
                                    required
                                    value={
                                        ptkp 
                                            ? ptkp.additional_individual_taxpayer 
                                                ? ptkp.additional_individual_taxpayer
                                                : "" 
                                            : ""
                                    }
                                    onChange={(e) => setPtkp({...ptkp, additional_individual_taxpayer: e.target.value})}
                                    />
                                </div>
                                <label className="text-[11px] text-[#CACACA]">
                                (Additional for the wife whose income is combined with the husband's)
                                </label>
                            </div>
                            <div className="form-group">
                                <label className="mb-1">
                                Additional Married Taxpayers<span className="text-danger">*</span>
                                </label>
                                <div className="flex items-center ps-2 bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    Rp
                                    <input
                                    className="ps-2 border-0 rounded-lg focus:ring-0 focus:border-0 focus:outline-0 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-blue-500"
                                    id="name"
                                    required
                                    value={
                                        ptkp 
                                            ? ptkp.additional_married_taxpayers 
                                                ? ptkp.additional_married_taxpayers
                                                : "" 
                                            : ""
                                    }
                                    onChange={(e) => setPtkp({...ptkp, additional_married_taxpayers: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="mb-1">
                                Additional for dependents<span className="text-danger">*</span>
                                </label>
                                <div className="flex items-center ps-2 bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    Rp
                                    <input
                                    className="ps-2 border-0 rounded-lg focus:ring-0 focus:border-0 focus:outline-0 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-blue-500"
                                    id="name"
                                    required
                                    value={
                                        ptkp 
                                            ? ptkp.additional_dependents 
                                                ? ptkp.additional_dependents
                                                : "" 
                                            : ""
                                    }
                                    onChange={(e) => setPtkp({...ptkp, additional_dependents: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 pb-4 border-b border-[#A8A8A8]">
                    <h1 className="text-[18px] text-[#272B30] font-semibold">
                    PKP Setting
                    </h1>
                    <div className="grid gap-3">
                        {
                                fields.map((e,i) => {
                                    return(
                                    <div key={i} hidden={e?.status == "remove" ? true : false} className="grid gap-3 grid-cols-7 align-center items-center justify-center text-center">
                                        <div className="flex">
                                        if income
                                        </div> 
                                        <div className="flex gap-2 items-center col-span-3">
                                            <div className="flex items-center ps-2 bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                Rp
                                                <input
                                                    className="p-0 ps-2 border-0 rounded-lg focus:ring-0 focus:border-0 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-blue-500"
                                                    id="name"
                                                    type="number"
                                                    required
                                                    value={e.income_from}
                                                    placeholder="0"
                                                    onChange={(val) => {
                                                        var data = [...fields];
                                                        data[i]["income_from"] = val.target.value;
                                                        setField(data);
                                                    }}
                                                />
                                            </div>
                                            -
                                            <div  className="flex items-center ps-2 bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                Rp
                                                <input
                                                    className="p-0 px-2 border-0 rounded-lg focus:ring-0 focus:border-0 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-blue-500"
                                                    id="name"
                                                    type="number"
                                                    required
                                                    value={e.income_to}
                                                    placeholder="0"
                                                    onChange={(val) => {
                                                        var data = [...fields];
                                                        data[i]["income_to"] = val.target.value;
                                                        setField(data);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-2 items-center col-span-2">
                                            <div className="flex">
                                            = Rates 
                                            </div>
                                            <div  className="flex items-center pe-2 bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">    
                                                <input
                                                    className="p-0 border-0 rounded-lg focus:ring-0 focus:border-0 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-blue-500"
                                                    id="name"
                                                    type="number"
                                                    required
                                                    value={e.rate}
                                                    placeholder="0"
                                                    onChange={(val) => {
                                                        var data = [...fields];
                                                        data[i]["rate"] = val.target.value;
                                                        setField(data);
                                                    }}
                                                />
                                                %
                                            </div>
                                        </div>
                                        <div className="">
                                                <button
                                                    type="button"
                                                    className="bg-[#FFE1E1] btn rounded-lg"
                                                    onClick={() => {
                                                        var data = [...fields];

                                                        data[i]['status'] = "remove";
                                                        
                                                        setField(data);

                                                        console.log(data);
                                                    }}
                                                >
                                                    <Trash
                                                        color="#C1121F"
                                                        weight="bold"
                                                        className="h-5 w-5"
                                                        aria-hidden="true" />
                                                </button>
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
                                var data = [...fields];

                                data.push({
                                    id: null,
                                    income_from: "",
                                    income_to: "",
                                    rate: "",
                                    options: [],
                                    status: "insert",
                                },);
                                
                                setField(data);

                                console.log(fields);
                            }}
                            type="button"
                        >
                            <Plus size={15} className="me-2 text-[#219EBC]" weight="bold" />
                            Add
                        </button>
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
            </form>
            
      <LoadingDialog active={isLoading} />
        </>
    );
}

export default PPH21;