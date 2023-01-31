import { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
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
  GetApplicant,
  GetDetailApplicant,
} from "../../../Repository/RecruitmentRepository";
import Printer, { print } from 'react-pdf-print'
import { useReactToPrint } from "react-to-print";

function DetailApplicant() {
  const { applicant_id } = useParams();
  const location = useLocation();
  const [dAplicant, setDApplicant] = useState([]);
  const inAwait = async () => {
    var rec = await GetDetailApplicant(applicant_id);
    setDApplicant(rec);
  };
  useEffect(() => {
    inAwait();
  }, []);

  const ids = ['1']
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }
  return (
    <>
      <div className="d-flex align-items-center mb-5 justify-content-between d-print-none">
        <div className="row">
          <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
            Detail Applicant
          </h3>
        </div>
        <div className="d-flex">
          <button
            style={{
              color: "white",
              backgroundColor: "#0E5073",
              fontSize: "14px",
              fontWeight: "500",
            }}
            className="ms-3 btn d-flex align-items-center"
            onClick={() => {
              handlePrint();
              // print(ids);
              // console.log(print)
            }}
            type=""
          >
            <Export className="me-2" size={15} weight="bold" />
            Export
          </button>
        </div>
      </div>
      <div ref={componentRef}>    
      <Printer>
          <div
            className="mb-5 bg-[#F8F8F8] rounded-xl px-4 py-5"
            style={{ color: "#737373" }}
          >
            <h1 className="mb-3" style={{ color: "#5C5C5C", fontWeight: "600" }}>
              Personal details
            </h1>
            <div className="d-flex gap-x-6 gap-y-5" style={{ fontSize: "14px" }}>
              <div className="col-6" style={{ fontSize: "14px" }}>
                <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                  <div style={{ fontWeight: "600" }}>Nama Lengkap </div>
                  <div style={{ fontWeight: "500" }}>
                    : {dAplicant[0]?.name ?? ""}{" "}
                  </div>
                  <div style={{ fontWeight: "600" }}>Tanggal Lahir </div>
                  <div style={{ fontWeight: "500" }}>
                    : {dAplicant[0]?.birthDate ?? ""}{" "}
                  </div>
                  <div style={{ fontWeight: "600" }}>Jenis Kelamin </div>
                  <div style={{ fontWeight: "500" }}>
                    : {dAplicant[0]?.gender ?? ""}{" "}
                  </div>
                  <div style={{ fontWeight: "600" }}>Usia </div>
                  <div style={{ fontWeight: "500" }}>
                    : {dAplicant[0]?.age ?? ""}{" "}
                  </div>
                  {/* <div style={{fontWeight:'600'}}>Email  </div>
                              <div style={{fontWeight:'500'}}>: davidkurniawan@gmail.com</div> */}
                </div>
              </div>
              <div className="col-6" style={{ fontSize: "14px" }}>
                <div className="grid grid-cols-2 gap-x-3 gap-y-5">
                  <div style={{ fontWeight: "600" }}>Sumber Lowongan </div>
                  <div style={{ fontWeight: "500" }}>
                    : {dAplicant[0]?.source ?? ""}{" "}
                  </div>
                  <div style={{ fontWeight: "600" }}>Tanggal Melamar </div>
                  <div style={{ fontWeight: "500" }}>
                    : {dAplicant[0]?.date ?? ""}{" "}
                  </div>
                  <div style={{ fontWeight: "600" }}>Position </div>
                  <div style={{ fontWeight: "500" }}>
                    : {dAplicant[0]?.position ?? ""}{" "}
                  </div>
                  <div style={{ fontWeight: "600" }}>Nomor Telepon</div>
                  <div style={{ fontWeight: "500" }}>
                    : {dAplicant[0]?.phone ?? ""}{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex gap-x-6 gap-y-5" style={{ fontSize: "14px" }}>
              <div className="col-6 mt-3" style={{ fontSize: "14px" }}>
                <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                  <div style={{ fontWeight: "600" }}>Email </div>
                  <div style={{ fontWeight: "500" }}>
                    : {dAplicant[0]?.email ?? ""}{" "}
                  </div>
                  <div style={{ fontWeight: "600" }}>Alamat KTP </div>
                  <div style={{ fontWeight: "500" }}>
                    : {dAplicant[0]?.identityAddress ?? ""}{" "}
                  </div>
                  <div style={{ fontWeight: "600" }}>Alamat Domisili </div>
                  <div style={{ fontWeight: "500" }}>
                    : {dAplicant[0]?.address ?? ""}{" "}
                  </div>
                  {/* <div style={{fontWeight:'600'}}>Email  </div>
                              <div style={{fontWeight:'500'}}>: davidkurniawan@gmail.com</div> */}
                </div>
              </div>
            </div>
          </div>
          <div
            className="mb-5 bg-[#F8F8F8] rounded-xl px-4 py-5"
            style={{ color: "#737373" }}
          >
            <h1 className="mb-3" style={{ color: "#5C5C5C", fontWeight: "600" }}>
              Education
            </h1>
            <div className="d-flex gap-x-6 gap-y-1" style={{ fontSize: "14px" }}>
              <div className="col" style={{ fontSize: "14px" }}>
                <div className="grid grid-cols-1 gap-x-4 gap-y-2">
                  {dAplicant[0]?.educations?.map((edu) => (
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
          </div>
          <div
            className="mb-2 bg-[#F8F8F8] rounded-xl px-4 py-5"
            style={{ color: "#737373" }}
          >
            <h1 className="mb-3" style={{ color: "#5C5C5C", fontWeight: "600" }}>
              Experience details
            </h1>
            <div className="row gap-x-6 gap-y-1" style={{ fontSize: "14px" }}>
              <div className="col">
                <div className="grid grid-cols-1 gap-x-4 gap-y-2">
                  {dAplicant[0]?.experience?.map((expe) => (
                    <div
                      className="py-2"
                      style={{
                        fontWeight: "600",
                        borderBottom: "2px solid #EAEAEA",
                      }}
                    >
                      {expe.position}
                      <div className="d-flex my-1">
                        <div style={{ fontWeight: "400" }}>
                          {expe.perusahaan} -{" "}
                        </div>
                        <div
                          className="ms-1"
                          style={{ fontWeight: "400", color: "#A8A8A8" }}
                        >
                          {" "}
                          {expe.jenis}
                        </div>
                      </div>
                      <div className="d-flex">
                        <div style={{ fontWeight: "300", color: "#A8A8A8" }}>
                          {new Date(expe.mulai).toDateString().split(" ")[1] +
                            " " +
                            new Date(expe.mulai).toDateString().split(" ")[3]}{" "}
                          -{" "}
                        </div>
                        <div
                          className="ms-1"
                          style={{ fontWeight: "300", color: "#A8A8A8" }}
                        >
                          {" "}
                          {new Date(expe.berakhir).toDateString().split(" ")[1] +
                            " " +
                            new Date(expe.berakhir)
                              .toDateString()
                              .split(" ")[3]}{" "}
                        </div>

                        <div
                          className="ms-1"
                          style={{ fontWeight: "300", color: "#A8A8A8" }}
                        >
                          ·{" "}
                          {monthDiff(new Date(expe.mulai), new Date(expe.berakhir))}{" "}
                          bln
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-100 my-2"></div>
              <div className="col-10" style={{ fontSize: "14px" }}>
                <div className="grid grid-cols-4 gap-4">
                  <div className="">
                    <div style={{ fontWeight: "600" }}>Cv Terbaru</div>
                    {dAplicant[0]?.applicantFile ? (
                      <a download href={dAplicant[0]?.applicantFile}>
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
                    {dAplicant[0]?.ktp ? (
                      <a download href={dAplicant[0]?.ktp}>
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
                    {dAplicant[0]?.kartuKeluarga ? (
                      <a download href={dAplicant[0]?.kartuKeluarga}>
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
                    {dAplicant[0]?.ijazah ? (
                      <a download href={dAplicant?.ijazah}>
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
                    {dAplicant[0]?.transkripNilai ? (
                      <a download href={dAplicant[0]?.transkripNilai}>
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
                    {dAplicant[0]?.vaccince ? (
                      <a download href={dAplicant[0]?.vaccince}>
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
                    {dAplicant[0]?.portfolio ? (
                      <a download href={dAplicant[0]?.portfolio}>
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
          </div>
      </Printer>
      </div>
    </>
  );
}

export default DetailApplicant;
