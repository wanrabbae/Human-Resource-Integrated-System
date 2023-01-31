import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Eye,
  FileText,
  DotsThreeOutline,
  MagnifyingGlass,
  Gear,
} from "phosphor-react";
import { Button, Dropdown, Modal, Table } from "react-bootstrap";
import {
  AddRecruitment,
  DeleteRecruitment,
  GetRecruitment,
  RepostRecruitment,
  searchData,
} from "../../../Repository/RecruitmentRepository";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

import FroalaEditorComponent from "react-froala-wysiwyg";
import FroalaEditor from "react-froala-wysiwyg";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import { SwalSuccess, ModalDelete } from "../../../Components/Modals";
import { Link, useNavigate } from "react-router-dom";
// import { Dropdown } from "flowbite-react";
import Construction from '../../../Resourse/img/Construction.png'

function Recruitment() {
  const navigate = useNavigate();
  const [modalRepost, setModalRepost] = useState(false);
  const [modalShare, setModalShare] = useState(false);
  const [drp, setDrp] = useState(true);
  const [isdelete, setDelete] = useState(false);
  const [id, setId] = useState();
  const [recruit, setRecruit] = useState([]);
  const editorRef = useRef(null);
  const inAwait = async () => {
    var rec = await GetRecruitment();
    setRecruit(rec["result"]);
  };

  const search = async (keyword) => {
    try {
      const search = await searchData(keyword);
      setRecruit(search);
      console.log(search)
    } catch (error) {
      console.log(error);
    }
    // if (keyword !== null || (keyword !== undefined) !== "") {
    //   const data = await searchData(keyword);
    //   setRecruit(data);
    // } else {
    //   inAwait();
    // }
  };

  const deleteRec = async (id) => {
    const deletes = await DeleteRecruitment(id);
    inAwait();
  };

  useEffect(() => {
    inAwait();
  }, []);
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
      <DotsThreeOutline size={20} weight="fill" />
      {children}
    </a>
  ));
  return (
    // <div>
    //   <img src={Construction}/>
    // </div>
    <>
      <div className="d-flex justify-content-between">
        <div className="row">
          <h3 style={{ fontSize: "20px", fontWeight: "600" }}>Recruitment</h3>
          <span
            style={{ fontSize: "10px", fontWeight: "400", color: "#737373" }}
          >
            list of recruitment form{" "}
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
            <div class="input-group-prepend">
              <span class="transparent ">
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
              onChange={(val) => {
                search(val.target.value);
              }}
              className="focus:ring-0 focus:ring-offset-0 focus:outline-0"
              type="search"
              placeholder=" Search Requirement"
            />
          </div>
          <Link 
            style={{
              borderRadius: "10px",
              border: "1.5px solid #CACACA",
              color: "#0E5073",
              fontSize: "14px",
              fontWeight: "500",
            }}
            className="me-3 btn d-flex align-items-center"
            to="/recruitment/entry-application"
            // onClick={() => {
            //   window.location.href = "";
            // }}
            type=""
          >
            <Eye className="me-2" size={15} weight="bold" />
            Entry Application
          </Link>
          <button
            style={{
              borderRadius: "10px",
              backgroundColor: "#0E5073",
              fontSize: "14px",
              fontWeight: "500",
            }}
            className="btn d-flex align-items-center text-white"
            onClick={() => {
              navigate("/recruitment/create")
            }}
            type=""
          >
            <Plus size={15} className="me-2" weight="bold" />
            Create Recruitment
          </button>
        </div>
      </div>
      <div className="">
        <div
          className="grid grid-cols-3 gap-4 mt-1 px-4 py-4"
          style={{ backgroundColor: "#F3F6FF", borderRadius: "10px" }}
        >
          {recruit.length > 0 ? (
            recruit.map((val) => {
              const isExpired = new Date(val.expiredDate) < new Date();
              return (
                <div
                  className="p-3 d-flex align-items-center"
                  style={{
                    boxShadow: "0px 0px 3px 0px rgba(179,179,179,1)",
                    backgroundColor: "white",
                    color: "#003049",
                    borderRadius: "10px",
                  }}
                >
                  <FileText
                    className={`me-3 ${isExpired ? "text-[#CACACA]" : ""}`}
                    size={35}
                    weight="fill"
                  />
                  <div className="row">
                    <h2
                      style={{ fontWeight: "600" }}
                      className={`${isExpired ? "text-[#CACACA]" : ""}`}
                    >
                      {val["title"]}
                    </h2>
                    <span
                      style={{
                        fontSize: "10px",
                        color: "#A8A8A8",
                        fontWeight: "400",
                      }}
                    >
                      {val["publishDate"]}
                    </span>
                  </div>
                  <Dropdown
                    className={`ms-auto ${isExpired ? "text-[#CACACA]" : ""}`}
                  >
                    <Dropdown.Toggle as={CustomToggle} />

                    <Dropdown.Menu size="sm">
                      <Dropdown.Item
                        className="text-sm"
                        onClick={() => {
                          navigate(`/recruitment/edit/${val["id"]}`);
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
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={() => {
                          setModalRepost(true);
                          setId(val["id"]);
                        }}
                        className="text-sm"
                      >
                        Repost
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="text-sm"
                        onClick={() => {
                          setModalShare(true);
                          setId(val["id"]);
                        }}
                      >
                        Share
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              );
            })
          ) : (
            <div className="text-center col-span-3">No Data</div>
          )}
        </div>
      </div>
      <Modal show={modalRepost} size="lg" onHide={() => setModalRepost(false)}>
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Repost Job Vacancies
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="d-flex gap-4">
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm mt-3 mb-2"
                for="username"
              >
                Publish Date
              </label>
              <input
                id="publish_date"
                style={{
                  borderRadius: "10px",
                  border: "1.5px solid #EDEDED",
                  backgroundColor: "transparent",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
                onChange={(val) => {}}
                className="focus:ring-0 focus:ring-offset-0 me-3 form-control"
                type="date"
                placeholder="Recruitment description"
              />
            </div>

            <div className="w-full">
              <label
                className="block text-gray-700 text-sm mt-3 mb-2"
                for="username"
              >
                Expired Date
              </label>
              <input
                id="expired_date"
                style={{
                  borderRadius: "10px",
                  border: "1.5px solid #EDEDED",
                  backgroundColor: "transparent",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
                onChange={(val) => {}}
                className="focus:ring-0 focus:ring-offset-0 me-3 form-control"
                type="date"
                placeholder="Recruitment description"
              />
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
            onClick={() => setModalRepost(false)}
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
              const reqBody = {
                publishDate: document.getElementById("publish_date").value,
                expiredDate: document.getElementById("expired_date").value,
                id: id,
              };

              const repost = await RepostRecruitment(reqBody);
              inAwait();
              console.log(repost);
              SwalSuccess({ message: "Repost success" });
              setModalRepost(false);
            }}
          >
            Export
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={modalShare}
        size="md"
        onHide={() => {
          setModalRepost(false);
          setId("");
        }}
      >
        <Modal.Header closeButton className="mx-4 mt-4">
          <Modal.Title id="contained-modal-title-vcenter">
            Share Vacancy
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div>
            <label className="block text-gray-700 text-sm mb-2" for="link">
              Link
            </label>
            <input
              id="link"
              style={{
                borderRadius: "10px",
                border: "1.5px solid #EDEDED",
                backgroundColor: "transparent",
                fontSize: "12px",
                fontWeight: "500",
              }}
              disabled
              readOnly
              value={`https://ethos.afkaaruna.sch.id/karir/detail/${id}`}
              className="focus:ring-0 focus:ring-offset-0 me-3 form-control"
              type="text"
              placeholder="Link"
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="m-4" style={{ borderTopColor: "transparent" }}>
          <Button
            style={{
              border: "none",
              fontSize: "14px",
              backgroundColor: "#ECECEC",
              color: "#003049",
            }}
            className="px-3"
            onClick={() => {
              setModalShare(false);
              setId("");
            }}
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
            onClick={() => {
              // CARA COPY TO CLIPBOARD
              const link = document.getElementById("link");

              link.select();
              link.setSelectionRange(0, 99999);

              navigator.clipboard.writeText(link.value);
            }}
          >
            Copy
          </Button>
        </Modal.Footer>
      </Modal>
      <ModalDelete
        close={() => {
          setDelete(false);
          setId("");
        }}
        submit={() => {
          deleteRec(id);
          inAwait();
          setDelete(false);
          setId("");
          SwalSuccess({ message: "Success delete recruitment" });
        }}
        active={isdelete}
      />
    </>
  );
}
export default Recruitment;
