import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Eye,
  FileText,
  DotsThreeOutline,
  MagnifyingGlass,
  Gear,
} from "phosphor-react";
import { Button, Modal, Table } from "react-bootstrap";
import {
  AddRecruitment,
  GetRecruitment,
  searchData,
} from "../../../Repository/RecruitmentRepository";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

import FroalaEditorComponent from "react-froala-wysiwyg";
import FroalaEditor from "react-froala-wysiwyg";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

function Recruitment() {
  const [modal, setModal] = useState(false);
  const [recruit, setRecruit] = useState([]);
  const editorRef = useRef(null);
  const inAwait = async () => {
    var rec = await GetRecruitment();
    setRecruit(rec["result"]);
  };

  const search = async (keyword) => {
    if (keyword !== null || (keyword !== undefined) !== "") {
      const data = await searchData(keyword);
      setRecruit(data);
    } else {
      inAwait();
    }
  };

  useEffect(() => {
    inAwait();
  }, []);
  return (
    <>
    <div className="d-flex justify-content-between">
                <div className="row">
                    <h3 style={{ fontSize: "20px", fontWeight: '600' }}>Requirment</h3>
                    <span style={{ fontSize: "10px", fontWeight: '400', color: "#737373" }}>list of recruitment form </span>
                </div>
                <div className="d-flex">
                    <div className="input-group me-3 align-items-center w-auto" style={{ borderRadius: '10px', border: '1.5px solid #CACACA', backgroundColor: 'transparent', color: "#0E5073", fontSize: "14px", fontWeight: '500' }}>
                        <div class="input-group-prepend">
                            <span class="transparent "><MagnifyingGlass size={20} className="mx-2 form-control-feedback" color="#CACACA" weight="bold" /></span>
                        </div>
                        <input style={{ border: '0', outline: 'none', backgroundColor: 'transparent', color: "#0E5073", fontSize: "14px", fontWeight: '500' }} onChange={(val) => { }} className="focus:ring-0 focus:ring-offset-0 focus:outline-0" type="search" placeholder=" Search Requirement" />
                    </div>
                    <button style={{ borderRadius: '10px', border: '1.5px solid #CACACA', color: "#0E5073", fontSize: "14px", fontWeight: '500' }} className="me-3 btn d-flex align-items-center" onClick={() => { window.location.href = '/recruitment/entry-application' }} type=""><Eye className="me-2" size={15} weight="bold" />Entry Application</button>
                    <button style={{ borderRadius: '10px', backgroundColor: "#0E5073", fontSize: "14px", fontWeight: '500' }} className="btn d-flex align-items-center text-white" onClick={() => { window.location.href = '/recruitment/create' }} type=""><Plus size={15} className="me-2" weight="bold" />Create Recruitment</button>
                </div>
            </div>
      <div className="">
        <div
          className="grid grid-cols-3 gap-4 mt-1 px-4 pt-4 pb-56"
          style={{ backgroundColor: "#F3F6FF", borderRadius: "10px" }}
        >
          {recruit.length > 0 ? (
            recruit.map((val) => {
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
                  <FileText className="me-3" size={35} weight="fill" />
                  <div className="row">
                    <h2 style={{ fontWeight: "600" }}>{val["title"]}</h2>
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
                  <a href="" className="ms-auto">
                    <DotsThreeOutline size={20} weight="fill" />
                  </a>
                </div>
              );
            })
          ) : (
            <div className="text-center grid-cols-1">No Data</div>
          )}
        </div>
      </div>
      <Modal show={modal} size="lg" onHide={() => setModal(false)}>
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Create Recruitment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          
        </Modal.Body>
        <Modal.Footer className="m-4">
          
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Recruitment;
