import {
  faArrowsUpDown,
  faArrowsUpDownLeftRight,
  faArrowsUpToLine,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Add,
  AlignVerticalCenter,
  ArrowUpwardTwoTone,
  Delete,
  DeleteOutline,
  EditOutlined,
  Filter,
  Filter1,
  FilterCenterFocus,
  FilterList,
  ImportExport,
  Search,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Tab,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Tabs,
  Nav,
} from "react-bootstrap";
import {
  AddJobTittle,
  delJobTittle,
  EditJobTittle,
  GetJobGrade,
  GetJobLevel,
  GetJobPosition,
  GetJobTittle,
} from "../../../../Repository/AdminRepository";
import { ModalDelete, SwalSuccess } from "../../../../Components/Modals";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import JobGrade from "./JobManagement/JobGrade";
import JobTitle from "./JobManagement/JobTitle";
import JobPosition from "./JobManagement/JobPosition";
import JobLevel from "./JobManagement/JobLevel";
import { Eye, FileArrowUp } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

function JobManagement() {
  const [jobgrade, setJobGrade] = useState([]);
  const [jobtitle, setJobTitle] = useState([]);
  const [joblevel, setJobLevel] = useState([]);
  const [jobposition, setJobPosition] = useState([]);
  const [editValues, setEditValues] = useState();
  const inAwait = async () => {
    var recs = await GetJobGrade();
    setJobGrade(recs);
    var rex = await GetJobLevel();
    setJobLevel(rex);
    var rec = await GetJobTittle();
    setJobTitle(rec);
    var rem = await GetJobPosition();
    setJobPosition(rem["result"]);
  };
  useEffect(() => {
    inAwait();
  }, []);
  var spesificationRef = useRef();
  const [isdelete, setDelete] = useState(false);
  const [id, setId] = useState();
  const [spesification, setSpesification] = useState();
  const [dialogTitle, setTitle] = useState(false);
  const [dialogEditTitle, setEditTitle] = useState(false);
  const [isCheckedAll, setCheckedAll] = useState(false);
  const [isdelete2, setDelete2] = useState(false);
  const [key, setKey] = useState("home");
  const [value, setValue] = useState("1");
  const navigate = useNavigate();

  const exportExcel = async () => {
    if (jobgrade.length > 0) {
      var wb = XLSX.utils.book_new();

      var data = [];
      await jobgrade.map((app) => {
        data.push({
          "Job Grade": app.name,
          "Currency": app.type,
          "Minimum Salary": app.minsalary,
          "Maximum Salary": app.maxsalary,
        });
      });
      var datajlev = [];
      await joblevel.map((app) => {
        datajlev.push({
          "Level Name": app.name,
          "Job Grade": app?.jobgrade?.name,
        });
      });
      var datajtit = [];
      await jobtitle.map((app) => {
        datajtit.push({
          "Title Name": app.name,
          "Job Grade": app?.jobgrade?.name,
        });
      });
      var datajpos = [];
      await jobposition.map((app) => {
        datajpos.push({
          "Position Name": app.name,
          "Job Id": app.job_id,
          "Job Grade": app?.jobgrade?.name,
          "Relation Code": app.relation_code,
        });
      });

      var ws = XLSX.utils.json_to_sheet(data);
      var wa = XLSX.utils.json_to_sheet(datajlev);
      var wd = XLSX.utils.json_to_sheet(datajtit);
      var wc = XLSX.utils.json_to_sheet(datajpos);

      XLSX.utils.book_append_sheet(wb, ws, "Job_Grade");
      XLSX.utils.book_append_sheet(wb, wa, "Job_Level");
      XLSX.utils.book_append_sheet(wb, wd, "Job_Title");
      XLSX.utils.book_append_sheet(wb, wc, "Job_Position");

      XLSX.writeFile(wb, "Job Management.xlsx");
      console.log("Exported excel!");
    } else {
      alert("Data masih kosong");
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="p-4 d-flex justify-content-between">
        <div className="">
          <h5>
            <b>Job Management</b>
          </h5>
          <p>
            <small>list of job management </small>
          </p>
        </div>
        <div className="flex justify-evenly">

          <button
            style={{
              borderRadius: "10px",
              border: "1.5px solid #A9A9A9",
              color: "#003049",
              fontSize: "14px",
              fontWeight: "600",
              backgroundColor: "#F9F9F9",
            }}
            className="me-3 btn d-flex align-items-center"
            onClick={() => {
              exportExcel();
            }}
            type=""
          >
            <svg
              className="me-2"
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.69 10.715C13.652 10.6241 13.5987 10.5404 13.5325 10.4675L11.2825 8.2175C11.1413 8.07627 10.9497 7.99693 10.75 7.99693C10.5503 7.99693 10.3587 8.07627 10.2175 8.2175C10.0763 8.35873 9.99693 8.55027 9.99693 8.75C9.99693 8.94973 10.0763 9.14127 10.2175 9.2825L11.1925 10.25H7C6.80109 10.25 6.61032 10.329 6.46967 10.4697C6.32902 10.6103 6.25 10.8011 6.25 11C6.25 11.1989 6.32902 11.3897 6.46967 11.5303C6.61032 11.671 6.80109 11.75 7 11.75H11.1925L10.2175 12.7175C10.1472 12.7872 10.0914 12.8702 10.0533 12.9616C10.0153 13.053 9.99565 13.151 9.99565 13.25C9.99565 13.349 10.0153 13.447 10.0533 13.5384C10.0914 13.6298 10.1472 13.7128 10.2175 13.7825C10.2872 13.8528 10.3702 13.9086 10.4616 13.9467C10.553 13.9847 10.651 14.0043 10.75 14.0043C10.849 14.0043 10.947 13.9847 11.0384 13.9467C11.1298 13.9086 11.2128 13.8528 11.2825 13.7825L13.5325 11.5325C13.602 11.4621 13.6556 11.3777 13.69 11.285C13.765 11.1024 13.765 10.8976 13.69 10.715ZM8.5 14H2.5C2.30109 14 2.11032 13.921 1.96967 13.7803C1.82902 13.6397 1.75 13.4489 1.75 13.25V2.75C1.75 2.55109 1.82902 2.36032 1.96967 2.21967C2.11032 2.07902 2.30109 2 2.5 2H6.25V4.25C6.25 4.84674 6.48705 5.41903 6.90901 5.84099C7.33097 6.26295 7.90326 6.5 8.5 6.5H11.5C11.6481 6.49926 11.7926 6.45471 11.9154 6.37196C12.0382 6.28921 12.1337 6.17196 12.19 6.035C12.2474 5.89842 12.2631 5.74788 12.2351 5.60239C12.2071 5.4569 12.1366 5.32297 12.0325 5.2175L7.5325 0.7175C7.4705 0.659162 7.39962 0.611061 7.3225 0.575H7.255L7.045 0.5H2.5C1.90326 0.5 1.33097 0.737053 0.90901 1.15901C0.487053 1.58097 0.25 2.15326 0.25 2.75V13.25C0.25 13.8467 0.487053 14.419 0.90901 14.841C1.33097 15.2629 1.90326 15.5 2.5 15.5H8.5C8.69891 15.5 8.88968 15.421 9.03033 15.2803C9.17098 15.1397 9.25 14.9489 9.25 14.75C9.25 14.5511 9.17098 14.3603 9.03033 14.2197C8.88968 14.079 8.69891 14 8.5 14ZM7.75 3.0575L9.6925 5H8.5C8.30109 5 8.11032 4.92098 7.96967 4.78033C7.82902 4.63968 7.75 4.44891 7.75 4.25V3.0575Z"
                    fill="#003049"
                  />
                </svg>
                <span>Export</span>
          </button>
          <button
            style={{
              borderRadius: "10px",
              border: "1.5px solid #A9A9A9",
              color: "#003049",
              fontSize: "14px",
              fontWeight: "600",
              backgroundColor: "#F9F9F9",
            }}
            className="me-3 btn d-flex align-items-center"
            onClick={() => {
              navigate("/admin/job/jobManagement/bulkUploud");
            }}
            type=""
          >
            <FileArrowUp
              className="me-2"
              color="#003049"
              size={16}
              weight="fill"
            />
            Bulk Upload
          </button>
        </div>
      </div>
      <div
        className="w-100 p-4"
        style={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              textColor="inherit"
              TabIndicatorProps={{
                style: {
                  color: "#C1121F",
                  backgroundColor: "#C1121F",
                },
              }}
            >
              <Tab style={{ minWidth: "200px" }} label="Job Grade" value="1" />
              <Tab style={{ minWidth: "200px" }} label="Job Level" value="2" />
              {/* <Tab style={{ minWidth: "200px" }} label="Job Title" value="3" /> */}
              <Tab
                style={{ minWidth: "200px" }}
                label="Job Position"
                value="4"
              />
            </TabList>
          </Box>
          <TabPanel className="py-5 px-0" value="1">
            <JobGrade />
          </TabPanel>
          <TabPanel className="py-5 px-0" value="2">
            <JobLevel />
          </TabPanel>
          <TabPanel className="py-5 px-0" value="3">
            <JobTitle />
          </TabPanel>
          <TabPanel className="py-5 px-0" value="4">
            <JobPosition />
          </TabPanel>
        </TabContext>
        {/* <Tab.Container id="left-tabs-example" defaultActiveKey="first" eventKey="home" title="Job Grade">
            <Nav className="flex">
              <Nav.Item>
                <Nav.Link eventKey="first">Tab 1</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Tab 2</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="first">
              <div>tes1</div>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
              <div>tes2</div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container> */}
      </div>
    </>
  );
}

export default JobManagement;
