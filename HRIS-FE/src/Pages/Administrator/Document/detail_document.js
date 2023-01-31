import { useEffect, useState } from "react";
import {
  Plus,
  Eye,
  FileText,
  DotsThreeOutline,
  MagnifyingGlass,
  FunnelSimple,
  DotsThreeOutlineVertical,
  ArrowRight,
} from "phosphor-react";
import { Button, Modal, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
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
import ReactSelect from "react-select";
// import faker from 'faker';
import { components } from "react-select";
import {
  AddRespondend,
  AnswerDoc,
  GetDetailDoc,
  GetDoc,
} from "../../../Repository/DocumentRepository";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SwalError, SwalSuccess } from "../../../Components/Modals";
import { pushNotif } from "../../../Repository/NotifRepository";
import { getProfile } from "../../../Repository/ProfileRepository";
import { getReport } from "../../../Repository/ProfileEmployeeRepository";
import { GetJobPositionWithEmployee } from "../../../Repository/AdminRepository";

function DetailDocument() {
  const { id } = useParams();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const [modal, setModal] = useState(false);
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
        data: [80, 30, 90, 100, 80, 90, 110, 40, 20, 90, 100, 60],
        backgroundColor: "#780000",
        borderRadius: "20px",
      },
    ],
  };
  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <Form.Check
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
            id="default-checkbox"
            label={props.label}
          />
        </components.Option>
      </div>
    );
  };
  const showTo = [
    { value: "1", label: "Manager" },
    { value: "2", label: "Human Resources" },
    { value: "3", label: "Sales Acquisition" },
    { value: "4", label: "Sales External" },
    { value: "5", label: "Sales Research and Media Social" },
    { value: "6", label: "Advertiser" },
    { value: "7", label: "Finance" },
    { value: "8", label: "Support and Analyst" },
    { value: "9", label: "Information and Technology Development" },
  ];

  const [editUserData, setEditUserData] = useState();
  const [users, setUsers] = useState({});
  const [employeeLog, setEmployeeLog] = useState({});
  const [reportTo, setReportTo] = useState([]);
  const [Doc, setDoc] = useState([]);
  const [valueAns, setValueAns] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [supervisor, setSupervisor] = useState([]);
  const navigate = useNavigate();
  const inAwait = async () => {
    var empLog = await getProfile();
    var data = JSON.parse(window.localStorage.getItem("users"));
    var rec = await GetDetailDoc(id);
    var report = await getReport(data?.employeeId);
    const getJobPositionWithEmployee = await GetJobPositionWithEmployee(
      empLog.result?.employee?.jobposition?.relation_code
    );
    setUsers(data);
    setReportTo(report.result);
    setSupervisor(getJobPositionWithEmployee.result?.employees);
    setEmployeeLog(empLog.result);
    console.log(empLog.result);
    setDoc(rec["result"]);
  };
  useEffect(() => {
    inAwait();
  }, []);
  
  // console.log(employeeLog);
  const answerDoc = async () => {
    try {
      let allAnswer = [];

      await Doc.detail_documents.map((detail) => {
        if (detail.field_type == "file") {
          allAnswer.push({
            id_detail_document: detail.id,
            value: document.getElementById(detail.id).files[0],
            field_type: detail.field_type,
          });
        } else {
          allAnswer.push({
            id_detail_document: detail.id,
            value: document.getElementById(detail.id).value,
            field_type: detail.field_type,
          });
        }
      });
      // loop semua answer terus tembak api add answer
      const formData = new FormData();
      allAnswer.forEach(async (data) => {
        if (data.field_type == "file") {
          formData.append("id_detail_document", data.id_detail_document);
          formData.append("value", data.value);
          await AnswerDoc(formData);
        } else {
          await AnswerDoc({
            id_detail_document: data.id_detail_document,
            value: data.value,
          });
        }
      });

      // push notif api
      if (supervisor.length > 0) {
        supervisor?.map(async (supervisors) => {
          await pushNotif({
            title: `${employeeLog?.employee?.firstName} telah mengisi document ${Doc?.title}`,
            link: `/document-management/detail/${Doc?.id}/answer/employee/${users?.employeeId}`,
            employeeId: supervisors?.id,
          });
        });
      }

      if (reportTo?.length > 0) {
        reportTo.map(async (to) => {
          if (to.status == "supervisor") {
            await pushNotif({
              title: `${employeeLog?.employee?.firstName} telah mengisi document ${Doc?.title}`,
              link: `/document-management/detail/${Doc?.id}/answer/employee/${users?.employeeId}`,
              employeeId: to?.reportToEmployee,
            });
          }
        });
      } else {
        await pushNotif({
          title: `${employeeLog?.employee?.firstName} telah mengisi document ${Doc?.title}`,
          link: `/document-management/detail/${Doc?.id}/answer/employee/${users?.employeeId}`,
          employeeId: 84,
        });
      }
      var reqBody = {
        document_id : id,
        employeeId : employeeLog?.employeeId,
        jobposition_id : employeeLog?.employee?.jobposition_id,
        // jobposition_id : users?.employeeId?.jobposition,
      };
      // console.log(reqBody);
      var tambahres = await AddRespondend(reqBody);
      // console.log(tambahres);
      // var requestBody = {
      //   name: name,
      //   relationship: relationship,
      //   birthDate: birthDate,
      // };
      // console.log(requestBody);
      // var res = await addDependent(requestBody);
      // console.log(res); 
      SwalSuccess({ message: "Success submit the document!" });
      navigate("/document-management");
    } catch (error) {
      SwalError({ message: "Ups something went wrong :(" });
    }
  };

  function autoFill(label) {
    if(label.includes("Nama Jabatan") || label.includes("Jabatan Penyerah")) {
      return employeeLog?.employee?.jobtitle?.name
    }else if(label.includes("Nama Penyerah Jabatan") && !label.includes("Nama Penerima Jabatan")) {
      return employeeLog?.employee?.firstName
    }else if(label.includes("Nama Pemohon") || label.includes("Nama")) {
      return employeeLog?.employee?.firstName
    }else {
      return null
    }
  }

  return (
    <>
      <div className="container-fluid mb-4">
        {
          users?.role == "admin" ? (
            <div className="flex justify-end">
              <Link to={`/document-management/detail/${id}/answer`} className="me-3 btn d-flex align-items-center"
                style={{
                  borderRadius: "10px",
                  backgroundColor:'white',
                  border: "1.5px solid #CACACA",
                  color: "#0E5073",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                <Eye className="me-2" size={15} weight="bold" />
                Answer
              </Link>
            </div>
          ) : (
            ""
          )
        }
        <div
          className="mt-5 p-5 row justify-content-around flex-wrap"
          style={{ backgroundColor: "white", borderRadius: "10px" }}
        >
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
                setDoc({ ...Doc, title: val.target.value });
              }}
              value={Doc?.title}
              readOnly
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
                setDoc({ ...Doc, description: val.target.value });
              }}
              value={Doc?.description}
              readOnly
              className="focus:ring-0 focus:ring-offset-0 me-3 form-control"
              type="text"
              placeholder="Document description"
            />
          </div>
          {Doc.detail_documents ? (
            Doc.detail_documents.length > 0 ? (
              Doc.detail_documents.map((detail, index) => (
                <>
                  <div
                    className="p-4 mb-4"
                    style={{
                      borderRadius: "10px",
                      boxShadow: "0px 0px 3px 0px rgba(179,179,179,1)",
                    }}
                  >
                    {/* ============= MAININ IF ELSE IF DISINI ============== */}
                    {detail.field_type == "short_answer" ? (
                      <div>
                        <div>{detail.field_name}</div>
                        <input
                          style={{
                            border: "0",
                            outline: "none",
                            borderBottom: "1px solid #EDEDED",
                            backgroundColor: "transparent",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                          id={detail.id}
                          className="focus:ring-0 focus:ring-offset-0 me-3 form-control"
                          type="text"
                          defaultValue={autoFill(detail.field_name)}
                          placeholder="Short Answer"
                        />
                      </div>
                    ) : null}
                    {detail.field_type == "paragraph" ? (
                      <div>
                        <div>{detail.field_name}</div>
                        <textarea
                          style={{
                            border: "0",
                            outline: "none",
                            borderBottom: "1px solid #EDEDED",
                            backgroundColor: "transparent",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                          id={detail.id}
                          className="focus:ring-0 focus:ring-offset-0 me-3 form-control"
                          type="text"
                          placeholder="Paragraph"
                        ></textarea>
                      </div>
                    ) : null}
                    {detail.field_type == "checkbox" ? (
                      <>
                        <div>{detail.field_name}</div>
                        {detail.field_documents.map((fd) => (
                          <div>
                            <input
                              className="focus:ring-0 focus:ring-offset-0 me-3 form-control"
                              value={fd.name}
                              id={detail.id}
                              type="checkbox"
                            />
                            <span>{fd.name}</span>
                          </div>
                        ))}
                      </>
                    ) : null}
                    {detail.field_type == "option" ? (
                      <>
                        <div>{detail.field_name}</div>
                        {detail.field_documents.map((fd) => (
                          <div>
                            <input
                              name={`radio-${index}`}
                              className="focus:ring-0 focus:ring-offset-0 me-3 form-control"
                              value={fd.name}
                              id={detail.id}
                              onChange={(val) => {
                                setAnswers([
                                  ...answers,
                                  {
                                    id_detail_document: detail.id,
                                    value: val.target.value,
                                  },
                                ]);
                              }}
                              type="radio"
                            />
                            <span>{fd.name}</span>
                          </div>
                        ))}
                      </>
                    ) : null}
                    {detail.field_type == "dropdown" ? (
                      <>
                        <div>{detail.field_name}</div>
                        <div>
                          <select
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                            id={detail.id}
                          >
                            <option className="py-3" hidden>
                              Select
                            </option>
                            {detail.field_documents.map((fd) => (
                              <option className="py-3" value={fd.name}>
                                {fd.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </>
                    ) : null}
                    {detail.field_type == "file" ? (
                      <>
                        <div>{detail.field_name}</div>
                        <input
                          id={detail.id}
                          className="focus:ring-0 focus:ring-offset-0 me-3 form-control"
                          type="file"
                        />
                      </>
                    ) : null}
                    {detail.field_type == "date" ? (
                      <>
                        <div>{detail.field_name}</div>
                        <input
                          id={detail.id}
                          className="focus:ring-0 focus:ring-offset-0 me-3 form-control"
                          style={{
                            borderRadius: "10px",
                            border: "1.5px solid #EDEDED",
                            backgroundColor: "transparent",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                          type="date"
                        />
                      </>
                    ) : null}
                    {detail.field_type == "time" ? (
                      <>
                        <div>{detail.field_name}</div>
                        <input
                          id={detail.id}
                          className="focus:ring-0 focus:ring-offset-0 me-3 form-control"
                          style={{
                            borderRadius: "10px",
                            border: "1.5px solid #EDEDED",
                            backgroundColor: "transparent",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                          type="time"
                          placeholder="Short Answer"
                        />
                      </>
                    ) : null}
                  </div>
                </>
              ))
            ) : (
              <p>No Data</p>
            )
          ) : (
            ""
          )}

          <div className="d-flex justify-end">
            <button
              style={{
                borderRadius: "10px",
                backgroundColor: "#0E5073",
                fontSize: "14px",
                fontWeight: "500",
              }}
              className="btn d-flex align-items-center text-white"
              type="button"
              onClick={() => answerDoc()}
            >
              Submit
            </button>
          </div>
          {/* <div
            className="p-4 mb-4"
            style={{
              borderRadius: "10px",
              boxShadow: "0px 0px 3px 0px rgba(179,179,179,1)",
            }}
          >
            <div>This is the question in field name 1</div>
            <div>
              <Form.Check type="radio" id="res" label="Option 1" />
              <Form.Check type="radio" id="res" label="Option 2" />
              <Form.Check type="radio" id="res" label="Option 3" />
            </div>
          </div>
          <div
            className="p-4 mb-4"
            style={{
              borderRadius: "10px",
              boxShadow: "0px 0px 3px 0px rgba(179,179,179,1)",
            }}
          >
            <div>This is the question in field name 2</div>
            <div>
              <Form.Check type="checkbox" id="res" label="Option 1" />
              <Form.Check type="checkbox" id="res" label="Option 2" />
              <Form.Check type="checkbox" id="res" label="Option 3" />
            </div>
          </div>
          <div
            className="p-4 mb-4"
            style={{
              borderRadius: "10px",
              boxShadow: "0px 0px 3px 0px rgba(179,179,179,1)",
            }}
          >
            <div>This is the question in field name 2</div>
            <div>
              <input
                style={{
                  border: "0",
                  outline: "none",
                  borderBottom: "1px solid #EDEDED",
                  backgroundColor: "transparent",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
                onChange={(val) => {}}
                className="focus:ring-0 focus:ring-offset-0 me-3 form-control"
                type="text"
                placeholder="Short Answer"
              />
            </div>
          </div>
          <div
            className="p-4 mb-4"
            style={{
              borderRadius: "10px",
              boxShadow: "0px 0px 3px 0px rgba(179,179,179,1)",
            }}
          >
            <div>This is the question in field name 3</div>
            <div>
              <textarea
                style={{
                  border: "0",
                  outline: "none",
                  borderBottom: "1px solid #EDEDED",
                  backgroundColor: "transparent",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
                onChange={(val) => {}}
                className="focus:ring-0 focus:ring-offset-0 me-3 form-control"
                type="text"
                placeholder="Paragraph"
              ></textarea>
            </div>
          </div>
          <div
            className="p-4 mb-4"
            style={{
              borderRadius: "10px",
              boxShadow: "0px 0px 3px 0px rgba(179,179,179,1)",
            }}
          >
            <div>This is the question in field name 4</div>
            <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
              <option className="py-3" hidden>
                Select
              </option>
              <option className="py-3">Contract Not Renewed</option>
              <option className="py-3">Deceased</option>
              <option className="py-3">Dismised</option>
              <option className="py-3">Laid-off</option>
              <option className="py-3">Other</option>
            </select>
          </div>
          <div
            className="p-4 mb-4"
            style={{
              borderRadius: "10px",
              boxShadow: "0px 0px 3px 0px rgba(179,179,179,1)",
            }}
          >
            <div>This is the question in field name 5</div>
            <input
              onChange={(val) => {}}
              className="focus:ring-0 focus:ring-offset-0 me-3 form-control"
              type="file"
              placeholder="Short Answer"
            />
          </div>
          <div
            className="p-4 mb-4"
            style={{
              borderRadius: "10px",
              boxShadow: "0px 0px 3px 0px rgba(179,179,179,1)",
            }}
          >
            <div>This is the question in field name 5</div>
            <input
              onChange={(val) => {}}
              className="focus:ring-0 focus:ring-offset-0 me-3 form-control"
              style={{
                borderRadius: "10px",
                border: "1.5px solid #EDEDED",
                backgroundColor: "transparent",
                fontSize: "12px",
                fontWeight: "500",
              }}
              type="date"
              placeholder="Short Answer"
            />
          </div>
          <div
            className="p-4 mb-4"
            style={{
              borderRadius: "10px",
              boxShadow: "0px 0px 3px 0px rgba(179,179,179,1)",
            }}
          >
            <div>This is the question in field name 5</div>
            <input
              onChange={(val) => {}}
              className="focus:ring-0 focus:ring-offset-0 me-3 form-control"
              style={{
                borderRadius: "10px",
                border: "1.5px solid #EDEDED",
                backgroundColor: "transparent",
                fontSize: "12px",
                fontWeight: "500",
              }}
              type="time"
              placeholder="Short Answer"
            />
          </div> */}
        </div>
      </div>
      {/* <Modal show={modal} size="lg" onHide={() => setModal(false)}>
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
              onChange={(val) => {}}
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
              onChange={(val) => {}}
              className="focus:ring-0 focus:ring-offset-0 me-3 form-control"
              type="text"
              placeholder="Document description"
            />
          </div>
          <div className="row mb-4">
            <div className="col-5">
              <input
                onChange={(val) => {}}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="text"
                placeholder="Field Name"
              />
            </div>
            <div className="col-3">
              <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                <option className="py-3">Field Type</option>
                <option className="py-3">Short Answer</option>
                <option className="py-3">Paragraph</option>
                <option className="py-3">Multiple Choice</option>
                <option className="py-3">Check Box</option>
                <option className="py-3">Dropdown</option>
                <option className="py-3">Upload File</option>
                <option className="py-3">Date</option>
                <option className="py-3">Time</option>
              </select>
            </div>
            <div className="col-3">
              <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                <option className="py-3">Data Type</option>
                <option className="py-3">String</option>
                <option className="py-3">Interger</option>
                <option className="py-3">File</option>
              </select>
            </div>
            <div className="col">
              <button
                type="submit"
                className="rounded leading-tight p-2 btn bg-[#669BBC]"
              >
                <Plus size={18} weight="bold" color="white" />
              </button>
            </div>
          </div>
          <div className="">
            <label className="block text-gray-700 text-sm mb-2" for="username">
              Show To
            </label>
            <ReactSelect
              options={showTo}
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{
                Option,
              }}
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
            onClick={() => setModal(false)}
          >
            Cancel
          </Button>
          <Button
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
      </Modal> */}
    </>
  );
}
export default DetailDocument;
