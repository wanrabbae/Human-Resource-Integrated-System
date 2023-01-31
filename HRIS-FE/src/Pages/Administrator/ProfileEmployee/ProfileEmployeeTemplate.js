import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AccountCircleRounded,
  ChevronRight,
  DocumentScanner,
  Drafts,
  ExpandLess,
  MailOutline,
  ManageAccounts,
  NotificationImportant,
  Notifications,
  NotificationsActive,
  Padding,
  PeopleRounded,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  faCaretRight,
  faClock,
  faClockFour,
  faCoffee,
  faFileArchive,
  faFileLines,
  faPerson,
  faSearch,
  faTools,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import { Route, Routes, Outlet, useLocation } from "react-router-dom";
import PersonalDetail from "./Components/personal_detail";
import ContactDetail from "./Components/contact_detail";
import EmergencyContact from "./Components/emergency_contact";
import Dependents from "./Components/dependents";
import Imigration from "./Components/imigration";
import Job from "./Components/job";
import ReportTo from "./Components/report";
import Qualification from "./Components/qualification";
import profile from "../../../Resourse/img/default-profile.png";
import { getProfile } from "../../../Repository/ProfileEmployeeRepository";
import Payroll from "./Components/payroll";
import { updateProfilePicture } from "../../../Repository/ProfileRepository";
import { SwalSuccess } from "../../../Components/Modals";

