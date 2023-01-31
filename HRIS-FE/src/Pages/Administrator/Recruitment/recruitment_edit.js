import React, { useState, useEffect, useRef } from "react";
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
  EditRecruitment,
  GetRecruitment,
  GetRecruitmentById,
  searchData,
} from "../../../Repository/RecruitmentRepository";
import Select from "react-select";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

import FroalaEditorComponent from "react-froala-wysiwyg";
import FroalaEditor from "react-froala-wysiwyg";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import MultiSlider from "../../../Utils/multiSlider/MultiSlider";
import { useNavigate, useParams } from "react-router-dom";
import { SwalSuccess } from "../../../Components/Modals";
import { DeleteForever } from "@mui/icons-material";
// import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";

function RecruitmentEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const [recruit, setRecruit] = useState([]);
  const [skills, setSkills] = useState([]);
  const [spesificQua, setSpesificQua] = useState({});
  const [education, setEducation] = useState([]);
  const [priority, setPriority] = useState([]);
  const [editEdu, setEditEdu] = useState([]);
  const [editPrio, setEditPrio] = useState([]);
  const editorRef = useRef(null);
  const options = [
    { value: "SMA", label: "SMA / SMK Sederajat" },
    { value: "S1", label: "S1" },
    { value: "S2", label: "S2" },
    { value: "S3", label: "S3" },
  ];

  const optionsPriority = [
    { value: "age", label: "Age" },
    { value: "gender", label: "Gender" },
    { value: "education", label: "Education" },
    { value: "experience", label: "Experience" },
    { value: "skill", label: "Skill" },
  ];
  const gender = [
    { value: "Laki - Laki", label: "Laki - Laki" },
    { value: "Perempuan", label: "Perempuan" },
    { value: "unknown", label: "Keduanya" },
  ];
  const experience = [
    { value: "0", label: "No experience yet" },
    { value: "1", label: "1 Year" },
    { value: "2", label: "2 Year" },
    { value: "3", label: "3 Year" },
    { value: "4", label: "4 Year" },
    { value: "5", label: "5 Year" },
    { value: "5", label: ">5 Year" },
  ];

  const inAwait = async () => {
    var rec = await GetRecruitmentById(id);
    setRecruit(rec["result"]);
    var edu = JSON.parse(rec["result"]["spesificrecruitment"]["education"]);
    var dataedu = [];
    var educations = [];
    for (var i = 0; i < edu.length; i++) {
      dataedu.push({
        value: edu[i],
        label: edu[i] == "SMA" ? "SMA / SMK Sederajat" : edu[i],
      });
      educations.push(edu[i]);
      // console.log();
    }
    setEducation(educations);
    setEditEdu(dataedu);
    var prio = JSON.parse(rec["result"]["spesificrecruitment"]["priority"]);
    var dataprio = [];
    var priorities = [];
    for (var i = 0; i < prio.length; i++) {
      dataprio.push({
        value: prio[i],
        label: prio[i] == "SMA" ? "SMA / SMK Sederajat" : prio[i],
      });
      priorities.push(prio[i]);
      // console.log();
    }
    setPriority(priorities);
    setEditPrio(dataprio);

    var skill = JSON.parse(rec["result"]["spesificrecruitment"]["skill"]);
    setSkills(skill);
  };

  useEffect(() => {
    inAwait();
    //  priority();
    //  education();
    //  gender();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="row">
          <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
            Edit Recruitment
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
              value={recruit?.title}
              onChange={(val) => {
                setRecruit({ ...recruit, title: val.target.value });
              }}
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
              value={recruit?.description}
              onChange={(val) => {
                setRecruit({ ...recruit, description: val.target.value });
              }}
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
              value={recruit?.position}
              onChange={(val) => {
                setRecruit({ ...recruit, position: val.target.value });
              }}
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
              <option
                value="Part Time"
                selected={recruit?.type == "Part Time" ? true : false}
                className="py-3"
              >
                Part Time
              </option>
              <option
                value="Full Time"
                selected={recruit?.type == "Full Time" ? true : false}
                className="py-3"
              >
                Full Time
              </option>
              <option
                value="Remote"
                selected={recruit?.type == "Remote" ? true : false}
                className="py-3"
              >
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
              value={recruit?.placement}
              onChange={(val) => {
                setRecruit({ ...recruit, placement: val.target.value });
              }}
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
              value={recruit?.jobDescription}
              onChange={(val) => {
                setRecruit({ ...recruit, jobDescription: val.target.value });
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
              initialValue={recruit?.qualification}
              onChange={(val) => {
                setRecruit({ ...recruit, qualification: val.target.value });
              }}
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
              Edit Specific Qualification
            </button>
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
            onClick={() => navigate("/recruitment")}
          >
            Back
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
                id: id,
                title: document.getElementById("title").value,
                description: document.getElementById("description").value,
                position: document.getElementById("position").value,
                placement: document.getElementById("placement").value,
                type: document.getElementById("type").value,
                jobDescription:
                  document.getElementById("job_description").value,
                qualification: editorRef.current.getContent(),
                spesificQualification: spesificQua ?? {},
              };

              console.log(requestBody);
              var res = await EditRecruitment(requestBody);
              console.log(res);
              SwalSuccess({ message: "Success edit recruitment" });
              navigate("/recruitment");
            }}
          >
            Save
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
            {/* <Select
              value={spesificQua.gender}
              options={gender}
              onChange={(e) =>
                setSpesificQua({ ...spesificQua, gender: e.target.value })
              }
            /> */}
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
              <option
                value="Laki - Laki"
                selected={
                  recruit?.spesificrecruitment?.gender == "Laki - Laki"
                    ? true
                    : false
                }
                className="py-3"
              >
                Laki - Laki
              </option>
              <option
                value="Perempuan"
                selected={
                  recruit?.spesificrecruitment?.gender == "Perempuan"
                    ? true
                    : false
                }
                className="py-3"
              >
                Perempuan
              </option>
              <option
                value="unknown"
                selected={
                  recruit?.spesificrecruitment?.gender == "unknown"
                    ? true
                    : false
                }
                className="py-3"
              >
                Keduanya
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
            <Select
              className="basic-multi-select"
              classNamePrefix="select"
              isMulti
              onChange={(e) => {
                var data = [];
                for (var i in e) {
                  data.push(e[i].value);
                }
                setEducation(data);
              }}
              options={options}
              // value={editEdu}
              defaultValue={editEdu}
            />
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
                Select experience time
              </option>
              <option
                value="0"
                selected={
                  recruit?.spesificrecruitment?.experience == "0" ? true : false
                }
                className="py-3"
              >
                No experience yet
              </option>
              <option
                value="1"
                selected={
                  recruit?.spesificrecruitment?.experience == "1" ? true : false
                }
                className="py-3"
              >
                1 years
              </option>
              <option
                value="2"
                selected={
                  recruit?.spesificrecruitment?.experience == "2" ? true : false
                }
                className="py-3"
              >
                2 years
              </option>
              <option
                value="3"
                selected={
                  recruit?.spesificrecruitment?.experience == "3" ? true : false
                }
                className="py-3"
              >
                3 years
              </option>
              <option
                value="4"
                selected={
                  recruit?.spesificrecruitment?.experience == "4" ? true : false
                }
                className="py-3"
              >
                4 years
              </option>
              <option
                value="5"
                selected={
                  recruit?.spesificrecruitment?.experience == "5" ? true : false
                }
                className="py-3"
              >
                5 years
              </option>
              <option
                value="more"
                selected={
                  recruit?.spesificrecruitment?.experience == "more"
                    ? true
                    : false
                }
                className="py-3"
              >
                {"> 5 years"}
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
            <div className="d-flex mb-4">
              <input
                id="skills"
                style={{
                  borderRadius: "5px",
                  border: "1.5px solid #EDEDED",
                  backgroundColor: "transparent",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
                className="focus:ring-0 focus:ring-offset-0 me-2 form-control"
                type="text"
                placeholder="Skill qualification"
              />
              <button
                onClick={() => {
                  setSkills((e) => [
                    ...e,
                    document.getElementById("skills").value,
                  ]);
                }}
                className="btn bg-[#669BBC]"
              >
                <Plus size={15} className="text-white mx-1" weight="bold" />
              </button>
            </div>
            <div className="d-flex flex-wrap">
              {skills.map((e, i) => {
                return (
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="mx-3" id={e}>
                      {e}
                    </h1>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() =>
                        setSkills(
                          skills.filter(
                            (skl) =>
                              skl !== document.getElementById(e).textContent
                          )
                        )
                      }
                    >
                      <DeleteForever />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm mt-3 mb-2"
              for="username"
            >
              Priority Option
            </label>
            <Select
              className="basic-multi-select"
              classNamePrefix="select"
              isMulti
              //   defaultValue={optionsPriority.find(op => {
              //     return op.value === recruit?.spesificrecruitment?.priority
              //  })}
              // defaultValue={optionsPriority.map(ele => ele)}
              // defaultValue={optionsPriority.find(({ value }) => value === props.state)}
              options={optionsPriority}
              onChange={(e) => {
                var data = [];
                for (var i in e) {
                  data.push(e[i].value);
                }
                setPriority(data);
              }}
              defaultValue={editPrio}
            />
          </div>
          {/* <div className="mb-4">
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
          </div> */}
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
              setSpesificQua({
                ...spesificQua,
                education: JSON.stringify(education),
                priority: JSON.stringify(priority),
                skill: JSON.stringify(skills),
              });
              // console.log(spesificQua);
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
export default RecruitmentEdit;
