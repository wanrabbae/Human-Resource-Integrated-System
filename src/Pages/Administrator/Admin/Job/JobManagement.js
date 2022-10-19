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
  GetJobTittle,
} from "../../../../Repository/AdminRepository";
import { ModalDelete, SwalSuccess } from "../../../../Components/Modals";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import JobGrade from "./JobManagement/JobGrade";
import JobTitle from "./JobManagement/JobTitle";
import JobPosition from "./JobManagement/JobPosition";
import JobLevel from "./JobManagement/JobLevel";
import { Eye, FileArrowUp } from "phosphor-react";

function JobManagement() {
  const [jobtitle, setJobTitle] = useState([]);
  const [editValues, setEditValues] = useState();
  const inAwait = async () => {
    var rec = await GetJobTittle();
    setJobTitle(rec);
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
  const [key, setKey] = useState('home');
  const [value, setValue] = useState('1');

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
      <button
            style={{
              borderRadius: "10px",
              border: "1.5px solid #A9A9A9",
              color: "#003049",
              fontSize: "14px",
              fontWeight: "600",
              backgroundColor:'#F9F9F9'
            }}
            className="me-3 btn d-flex align-items-center"
            onClick={() => {
              window.location.href = "/admin/job/jobManagement/bulkUploud";
            }}
            type=""
          >
            <FileArrowUp className="me-2" color="#003049" size={16} weight="fill" />
            Bulk Upload
          </button>
    </div>
      <div
        className="w-100 p-4"
        style={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
      >
        <TabContext value={value} >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} 
              textColor="inherit"
              TabIndicatorProps={{
                style:{
                  color:"#C1121F",
                  backgroundColor:"#C1121F"
                  }
                }}>
              <Tab style={{minWidth:'200px'}} label="Job Grade" value="1" />
              <Tab style={{minWidth:'200px'}} label="Job Level" value="2"/>
              <Tab style={{minWidth:'200px'}} label="Job Title" value="3"/>
              <Tab style={{minWidth:'200px'}} label="Job Position" value="4"/>
            </TabList>
          </Box>
          <TabPanel className="py-5 px-0" value="1">
            <JobGrade/>
          </TabPanel>
          <TabPanel className="py-5 px-0"  value="2">
            <JobLevel/>
          </TabPanel>
          <TabPanel className="py-5 px-0" value="3">
            <JobTitle/>
          </TabPanel>
          <TabPanel className="py-5 px-0" value="4">
            <JobPosition/>
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