function ProfileEmployeeTemplate() {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const location = useLocation();
  const idEmployee = location.state.id;
  // console.log("id Employee "+idEmployee)

  const inAwait = async () => {
    var data = await getProfile(idEmployee);
    setData(data.result)
  };
  useEffect(() => {
    inAwait();
  }, []);

  return (
    <>
      <div
        className="mb-5"
        style={{ backgroundColor: "white", borderRadius: "15px" }}
      >
        <img
          style={{ width: "100%" }}
          src="https://cdn.discordapp.com/attachments/990841636386897971/1008574993103331358/Rectangle_213.png"
          alt=""
        />
        <div className="d-flex ps-5 pt-2 pb-4">
          <div className="me-3">
          <label className="cursor-pointer" for="prf">
              <input
                id="prf"
                accept="image/*"
                type="file"
                className="hidden"
                onChange={async(e) => {
                  var formData = new FormData();
                  formData.append("photo", e.currentTarget.files[0])
                  formData.append("id", idEmployee)
                  console.log([...formData])
                  var res = await updateProfilePicture(formData);
                  console.log(res);
                  SwalSuccess({ message: "Success Update Profile Picture" });
                  inAwait();
                  }
                }
              />
              <img
                // crossOrigin="anonymous"
                for="prf"
                style={{
                  marginTop: "-40px",
                  backgroundColor: "white",
                  borderRadius: "100%",
                  maxWidth: "120px"
                }}
                src={ 
                  data.image ?
                    data.image == "http://dev.humanusia.id/assets/employee/null" ? "https://cdn.discordapp.com/attachments/990841636386897971/1056795799570366464/Group_1000005990.png"
                    : data.image
                  : "https://cdn.discordapp.com/attachments/990841636386897971/1056795799570366464/Group_1000005990.png"
                }
                alt=""
              />
            </label>
          </div>
          <div>
            <h1 style={{ fontSize: "20px", fontWeight: "600" }}>
              {data?.firstName}
            </h1>
            <span
              style={{ fontSize: "10px", fontWeight: "400", color: "#737373" }}
            >
              {data?.jobposition ? data?.jobposition.name : ''}
            </span>
          </div>
        </div>
      </div>
      <div className="">
        <div
          className="d-flex flex-nowrap"
          style={{ backgroundColor: "white", borderRadius: "15px" }}
        >
          <aside
            className="p-4 flex-shrink-0 w-3/12 z-0"
            style={{
              backgroundColor: "#FFFFFF",
              borderTopLeftRadius: "15px",
              borderBottomLeftRadius: "15px",
              boxShadow: "2px 0px 20px rgba(0, 0, 0, 0.15)",
            }}
          >
            <div className="">
              <ListItemButton
                style={{
                  borderRadius: "7px",
                  backgroundColor: index == 0 ? "#EFF9FF" : "white",
                  borderRight: index == 0 ? "7px solid #219EBC" : "none",
                  color: index == 0 ? "#454545" : "#00000080",
                }}
                className="mt-2"
                onClick={() => setIndex(0)}
              >
                <ListItemText
                  primary={
                    <Typography style={{ fontSize: "14px", fontWeight: "600" }}>
                      Personal Detail
                    </Typography>
                  }
                />
              </ListItemButton>
              <ListItemButton
                style={{
                  borderRadius: "7px",
                  backgroundColor: index == 1 ? "#EFF9FF" : "white",
                  borderRight: index == 1 ? "7px solid #219EBC" : "none",
                  color: index == 1 ? "#454545" : "#00000080",
                }}
                className="mt-2"
                onClick={() => setIndex(1)}
              >
                <ListItemText
                  primary={
                    <Typography style={{ fontSize: "14px", fontWeight: "600" }}>
                      Contact Detail
                    </Typography>
                  }
                />
              </ListItemButton>
              <ListItemButton
                style={{
                  borderRadius: "7px",
                  backgroundColor: index == 2 ? "#EFF9FF" : "white",
                  borderRight: index == 2 ? "7px solid #219EBC" : "none",
                  color: index == 2 ? "#454545" : "#00000080",
                }}
                className="mt-2"
                onClick={() => setIndex(2)}
              >
                <ListItemText
                  primary={
                    <Typography style={{ fontSize: "14px", fontWeight: "600" }}>
                      Emergency Contact
                    </Typography>
                  }
                />
              </ListItemButton>
              <ListItemButton
                style={{
                  borderRadius: "7px",
                  backgroundColor: index == 3 ? "#EFF9FF" : "white",
                  borderRight: index == 3 ? "7px solid #219EBC" : "none",
                  color: index == 3 ? "#454545" : "#00000080",
                }}
                className="mt-2"
                onClick={() => setIndex(3)}
              >
                <ListItemText
                  primary={
                    <Typography style={{ fontSize: "14px", fontWeight: "600" }}>
                      Depedents
                    </Typography>
                  }
                />
              </ListItemButton>
              <ListItemButton
                style={{
                  borderRadius: "7px",
                  backgroundColor: index == 4 ? "#EFF9FF" : "white",
                  borderRight: index == 4 ? "7px solid #219EBC" : "none",
                  color: index == 4 ? "#454545" : "#00000080",
                }}
                className="mt-2"
                onClick={() => setIndex(4)}
              >
                <ListItemText
                  primary={
                    <Typography style={{ fontSize: "14px", fontWeight: "600" }}>
                      Immigration
                    </Typography>
                  }
                />
              </ListItemButton>
              <ListItemButton
                style={{
                  borderRadius: "7px",
                  backgroundColor: index == 5 ? "#EFF9FF" : "white",
                  borderRight: index == 5 ? "7px solid #219EBC" : "none",
                  color: index == 5 ? "#454545" : "#00000080",
                }}
                className="mt-2"
                onClick={() => setIndex(5)}
              >
                <ListItemText
                  primary={
                    <Typography style={{ fontSize: "14px", fontWeight: "600" }}>
                      Job
                    </Typography>
                  }
                />
              </ListItemButton>
              <ListItemButton
                style={{
                  borderRadius: "7px",
                  backgroundColor: index == 6 ? "#EFF9FF" : "white",
                  borderRight: index == 6 ? "7px solid #219EBC" : "none",
                  color: index == 6 ? "#454545" : "#00000080",
                }}
                className="mt-2"
                onClick={() => setIndex(6)}
              >
                <ListItemText
                  primary={
                    <Typography style={{ fontSize: "14px", fontWeight: "600" }}>
                      Payroll
                    </Typography>
                  }
                />
              </ListItemButton>
              <ListItemButton
                style={{
                  borderRadius: "7px",
                  backgroundColor: index == 7 ? "#EFF9FF" : "white",
                  borderRight: index == 7 ? "7px solid #219EBC" : "none",
                  color: index == 7 ? "#454545" : "#00000080",
                }}
                className="mt-2"
                onClick={() => setIndex(7)}
              >
                <ListItemText
                  primary={
                    <Typography style={{ fontSize: "14px", fontWeight: "600" }}>
                      Report-to
                    </Typography>
                  }
                />
              </ListItemButton>
              <ListItemButton
                style={{
                  borderRadius: "7px",
                  backgroundColor: index == 8 ? "#EFF9FF" : "white",
                  borderRight: index == 8 ? "7px solid #219EBC" : "none",
                  color: index == 8 ? "#454545" : "#00000080",
                }}
                className="mt-2"
                onClick={() => setIndex(8)}
              >
                <ListItemText
                  primary={
                    <Typography style={{ fontSize: "14px", fontWeight: "600" }}>
                      Qualification
                    </Typography>
                  }
                />
              </ListItemButton>
            </div>
          </aside>
          <div className="ml-auto w-9/12 p-5 space-y-5">
            {index == 0 ? (
              <PersonalDetail data={data} />
            ) : index == 1 ? (
              <ContactDetail data={data} />
            ) : index == 2 ? (
              <EmergencyContact idEmployee={idEmployee} />
            ) : index == 3 ? (
              <Dependents idEmployee={idEmployee} />
            ) : index == 4 ? (
              <Imigration idEmployee={idEmployee} />
            ) : index == 5 ? (
              <Job idEmployee={idEmployee} />
            ) : index == 6 ? (
              <Payroll idEmployee={idEmployee} />
            ) : index == 7 ? (
              <ReportTo idEmployee={idEmployee} />
            ) : index == 8 ? (
              <Qualification idEmployee={idEmployee} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileEmployeeTemplate;
