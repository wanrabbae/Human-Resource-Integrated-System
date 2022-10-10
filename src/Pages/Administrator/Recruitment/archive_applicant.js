import { useState, useEffect } from "react";
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
  ListChecks,
  X,
} from "phosphor-react";
import { Dropdown, Modal, Button } from "react-bootstrap";
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
  FilterApplicant,
  GetApplicant,
  UpdateApplicant,
  searchApplicant,
  GetApplicantByDate,
  GetApplicantArchive,
  searchApplicantArchive,
} from "../../../Repository/RecruitmentRepository";
import { Drawer } from "@mui/material";
import MultiRangeSlider from "../../../Utils/multiRangeSlider/MultiRangeSlider";
import { SwalSuccess } from "../../../Components/Modals";
import * as XLSX from "xlsx";

function ArchiveApplicant() {
  const navigate = useNavigate();
  const [filter, setfilter] = useState(false);
  const [modal, setModal] = useState(false);
  const [stagemodal, setstageModal] = useState(false);
  const [applicant, setApplicant] = useState([]);
  const [applicantFilter, setApplicantFilter] = useState({});
  const [sourceFilter, setSourceFilter] = useState([]);
  const [positionFilter, setPositionFilter] = useState([]);
  const [studiFilter, setStudiFilter] = useState([]);
  const [genderFilter, setGenderFilter] = useState([]);

  const [detail, setDetail] = useState();
  const inAwait = async () => {
    var rec = await GetApplicantArchive();
    setApplicant(rec);
    // console.log(inAwait)
  };
  useEffect(() => {
    inAwait();
  }, []);

  const exportExcel = async () => {
    if (applicant.length > 0) {
      var wb = XLSX.utils.book_new();
      var data = [];

      await applicant.map((app) => {
        data.push({
          "Rejected Date": app.date,
          "Full Name": app.name,
          Position: app.position ?? "",
          "Apply Date":
            new Date(app.createdAt).getFullYear() +
            "-" +
            new Date(app.createdAt).getMonth() +
            "-" +
            new Date(app.createdAt).getDate(),
          "Phone Number": app.phone,
          "Source of vacancies": app.source,
        });
      });

      var ws = XLSX.utils.json_to_sheet(data);

      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

      XLSX.writeFile(wb, "Archive Applicant.xlsx");
      console.log("Exported excel!");
    } else {
      alert("Data masih kosong");
    }
  };

  const searching = async (keyword) => {
    if (keyword !== null || (keyword !== undefined) !== "") {
      const data = await searchApplicantArchive(keyword);
      setApplicant(data);
    } else {
      inAwait();
    }
  };

  return (
    <>
      <div className="bg-light p-4" style={{ borderRadius: "10px" }}>
        <div className="mb-5 d-flex justify-content-between">
          <div className="row">
            <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
              Archive Applicant
            </h3>
            <span
              style={{ fontSize: "10px", fontWeight: "400", color: "#737373" }}
            >
              List of rejected applicant
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
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
                exportExcel();
              }}
              type=""
            >
              <Export className="me-2" size={15} weight="bold" />
              Export
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
                onChange={(val) => searching(val.target.value)}
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
                <th className="align-middle " style={{minWidth:'150px'}} onClick={() => {}}>
                  Rejected Date <ImportExport fontSize="2px" />
                </th>
                <th className="align-middle " style={{minWidth:'150px'}} onClick={() => {}}>
                  Full Name <ImportExport fontSize="2px" />
                </th>
                <th className="align-middle " style={{minWidth:'150px'}} onClick={() => {}}>
                  Position
                  <ImportExport fontSize="2px" />
                </th>
                <th className="align-middle " style={{minWidth:'150px'}} onClick={() => {}}>
                  Apply Date <ImportExport fontSize="2px" />
                </th>
                <th className="align-middle " onClick={() => {}}>
                  Phone Number <ImportExport fontSize="2px" />
                </th>
                <th className="align-middle " style={{minWidth:'180px'}} onClick={() => {}}>
                  Source of vacancies <ImportExport fontSize="2px" />
                </th>
                <th className="align-middle pe-5" onClick={() => {}}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {applicant.length > 0 ? (
                applicant.map((val) => {
                  return (
                    <tr style={{ fontSize: "14px" }}>
                      <td className="align-middle">{val["date"]}</td>
                      <td className="align-middle">{val["name"]}</td>
                      <td className="align-middle">
                        {val.position ?? " "}
                      </td>
                      <td className="align-middle">
                        {new Date(val["createdAt"]).getFullYear() +
                          "-" +
                          new Date(val["createdAt"]).getMonth() +
                          "-" +
                          new Date(val["createdAt"]).getDate()}
                      </td>
                      <td className="align-middle">{val["phone"]}</td>
                      <td className="align-middle">{val["source"]}</td>
                      <td className="align-middle gap-2 d-flex">
                        <button
                          className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                          onClick={() => {
                            setDetail(val);
                            setModal(true);
                          }}
                        >
                          <Eye
                            color="#003049"
                            weight="bold"
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
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
            <div
              className="d-flex gap-x-6 gap-y-5"
              style={{ fontSize: "14px" }}
            >
              <div className="col-6" style={{ fontSize: "14px" }}>
                <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                  <div style={{ fontWeight: "600" }}>Nama Lengkap </div>
                  <div style={{ fontWeight: "500" }}>
                    : {detail?.name ?? ""}{" "}
                  </div>
                  <div style={{ fontWeight: "600" }}>Tanggal Lahir </div>
                  <div style={{ fontWeight: "500" }}>
                    : {detail?.birthDate ?? ""}{" "}
                  </div>
                  <div style={{ fontWeight: "600" }}>Jenis Kelamin </div>
                  <div style={{ fontWeight: "500" }}>
                    : {detail?.gender ?? ""}{" "}
                  </div>
                  <div style={{ fontWeight: "600" }}>Usia </div>
                  <div style={{ fontWeight: "500" }}>
                    : {detail?.age ?? ""}{" "}
                  </div>
                  {/* <div style={{fontWeight:'600'}}>Email  </div>
                                        <div style={{fontWeight:'500'}}>: davidkurniawan@gmail.com</div> */}
                </div>
              </div>
              <div className="col-6" style={{ fontSize: "14px" }}>
                <div className="grid grid-cols-2 gap-x-3 gap-y-5">
                  <div style={{ fontWeight: "600" }}>Sumber Lowongan </div>
                  <div style={{ fontWeight: "500" }}>
                    : {detail?.source ?? ""}{" "}
                  </div>
                  <div style={{ fontWeight: "600" }}>Tanggal Melamar </div>
                  <div style={{ fontWeight: "500" }}>
                    : {detail?.date ?? ""}{" "}
                  </div>
                  <div style={{ fontWeight: "600" }}>Position </div>
                  <div style={{ fontWeight: "500" }}>
                    : {detail?.position ?? ""}{" "}
                  </div>
                  <div style={{ fontWeight: "600" }}>Nomor Telepon</div>
                  <div style={{ fontWeight: "500" }}>
                    : {detail?.phone ?? ""}{" "}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="d-flex gap-x-6 gap-y-5"
              style={{ fontSize: "14px" }}
            >
              <div className="col-6 mt-3" style={{ fontSize: "14px" }}>
                <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                  <div style={{ fontWeight: "600" }}>Email </div>
                  <div style={{ fontWeight: "500" }}>
                    : {detail?.email ?? ""}{" "}
                  </div>
                  <div style={{ fontWeight: "600" }}>Alamat KTP </div>
                  <div style={{ fontWeight: "500" }}>
                    : {detail?.identityAddress ?? ""}{" "}
                  </div>
                  <div style={{ fontWeight: "600" }}>Alamat Domisili </div>
                  <div style={{ fontWeight: "500" }}>
                    : {detail?.address ?? ""}{" "}
                  </div>
                  {/* <div style={{fontWeight:'600'}}>Email  </div>
                                        <div style={{fontWeight:'500'}}>: davidkurniawan@gmail.com</div> */}
                </div>
              </div>
            </div>
            <hr className="my-4" style={{ color: "#A8A8A8", height: "2px" }} />
            <div
              className="row mb-4 gap-x-6 gap-y-1"
              style={{ fontSize: "14px" }}
            >
              <h1
                className="mb-2"
                style={{ color: "#5C5C5C", fontWeight: "600" }}
              >
                Education
              </h1>
              <div className="col">
                <div className="grid grid-cols-1 gap-x-4 gap-y-2">
                  {detail?.educations?.map((edu) => (
                    <div
                      className="py-3"
                      style={{
                        fontWeight: "600",
                        borderBottom: "2px solid #EAEAEA",
                      }}
                    >
                      {edu.instansi}
                      <div className="my-1" style={{ fontWeight: "400" }}>
                        {edu.studi}
                      </div>
                      <div style={{ fontWeight: "300", color: "#A8A8A8" }}>
                        {edu.nilai}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <hr className="my-4" style={{ color: "#A8A8A8", height: "2px" }} />
            <div className="row gap-x-6 gap-y-1" style={{ fontSize: "14px" }}>
              <h1
                className="mb-2"
                style={{ color: "#5C5C5C", fontWeight: "600" }}
              >
                Experience
              </h1>
              <div className="col">
                <div className="grid grid-cols-1 gap-x-4 gap-y-2">
                  {detail?.experience?.map((expe) => (
                    <div
                      className="py-2"
                      style={{
                        fontWeight: "600",
                        borderBottom: "2px solid #EAEAEA",
                      }}
                    >
                      {expe?.position}
                      <div style={{ fontWeight: "400" }}>
                        {expe?.perusahaan}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <hr className="my-4" style={{ color: "#A8A8A8", height: "2px" }} />
            <div className="col-10" style={{ fontSize: "14px" }}>
              <div className="grid grid-cols-4 gap-4">
                <div className="">
                  <div style={{ fontWeight: "600" }}>Cv Terbaru</div>
                  {detail?.applicantFile ? (
                    <a download href={detail?.applicantFile}>
                      <Button
                        style={{
                          background:
                            "linear-gradient(90.2deg, #06B6D4 0.17%, #3B82F6 99.83%)",
                        }}
                        className="btn border-0 m-1 rounded text-white"
                      >
                        {" "}
                        Download
                      </Button>
                    </a>
                  ) : (
                    "-"
                  )}
                </div>
                <div className="">
                  <div style={{ fontWeight: "600" }}>KTP</div>
                  {detail?.ktp ? (
                    <a download href={detail?.ktp}>
                      <Button
                        style={{
                          background:
                            "linear-gradient(90.2deg, #06B6D4 0.17%, #3B82F6 99.83%)",
                        }}
                        className="btn border-0 m-1 rounded text-white"
                      >
                        {" "}
                        Download
                      </Button>
                    </a>
                  ) : (
                    "-"
                  )}
                </div>
                <div className="">
                  <div style={{ fontWeight: "600" }}>Kartu Keluarga</div>
                  {detail?.kartuKeluarga ? (
                    <a download href={detail?.kartuKeluarga}>
                      <Button
                        style={{
                          background:
                            "linear-gradient(90.2deg, #06B6D4 0.17%, #3B82F6 99.83%)",
                        }}
                        className="btn border-0 m-1 rounded text-white"
                      >
                        {" "}
                        Download
                      </Button>
                    </a>
                  ) : (
                    "-"
                  )}
                </div>
                <div className="">
                  <div style={{ fontWeight: "600" }}>Ijazah Terakhir</div>
                  {detail?.ijazah ? (
                    <a download href={detail?.ijazah}>
                      <Button
                        style={{
                          background:
                            "linear-gradient(90.2deg, #06B6D4 0.17%, #3B82F6 99.83%)",
                        }}
                        className="btn border-0 m-1 rounded text-white"
                      >
                        {" "}
                        Download
                      </Button>
                    </a>
                  ) : (
                    "-"
                  )}
                </div>
                <div className="">
                  <div style={{ fontWeight: "600" }}>Transkrip Nilai</div>
                  {detail?.transkripNilai ? (
                    <a download href={detail?.transkripNilai}>
                      <Button
                        style={{
                          background:
                            "linear-gradient(90.2deg, #06B6D4 0.17%, #3B82F6 99.83%)",
                        }}
                        className="btn border-0 m-1 rounded text-white"
                      >
                        {" "}
                        Download
                      </Button>
                    </a>
                  ) : (
                    "-"
                  )}
                </div>
                <div className="">
                  <div style={{ fontWeight: "600" }}>Sertifikat Vaksin</div>
                  {detail?.vaccince ? (
                    <a download href={detail?.vaccince}>
                      <Button
                        style={{
                          background:
                            "linear-gradient(90.2deg, #06B6D4 0.17%, #3B82F6 99.83%)",
                        }}
                        className="btn border-0 m-1 rounded text-white"
                      >
                        {" "}
                        Download
                      </Button>
                    </a>
                  ) : (
                    "-"
                  )}
                </div>
                <div className="">
                  <div style={{ fontWeight: "600" }}>Portofolio</div>
                  {detail?.portfolio ? (
                    <a download href={detail?.portfolio}>
                      <Button
                        style={{
                          background:
                            "linear-gradient(90.2deg, #06B6D4 0.17%, #3B82F6 99.83%)",
                        }}
                        className="btn border-0 m-1 rounded text-white"
                      >
                        {" "}
                        Download
                      </Button>
                    </a>
                  ) : (
                    "-"
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer className="m-4" style={{ borderTopColor: "transparent" }}>
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
        </Modal.Footer> */}
      </Modal>
    </>
  );
}
export default ArchiveApplicant;
