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
  AnswerDoc,
  GetAnswerByIdDetailDoc,
  GetDetailDoc,
  GetDetailDocWithAnswer,
  GetDoc,
} from "../../../Repository/DocumentRepository";
import { useNavigate, useParams } from "react-router-dom";
import { SwalSuccess } from "../../../Components/Modals";
import { pushNotif } from "../../../Repository/NotifRepository";
import { getProfile } from "../../../Repository/ProfileEmployeeRepository";

function DetailDocumentAnswer() {
  const { id_document, id_employee } = useParams();

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
  const [empLog, setEmpLog] = useState({});
  const [Doc, setDoc] = useState([]);
  const [valueAns, setValueAns] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [answerDoc, setAnswerDoc] = useState([]);
  const navigate = useNavigate();
  const inAwait = async () => {
    var data = JSON.parse(window.localStorage.getItem("users"));
    var getProfileData = await getProfile(data?.employeeId);
    var rec = await GetDetailDocWithAnswer(id_document, id_employee);
    setUsers(data);
    setEmpLog(getProfileData.result);
    setDoc(rec["result"]);
    console.log(rec)
  };
  useEffect(() => {
    inAwait();
  }, []);

  // Doc?.detail_documents?.map(async (detail) => {
  //   const getAnswer = await GetAnswerByIdDetailDoc(detail.id);
  //   setAnswerDoc(getAnswer?.result)
  // });

  const acceptDoc = async () => {
    try {
      await pushNotif({
        title: `${Doc?.title} Document Has Accepted By ${empLog?.firstName}`,
        link: `/document-management/detail/${Doc?.id}/employee/${id_employee}`,
        employeeId: id_employee,
      });
      SwalSuccess({ message: "Success accepted the document!" });
      navigate("/document-management");
    } catch (error) {
      console.log(error);
    }
  };

  const declineDoc = async () => {
    try {
      await pushNotif({
        title: `${Doc?.title} Document Has Declined By ${empLog?.firstName}`,
        link: `/document-management/detail/${Doc?.id}/employee/${id_employee}`,
        employeeId: id_employee,
      });
      SwalSuccess({ message: "Success declined the document!" });
      navigate("/document-management");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-fluid mb-4">
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
                          onChange={(val) => {
                            setAnswers([
                              ...answers,
                              {
                                id_detail_document: detail.id,
                                value: val.target.value,
                              },
                            ]);
                          }}
                          className="focus:ring-0 focus:ring-offset-0 me-3 form-control"
                          type="text"
                          placeholder="Short Answer"
                        />
                        {detail?.document_answers?.map((answer) => (
                          <div className="mt-2">Answer : {answer?.value}</div>
                        ))}
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
                          onChange={(val) => {
                            setAnswers([
                              ...answers,
                              {
                                id_detail_document: detail.id,
                                value: val.target.value,
                              },
                            ]);
                          }}
                          className="focus:ring-0 focus:ring-offset-0 me-3 form-control"
                          type="text"
                          placeholder="Paragraph"
                        ></textarea>
                        {detail?.document_answers?.map((answer) => (
                          <div className="mt-2">Answer : {answer?.value}</div>
                        ))}
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
                              onChange={(val) => {
                                setAnswers([
                                  ...answers,
                                  {
                                    id_detail_document: detail.id,
                                    value: val.target.value,
                                  },
                                ]);
                              }}
                              type="checkbox"
                            />
                            <span>{fd.name}</span>
                          </div>
                        ))}
                        {detail?.document_answers?.map((answer) => (
                          <div className="mt-2">Answer : {answer?.value}</div>
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
                        {detail?.document_answers?.map((answer) => (
                          <div className="mt-2">Answer : {answer?.value}</div>
                        ))}
                      </>
                    ) : null}
                    {detail.field_type == "dropdown" ? (
                      <>
                        <div>{detail.field_name}</div>
                        <div>
                          <select
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                            onChange={(val) => {
                              setAnswers([
                                ...answers,
                                {
                                  id_detail_document: detail.id,
                                  value: val.target.value,
                                },
                              ]);
                            }}
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
                          {detail?.document_answers?.map((answer) => (
                            <div className="mt-2">Answer : {answer?.value}</div>
                          ))}
                        </div>
                      </>
                    ) : null}
                    {detail.field_type == "file" ? (
                      <>
                        <div>{detail.field_name}</div>
                        <input
                          onChange={(val) => {
                            setAnswers([
                              ...answers,
                              {
                                id_detail_document: detail.id,
                                value: val.target.files[0],
                              },
                            ]);
                          }}
                          className="focus:ring-0 focus:ring-offset-0 me-3 form-control"
                          type="file"
                        />
                        {detail?.document_answers?.map((answer) => (
                          <div className="mt-2">
                            File :{" "}
                            <a
                              target={"_blank"}
                              className={"text-blue-600"}
                              href={`https://hris.afkaaruna.sch.id/assets/documents/${answer?.value}`}
                            >
                              {answer?.value}
                            </a>
                          </div>
                        ))}
                      </>
                    ) : null}
                    {detail.field_type == "date" ? (
                      <>
                        <div>{detail.field_name}</div>
                        <input
                          onChange={(val) => {
                            setAnswers([
                              ...answers,
                              {
                                id_detail_document: detail.id,
                                value: val.target.value,
                              },
                            ]);
                          }}
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
                        {detail?.document_answers?.map((answer) => (
                          <div className="mt-2">Answer : {answer?.value}</div>
                        ))}
                      </>
                    ) : null}
                    {detail.field_type == "time" ? (
                      <>
                        <div>{detail.field_name}</div>
                        <input
                          onChange={(val) => {
                            setAnswers([
                              ...answers,
                              {
                                id_detail_document: detail.id,
                                value: val.target.value,
                              },
                            ]);
                          }}
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
                        {detail?.document_answers?.map((answer) => (
                          <div className="mt-2">Answer : {answer?.value}</div>
                        ))}
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
                  backgroundColor: "#FFE0E0",
                  color: "#C1121F",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
                className="ms-3 py-2.5 px-4 btn d-flex align-items-center"
                type="button"
                onClick={() => declineDoc()}
              >
                Decline
              </button>
              <button
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#CAFFDF",
                  color: "#028F3B",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
                className="ms-3 py-2.5 px-4 btn d-flex align-items-center"
                type="button"
                onClick={() => acceptDoc()}
              >
                Accept
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
export default DetailDocumentAnswer;
