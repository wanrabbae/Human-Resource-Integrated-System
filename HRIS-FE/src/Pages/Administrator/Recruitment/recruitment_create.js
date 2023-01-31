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
  GetRecruitment,
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
import { useNavigate } from "react-router-dom";
import { SwalSuccess } from "../../../Components/Modals";
import { DeleteForever } from "@mui/icons-material";
import { GetEmployeeStatus, GetJobPosition } from "../../../Repository/AdminRepository";
// import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";

function RecruitmentCreate() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [recruit, setRecruit] = useState([]);
  const [skills, setSkills] = useState([]);
  const [jobPosition, setJobPosition] = useState([]);
  const [employeeStatus, setEmployeeStatus] = useState([]);
  const [spesificQua, setSpesificQua] = useState({});
  const [education, setEducation] = useState([]);
  const [priority, setPriority] = useState([]);
  const [errorMsg, setErrorMsg] = useState();
  const [errorsMessage, setErrorsMessage] = useState({
    type: "",
    qualification: "",
    skill: "",
  });
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
  // useEffect(() => {
  //  priority();
  //  education();
  //  gender();
  // }, );

  const inAwait = async () => {
    var rec = await GetJobPosition();
    console.log("ini",rec.result);
    setJobPosition(rec.result)
    var empStatus = await GetEmployeeStatus();
    console.log(empStatus);
    setEmployeeStatus(empStatus);
  };
  useEffect(() => {
    inAwait();
  }, []);
  
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
      <form
        method="POST"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            if (document.getElementById("type").value == "Select Job Type") {
              setErrorsMessage({
                ...errorsMessage,
                type: "Please fill out this field",
              });
              window.scrollTo({ top: 0, behavior: "smooth" });
              return false;
            } else if (
              editorRef.current.getContent() == "" ||
              !editorRef.current.getContent()
            ) {
              setErrorsMessage({
                ...errorsMessage,
                qualification: "Please fill out this field",
              });
              return false;
            }

            var requestBody = {
              title: document.getElementById("title").value,
              description: document.getElementById("description").value,
              position: document.getElementById("position").value,
              placement: document.getElementById("placement").value,
              type: document.getElementById("type").value,
              jobDescription: document.getElementById("job_description").value,
              qualification: editorRef.current.getContent(),
              publishDate: document.getElementById("publish_date").value,
              expiredDate: document.getElementById("expired_date").value,
              spesificQualification: spesificQua ?? {},
            };

            var res = await AddRecruitment(requestBody);

            SwalSuccess({ message: "Success add recruitment" });
            navigate("/recruitment");
          } catch (error) {
            setErrorMsg(error.response.data.message);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
      >
        <div className="">
          <div
            className="grid gap-4 mt-1 p-4"
            style={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
          >
            <span className="text-red-600 text-xs">{errorMsg}</span>
            <div>
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
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
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
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
                required
                rows="3"
                onChange={(val) => {}}
                className="focus:ring-0 focus:ring-offset-0 form-control"
                type="text"
                placeholder="Recruitment description"
              ></textarea>
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Position
              </label>
              <select
                style={{
                  borderRadius: "10px",
                  border: "1.5px solid #EDEDED",
                  backgroundColor: "transparent",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
                required
                id="position"
                className="appearance-none w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-0 focus:shadow-outline"
              >
                <option hidden className="py-3">
                  Select Job Position
                </option>
                {jobPosition&&jobPosition.map((val, index) => (
                  <option value={val.name} className="py-3">
                    {val.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
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
                required
                id="type"
                className="appearance-none w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-0 focus:shadow-outline"
              >
                <option hidden className="py-3">
                  Select Job Type
                </option>
                {employeeStatus&&employeeStatus.map((val,index)=>(
                <option value={val.name} className="py-3">
                  {val.name}
                </option>))
}
              </select>
              <span className="text-red-600 text-xs">
                {errorsMessage.type ?? ""}
              </span>
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
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
                required
                onChange={(val) => {}}
                className="focus:ring-0 focus:ring-offset-0 me-3 form-control"
                type="text"
                placeholder="ex:Cilacap"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Job Description
              </label>
              <textarea
                id="job_description"
                required
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
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
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
              <span className="text-red-600 text-xs">
                {errorsMessage.qualification ?? ""}
              </span>
            </div>
            <div>
              <a
                style={{
                  borderRadius: "8px",
                  backgroundColor: "#FFF",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#669BBC",
                }}
                className="btn d-flex align-items-center text-[#669BBC] cursor-pointer"
                onClick={() => setModal(true)}
              >
                <Plus size={15} className="me-2" weight="bold" />
                Add Specific Qualification
              </a>
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
                  required
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
                  required
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
              onClick={() => {
                setModal(false);
                navigate("/recruitment");
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
              type="submit"
            >
              Create
            </Button>
          </div>
        </div>
      </form>
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
              required
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
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
              onChange={(e) =>
                setSpesificQua({ ...spesificQua, experience: e.target.value })
              }
            >
              <option selected disabled className="py-3">
                Select experience time
              </option>
              <option value="0" className="py-3">
                No experience yet
              </option>
              <option value="1" className="py-3">
                1 years
              </option>
              <option value="2" className="py-3">
                2 years
              </option>
              <option value="3" className="py-3">
                3 years
              </option>
              <option value="4" className="py-3">
                4 years
              </option>
              <option value="5" className="py-3">
                5 years
              </option>
              <option value="more" className="py-3">
                {"> 5 years"}
              </option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm mt-3 mb-2"
              for="skills"
            >
              Skill
            </label>
            <div className="d-flex mb-2">
              <input
                id="skills"
                required
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
                  if (document.getElementById("skills").value == "") {
                    setErrorsMessage({
                      ...errorsMessage,
                      skill: "Please fill out this field",
                    });
                    return false;
                  }
                  setSkills((e) => [
                    ...e,
                    document.getElementById("skills").value,
                  ]);
                  setErrorsMessage({ ...errorsMessage, skill: "" });
                }}
                className="btn bg-[#669BBC]"
              >
                <Plus size={15} className="text-white mx-1" weight="bold" />
              </button>
            </div>
            {errorsMessage.skill != "" || errorsMessage.skill != null ? (
              <span className="text-red-600 text-sm mb-2">
                {errorsMessage.skill}
              </span>
            ) : (
              ""
            )}
            <div className="d-flex flex-wrap">
              {skills.map((e, i) => {
                return (
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="mx-3" id="skillEdit">
                      {e}
                    </h1>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() =>
                        setSkills(
                          skills.filter(
                            (skl) =>
                              skl ==
                              document.getElementById("skillEdit").textContent
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
              options={optionsPriority}
              onChange={(e) => {
                var data = [];
                for (var i in e) {
                  data.push(e[i].value);
                }
                setPriority(data);
              }}
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
export default RecruitmentCreate;
