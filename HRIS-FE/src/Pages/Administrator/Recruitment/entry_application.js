import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JsonSearch from "search-array";
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
  getEthosSource,
} from "../../../Repository/RecruitmentRepository";
import { Drawer } from "@mui/material";
import MultiRangeSlider from "../../../Utils/multiRangeSlider/MultiRangeSlider";
import { SwalSuccess } from "../../../Components/Modals";
import * as XLSX from "xlsx";

function EntryApplication() {
  const navigate = useNavigate();
  const [filter, setfilter] = useState(false);
  const [modal, setModal] = useState(false);
  const [stagemodal, setstageModal] = useState(false);
  const [applicant, setApplicant] = useState([]);
  const [sources, setSources] = useState([]);
  const [applicantFilter, setApplicantFilter] = useState({});
  const [sourceFilter, setSourceFilter] = useState([]);
  const [positionFilter, setPositionFilter] = useState([]);
  const [studiFilter, setStudiFilter] = useState([]);
  const [genderFilter, setGenderFilter] = useState([]);
  const [isSelectedGender, setGender] = useState([false, false]);
  const [isSelectedEducation, setEducation] = useState([
    false,
    false,
    false,
    false,
  ]);

  const [detail, setDetail] = useState();
  const inAwait = async () => {
    var rec = await GetApplicant();
    var sources = await getEthosSource();
    setApplicant(rec);
    setSources(sources.data);
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
          Position: app?.position,
          "Sumber Lowongan": app.source,
          "Tanggal Melamar": app.date,
          "Nama Lengkap": app.name,
          "Nomor Telepon": app.phone,
        });
      });

      var ws = XLSX.utils.json_to_sheet(data);

      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

      XLSX.writeFile(wb, "Entry Application.xlsx");
      console.log("Exported excel!");
    } else {
      alert("Data masih kosong");
    }
  };

  const searching = async (keyword) => {
    if (keyword !== null || (keyword !== undefined) !== "") {
      const data = await searchApplicant(keyword);
      // const searcher = new JsonSearch(applicant);
      // const data = searcher.query(keyword);
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
              Entry Application
            </h3>
            <span
              style={{ fontSize: "10px", fontWeight: "400", color: "#737373" }}
            >
              List of job applicant
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
                const res = await GetApplicantByDate({
                  date: e.target.value,
                });
                setApplicant(res.result);
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
              className="ms-3 btn d-flex align-items-center"
              onClick={() => {
                inAwait();
                setfilter(true);
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
            <button
              style={{
                borderRadius: "10px",
                border: "1px solid #CACACA",
                color: "#003049",
                fontSize: "14px",
                fontWeight: "500",
              }}
              className="ms-3 btn d-flex align-items-center"
              onClick={() => {
                exportExcel();
              }}
              type=""
            >
              <Export className="me-2" size={15} weight="bold" />
              Export
            </button>
            <button
              style={{
                borderRadius: "10px",
                border: "1px solid #CACACA",
                color: "#003049",
                fontSize: "14px",
                fontWeight: "500",
              }}
              className="ms-3 btn d-flex align-items-center"
              onClick={() => {
                navigate("/recruitment/entry-application/all-stages-recruitment");
              }}
            >
              <Eye className="me-2" size={15} weight="bold" />
              All Stages
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
                <th className="align-middle px-3" width="10px">
                  <input type="checkbox" />
                </th>
                <th className="align-middle " onClick={() => {}}>
                  Position
                  <ImportExport fontSize="2px" />
                </th>
                <th
                  className="align-middle "
                  style={{ minWidth: "180px" }}
                  onClick={() => {}}
                >
                  Sumber Lowongan <ImportExport fontSize="2px" />
                </th>
                <th
                  className="align-middle "
                  style={{ minWidth: "180px" }}
                  onClick={() => {}}
                >
                  Tanggal Melamar <ImportExport fontSize="2px" />
                </th>
                <th
                  className="align-middle "
                  style={{ minWidth: "150px" }}
                  onClick={() => {}}
                >
                  Nama Lengkap <ImportExport fontSize="2px" />
                </th>
                <th className="align-middle " onClick={() => {}}>
                  Nomor Telepon <ImportExport fontSize="2px" />
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
                      <td className="align-middle px-3">
                        <input type="checkbox" />
                      </td>
                      <td className="align-middle">
                        {val.position ?? val.recruitment.position}
                      </td>
                      <td className="align-middle">{val["source"]}</td>
                      <td className="align-middle">{val["date"]}</td>
                      <td className="align-middle">{val["name"]}</td>
                      <td className="align-middle">{val["phone"]}</td>
                      {val["status"] == "1" ? (
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
                          <button
                            className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                            onClick={() => {
                              navigate(
                                "/recruitment/entry-application/detail-stage",
                                {
                                  state: val,
                                }
                              );
                            }}
                          >
                            <ListChecks
                              weight="bold"
                              color="#00AE46"
                              className="h-5 w-5"
                            />
                          </button>
                          <button
                            className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                            onClick={async () => {
                              var requestBody = {
                                id: val["id"],
                                status: "0",
                              };
                              console.log(requestBody);
                              var data = await UpdateApplicant(requestBody);
                              if (data["message"] == "success") {
                                await SwalSuccess({
                                  message: "Applicant has been rejected",
                                });
                                await inAwait();
                              }
                            }}
                          >
                            <X
                              weight="bold"
                              color="#780000"
                              className="h-5 w-5"
                            />
                          </button>
                        </td>
                      ) : (
                        <>
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
                            <button
                              className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                              onClick={() => {
                                navigate(
                                  "/recruitment/entry-application/detail-stage",
                                  {
                                    state: val,
                                  }
                                );
                              }}
                            >
                              <ListChecks
                                weight="bold"
                                color="#00AE46"
                                className="h-5 w-5"
                              />
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })
              ) : (
                <td colSpan={7}>
                  <div className="d-flex justify-content-center align-middle text-center">
                    No Data
                  </div>
                </td>
              )}
            </tbody>
          </table>
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
                className=" appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
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
            onClick={async () => {}}
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
                  <div style={{ fontWeight: "600" }}>Nama Lengkap </div>
                  <div style={{ fontWeight: "500" }}>
                    : {detail?.name ?? ""}{" "}
                  </div>
                  <div style={{ fontWeight: "600" }}>Usia </div>
                  <div style={{ fontWeight: "500" }}>
                    : {detail?.age ?? ""}{" "}
                  </div>
                  <div style={{ fontWeight: "600" }}>Position </div>
                  <div style={{ fontWeight: "500" }}>
                    : {detail?.position ?? ""}{" "}
                  </div>
                  <div style={{ fontWeight: "600" }}>Jurusan </div>
                  <div style={{ fontWeight: "500" }}>
                    <div className="d-flex" style={{ fontWeight: "500" }}>
                      :{" "}
                      {detail?.educations?.length > 1
                        ? detail?.educations?.pop()?.studi
                        : detail?.educations[0]?.studi}
                    </div>
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
            onClick={() => {
              navigate(
                `/recruitment/entry-application/detail-applicant/${detail?.applicant_id}`
              );
            }}
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
          // setfilter(false);
          setApplicantFilter({});
          // sourceFilter = [];
          // positionFilter = [];
          // studiFilter = [];
          // genderFilter = [];
          // setApplicantFilter({});
          setPositionFilter([]);
          setGender([false, false]);
          setGenderFilter([]);
          setSourceFilter([]);
          setStudiFilter([]);
          setfilter(false);
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
          <div>
            <input
              style={{
                border: "0",
                outline: "none",
                backgroundColor: "white",
                color: "#0E5073",
                fontSize: "14px",
                fontWeight: "500",
                borderRadius: "5px",
              }}
              onChange={(val) => {
                setApplicantFilter({
                  ...applicantFilter,
                  experience: val.target.value,
                });
              }}
              className="w-full focus:ring-0 focus:ring-offset-0 focus:outline-0"
              type="search"
              placeholder="Search by experience..."
            />
          </div>
          <div>
            <label
              className="text-gray-700 font-semibold text-xs mb-2"
              for="username"
            >
              Tanggal Melamar
            </label>
            <input
              className="border-0 appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
              id="username"
              type="date"
              onChange={(val) =>
                setApplicantFilter({
                  ...applicantFilter,
                  date: val.target.value,
                })
              }
              placeholder="Username"
            />
          </div>
          <div className="">
            <label
              className="text-gray-700 font-semibold text-xs mb-2"
              for="username"
            >
              Sumber Lowongan
            </label>
            <div className="">
              <ul
                className="px-3 py-2 bg-[#FFFFFF]"
                style={{
                  height: "115px",
                  borderRadius: "5px",
                  overflow: "auto",
                  whiteSpace: "unset",
                  scrollbarColor: "transparent",
                  scrollbarWidth: "none",
                }}
              >
                {applicant.length > 0 ? (
                  applicant
                    ?.filter(
                      (value, index, self) =>
                        index ===
                        self.findIndex(
                          (t) =>
                            t.source === value.source && t.source === value.source
                        )
                    )
                    .map((val, i) => {
                      return (
                        <li className="items-center align-items-center">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            value={val["source"]}
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={(e) => {
                              if (
                                sourceFilter.find(
                                  (data) => data == e.target.value
                                )
                              ) {
                                setSourceFilter((el) =>
                                  el.filter((ment, i) => ment !== e.target.value)
                                );
                              } else {
                                setSourceFilter([
                                  ...sourceFilter,
                                  e.target.value,
                                ]);
                              }
                            }}
                          />
                          <label
                            for="default-checkbox"
                            class="ml-2 text-sm text-gray-900"
                          >
                            {val["source"]}
                          </label>
                        </li>
                      );
                    })
                    ) : (
                      ""
                      )
                }
              </ul>
            </div>
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
                  height: "115px",
                  borderRadius: "5px",
                  overflow: "auto",
                  whiteSpace: "unset",
                  scrollbarColor: "transparent",
                  scrollbarWidth: "none",
                }}
              >
                {applicant.length > 0 ? (
                  applicant
                  ?.filter(
                    (value, index, self) =>
                      index ===
                      self.findIndex(
                        (t) =>
                          t.position === value.position &&
                          t.position === value.position
                      )
                  )
                  .map((val, i) => {
                    return (
                      <li className="items-center align-items-center">
                        <input
                          id={i}
                          type="checkbox"
                          value={val["position"]}
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={(e) => {
                            if (
                              positionFilter.find(
                                (data) => data == e.target.value
                              )
                            ) {
                              setPositionFilter((el) =>
                                el.filter((ment, i) => ment !== e.target.value)
                              );
                            } else {
                              setPositionFilter([
                                ...positionFilter,
                                e.target.value,
                              ]);
                            }
                          }}
                        />
                        <label for={i} class="ml-2 text-sm text-gray-900">
                          {val["position"]}
                        </label>
                      </li>
                    );
                  })
                  ) : (
                    ""
                    )
                  }
              </ul>
            </div>
          </div>
          <div className="">
            <label
              className="text-gray-700 font-semibold text-xs mb-2"
              for="username"
            >
              Pendidikan Terakhir
            </label>
            <div className="">
              <ul
                className="px-3 py-2 bg-[#FFFFFF]"
                style={{
                  borderRadius: "5px",
                  overflow: "auto",
                  whiteSpace: "unset",
                  scrollbarColor: "transparent",
                  scrollbarWidth: "none",
                }}
              >
                <li className="items-center align-items-center">
                  <input
                    id="SMASMK"
                    type="checkbox"
                    value="SMA"
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => {
                      if (studiFilter.find((data) => data == e.target.value)) {
                        setStudiFilter((el) =>
                          el.filter((ment, i) => ment !== e.target.value)
                        );
                      } else {
                        setStudiFilter([...studiFilter, e.target.value]);
                      }
                    }}
                  />
                  <label for="SMASMK" class="ml-2 text-sm text-gray-900">
                    SMA / SMK
                  </label>
                </li>
                <li className="items-center align-items-center">
                  <input
                    id="S1"
                    type="checkbox"
                    value="S1"
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => {
                      if (studiFilter.find((data) => data == e.target.value)) {
                        setStudiFilter((el) =>
                          el.filter((ment, i) => ment !== e.target.value)
                        );
                      } else {
                        setStudiFilter([...studiFilter, e.target.value]);
                      }
                    }}
                  />
                  <label for="S1" class="ml-2 text-sm text-gray-900">
                    S1
                  </label>
                </li>
                <li className="items-center align-items-center">
                  <input
                    id="S2"
                    type="checkbox"
                    value="S2"
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => {
                      if (studiFilter.find((data) => data == e.target.value)) {
                        setStudiFilter((el) =>
                          el.filter((ment, i) => ment !== e.target.value)
                        );
                      } else {
                        setStudiFilter([...studiFilter, e.target.value]);
                      }
                    }}
                  />
                  <label for="S2" class="ml-2 text-sm text-gray-900">
                    S2
                  </label>
                </li>
                <li className="items-center align-items-center">
                  <input
                    id="S3"
                    type="checkbox"
                    value="S3"
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => {
                      if (studiFilter.find((data) => data == e.target.value)) {
                        setStudiFilter((el) =>
                          el.filter((ment, i) => ment !== e.target.value)
                        );
                      } else {
                        setStudiFilter([...studiFilter, e.target.value]);
                      }
                    }}
                  />
                  <label for="S3" class="ml-2 text-sm text-gray-900">
                    S3
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <div className="">
            <label
              className="text-gray-700 font-semibold text-xs mb-2"
              for="username"
            >
              Gender
            </label>
            <div className="">
              <ul
                className="px-3 py-2 bg-[#FFFFFF]"
                style={{
                  borderRadius: "5px",
                  overflow: "auto",
                  whiteSpace: "unset",
                  scrollbarColor: "transparent",
                  scrollbarWidth: "none",
                }}
              >
                <li className="items-center align-items-center">
                  <input
                    id="perempuan"
                    type="checkbox"
                    value={`${isSelectedGender[0]}`}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => {
                      isSelectedGender[0] = !isSelectedGender[0];
                      setGender(isSelectedGender);
                      if (isSelectedGender[0] == true) {
                        setGenderFilter((e) => [...e, "Perempuan"]);
                      } else {
                        setGenderFilter((e) =>
                          e.filter((val, i) => val !== "Perempuan")
                        );
                      }
                    }}
                  />
                  <label for="perempuan" class="ml-2 text-sm text-gray-900">
                    Perempuan
                  </label>
                </li>
                <li className="items-center align-items-center">
                  <input
                    id="laki-laki"
                    type="checkbox"
                    value={`${isSelectedGender[1]}`}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(data) => {
                      isSelectedGender[1] = !isSelectedGender[1];
                      setGender(isSelectedGender);
                      if (isSelectedGender[1] == true) {
                        setGenderFilter((e) => [...e, "Laki - Laki"]);
                      } else {
                        setGenderFilter((e) =>
                          e.filter((val, i) => val !== "Laki - Laki")
                        );
                      }
                      // setGenderFilter([...genderFilter, e.target.value]);
                    }}
                  />
                  <label for="laki-laki" class="ml-2 text-sm text-gray-900">
                    Laki Laki
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <MultiRangeSlider
              min={17}
              max={30}
              onChange={({ min, max }) =>
                setApplicantFilter({
                  ...applicantFilter,
                  age: `${min}-${max}`,
                })
              }
            />
          </div>
          <button
            className="btn bg-[#0E5073] text-white"
            onClick={async () => {
              var source = [];
              var position = [];
              applicant
                .filter(
                  (value, index, self) =>
                    index ===
                    self.findIndex(
                      (t) =>
                        t.position === value.position &&
                        t.position === value.position
                    )
                )
                .forEach((e, i) => {
                  source.push(e["source"]);
                  position.push(e["position"]);
                });
              var reqBody = {};
              if (
                applicantFilter.date != undefined &&
                applicantFilter.experience != undefined
              ) {
                reqBody = {
                  experience: applicantFilter.experience,
                  date: applicantFilter.date,
                  age: applicantFilter.age,
                  source: JSON.stringify(
                    sourceFilter.length == 0 ? source : sourceFilter
                  ),
                  position:
                    JSON.stringify +
                    (positionFilter.length == 0 ? position : positionFilter),
                  gender: JSON.stringify(
                    genderFilter.length == 0
                      ? ["Laki - Laki", "Perempuan"]
                      : genderFilter
                  ),
                  studi: JSON.stringify(
                    studiFilter.length == 0
                      ? ["SMA", "S1", "S2", "S3"]
                      : studiFilter
                  ),
                };
              } else if (applicantFilter.date != undefined) {
                reqBody = {
                  date: applicantFilter.date,
                  age: applicantFilter.age,
                  source: JSON.stringify(
                    sourceFilter.length == 0 ? source : sourceFilter
                  ),
                  position: JSON.stringify(
                    positionFilter.length == 0 ? position : positionFilter
                  ),
                  gender: JSON.stringify(
                    genderFilter.length == 0
                      ? ["Laki - Laki", "Perempuan"]
                      : genderFilter
                  ),
                  studi: JSON.stringify(
                    studiFilter.length == 0
                      ? ["SMA", "S1", "S2", "S3"]
                      : studiFilter
                  ),
                };
              } else if (applicantFilter.experience != undefined) {
                reqBody = {
                  experience: applicantFilter.experience,
                  age: applicantFilter.age,
                  source: JSON.stringify(
                    sourceFilter.length == 0 ? source : sourceFilter
                  ),
                  position: JSON.stringify(
                    positionFilter.length == 0 ? position : positionFilter
                  ),
                  gender: JSON.stringify(
                    genderFilter.length == 0
                      ? ["Laki - Laki", "Perempuan"]
                      : genderFilter
                  ),
                  studi: JSON.stringify(
                    studiFilter.length == 0
                      ? ["SMA", "S1", "S2", "S3"]
                      : studiFilter
                  ),
                };
              } else {
                reqBody = {
                  age: applicantFilter.age,
                  source: JSON.stringify(
                    sourceFilter.length == 0 ? source : sourceFilter
                  ),
                  position: JSON.stringify(
                    positionFilter.length == 0 ? position : positionFilter
                  ),
                  gender: JSON.stringify(
                    genderFilter.length == 0
                      ? ["Laki - Laki", "Perempuan"]
                      : genderFilter
                  ),
                  studi: JSON.stringify(
                    studiFilter.length == 0
                      ? ["SMA", "S1", "S2", "S3"]
                      : studiFilter
                  ),
                };
              }
              const res = await FilterApplicant(reqBody);
              setApplicant(res.result);
              setApplicantFilter({});
              setPositionFilter([]);
              setSourceFilter([]);
              setGender([false, false]);
              setStudiFilter([]);
              setGenderFilter([]);
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
export default EntryApplication;
