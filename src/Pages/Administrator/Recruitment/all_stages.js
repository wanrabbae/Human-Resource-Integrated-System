import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  faArrowsUpDown,
  faArrowsUpDownLeftRight,
  faArrowsUpToLine,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Plus,
  Eye,
  FileText,
  DotsThreeOutline,
  Export,
  MagnifyingGlass,
  CaretRight,
} from "phosphor-react";
import { Dropdown, Modal, Button, Badge } from "react-bootstrap";
import {
  Add,
  AlignVerticalCenter,
  ArrowUpwardTwoTone,
  Delete,
  Filter,
  Filter1,
  FilterCenterFocus,
  FilterList,
  ImportExport,
  Search,
} from "@mui/icons-material";
import {
  FilterStage,
  GetApplicant,
  GetStage,
  GetStageByDate,
} from "../../../Repository/RecruitmentRepository";
import { Drawer } from "@mui/material";
import * as XLSX from "xlsx";

function AllStages() {
  const [isOnProg, setOnProg] = useState(true);
  const [filter, setfilter] = useState(false);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [stage, setStage] = useState([]);
  const [detail, setDetail] = useState();
  let recruitment_stage = [];
  let position = [];
  const inAwait = async () => {
    var rec = await GetStage();
    setStage(rec);
  };

  const exportExcel = async () => {
    if (stage.length > 0) {
      var wb = XLSX.utils.book_new();
      var data = [];

      await stage.map((stg) => {
        data.push({
          "Nama Lengkap": stg.applicant.name,
          Position: stg.applicant.recruitment.position,
          "Tanggal Melamar": stg.applicant.date,
          "Nomor Lengkap": stg.applicant.phone,
          "Recruitment Stage": stg.name,
        });
      });

      var ws = XLSX.utils.json_to_sheet(data);

      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

      XLSX.writeFile(wb, "All Stage Recruitment.xlsx");
      console.log("Exported excel!");
    } else {
      alert("Data masih kosong");
    }
  };

  useEffect(() => {
    inAwait();
  }, []);
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <button
      // className={`ms-auto ${isExpired ? "text-[#CACACA]" : ""}`}
      style={{
        borderRadius: "10px",
        border: "1px solid #CACACA",
        color: "#003049",
        fontSize: "14px",
        fontWeight: "500",
      }}
      className="btn py-2.5 d-flex align-items-center"
      ref={ref}
      // style={{
      //   color: "#003049",
      // }}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <Export className="me-2" size={15} weight="bold" />
      Export
      {children}
    </button>
  ));
  return (
    <>
      <div className="bg-light p-4" style={{ borderRadius: "10px" }}>
        <div className="mb-5 d-flex justify-content-between">
          <div className="row">
            <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
              All Stages Recruitment
            </h3>
            <span
              style={{ fontSize: "10px", fontWeight: "400", color: "#737373" }}
            >
              List of stage recruitment
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <input
              style={{
                borderRadius: "10px",
                backgroundColor: "#F5F8FA",
                color: "#7E8299",
                fontSize: "14px",
                fontWeight: "500",
                width: "30%",
              }}
              className="appearance-none border-0 py-2 px-3 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
              id="username"
              type="date"
              onClick={() => inAwait()}
              onChange={async (e) => {
                const res = await GetStageByDate({
                  date: e.target.value,
                });
                // console.log(e.target.value);
                setStage(res.result);
              }}
            />
            <button
              style={{
                borderRadius: "10px",
                border: "1px solid #CACACA",
                color: "#003049",
                fontSize: "14px",
                fontWeight: "500",
              }}
              className="me-3 btn d-flex align-items-center"
              onClick={() => {
                setfilter(true);
                inAwait();
              }}
            >
              <svg
                className="me-2"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.875 3.9375H13.125M3.0625 7H10.9375M5.6875 10.0625H8.3125"
                  stroke="#003049"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>Filter</p>
            </button>
            <Dropdown
                  >
                    <Dropdown.Toggle as={CustomToggle} />

                    <Dropdown.Menu className="p-3 rounded-xl" size="md">
                      <p style={{fontWeight:'600',color:'#5C5C5C'}}>
                        Range Export 
                      </p>
                      <div className="d-flex my-3 align-items-center">
                        <input
                          style={{
                            borderRadius: "5px",
                            backgroundColor: "#F5F8FA",
                            color: "#7E8299",
                            fontSize: "14px",
                            fontWeight: "500",
                            // width: "30%",
                          }}
                          className="me-2 appearance-none border-0 py-2.5 px-3 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                          id="username"
                          type="date"
                        />
                        -
                        <input
                          style={{
                            borderRadius: "5px",
                            backgroundColor: "#F5F8FA",
                            color: "#7E8299",
                            fontSize: "14px",
                            fontWeight: "500",
                            // width: "30%",
                          }}
                          className="ms-2 appearance-none border-0 py-2.5 px-3 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                          id="username"
                          type="date"
                        />
                      </div>
                      <div className="d-flex justify-content-end">
                        <button
                          style={{
                            borderRadius: "5px",
                            backgroundColor: "#0E5073",
                            color: "white",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                          className="btn"
                          onClick={() => {
                            exportExcel();
                          }}
                          type=""
                        >
                          {/* <Export className="me-2" size={15} weight="bold" /> */}
                          Export
                        </button>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                  <button
              style={{
                borderRadius: "10px",
                border: "1px solid #CACACA",
                color: "#5C5C5C",
                fontSize: "14px",
                fontWeight: "500",
              }}
              className="ms-3 btn d-flex align-items-center"
              onClick={() => {
                window.location.href =
                  "/recruitment/entry-application/all-stages-recruitment/archive-applicant";
              }}
            >
              <p>Archive Applicant</p>
            </button>
          </div>
          <div className="d-flex">
            <div
              className="input-group me-3 align-items-center"
              style={{
                borderRadius: "10px",
                border: "1.5px solid #CACACA",
                backgroundColor: "transparent",
                color: "#0E5073",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              <div className="input-group-prepend">
                <span className="transparent ">
                  <MagnifyingGlass
                    size={20}
                    className="mx-2 form-control-feedback"
                    color="#CACACA"
                    weight="bold"
                  />
                </span>
              </div>
              <input
                style={{
                  border: "0",
                  outline: "none",
                  backgroundColor: "transparent",
                  color: "#0E5073",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
                onChange={(val) => {}}
                className="focus:ring-0 focus:ring-offset-0 focus:outline-0"
                type="search"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table
            className="table mt-3 table-borderless"
            style={{ color: "#737373" }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#EBF7FF",
                  fontSize: "14px",
                  writingMode: "horizontal-tb",
                }}
              >
                <th className="align-middle " onClick={() => {}}>
                  Nama Lengkap <ImportExport fontSize="2px" />
                </th>
                <th className="align-middle " onClick={() => {}}>
                  Position
                  <ImportExport fontSize="2px" />
                </th>
                <th className="align-middle " onClick={() => {}}>
                  Tanggal Melamar <ImportExport fontSize="2px" />
                </th>
                <th className="align-middle " onClick={() => {}}>
                  Nomor Telepon <ImportExport fontSize="2px" />
                </th>
                <th className="align-middle " onClick={() => {}}>
                  Recruitment Stage <ImportExport fontSize="2px" />
                </th>
                <th className="align-middle " onClick={() => {}}>
                  Status <ImportExport fontSize="2px" />
                </th>
              </tr>
            </thead>
            <tbody>
              {stage.length > 0 ? (
                stage.map((val, i) => {
                  return (
                    <tr style={{ fontSize: "14px" }} key={i}>
                      <td className="align-middle">
                        {val["applicant"]["name"]}
                      </td>
                      <td className="align-middle">
                        {val["applicant"]["recruitment"]["position"]}
                      </td>
                      <td className="align-middle">
                        {val["applicant"]["date"]}
                      </td>
                      <td className="align-middle">
                        {val["applicant"]["phone"]}
                      </td>
                      <td className="align-middle">{val["name"]}</td>
                      <td className="align-middle">
                        <span
                          className="p-2 my-3"
                          style={{
                            fontSize: "15px",
                            borderRadius: "10px",
                            backgroundColor:
                              val["status"] == "Success"
                                ? "#CAFFDF"
                                : val["status"] == "Failed"
                                ? "#FFE0E0"
                                : "#FFF0CA",
                            color:
                              val["status"] == "Success"
                                ? "#028F3B"
                                : val["status"] == "Failed"
                                ? "#C1121F"
                                : "#8F5702",
                          }}
                        >
                          {val["status"]}
                        </span>{" "}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <td>
                  <div className="d-flex justify-content-center align-middle text-center">
                    No Data
                  </div>
                </td>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={modal} size="lg" onHide={() => setModal(false)}>
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            More Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-4">
          <div
            className=" bg-[#F8F8F8] rounded-xl px-3 py-5"
            style={{ color: "#737373" }}
          >
            <h1
              className="mb-4"
              style={{ color: "#5C5C5C", fontWeight: "600" }}
            >
              Personal details
            </h1>
            <div className="row gap-x-6 gap-y-1" style={{ fontSize: "14px" }}>
              <div className="col-6" style={{ fontSize: "14px" }}>
                <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                  <div style={{ fontWeight: "600" }}>Employee Name </div>
                  <div style={{ fontWeight: "500" }}>
                    : {detail?.name ?? ""}{" "}
                  </div>
                  <div style={{ fontWeight: "600" }}>Usia </div>
                  <div style={{ fontWeight: "500" }}>
                    : {detail?.age ?? ""}{" "}
                  </div>
                  <div style={{ fontWeight: "600" }}>Position </div>
                  <div style={{ fontWeight: "500" }}>: IT Staff </div>
                  <div style={{ fontWeight: "600" }}>Jurusan </div>
                  <div style={{ fontWeight: "500" }}>
                    : {detail?.major ?? ""}{" "}
                  </div>
                  {/* <div style={{fontWeight:'600'}}>Email  </div>
                                    <div style={{fontWeight:'500'}}>: davidkurniawan@gmail.com</div> */}
                </div>
              </div>
              <div className="w-100 mb-4"></div>
              <h1
                className="mb-4"
                style={{ color: "#5C5C5C", fontWeight: "600" }}
              >
                Experience
              </h1>
              <div className="col">
                <div className="grid grid-cols-1 gap-x-4 gap-y-2">
                  <div
                    className="py-2"
                    style={{
                      fontWeight: "600",
                      borderBottom: "2px solid #EAEAEA",
                    }}
                  >
                    Machine Learning Engineering
                    <div style={{ fontWeight: "400" }}>Tokopedia</div>
                  </div>
                  <div
                    className="py-2"
                    style={{
                      fontWeight: "600",
                      borderBottom: "2px solid #EAEAEA",
                    }}
                  >
                    Data Scientist
                    <div style={{ fontWeight: "400" }}>PT. Ibid by Astra</div>
                  </div>
                  <div
                    className="py-2"
                    style={{
                      fontWeight: "600",
                      borderBottom: "2px solid #EAEAEA",
                    }}
                  >
                    Data Analyst
                    <div style={{ fontWeight: "400" }}>Traveloka</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="m-4" style={{ borderTopColor: "transparent" }}>
          <button
            style={{
              backgroundColor: "#0E5073",
              fontSize: "14px",
              fontWeight: "500",
            }}
            className="btn d-flex align-items-center text-white"
            onClick={() =>
              navigate("/recruitment/entry-application/detail-applicant", {
                state: { details: detail },
              })
            }
            type=""
          >
            Read Detail
            <CaretRight
              className="ms-2"
              size={15}
              weight="fill"
              color="white"
            />
          </button>
        </Modal.Footer>
      </Modal>
      <Drawer
        PaperProps={{
          sx: {
            width: 350,
            borderBottomLeftRadius: "15px",
            borderTopLeftRadius: "15px",
            backgroundColor: "#ECEEF6",
          },
        }}
        open={filter}
        anchor={"right"}
        onClose={() => {
          setfilter(false);
          recruitment_stage = [];
          position = [];
        }}
      >
        <div className="grid p-4 gap-4">
          <div className="d-flex align-items-center">
            <svg
              className="me-3"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.875 3.9375H13.125M3.0625 7H10.9375M5.6875 10.0625H8.3125"
                stroke="#282828"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p style={{ fontWeight: "600" }}>FILTER</p>
          </div>
          <div className="">
            <label
              className="text-gray-700 font-semibold text-xs mb-2"
              for="username"
            >
              Position
            </label>
            <div className="">
              <ul
                className="px-3 py-2 bg-[#FFFFFF]"
                style={{
                  height: "200px",
                  borderRadius: "5px",
                  overflow: "auto",
                  whiteSpace: "unset",
                  scrollbarColor: "transparent",
                  scrollbarWidth: "none",
                }}
              >
                {stage.length > 0 ? (
                  stage.map((val, i) => {
                    return (
                      <li className="items-center align-items-center">
                        <input
                          id={val["name"]}
                          type="checkbox"
                          value={val["applicant"]["recruitment"]["position"]}
                          onChange={(e) => {
                            position.push(e.target.value);
                          }}
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          for={val["name"]}
                          class="ml-2 text-sm text-gray-900"
                        >
                          {val["applicant"]["recruitment"]["position"]}
                        </label>
                      </li>
                    );
                  })
                ) : (
                  <li>No Data</li>
                )}
              </ul>
            </div>
          </div>
          <div className="">
            <label
              className="text-gray-700 font-semibold text-xs mb-2"
              for="username"
            >
              Recruitment Stage
            </label>
            <div className="">
              <ul
                className="px-3 py-2 bg-[#FFFFFF]"
                style={{
                  height: "200px",
                  borderRadius: "5px",
                  overflow: "auto",
                  whiteSpace: "unset",
                  scrollbarColor: "transparent",
                  scrollbarWidth: "none",
                }}
              >
                {stage.length > 0 ? (
                  stage.map((val, i) => {
                    return (
                      <li className="items-center align-items-center">
                        <input
                          id={val["name"]}
                          type="checkbox"
                          value={val["name"]}
                          onChange={(e) => {
                            recruitment_stage.push(e.target.value);
                          }}
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          for={val["name"]}
                          class="ml-2 text-sm text-gray-900"
                        >
                          {val["name"]}
                        </label>
                      </li>
                    );
                  })
                ) : (
                  <li>No Data</li>
                )}
              </ul>
            </div>
          </div>
          <button
            className="btn bg-[#0E5073] text-white"
            onClick={async () => {
              const reqBody = {
                position: position,
                recruitment_stage: recruitment_stage,
              };
              var res = await FilterStage(reqBody);
              setStage(res.result);
              setfilter(false);
            }}
          >
            Apply Filter
          </button>
        </div>
      </Drawer>
    </>
  );
}
export default AllStages;
