import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import useSWR from "swr";
import "../../Resourse/style.css";
import logo from "../../Resourse/img/logo.png";
import logo2 from "../../Resourse/img/logo-h.png";
import ProfileDefault from "../../Resourse/img/logos.png";
import { MdEmail } from 'react-icons/md';
import { IoMdNotifications } from 'react-icons/io';

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
  Drawer,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
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
import { Dropdown, DropdownButton } from "react-bootstrap";
import { getNotif } from "../../Repository/RecruitmentRepository";
import { ModalSignOut } from "../../Components/Modals";
import moment from "moment/moment";

function Template() {
  const [isOpen, setOpen] = useState([false, false, false]);
  const [isHidden, setHidden] = useState(true);
  const [notif, setNotif] = useState(false);
  const [isRead, setRead] = useState(false);
  const [users, setUsers] = useState({});
  const [show, setShow] = useState(false);
  const [issignout, setSignOut] = useState(false);
  const [notification, setNotification] = useState([]);
  const navigate = useNavigate();

  // console.log(users)

  // const inAwait = async () => {
  //   var notifs = await getNotif();
  //   setNotification(notifs.result);
  //   notification.length > 0 ? setRead(false) : setRead(true);
  // };

  const { data } = useSWR("getNotif", getNotif);
  // setNotification(response.result);

  useEffect(() => {
    if (window.localStorage.getItem("users") == null) {
      window.location.href = "/";
    } else {
      var data = JSON.parse(window.localStorage.getItem("users"));
      setUsers(data);
      // inAwait();
    }
  }, []);

  const [list, setList] = useState([
    [
      {
        nama: "User Management",
        click: null,
        show: isHidden,
        body: [
          {
            nama: "Users",
            link: "/admin/userManagement/users",
          },
        ],
      },
      {
        nama: "Job",
        click: null,
        show: isHidden,
        body: [
          {
            nama: "Job Management",
            link: "/admin/job/jobManagement",
          },
          {
            nama: "Employee Status",
            link: "/admin/job/employeeStatus",
          },
          {
            nama: "Work Shift",
            link: "/admin/job/workShift",
          },
          // {
          //   nama: "Unit",
          //   link: "/admin/job/unit",
          // },
        ],
      },
      {
        nama: "Subsidairy",
        click: "/admin/subsidiary",
        show: isHidden,
        body: [],
      },
      {
        nama: "Organization",
        click: null,
        show: isHidden,
        body: [
          {
            nama: "General Information",
            link: "/admin/organization/generalInformation",
          },
          {
            nama: "Locations",
            link: "/admin/organization/locations",
          },
          {
            nama: "Structure",
            link: "/admin/organization/structureOrganization",
          },
          {
            nama: "Cost and Profit",
            link: "/admin/organization/costProfit",
          },
        ],
      },
      // {
      //   nama: "Qualifications",
      //   click: null,
      //   show: isHidden,
      //   body: [
      //     {
      //       nama: "Skills",
      //       link: "/admin/qualifications/skills",
      //     },
      //     {
      //       nama: "Education",
      //       link: "/admin/qualifications/educations",
      //     },
      //     {
      //       nama: "Licenses",
      //       link: "/admin/qualifications/license",
      //     },
      //     {
      //       nama: "languages",
      //       link: "/admin/qualifications/languages",
      //     },
      //     {
      //       nama: "Memberships",
      //       link: "/admin/qualifications/membership",
      //     },
      //   ],
      // },
      {
        nama: "Nationalities",
        click: "/admin/nationalities",
        show: isHidden,
        body: [],
      },
    ],
    [
      {
        nama: "Configuration",
        click: null,
        show: isHidden,
        body: [
          {
            nama: "Data Import",
            link: "/employee/data-import",
          },
          {
            nama: "Reporting Methods",
            link: "/employee/reporting-methods",
          },
          {
            nama: "Termination Reasons",
            link: "/employee/termination-reasons",
          },
        ],
      },
      {
        nama: "Employee List",
        click: "/employee/employee-list",
        show: isHidden,
        body: [],
      },
      {
        nama: "Employee Transfer",
        click: "/employee/employee-list",
        show: isHidden,
        body: [],
      },
      {
        nama: "Report",
        click: "/employee/report",
        show: isHidden,
        body: [],
      },
    ],
    users?.role && users?.role == "employee"
      ? [
          {
            nama: "Attendance",
            click: null,
            show: isHidden,
            body: [
              {
                nama: "My Attendance",
                link: "/timeManagement/attendance/myAttendance",
              },
            ],
          },
        ]
      : [
          {
            nama: "Attendance",
            click: null,
            show: isHidden,
            body: [
              {
                nama: "My Attendance",
                link: "/timeManagement/attendance/myAttendance",
              },
              {
                nama: "Employee Records",
                link: "/timeManagement/attendance/employeeRecord",
              },
            ],
          },
          {
            nama: "Time Off",
            click: "/timeManagement/time-off",
            show: isHidden,
            body: [],
          },
          {
            nama: "Schedule",
            click: "/timeManagement/schedule",
            show: isHidden,
            body: [],
          },
          {
            nama: "Calendar",
            click: "/timeManagement/calendar",
            show: isHidden,
            body: [],
          },
        ],
  ]);
  return (
    <div style={{ backgroundColor: "#E5F0F2", fontSize: "14px" }}>
      <div className="d-flex flex-nowrap">
        <aside
          className="d-print-none flex flex-col justify-between h-screen fixed pt-5 pb-2 w-1/5 top-0 left-0 right-0 z-10"
          style={{
            backgroundColor: "#FFFFFF",
            borderTopRightRadius: "20px",
            borderBottomRightRadius: "20px",
          }}
        >
          <Link to="/dashboard">
            <img src={logo} className="mx-10 pb-2" width={200} />
          </Link>

          <hr className="mx-3"></hr>
          <div className="h-full overflow-y-auto px-4">
            {users?.role == "admin" ||
            users?.role == "subsdiary" ||
            users?.role == "subadmin" ? (
              <ListItemButton
                style={{
                  borderRadius: "10px",
                  backgroundColor:
                    isOpen[0] == true ? "#C1121F20" : "transparent",
                  color: isOpen[0] == true ? "#780000" : "#00000080",
                }}
                className="mt-3"
                onClick={() =>
                  isOpen[0] == false
                    ? setOpen([true, false, false])
                    : setOpen([false, false, false])
                }
              >
                <ListItemIcon>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.1 1.2C6.38392 1.2 5.69716 1.48446 5.19081 1.99081C4.68447 2.49716 4.4 3.18392 4.4 3.9C4.4 4.61608 4.68447 5.30284 5.19081 5.80919C5.69716 6.31554 6.38392 6.6 7.1 6.6C7.81609 6.6 8.50284 6.31554 9.00919 5.80919C9.51554 5.30284 9.8 4.61608 9.8 3.9C9.8 3.18392 9.51554 2.49716 9.00919 1.99081C8.50284 1.48446 7.81609 1.2 7.1 1.2ZM3.2 3.9C3.2 2.86566 3.61089 1.87368 4.34229 1.14228C5.07368 0.410892 6.06566 0 7.1 0C8.13435 0 9.12633 0.410892 9.85772 1.14228C10.5891 1.87368 11 2.86566 11 3.9C11 4.93434 10.5891 5.92632 9.85772 6.65772C9.12633 7.38911 8.13435 7.8 7.1 7.8C6.06566 7.8 5.07368 7.38911 4.34229 6.65772C3.61089 5.92632 3.2 4.93434 3.2 3.9ZM12.2 14.3592C11.2808 15.372 9.7124 16.2 7.1 16.2C4.0844 16.2 2.4596 15.096 1.6184 13.8792C1.17539 13.2339 0.899162 12.4889 0.814403 11.7108C0.807232 11.641 0.80243 11.5709 0.800003 11.5008V11.4C0.800003 10.7635 1.05286 10.153 1.50295 9.70294C1.95303 9.25286 2.56348 9 3.2 9H11C11.6365 9 12.247 9.25286 12.6971 9.70294C13.1471 10.153 13.4 10.7635 13.4 11.4V11.5008C13.4 11.5128 13.4 11.5284 13.3976 11.5488C13.3951 11.6029 13.3911 11.6569 13.3856 11.7108L13.3844 11.73C13.0237 11.9419 12.7246 12.2444 12.5169 12.6075C12.3091 12.9706 12.1999 13.3817 12.2 13.8V14.3592ZM2 11.472V11.4924L2.0084 11.592C2.07342 12.1672 2.27863 12.7177 2.606 13.1952C3.1904 14.0412 4.4156 15 7.1 15C9.7844 15 11.0096 14.0412 11.594 13.1964C11.9215 12.719 12.1267 12.1685 12.1916 11.5932C12.1955 11.5601 12.1979 11.5269 12.1988 11.4936L12.2 11.4732V11.4C12.2 11.0817 12.0736 10.7765 11.8485 10.5515C11.6235 10.3264 11.3183 10.2 11 10.2H3.2C2.88174 10.2 2.57652 10.3264 2.35147 10.5515C2.12643 10.7765 2 11.0817 2 11.4V11.4732V11.472ZM16.4 3C15.9226 3 15.4648 3.18964 15.1272 3.52721C14.7896 3.86477 14.6 4.32261 14.6 4.8C14.6 5.27739 14.7896 5.73523 15.1272 6.07279C15.4648 6.41036 15.9226 6.6 16.4 6.6C16.8774 6.6 17.3352 6.41036 17.6728 6.07279C18.0104 5.73523 18.2 5.27739 18.2 4.8C18.2 4.32261 18.0104 3.86477 17.6728 3.52721C17.3352 3.18964 16.8774 3 16.4 3ZM13.4 4.8C13.4 4.00435 13.7161 3.24129 14.2787 2.67868C14.8413 2.11607 15.6044 1.8 16.4 1.8C17.1957 1.8 17.9587 2.11607 18.5213 2.67868C19.0839 3.24129 19.4 4.00435 19.4 4.8C19.4 5.59565 19.0839 6.35871 18.5213 6.92132C17.9587 7.48393 17.1957 7.8 16.4 7.8C15.6044 7.8 14.8413 7.48393 14.2787 6.92132C13.7161 6.35871 13.4 5.59565 13.4 4.8ZM15.2 11.4V12.6H14.6C14.2817 12.6 13.9765 12.7264 13.7515 12.9515C13.5264 13.1765 13.4 13.4817 13.4 13.8V18.6C13.4 18.9183 13.5264 19.2235 13.7515 19.4485C13.9765 19.6736 14.2817 19.8 14.6 19.8H20.6C20.9183 19.8 21.2235 19.6736 21.4485 19.4485C21.6736 19.2235 21.8 18.9183 21.8 18.6V13.8C21.8 13.4817 21.6736 13.1765 21.4485 12.9515C21.2235 12.7264 20.9183 12.6 20.6 12.6H20V11.4C20 10.7635 19.7471 10.153 19.2971 9.70294C18.847 9.25286 18.2365 9 17.6 9C16.9635 9 16.353 9.25286 15.9029 9.70294C15.4529 10.153 15.2 10.7635 15.2 11.4ZM16.4 12.6V11.4C16.4 11.0817 16.5264 10.7765 16.7515 10.5515C16.9765 10.3264 17.2817 10.2 17.6 10.2C17.9183 10.2 18.2235 10.3264 18.4485 10.5515C18.6736 10.7765 18.8 11.0817 18.8 11.4V12.6H16.4ZM17.6 15.3C17.8387 15.3 18.0676 15.3948 18.2364 15.5636C18.4052 15.7324 18.5 15.9613 18.5 16.2C18.5 16.4387 18.4052 16.6676 18.2364 16.8364C18.0676 17.0052 17.8387 17.1 17.6 17.1C17.3613 17.1 17.1324 17.0052 16.9636 16.8364C16.7948 16.6676 16.7 16.4387 16.7 16.2C16.7 15.9613 16.7948 15.7324 16.9636 15.5636C17.1324 15.3948 17.3613 15.3 17.6 15.3Z"
                      style={{
                        fill: isOpen[0] == true ? "#780000" : "#A8A8A8",
                      }}
                    />
                  </svg>
                </ListItemIcon>
                <ListItemText
                  primary="Admin"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />

                <FontAwesomeIcon icon={faCaretRight} />
              </ListItemButton>
            ) : (
              ""
            )}
            {isOpen[0] == true ? (
              list[0].map((val, index) => {
                return (
                  <>
                    <div
                      hidden={val.show}
                      className="z-50 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
                      style={{ position: "absolute", left: "16em" }}
                    >
                      <ul
                        className="py-1 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownRightButton"
                      >
                        {val.body.map((e, i) => {
                          return (
                            <li>
                              <Link
                                onClick={() =>
                                  isOpen[0] == false
                                    ? setOpen([true, false, false])
                                    : setOpen([false, false, false])
                                }
                                key={i}
                                to={e.link}
                                className="block py-2 px-4 hover:bg-gray-100 text-xs dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                {e.nama}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <ListItemButton
                      key={index}
                      onClick={() => {
                        if (val.click != null) {
                          navigate(val.click);
                        } else {
                          if (val.show == false) {
                            setList((e) => [...e, (e[0][index].show = true)]);
                          } else {
                            list[0].map((e, i) => {
                              setList((e) => [...e, (e[0][i].show = true)]);
                            });
                            setList((e) => [...e, (e[0][index].show = false)]);
                          }
                        }
                      }}
                    >
                      <ListItemIcon></ListItemIcon>
                      <ListItemText
                        primary={val.nama}
                        primaryTypographyProps={{ fontSize: "12px" }}
                      />
                      <ChevronRight />
                    </ListItemButton>
                  </>
                );
              })
            ) : (
              <div></div>
            )}
            {users?.role == "admin" ||
            users?.role == "subsdiary" ||
            users?.role == "subadmin" ? (
              <ListItemButton
                style={{
                  borderRadius: "10px",
                  backgroundColor:
                    isOpen[1] == true ? "#C1121F20" : "transparent",
                  color: isOpen[1] == true ? "#780000" : "#00000080",
                }}
                className="mt-2"
                onClick={() =>
                  isOpen[1] == false
                    ? setOpen([false, true, false])
                    : setOpen([false, false, false])
                }
              >
                <ListItemIcon>
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.1999 3.40039C8.1999 2.923 8.38954 2.46516 8.72711 2.1276C9.06468 1.79003 9.52251 1.60039 9.9999 1.60039C10.4773 1.60039 10.9351 1.79003 11.2727 2.1276C11.6103 2.46516 11.7999 2.923 11.7999 3.40039C11.7999 3.87778 11.6103 4.33562 11.2727 4.67318C10.9351 5.01075 10.4773 5.20039 9.9999 5.20039C9.52251 5.20039 9.06468 5.01075 8.72711 4.67318C8.38954 4.33562 8.1999 3.87778 8.1999 3.40039ZM9.9999 0.400391C9.20425 0.400391 8.44119 0.716461 7.87858 1.27907C7.31597 1.84168 6.9999 2.60474 6.9999 3.40039C6.9999 4.19604 7.31597 4.9591 7.87858 5.52171C8.44119 6.08432 9.20425 6.40039 9.9999 6.40039C10.7956 6.40039 11.5586 6.08432 12.1212 5.52171C12.6838 4.9591 12.9999 4.19604 12.9999 3.40039C12.9999 2.60474 12.6838 1.84168 12.1212 1.27907C11.5586 0.716461 10.7956 0.400391 9.9999 0.400391ZM15.3999 4.00039C15.3999 3.68213 15.5263 3.37691 15.7514 3.15186C15.9764 2.92682 16.2816 2.80039 16.5999 2.80039C16.9182 2.80039 17.2234 2.92682 17.4484 3.15186C17.6735 3.37691 17.7999 3.68213 17.7999 4.00039C17.7999 4.31865 17.6735 4.62387 17.4484 4.84892C17.2234 5.07396 16.9182 5.20039 16.5999 5.20039C16.2816 5.20039 15.9764 5.07396 15.7514 4.84892C15.5263 4.62387 15.3999 4.31865 15.3999 4.00039ZM16.5999 1.60039C15.9634 1.60039 15.3529 1.85325 14.9028 2.30333C14.4528 2.75342 14.1999 3.36387 14.1999 4.00039C14.1999 4.63691 14.4528 5.24736 14.9028 5.69745C15.3529 6.14753 15.9634 6.40039 16.5999 6.40039C17.2364 6.40039 17.8469 6.14753 18.297 5.69745C18.747 5.24736 18.9999 4.63691 18.9999 4.00039C18.9999 3.36387 18.747 2.75342 18.297 2.30333C17.8469 1.85325 17.2364 1.60039 16.5999 1.60039ZM3.3999 2.80039C3.08164 2.80039 2.77642 2.92682 2.55137 3.15186C2.32633 3.37691 2.1999 3.68213 2.1999 4.00039C2.1999 4.31865 2.32633 4.62387 2.55137 4.84892C2.77642 5.07396 3.08164 5.20039 3.3999 5.20039C3.71816 5.20039 4.02339 5.07396 4.24843 4.84892C4.47347 4.62387 4.5999 4.31865 4.5999 4.00039C4.5999 3.68213 4.47347 3.37691 4.24843 3.15186C4.02339 2.92682 3.71816 2.80039 3.3999 2.80039ZM0.999902 4.00039C0.999902 3.36387 1.25276 2.75342 1.70285 2.30333C2.15293 1.85325 2.76338 1.60039 3.3999 1.60039C4.03642 1.60039 4.64687 1.85325 5.09696 2.30333C5.54705 2.75342 5.7999 3.36387 5.7999 4.00039C5.7999 4.63691 5.54705 5.24736 5.09696 5.69745C4.64687 6.14753 4.03642 6.40039 3.3999 6.40039C2.76338 6.40039 2.15293 6.14753 1.70285 5.69745C1.25276 5.24736 0.999902 4.63691 0.999902 4.00039ZM3.9999 16.0004C4.0395 16.0004 4.0803 16.0004 4.1199 15.998C4.2015 16.4036 4.3251 16.796 4.4847 17.168C3.97564 17.2372 3.45766 17.1966 2.96558 17.049C2.4735 16.9014 2.01871 16.6502 1.63177 16.3122C1.24483 15.9743 0.9347 15.5574 0.722224 15.0897C0.509749 14.6219 0.399846 14.1141 0.399902 13.6004V9.10039C0.399902 8.27239 1.0719 7.60039 1.8999 7.60039H4.4547C4.21427 7.95932 4.06401 8.37097 4.0167 8.80039H1.8999C1.82034 8.80039 1.74403 8.832 1.68777 8.88826C1.63151 8.94452 1.5999 9.02083 1.5999 9.10039V13.6004C1.5999 14.2369 1.85276 14.8474 2.30285 15.2974C2.75293 15.7475 3.36338 16.0004 3.9999 16.0004ZM18.3999 9.40039C19.0014 9.85136 19.4117 10.5117 19.5495 11.2508L19.5999 11.2604V9.10039C19.5999 8.27239 18.9279 7.60039 18.0999 7.60039H15.5451C15.7803 7.95079 15.9351 8.35999 15.9831 8.80039H18.0999C18.1795 8.80039 18.2558 8.832 18.312 8.88826C18.3683 8.94452 18.3999 9.02083 18.3999 9.10039V9.40039ZM16.5999 10.0004H14.1999C13.7225 10.0004 13.2647 10.19 12.9271 10.5276C12.5895 10.8652 12.3999 11.323 12.3999 11.8004V12.4004H11.7999C11.3225 12.4004 10.8647 12.59 10.5271 12.9276C10.1895 13.2652 9.9999 13.723 9.9999 14.2004V16.0004H12.3999V15.4004C12.3999 15.2413 12.4631 15.0886 12.5756 14.9761C12.6882 14.8636 12.8408 14.8004 12.9999 14.8004C13.159 14.8004 13.3116 14.8636 13.4242 14.9761C13.5367 15.0886 13.5999 15.2413 13.5999 15.4004V16.0004H17.1999V15.4004C17.1999 15.2413 17.2631 15.0886 17.3756 14.9761C17.4882 14.8636 17.6408 14.8004 17.7999 14.8004C17.959 14.8004 18.1116 14.8636 18.2242 14.9761C18.3367 15.0886 18.3999 15.2413 18.3999 15.4004V16.0004H20.7999V14.2004C20.7999 13.723 20.6103 13.2652 20.2727 12.9276C19.9351 12.59 19.4773 12.4004 18.9999 12.4004H18.3999V11.8004C18.3999 11.323 18.2103 10.8652 17.8727 10.5276C17.5351 10.19 17.0773 10.0004 16.5999 10.0004ZM6.6999 8.80039C6.62034 8.80039 6.54403 8.832 6.48777 8.88826C6.43151 8.94452 6.3999 9.02083 6.3999 9.10039V14.8004C6.3999 16.3676 7.4019 17.702 8.7999 18.1964V19.0004C8.7999 19.1564 8.8119 19.3088 8.8347 19.4576C7.7965 19.1974 6.87498 18.5978 6.21646 17.754C5.55793 16.9103 5.20015 15.8707 5.1999 14.8004V9.10039C5.1999 8.27239 5.8719 7.60039 6.6999 7.60039H13.2999C14.0259 7.60039 14.6319 8.11639 14.7699 8.80039H6.6999ZM13.5999 12.4004V11.8004C13.5999 11.6413 13.6631 11.4886 13.7756 11.3761C13.8882 11.2636 14.0408 11.2004 14.1999 11.2004H16.5999C16.759 11.2004 16.9116 11.2636 17.0242 11.3761C17.1367 11.4886 17.1999 11.6413 17.1999 11.8004V12.4004H13.5999ZM18.3999 17.2004V17.8004C18.3999 17.9595 18.3367 18.1121 18.2242 18.2247C18.1116 18.3372 17.959 18.4004 17.7999 18.4004C17.6408 18.4004 17.4882 18.3372 17.3756 18.2247C17.2631 18.1121 17.1999 17.9595 17.1999 17.8004V17.2004H13.5999V17.8004C13.5999 17.9595 13.5367 18.1121 13.4242 18.2247C13.3116 18.3372 13.159 18.4004 12.9999 18.4004C12.8408 18.4004 12.6882 18.3372 12.5756 18.2247C12.4631 18.1121 12.3999 17.9595 12.3999 17.8004V17.2004H9.9999V19.0004C9.9999 19.4778 10.1895 19.9356 10.5271 20.2732C10.8647 20.6107 11.3225 20.8004 11.7999 20.8004H18.9999C19.4773 20.8004 19.9351 20.6107 20.2727 20.2732C20.6103 19.9356 20.7999 19.4778 20.7999 19.0004V17.2004H18.3999Z"
                      style={{
                        fill: isOpen[1] == true ? "#780000" : "#A8A8A8",
                      }}
                    />
                  </svg>
                </ListItemIcon>
                <ListItemText
                  primary="Employee"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
                <FontAwesomeIcon icon={faCaretRight} />
              </ListItemButton>
            ) : (
              ""
            )}
            {isOpen[1] == true ? (
              list[1].map((val, index) => {
                return (
                  <>
                    <div
                      id={`drop${index}`}
                      // hidden={val.show}
                      className="hidden z-50 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
                      style={{ position: "absolute", left: "16em" }}
                    >
                      <ul
                        className="py-1 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownRightButton"
                      >
                        {val.body.map((e, i) => {
                          return (
                            <li>
                              <Link
                                onClick={() =>
                                  isOpen[1] == false
                                    ? setOpen([true, false, false])
                                    : setOpen([false, false, false])
                                }
                                key={i}
                                to={e.link}
                                className="block py-2 px-4 hover:bg-gray-100 text-xs dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                {e.nama}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <ListItemButton
                      onClick={() => {
                        if (val.click != null) {
                          navigate(val.click);
                        } else {
                          if (
                            document
                              .getElementById(`drop${index}`)
                              .classList.contains("hidden")
                          ) {
                            document
                              .getElementById(`drop${index}`)
                              .classList.remove("hidden");
                          } else {
                            document
                              .getElementById(`drop${index}`)
                              .classList.add("hidden");
                          }
                        }
                      }}
                    >
                      <ListItemIcon></ListItemIcon>
                      <ListItemText
                        primary={val.nama}
                        primaryTypographyProps={{ fontSize: "12px" }}
                      />
                      <ChevronRight />
                    </ListItemButton>
                  </>
                );
              })
            ) : (
              <div></div>
            )}
            <ListItemButton
              style={{ color: "#00000080" }}
              className="mt-2"
              onClick={() => {
                navigate("/document-management");
              }}
            >
              <ListItemIcon>
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 18 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 5C4.30109 5 4.11032 5.07902 3.96967 5.21967C3.82902 5.36032 3.75 5.55109 3.75 5.75C3.75 5.94891 3.82902 6.13968 3.96967 6.28033C4.11032 6.42098 4.30109 6.5 4.5 6.5V5ZM7.5 6.5C7.69891 6.5 7.88968 6.42098 8.03033 6.28033C8.17098 6.13968 8.25 5.94891 8.25 5.75C8.25 5.55109 8.17098 5.36032 8.03033 5.21967C7.88968 5.07902 7.69891 5 7.5 5V6.5ZM4.5 10.25C4.30109 10.25 4.11032 10.329 3.96967 10.4697C3.82902 10.6103 3.75 10.8011 3.75 11C3.75 11.1989 3.82902 11.3897 3.96967 11.5303C4.11032 11.671 4.30109 11.75 4.5 11.75V10.25ZM13.5 11.75C13.6989 11.75 13.8897 11.671 14.0303 11.5303C14.171 11.3897 14.25 11.1989 14.25 11C14.25 10.8011 14.171 10.6103 14.0303 10.4697C13.8897 10.329 13.6989 10.25 13.5 10.25V11.75ZM4.5 13.25C4.30109 13.25 4.11032 13.329 3.96967 13.4697C3.82902 13.6103 3.75 13.8011 3.75 14C3.75 14.1989 3.82902 14.3897 3.96967 14.5303C4.11032 14.671 4.30109 14.75 4.5 14.75V13.25ZM13.5 14.75C13.6989 14.75 13.8897 14.671 14.0303 14.5303C14.171 14.3897 14.25 14.1989 14.25 14C14.25 13.8011 14.171 13.6103 14.0303 13.4697C13.8897 13.329 13.6989 13.25 13.5 13.25V14.75ZM4.5 16.25C4.30109 16.25 4.11032 16.329 3.96967 16.4697C3.82902 16.6103 3.75 16.8011 3.75 17C3.75 17.1989 3.82902 17.3897 3.96967 17.5303C4.11032 17.671 4.30109 17.75 4.5 17.75V16.25ZM7.5 17.75C7.69891 17.75 7.88968 17.671 8.03033 17.5303C8.17098 17.3897 8.25 17.1989 8.25 17C8.25 16.8011 8.17098 16.6103 8.03033 16.4697C7.88968 16.329 7.69891 16.25 7.5 16.25V17.75ZM3 2H15V0.5H3V2ZM15.75 2.75V19.25H17.25V2.75H15.75ZM15 20H3V21.5H15V20ZM2.25 19.25V2.75H0.75V19.25H2.25ZM3 20C2.80109 20 2.61032 19.921 2.46967 19.7803C2.32902 19.6397 2.25 19.4489 2.25 19.25H0.75C0.75 19.8467 0.987053 20.419 1.40901 20.841C1.83097 21.2629 2.40326 21.5 3 21.5V20ZM15.75 19.25C15.75 19.4489 15.671 19.6397 15.5303 19.7803C15.3897 19.921 15.1989 20 15 20V21.5C15.5967 21.5 16.169 21.2629 16.591 20.841C17.0129 20.419 17.25 19.8467 17.25 19.25H15.75ZM15 2C15.1989 2 15.3897 2.07902 15.5303 2.21967C15.671 2.36032 15.75 2.55109 15.75 2.75H17.25C17.25 2.15326 17.0129 1.58097 16.591 1.15901C16.169 0.737053 15.5967 0.5 15 0.5V2ZM3 0.5C2.40326 0.5 1.83097 0.737053 1.40901 1.15901C0.987053 1.58097 0.75 2.15326 0.75 2.75H2.25C2.25 2.55109 2.32902 2.36032 2.46967 2.21967C2.61032 2.07902 2.80109 2 3 2V0.5ZM4.5 6.5H7.5V5H4.5V6.5ZM4.5 11.75H13.5V10.25H4.5V11.75ZM4.5 14.75H13.5V13.25H4.5V14.75ZM4.5 17.75H7.5V16.25H4.5V17.75Z"
                    fill="#A8A8A8"
                  />
                </svg>
              </ListItemIcon>
              <ListItemText
                primary="Documents"
                primaryTypographyProps={{ fontSize: "14px" }}
              />
            </ListItemButton>
            <ListItemButton
              style={{
                borderRadius: "10px",
                backgroundColor:
                  isOpen[2] == true ? "#C1121F20" : "transparent",
                color: isOpen[2] == true ? "#780000" : "#00000080",
              }}
              className="mt-2"
              onClick={() =>
                isOpen[2] == false
                  ? setOpen([false, false, true])
                  : setOpen([false, false, false])
              }
            >
              <ListItemIcon>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 2C14.411 2 18 5.589 18 10C18 14.411 14.411 18 10 18C5.589 18 2 14.411 2 10C2 5.589 5.589 2 10 2ZM10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0ZM13.8 13.4L11 9.667V5H9V10.333L12.2 14.599L13.8 13.4Z"
                    style={{
                      fill: isOpen[2] == true ? "#780000" : "#A8A8A8",
                    }}
                  />
                </svg>
              </ListItemIcon>
              <ListItemText
                primary="Time Management"
                primaryTypographyProps={{ fontSize: "14px" }}
              />
              <FontAwesomeIcon icon={faCaretRight} />
            </ListItemButton>
            {isOpen[2] == true ? (
              list[2].map((val, index) => {
                return (
                  <>
                    <div
                      id={`timeManagement${index}`}
                      className="hidden z-50 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
                      style={{ position: "absolute", left: "16em" }}
                    >
                      <ul
                        className="py-1 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownRightButton"
                      >
                        {users?.role == "admin" ||
                        users?.role == "subsdiary" ||
                        users?.role == "subadmin" ? (
                          val.body.map((e, i) => {
                            return (
                              <li>
                                <Link
                                  onClick={() =>
                                    isOpen[2] == false
                                      ? setOpen([true, false, false])
                                      : setOpen([false, false, false])
                                  }
                                  key={i}
                                  to={e.link}
                                  className="block py-2 px-4 hover:bg-gray-100 text-xs dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  {e.nama}
                                </Link>
                              </li>
                            );
                          })
                        ) : (
                          <li>
                            <Link
                              onClick={() =>
                                isOpen[2] == false
                                  ? setOpen([true, false, false])
                                  : setOpen([false, false, false])
                              }
                              key={"i"}
                              to={"/timeManagement/attendance/myAttendance"}
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              My Attendance
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                    <ListItemButton
                      onClick={() => {
                        if (val.click != null) {
                          navigate(val.click);
                        } else {
                          if (
                            document
                              .getElementById(`timeManagement${index}`)
                              .classList.contains("hidden")
                          ) {
                            document
                              .getElementById(`timeManagement${index}`)
                              .classList.remove("hidden");
                          } else {
                            document
                              .getElementById(`timeManagement${index}`)
                              .classList.add("hidden");
                          }
                        }
                      }}
                    >
                      <ListItemIcon></ListItemIcon>
                      <ListItemText
                        primary={val.nama}
                        primaryTypographyProps={{ fontSize: "12px" }}
                      />
                      <ChevronRight />
                    </ListItemButton>
                  </>
                );
              })
            ) : (
              <div></div>
            )}
            {users?.role == "admin" ||
            users?.role == "subsdiary" ||
            users?.role == "subadmin" ? (
              <ListItemButton
                style={{ color: "#00000080" }}
                className="mt-2 flex justify-between items-center"
                onClick={() => {
                  navigate("/payroll");
                }}
              >
                <ListItemIcon>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.931 1.05964C9.05484 0.904682 9.20818 0.775825 9.38216 0.680528C9.55613 0.585232 9.74728 0.525389 9.94454 0.504463C10.1418 0.483538 10.3412 0.501945 10.5313 0.558621C10.7214 0.615296 10.8984 0.709113 11.052 0.834641L15.945 4.83064C16.2141 5.05035 16.3986 5.35664 16.467 5.69723C16.5354 6.03782 16.4834 6.39159 16.32 6.69814C15.8922 6.5674 15.4473 6.50117 15 6.50164H14.55L14.997 5.99164L12.42 3.88714L10.2945 6.50314H8.361L11.2575 2.93914L10.1025 1.99564L6.5055 6.50164H4.5855L8.931 1.05964V1.05964ZM12.75 14.0016C12.5511 14.0016 12.3603 14.0807 12.2197 14.2213C12.079 14.362 12 14.5527 12 14.7516C12 14.9506 12.079 15.1413 12.2197 15.282C12.3603 15.4226 12.5511 15.5016 12.75 15.5016H14.25C14.4489 15.5016 14.6397 15.4226 14.7803 15.282C14.921 15.1413 15 14.9506 15 14.7516C15 14.5527 14.921 14.362 14.7803 14.2213C14.6397 14.0807 14.4489 14.0016 14.25 14.0016H12.75ZM1.5 7.25164C1.5 7.05273 1.57902 6.86196 1.71967 6.72131C1.86032 6.58066 2.05109 6.50164 2.25 6.50164H3.087L4.2795 5.00164H2.25C1.65326 5.00164 1.08097 5.23869 0.65901 5.66065C0.237053 6.08261 0 6.6549 0 7.25164V16.2516C0 17.2462 0.395088 18.2 1.09835 18.9033C1.80161 19.6066 2.75544 20.0016 3.75 20.0016H15C15.7956 20.0016 16.5587 19.6856 17.1213 19.123C17.6839 18.5604 18 17.7973 18 17.0016V11.0016C18 10.206 17.6839 9.44293 17.1213 8.88032C16.5587 8.31771 15.7956 8.00164 15 8.00164H2.25C2.05109 8.00164 1.86032 7.92262 1.71967 7.78197C1.57902 7.64132 1.5 7.45055 1.5 7.25164ZM1.5 16.2516V9.37414C1.734 9.45664 1.9875 9.50164 2.25 9.50164H15C15.3978 9.50164 15.7794 9.65968 16.0607 9.94098C16.342 10.2223 16.5 10.6038 16.5 11.0016V17.0016C16.5 17.3995 16.342 17.781 16.0607 18.0623C15.7794 18.3436 15.3978 18.5016 15 18.5016H3.75C3.15326 18.5016 2.58097 18.2646 2.15901 17.8426C1.73705 17.4207 1.5 16.8484 1.5 16.2516Z"
                      fill="#A8A8A8"
                    />
                  </svg>
                </ListItemIcon>
                <ListItemText
                  primary="Payroll"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
                {/* <div className="bg-red-400 rounded px-2 py-0.5">
                  <h1 className="text-[10px] text-white font-bold">UPCOMING</h1>
                </div> */}
              </ListItemButton>
            ) : (
              ""
            )}
            {/* {users?.role == "admin" ||
            users?.role == "subsdiary" ||
            users?.role == "subadmin" ? ( */}
              <ListItemButton
                style={{ color: "#00000080" }}
                className="mt-2 flex justify-between items-center"
                onClick={() => {
                  navigate("/finance");
                }}
              >
                <ListItemIcon>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.386 9.3335C11.2481 8.94351 10.9927 8.60587 10.6549 8.36706C10.3171 8.12824 9.91366 8.00001 9.5 8V7.5H8.5V8C7.96957 8 7.46086 8.21071 7.08579 8.58579C6.71071 8.96086 6.5 9.46957 6.5 10C6.5 10.5304 6.71071 11.0391 7.08579 11.4142C7.46086 11.7893 7.96957 12 8.5 12V14C8.065 14 7.6945 13.7225 7.5565 13.3335C7.53603 13.2699 7.503 13.211 7.45936 13.1603C7.41573 13.1097 7.36239 13.0683 7.30248 13.0386C7.24257 13.0089 7.17732 12.9916 7.11059 12.9875C7.04386 12.9835 6.97699 12.9929 6.91396 13.0152C6.85092 13.0375 6.79299 13.0721 6.7436 13.1172C6.6942 13.1622 6.65434 13.2167 6.62637 13.2775C6.59841 13.3382 6.5829 13.4039 6.58078 13.4707C6.57865 13.5376 6.58995 13.6041 6.614 13.6665C6.75192 14.0565 7.00734 14.3941 7.3451 14.6329C7.68286 14.8718 8.08634 15 8.5 15V15.5H9.5V15C10.0304 15 10.5391 14.7893 10.9142 14.4142C11.2893 14.0391 11.5 13.5304 11.5 13C11.5 12.4696 11.2893 11.9609 10.9142 11.5858C10.5391 11.2107 10.0304 11 9.5 11V9C9.70681 8.99995 9.90854 9.06402 10.0774 9.18338C10.2463 9.30274 10.374 9.47153 10.443 9.6665C10.4872 9.79155 10.5792 9.89394 10.6988 9.95113C10.7581 9.97946 10.8223 9.99583 10.8879 9.99933C10.9535 10.0028 11.0191 9.99337 11.081 9.9715C11.1429 9.94964 11.1999 9.91579 11.2488 9.87189C11.2976 9.828 11.3373 9.77491 11.3656 9.71567C11.394 9.65642 11.4103 9.59218 11.4138 9.52661C11.4173 9.46104 11.4079 9.39542 11.386 9.3335ZM8.5 9C8.23478 9 7.98043 9.10536 7.79289 9.29289C7.60536 9.48043 7.5 9.73478 7.5 10C7.5 10.2652 7.60536 10.5196 7.79289 10.7071C7.98043 10.8946 8.23478 11 8.5 11V9ZM9.5 14C9.76522 14 10.0196 13.8946 10.2071 13.7071C10.3946 13.5196 10.5 13.2652 10.5 13C10.5 12.7348 10.3946 12.4804 10.2071 12.2929C10.0196 12.1054 9.76522 12 9.5 12V14Z"
                      fill="#A8A8A8"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.57649 1.3105C4.80349 0.71 6.81649 0 9.01949 0C11.1765 0 13.1365 0.6805 14.357 1.273L14.426 1.3065C14.794 1.4885 15.091 1.6605 15.3 1.8L13.453 4.5C17.711 8.853 21 17.9985 9.01949 17.9985C-2.96101 17.9985 0.23949 9.019 4.53449 4.5L2.69949 1.8C2.84099 1.7075 3.02049 1.6 3.23449 1.486C3.34049 1.429 3.45449 1.3705 3.57649 1.311V1.3105ZM12.266 4.464L13.7445 2.3025C12.3695 2.4015 10.7335 2.7245 9.15849 3.1805C8.03349 3.5055 6.78349 3.456 5.62599 3.2425C5.33431 3.18842 5.04462 3.12405 4.75749 3.0495L5.71749 4.463C7.77499 5.1955 10.208 5.1955 12.266 4.464ZM5.13999 5.315C7.54749 6.245 10.441 6.245 12.8485 5.314C13.8534 6.37335 14.6941 7.57719 15.3425 8.8855C16.0185 10.2645 16.3865 11.643 16.3265 12.831C16.2685 13.9775 15.8175 14.957 14.7875 15.685C13.714 16.4435 11.9085 16.9985 9.01899 16.9985C6.12649 16.9985 4.31249 16.453 3.22899 15.703C2.19149 14.984 1.73599 14.018 1.67149 12.887C1.60399 11.712 1.96399 10.3405 2.63749 8.952C3.27999 7.628 4.17649 6.3535 5.13999 5.315ZM4.56499 1.958C4.96499 2.077 5.38299 2.1805 5.80699 2.259C6.88199 2.457 7.95999 2.486 8.87999 2.2195C9.9521 1.90717 11.0425 1.66154 12.145 1.484C11.225 1.207 10.149 1 9.01899 1C7.29649 1 5.68999 1.4805 4.56499 1.958Z"
                      fill="#A8A8A8"
                    />
                  </svg>
                </ListItemIcon>
                <ListItemText
                  primary="Finance"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </ListItemButton>
            {/* ) : (
              ""
            )} */}
            {users?.role == "admin" ||
            users?.role == "subsdiary" ||
            users?.role == "subadmin" ? (
              <ListItemButton
                style={{ color: "#00000080" }}
                className="mt-2"
                onClick={() => {
                  navigate("/recruitment");
                }}
              >
                <ListItemIcon>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.692 11.468C9.52043 12.4594 8.03475 13.0024 6.5 13C2.91 13 0 10.09 0 6.5C0 2.91 2.91 0 6.5 0C10.09 0 13 2.91 13 6.5C13 8.0975 12.424 9.56 11.468 10.692L12.572 10.5L17.714 15.642C18.0955 16.0235 18.0955 16.642 17.714 17.023L17.023 17.714C16.6415 18.0955 16.023 18.0955 15.642 17.714L10.5 12.572L10.692 11.468ZM12 6.5C12 9.5375 9.5375 12 6.5 12C3.4625 12 1 9.5375 1 6.5C1 3.4625 3.4625 1 6.5 1C9.5375 1 12 3.4625 12 6.5ZM15.6245 14.9665L12.232 11.574L11.672 11.6715L11.574 12.232L14.9765 15.6345L15.6245 14.9665ZM15.6835 16.3415L16.3325 16.9905L16.9905 16.3325L16.3315 15.6735L15.6835 16.3415Z"
                      fill="#A8A8A8"
                    />
                  </svg>
                </ListItemIcon>
                <ListItemText
                  primary="Recruitment"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
                {/* <div className="bg-red-400 rounded px-2 py-0.5">
                    <h1 className="text-[10px] text-white font-bold">UC</h1>
                </div> */}
              </ListItemButton>
            ) : (
              ""
            )}
            <ListItemButton
              style={{ color: "#00000080" }}
              className="mt-2"
              onClick={() => {
                navigate("/profile");
              }}
            >
              <ListItemIcon>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.8 0.399902C7.52696 0.399902 6.30606 0.905615 5.40589 1.80579C4.50571 2.70596 4 3.92686 4 5.1999C4 6.47294 4.50571 7.69384 5.40589 8.59401C6.30606 9.49419 7.52696 9.9999 8.8 9.9999C10.073 9.9999 11.2939 9.49419 12.1941 8.59401C13.0943 7.69384 13.6 6.47294 13.6 5.1999C13.6 3.92686 13.0943 2.70596 12.1941 1.80579C11.2939 0.905615 10.073 0.399902 8.8 0.399902ZM5.2 5.1999C5.2 4.24512 5.57928 3.32945 6.25442 2.65432C6.92955 1.97919 7.84522 1.5999 8.8 1.5999C9.75478 1.5999 10.6705 1.97919 11.3456 2.65432C12.0207 3.32945 12.4 4.24512 12.4 5.1999C12.4 6.15468 12.0207 7.07036 11.3456 7.74549C10.6705 8.42062 9.75478 8.7999 8.8 8.7999C7.84522 8.7999 6.92955 8.42062 6.25442 7.74549C5.57928 7.07036 5.2 6.15468 5.2 5.1999ZM2.8108 11.1999C2.49476 11.1986 2.18159 11.2598 1.88923 11.3798C1.59687 11.4998 1.33108 11.6764 1.10711 11.8994C0.883136 12.1223 0.705381 12.3873 0.584039 12.6791C0.462697 12.971 0.400155 13.2839 0.4 13.5999C0.4 15.6291 1.3996 17.1591 2.962 18.1563C4.5004 19.1367 6.574 19.5999 8.8 19.5999C9.292 19.5999 9.7792 19.5771 10.252 19.5315C9.96565 19.175 9.71712 18.7898 9.5104 18.3819C9.2776 18.3939 9.04 18.3999 8.8 18.3999C6.718 18.3999 4.8916 17.9631 3.6076 17.1435C2.3476 16.3395 1.6 15.1719 1.6 13.5999C1.6 12.9363 2.1376 12.3999 2.8108 12.3999H9.5188C9.7396 11.9703 10.0048 11.5683 10.3084 11.1999H2.812H2.8108ZM14.65 12.9999C14.65 12.801 14.729 12.6102 14.8697 12.4696C15.0103 12.3289 15.2011 12.2499 15.4 12.2499C15.5989 12.2499 15.7897 12.3289 15.9303 12.4696C16.071 12.6102 16.15 12.801 16.15 12.9999C16.15 13.1988 16.071 13.3896 15.9303 13.5302C15.7897 13.6709 15.5989 13.7499 15.4 13.7499C15.2011 13.7499 15.0103 13.6709 14.8697 13.5302C14.729 13.3896 14.65 13.1988 14.65 12.9999ZM16 17.7999C16 17.959 15.9368 18.1116 15.8243 18.2242C15.7117 18.3367 15.5591 18.3999 15.4 18.3999C15.2409 18.3999 15.0883 18.3367 14.9757 18.2242C14.8632 18.1116 14.8 17.959 14.8 17.7999V15.3999C14.8 15.2408 14.8632 15.0882 14.9757 14.9756C15.0883 14.8631 15.2409 14.7999 15.4 14.7999C15.5591 14.7999 15.7117 14.8631 15.8243 14.9756C15.9368 15.0882 16 15.2408 16 15.3999V17.7999ZM10 15.3999C10 13.9677 10.5689 12.5942 11.5816 11.5815C12.5943 10.5688 13.9678 9.9999 15.4 9.9999C16.8322 9.9999 18.2057 10.5688 19.2184 11.5815C20.2311 12.5942 20.8 13.9677 20.8 15.3999C20.8 16.8321 20.2311 18.2056 19.2184 19.2183C18.2057 20.231 16.8322 20.7999 15.4 20.7999C13.9678 20.7999 12.5943 20.231 11.5816 19.2183C10.5689 18.2056 10 16.8321 10 15.3999ZM11.2 15.3999C11.2 15.9515 11.3086 16.4976 11.5197 17.0072C11.7308 17.5167 12.0401 17.9797 12.4302 18.3698C12.8202 18.7598 13.2832 19.0691 13.7927 19.2802C14.3023 19.4913 14.8484 19.5999 15.4 19.5999C15.9516 19.5999 16.4977 19.4913 17.0073 19.2802C17.5168 19.0691 17.9798 18.7598 18.3698 18.3698C18.7599 17.9797 19.0692 17.5167 19.2803 17.0072C19.4914 16.4976 19.6 15.9515 19.6 15.3999C19.6 14.286 19.1575 13.2177 18.3698 12.4301C17.5822 11.6424 16.5139 11.1999 15.4 11.1999C14.2861 11.1999 13.2178 11.6424 12.4302 12.4301C11.6425 13.2177 11.2 14.286 11.2 15.3999Z"
                    fill="#A8A8A8"
                  />
                </svg>
              </ListItemIcon>
              <ListItemText
                primary="My Profile"
                primaryTypographyProps={{ fontSize: "14px" }}
              />
            </ListItemButton>
            {users?.role == "admin" ||
            users?.role == "subsdiary" ||
            users?.role == "subadmin" ? (
              <ListItemButton
                style={{ color: "#00000080" }}
                className="mt-2"
                onClick={() => {
                  navigate("/maintenance");
                }}
              >
                <ListItemIcon>
                  <svg
                    width="17"
                    height="18"
                    viewBox="0 0 19 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.4 16.666V10.6C18.3999 10.4855 18.371 10.3728 18.316 10.2724C18.2678 10.1925 18.1956 10.1299 18.1096 10.0936C18.0196 10.0557 17.9246 10.0306 17.8276 10.0192C17.7253 10.0064 17.6223 10 17.5192 9.99997H17.2V4.14037C17.2372 4.05877 17.2912 3.96277 17.3596 3.84997C17.428 3.73717 17.494 3.61237 17.5564 3.47557C17.6188 3.33757 17.6752 3.20917 17.7244 3.09157C17.768 3.0001 17.7937 2.90111 17.8 2.79997C17.7823 2.66994 17.7542 2.54153 17.716 2.41597C17.6601 2.21664 17.5972 2.01932 17.5276 1.82437C17.4568 1.62395 17.3848 1.42395 17.3116 1.22437C17.2607 1.08872 17.2143 0.951449 17.1724 0.81277C17.1266 0.693689 17.0485 0.589776 16.9468 0.51277C16.8469 0.437721 16.7249 0.398036 16.6 0.39997H14.2C14.0718 0.405267 13.948 0.447801 13.8436 0.52237C13.741 0.592145 13.6649 0.694446 13.6276 0.81277C13.5799 0.953985 13.5299 1.0944 13.4776 1.23397C13.4054 1.43264 13.337 1.63267 13.2724 1.83397C13.2028 2.04637 13.1404 2.24317 13.084 2.42557C13.0276 2.60557 13 2.73157 13 2.79997C13 2.88757 13.024 2.98717 13.0756 3.09997C13.1248 3.21277 13.1836 3.33757 13.2532 3.47557C13.3648 3.69924 13.4804 3.92088 13.6 4.14037V9.99997H13.2808C13.1745 9.99942 13.0683 10.0058 12.9628 10.0192C12.8647 10.0308 12.7693 10.0593 12.6808 10.1032C12.598 10.1433 12.5272 10.2046 12.4756 10.2808C12.4198 10.3775 12.3935 10.4885 12.4 10.6V16.666C12.4 17.0716 12.4816 17.4532 12.6436 17.8096C12.8068 18.166 13.0252 18.478 13.3 18.7468C13.8608 19.2958 14.6151 19.6023 15.4 19.6C15.7996 19.6 16.1812 19.522 16.5436 19.366C16.8974 19.2152 17.2214 19.0023 17.5 18.7372C17.777 18.4736 18 18.1585 18.1564 17.8096C18.3194 17.4505 18.4025 17.0603 18.4 16.666ZM16 9.99997H14.8V3.99997C14.7998 3.90523 14.7772 3.81189 14.734 3.72757L14.2468 2.75317L14.6308 1.59997H16.1692L16.5532 2.75197L16.066 3.72757C16.0228 3.81189 16.0002 3.90523 16 3.99997V9.99997ZM13.6 12.4V11.2H17.2V12.4H13.6ZM17.2 13.6V16.6C17.2057 16.8388 17.1577 17.0758 17.0596 17.2936C16.9656 17.5103 16.8321 17.7076 16.666 17.8756C16.3294 18.2101 15.8746 18.3985 15.4 18.4C15.1612 18.406 14.9241 18.358 14.7064 18.2596C14.3793 18.1223 14.0999 17.8917 13.9031 17.5965C13.7063 17.3013 13.6009 16.9547 13.6 16.6V13.6H17.2ZM5.2 1.05037C5.20014 0.951996 5.17608 0.855097 5.12996 0.768208C5.08383 0.681318 5.01705 0.607103 4.93549 0.552098C4.85393 0.497093 4.76009 0.462986 4.66225 0.452779C4.56441 0.442573 4.46556 0.456581 4.3744 0.49357C3.40937 0.883898 2.57769 1.54478 1.97945 2.39669C1.38121 3.2486 1.0419 4.25524 1.00235 5.29546C0.96279 6.33569 1.22468 7.36519 1.7565 8.26007C2.28831 9.15495 3.0674 9.87708 4 10.3396V17.2C4 17.8365 4.25286 18.4469 4.70294 18.897C5.15303 19.3471 5.76348 19.6 6.4 19.6C7.03652 19.6 7.64697 19.3471 8.09706 18.897C8.54714 18.4469 8.8 17.8365 8.8 17.2V10.3408C9.73303 9.87865 10.5126 9.15663 11.0447 8.26169C11.5769 7.36675 11.8389 6.33705 11.7994 5.2966C11.7598 4.25615 11.4203 3.24932 10.8217 2.39738C10.2231 1.54543 9.39103 0.884704 8.4256 0.49477C8.33444 0.457781 8.23559 0.443773 8.13775 0.453979C8.03991 0.464186 7.94607 0.498293 7.86451 0.553298C7.78296 0.608303 7.71617 0.682518 7.67004 0.769408C7.62392 0.856298 7.59986 0.953196 7.6 1.05157V5.19997C7.6 5.51823 7.47357 5.82345 7.24853 6.0485C7.02348 6.27354 6.71826 6.39997 6.4 6.39997C6.08174 6.39997 5.77652 6.27354 5.55147 6.0485C5.32643 5.82345 5.2 5.51823 5.2 5.19997V1.05037ZM2.2 5.50237C2.2 4.07437 2.9116 2.81437 4 2.05357V5.19757C4 5.83409 4.25286 6.44454 4.70294 6.89463C5.15303 7.34471 5.76348 7.59757 6.4 7.59757C7.03652 7.59757 7.64697 7.34471 8.09706 6.89463C8.54714 6.44454 8.8 5.83409 8.8 5.19757V2.05357C9.42126 2.48609 9.91412 3.07843 10.2265 3.76797C10.5388 4.45752 10.6591 5.21865 10.5745 5.9709C10.4899 6.72316 10.2037 7.43858 9.74597 8.04155C9.28829 8.64451 8.6762 9.11261 7.9744 9.39637C7.86381 9.44124 7.76912 9.51808 7.70243 9.61705C7.63574 9.71602 7.60007 9.83263 7.6 9.95197V17.2C7.6 17.5182 7.47357 17.8235 7.24853 18.0485C7.02348 18.2735 6.71826 18.4 6.4 18.4C6.08174 18.4 5.77652 18.2735 5.55147 18.0485C5.32643 17.8235 5.2 17.5182 5.2 17.2V9.95197C5.19993 9.83263 5.16426 9.71602 5.09757 9.61705C5.03088 9.51808 4.93619 9.44124 4.8256 9.39637C4.04956 9.08241 3.385 8.54376 2.91719 7.84952C2.44937 7.15529 2.19963 6.33712 2.2 5.49997V5.50237Z"
                      fill="#A8A8A8"
                    />
                  </svg>
                </ListItemIcon>
                <ListItemText
                  primary="Maintenance"
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </ListItemButton>
            ) : (
              ""
            )}
          </div>
          <div className="">
            <hr className="mx-5 mb-3"></hr>
            <Link
              to="#"
              onClick={() => {
                setSignOut(true);
              }}
              className="text-[#780000] hover:text-[#450000]"
            >
              <div className="px-4">
                <div className="flex flex-row gap-4 p-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 4H17C16.7348 4 16.4804 4.10536 16.2929 4.29289C16.1054 4.48043 16 4.73478 16 5C16 5.26522 16.1054 5.51957 16.2929 5.70711C16.4804 5.89464 16.7348 6 17 6H18V18H17C16.7348 18 16.4804 18.1054 16.2929 18.2929C16.1054 18.4804 16 18.7348 16 19C16 19.2652 16.1054 19.5196 16.2929 19.7071C16.4804 19.8946 16.7348 20 17 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V5C20 4.73478 19.8946 4.48043 19.7071 4.29289C19.5196 4.10536 19.2652 4 19 4ZM11.8 7.4C11.6409 7.18783 11.404 7.04756 11.1414 7.01005C10.8789 6.97254 10.6122 7.04087 10.4 7.2C10.1878 7.35913 10.0476 7.59603 10.0101 7.85858C9.97254 8.12113 10.0409 8.38783 10.2 8.6L12 11H4C3.73478 11 3.48043 11.1054 3.29289 11.2929C3.10536 11.4804 3 11.7348 3 12C3 12.2652 3.10536 12.5196 3.29289 12.7071C3.48043 12.8946 3.73478 13 4 13H12.09L10.37 15.44C10.2933 15.5475 10.2386 15.6691 10.2091 15.7978C10.1796 15.9266 10.1759 16.0599 10.1982 16.19C10.2206 16.3202 10.2684 16.4446 10.3391 16.5562C10.4098 16.6678 10.5018 16.7642 10.61 16.84C10.78 16.9587 10.9827 17.0216 11.19 17.02C11.3486 17.0193 11.5048 16.9808 11.6457 16.9078C11.7865 16.8347 11.908 16.7292 12 16.6L14.82 12.6C14.9451 12.4287 15.0126 12.2221 15.0126 12.01C15.0126 11.7979 14.9451 11.5913 14.82 11.42L11.8 7.4Z"
                      fill="#780000"
                    />
                  </svg>

                  <p style={{ fontSize: "14px" }}>Sign Out</p>
                </div>
              </div>
            </Link>
          </div>
        </aside>
        <div className="ml-auto bg-[#E6E6E6] min-h-screen h-full w-4/5 p-5 space-y-5 p-5">
          <div className='w-full bg-white rounded-full h-[49px] flex justify-between items-center px-2 d-print-none'>
            <div className='flex items-center gap-3'>
              <img src={ProfileDefault} className={`w-[41px] h-[41px] rounded-full ${!ProfileDefault ? 'border-0' : 'border'} object-cover`} onClick={ () => navigate("/profile")}/>
              <div className='flex flex-col'>
                <h1 className='text-[#E00101] font-medium text-sm capitalize' onClick={ () => navigate("/profile")}  >{users["username"]}</h1>
                <h1 className='text-[#AAAAAA] text-[10px]'>{moment().format('dddd, MMMM YYYY | hh:mm')}</h1>
              </div>
            </div>
            <div className='flex items-center gap-3 pr-3'>
              <MdEmail className='text-[#E00101] h-[20px] w-[20px] cursor-pointer' onClick={ () => navigate("/inbox")}/>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
      {show ? (
        <>
          <div className="bg-black bg-opacity-75 overflow-y-auto overflow-x-hidden fixed flex justify-center top-0 left-0 right-0 bottom-0 z-50 w-full md:inset-0 h-modal md:h-full">
            {/* <div className="relative w-full max-w-2xl h-full md:h-auto"> */}
            {/* ini yang ditambahin */}
            <div className="fixed inset-y-0 right-0 z-50 w-1/4 h-full md:h-auto overflow-y-auto w-1/3">
              {/* ini yang ditambahin */}
              <div className="relative bg-[#ECEEF6] min-h-screen rounded-l-lg shadow dark:bg-gray-700">
                <div className="flex justify-between items-start p-4 dark:border-gray-600">
                  <h3 className="text-xl font-semibold">Notification</h3>
                  <button
                    type="button"
                    className="bg-transparent hover:bg-green-600 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setShow(false)}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="p-6 space-y-6 items-center">
                  <div className="space-y-5">
                    <div className="space-y-3">
                      <h4>Today</h4>
                      <div className="grid grid-cols-6 p-3 bg-white rounded-lg">
                        <svg
                          width="20"
                          height="24"
                          viewBox="0 0 20 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.1272 5.5H12.8492C13.818 5.50144 14.7465 5.88728 15.4311 6.5728C16.1156 7.25833 16.5 8.18749 16.5 9.15625V19.3125C17.362 19.3125 18.1886 18.9701 18.7981 18.3606C19.4076 17.7511 19.75 16.9245 19.75 16.0625V5.617C19.75 3.98658 18.5313 2.57175 16.864 2.432C16.6211 2.41227 16.3781 2.39421 16.1349 2.37783C15.8607 1.84948 15.4467 1.40659 14.9379 1.09749C14.4292 0.788384 13.8453 0.624944 13.25 0.625H11.625C11.0298 0.624944 10.4459 0.788384 9.93715 1.09749C9.42841 1.40659 9.01434 1.84948 8.74011 2.37783C8.49636 2.39408 8.25261 2.4125 8.01103 2.432C6.38386 2.56958 5.18353 3.9205 5.1272 5.5ZM11.625 2.25C11.1941 2.25 10.7807 2.4212 10.476 2.72595C10.1712 3.0307 10 3.44402 10 3.875H14.875C14.875 3.44402 14.7038 3.0307 14.3991 2.72595C14.0943 2.4212 13.681 2.25 13.25 2.25H11.625Z"
                            fill="#FB8500"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0.25 9.15625C0.25 8.03392 1.16 7.125 2.28125 7.125H12.8438C13.9661 7.125 14.875 8.035 14.875 9.15625V21.3438C14.875 22.465 13.965 23.375 12.8438 23.375H2.28125C1.74253 23.375 1.22587 23.161 0.844939 22.7801C0.464006 22.3991 0.25 21.8825 0.25 21.3438V9.15625ZM3.5 12C3.5 11.7845 3.5856 11.5778 3.73798 11.4255C3.89035 11.2731 4.09701 11.1875 4.3125 11.1875H4.32117C4.53665 11.1875 4.74332 11.2731 4.89569 11.4255C5.04806 11.5778 5.13367 11.7845 5.13367 12V12.0087C5.13367 12.2242 5.04806 12.4308 4.89569 12.5832C4.74332 12.7356 4.53665 12.8212 4.32117 12.8212H4.3125C4.09701 12.8212 3.89035 12.7356 3.73798 12.5832C3.5856 12.4308 3.5 12.2242 3.5 12.0087V12ZM5.9375 12C5.9375 11.7845 6.0231 11.5778 6.17548 11.4255C6.32785 11.2731 6.53451 11.1875 6.75 11.1875H10.8125C11.028 11.1875 11.2347 11.2731 11.387 11.4255C11.5394 11.5778 11.625 11.7845 11.625 12C11.625 12.2155 11.5394 12.4222 11.387 12.5745C11.2347 12.7269 11.028 12.8125 10.8125 12.8125H6.75C6.53451 12.8125 6.32785 12.7269 6.17548 12.5745C6.0231 12.4222 5.9375 12.2155 5.9375 12ZM3.5 15.25C3.5 15.0345 3.5856 14.8278 3.73798 14.6755C3.89035 14.5231 4.09701 14.4375 4.3125 14.4375H4.32117C4.53665 14.4375 4.74332 14.5231 4.89569 14.6755C5.04806 14.8278 5.13367 15.0345 5.13367 15.25V15.2587C5.13367 15.4742 5.04806 15.6808 4.89569 15.8332C4.74332 15.9856 4.53665 16.0712 4.32117 16.0712H4.3125C4.09701 16.0712 3.89035 15.9856 3.73798 15.8332C3.5856 15.6808 3.5 15.4742 3.5 15.2587V15.25ZM5.9375 15.25C5.9375 15.0345 6.0231 14.8278 6.17548 14.6755C6.32785 14.5231 6.53451 14.4375 6.75 14.4375H10.8125C11.028 14.4375 11.2347 14.5231 11.387 14.6755C11.5394 14.8278 11.625 15.0345 11.625 15.25C11.625 15.4655 11.5394 15.6722 11.387 15.8245C11.2347 15.9769 11.028 16.0625 10.8125 16.0625H6.75C6.53451 16.0625 6.32785 15.9769 6.17548 15.8245C6.0231 15.6722 5.9375 15.4655 5.9375 15.25ZM3.5 18.5C3.5 18.2845 3.5856 18.0778 3.73798 17.9255C3.89035 17.7731 4.09701 17.6875 4.3125 17.6875H4.32117C4.53665 17.6875 4.74332 17.7731 4.89569 17.9255C5.04806 18.0778 5.13367 18.2845 5.13367 18.5V18.5087C5.13367 18.7242 5.04806 18.9308 4.89569 19.0832C4.74332 19.2356 4.53665 19.3212 4.32117 19.3212H4.3125C4.09701 19.3212 3.89035 19.2356 3.73798 19.0832C3.5856 18.9308 3.5 18.7242 3.5 18.5087V18.5ZM5.9375 18.5C5.9375 18.2845 6.0231 18.0778 6.17548 17.9255C6.32785 17.7731 6.53451 17.6875 6.75 17.6875H10.8125C11.028 17.6875 11.2347 17.7731 11.387 17.9255C11.5394 18.0778 11.625 18.2845 11.625 18.5C11.625 18.7155 11.5394 18.9222 11.387 19.0745C11.2347 19.2269 11.028 19.3125 10.8125 19.3125H6.75C6.53451 19.3125 6.32785 19.2269 6.17548 19.0745C6.0231 18.9222 5.9375 18.7155 5.9375 18.5Z"
                            fill="#FB8500"
                          />
                        </svg>

                        <div className="col-span-5">
                          You get a notification of a new job application
                        </div>
                      </div>
                      <div className="grid grid-cols-6 p-3 bg-white rounded-lg">
                        <svg
                          width="20"
                          height="24"
                          viewBox="0 0 20 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.1272 5.5H12.8492C13.818 5.50144 14.7465 5.88728 15.4311 6.5728C16.1156 7.25833 16.5 8.18749 16.5 9.15625V19.3125C17.362 19.3125 18.1886 18.9701 18.7981 18.3606C19.4076 17.7511 19.75 16.9245 19.75 16.0625V5.617C19.75 3.98658 18.5313 2.57175 16.864 2.432C16.6211 2.41227 16.3781 2.39421 16.1349 2.37783C15.8607 1.84948 15.4467 1.40659 14.9379 1.09749C14.4292 0.788384 13.8453 0.624944 13.25 0.625H11.625C11.0298 0.624944 10.4459 0.788384 9.93715 1.09749C9.42841 1.40659 9.01434 1.84948 8.74011 2.37783C8.49636 2.39408 8.25261 2.4125 8.01103 2.432C6.38386 2.56958 5.18353 3.9205 5.1272 5.5ZM11.625 2.25C11.1941 2.25 10.7807 2.4212 10.476 2.72595C10.1712 3.0307 10 3.44402 10 3.875H14.875C14.875 3.44402 14.7038 3.0307 14.3991 2.72595C14.0943 2.4212 13.681 2.25 13.25 2.25H11.625Z"
                            fill="#FB8500"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0.25 9.15625C0.25 8.03392 1.16 7.125 2.28125 7.125H12.8438C13.9661 7.125 14.875 8.035 14.875 9.15625V21.3438C14.875 22.465 13.965 23.375 12.8438 23.375H2.28125C1.74253 23.375 1.22587 23.161 0.844939 22.7801C0.464006 22.3991 0.25 21.8825 0.25 21.3438V9.15625ZM3.5 12C3.5 11.7845 3.5856 11.5778 3.73798 11.4255C3.89035 11.2731 4.09701 11.1875 4.3125 11.1875H4.32117C4.53665 11.1875 4.74332 11.2731 4.89569 11.4255C5.04806 11.5778 5.13367 11.7845 5.13367 12V12.0087C5.13367 12.2242 5.04806 12.4308 4.89569 12.5832C4.74332 12.7356 4.53665 12.8212 4.32117 12.8212H4.3125C4.09701 12.8212 3.89035 12.7356 3.73798 12.5832C3.5856 12.4308 3.5 12.2242 3.5 12.0087V12ZM5.9375 12C5.9375 11.7845 6.0231 11.5778 6.17548 11.4255C6.32785 11.2731 6.53451 11.1875 6.75 11.1875H10.8125C11.028 11.1875 11.2347 11.2731 11.387 11.4255C11.5394 11.5778 11.625 11.7845 11.625 12C11.625 12.2155 11.5394 12.4222 11.387 12.5745C11.2347 12.7269 11.028 12.8125 10.8125 12.8125H6.75C6.53451 12.8125 6.32785 12.7269 6.17548 12.5745C6.0231 12.4222 5.9375 12.2155 5.9375 12ZM3.5 15.25C3.5 15.0345 3.5856 14.8278 3.73798 14.6755C3.89035 14.5231 4.09701 14.4375 4.3125 14.4375H4.32117C4.53665 14.4375 4.74332 14.5231 4.89569 14.6755C5.04806 14.8278 5.13367 15.0345 5.13367 15.25V15.2587C5.13367 15.4742 5.04806 15.6808 4.89569 15.8332C4.74332 15.9856 4.53665 16.0712 4.32117 16.0712H4.3125C4.09701 16.0712 3.89035 15.9856 3.73798 15.8332C3.5856 15.6808 3.5 15.4742 3.5 15.2587V15.25ZM5.9375 15.25C5.9375 15.0345 6.0231 14.8278 6.17548 14.6755C6.32785 14.5231 6.53451 14.4375 6.75 14.4375H10.8125C11.028 14.4375 11.2347 14.5231 11.387 14.6755C11.5394 14.8278 11.625 15.0345 11.625 15.25C11.625 15.4655 11.5394 15.6722 11.387 15.8245C11.2347 15.9769 11.028 16.0625 10.8125 16.0625H6.75C6.53451 16.0625 6.32785 15.9769 6.17548 15.8245C6.0231 15.6722 5.9375 15.4655 5.9375 15.25ZM3.5 18.5C3.5 18.2845 3.5856 18.0778 3.73798 17.9255C3.89035 17.7731 4.09701 17.6875 4.3125 17.6875H4.32117C4.53665 17.6875 4.74332 17.7731 4.89569 17.9255C5.04806 18.0778 5.13367 18.2845 5.13367 18.5V18.5087C5.13367 18.7242 5.04806 18.9308 4.89569 19.0832C4.74332 19.2356 4.53665 19.3212 4.32117 19.3212H4.3125C4.09701 19.3212 3.89035 19.2356 3.73798 19.0832C3.5856 18.9308 3.5 18.7242 3.5 18.5087V18.5ZM5.9375 18.5C5.9375 18.2845 6.0231 18.0778 6.17548 17.9255C6.32785 17.7731 6.53451 17.6875 6.75 17.6875H10.8125C11.028 17.6875 11.2347 17.7731 11.387 17.9255C11.5394 18.0778 11.625 18.2845 11.625 18.5C11.625 18.7155 11.5394 18.9222 11.387 19.0745C11.2347 19.2269 11.028 19.3125 10.8125 19.3125H6.75C6.53451 19.3125 6.32785 19.2269 6.17548 19.0745C6.0231 18.9222 5.9375 18.7155 5.9375 18.5Z"
                            fill="#FB8500"
                          />
                        </svg>

                        <div className="col-span-5">
                          You get a notification of a new job application
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4>Friday 20 August, 2022</h4>
                      <div className="grid grid-cols-6 p-3 bg-white rounded-lg">
                        <svg
                          width="20"
                          height="24"
                          viewBox="0 0 20 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.1272 5.5H12.8492C13.818 5.50144 14.7465 5.88728 15.4311 6.5728C16.1156 7.25833 16.5 8.18749 16.5 9.15625V19.3125C17.362 19.3125 18.1886 18.9701 18.7981 18.3606C19.4076 17.7511 19.75 16.9245 19.75 16.0625V5.617C19.75 3.98658 18.5313 2.57175 16.864 2.432C16.6211 2.41227 16.3781 2.39421 16.1349 2.37783C15.8607 1.84948 15.4467 1.40659 14.9379 1.09749C14.4292 0.788384 13.8453 0.624944 13.25 0.625H11.625C11.0298 0.624944 10.4459 0.788384 9.93715 1.09749C9.42841 1.40659 9.01434 1.84948 8.74011 2.37783C8.49636 2.39408 8.25261 2.4125 8.01103 2.432C6.38386 2.56958 5.18353 3.9205 5.1272 5.5ZM11.625 2.25C11.1941 2.25 10.7807 2.4212 10.476 2.72595C10.1712 3.0307 10 3.44402 10 3.875H14.875C14.875 3.44402 14.7038 3.0307 14.3991 2.72595C14.0943 2.4212 13.681 2.25 13.25 2.25H11.625Z"
                            fill="#FB8500"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0.25 9.15625C0.25 8.03392 1.16 7.125 2.28125 7.125H12.8438C13.9661 7.125 14.875 8.035 14.875 9.15625V21.3438C14.875 22.465 13.965 23.375 12.8438 23.375H2.28125C1.74253 23.375 1.22587 23.161 0.844939 22.7801C0.464006 22.3991 0.25 21.8825 0.25 21.3438V9.15625ZM3.5 12C3.5 11.7845 3.5856 11.5778 3.73798 11.4255C3.89035 11.2731 4.09701 11.1875 4.3125 11.1875H4.32117C4.53665 11.1875 4.74332 11.2731 4.89569 11.4255C5.04806 11.5778 5.13367 11.7845 5.13367 12V12.0087C5.13367 12.2242 5.04806 12.4308 4.89569 12.5832C4.74332 12.7356 4.53665 12.8212 4.32117 12.8212H4.3125C4.09701 12.8212 3.89035 12.7356 3.73798 12.5832C3.5856 12.4308 3.5 12.2242 3.5 12.0087V12ZM5.9375 12C5.9375 11.7845 6.0231 11.5778 6.17548 11.4255C6.32785 11.2731 6.53451 11.1875 6.75 11.1875H10.8125C11.028 11.1875 11.2347 11.2731 11.387 11.4255C11.5394 11.5778 11.625 11.7845 11.625 12C11.625 12.2155 11.5394 12.4222 11.387 12.5745C11.2347 12.7269 11.028 12.8125 10.8125 12.8125H6.75C6.53451 12.8125 6.32785 12.7269 6.17548 12.5745C6.0231 12.4222 5.9375 12.2155 5.9375 12ZM3.5 15.25C3.5 15.0345 3.5856 14.8278 3.73798 14.6755C3.89035 14.5231 4.09701 14.4375 4.3125 14.4375H4.32117C4.53665 14.4375 4.74332 14.5231 4.89569 14.6755C5.04806 14.8278 5.13367 15.0345 5.13367 15.25V15.2587C5.13367 15.4742 5.04806 15.6808 4.89569 15.8332C4.74332 15.9856 4.53665 16.0712 4.32117 16.0712H4.3125C4.09701 16.0712 3.89035 15.9856 3.73798 15.8332C3.5856 15.6808 3.5 15.4742 3.5 15.2587V15.25ZM5.9375 15.25C5.9375 15.0345 6.0231 14.8278 6.17548 14.6755C6.32785 14.5231 6.53451 14.4375 6.75 14.4375H10.8125C11.028 14.4375 11.2347 14.5231 11.387 14.6755C11.5394 14.8278 11.625 15.0345 11.625 15.25C11.625 15.4655 11.5394 15.6722 11.387 15.8245C11.2347 15.9769 11.028 16.0625 10.8125 16.0625H6.75C6.53451 16.0625 6.32785 15.9769 6.17548 15.8245C6.0231 15.6722 5.9375 15.4655 5.9375 15.25ZM3.5 18.5C3.5 18.2845 3.5856 18.0778 3.73798 17.9255C3.89035 17.7731 4.09701 17.6875 4.3125 17.6875H4.32117C4.53665 17.6875 4.74332 17.7731 4.89569 17.9255C5.04806 18.0778 5.13367 18.2845 5.13367 18.5V18.5087C5.13367 18.7242 5.04806 18.9308 4.89569 19.0832C4.74332 19.2356 4.53665 19.3212 4.32117 19.3212H4.3125C4.09701 19.3212 3.89035 19.2356 3.73798 19.0832C3.5856 18.9308 3.5 18.7242 3.5 18.5087V18.5ZM5.9375 18.5C5.9375 18.2845 6.0231 18.0778 6.17548 17.9255C6.32785 17.7731 6.53451 17.6875 6.75 17.6875H10.8125C11.028 17.6875 11.2347 17.7731 11.387 17.9255C11.5394 18.0778 11.625 18.2845 11.625 18.5C11.625 18.7155 11.5394 18.9222 11.387 19.0745C11.2347 19.2269 11.028 19.3125 10.8125 19.3125H6.75C6.53451 19.3125 6.32785 19.2269 6.17548 19.0745C6.0231 18.9222 5.9375 18.7155 5.9375 18.5Z"
                            fill="#FB8500"
                          />
                        </svg>

                        <div className="col-span-5">
                          You get a notification of a new job application
                        </div>
                      </div>
                      <div className="grid grid-cols-6 p-3 bg-white rounded-lg">
                        <svg
                          width="20"
                          height="24"
                          viewBox="0 0 20 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.1272 5.5H12.8492C13.818 5.50144 14.7465 5.88728 15.4311 6.5728C16.1156 7.25833 16.5 8.18749 16.5 9.15625V19.3125C17.362 19.3125 18.1886 18.9701 18.7981 18.3606C19.4076 17.7511 19.75 16.9245 19.75 16.0625V5.617C19.75 3.98658 18.5313 2.57175 16.864 2.432C16.6211 2.41227 16.3781 2.39421 16.1349 2.37783C15.8607 1.84948 15.4467 1.40659 14.9379 1.09749C14.4292 0.788384 13.8453 0.624944 13.25 0.625H11.625C11.0298 0.624944 10.4459 0.788384 9.93715 1.09749C9.42841 1.40659 9.01434 1.84948 8.74011 2.37783C8.49636 2.39408 8.25261 2.4125 8.01103 2.432C6.38386 2.56958 5.18353 3.9205 5.1272 5.5ZM11.625 2.25C11.1941 2.25 10.7807 2.4212 10.476 2.72595C10.1712 3.0307 10 3.44402 10 3.875H14.875C14.875 3.44402 14.7038 3.0307 14.3991 2.72595C14.0943 2.4212 13.681 2.25 13.25 2.25H11.625Z"
                            fill="#FB8500"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0.25 9.15625C0.25 8.03392 1.16 7.125 2.28125 7.125H12.8438C13.9661 7.125 14.875 8.035 14.875 9.15625V21.3438C14.875 22.465 13.965 23.375 12.8438 23.375H2.28125C1.74253 23.375 1.22587 23.161 0.844939 22.7801C0.464006 22.3991 0.25 21.8825 0.25 21.3438V9.15625ZM3.5 12C3.5 11.7845 3.5856 11.5778 3.73798 11.4255C3.89035 11.2731 4.09701 11.1875 4.3125 11.1875H4.32117C4.53665 11.1875 4.74332 11.2731 4.89569 11.4255C5.04806 11.5778 5.13367 11.7845 5.13367 12V12.0087C5.13367 12.2242 5.04806 12.4308 4.89569 12.5832C4.74332 12.7356 4.53665 12.8212 4.32117 12.8212H4.3125C4.09701 12.8212 3.89035 12.7356 3.73798 12.5832C3.5856 12.4308 3.5 12.2242 3.5 12.0087V12ZM5.9375 12C5.9375 11.7845 6.0231 11.5778 6.17548 11.4255C6.32785 11.2731 6.53451 11.1875 6.75 11.1875H10.8125C11.028 11.1875 11.2347 11.2731 11.387 11.4255C11.5394 11.5778 11.625 11.7845 11.625 12C11.625 12.2155 11.5394 12.4222 11.387 12.5745C11.2347 12.7269 11.028 12.8125 10.8125 12.8125H6.75C6.53451 12.8125 6.32785 12.7269 6.17548 12.5745C6.0231 12.4222 5.9375 12.2155 5.9375 12ZM3.5 15.25C3.5 15.0345 3.5856 14.8278 3.73798 14.6755C3.89035 14.5231 4.09701 14.4375 4.3125 14.4375H4.32117C4.53665 14.4375 4.74332 14.5231 4.89569 14.6755C5.04806 14.8278 5.13367 15.0345 5.13367 15.25V15.2587C5.13367 15.4742 5.04806 15.6808 4.89569 15.8332C4.74332 15.9856 4.53665 16.0712 4.32117 16.0712H4.3125C4.09701 16.0712 3.89035 15.9856 3.73798 15.8332C3.5856 15.6808 3.5 15.4742 3.5 15.2587V15.25ZM5.9375 15.25C5.9375 15.0345 6.0231 14.8278 6.17548 14.6755C6.32785 14.5231 6.53451 14.4375 6.75 14.4375H10.8125C11.028 14.4375 11.2347 14.5231 11.387 14.6755C11.5394 14.8278 11.625 15.0345 11.625 15.25C11.625 15.4655 11.5394 15.6722 11.387 15.8245C11.2347 15.9769 11.028 16.0625 10.8125 16.0625H6.75C6.53451 16.0625 6.32785 15.9769 6.17548 15.8245C6.0231 15.6722 5.9375 15.4655 5.9375 15.25ZM3.5 18.5C3.5 18.2845 3.5856 18.0778 3.73798 17.9255C3.89035 17.7731 4.09701 17.6875 4.3125 17.6875H4.32117C4.53665 17.6875 4.74332 17.7731 4.89569 17.9255C5.04806 18.0778 5.13367 18.2845 5.13367 18.5V18.5087C5.13367 18.7242 5.04806 18.9308 4.89569 19.0832C4.74332 19.2356 4.53665 19.3212 4.32117 19.3212H4.3125C4.09701 19.3212 3.89035 19.2356 3.73798 19.0832C3.5856 18.9308 3.5 18.7242 3.5 18.5087V18.5ZM5.9375 18.5C5.9375 18.2845 6.0231 18.0778 6.17548 17.9255C6.32785 17.7731 6.53451 17.6875 6.75 17.6875H10.8125C11.028 17.6875 11.2347 17.7731 11.387 17.9255C11.5394 18.0778 11.625 18.2845 11.625 18.5C11.625 18.7155 11.5394 18.9222 11.387 19.0745C11.2347 19.2269 11.028 19.3125 10.8125 19.3125H6.75C6.53451 19.3125 6.32785 19.2269 6.17548 19.0745C6.0231 18.9222 5.9375 18.7155 5.9375 18.5Z"
                            fill="#FB8500"
                          />
                        </svg>

                        <div className="col-span-5">
                          You get a notification of a new job application
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4>Monday 16 August, 2022</h4>
                      <div className="grid grid-cols-6 p-3 bg-white rounded-lg">
                        <svg
                          width="20"
                          height="24"
                          viewBox="0 0 20 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.1272 5.5H12.8492C13.818 5.50144 14.7465 5.88728 15.4311 6.5728C16.1156 7.25833 16.5 8.18749 16.5 9.15625V19.3125C17.362 19.3125 18.1886 18.9701 18.7981 18.3606C19.4076 17.7511 19.75 16.9245 19.75 16.0625V5.617C19.75 3.98658 18.5313 2.57175 16.864 2.432C16.6211 2.41227 16.3781 2.39421 16.1349 2.37783C15.8607 1.84948 15.4467 1.40659 14.9379 1.09749C14.4292 0.788384 13.8453 0.624944 13.25 0.625H11.625C11.0298 0.624944 10.4459 0.788384 9.93715 1.09749C9.42841 1.40659 9.01434 1.84948 8.74011 2.37783C8.49636 2.39408 8.25261 2.4125 8.01103 2.432C6.38386 2.56958 5.18353 3.9205 5.1272 5.5ZM11.625 2.25C11.1941 2.25 10.7807 2.4212 10.476 2.72595C10.1712 3.0307 10 3.44402 10 3.875H14.875C14.875 3.44402 14.7038 3.0307 14.3991 2.72595C14.0943 2.4212 13.681 2.25 13.25 2.25H11.625Z"
                            fill="#FB8500"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0.25 9.15625C0.25 8.03392 1.16 7.125 2.28125 7.125H12.8438C13.9661 7.125 14.875 8.035 14.875 9.15625V21.3438C14.875 22.465 13.965 23.375 12.8438 23.375H2.28125C1.74253 23.375 1.22587 23.161 0.844939 22.7801C0.464006 22.3991 0.25 21.8825 0.25 21.3438V9.15625ZM3.5 12C3.5 11.7845 3.5856 11.5778 3.73798 11.4255C3.89035 11.2731 4.09701 11.1875 4.3125 11.1875H4.32117C4.53665 11.1875 4.74332 11.2731 4.89569 11.4255C5.04806 11.5778 5.13367 11.7845 5.13367 12V12.0087C5.13367 12.2242 5.04806 12.4308 4.89569 12.5832C4.74332 12.7356 4.53665 12.8212 4.32117 12.8212H4.3125C4.09701 12.8212 3.89035 12.7356 3.73798 12.5832C3.5856 12.4308 3.5 12.2242 3.5 12.0087V12ZM5.9375 12C5.9375 11.7845 6.0231 11.5778 6.17548 11.4255C6.32785 11.2731 6.53451 11.1875 6.75 11.1875H10.8125C11.028 11.1875 11.2347 11.2731 11.387 11.4255C11.5394 11.5778 11.625 11.7845 11.625 12C11.625 12.2155 11.5394 12.4222 11.387 12.5745C11.2347 12.7269 11.028 12.8125 10.8125 12.8125H6.75C6.53451 12.8125 6.32785 12.7269 6.17548 12.5745C6.0231 12.4222 5.9375 12.2155 5.9375 12ZM3.5 15.25C3.5 15.0345 3.5856 14.8278 3.73798 14.6755C3.89035 14.5231 4.09701 14.4375 4.3125 14.4375H4.32117C4.53665 14.4375 4.74332 14.5231 4.89569 14.6755C5.04806 14.8278 5.13367 15.0345 5.13367 15.25V15.2587C5.13367 15.4742 5.04806 15.6808 4.89569 15.8332C4.74332 15.9856 4.53665 16.0712 4.32117 16.0712H4.3125C4.09701 16.0712 3.89035 15.9856 3.73798 15.8332C3.5856 15.6808 3.5 15.4742 3.5 15.2587V15.25ZM5.9375 15.25C5.9375 15.0345 6.0231 14.8278 6.17548 14.6755C6.32785 14.5231 6.53451 14.4375 6.75 14.4375H10.8125C11.028 14.4375 11.2347 14.5231 11.387 14.6755C11.5394 14.8278 11.625 15.0345 11.625 15.25C11.625 15.4655 11.5394 15.6722 11.387 15.8245C11.2347 15.9769 11.028 16.0625 10.8125 16.0625H6.75C6.53451 16.0625 6.32785 15.9769 6.17548 15.8245C6.0231 15.6722 5.9375 15.4655 5.9375 15.25ZM3.5 18.5C3.5 18.2845 3.5856 18.0778 3.73798 17.9255C3.89035 17.7731 4.09701 17.6875 4.3125 17.6875H4.32117C4.53665 17.6875 4.74332 17.7731 4.89569 17.9255C5.04806 18.0778 5.13367 18.2845 5.13367 18.5V18.5087C5.13367 18.7242 5.04806 18.9308 4.89569 19.0832C4.74332 19.2356 4.53665 19.3212 4.32117 19.3212H4.3125C4.09701 19.3212 3.89035 19.2356 3.73798 19.0832C3.5856 18.9308 3.5 18.7242 3.5 18.5087V18.5ZM5.9375 18.5C5.9375 18.2845 6.0231 18.0778 6.17548 17.9255C6.32785 17.7731 6.53451 17.6875 6.75 17.6875H10.8125C11.028 17.6875 11.2347 17.7731 11.387 17.9255C11.5394 18.0778 11.625 18.2845 11.625 18.5C11.625 18.7155 11.5394 18.9222 11.387 19.0745C11.2347 19.2269 11.028 19.3125 10.8125 19.3125H6.75C6.53451 19.3125 6.32785 19.2269 6.17548 19.0745C6.0231 18.9222 5.9375 18.7155 5.9375 18.5Z"
                            fill="#FB8500"
                          />
                        </svg>

                        <div className="col-span-5">
                          You get a notification of a new job application
                        </div>
                      </div>
                      <div className="grid grid-cols-6 p-3 bg-white rounded-lg">
                        <svg
                          width="20"
                          height="24"
                          viewBox="0 0 20 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.1272 5.5H12.8492C13.818 5.50144 14.7465 5.88728 15.4311 6.5728C16.1156 7.25833 16.5 8.18749 16.5 9.15625V19.3125C17.362 19.3125 18.1886 18.9701 18.7981 18.3606C19.4076 17.7511 19.75 16.9245 19.75 16.0625V5.617C19.75 3.98658 18.5313 2.57175 16.864 2.432C16.6211 2.41227 16.3781 2.39421 16.1349 2.37783C15.8607 1.84948 15.4467 1.40659 14.9379 1.09749C14.4292 0.788384 13.8453 0.624944 13.25 0.625H11.625C11.0298 0.624944 10.4459 0.788384 9.93715 1.09749C9.42841 1.40659 9.01434 1.84948 8.74011 2.37783C8.49636 2.39408 8.25261 2.4125 8.01103 2.432C6.38386 2.56958 5.18353 3.9205 5.1272 5.5ZM11.625 2.25C11.1941 2.25 10.7807 2.4212 10.476 2.72595C10.1712 3.0307 10 3.44402 10 3.875H14.875C14.875 3.44402 14.7038 3.0307 14.3991 2.72595C14.0943 2.4212 13.681 2.25 13.25 2.25H11.625Z"
                            fill="#FB8500"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0.25 9.15625C0.25 8.03392 1.16 7.125 2.28125 7.125H12.8438C13.9661 7.125 14.875 8.035 14.875 9.15625V21.3438C14.875 22.465 13.965 23.375 12.8438 23.375H2.28125C1.74253 23.375 1.22587 23.161 0.844939 22.7801C0.464006 22.3991 0.25 21.8825 0.25 21.3438V9.15625ZM3.5 12C3.5 11.7845 3.5856 11.5778 3.73798 11.4255C3.89035 11.2731 4.09701 11.1875 4.3125 11.1875H4.32117C4.53665 11.1875 4.74332 11.2731 4.89569 11.4255C5.04806 11.5778 5.13367 11.7845 5.13367 12V12.0087C5.13367 12.2242 5.04806 12.4308 4.89569 12.5832C4.74332 12.7356 4.53665 12.8212 4.32117 12.8212H4.3125C4.09701 12.8212 3.89035 12.7356 3.73798 12.5832C3.5856 12.4308 3.5 12.2242 3.5 12.0087V12ZM5.9375 12C5.9375 11.7845 6.0231 11.5778 6.17548 11.4255C6.32785 11.2731 6.53451 11.1875 6.75 11.1875H10.8125C11.028 11.1875 11.2347 11.2731 11.387 11.4255C11.5394 11.5778 11.625 11.7845 11.625 12C11.625 12.2155 11.5394 12.4222 11.387 12.5745C11.2347 12.7269 11.028 12.8125 10.8125 12.8125H6.75C6.53451 12.8125 6.32785 12.7269 6.17548 12.5745C6.0231 12.4222 5.9375 12.2155 5.9375 12ZM3.5 15.25C3.5 15.0345 3.5856 14.8278 3.73798 14.6755C3.89035 14.5231 4.09701 14.4375 4.3125 14.4375H4.32117C4.53665 14.4375 4.74332 14.5231 4.89569 14.6755C5.04806 14.8278 5.13367 15.0345 5.13367 15.25V15.2587C5.13367 15.4742 5.04806 15.6808 4.89569 15.8332C4.74332 15.9856 4.53665 16.0712 4.32117 16.0712H4.3125C4.09701 16.0712 3.89035 15.9856 3.73798 15.8332C3.5856 15.6808 3.5 15.4742 3.5 15.2587V15.25ZM5.9375 15.25C5.9375 15.0345 6.0231 14.8278 6.17548 14.6755C6.32785 14.5231 6.53451 14.4375 6.75 14.4375H10.8125C11.028 14.4375 11.2347 14.5231 11.387 14.6755C11.5394 14.8278 11.625 15.0345 11.625 15.25C11.625 15.4655 11.5394 15.6722 11.387 15.8245C11.2347 15.9769 11.028 16.0625 10.8125 16.0625H6.75C6.53451 16.0625 6.32785 15.9769 6.17548 15.8245C6.0231 15.6722 5.9375 15.4655 5.9375 15.25ZM3.5 18.5C3.5 18.2845 3.5856 18.0778 3.73798 17.9255C3.89035 17.7731 4.09701 17.6875 4.3125 17.6875H4.32117C4.53665 17.6875 4.74332 17.7731 4.89569 17.9255C5.04806 18.0778 5.13367 18.2845 5.13367 18.5V18.5087C5.13367 18.7242 5.04806 18.9308 4.89569 19.0832C4.74332 19.2356 4.53665 19.3212 4.32117 19.3212H4.3125C4.09701 19.3212 3.89035 19.2356 3.73798 19.0832C3.5856 18.9308 3.5 18.7242 3.5 18.5087V18.5ZM5.9375 18.5C5.9375 18.2845 6.0231 18.0778 6.17548 17.9255C6.32785 17.7731 6.53451 17.6875 6.75 17.6875H10.8125C11.028 17.6875 11.2347 17.7731 11.387 17.9255C11.5394 18.0778 11.625 18.2845 11.625 18.5C11.625 18.7155 11.5394 18.9222 11.387 19.0745C11.2347 19.2269 11.028 19.3125 10.8125 19.3125H6.75C6.53451 19.3125 6.32785 19.2269 6.17548 19.0745C6.0231 18.9222 5.9375 18.7155 5.9375 18.5Z"
                            fill="#FB8500"
                          />
                        </svg>

                        <div className="col-span-5">
                          You get a notification of a new job application
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      <ModalSignOut
        close={() => {
          setSignOut(false);
        }}
        submit={() => {
          window.localStorage.clear();
          window.location.href = "/";
          setUsers({});
          setSignOut(false);
        }}
        active={issignout}
      />
    </div>
  );
}

export default Template;
