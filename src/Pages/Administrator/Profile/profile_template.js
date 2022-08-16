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
import { useState } from "react";
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

import { Route, Routes, Outlet } from "react-router-dom";
import PersonalDetail from "./Components/personal_detail";
import ContactDetail from "./Components/contact_detail";
import EmergencyContact from "./Components/emergency_contact";
import Dependents from "./Components/dependents";

function ProfileTemplate() {
    const [index, setIndex] = useState(0);
    return(
        <>
            <div className="mb-5" style={{backgroundColor:'white',borderRadius:'15px'}}>
                <img style={{width:'100%'}} src="https://cdn.discordapp.com/attachments/990841636386897971/1008574993103331358/Rectangle_213.png" alt=""/>
                <div className="d-flex ps-5 pt-2 pb-5">
                    <div className="me-3">
                        <img style={{marginTop:'-40px'}} src="https://cdn.discordapp.com/attachments/990841636386897971/1008594420695830568/Ellipse_3123.png" alt=""/>
                    </div>
                    <div>
                        <h1 style={{fontSize:"20px",fontWeight:'600'}}>Vina Afrilia Kurniawan</h1>
                        <span style={{fontSize:"10px",fontWeight:'400',color:"#737373"}}>IT Development</span>
                    </div>
                </div>
            </div>
            <div className="" >
                <div className="d-flex flex-nowrap" style={{backgroundColor:'white',borderRadius:'15px'}}>
                    <aside
                    className="p-4 flex-shrink-0 w-3/12 z-10"
                    style={{
                        backgroundColor: "#FFFFFF",
                        borderTopLeftRadius: "15px",
                        borderBottomLeftRadius: "15px",
                        boxShadow:'2px 0px 20px rgba(0, 0, 0, 0.15)'
                    }}
                    >
                    <div className="">
                        <ListItemButton
                        style={{ 
                            borderRadius: "7px",
                            backgroundColor: index == 0 ? "#EFF9FF" : 'white',
                            borderRight: index == 0 ? '7px solid #219EBC' : 'none',
                            color: index == 0 ? "#454545" :  "#00000080",
                        }}
                        className="mt-2"
                        onClick={() => setIndex(0)}
                        >
                        <ListItemText primary={<Typography style={{ fontSize:'14px',fontWeight:'600' }}>Personal Detail</Typography>} />
                        </ListItemButton>
                        <ListItemButton
                        style={{ 
                            borderRadius: "7px",
                            backgroundColor: index == 1 ? "#EFF9FF" : 'white',
                            borderRight: index == 1 ? '7px solid #219EBC' : 'none',
                            color: index == 1 ? "#454545" :  "#00000080",
                        }}
                        className="mt-2"
                        onClick={() => setIndex(1)}
                        >
                        <ListItemText primary={<Typography style={{ fontSize:'14px',fontWeight:'600' }}>Contact Detail</Typography>} />
                        </ListItemButton>
                        <ListItemButton
                        style={{ 
                            borderRadius: "7px",
                            backgroundColor: index == 2 ? "#EFF9FF" : 'white',
                            borderRight: index == 2 ? '7px solid #219EBC' : 'none',
                            color: index == 2 ? "#454545" :  "#00000080",
                        }}
                        className="mt-2"
                        onClick={() => setIndex(2)}
                        >
                        <ListItemText primary={<Typography style={{ fontSize:'14px',fontWeight:'600' }}>Emergency Contact</Typography>} />
                        </ListItemButton>
                        <ListItemButton
                        style={{ 
                            borderRadius: "7px",
                            backgroundColor: index == 3 ? "#EFF9FF" : 'white',
                            borderRight: index == 3 ? '7px solid #219EBC' : 'none',
                            color: index == 3 ? "#454545" :  "#00000080",
                        }}
                        className="mt-2"
                        onClick={() => setIndex(3)}
                        >
                        <ListItemText primary={<Typography style={{ fontSize:'14px',fontWeight:'600' }}>Depedents</Typography>} />
                        </ListItemButton>
                        <ListItemButton
                        style={{ 
                            borderRadius: "7px",
                            backgroundColor: index == 4 ? "#EFF9FF" : 'white',
                            borderRight: index == 4 ? '7px solid #219EBC' : 'none',
                            color: index == 4 ? "#454545" :  "#00000080",
                        }}
                        className="mt-2"
                        onClick={() => setIndex(4)}
                        >
                        <ListItemText primary={<Typography style={{ fontSize:'14px',fontWeight:'600' }}>Imigration</Typography>} />
                        </ListItemButton>
                        <ListItemButton
                        style={{ 
                            borderRadius: "7px",
                            backgroundColor: index == 5 ? "#EFF9FF" : 'white',
                            borderRight: index == 5 ? '7px solid #219EBC' : 'none',
                            color: index == 5 ? "#454545" :  "#00000080",
                        }}
                        className="mt-2"
                        onClick={() => setIndex(5)}
                        >
                        <ListItemText primary={<Typography style={{ fontSize:'14px',fontWeight:'600' }}>Job</Typography>} />
                        </ListItemButton>
                        <ListItemButton
                        style={{ 
                            borderRadius: "7px",
                            backgroundColor: index == 6 ? "#EFF9FF" : 'white',
                            borderRight: index == 6 ? '7px solid #219EBC' : 'none',
                            color: index == 6 ? "#454545" :  "#00000080",
                        }}
                        className="mt-2"
                        onClick={() => setIndex(6)}
                        >
                        <ListItemText primary={<Typography style={{ fontSize:'14px',fontWeight:'600' }}>Report-to</Typography>} />
                        </ListItemButton>
                        <ListItemButton
                        style={{ 
                            borderRadius: "7px",
                            backgroundColor: index == 7 ? "#EFF9FF" : 'white',
                            borderRight: index == 7 ? '7px solid #219EBC' : 'none',
                            color: index == 7 ? "#454545" :  "#00000080",
                        }}
                        className="mt-2"
                        onClick={() => setIndex(7)}
                        >
                        <ListItemText primary={<Typography style={{ fontSize:'14px',fontWeight:'600' }}>Qualification</Typography>} />
                        </ListItemButton>
                    </div>
                    </aside>
                    <div className="ml-auto w-9/12 p-5 space-y-5">
                        {index == 0 ? <PersonalDetail /> : index == 1 ? <ContactDetail /> : index == 2 ? <EmergencyContact /> : index == 3 ? <Dependents /> : index == 4 ? <ContactDetail /> : index == 5 ? <ContactDetail /> : index == 6 ? <ContactDetail /> : index == 7 ? <ContactDetail /> :""}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileTemplate;