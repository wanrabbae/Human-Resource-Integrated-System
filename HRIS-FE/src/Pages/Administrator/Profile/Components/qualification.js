import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { Trash, PencilSimple, Plus } from "phosphor-react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
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
  addEducation,
  addLanguage,
  addLincense,
  addSkill,
  addWorkExperience,
  deleteEducation,
  deleteLanguage,
  deleteLicense,
  deleteLincense,
  deleteSkill,
  deleteWorkExperience,
  editLanguage,
  getEducation,
  getLanguage,
  getLincense,
  getSkill,
  getWorkExperience,
  updateEducation,
  updateLincense,
  updateSkill,
  updateWorkExperience,
} from "../../../../Repository/ProfileRepository";
import { useEffect } from "react";
import { GetJobTittle, getLicense } from "../../../../Repository/AdminRepository";
import { GetSkills } from "../../../../Repository/SkillsRepository";
import { GetLanguages } from "../../../../Repository/LanguagesRepository";
import { ModalDelete, SwalSuccess } from "../../../../Components/Modals";
import { GetEducation } from "../../../../Repository/EducationRepository";

function Qualification() {
  const [modalAddWExperience, setModalAddWExperience] = useState(false);
  const [modalEditExperience, setModalEditExperience] = useState(false);
  const [modalAddSkill, setModalAddSkill] = useState(false);
  const [modalEditSkill, setModalEditSkill] = useState(false);
  const [modalAddLanguage, setModalAddLanguage] = useState(false);
  const [modalEditLanguage, setModalEditLanguage] = useState(false);
  const [modalAddEducation, setModalAddEducation] = useState(false);
  const [modalEditEducation, setModalEditEducation] = useState(false);
  const [modalAddLisence, setModalAddLisence] = useState(false);
  const [modalEditLisence, setModalEditLisence] = useState(false);

  const [isdeleteWork, setDeleteWork] = useState(false);
  const [isdeleteSkill, setDeleteSkill] = useState(false);
  const [isdeleteEdu, setDeleteEdu] = useState(false);
  const [isdeleteLanguage, setDeleteLanguage] = useState(false);
  const [isdeleteLicense, setDeleteLicense] = useState(false);

  const [id, setId] = useState([]);

  const [workExperience, setWorkExperience] = useState([]);
  const [companyName, setCompanyName] = useState([]);
  const [jobTitle, setJobTitle] = useState([]);
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);
  const [comment, setComment] = useState([]);
  const [editIdWorkExp, setEditIdWorkExp] = useState([]);
  const [editCompanyName, setEditCompanyName] = useState([]);
  const [editJobTitleId, setEditJobTitleId] = useState([]);
  const [editJobTitleName, setEditJobTitleName] = useState([]);
  const [editStartDate, setEditStartDate] = useState([]);
  const [editEndDate, setEditEndDate] = useState([]);
  const [editComment, setEditComment] = useState([]);

  // console.log(workExperience);
  // console.log(editJobTitleId);
  // console.log(editJobTitleName);
  // console.log(startDate);
  // console.log(endDate);
  // console.log(comment);

  const [skill, setSkill] = useState([]);
  const [skillId, setSkillId] = useState([]);
  const [yearsOfExperience, setYearsOfExperience] = useState([]);
  const [commentSkill, setCommentSkill] = useState([]);
  const [editIdSkill, setEditIdSkill] = useState([]);
  const [editSkillId, setEditSkillId] = useState([]);
  const [editSkillName, setEditSkillName] = useState([]);
  const [editYearsOfExperience, setEditYearsOfExperience] = useState([]);
  const [editCommentSkill, setEditCommentSkill] = useState([]);

  // console.log(skillId);
  // console.log(yearsOfExperience)
  // console.log(commentSkill)

  const [dataLevel, setDataLevel] = useState([]);
  const [education, setEducation] = useState([]);
  const [level, setLevel] = useState([]);
  const [institute, setInstitute] = useState([]);
  const [major, setMajor] = useState([]);
  const [year, setYear] = useState([]);
  const [startDateEdu, setStartDateEdu] = useState([]);
  const [endDateEdu, setEndDateEdu] = useState([]);
  const [gpa, setGpa] = useState([]);
  const [idEdu, setidEdu] = useState([]);
  const [editLevel, setEditLevel] = useState([]);
  const [editInstitute, setEditInstitute] = useState([]);
  const [editMajor, setEditMajor] = useState([]);
  const [editYear, setEditYear] = useState([]);
  const [editStartDateEdu, setEditStartDateEdu] = useState([]);
  const [editEndDateEdu, setEditEndDateEdu] = useState([]);
  const [editGpa, setEditGpa] = useState([]);

  // console.log(editLevel);
  // console.log(editInstitute);
  // console.log(editMajor);
  // console.log(editYear);
  // console.log(editStartDateEdu);
  // console.log(editEndDateEdu);
  // console.log(editGpa);

  const [language, setLanguage] = useState([]);
  const [languageId, setLanguageId] = useState([]);
  const [fluency, setFluency] = useState([]);
  const [competency, setCompetency] = useState([]);
  const [commentLanguage, setCommentLanguage] = useState([]);
  const [idLanguage, setIdLanguage] = useState([]);
  const [editLanguageId, setEditLanguageId] = useState([]);
  const [editLanguageName, setEditLanguageName] = useState([]);
  const [editFluency, setEditFluency] = useState([]);
  const [editCompetency, setEditCompetency] = useState([]);
  const [editCommentLanguage, setEditCommentLanguage] = useState([]);

  // console.log(languageId);
  // console.log(fluency);
  // console.log(competency);
  // console.log(commentLanguage);

  const [license, setLicense] = useState([]);
  const [licenseType, setLicenseType] = useState([]);
  const [licenseNumber, setLicenseNumber] = useState([]);
  const [issuedDate, setIssuedDate] = useState([]);
  const [expiryDate, setExpiryDate] = useState([]);
  const [idLicense, setidLicense] = useState([]);
  const [editLicenseType, setEditLicenseType] = useState([]);
  const [editLicenseNumber, setEditLicenseNumber] = useState([]);
  const [editIssuedDate, setEditIssuedDate] = useState([]);
  const [editExpiryDate, setEditExpiryDate] = useState([]);

  const [datajobTitle, setDataJobTitle] = useState([]);
  const [dataSkill, setDataSkill] = useState([]);
  const [dataLanguage, setDataLanguage] = useState([]);
  const [dataLisensi, setLisensi] = useState([]);

  const inAwait = async () => {
    var dataWorkExperience = await getWorkExperience();
    setWorkExperience(dataWorkExperience.result);
    // console.log(dataWorkExperience.result);
    var dataSkill = await getSkill();
    setSkill(dataSkill.result);
    // console.log(dataSkill.result);
    var dataEducation = await getEducation();
    setEducation(dataEducation.result);
    // console.log(dataEducation.result);
    var dataLanguage = await getLanguage();
    setLanguage(dataLanguage.result);
    console.log(dataLanguage.result);
    var dataLicense = await getLincense();
    setLicense(dataLicense.result);
    // console.log(dataLicense.result);
    var dataJob = await GetJobTittle();
    setDataJobTitle(dataJob);
    var dataSkill = await GetSkills();
    setDataSkill(dataSkill);
    var language = await GetLanguages();
    setDataLanguage(language);
    var dataLevel = await GetEducation();
    // console.log(dataLevel);
    setDataLevel(dataLevel);
    var lisen = await getLicense();
    // console.log(dataLevel);
    setLisensi(lisen);
  };
  // console.log(workExperience[0].jobtitle.name);
  // console.log(editJobTitleName);

  useEffect(() => {
    inAwait();
  }, []);

  const postDataAddWorkExp = async () => {
    var requestBody = {
      companyName: companyName,
      jobTitle: jobTitle,
      startDate: startDate,
      endDate: endDate,
      comment: comment,
    };
    console.log(requestBody);
    var res = await addWorkExperience(requestBody);
    inAwait();
    console.log(res);
    setModalAddWExperience(false);
    SwalSuccess({ message: "Success Add Work Experience" });
  };

  const postDataEditWorkExp = async () => {
    var requestBody = {
      id: editIdWorkExp,
      companyName: editCompanyName,
      jobTitle: editJobTitleId,
      startDate: editStartDate,
      endDate: editEndDate,
      comment: editComment,
    };
    console.log(requestBody);
    var res = await updateWorkExperience(requestBody);
    inAwait();
    console.log(res);
    setModalEditExperience(false);
    SwalSuccess({ message: "Success Update Work Experience" });
  };

  const postDataSkill = async () => {
    var requestBody = {
      skill_id: skillId,
      yearsOfExperience: yearsOfExperience,
      comment: commentSkill,
    };
    console.log(requestBody);
    var res = await addSkill(requestBody);
    console.log(res);
    inAwait();
    setModalAddSkill(false);
    SwalSuccess({ message: "Success Add Skill" });
  };

  const postDataEditSkill = async () => {
    var requestBody = {
      id: editIdSkill,
      skill_id: editSkillId,
      yearsOfExperience: editYearsOfExperience,
      comment: editCommentSkill,
    };
    console.log(requestBody);
    var res = await updateSkill(requestBody);
    console.log(res);
    inAwait();
    setModalEditSkill(false);
    SwalSuccess({ message: "Success Update Skill" });
  };

  const postDataEducation = async () => {
    var requestBody = {
      level: level,
      institute: institute,
      major: major,
      year: year,
      gap: gpa,
      startDate: startDateEdu,
      endDate: endDateEdu,
    };
    console.log(requestBody);
    var res = await addEducation(requestBody);
    console.log(res);
    inAwait();
    setModalAddEducation(false);
    SwalSuccess({ message: "Success Add Education" });
  };

  const postDataEditEducation = async () => {
    var requestBody = {
      id: idEdu,
      level: editLevel,
      institute: editInstitute,
      major: editMajor,
      year: editYear,
      gap: editGpa,
      startDate: editStartDateEdu,
      endDate: editEndDateEdu,
    };
    console.log(requestBody);
    var res = await updateEducation(requestBody);
    console.log(res);
    inAwait();
    setModalEditEducation(false);
    SwalSuccess({ message: "Success Update Education" });
  };

  const postDataLanguage = async () => {
    var requestBody = {
      language_id: languageId,
      fluency: fluency.toString(),
      competency: competency,
      comment: commentLanguage,
    };
    console.log(requestBody);
    var res = await addLanguage(requestBody);
    console.log(res);
    inAwait();
    setModalAddLanguage(false);
    SwalSuccess({ message: "Success Add Language" });
  };

  const postDataEditLanguage = async () => {
    var requestBody = {
      id: idLanguage,
      language_id: editLanguageId,
      fluency: editFluency.toString(),
      competency: editCompetency,
      comment: editCommentLanguage,
    };
    console.log(requestBody);
    var res = await editLanguage(requestBody);
    console.log(res);
    inAwait();
    setModalEditLanguage(false);
    SwalSuccess({ message: "Success Update Language" });
  };

  const postDataLicense = async () => {
    var requestBody = {
      licenseType: licenseType,
      issuedDate: issuedDate,
      expiryDate: expiryDate,
      licenseNumber: licenseNumber,
    };
    console.log(requestBody);
    var res = await addLincense(requestBody);
    console.log(res);
    inAwait();
    setModalAddLisence(false);
    SwalSuccess({ message: "Success Add License" });
  };

  const postDataEditLicense = async () => {
    var requestBody = {
      id: idLicense,
      licenseType: editLicenseType,
      issuedDate: editIssuedDate,
      expiryDate: editExpiryDate,
      licenseNumber: editLicenseNumber,
    };
    console.log(requestBody);
    var res = await updateLincense(requestBody);
    console.log(res);
    inAwait();
    setModalEditLisence(false);
    SwalSuccess({ message: "Success Update License" });
  };
  const fluencyOptions = [
    { value: 'Writting', label: 'Writting', color: '#00B8D9'},
    { value: 'Speaking', label: 'Speaking', color: '#0052CC'},
    { value: 'Reading', label: 'Reading', color: '#5243AA' },
  ];

  const handleChangeFluency = (e) => {
      setFluency(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  const handleChangeEditFluency = (e) => {
      setEditFluency(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  console.log(editFluency)

  return (
    <>
      <div>
        <div className="mb-3 d-flex justify-content-between">
          <div className="row">
            <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
              Qualifications
            </h3>
            <span
              style={{ fontSize: "10px", fontWeight: "400", color: "#737373" }}
            >
              List of record employee qualifications
            </span>
          </div>
        </div>
        <hr style={{ backgroundColor: "#CACACA" }} className="mb-3"></hr>
        <div
          className="p-3 mb-5 rounded-2xl"
          style={{ boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.25)" }}
        >
          <div className="mt-4 mb-3 d-flex justify-content-between">
            <div className="row">
              <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
                Work Experience
              </h3>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "400",
                  color: "#737373",
                }}
              >
                List of work experience
              </span>
            </div>
            <button
              style={{
                borderRadius: "10px",
                color: "white",
                fontSize: "14px",
                fontWeight: "500",
              }}
              className="bg-[#0E5073] btn d-flex align-items-center align-middle"
              onClick={() => setModalAddWExperience(true)}
              type=""
            >
              <Plus className="me-2" size={20} weight="bold" />
              Add
            </button>
          </div>
          <hr style={{ backgroundColor: "#CACACA" }} className=""></hr>
          <div className="w-100">
            <table
              className="table mt-4 table-borderless"
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
                  <th className="align-middle " onClick={() => {}}>
                    Company
                    <ImportExport fontSize="2px" />
                  </th>
                  <th className="align-middle " onClick={() => {}}>
                    Job Title
                    <ImportExport fontSize="2px" />
                  </th>
                  <th className="align-middle " onClick={() => {}}>
                    Start Date
                    <ImportExport fontSize="2px" />
                  </th>
                  <th className="align-middle " onClick={() => {}}>
                    End Date <ImportExport fontSize="2px" />
                  </th>
                  <th className="align-middle " onClick={() => {}}>
                    Comment <ImportExport fontSize="2px" />
                  </th>
                  <th className="align-middle " onClick={() => {}}>
                    Action <ImportExport fontSize="2px" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {workExperience ? (
                  workExperience.map((val, index) => (
                    <tr key={index} style={{ fontSize: "14px" }}>
                      <td className="align-middle">{val.companyName}</td>
                      <td className="align-middle">{val.jobtitle?.name}</td>
                      <td className="align-middle">{val.startDate}</td>
                      <td className="align-middle">{val.endDate}</td>
                      <td className="align-middle">{val.comment}</td>
                      <td className="align-middle">
                        <div className="flex flex-row gap-2">
                          <button
                            className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                            onClick={() => {
                              setEditIdWorkExp(val.id);
                              setEditCompanyName(val.companyName);
                              setEditJobTitleId(val.jobTitle?.id);
                              setEditJobTitleName(val.jobtitle.name);
                              setEditStartDate(val.startDate);
                              setEditEndDate(val.endDate);
                              setEditComment(val.comment);
                              setModalEditExperience(true);
                            }}
                          >
                            <PencilSimple
                              color="#003049"
                              className="h-5 w-5"
                              weight="bold"
                              aria-hidden="true"
                            />
                          </button>
                          <button
                            className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                            onClick={() => {
                              setId(val.id);
                              setDeleteWork(true);
                            }}
                          >
                            <Trash
                              color="#003049"
                              weight="bold"
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <div className="d-flex justify-content-center align-middle text-center">
                        No Data
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="p-3 mb-5 rounded-2xl"
          style={{ boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.25)" }}
        >
          <div className="mt-4 mb-3 d-flex justify-content-between">
            <div className="row">
              <h3 style={{ fontSize: "20px", fontWeight: "600" }}>Skills</h3>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "400",
                  color: "#737373",
                }}
              >
                List of employee skills
              </span>
            </div>
            <button
              style={{
                borderRadius: "10px",
                color: "white",
                fontSize: "14px",
                fontWeight: "500",
              }}
              className="bg-[#0E5073] btn d-flex align-items-center align-middle"
              onClick={() => setModalAddSkill(true)}
              type=""
            >
              <Plus className="me-2" size={20} weight="bold" />
              Add
            </button>
          </div>
          <hr style={{ backgroundColor: "#CACACA" }} className=""></hr>
          <div className="w-100">
            <table
              className="table mt-4 table-borderless"
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
                  <th className="align-middle " onClick={() => {}}>
                    Skills <ImportExport fontSize="2px" />
                  </th>
                  <th className="align-middle " onClick={() => {}}>
                    Year of Experience <ImportExport fontSize="2px" />
                  </th>
                  <th className="align-middle " onClick={() => {}}>
                    Action <ImportExport fontSize="2px" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {skill ? (
                  skill.map((val, index) => (
                    <tr key={index} style={{ fontSize: "14px" }}>
                      <td className="align-middle">{val.skill?.name}</td>
                      <td className="align-middle">{val.yearsOfExperience}</td>
                      <td className="align-middle">
                        <div className="flex flex-row gap-2">
                          <button
                            className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                            onClick={() => {
                              setEditIdSkill(val.id);
                              setEditSkillId(val.skill.id);
                              setEditSkillName(val.skill.name);
                              setEditYearsOfExperience(val.yearsOfExperience);
                              setEditCommentSkill(val.comment);
                              setModalEditSkill(true);
                            }}
                          >
                            <PencilSimple
                              color="#003049"
                              className="h-5 w-5"
                              weight="bold"
                              aria-hidden="true"
                            />
                          </button>
                          <button
                            className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                            onClick={() => {
                              setId(val.id);
                              setDeleteSkill(true);
                            }}
                          >
                            <Trash
                              color="#003049"
                              weight="bold"
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2}>
                      <div className="d-flex justify-content-center align-middle text-center">
                        No Data
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="p-3 mb-5 rounded-2xl"
          style={{ boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.25)" }}
        >
          <div className="mt-4 mb-3 d-flex justify-content-between">
            <div className="row">
              <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
                Educations
              </h3>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "400",
                  color: "#737373",
                }}
              >
                List of employee educations
              </span>
            </div>
            <button
              style={{
                borderRadius: "10px",
                color: "white",
                fontSize: "14px",
                fontWeight: "500",
              }}
              className="bg-[#0E5073] btn d-flex align-items-center align-middle"
              onClick={() => setModalAddEducation(true)}
              type=""
            >
              <Plus className="me-2" size={20} weight="bold" />
              Add
            </button>
          </div>
          <hr style={{ backgroundColor: "#CACACA" }} className=""></hr>
          <div className="w-100">
            <table
              className="table mt-4 table-borderless"
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
                  <th className="align-middle " onClick={() => {}}>
                    Level <ImportExport fontSize="2px" />
                  </th>
                  <th className="align-middle " onClick={() => {}}>
                    Year <ImportExport fontSize="2px" />
                  </th>
                  <th className="align-middle " onClick={() => {}}>
                    GPA/Score <ImportExport fontSize="2px" />
                  </th>
                  <th className="align-middle " onClick={() => {}}>
                    Action <ImportExport fontSize="2px" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {education ? (
                  education.map((val, index) => (
                    <tr key={index} style={{ fontSize: "14px" }}>
                      <td className="align-middle">{val.level}</td>
                      <td className="align-middle">{val.year}</td>
                      <td className="align-middle">{val.gap}</td>
                      <td className="align-middle">
                        <div className="flex flex-row gap-2">
                          <button
                            className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                            onClick={() => {
                              setidEdu(val.id);
                              setEditLevel(val.level);
                              setEditYear(val.year);
                              setEditGpa(val.gap);
                              setEditInstitute(val.institute);
                              setEditMajor(val.major);
                              setEditStartDateEdu(val.startDate);
                              setEditEndDateEdu(val.endDate);
                              setModalEditEducation(true);
                            }}
                          >
                            <PencilSimple
                              color="#003049"
                              className="h-5 w-5"
                              weight="bold"
                              aria-hidden="true"
                            />
                          </button>
                          <button
                            className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                            onClick={() => {
                              setId(val.id);
                              setDeleteEdu(true);
                            }}
                          >
                            <Trash
                              color="#003049"
                              weight="bold"
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>
                      <div className="d-flex justify-content-center align-middle text-center">
                        No Data
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="p-3 mb-5 rounded-2xl"
          style={{ boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.25)" }}
        >
          <div className="mt-4 mb-3 d-flex justify-content-between">
            <div className="row">
              <h3 style={{ fontSize: "20px", fontWeight: "600" }}>Languages</h3>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "400",
                  color: "#737373",
                }}
              >
                List of employee languages
              </span>
            </div>
            <button
              style={{
                borderRadius: "10px",
                color: "white",
                fontSize: "14px",
                fontWeight: "500",
              }}
              className="bg-[#0E5073] btn d-flex align-items-center align-middle"
              onClick={() => setModalAddLanguage(true)}
              type=""
            >
              <Plus className="me-2" size={20} weight="bold" />
              Add
            </button>
          </div>
          <hr style={{ backgroundColor: "#CACACA" }} className=""></hr>
          <div className="w-100">
            <table
              className="table mt-4 table-borderless"
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
                  <th className="align-middle " onClick={() => {}}>
                    Language <ImportExport fontSize="2px" />
                  </th>
                  <th className="align-middle " onClick={() => {}}>
                    Fluency <ImportExport fontSize="2px" />
                  </th>
                  <th className="align-middle " onClick={() => {}}>
                    Competency <ImportExport fontSize="2px" />
                  </th>
                  <th className="align-middle " onClick={() => {}}>
                    Comment <ImportExport fontSize="2px" />
                  </th>
                  <th className="align-middle " onClick={() => {}}>
                    Action <ImportExport fontSize="2px" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {language ? (
                  language.map((val, index) => (
                    <tr style={{ fontSize: "14px" }}>
                      <td className="align-middle">{val.language.name}</td>
                      <td className="align-middle">{val.fluency}</td>
                      <td className="align-middle">{val.competency}</td>
                      <td className="align-middle">{val.comment}</td>
                      <td className="align-middle">
                        <div className="flex flex-row gap-2">
                          <button
                            className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                            onClick={() => {
                              setIdLanguage(val.id);
                              setEditLanguageId(val.language.id);
                              setEditLanguageName(val.language?.name);
                              setEditFluency(val.fluency.split(','));
                              setEditCompetency(val.competency);
                              setEditCommentLanguage(val.comment);
                              setModalEditLanguage(true);
                            }}
                          >
                            <PencilSimple
                              color="#003049"
                              className="h-5 w-5"
                              weight="bold"
                              aria-hidden="true"
                            />
                          </button>
                          <button
                            className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                            onClick={() => {
                              setId(val.id);
                              setDeleteLanguage(true);
                            }}
                          >
                            <Trash
                              color="#003049"
                              weight="bold"
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <div className="d-flex justify-content-center align-middle text-center">
                        No Data
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="p-3 mb-5 rounded-2xl"
          style={{ boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.25)" }}
        >
          <div className="mt-4 mb-3 d-flex justify-content-between">
            <div className="row">
              <h3 style={{ fontSize: "20px", fontWeight: "600" }}>License</h3>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "400",
                  color: "#737373",
                }}
              >
                List of employee educations
              </span>
            </div>
            <button
              style={{
                borderRadius: "10px",
                color: "white",
                fontSize: "14px",
                fontWeight: "500",
              }}
              className="bg-[#0E5073] btn d-flex align-items-center align-middle"
              onClick={() => setModalAddLisence(true)}
              type=""
            >
              <Plus className="me-2" size={20} weight="bold" />
              Add
            </button>
          </div>
          <hr style={{ backgroundColor: "#CACACA" }} className=""></hr>
          <div className="w-100">
            <table
              className="table mt-4 table-borderless"
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
                  <th className="align-middle " onClick={() => {}}>
                    License Type <ImportExport fontSize="2px" />
                  </th>
                  <th className="align-middle " onClick={() => {}}>
                    Issued Date <ImportExport fontSize="2px" />
                  </th>
                  <th className="align-middle " onClick={() => {}}>
                    ExpiryDate <ImportExport fontSize="2px" />
                  </th>
                  <th className="align-middle " onClick={() => {}}>
                    Action <ImportExport fontSize="2px" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {license ? (
                  license.map((val, index) => (
                    <tr style={{ fontSize: "14px" }}>
                      <td className="align-middle">{val.licenseType}</td>
                      <td className="align-middle">{val.issuedDate}</td>
                      <td className="align-middle">{val.expiryDate}</td>
                      <td className="align-middle">
                        <div className="flex flex-row gap-2">
                          <button
                            className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                            onClick={() => {
                              setidLicense(val.id);
                              setEditLicenseType(val.licenseType);
                              setEditIssuedDate(val.issuedDate);
                              setEditExpiryDate(val.expiryDate);
                              setEditLicenseNumber(val.licenseNumber);
                              setModalEditLisence(true);
                            }}
                          >
                            <PencilSimple
                              color="#003049"
                              className="h-5 w-5"
                              weight="bold"
                              aria-hidden="true"
                            />
                          </button>
                          <button
                            className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                            onClick={() => {
                              setId(val.id);
                              setDeleteLicense(true);
                            }}
                          >
                            <Trash
                              color="#003049"
                              weight="bold"
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>
                      <div className="d-flex justify-content-center align-middle text-center">
                        No Data
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        show={modalAddWExperience}
        size="lg"
        onHide={() => setModalAddWExperience(false)}
      >
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Add Work Experience
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Comany Name <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Company name.."
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Job Title<span style={{ color: "#780000" }}>*</span>
              </label>
              <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                onChange={(e) => setJobTitle(e.target.value)}
              >
                <option className="py-3">Select</option>
                {datajobTitle.map((val, index) => (
                  <option key={index} value={val.id} className="py-3">
                    {val.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Start Date <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="date"
                placeholder="Username"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                End Date <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="date"
                placeholder="Username"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Comment
              </label>
              <textarea
                rows="4"
                className=" appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
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
            onClick={() => setModalAddWExperience(false)}
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
            className="px-4"
            onClick={postDataAddWorkExp}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={modalEditExperience}
        size="lg"
        onHide={() => setModalEditExperience(false)}
      >
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Work Experience
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Company Name <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Company name.."
                value={editCompanyName}
                onChange={(e) => setEditCompanyName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Job Title<span style={{ color: "#780000" }}>*</span>
              </label>
              <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                onChange={(e) => setEditJobTitleId(e.target.value)}
              >
                <option value={editJobTitleId} hidden className="py-3">
                  {editJobTitleName != null
                    ? editJobTitleName
                    : "Select Job Title"}
                </option>
                {datajobTitle.map((val, index) => (
                  <option key={index} value={val.id} className="py-3">
                    {val.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Start Date <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="date"
                placeholder="Username"
                value={editStartDate}
                onChange={(e) => setEditStartDate(e.target.value)}
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                End Date <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="date"
                placeholder="Username"
                value={editEndDate}
                onChange={(e) => setEditEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Comment
              </label>
              <textarea
                rows="4"
                className=" appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
              ></textarea>
            </div>
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
            onClick={() => setModalEditExperience(false)}
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
            className="px-4"
            onClick={postDataEditWorkExp}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={modalAddSkill}
        size="lg"
        onHide={() => setModalAddSkill(false)}
      >
        <Modal.Header
          closeButton
          className="mx-4 mt-4" 
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Add Skill
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Skill <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="text"
                placeholder="Skill Name"
                onChange={(e) => setSkillId(e.target.value)}
              />
              {/* <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                onChange={(e) => setSkillId(e.target.value)}
              >
                <option hidden className="py-3">
                  Select Skill
                </option>
                {dataSkill.map((val, index) => (
                  <option value={val.id} key={index} className="py-3">
                    {val.name}
                  </option>
                ))}
              </select> */}
              {/* Graphic Designer */}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Year of Experience
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Year of Experience"
                onChange={(e) => setYearsOfExperience(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Comment
              </label>
              <textarea
                rows="4"
                className=" appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                onChange={(e) => setCommentSkill(e.target.value)}
              ></textarea>
            </div>
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
            onClick={() => setModalAddSkill(false)}
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
            className="px-4"
            onClick={postDataSkill}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={modalEditSkill}
        size="lg"
        onHide={() => setModalEditSkill(false)}
      >
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Skill
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Skill <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="text"
                placeholder="Skill Name"
                value={editSkillId}
                onChange={(e) => setEditSkillId(e.target.value)}
              />
              {/* <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                value={editSkillId}
                onChange={(e) => setEditSkillId(e.target.value)}
              >
                <option hidden value={editSkillId} className="py-3">
                  {editSkillName != null ? editSkillName : "Select SKill"}
                </option>
                {dataSkill.map((val, index) => (
                  <option value={val.id} key={index} className="py-3">
                    {val.name}
                  </option>
                ))}
              </select> */}
              {/* Graphic Designer */}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Year of Experience
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Year of Experience"
                value={editYearsOfExperience}
                onChange={(e) => setEditYearsOfExperience(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Comment
              </label>
              <textarea
                rows="4"
                className=" appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                value={editCommentSkill}
                onChange={(e) => setEditCommentSkill(e.target.value)}
              ></textarea>
            </div>
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
            onClick={() => setModalEditSkill(false)}
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
            className="px-4"
            onClick={postDataEditSkill}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={modalAddEducation}
        size="lg"
        onHide={() => setModalAddEducation(false)}
      >
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Add Educations
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Level <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="text"
                placeholder="Level"
                onChange={(e) => setLevel(e.target.value)}
              />
              {/* <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                onChange={(e) => setLevel(e.target.value)}
              >
                <option hidden className="py-3">
                  Select
                </option>
                {dataLevel &&
                  dataLevel.map((val, index) => (
                    <option key={index} value={val.name} className="py-3">
                      {val.name}
                    </option>
                  ))}
              </select> */}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Institute
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Institute name..."
                onChange={(e) => setInstitute(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Major/Specialization
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Specialization in Education...."
                onChange={(e) => setMajor(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Year <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Type for hints..."
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div className="col mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                GPA <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                onChange={(e) => setGpa(e.target.value)}
              />
            </div>
            <div className="w-100"></div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Start Date <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="date"
                placeholder="Username"
                onChange={(e) => setStartDateEdu(e.target.value)}
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                End Date <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="date"
                placeholder="Username"
                onChange={(e) => setEndDateEdu(e.target.value)}
              />
            </div>
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
            onClick={() => setModalAddEducation(false)}
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
            className="px-4"
            onClick={postDataEducation}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={modalEditEducation}
        size="lg"
        onHide={() => setModalEditEducation(false)}
      >
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Educations
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Level <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="text"
                value={editLevel}
                placeholder="Level"
                onChange={(e) => setEditLevel(e.target.value)}
              />
              {/* <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                onChange={(e) => setEditLevel(e.target.value)}
              >
                <option hidden value={editLevel} className="py-3">
                  {editLevel != null ? editLevel : "Select Level"}
                </option>
                {dataLevel &&
                  dataLevel.map((val, index) => (
                    <option key={index} value={val.name} className="py-3">
                      {val.name}
                    </option>
                  ))}
              </select> */}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Institute
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Institute name..."
                value={editInstitute}
                onChange={(e) => setEditInstitute(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Major/Specialization
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Specialization in Education...."
                value={editMajor}
                onChange={(e) => setEditMajor(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Year <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Type for hints..."
                value={editYear}
                onChange={(e) => setEditYear(e.target.value)}
              />
            </div>
            <div className="col mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                GPA <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                value={editGpa}
                onChange={(e) => setEditGpa(e.target.value)}
              />
            </div>
            <div className="w-100"></div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Start Date <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="date"
                placeholder="Username"
                value={editStartDateEdu}
                onChange={(e) => setEditStartDateEdu(e.target.value)}
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                End Date <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="date"
                placeholder="Username"
                value={editEndDateEdu}
                onChange={(e) => setEditEndDateEdu(e.target.value)}
              />
            </div>
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
            onClick={() => setModalEditEducation(false)}
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
            className="px-4"
            onClick={postDataEditEducation}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={modalAddLanguage}
        size="lg"
        onHide={() => setModalAddLanguage(false)}
      >
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Add Language
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Language <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="text"
                placeholder="Language"
                onChange={(e) => setLanguageId(e.target.value)}
              />
              {/* <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                onChange={(e) => setLanguageId(e.target.value)}
              >
                <option hidden className="py-3">
                  Select Language
                </option>
                {dataLanguage.map((val, index) => (
                  <option value={val.id} key={index} className="py-3">
                    {val.name}
                  </option>
                ))}
              </select> */}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Fluency <span style={{ color: "#780000" }}>*</span>
              </label>
              <Select
                isMulti
                name="Fluency"
                options={fluencyOptions}
                className="basic-multi-select"
                classNamePrefix="select Fluency"
                onChange={handleChangeFluency}
              />
              {/* <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                onChange={(e) => setFluency(e.target.value)}
              >
                <option hidden className="py-3">
                  Select Fluency
                </option>
                <option value="Writting" className="py-3">
                  Writting
                </option>
                <option value="Speaking" className="py-3">
                  Speaking
                </option>
                <option value="Reading" className="py-3">
                  Reading
                </option>
              </select> */}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Competency <span style={{ color: "#780000" }}>*</span>
              </label>
              <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                onChange={(e) => setCompetency(e.target.value)}
              >
                <option hidden className="py-3">
                  Select Competency
                </option>
                <option value="Poor" className="py-3">
                  Poor
                </option>
                <option value="Basic" className="py-3">
                  Basic
                </option>
                <option value="Good" className="py-3">
                  Good
                </option>
                <option value="Mother Tongue" className="py-3">
                  Mother Tongue
                </option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Comment
              </label>
              <textarea
                rows="4"
                className=" appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                onChange={(e) => setCommentLanguage(e.target.value)}
              ></textarea>
            </div>
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
            onClick={() => setModalAddLanguage(false)}
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
            className="px-4"
            onClick={postDataLanguage}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={modalEditLanguage}
        size="lg"
        onHide={() => setModalEditLanguage(false)}
      >
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Language
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Language <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="text"
                value={editLanguageId}
                placeholder="Language"
                onChange={(e) => setEditLanguageId(e.target.value)}
              />
              {/* <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                onChange={(e) => setEditLanguageId(e.target.value)}
              >
                <option value={editLanguageId} hidden className="py-3">
                  {editLanguageName != null
                    ? editLanguageName
                    : "Select Language"}
                </option>
                {dataLanguage.map((val, index) => (
                  <option value={val.id} key={index} className="py-3">
                    {val.name}
                  </option>
                ))}
              </select> */}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Fluency <span style={{ color: "#780000" }}>*</span>
              </label>
              <Select
                isMulti
                name="Fluency"
                value={fluencyOptions.filter(obj=>editFluency.includes(obj.value))}
                options={fluencyOptions}
                className="basic-multi-select"
                classNamePrefix="select Fluency"
                onChange={handleChangeEditFluency}
              />
              {/* <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                onChange={(e) => setEditFluency(e.target.value)}
              >
                <option hidden className="py-3">
                  {editFluency != null ? editFluency : "Select Fluency"}
                </option>
                <option value="Writting" className="py-3">
                  Writting
                </option>
                <option value="Speaking" className="py-3">
                  Speaking
                </option>
                <option value="Reading" className="py-3">
                  Reading
                </option>
              </select> */}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Competency <span style={{ color: "#780000" }}>*</span>
              </label>
              <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                onChange={(e) => setEditCompetency(e.target.value)}
              >
                <option hidden className="py-3">
                  {editCompetency != null
                    ? editCompetency
                    : "Select Relationship"}
                </option>
                <option value="Poor" className="py-3">
                  Poor
                </option>
                <option value="Basic" className="py-3">
                  Basic
                </option>
                <option value="Good" className="py-3">
                  Good
                </option>
                <option value="Mother Tongue" className="py-3">
                  Mother Tongue
                </option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Comment
              </label>
              <textarea
                rows="4"
                className=" appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                value={editCommentLanguage}
                onChange={(e) => setEditCommentLanguage(e.target.value)}
              ></textarea>
            </div>
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
            onClick={() => setModalEditLanguage(false)}
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
            className="px-4"
            onClick={postDataEditLanguage}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={modalAddLisence}
        size="lg"
        onHide={() => setModalAddLisence(false)}
      >
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Add Lisence
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                License Type <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="text"
                placeholder="Lisence"
                onChange={(e) => setLicenseType(e.target.value)}
              />
              {/* <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                onChange={(e) => setLicenseType(e.target.value)}
              >
                <option hidden className="py-3">
                  Select
                </option>
                {dataLisensi &&
                  dataLisensi.map((val, index) => (
                    <option key={index} value={val.name} className="py-3">
                      {val.name}
                    </option>
                  ))}
              </select> */}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                License Number <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Institute License Number..."
                onChange={(e) => setLicenseNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Issued Date <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="date"
                onChange={(e) => setIssuedDate(e.target.value)}
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Expiry Date <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="date"
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
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
            onClick={() => setModalAddLisence(false)}
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
            className="px-4"
            onClick={postDataLicense}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={modalEditLisence}
        size="lg"
        onHide={() => setModalEditLisence(false)}
      >
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Lisence
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                License Type <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="text"
                value={editLicenseType} 
                placeholder="Lisence"
                onChange={(e) => setEditLicenseType(e.target.value)}
              />
              {/* <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                onChange={(e) => setEditLicenseType(e.target.value)}
              >
                <option hidden value={editLicenseType} className="py-3">
                  {editLicenseType != null
                    ? editLicenseType
                    : "Select Relationship"}
                </option>
                {dataLisensi &&
                  dataLisensi.map((val, index) => (
                    <option key={index} value={val.name} className="py-3">
                      {val.name}
                    </option>
                  ))}
              </select> */}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                License Number <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Institute License Number..."
                value={editLicenseNumber}
                onChange={(e) => setEditLicenseNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Issued Date <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="date"
                value={editIssuedDate}
                onChange={(e) => setEditIssuedDate(e.target.value)}
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Expiry Date <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="date"
                value={editExpiryDate}
                onChange={(e) => setEditExpiryDate(e.target.value)}
              />
            </div>
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
            onClick={() => setModalEditLisence(false)}
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
            className="px-4"
            onClick={postDataEditLicense}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ModalDelete
        close={() => {
          setDeleteWork(false);
        }}
        submit={() => {
          deleteWorkExperience(id);
          inAwait();
          setDeleteWork(false);
        }}
        active={isdeleteWork}
      />
      <ModalDelete
        close={() => {
          setDeleteSkill(false);
        }}
        submit={() => {
          deleteSkill(id);
          inAwait();
          setDeleteSkill(false);
        }}
        active={isdeleteSkill}
      />
      <ModalDelete
        close={() => {
          setDeleteEdu(false);
        }}
        submit={() => {
          deleteEducation(id);
          inAwait();
          setDeleteEdu(false);
        }}
        active={isdeleteEdu}
      />
      <ModalDelete
        close={() => {
          setDeleteLanguage(false);
        }}
        submit={() => {
          deleteLanguage(id);
          inAwait();
          setDeleteLanguage(false);
        }}
        active={isdeleteLanguage}
      />
      <ModalDelete
        close={() => {
          setDeleteLicense(false);
        }}
        submit={() => {
          deleteLicense(id);
          inAwait();
          setDeleteLicense(false);
        }}
        active={isdeleteLicense}
      />
    </>
  );
}
export default Qualification;
