import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import {
  Plus,
  Eye,
  FileText,
  DotsThreeOutline,
  MagnifyingGlass,
  FunnelSimple,
  DotsThreeOutlineVertical,
  ArrowRight,
  DotsThreeVertical,
} from "phosphor-react";
import { Button, Dropdown, Modal, Table } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Select from "react-select";
// import faker from 'faker';
import { components } from "react-select";
import {
  GetDoc,
  AddDocument,
  AddDetailDocument,
  AddFieldDocument,
  DeleteDocument,
  GetDetailDoc,
  UpdateDocument,
  UpdateDetailDocument,
  UpdateFieldDocument,
  SearchDocument,
  FilterDocument,
} from "../../../Repository/DocumentRepository";
import {
  GetEmployee,
  GetEmployeeName,
} from "../../../Repository/EmployeeRepository";
import { Delete, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  SwalSuccess,
  ModalDelete,
  SwalError,
} from "../../../Components/Modals.js";

function DocumentManagement() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [editmodal, setModaledit] = useState(false);
  const [employee, setEmployee] = useState([]);

  const [editUserData, setEditUserData] = useState();
  const [Doc, setDoc] = useState([]);
  const [isdelete, setDelete] = useState(false);
  const [id, setId] = useState();
  const [fields, setField] = useState([]);
  const [defaultShow, setDefaultShow] = useState([]);
  const dataTypeOpt = [
    {
      name: "Alphabet",
      value: "text",
    },
    {
      name: "Number",
      value: "number",
    },
  ];
  const fieldTypeEdit = [
    {
      name: "Short Answer",
      value: "short_answer",
    },
    {
      name: "Paragraph",
      value: "paragraph",
    },
    {
      name: "Single Choice",
      value: "option",
    },
    {
      name: "Checkbox",
      value: "checkbox",
    },
    {
      name: "Dropdown",
      value: "dropdown",
    },
    {
      name: "Upload File",
      value: "file",
    },
    {
      name: "Date",
      value: "date",
    },
    {
      name: "Time",
      value: "time",
    },
  ];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Document",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "#780000",
        borderRadius: "20px",
      },
    ],
  };
  const [document, setDocument] = useState({});
  const [showto, setShowTo] = useState([]);
  const [employeeto, setEmployeeTo] = useState([""]);
  const [userLogged, setUserLogged] = useState({});
  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <Form.Check
            type="checkbox"
            checked={props.isSelected}
            id="default-checkbox"
            label={props.label}
          />
        </components.Option>
      </div>
    );
  };
  const showTo = [];
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      // className={`ms-auto ${isExpired ? "text-[#CACACA]" : ""}`}
      href=""
      ref={ref}
      // style={{
      //   color: "#003049",
      // }}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <DotsThreeVertical size={25} color="#ffffff" weight="bold" />
      {children}
    </a>
  ));
  const FilterToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      style={{
        borderRadius: "10px",
        border: "1.5px solid #CACACA",
        color: "#0E5073",
        fontSize: "14px",
        fontWeight: "500",
      }}
      className=" btn d-flex align-items-center"
      href=""
      ref={ref}
      // style={{
      //   color: "#003049",
      // }}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      >
      <FunnelSimple className="me-2" size={15} weight="bold" />
      Filter
      {children}
    </a>
  ));

  const inAwait = async () => {
    var data = JSON.parse(window.localStorage.getItem("users"));
    var rec = await GetDoc(data);
    var emp = await GetEmployeeName();
    emp.map((em) => showTo.push({ value: em.id, label: em.firstName }));
    setUserLogged(data);
    setDoc(rec["result"]);
    setEmployeeTo(showTo);
  };

  console.log(Doc)
  useEffect(() => {
    inAwait();
  }, []);

  const addDocument = async () => {
    try {
      const addDoc = await AddDocument({
        title: document.title,
        description: document.description,
        delegated_to: `[${showto}]`,
      });

      fields.forEach(async (field) => {
        const addDetail = await AddDetailDocument({
          document_id: addDoc.data.id,
          field_name: field.field_name,
          field_type: field.field_type,
          data_type: field.data_type,
        });

        if (field.options.length > 0) {
          field.options.forEach(async (option) => {
            await AddFieldDocument({
              id_detail_document: addDetail.data.id,
              name: option.name,
            });
          });
        }
      });

      setModal(false);
      setField([]);
      setDocument({});
      inAwait();
      SwalSuccess({ message: "Success create document" });
    } catch (error) {
      console.log(error);
      SwalError({ message: "Error while creating document" });
    }
  };
  const searchDoc  = async (keyword) => {
    try {
      const search = await SearchDocument(keyword);
      setDoc(search);
      console.log(search)
    } catch (error) {
      console.log(error);
    }
  };
  const editDocument = async () => {
    try {
      const addDoc = await UpdateDocument({
        id: document.id,
        title: document.title,
        description: document.description,
        delegated_to: `[${showto}]`,
      });

      fields.forEach(async (field) => {
        const addDetail = await UpdateDetailDocument({
          id: field.id,
          field_name: field.field_name,
          field_type: field.field_type,
          data_type: field.data_type,
        });

        if (field.options.length > 0) {
          field.options.forEach(async (option) => {
            await UpdateFieldDocument({
              id: option.id,
              name: option.name,
            });
          });
        }
      });

      setModaledit(false);
      setField([]);
      setDocument({});
      setDefaultShow([]);
      setShowTo([]);
      inAwait();
      SwalSuccess({ message: "Success edit document" });
    } catch (error) {
      console.log(error);
      SwalError({ message: "Error while creating document" });
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="row">
          <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
            Document Management System
          </h3>
          <span
            style={{ fontSize: "10px", fontWeight: "400", color: "#737373" }}
          >
            list of document{" "}
          </span>
        </div>
        <div className="d-flex">
          <div
            className="input-group me-3 align-items-center w-auto"
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
              onChange={(e) => searchDoc(e.target.value)}
              className="focus:ring-0 focus:ring-offset-0 focus:outline-0"
              type="search"
              placeholder="Search Document..."
            />
          </div>
          {userLogged?.role == "admin" || userLogged?.role == "subsdiary" || userLogged?.role == "subadmin" ? (
            <button
              style={{
                borderRadius: "10px",
                backgroundColor: "#0E5073",
                fontSize: "14px",
                fontWeight: "500",
              }}
              className="btn d-flex align-items-center text-white"
              onClick={() => {
                setModal(true);
                setField([
                  {
                    field_name: "",
                    field_type: "",
                    data_type: "",
                    options: [],
                  },
                ]);
              }}
              type=""
            >
              <Plus size={15} className="me-2" weight="bold" />
              Create Document
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="container-fluid mb-4">
        <div
          className="mt-5 py-2  row justify-content-around flex-wrap"
          style={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
        >
          <div className="col-3" style={{ borderRight: "1px solid #EDEDED" }}>
            <div
              className="py-16 px-4 "
              style={{ borderBottom: "1px solid #EDEDED" }}
            >
              <h3
                className="mb-1"
                style={{
                  fontSize: "14px",
                  opacity: "0.85",
                  fontWeight: "600",
                  color: "#C1121F",
                  textTransform: "uppercase",
                }}
              >
                Total respondent
              </h3>
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: "700",
                  color: "#C1121F",
                  textTransform: "uppercase",
                }}
              >
                0
              </h3>
            </div>
            <div className="py-16 px-4">
              <h3
                className="mb-1"
                style={{
                  fontSize: "14px",
                  opacity: "0.85",
                  fontWeight: "600",
                  color: "#C1121F",
                  textTransform: "uppercase",
                }}
              >
                Total document
              </h3>
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: "700",
                  color: "#C1121F",
                  textTransform: "uppercase",
                }}
              >
                {Doc.length}
              </h3>
            </div>
          </div>
          <div className="col-9 p-2 px-4 justify-content-center align-middle align-items-center align-center">
              <Bar options={options} data={data} />
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div
          className="mt-5 p-4 row justify-content-around flex-wrap"
          style={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
        >
          <div className="d-flex justify-content-between my-4">
            <h3 style={{ fontSize: "20px", fontWeight: "600" }}>Document</h3>
            <Dropdown id="dropdown-menu-align-end" align="end">
              <Dropdown.Toggle as={FilterToggle} id="dropdown-menu-align-end" align="end"/>
                <Dropdown.Menu size="sm">
                  <Dropdown.Item
                    className="text-sm"
                    onClick={async() => {
                      var dat = {
                        name : "Latest Document"
                      };
                      var lts = await FilterDocument(dat);
                      setDoc(lts.data);
                    }}
                  >
                    Latest Document
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="text-sm"
                    onClick={async() => {
                      var dat = {
                        name : "Longest Document"
                      };
                      var lts = await FilterDocument(dat);
                      setDoc(lts.data);
                    }}
                  >            
                    Longest Document
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="text-sm"
                    onClick={async() => {
                      var dat = {
                        name : "Last Modified by me"
                      };
                      var lts = await FilterDocument(dat);
                      setDoc(lts.data);
                    }}
                  >            
                    Last Modified by me
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="text-sm"
                    onClick={async() => {
                      var dat = {
                        name : "title"
                      };
                      var lts = await FilterDocument(dat);
                      setDoc(lts.data);
                    }}
                  >            
                    title
                  </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {/* <button
              style={{
                borderRadius: "10px",
                border: "1.5px solid #CACACA",
                color: "#0E5073",
                fontSize: "14px",
                fontWeight: "500",
              }}
              className=" btn d-flex align-items-center"
              type=""
            >
              <FunnelSimple className="me-2" size={15} weight="bold" />
              Filter
            </button> */}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {Doc.length > 0
              ? Doc.map((val) => {
                  return (
                    <div
                      className="px-3 py-4"
                      style={{
                        backgroundColor: "#669BBC",
                        borderRadius: "10px",
                        fontWeight: "600",
                      }}
                    >
                      <div>
                        {userLogged?.role == "admin" || userLogged?.role == "subadmin" || userLogged?.role == "subsdiary" ? (
                          <div className="d-flex justify-content-end mb-2 ">
                            <Dropdown id="dropdown-menu-align-end" align="end">
                              <Dropdown.Toggle as={CustomToggle} id="dropdown-menu-align-end" align="end"/>

                              <Dropdown.Menu size="sm">
                                <Dropdown.Item
                                  className="text-sm"
                                  onClick={async () => {
                                    let field = [];

                                    const getDetailDocument =
                                      await GetDetailDoc(val.id);
                                    setDocument(getDetailDocument.result);
                                    getDetailDocument.result?.detail_documents?.map(
                                      (data) =>
                                        field.push({
                                          id: data.id,
                                          field_name: data.field_name,
                                          field_type: data.field_type,
                                          data_type: data.data_type,
                                          options: data?.field_documents ?? [],
                                        })
                                    );
                                    setField(field);
                                    setDefaultShow(
                                      getDetailDocument.result?.delegated_to
                                    );
                                    setModaledit(true);
                                  }}
                                >
                                  Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => {
                                    setDelete(true);
                                    setId(val.id);
                                  }}
                                  className="text-sm"
                                >
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                            {/* <a href="" className="ms-auto">
                                                    <DotsThreeOutlineVertical size={20} weight="fill" color="white" />
                                                </a> */}
                          </div>
                        ) : (
                          ""
                        )}
                        <h3
                          className="mb-2"
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "white",
                          }}
                        >
                          {val.title}
                        </h3>
                        <p
                          className="mb-2"
                          style={{
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "white",
                            lineHeight: "15px",
                          }}
                        >
                          {val.description}
                        </p>
                        <h3
                          className="mb-2"
                          style={{
                            fontSize: "12px",
                            fontWeight: "600",
                            color: "#003049",
                          }}
                        >
                          {`Show to ${new Array(val.delegated_to).length} Role`}
                          {/* Show to {val.delegated_to.size} Role */}
                          {/* Show to {Object.keys(val.delegated_to).length} Role */}
                        </h3>
                        {/* <h3 className="mb-2" style={{fontSize:"14px",fontWeight:'600',color:'#003049'}}>Show to {JSON.parse(val.delegated_to).length} Role</h3> */}
                        <div className="d-flex justify-content-end mt-3 ">
                          <a
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              navigate(`/document-management/detail/${val.id}`);
                            }}
                            className="ms-auto"
                          >
                            <ArrowRight size={30} weight="bold" color="white" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })
              : ""}
            {/* <div className="px-3 py-4" style={{backgroundColor:'#669BBC',borderRadius:'10px',fontWeight:'600'}}>
                            <div>
                                <div className="d-flex justify-content-end mb-2 ">
                                    <a href="" className="ms-auto">
                                        <DotsThreeOutlineVertical size={20} weight="fill" color="white"/>
                                    </a>
                                </div>
                                <h3 className="mb-2" style={{fontSize:"20px",fontWeight:'600',color:'white'}}>Permission</h3>
                                <p className="mb-2" style={{fontSize:"12px",fontWeight:'400',color:"white",lineHeight:'15px'}}>Provide a description of the permission here</p>
                                <h3 className="mb-2" style={{fontSize:"14px",fontWeight:'600',color:'#003049'}}>Show to 10 Role</h3>
                                <div className="d-flex justify-content-end mt-3 ">
                                    <a href="" className="ms-auto">
                                        <ArrowRight size={30} weight="bold" color="white"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 py-4" style={{backgroundColor:'#669BBC',borderRadius:'10px',fontWeight:'600'}}>
                            <div>
                                <div className="d-flex justify-content-end mb-2 ">
                                    <a href="" className="ms-auto">
                                        <DotsThreeOutlineVertical size={20} weight="fill" color="white"/>
                                    </a>
                                </div>
                                <h3 className="mb-2" style={{fontSize:"20px",fontWeight:'600',color:'white'}}>Time Off CS</h3>
                                <p className="mb-2" style={{fontSize:"12px",fontWeight:'400',color:"white",lineHeight:'15px'}}>Provide a description of the time off CS here</p>
                                <h3 className="mb-2" style={{fontSize:"14px",fontWeight:'600',color:'#003049'}}>Show to 3 Role</h3>
                                <div className="d-flex justify-content-end mt-3 ">
                                    <a href="" className="ms-auto">
                                        <ArrowRight size={30} weight="bold" color="white"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 py-4" style={{backgroundColor:'#669BBC',borderRadius:'10px',fontWeight:'600'}}>
                            <div>
                                <div className="d-flex justify-content-end mb-2 ">
                                    <a href="" className="ms-auto">
                                        <DotsThreeOutlineVertical size={20} weight="fill" color="white"/>
                                    </a>
                                </div>
                                <h3 className="mb-2" style={{fontSize:"20px",fontWeight:'600',color:'white'}}>Overtime</h3>
                                <p className="mb-2" style={{fontSize:"12px",fontWeight:'400',color:"white",lineHeight:'15px'}}>Provide a description of the overtime here</p>
                                <h3 className="mb-2" style={{fontSize:"14px",fontWeight:'600',color:'#003049'}}>Show to 15 Role</h3>
                                <div className="d-flex justify-content-end mt-3 ">
                                    <a href="" className="ms-auto">
                                        <ArrowRight size={30} weight="bold" color="white"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 py-4" style={{backgroundColor:'#669BBC',borderRadius:'10px',fontWeight:'600'}}>
                            <div>
                                <div className="d-flex justify-content-end mb-2 ">
                                    <a href="" className="ms-auto">
                                        <DotsThreeOutlineVertical size={20} weight="fill" color="white"/>
                                    </a>
                                </div>
                                <h3 className="mb-2" style={{fontSize:"20px",fontWeight:'600',color:'white'}}>Labor Demand</h3>
                                <p className="mb-2" style={{fontSize:"12px",fontWeight:'400',color:"white",lineHeight:'15px'}}>Provide a description of the Labor Demand here</p>
                                <h3 className="mb-2" style={{fontSize:"14px",fontWeight:'600',color:'#003049'}}>Show to 9 Role</h3>
                                <div className="d-flex justify-content-end mt-3 ">
                                    <a href="" className="ms-auto">
                                        <ArrowRight size={30} weight="bold" color="white"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 py-4" style={{backgroundColor:'#669BBC',borderRadius:'10px',fontWeight:'600'}}>
                            <div>
                                <div className="d-flex justify-content-end mb-2 ">
                                    <a href="" className="ms-auto">
                                        <DotsThreeOutlineVertical size={20} weight="fill" color="white"/>
                                    </a>
                                </div>
                                <h3 className="mb-2" style={{fontSize:"20px",fontWeight:'600',color:'white'}}>Employee Transfer</h3>
                                <p className="mb-2" style={{fontSize:"12px",fontWeight:'400',color:"white",lineHeight:'15px'}}>Provide a description of the Labor Demand here</p>
                                <h3 className="mb-2" style={{fontSize:"14px",fontWeight:'600',color:'#003049'}}>Show to 15 Role</h3>
                                <div className="d-flex justify-content-end mt-3 ">
                                    <a href="" className="ms-auto">
                                        <ArrowRight size={30} weight="bold" color="white"/>
                                    </a>
                                </div>
                            </div>
                        </div> */}
          </div>
        </div>
      </div>
      <Modal
        show={modal}
        size="lg"
        onHide={() => {
          setModal(false);
          setField([]);
        }}
      >
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Create Document Management System
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div
            className="px-4 pb-4 mb-4 pt-2"
            style={{
              borderRadius: "10px",
              border: "0",
              borderLeft: "15px solid #780000",
              boxShadow: "0px 0px 3px 0px rgba(179,179,179,1)",
            }}
          >
            <input
              style={{
                border: "0",
                outline: "none",
                borderBottom: "1px solid #EDEDED",
                backgroundColor: "transparent",
                fontSize: "20px",
                fontWeight: "500",
              }}
              onChange={(val) => {
                setDocument({ ...document, title: val.target.value });
              }}
              className="focus:ring-0 focus:ring-offset-0 me-3 w-50 "
              type="text"
              placeholder="Document Title"
            />
            <input
              style={{
                border: "0",
                outline: "none",
                borderBottom: "1px solid #EDEDED",
                backgroundColor: "transparent",
                fontSize: "12px",
                fontWeight: "500",
              }}
              onChange={(val) => {
                setDocument({ ...document, description: val.target.value });
              }}
              className="focus:ring-0 focus:ring-offset-0 me-3 form-control"
              type="text"
              placeholder="Document description"
            />
          </div>
          {fields.map((e, i) => {
            return (
              <div className="row mb-4">
                <div className="col-4 mb-2">
                  <input
                    onChange={(val) => {
                      var data = [...fields];
                      data[i]["field_name"] = val.target.value;
                      setField(data);
                    }}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                    type="text"
                    placeholder="Field Name"
                  />
                </div>
                <div className="col-3 mb-2">
                  <select
                    onChange={(val) => {
                      var data = [...fields];
                      data[i]["field_type"] = val.target.value;
                      if (
                        val.target.value == "option" ||
                        val.target.value == "checkbox" ||
                        val.target.value == "dropdown"
                      ) {
                        if (data[i]["options"].length == 0) {
                          data[i]["options"].push({
                            field_name: "",
                          });
                        }
                      } else {
                        data[i]["options"] = [];
                      }
                      setField(data);
                    }}
                    id="field_type"
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                  >
                    <option className="py-3" hidden>
                      Field Type
                    </option>
                    <option className="py-3" value="short_answer">
                      Short Answer
                    </option>
                    <option className="py-3" value="paragraph">
                      Paragraph
                    </option>
                    <option className="py-3" value="option">
                      Single Choice
                    </option>
                    <option className="py-3" value="checkbox">
                      Multiple Choice
                    </option>
                    <option className="py-3" value="dropdown">
                      Dropdown
                    </option>
                    <option className="py-3" value="file">
                      Upload File
                    </option>
                    <option className="py-3" value="date">
                      Date
                    </option>
                    <option className="py-3" value="time">
                      Time
                    </option>
                  </select>
                </div>
                <div className="col-3 mb-2">
                  <select
                    disabled={
                      e?.field_type == "short_answer" ||
                      e?.field_type == "paragraph"
                        ? false
                        : true
                    }
                    hidden={
                      e?.field_type == "short_answer" ||
                      e?.field_type == "paragraph" ||
                      e?.field_type == ""
                        ? false
                        : true
                    }
                    onChange={(val) => {
                      var data = [...fields];
                      data[i]["data_type"] = val.target.value;
                      setField(data);
                    }}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                  >
                    <option className="py-3" hidden>
                      Data Type
                    </option>
                    <option className="py-3" value="text">
                      Alphabet
                    </option>
                    <option className="py-3" value="number">
                      Number
                    </option>
                  </select>
                </div>
                {fields.length > 1 ? (
                  <div className="col-1 mb-2">
                    <button
                      type="button"
                      onClick={() => {
                        var data = [...fields];
                        data.splice(i, 1);
                        setField(data);
                      }}
                      className="rounded leading-tight p-2 btn bg-[#780000]"
                    >
                      <Delete
                        fontSize="small"
                        weight="bold"
                        style={{ color: "#FFFFFF" }}
                      />
                    </button>
                  </div>
                ) : (
                  <></>
                )}
                {i == fields.length - 1 ? (
                  <div className="col-1 mb-2">
                    <button
                      type="button"
                      onClick={() => {
                        setField([
                          ...fields,
                          {
                            field_name: "",
                            field_type: "",
                            data_type: "",
                            options: [],
                          },
                        ]);
                      }}
                      className="rounded leading-tight p-2 btn bg-[#669BBC]"
                    >
                      <Plus size={21} weight="bold" color="white" />
                    </button>
                  </div>
                ) : (
                  <></>
                )}
                <div className="d-flex flex-wrap">
                  {e?.options.map((elem, ind) => {
                    return (
                      <div className="d-flex justify-content-between align-items-center mr-3 mb-2">
                        {e.field_type == "checkbox" ||
                        e.field_type == "option" ? (
                          <input
                            type={
                              e.field_type == "checkbox" ? "checkbox" : "radio"
                            }
                            className="mr-2"
                          />
                        ) : (
                          <></>
                        )}
                        <input
                          value={elem.name}
                          onChange={(val) => {
                            var data = [...fields];
                            data[i]["options"][ind]["name"] = val.target.value;
                            setField(data);
                          }}
                          className="appearance-none border-0 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline focus:border-transparent"
                          type="text"
                          placeholder={`Field Name ${ind + 1}`}
                        />
                        {e?.options.length != 1 ? (
                          <button
                            type="button"
                            onClick={() => {
                              var data = [...fields];
                              data[i]["options"].splice(ind, 1);
                              setField(data);
                            }}
                            className="rounded leading-tight p-2 btn"
                          >
                            <Delete fontSize="small" />
                          </button>
                        ) : (
                          <></>
                        )}
                        {ind == e?.options.length - 1 ? (
                          <button
                            type="button"
                            onClick={() => {
                              var data = [...fields];
                              data[i]["options"].push({
                                field_name: "",
                              });
                              setField(data);
                            }}
                            className="rounded leading-tight p-2 btn"
                          >
                            <Plus size={10} weight="bold" color="black" />
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div className="">
            <label className="block text-gray-700 text-sm mb-2" for="username">
              Show To
            </label>
            <Select
              options={employeeto}
              isMulti
              onChange={(e) => {
                var data = [];
                for (var i in e) {
                  data.push(parseInt(e[i].value));
                }
                setShowTo(data);
                console.log(showto)
              }}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              // components={{
              //   Option,
              // }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="m-4" style={{ borderTop: "0" }}>
          <Button
            style={{
              border: "none",
              fontSize: "14px",
              backgroundColor: "#ECECEC",
              color: "#003049",
            }}
            className="px-3"
            onClick={() => {
              setModal(false);
              setField([]);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              addDocument();
            }}
            style={{
              border: "none",
              fontSize: "14px",
              backgroundColor: "#0E5073",
              color: "#FFFFFF",
            }}
            className="px-3"
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={editmodal}
        size="lg"
        onHide={() => {
          setModaledit(false);
          setField([]);
        }}
      >
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Document Management System {defaultShow[2]?.value}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div
            className="px-4 pb-4 mb-4 pt-2"
            style={{
              borderRadius: "10px",
              border: "0",
              borderLeft: "15px solid #780000",
              boxShadow: "0px 0px 3px 0px rgba(179,179,179,1)",
            }}
          >
            <input
              style={{
                border: "0",
                outline: "none",
                borderBottom: "1px solid #EDEDED",
                backgroundColor: "transparent",
                fontSize: "20px",
                fontWeight: "500",
              }}
              onChange={(val) => {
                setDocument({ ...document, title: val.target.value });
              }}
              value={document?.title}
              className="focus:ring-0 focus:ring-offset-0 me-3 w-50 "
              type="text"
              placeholder="Document Title"
            />
            <input
              style={{
                border: "0",
                outline: "none",
                borderBottom: "1px solid #EDEDED",
                backgroundColor: "transparent",
                fontSize: "12px",
                fontWeight: "500",
              }}
              onChange={(val) => {
                setDocument({ ...document, description: val.target.value });
              }}
              value={document?.description}
              className="focus:ring-0 focus:ring-offset-0 me-3 form-control"
              type="text"
              placeholder="Document description"
            />
          </div>
          {fields.map((e, i) => {
            return (
              <div className="row mb-4">
                <div className="col-4 mb-2">
                  <input
                    onChange={(val) => {
                      var data = [...fields];
                      data[i]["field_name"] = val.target.value;
                      setField(data);
                    }}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                    type="text"
                    value={e.field_name}
                    placeholder="Field Name"
                  />
                </div>
                <div className="col-3 mb-2">
                  <select
                    onChange={(val) => {
                      var data = [...fields];
                      data[i]["field_type"] = val.target.value;
                      if (
                        val.target.value == "option" ||
                        val.target.value == "checkbox" ||
                        val.target.value == "dropdown"
                      ) {
                        if (data[i]["options"].length == 0) {
                          data[i]["options"].push({
                            field_name: "",
                          });
                        }
                      } else {
                        data[i]["options"] = [];
                      }
                      setField(data);
                    }}
                    id="field_type"
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                  >
                    <option className="py-3" hidden>
                      Field Type
                    </option>
                    {fieldTypeEdit.map((fte) => {
                      return (
                        <option
                          className="py-3"
                          value={fte.value}
                          selected={e.field_type == fte.value ? true : false}
                        >
                          {fte.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-3 mb-2">
                  <select
                    disabled={
                      e?.field_type == "short_answer" ||
                      e?.field_type == "paragraph"
                        ? false
                        : true
                    }
                    hidden={
                      e?.field_type == "short_answer" ||
                      e?.field_type == "paragraph" ||
                      e?.field_type == ""
                        ? false
                        : true
                    }
                    onChange={(val) => {
                      var data = [...fields];
                      data[i]["data_type"] = val.target.value;
                      setField(data);
                    }}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                  >
                    <option className="py-3" hidden>
                      Data Type
                    </option>
                    {dataTypeOpt.map((dto) => {
                      return (
                        <option
                          className="py-3"
                          value={dto.value}
                          selected={e.data_type == dto.value ? true : false}
                        >
                          {dto.name}
                        </option>
                      );
                    })}
                    {/* <option className="py-3" value="text">
                      Alphabet
                    </option>
                    <option className="py-3" value="number">
                      Number
                    </option> */}
                  </select>
                </div>
                {fields.length > 1 ? (
                  <div className="col-1 mb-2">
                    <button
                      type="button"
                      onClick={() => {
                        var data = [...fields];
                        data.splice(i, 1);
                        setField(data);
                      }}
                      className="rounded leading-tight p-2 btn bg-[#780000]"
                    >
                      <Delete
                        fontSize="small"
                        weight="bold"
                        style={{ color: "#FFFFFF" }}
                      />
                    </button>
                  </div>
                ) : (
                  <></>
                )}
                {i == fields.length - 1 ? (
                  <div className="col-1 mb-2">
                    <button
                      type="button"
                      onClick={() => {
                        setField([
                          ...fields,
                          {
                            field_name: "",
                            field_type: "",
                            data_type: "",
                            options: [],
                          },
                        ]);
                      }}
                      className="rounded leading-tight p-2 btn bg-[#669BBC]"
                    >
                      <Plus size={21} weight="bold" color="white" />
                    </button>
                  </div>
                ) : (
                  <></>
                )}
                <div className="d-flex flex-wrap">
                  {e?.options.map((elem, ind) => {
                    return (
                      <div className="d-flex justify-content-between align-items-center mr-3 mb-2">
                        {e.field_type == "checkbox" ||
                        e.field_type == "option" ? (
                          <input
                            type={
                              e.field_type == "checkbox" ? "checkbox" : "radio"
                            }
                            className="mr-2"
                          />
                        ) : (
                          <></>
                        )}
                        <input
                          value={elem.name}
                          onChange={(val) => {
                            var data = [...fields];
                            data[i]["options"][ind]["name"] = val.target.value;
                            setField(data);
                          }}
                          className="appearance-none border-0 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline focus:border-transparent"
                          type="text"
                          placeholder={`Field Name ${ind + 1}`}
                        />
                        {e?.options.length != 1 ? (
                          <button
                            type="button"
                            onClick={() => {
                              var data = [...fields];
                              data[i]["options"].splice(ind, 1);
                              setField(data);
                            }}
                            className="rounded leading-tight p-2 btn"
                          >
                            <Delete fontSize="small" />
                          </button>
                        ) : (
                          <></>
                        )}
                        {ind == e?.options.length - 1 ? (
                          <button
                            type="button"
                            onClick={() => {
                              var data = [...fields];
                              data[i]["options"].push({
                                field_name: "",
                              });
                              setField(data);
                            }}
                            className="rounded leading-tight p-2 btn"
                          >
                            <Plus size={10} weight="bold" color="black" />
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div className="">
            <label className="block text-gray-700 text-sm mb-2" for="username">
              Show To
            </label>
            <Select
              className="basic-multi-select"
              options={employeeto}
              defaultValue={defaultShow}
              classNamePrefix="select"
              isMulti
              onChange={(e) => {
                var data = [];
                for (var i in e) {
                  data.push(parseInt(e[i].value));
                }
                setShowTo(data);
              }}
              // components={{
              //   Option,
              // }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="m-4" style={{ borderTop: "0" }}>
          <Button
            style={{
              border: "none",
              fontSize: "14px",
              backgroundColor: "#ECECEC",
              color: "#003049",
            }}
            className="px-3"
            onClick={() => {
              setModaledit(false);
              setField([]);
              setShowTo([]);
              setDefaultShow([]);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              editDocument();
            }}
            style={{
              border: "none",
              fontSize: "14px",
              backgroundColor: "#0E5073",
              color: "#FFFFFF",
            }}
            className="px-3"
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <ModalDelete
        close={() => {
          setDelete(false);
        }}
        submit={() => {
          try {
            DeleteDocument(id);
            inAwait();
            setDelete(false);
            SwalSuccess({ message: "Success delete document" });
          } catch (error) {
            console.log(error);
            SwalError({ message: "Error while deleting document" });
          }
        }}
        active={isdelete}
      />
    </>
  );
}
export default DocumentManagement;
