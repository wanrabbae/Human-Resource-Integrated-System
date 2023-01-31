import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Eye,
  FileText,
  DotsThreeOutline,
  MagnifyingGlass,
  Gear,
  CaretRight,
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

function RecruitmentSet() {
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
          <h3 style={{ fontSize: "20px", fontWeight: "600" }}>Requirment Setting</h3>
          <span
            style={{ fontSize: "10px", fontWeight: "400", color: "#737373" }}
          >
            Make sure the data filled in matches the vacancies opened
          </span>
        </div>
      </div>
      <div className="grid gap-y-4">
        <a href="#" className="btn d-block p-0 ">
          <div className="d-flex  bg-[#ffffff] justify-content-between p-3 align-items-center" style={{borderRadius:'10px'}}>
            Recruitment Website
            <CaretRight size={22} />

          </div>
        </a>
        <a href="#" className="btn d-block p-0 ">
          <div className="d-flex  bg-[#ffffff] justify-content-between p-3 align-items-center" style={{borderRadius:'10px'}}>
            Recruitment Website
            <CaretRight size={22} />

          </div>
        </a>
      </div>
    </>
  );
}
export default RecruitmentSet;
