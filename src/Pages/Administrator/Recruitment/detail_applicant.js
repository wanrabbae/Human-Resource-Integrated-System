import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import { GetApplicant } from "../../../Repository/RecruitmentRepository";

function DetailApplicant() {
  const location = useLocation();
  return (
    <>
      <div className="d-flex align-items-center mb-5 justify-content-between">
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
            onClick={() => {}}
            type=""
          >
            <Export className="me-2" size={15} weight="bold" />
            Export
          </button>
        </div>
      </div>
      <div
        className="mb-5 bg-[#F8F8F8] rounded-xl px-4 py-5"
        style={{ color: "#737373" }}
      >
        <h1 className="mb-3" style={{ color: "#5C5C5C", fontWeight: "600" }}>
          Personal details
        </h1>
        <div className="d-flex gap-x-6 gap-y-1" style={{ fontSize: "14px" }}>
          <div className="col-6" style={{ fontSize: "14px" }}>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <div style={{ fontWeight: "600" }}>Employee Name </div>
              <div style={{ fontWeight: "500" }}>
                : {location.state?.details?.name ?? ""}{" "}
              </div>
              <div style={{ fontWeight: "600" }}>Sumber Lowongan </div>
              <div style={{ fontWeight: "500" }}>
                : {location.state?.details?.source ?? ""}{" "}
              </div>
              <div style={{ fontWeight: "600" }}>Jenis Kelamin </div>
              <div style={{ fontWeight: "500" }}>
                : {location.state?.details?.gender ?? ""}{" "}
              </div>
              <div style={{ fontWeight: "600" }}>Usia </div>
              <div style={{ fontWeight: "500" }}>
                : {location.state?.details?.age ?? ""}{" "}
              </div>
              {/* <div style={{fontWeight:'600'}}>Email  </div>
                                    <div style={{fontWeight:'500'}}>: davidkurniawan@gmail.com</div> */}
            </div>
          </div>
          <div className="col-6" style={{ fontSize: "14px" }}>
            <div className="grid grid-cols-2 gap-3">
              <div style={{ fontWeight: "600" }}>Position </div>
              <div style={{ fontWeight: "500" }}>
                : {location.state?.details?.major ?? ""}{" "}
              </div>
              <div style={{ fontWeight: "600" }}>Tanggal Melamar </div>
              <div style={{ fontWeight: "500" }}>
                : {location.state?.details?.date ?? ""}{" "}
              </div>
              <div style={{ fontWeight: "600" }}>Tanggal Lahir </div>
              <div style={{ fontWeight: "500" }}>
                : {location.state?.details?.birthDate ?? ""}{" "}
              </div>
              <div style={{ fontWeight: "600" }}>Nomor Telepon</div>
              <div style={{ fontWeight: "500" }}>
                : {location.state?.details?.phone ?? ""}{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex gap-x-6 gap-y-1" style={{ fontSize: "14px" }}>
          <div className="col-6" style={{ fontSize: "14px" }}>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <div style={{ fontWeight: "600" }}>Email </div>
              <div style={{ fontWeight: "500" }}>
                : {location.state?.details?.email ?? ""}{" "}
              </div>
              <div style={{ fontWeight: "600" }}>Alamat KTP </div>
              <div style={{ fontWeight: "500" }}>
                : {location.state?.details?.identityAddress ?? ""}{" "}
              </div>
              <div style={{ fontWeight: "600" }}>Alamat Domisili </div>
              <div style={{ fontWeight: "500" }}>
                : {location.state?.details?.address ?? ""}{" "}
              </div>
              {/* <div style={{fontWeight:'600'}}>Email  </div>
                                    <div style={{fontWeight:'500'}}>: davidkurniawan@gmail.com</div> */}
            </div>
          </div>
        </div>
        <hr className="my-3 px-5" style={{ backgroundColor: "#EAEAEA" }}></hr>
        <div className="d-flex gap-x-6 gap-y-1" style={{ fontSize: "14px" }}>
          <div className="col-6" style={{ fontSize: "14px" }}>
            <div className="grid grid-cols-2 grid-rows-2 gap-2">
              <div style={{ fontWeight: "600" }}>Nama Sekolah </div>
              <div style={{ fontWeight: "500" }}>
                : {location.state?.details?.univName ?? ""}{" "}
              </div>
              <div style={{ fontWeight: "600" }}>Nilai Akhir/ IPK </div>
              <div style={{ fontWeight: "500" }}>
                : {location.state?.details?.ipk ?? ""}{" "}
              </div>
            </div>
          </div>
          <div className="col-6" style={{ fontSize: "14px" }}>
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              <div style={{ fontWeight: "600" }}>Jurusan </div>
              <div style={{ fontWeight: "500" }}>
                : {location.state?.details?.major ?? ""}{" "}
              </div>
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
              <div
                className="py-2"
                style={{ fontWeight: "600", borderBottom: "2px solid #EAEAEA" }}
              >
                Machine Learning Engineering
                <div style={{ fontWeight: "400" }}>Tokopedia</div>
              </div>
              <div
                className="py-2"
                style={{ fontWeight: "600", borderBottom: "2px solid #EAEAEA" }}
              >
                Data Scientist
                <div style={{ fontWeight: "400" }}>PT. Ibid by Astra</div>
              </div>
              <div
                className="py-2"
                style={{ fontWeight: "600", borderBottom: "2px solid #EAEAEA" }}
              >
                Data Analyst
                <div style={{ fontWeight: "400" }}>Traveloka</div>
              </div>
            </div>
          </div>
          <div className="w-100 my-2"></div>
          <div className="col-10" style={{ fontSize: "14px" }}>
            <div className="grid grid-cols-4 gap-2">
              <div className="">
                <div style={{ fontWeight: "600" }}>Berkas Requitment</div>
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
              </div>
              <div className="">
                <div style={{ fontWeight: "600" }}>Surat Pengalaman</div>
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
              </div>
              <div className="">
                <div style={{ fontWeight: "600" }}>Portofolio</div>
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
              </div>
              <div className="">
                <div style={{ fontWeight: "600" }}>Sertifikat Vaksin</div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailApplicant;
