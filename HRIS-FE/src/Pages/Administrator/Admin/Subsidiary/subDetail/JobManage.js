import { ImportExport, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useEffect, useState } from "react";
import {
    Table,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
  } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { GetSubsidiaryDashboard, GetSubsidiaryJob } from "../../../../../Repository/SubsidiaryRepository";

function JobManage() {
    const location = useLocation();
    const val = location.state;
    const [subsjgrade, setSubsiJGrade] = useState([])
    const [subsjlevel, setSubsiJLevel] = useState([])
    const [subsjtitle, setSubsiJTitle] = useState([])
    const [subsjposition, setSubsiJPosition] = useState([])
    const [index, setIndex] = useState(1)
    const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const inAwait = async () => {
        var data = await GetSubsidiaryJob(val.unique_id);
        setSubsiJGrade(data?.result?.jobGrade);
        setSubsiJLevel(data?.result?.jobLevel);
        setSubsiJTitle(data?.result?.jobTitle);
        setSubsiJPosition(data?.result?.jobPosition);

    };
    
    useEffect(() => {
        inAwait();
    }, []);
    return(
        <>
            <div
                className="w-100 rounded-xl"
                style={{ backgroundColor: "#FFFFFF", boxShadow:'0px 0px 3px rgba(0, 0, 0, 0.25)'}}
            >
                <div className="p-4">

                    <h5>
                    <b>Job Management</b>
                    </h5>
                    <p>
                    <small>list of job Management </small>
                    </p>
                    <br></br>
                    <br></br>
                    <Table borderless responsive style={{ color: "#00000070", fontSize: "0.75rem" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#EBF7FF" }}>
                        <th onClick={() => {}}>
                            Job Grade <ImportExport fontSize="2px" />
                        </th>
                        <th onClick={() => {}}>
                            Job Level <ImportExport fontSize="2px" />
                        </th>
                        <th onClick={() => {}}>
                            Job Titles <ImportExport fontSize="2px" />
                        </th>
                        <th onClick={() => {}}>
                            Job Position <ImportExport fontSize="2px" />
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {
                                subsjgrade.length > 0 ? (
                                    subsjgrade.map((val) => {
                                        return(
                                            <td className="align-middle">{val.name}</td>
                                        )
                                    })
                                ) : (
                                    // ""
                                    <td>
                                        <div className="">
                                        No Data
                                        </div>
                                    </td>
                                )
                            }
                            {
                                subsjlevel.length > 0 ? (
                                    subsjlevel.map((val) => {
                                        return(
                                            <td className="align-middle">{val.name}</td>
                                        )
                                    })
                                ) : (
                                    // ""
                                    <td>
                                        <div className="">
                                        No Data
                                        </div>
                                    </td>
                                )
                            }
                            {
                                subsjtitle.length > 0 ? (
                                    subsjtitle.map((val) => {
                                        return(
                                            <td className="align-middle">{val.name}</td>
                                        )
                                    })
                                ) : (
                                    // ""
                                    <td>
                                        <div className="">
                                        No Data
                                        </div>
                                    </td>
                                )
                            }
                            {
                                subsjposition.length > 0 ? (
                                    subsjposition.map((val) => {
                                        console.log(val)
                                        return(
                                            <td className="align-middle">{val.name}</td>
                                        )
                                    })
                                ) : (
                                    // ""
                                    <td >
                                        <div className="">
                                        No Data
                                        </div>
                                    </td>
                                )
                            }

                        </tr>
                        {/* {
                            subsjob.length > 0 ? (
                                subsjob.map((val) => {
                                    console.log(val)
                                    return(
                                        <tr>
                                            <td className="align-middle">{val?.jobgrade?.name}</td>
                                            <td className="align-middle">{val?.joblevel?.name}</td>
                                            <td className="align-middle">{val?.jobtitle?.name}</td>
                                            <td className="align-middle">{val?.jobpostion?.name}</td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <td colSpan={4}>
                                    <div className="d-flex justify-content-center align-middle text-center">
                                    No Data
                                    </div>
                                </td>
                            )
                        } */}
                        {/* {jobtitle.length > 0 ? (
                        jobtitle.map((val) => {
                            return (
                            
                            );
                        })
                        ) : (
                        )} */}
                    </tbody>
                    </Table>
                </div>
                <div className="bg-[#FBFBFB] mt-0 px-4 py-2 rounded-b-xl d-flex align-items-center justify-content-between ">
                    <div>
                        <h6 className="text-[#A098AE] text-[10px]">
                        Showing <span className="text-[#0E5073]">1</span>{" "}
                        from <span className="text-[#0E5073]">300</span> data
                        </h6>
                    </div>
                    <div>
                        <button className="btn btn-sm" 
                        // onClick={() => previousPage()}
                        >
                        <KeyboardArrowLeft />
                        </button>
                        <button className="btn mx-2 bg-[#78000010] rounded-md text-[#780000]">
                        1
                        </button>
                        <button className="btn bg-[#780000] rounded-md text-[#FFFFFF]">
                        2
                        </button>
                        {/* {allPages.map((page) => (
                        <button
                            onClick={() => changePage(page)}
                            className="btn mx-2 bg-[#78000010] text-[10px] rounded-md text-[#780000]"
                        >
                            {page}
                        </button>
                        ))} */}
                        <button className="btn btn-sm" 
                        // onClick={() => nextPage()}
                        >
                        <KeyboardArrowRight/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default JobManage;