import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  ListChecks,
  Envelope,
  X,
} from "phosphor-react";
import {
  Dropdown,
  Modal,
  Button,
  DropdownButton,
  Badge,
} from "react-bootstrap";
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
  VaccinesOutlined,
} from "@mui/icons-material";
import {
  AddStage,
  GetApplicant,
  GetStage,
  UpdateApplicant,
  updateStatusStage,
} from "../../../Repository/RecruitmentRepository";
import { SwalSuccess, ModalConfirmEmail, ModalConfirmApplicant } from "../../../Components/Modals";
import { Drawer } from "@mui/material";
import * as XLSX from "xlsx";

function DetailStage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOnProg, setOnProg] = useState(true);
  const [modal, setModal] = useState(false);
  const [stagemodal, setstageModal] = useState(false);
  const [stage, setStage] = useState([]);
  const [detail, setDetail] = useState();
  const [isdelete, setDelete] = useState(false);
  const [isAccept, setAccept] = useState(false);
  const inAwait = async () => {
    var rec = await GetStage(location.state.applicant_id);
    setStage(rec);
  };
  useEffect(() => {
    inAwait();
  }, []);
  
  const exportExcel = async () => {
    if (stage.length > 0) {
      var wb = XLSX.utils.book_new();
      var data = [];

      await stage.map((app) => {
        data.push({
          "Stage" : app.stage,
          "Position" : app.position,
          "Tanggal Melamar": app.date,
          "Nomor Telepon": app.phone,
          "Status": app.status,
        });
      });

      var ws = XLSX.utils.json_to_sheet(data);

      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

      XLSX.writeFile(wb, `${location.state?.name} Stage.xlsx`);
      console.log("Exported excel!");
    } else {
      alert("Data masih kosong");
    }
  };
  return (
    <>
      <div className="bg-light p-4" style={{ borderRadius: "10px" }}>
        <div className="mb-5 d-flex justify-content-between">
          <div className="row">
            <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
              {location.state?.name}
            </h3>
            <span
              style={{ fontSize: "10px", fontWeight: "400", color: "#737373" }}
            >
              List of stage for employee recruitment
            </span>
          </div>
          {location.state.status == "1" ? (
            <>
              <div className="flex justify-content-evenly">
                <button
                  style={{
                    borderRadius: "10px",
                    border: "1.5px solid #A9A9A9",
                    color: "#003049",
                    fontSize: "14px",
                    fontWeight: "600",
                    backgroundColor: "#F9F9F9",
                  }}
                  className="me-3 btn d-flex align-items-center"
                  onClick={() => {
                    exportExcel();
                  }}
                  type=""
                >
                  <svg
                    className="me-2"
                        width="14"
                        height="16"
                        viewBox="0 0 14 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.69 10.715C13.652 10.6241 13.5987 10.5404 13.5325 10.4675L11.2825 8.2175C11.1413 8.07627 10.9497 7.99693 10.75 7.99693C10.5503 7.99693 10.3587 8.07627 10.2175 8.2175C10.0763 8.35873 9.99693 8.55027 9.99693 8.75C9.99693 8.94973 10.0763 9.14127 10.2175 9.2825L11.1925 10.25H7C6.80109 10.25 6.61032 10.329 6.46967 10.4697C6.32902 10.6103 6.25 10.8011 6.25 11C6.25 11.1989 6.32902 11.3897 6.46967 11.5303C6.61032 11.671 6.80109 11.75 7 11.75H11.1925L10.2175 12.7175C10.1472 12.7872 10.0914 12.8702 10.0533 12.9616C10.0153 13.053 9.99565 13.151 9.99565 13.25C9.99565 13.349 10.0153 13.447 10.0533 13.5384C10.0914 13.6298 10.1472 13.7128 10.2175 13.7825C10.2872 13.8528 10.3702 13.9086 10.4616 13.9467C10.553 13.9847 10.651 14.0043 10.75 14.0043C10.849 14.0043 10.947 13.9847 11.0384 13.9467C11.1298 13.9086 11.2128 13.8528 11.2825 13.7825L13.5325 11.5325C13.602 11.4621 13.6556 11.3777 13.69 11.285C13.765 11.1024 13.765 10.8976 13.69 10.715ZM8.5 14H2.5C2.30109 14 2.11032 13.921 1.96967 13.7803C1.82902 13.6397 1.75 13.4489 1.75 13.25V2.75C1.75 2.55109 1.82902 2.36032 1.96967 2.21967C2.11032 2.07902 2.30109 2 2.5 2H6.25V4.25C6.25 4.84674 6.48705 5.41903 6.90901 5.84099C7.33097 6.26295 7.90326 6.5 8.5 6.5H11.5C11.6481 6.49926 11.7926 6.45471 11.9154 6.37196C12.0382 6.28921 12.1337 6.17196 12.19 6.035C12.2474 5.89842 12.2631 5.74788 12.2351 5.60239C12.2071 5.4569 12.1366 5.32297 12.0325 5.2175L7.5325 0.7175C7.4705 0.659162 7.39962 0.611061 7.3225 0.575H7.255L7.045 0.5H2.5C1.90326 0.5 1.33097 0.737053 0.90901 1.15901C0.487053 1.58097 0.25 2.15326 0.25 2.75V13.25C0.25 13.8467 0.487053 14.419 0.90901 14.841C1.33097 15.2629 1.90326 15.5 2.5 15.5H8.5C8.69891 15.5 8.88968 15.421 9.03033 15.2803C9.17098 15.1397 9.25 14.9489 9.25 14.75C9.25 14.5511 9.17098 14.3603 9.03033 14.2197C8.88968 14.079 8.69891 14 8.5 14ZM7.75 3.0575L9.6925 5H8.5C8.30109 5 8.11032 4.92098 7.96967 4.78033C7.82902 4.63968 7.75 4.44891 7.75 4.25V3.0575Z"
                          fill="#003049"
                        />
                      </svg>
                      <span>Export</span>
                </button>
                <button
                  style={{
                    borderRadius: "10px",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                  className="bg-[#0E5073] btn d-flex align-items-center align-middle"
                  onClick={() => setstageModal(true)}
                  type=""
                >
                  <Plus className="me-2" size={20} weight="bold" />
                  Add
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="table-responsive">
          <table
            className="table mt-1 table-borderless"
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
                  Stage <ImportExport fontSize="2px" />
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
                  Status <ImportExport fontSize="2px" />
                </th>
                <th className="align-middle pe-5" onClick={() => {}}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {stage.length > 0 ? (
                stage.map((val, i) => {
                  return (
                    <tr style={{ fontSize: "14px" }} key={i}>
                      <td className="align-middle">{val["stage"]}</td>
                      <td className="align-middle">{val.position}</td>
                      <td className="align-middle">{val["date"]}</td>
                      <td className="align-middle">{val["phone"]}</td>
                      <td className="align-middle">
                        <span
                          className="p-2.5"
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
                      <td className="align-middle gap-2 d-flex">
                        <Dropdown>
                          <Dropdown.Toggle
                            disabled={
                              location.state.status == "1" ? false : true
                            }
                            style={{ backgroundColor: "#CECECE", outline: "0" }}
                            className="text-dark border-0 bg-[#CECECE] hover:bg-[#CECECE] active:bg-[#CECECE] focus:bg-[#CECECE] focus:ring-0 focus:ring-offset-0 focus:outline-0 active:ring-0 active:ring-offset-0 active:outline-0"
                          >
                            Action
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              href="#"
                              onClick={async () => {
                                var requestBody = {
                                  id: val.stage_id,
                                  status: "2",
                                };
                                var data = await updateStatusStage(requestBody);
                                if (data == "success") {
                                  await SwalSuccess({
                                    message: "Success update status",
                                  });
                                  await inAwait();
                                }
                              }}
                            >
                              Success
                            </Dropdown.Item>
                            <Dropdown.Item
                              href="#"
                              onClick={async () => {
                                var requestBody = {
                                  id: val.stage_id,
                                  status: "0",
                                };
                                var data = await updateStatusStage(requestBody);
                                if (data == "success") {
                                  await SwalSuccess({
                                    message: "Success update status",
                                  });
                                  await inAwait();
                                }
                              }}
                            >
                              Failed
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <Button
                          onClick={() => setDelete(true)}
                          className="text-dark border-0 bg-[#CECECE] hover:bg-[#CECECE] active:bg-[#CECECE] focus:bg-[#CECECE] focus:ring-0 focus:ring-offset-0 focus:outline-0 active:ring-0 active:ring-offset-0 active:outline-0"
                        >
                          <Envelope size={25} weight="bold" />
                        </Button>
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
          <hr />
          {location.state.status == "1" ? (
            <div className="mt-4 d-flex align-center align-items-center justify-content-start">
              End Recruitment ?
              <button
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#CAFFDF",
                  color: "#028F3B",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
                className="ms-3 py-2.5 px-4 btn d-flex align-items-center"
                onClick={async () => {
                  var requestBody = {
                    id: location.state.applicant_id,
                    status: 2,
                  };

                  console.log(requestBody);
                  var data = await UpdateApplicant(requestBody);
                  console.log(data)
                  if (data["message"] == "success") {
                    await SwalSuccess({
                      message: "Applicant has been accepted",
                    });
                    await inAwait();
                    navigate(-1);
                  }
                }}
                type=""
              >
                Accept
              </button>
              <button
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#FFE0E0",
                  color: "#C1121F",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
                className="ms-3 py-2.5 px-4 btn d-flex align-items-center"
                onClick={async () => {
                  var requestBody = {
                    id: location.state.applicant_id,
                    status: "0",
                  };
                  console.log(requestBody);
                  var data = await UpdateApplicant(requestBody);
                  if (data["message"] == "success") {
                    await SwalSuccess({
                      message: "Applicant has been rejected",
                    });
                    navigate(-1);
                  }
                }}
                type=""
              >
                Reject
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <Modal show={stagemodal} size="md" onHide={() => setstageModal(false)}>
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Recruitment Stage
          </Modal.Title>
        </Modal.Header>
        <form
          method="POST"
          onSubmit={async (e) => {
            e.preventDefault();
            var requestBody = {
              stage: document.getElementById("name").value,
              note: document.getElementById("note").value,
              applicant_id: location.state.applicant_id,
            };
            var res = await AddStage(requestBody);
            if (res == "success") {
              setstageModal(false);
              await SwalSuccess({ message: "Success add stage" });
              await inAwait();
            }
          }}
        >
          <Modal.Body className="m-4">
            <div className="">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm mb-2"
                  for="username"
                >
                  Stage Name <span style={{ color: "#780000" }}>*</span>
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Stage Name"
                  required
                />
              </div>
              <div className="">
                <label
                  className="block text-gray-700 text-sm mb-2"
                  for="username"
                >
                  Note
                </label>
                <textarea
                  id="note"
                  rows="4"
                  required
                  placeholder="Note here"
                  className=" appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                ></textarea>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="m-4">
            <Button
              style={{
                border: "none",
                fontSize: "14px",
                backgroundColor: "#ECECEC",
                color: "#003049",
              }}
              className="px-3"
              type="button"
              onClick={() => setstageModal(false)}
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
              type="submit"
            >
              Add
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
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
            onClick={() => {}}
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

      <ModalConfirmEmail
        close={() => {
          setDelete(false);
        }}
        submit={() => {
          setDelete(false);
          SwalSuccess({ message: "Success send email!" });
        }}
        active={isdelete}
      />
      <ModalConfirmApplicant
        close={() => {
          setAccept(false);
        }}
        submit={() => {
          setAccept(false);
          SwalSuccess({ message: "Success Accept Applicant!" });
        }}
        active={isAccept}
      />
    </>
  );
}
export default DetailStage;
