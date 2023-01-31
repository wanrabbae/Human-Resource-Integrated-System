import {
    faArrowsUpDown,
    faArrowsUpDownLeftRight,
    faArrowsUpToLine,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { EyeIcon } from "@heroicons/react/solid";
  import {
    Add,
    AlignVerticalCenter,
    ArrowBack,
    ArrowLeft,
    ArrowRight,
    ArrowUpwardTwoTone,
    Delete,
    DeleteOutline,
    EditOutlined,
    Filter,
    Filter1,
    FilterCenterFocus,
    FilterList,
    ImportExport,
    Search,
    Visibility,
    VisibilityOutlined,
  } from "@mui/icons-material";
  import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    OutlinedInput,
    TextField,
  } from "@mui/material";
import { is } from "date-fns/locale";
  import { Camera } from "phosphor-react";
  import { useEffect } from "react";
  import { useState } from "react";
  import {
    Table,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
  } from "react-bootstrap";
import { SwalSuccess } from "../../../Components/Modals";
  import { TextFieldSearch } from "../../../Components/TextField";
import { postMaintenance } from "../../../Repository/MaintenanceRepository";
  import {
    AddAttendance,
    GetAttendance,
    GetAttendanceByDate,
    GetEmployeeProfile,
  } from "../../../Repository/TimeManagementRepository";
  
  function Maintenance() {
    const [isMaintain, setMaintain] = useState(false);
    return (
      <>
      <div className="align-items-center align-center d-flex justify-content-center ">
        <div className="w-50 bg-[#FFFFFF] p-4 rounded-xl">
            <div style={{fontWeight:'500'}} className="text-[#5C5C5C] align-center text-center">
            Confirm as Admin
            </div>
            <div className="my-3 align-center">
                <p className="text-[#A8A8A8] text-sm" style={{textAlign:'justify',fontWeight:'400'}}>You have requested to access a critical Administrator function in Humanusia and are required to validate your credentials below</p>
                <div className='my-4'>
                    <label className="block text-gray-700 text-sm mb-2" for="username">
                    Username <span style={{color:"#780000"}}>*</span>
                    </label>
                    <input className=" appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="username" type="text" placeholder="username"/>
                </div>
                <div className='mb-4'>
                    <label className="block text-gray-700 text-sm mb-2" for="username">
                    Password
                    </label>
                    <input className=" appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline" id="password" type="password" placeholder="password"/>
                </div>
            </div>
            <div className="d-flex justify-content-end">
             <Button
                        style={{
                            border:'none',
                            fontSize:'14px',
                            backgroundColor: "#ECECEC",
                            color: "#003049",
                        }}
                        className="me-3 px-3"
                        onClick={() => {}}
                    >
                        Cancel
                    </Button>
                    <Button
                        style={{
                            border:'none',
                            fontSize:'14px',
                            backgroundColor: "#0E5073",
                            color: "#FFFFFF",
                        }}
                        className="px-4"
                        onClick={async () => {
                          setMaintain(!isMaintain)
                          var requestBody = {
                            username: document.getElementById("username").value,
                            password: document.getElementById("password").value,
                            isMaintain: isMaintain
                          };
                          var res = await postMaintenance(requestBody);
                          console.log(res);
                          SwalSuccess({ message: "Success" });
                        }}
                    >
                        Confirm
                    </Button>
            </div>
        </div>
      </div>
      </>
    );
  }
  
  export default Maintenance;
  