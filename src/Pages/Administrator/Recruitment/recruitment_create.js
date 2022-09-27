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
import MultiSlider from "../../../Utils/multiSlider/MultiSlider";
import { useNavigate } from "react-router-dom";
import { SwalSuccess } from "../../../Components/Modals";

function RecruitmentCreate() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [recruit, setRecruit] = useState([]);
  const [spesificQua, setSpesificQua] = useState({});
  const editorRef = useRef(null);

  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="row">
          <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
            Create Recruitment
          </h3>
          <span
            style={{ fontSize: "10px", fontWeight: "400", color: "#737373" }}
          >
            Make sure the data filled in matches the vacancies opened
          </span>
        </div>
      </div>
      <div className="">
        <div
          className="grid gap-4 mt-1 p-4"
          style={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
        >
          <div>
            <label className="block text-gray-700 text-sm mb-2" for="username">
              Recruitment Title
            </label>
            <input
              id="title"
              style={{
                borderRadius: "10px",
                border: "1.5px solid #EDEDED",
                backgroundColor: "transparent",
                fontSize: "12px",
                fontWeight: "500",
              }}
              onChange={(val) => {}}
              className="focus:ring-0 focus:ring-offset-0 me-3 form-control"
              type="text"
              placeholder="Recruitment Title Title"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-2" for="username">
              Recruitment Description
            </label>
            <textarea
              id="description"
              style={{
                borderRadius: "10px",
                border: "1.5px solid #EDEDED",
                backgroundColor: "transparent",
                fontSize: "12px",
                fontWeight: "500",
              }}
              rows="3"
              onChange={(val) => {}}
              className="focus:ring-0 focus:ring-offset-0 form-control"
              type="text"
              placeholder="Recruitment description"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-2" for="username">
              Position
            </label>
            <input
              id="position"
              style={{
                borderRadius: "10px",
                border: "1.5px solid #EDEDED",
                backgroundColor: "transparent",
                fontSize: "12px",
                fontWeight: "500",
              }}
              onChange={(val) => {}}
              className=" focus:ring-0 focus:ring-offset-0 me-3 form-control"
              type="text"
              placeholder="Position"
            />
          </div>
          <div className="">
            <label className="block text-gray-700 text-sm mb-2" for="username">
              Job Type
            </label>
            <select
              style={{
                borderRadius: "10px",
                border: "1.5px solid #EDEDED",
                backgroundColor: "transparent",
                fontSize: "12px",
                fontWeight: "500",
              }}
              id="type"
              className="appearance-none w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-0 focus:shadow-outline"
            >
              <option selected disabled className="py-3">
                Select Job Type
              </option>
              <option value="Part Time" className="py-3">
                Part Time
              </option>
              <option value="Full Time" className="py-3">
                Full Time
              </option>
              <option value="Remote" className="py-3">
                Remote
              </option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-2" for="username">
              Placement
            </label>
            <input
              id="placement"
              style={{
                borderRadius: "10px",
                border: "1.5px solid #EDEDED",
                backgroundColor: "transparent",
                fontSize: "12px",
                fontWeight: "500",
              }}
              onChange={(val) => {}}
              className="focus:ring-0 focus:ring-offset-0 me-3 form-control"
              type="text"
              placeholder="Placement"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-2" for="username">
              Job Description
            </label>
            <textarea
              id="job_description"
              style={{
                borderRadius: "10px",
                border: "1.5px solid #EDEDED",
                backgroundColor: "transparent",
                fontSize: "12px",
                fontWeight: "500",
              }}
              className="focus:ring-0 focus:ring-offset-0 me-3 form-control"
              rows="8"
              placeholder="Job Description"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-2" for="username">
              General Qualification
            </label>
            <Editor
              //    onChange={(val) => {
              //     setEditor(val.currentTarget.value)
              //    }}
              // id="qualification2"
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                height: 250,
                menubar: false,
                plugins: [
                  "a11ychecker",
                  "advlist",
                  "advcode",
                  "advtable",
                  "autolink",
                  "checklist",
                  "export",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "powerpaste",
                  "fullscreen",
                  "formatpainter",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | casechange blocks | bold italic backcolor | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
              }}
            />
          </div>
          <div>
            <button
              style={{
                borderRadius: "8px",
                backgroundColor: "#FFF",
                fontSize: "14px",
                fontWeight: "500",
                color: "#669BBC",
              }}
              className="btn d-flex align-items-center text-[#669BBC]"
              onClick={() => setModal(true)}
              type=""
            >
              <Plus size={15} className="me-2" weight="bold" />
              Add Specific Qualification
            </button>
          </div>
          <div className="d-flex gap-4">
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm mt-3 mb-2"
                for="username"
              >
                Start Date
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
                End Date
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
        </div>
        <div className="m-4 gap-4 d-flex justify-content-end">
          <Button
            style={{
              border: "none",
              fontSize: "14px",
              backgroundColor: "#ECECEC",
              color: "#003049",
              fontWeight: "500",
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
            onClick={async () => {
              var requestBody = {
                title: document.getElementById("title").value,
                description: document.getElementById("description").value,
                position: document.getElementById("position").value,
                placement: document.getElementById("placement").value,
                type: document.getElementById("type").value,
                jobDescription:
                  document.getElementById("job_description").value,
                qualification: editorRef.current.getContent(),
                publishDate: document.getElementById("publish_date").value,
                expiredDate: document.getElementById("expired_date").value,
                spesificQualification: spesificQua ?? {},
              };
              var res = await AddRecruitment(requestBody);
              // console.log(requestBody);
              SwalSuccess({ message: "Success add recruitment" });
              navigate("/recruitment");
            }}
          >
            Create
          </Button>
        </div>
      </div>
      <Modal show={modal} size="lg" onHide={() => setModal(false)}>
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Spesific Qualification
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mt-3" for="username">
              Age
            </label>
            <MultiSlider
              min={17}
              max={30}
              onChange={({ min, max }) =>
                setSpesificQua({ ...spesificQua, ageRange: `${min}-${max}` })
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm mt-3 mb-2"
              for="username"
            >
              Gender
            </label>
            <select
              id="type"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
              onChange={(e) =>
                setSpesificQua({ ...spesificQua, gender: e.target.value })
              }
            >
              <option selected disabled className="py-3">
                Select Gender
              </option>
              <option value="Laki - Laki" className="py-3">
                Laki - Laki
              </option>
              <option value="Perempuan" className="py-3">
                Perempuan
              </option>
              <option value="unknown" className="py-3">
                Tidak keduanya
              </option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm mt-3 mb-2"
              for="username"
            >
              Education
            </label>
            <select
              id="type"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
              onChange={(e) =>
                setSpesificQua({ ...spesificQua, education: e.target.value })
              }
            >
              <option selected disabled className="py-3">
                Select Job Type
              </option>
              <option value="Part Time" className="py-3">
                Man
              </option>
              <option value="Full Time" className="py-3">
                Woman
              </option>
              <option value="Remote" className="py-3">
                Both of Them
              </option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm mt-3 mb-2"
              for="username"
            >
              Experience
            </label>
            <select
              id="type"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
              onChange={(e) =>
                setSpesificQua({ ...spesificQua, experience: e.target.value })
              }
            >
              <option selected disabled className="py-3">
                Select Job Type
              </option>
              <option value="Part Time" className="py-3">
                Man
              </option>
              <option value="Full Time" className="py-3">
                Woman
              </option>
              <option value="Remote" className="py-3">
                Both of Them
              </option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm mt-3 mb-2"
              for="username"
            >
              Skill
            </label>
            <div className="d-flex ">
              <input
                id="placement"
                style={{
                  borderRadius: "5px",
                  border: "1.5px solid #EDEDED",
                  backgroundColor: "transparent",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
                onChange={(e) =>
                  setSpesificQua({ ...spesificQua, skill: e.target.value })
                }
                className="focus:ring-0 focus:ring-offset-0 me-2 form-control"
                type="text"
                placeholder="Skill qualification"
              />
              <button className="btn bg-[#669BBC]">
                <Plus size={15} className="text-white mx-1" weight="bold" />
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm mt-3 mb-2"
              for="username"
            >
              Minimum Skills that Must be Possessed
            </label>
            <input
              id="placement"
              style={{
                borderRadius: "5px",
                border: "1.5px solid #EDEDED",
                backgroundColor: "transparent",
                fontSize: "12px",
                fontWeight: "500",
              }}
              onChange={(val) => {}}
              className="focus:ring-0 focus:ring-offset-0 me-2 w-40"
              type="number"
              placeholder="0"
            />
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
            onClick={() => {
              setModal(false);
              setSpesificQua({});
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
              setModal(false);
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default RecruitmentCreate;
