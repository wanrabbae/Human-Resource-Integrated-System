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
import { SwalSuccess } from "../../../Components/Modals";
import { Drawer } from "@mui/material";

function DetailStage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOnProg, setOnProg] = useState(true);
  const [modal, setModal] = useState(false);
  const [stagemodal, setstageModal] = useState(false);
  const [stage, setStage] = useState([]);
  const [detail, setDetail] = useState();
  const inAwait = async () => {
    var rec = await GetStage(location.state.id);
    setStage(rec);
  };
  useEffect(() => {
    inAwait();
  }, []);
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
          {location.state.status == "1" ? <button style={{ borderRadius: '10px', color: "white", fontSize: "14px", fontWeight: '500' }} className="bg-[#0E5073] btn d-flex align-items-center align-middle" onClick={() => setstageModal(true)} type=""><Plus className="me-2" size={20} weight="bold" />Add</button> : <></>}
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
                <th className="align-middle " onClick={() => { }}>
                  Stage <ImportExport fontSize="2px" />
                </th>
                <th className="align-middle " onClick={() => { }}>
                  Position
                  <ImportExport fontSize="2px" />
                </th>
                <th className="align-middle " onClick={() => { }}>
                  Tanggal Melamar <ImportExport fontSize="2px" />
                </th>
                <th className="align-middle " onClick={() => { }}>
                  Nomor Telepon <ImportExport fontSize="2px" />
                </th>
                <th className="align-middle " onClick={() => { }}>
                  Status <ImportExport fontSize="2px" />
                </th>
                <th className="align-middle pe-5" onClick={() => { }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {stage.length > 0 ? (
                stage.map((val, i) => {
                  return (
                    <tr style={{ fontSize: "14px" }} key={i}>
                      <td className="align-middle">{val["name"]}</td>
                      <td className="align-middle">
                        {val["applicant"]["recruitment"]["position"]}
                      </td>
                      <td className="align-middle">
                        {val["applicant"]["date"]}
                      </td>
                      <td className="align-middle">
                        {val["applicant"]["phone"]}
                      </td>
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
                          <Dropdown.Toggle disabled={location.state.status == "1" ? false : true} style={{ backgroundColor: '#CECECE', outline: '0' }} className="text-dark border-0 bg-[#CECECE] hover:bg-[#CECECE] active:bg-[#CECECE] focus:bg-[#CECECE] focus:ring-0 focus:ring-offset-0 focus:outline-0 active:ring-0 active:ring-offset-0 active:outline-0" >
                            Action
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              href="#"
                              onClick={async () => {
                                var requestBody = {
                                  id: val.id,
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
                                  id: val.id,
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
          {location.state.status == "1" ?
            <div className="mt-4 d-flex align-center align-items-center justify-content-start">
              End Recruitment ?
              <button
                style={{
                  borderRadius: "10px",
                  backgroundColor: '#CAFFDF',
                  color: "#028F3B",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
                className="ms-3 py-2.5 px-4 btn d-flex align-items-center"
                onClick={async () => {
                  var requestBody = {
                    id: location.state.id,
                    status: "2",
                  }

                  console.log(requestBody);
                  var data = await UpdateApplicant(requestBody);
                  if (data['message'] == "success") {
                    await SwalSuccess({ message: "Applicant has been accepted" });
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
                  backgroundColor: '#FFE0E0',
                  color: "#C1121F",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
                className="ms-3 py-2.5 px-4 btn d-flex align-items-center"
                onClick={async () => {
                  var requestBody = {
                    id: location.state.id,
                    status: "0",
                  }
                  console.log(requestBody);
                  var data = await UpdateApplicant(requestBody);
                  if (data['message'] == "success") {
                    await SwalSuccess({ message: "Applicant has been rejected" });
                    navigate(-1);
                  }
                }}
                type=""
              >
                Reject
              </button>
            </div>
            :
            <></>
          }
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
            onClick={async () => {
              var requestBody = {
                name: document.getElementById("name").value,
                note: document.getElementById("note").value,
                applicant_id: location.state.id,
              };
              var res = await AddStage(requestBody);
              if (res == "success") {
                setstageModal(false);
                await SwalSuccess({ message: "Success add stage" });
                await inAwait();
              }
            }}
          >
            Add
          </Button>
        </Modal.Footer>
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
            onClick={() => { }}
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
    </>
  );
}
export default DetailStage;
