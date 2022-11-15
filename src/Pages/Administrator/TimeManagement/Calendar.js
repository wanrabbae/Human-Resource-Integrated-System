import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useMemo, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "../../App.css";
import Icon from "@mdi/react";
// import "../../Resource/style.css";
import { mdiCalendarMonth, mdiPlusCircle } from "@mdi/js";
import { Table, Modal, Button } from "react-bootstrap";
import { ListItemButton, ListItemText, Typography } from "@mui/material";
import {
  AddEvent,
  AddTodo,
  DeleteEvent,
  DeleteTodo,
  GetEvent,
  GetTodo,
  UpdateEvent,
  UpdateTodo,
} from "../../../Repository/TimeManagementRepository";
import dateFormat from "dateformat";
import { ModalDelete } from "../../../Components/Modals";
import { Details } from "@mui/icons-material";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Big Meeting",
    allDay: false,
    start: "10-10-2022 13:00:00",
    end: "10-10-2022 13:00:00",
  },
  {
    title: "Vacation",
    allDay: false,
    start: "11-10-2022 13:00:00",
    end: "12-10-2022 14:00:00",
  },
  {
    title: "Conference",
    allDay: false,
    start: "12-12-2022 13:00:00",
    end: "12-12-2022 13:00:00",
  },
];

function Cal() {
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    location: "",
    email: "",
  });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent], setShow(false));
  }

  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [showEditEvent, setShowEditEvent] = useState(false);
  const [showEditTodo, setShowEditTodo] = useState(false);
  const [dataEvent, setDataEvent] = useState([]);
  const [dataTodo, setDataTodo] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseEvent = () => setShowEditEvent(false);
  const handleShowEvent = () => setShowEditEvent(true);

  const handleCloseTodo = () => setShowEditTodo(false);
  const handleShowTodo = () => setShowEditTodo(true);

  const [isdeleteEvent, setDeleteEvent] = useState(false);
  const [isdeleteTodo, setDeleteTodo] = useState(false);

  const [title, setTitle] = useState([]);
  const [date, setDate] = useState([]);
  const [start, setStart] = useState([]);
  const [end, setEnd] = useState([]);
  const [location, setLocation] = useState([]);
  const [email, setEmail] = useState([]);

  const [editTitle, setEditTitle] = useState([]);
  const [editDate, setEditDate] = useState([]);
  const [editStart, setEditStart] = useState([]);
  const [editEnd, setEditEnd] = useState([]);
  const [editLocation, setEditLocation] = useState([]);
  const [editEmail, setEditEmail] = useState([]);

  const [titleTodo, setTitleTodo] = useState([]);
  const [dateTodo, setDateTodo] = useState([]);
  const [time, setTime] = useState([]);
  const [emailTodo, setEmailTodo] = useState([]);
  const [detail, setDetail] = useState([]);

  const [editTitleTodo, setEditTitleTodo] = useState([]);
  const [editDateTodo, setEditDateTodo] = useState([]);
  const [editTime, setEditTime] = useState([]);
  const [editEmailTodo, setEditEmailTodo] = useState([]);
  const [editDetail, setEditDetail] = useState([]);

  const [id, setId] = useState([]);

  const postData = async () => {
    var requestBody = {
      title: title,
      date: date,
      start: start,
      end: end,
      location: location,
      calendar: email,
    };
    console.log(requestBody);
    var res = await AddEvent(requestBody);
    console.log(res);
    handleClose();
    inAwait();
  };

  const editData = async () => {
    var requestBody = {
      id: id,
      title: editTitle,
      date: editDate,
      start: editStart,
      end: editEnd,
      location: editLocation,
      calendar: editEmail,
    };
    console.log(requestBody);
    var res = await UpdateEvent(requestBody);
    console.log(res);
    handleCloseEvent();
    inAwait();
  };
  const postDataTodo = async () => {
    var requestBody = {
      title: titleTodo,
      date: dateTodo,
      time: time,
      calendar: emailTodo,
      details: detail,
    };
    console.log(requestBody);
    var res = await AddTodo(requestBody);
    console.log(res);
    handleClose();
    inAwait();
  };
  const editDataTodo = async () => {
    var requestBody = {
      id: id,
      title: editTitleTodo,
      date: editDateTodo,
      time: editTime,
      calendar: editEmailTodo,
      details: editDetail,
    };
    console.log(requestBody);
    var res = await UpdateTodo(requestBody);
    console.log(res);
    handleCloseTodo();
    inAwait();
  };

  const inAwait = async () => {
    var dataA = await GetEvent();
    console.log(dataA);
    setDataEvent(dataA);
    var dataB = await GetTodo();
    // console.log(dataB.result);
    setDataTodo(dataB.result);
  };

  useEffect(() => {
    inAwait();
  }, []);

  const timeEvent = (data) => {
    var data = data.split(" ");
    return data[1];
  };
  const dateEvent = (data) => {
    var data = data.split(" ");
    return data[0];
  };

  const { views, ...otherProps } = useMemo(
    () => ({
      views: {
        month: true,
        agenda: true,
      },
    }),
    []
  );
  return (
    <>
      <div className="w-100 bg-[#FFFFFF] p-4 rounded-t-xl grid grid-cols-5">
        <div className="col-span-4 px-3">
          {/* <CustomHead
        icon={mdiCalendarMonth}
        title="Calendar"
        subtitle="Lorem Ipsum Dolor Amet"
      /> */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold">Calendar</h1>
            <p className="text-sm font-light">
              Manage our events and stay up to date informations{" "}
            </p>
          </div>
          <Calendar
            className="mt-5"
            views={views}
            localizer={localizer}
            events={dataEvent}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </div>
        <div className="space-y-5 mt-28">
          <div className="">
            <Button
              className="btn custom-btn-admin"
              variant="outline-dark"
              onClick={handleShow}
            >
              <Icon
                style={{ position: "absolute" }}
                path={mdiPlusCircle}
                size="20px"
                title="New Event"
              />
              <span style={{ position: "relative", marginLeft: "30px" }}>
                New Event
              </span>
            </Button>
          </div>
          <h2 className="text-xl font-bold">Events</h2>
          <div className="overflow-y-auto h-screen space-y-5">
            {dataEvent &&
              dataEvent.map((val, index) => (
                <div key={index}>
                  <p>
                    {dateFormat(dateEvent(val.start), "fullDate")} -{" "}
                    {dateFormat(dateEvent(val.end), "fullDate")}
                  </p>
                  {val.category == "event" ? (
                    <div className="bg-red-100 p-2 rounded-lg flex flex-col gap-2">
                      <div className="flex gap-2">
                        <svg
                          width="24"
                          height="20"
                          viewBox="0 0 14 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.25 4.75H3.75V4.5H5.25V4.75ZM10.25 9.125H3.75V8.875H10.25V9.125ZM10.25 11.625H3.75V11.375H10.25V11.625ZM5.25 14.125H3.75V13.875H5.25V14.125ZM12.7955 1.3295C12.7083 1.24235 12.6084 1.17098 12.5 1.11722V0.844131C12.6754 0.9126 12.8366 1.01701 12.9723 1.15273C13.108 1.28844 13.2124 1.4496 13.2809 1.625H13.0078C12.954 1.51663 12.8826 1.41666 12.7955 1.3295ZM13.125 2.625H13.375V15.375H13.125V2.625ZM13.0078 16.375H13.2809C13.2124 16.5504 13.108 16.7116 12.9723 16.8473C12.8366 16.983 12.6754 17.0874 12.5 17.1559V16.8828C12.6084 16.829 12.7083 16.7576 12.7955 16.6705C12.8826 16.5833 12.954 16.4834 13.0078 16.375ZM11.5 17V17.25H2.5V17H11.5ZM1.5 16.8828V17.1559C1.3246 17.0874 1.16344 16.983 1.02773 16.8473C0.892014 16.7116 0.7876 16.5504 0.719131 16.375H0.992217C1.04598 16.4834 1.11735 16.5833 1.2045 16.6705C1.29166 16.7576 1.39163 16.829 1.5 16.8828ZM11.5 1H2.5V0.75H11.5V1ZM1.2045 1.3295C1.11735 1.41666 1.04598 1.51663 0.992217 1.625H0.719131C0.7876 1.4496 0.892014 1.28844 1.02773 1.15273C1.16344 1.01701 1.3246 0.9126 1.5 0.844131V1.11722C1.39163 1.17098 1.29166 1.24235 1.2045 1.3295ZM0.875 2.625V15.375H0.625V2.625H0.875Z"
                            fill="#282828"
                            stroke="#5C5C5C"
                          />
                          <path
                            d="M10.75 4.9375C10.9226 4.9375 11.0625 4.79759 11.0625 4.625C11.0625 4.45241 10.9226 4.3125 10.75 4.3125C10.5774 4.3125 10.4375 4.45241 10.4375 4.625C10.4375 4.79759 10.5774 4.9375 10.75 4.9375Z"
                            fill="#282828"
                            stroke="#5C5C5C"
                          />
                        </svg>

                        <p className="text-sm">{val.title}</p>
                      </div>
                      <div className="flex gap-2">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.0003 3.33335C13.6762 3.33335 16.667 6.32419 16.667 10C16.667 13.6759 13.6762 16.6667 10.0003 16.6667C6.32449 16.6667 3.33366 13.6759 3.33366 10C3.33366 6.32419 6.32449 3.33335 10.0003 3.33335ZM10.0003 1.66669C5.39783 1.66669 1.66699 5.39752 1.66699 10C1.66699 14.6025 5.39783 18.3334 10.0003 18.3334C14.6028 18.3334 18.3337 14.6025 18.3337 10C18.3337 5.39752 14.6028 1.66669 10.0003 1.66669ZM13.167 12.8334L10.8337 9.72252V5.83335H9.16699V10.2775L11.8337 13.8325L13.167 12.8334Z"
                            fill="#5C5C5C"
                          />
                        </svg>

                        <p className="text-sm">
                          {timeEvent(val.start)} - {timeEvent(val.end)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 9.375C11.3807 9.375 12.5 8.25571 12.5 6.875C12.5 5.49429 11.3807 4.375 10 4.375C8.61929 4.375 7.5 5.49429 7.5 6.875C7.5 8.25571 8.61929 9.375 10 9.375Z"
                            stroke="#5C5C5C"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M14.9999 9.375C13.1249 13.75 9.99991 18.75 9.99991 18.75C9.99991 18.75 6.87491 13.75 4.99991 9.375C3.12491 5 6.24991 1.25 9.99991 1.25C13.7499 1.25 16.8749 5 14.9999 9.375Z"
                            stroke="#5C5C5C"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>

                        <p className="text-sm">{val.location}</p>
                      </div>
                      <div className="flex gap-2 self-end">
                        <button
                          className="bg-blue-900 rounded-full p-2"
                          onClick={() => {
                            handleShowEvent();
                            setId(val.id);
                            setEditTitle(val.title);
                            setEditDate(val.date);
                            setEditStart(val.start);
                            setEditEnd(val.end);
                            setEditLocation(val.location);
                            setEditEmail(val.calendar);
                          }}
                        >
                          <svg
                            width="17"
                            height="17"
                            viewBox="0 0 17 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_2902_11509)">
                              <mask
                                id="path-1-inside-1_2902_11509"
                                fill="white"
                              >
                                <path d="M15.0116 4.44563L12.534 1.95101C12.3703 1.78783 12.1487 1.69623 11.9178 1.69623C11.6868 1.69623 11.4653 1.78783 11.3016 1.95101L2.51829 10.7371L1.71636 14.2042C1.68869 14.331 1.68964 14.4623 1.71913 14.5886C1.74862 14.715 1.80591 14.8331 1.88682 14.9344C1.96772 15.0357 2.07019 15.1176 2.18674 15.1742C2.3033 15.2307 2.43099 15.2605 2.5605 15.2613C2.62084 15.2674 2.68165 15.2674 2.74199 15.2613L6.24095 14.4579L15.0116 5.68025C15.1745 5.51624 15.2659 5.2943 15.2659 5.06294C15.2659 4.83158 15.1745 4.60964 15.0116 4.44563ZM5.81888 13.6968L2.53939 14.386L3.28646 11.1642L9.8581 4.6063L12.3905 7.1432L5.81888 13.6968ZM12.9561 6.53011L10.4237 3.99321L11.8925 2.53027L14.3827 5.06717L12.9561 6.53011Z" />
                              </mask>
                              <path
                                d="M15.0116 4.44563L12.534 1.95101C12.3703 1.78783 12.1487 1.69623 11.9178 1.69623C11.6868 1.69623 11.4653 1.78783 11.3016 1.95101L2.51829 10.7371L1.71636 14.2042C1.68869 14.331 1.68964 14.4623 1.71913 14.5886C1.74862 14.715 1.80591 14.8331 1.88682 14.9344C1.96772 15.0357 2.07019 15.1176 2.18674 15.1742C2.3033 15.2307 2.43099 15.2605 2.5605 15.2613C2.62084 15.2674 2.68165 15.2674 2.74199 15.2613L6.24095 14.4579L15.0116 5.68025C15.1745 5.51624 15.2659 5.2943 15.2659 5.06294C15.2659 4.83158 15.1745 4.60964 15.0116 4.44563ZM5.81888 13.6968L2.53939 14.386L3.28646 11.1642L9.8581 4.6063L12.3905 7.1432L5.81888 13.6968ZM12.9561 6.53011L10.4237 3.99321L11.8925 2.53027L14.3827 5.06717L12.9561 6.53011Z"
                                fill="#EDEDED"
                              />
                              <path
                                d="M12.534 1.95101L13.3855 1.10539L13.3811 1.10109L12.534 1.95101ZM11.3016 1.95101L10.4544 1.10108L10.4529 1.10262L11.3016 1.95101ZM2.51829 10.7371L1.66963 9.88874L1.42662 10.1318L1.34916 10.4667L2.51829 10.7371ZM1.71636 14.2042L0.547223 13.9338L0.545547 13.9411L0.54396 13.9483L1.71636 14.2042ZM2.5605 15.2613L2.68127 14.0674L2.62466 14.0616L2.56776 14.0613L2.5605 15.2613ZM2.74199 15.2613L2.86276 16.4552L2.9374 16.4476L3.01052 16.4308L2.74199 15.2613ZM6.24095 14.4579L6.50948 15.6275L6.84587 15.5503L7.08982 15.3061L6.24095 14.4579ZM15.0116 5.68025L15.8604 6.52844L15.863 6.52588L15.0116 5.68025ZM5.81888 13.6968L6.06567 14.8712L6.41413 14.798L6.66625 14.5465L5.81888 13.6968ZM2.53939 14.386L1.37041 14.115L0.945566 15.9472L2.78619 15.5604L2.53939 14.386ZM3.28646 11.1642L2.43882 10.3148L2.19521 10.5579L2.11747 10.8931L3.28646 11.1642ZM9.8581 4.6063L10.7074 3.75852L9.85973 2.90938L9.01046 3.75688L9.8581 4.6063ZM12.3905 7.1432L13.2379 7.99289L14.088 7.14511L13.2398 6.29542L12.3905 7.1432ZM12.9561 6.53011L12.1068 7.37789L12.9661 8.23868L13.8152 7.3679L12.9561 6.53011ZM10.4237 3.99321L9.57684 3.14299L8.72567 3.99077L9.57439 4.84099L10.4237 3.99321ZM11.8925 2.53027L12.7488 1.68966L11.9021 0.827024L11.0456 1.68005L11.8925 2.53027ZM14.3827 5.06717L15.2418 5.90496L16.0615 5.0644L15.2391 4.22656L14.3827 5.06717ZM15.863 3.60002L13.3855 1.1054L11.6826 2.79662L14.1601 5.29124L15.863 3.60002ZM13.3811 1.10109C12.9927 0.71394 12.4666 0.496228 11.9178 0.496228V2.89623C11.8309 2.89623 11.7479 2.86172 11.6869 2.80094L13.3811 1.10109ZM11.9178 0.496228C11.369 0.496228 10.8429 0.713939 10.4544 1.10109L12.1487 2.80094C12.0877 2.86172 12.0047 2.89623 11.9178 2.89623V0.496228ZM10.4529 1.10262L1.66963 9.88874L3.36696 11.5855L12.1502 2.7994L10.4529 1.10262ZM1.34916 10.4667L0.547223 13.9338L2.88549 14.4746L3.68742 11.0076L1.34916 10.4667ZM0.54396 13.9483C0.478246 14.2494 0.480498 14.5613 0.550554 14.8614L2.88771 14.3158C2.89879 14.3633 2.89914 14.4125 2.88875 14.4601L0.54396 13.9483ZM0.550554 14.8614C0.620612 15.1615 0.756738 15.4423 0.949128 15.6832L2.8245 14.1856C2.85509 14.2239 2.87664 14.2684 2.88771 14.3158L0.550554 14.8614ZM0.949128 15.6832C1.14153 15.9241 1.38536 16.1191 1.6629 16.2538L2.71059 14.0946C2.75502 14.1161 2.79391 14.1473 2.8245 14.1856L0.949128 15.6832ZM1.6629 16.2538C1.94045 16.3885 2.24464 16.4594 2.55323 16.4612L2.56776 14.0613C2.61734 14.0616 2.66614 14.073 2.71059 14.0946L1.6629 16.2538ZM2.43973 16.4552C2.58038 16.4694 2.72211 16.4694 2.86276 16.4552L2.62122 14.0674C2.64118 14.0653 2.6613 14.0653 2.68127 14.0674L2.43973 16.4552ZM3.01052 16.4308L6.50948 15.6275L5.97242 13.2883L2.47346 14.0917L3.01052 16.4308ZM7.08982 15.3061L15.8604 6.52844L14.1627 4.83206L5.39208 13.6097L7.08982 15.3061ZM15.863 6.52588C16.2494 6.13684 16.4659 5.61083 16.4659 5.06294H14.0659C14.0659 4.97777 14.0996 4.89564 14.1602 4.83463L15.863 6.52588ZM16.4659 5.06294C16.4659 4.51505 16.2494 3.98903 15.863 3.6L14.1602 5.29125C14.0996 5.23024 14.0659 5.14811 14.0659 5.06294H16.4659ZM5.57209 12.5225L2.2926 13.2117L2.78619 15.5604L6.06567 14.8712L5.57209 12.5225ZM3.70838 14.6571L4.45545 11.4352L2.11747 10.8931L1.37041 14.115L3.70838 14.6571ZM4.1341 12.0136L10.7057 5.45571L9.01046 3.75688L2.43882 10.3148L4.1341 12.0136ZM9.00882 5.45408L11.5412 7.99097L13.2398 6.29542L10.7074 3.75852L9.00882 5.45408ZM11.5432 6.29351L4.97152 12.8472L6.66625 14.5465L13.2379 7.99289L11.5432 6.29351ZM13.8054 5.68233L11.2729 3.14544L9.57439 4.84099L12.1068 7.37789L13.8054 5.68233ZM11.2705 4.84344L12.7393 3.38049L11.0456 1.68005L9.57684 3.14299L11.2705 4.84344ZM11.0361 3.37088L13.5263 5.90778L15.2391 4.22656L12.7488 1.68966L11.0361 3.37088ZM13.5236 4.22938L12.097 5.69232L13.8152 7.3679L15.2418 5.90496L13.5236 4.22938Z"
                                fill="#EDEDED"
                                mask="url(#path-1-inside-1_2902_11509)"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_2902_11509">
                                <rect
                                  width="16.962"
                                  height="16.962"
                                  fill="white"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                        <button
                          className="bg-blue-900 rounded-full p-2"
                          onClick={() => {
                            setId(val.id);
                            setDeleteEvent(true);
                          }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.90793 2.50842H4.79887C4.85885 2.50842 4.90793 2.45934 4.90793 2.39936V2.50842H9.0523V2.39936C9.0523 2.45934 9.10138 2.50842 9.16137 2.50842H9.0523V3.48998H10.0339V2.39936C10.0339 1.91812 9.64261 1.52686 9.16137 1.52686H4.79887C4.31763 1.52686 3.92637 1.91812 3.92637 2.39936V3.48998H4.90793V2.50842ZM11.7789 3.48998H2.18137C1.94007 3.48998 1.74512 3.68493 1.74512 3.92623V4.36248C1.74512 4.42246 1.7942 4.47154 1.85418 4.47154H2.6776L3.01433 11.6015C3.03614 12.0664 3.42059 12.4331 3.88547 12.4331H10.0748C10.541 12.4331 10.9241 12.0677 10.9459 11.6015L11.2826 4.47154H12.1061C12.166 4.47154 12.2151 4.42246 12.2151 4.36248V3.92623C12.2151 3.68493 12.0202 3.48998 11.7789 3.48998ZM9.96979 11.4515H3.99044L3.66053 4.47154H10.2997L9.96979 11.4515Z"
                              fill="#EDEDED"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-blue-100 p-2 rounded-lg flex flex-col gap-2">
                      <div className="flex gap-2">
                        <svg
                          width="24"
                          height="20"
                          viewBox="0 0 14 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.25 4.75H3.75V4.5H5.25V4.75ZM10.25 9.125H3.75V8.875H10.25V9.125ZM10.25 11.625H3.75V11.375H10.25V11.625ZM5.25 14.125H3.75V13.875H5.25V14.125ZM12.7955 1.3295C12.7083 1.24235 12.6084 1.17098 12.5 1.11722V0.844131C12.6754 0.9126 12.8366 1.01701 12.9723 1.15273C13.108 1.28844 13.2124 1.4496 13.2809 1.625H13.0078C12.954 1.51663 12.8826 1.41666 12.7955 1.3295ZM13.125 2.625H13.375V15.375H13.125V2.625ZM13.0078 16.375H13.2809C13.2124 16.5504 13.108 16.7116 12.9723 16.8473C12.8366 16.983 12.6754 17.0874 12.5 17.1559V16.8828C12.6084 16.829 12.7083 16.7576 12.7955 16.6705C12.8826 16.5833 12.954 16.4834 13.0078 16.375ZM11.5 17V17.25H2.5V17H11.5ZM1.5 16.8828V17.1559C1.3246 17.0874 1.16344 16.983 1.02773 16.8473C0.892014 16.7116 0.7876 16.5504 0.719131 16.375H0.992217C1.04598 16.4834 1.11735 16.5833 1.2045 16.6705C1.29166 16.7576 1.39163 16.829 1.5 16.8828ZM11.5 1H2.5V0.75H11.5V1ZM1.2045 1.3295C1.11735 1.41666 1.04598 1.51663 0.992217 1.625H0.719131C0.7876 1.4496 0.892014 1.28844 1.02773 1.15273C1.16344 1.01701 1.3246 0.9126 1.5 0.844131V1.11722C1.39163 1.17098 1.29166 1.24235 1.2045 1.3295ZM0.875 2.625V15.375H0.625V2.625H0.875Z"
                            fill="#282828"
                            stroke="#5C5C5C"
                          />
                          <path
                            d="M10.75 4.9375C10.9226 4.9375 11.0625 4.79759 11.0625 4.625C11.0625 4.45241 10.9226 4.3125 10.75 4.3125C10.5774 4.3125 10.4375 4.45241 10.4375 4.625C10.4375 4.79759 10.5774 4.9375 10.75 4.9375Z"
                            fill="#282828"
                            stroke="#5C5C5C"
                          />
                        </svg>

                        <p className="text-sm">{val.title}</p>
                      </div>
                      <div className="flex gap-2">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.0003 3.33335C13.6762 3.33335 16.667 6.32419 16.667 10C16.667 13.6759 13.6762 16.6667 10.0003 16.6667C6.32449 16.6667 3.33366 13.6759 3.33366 10C3.33366 6.32419 6.32449 3.33335 10.0003 3.33335ZM10.0003 1.66669C5.39783 1.66669 1.66699 5.39752 1.66699 10C1.66699 14.6025 5.39783 18.3334 10.0003 18.3334C14.6028 18.3334 18.3337 14.6025 18.3337 10C18.3337 5.39752 14.6028 1.66669 10.0003 1.66669ZM13.167 12.8334L10.8337 9.72252V5.83335H9.16699V10.2775L11.8337 13.8325L13.167 12.8334Z"
                            fill="#5C5C5C"
                          />
                        </svg>

                        <p className="text-sm">
                          {timeEvent(val.start)} - {timeEvent(val.end)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-info-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                        </svg>

                        <p className="text-sm">{val.details}</p>
                      </div>
                      <div className="flex gap-2 self-end">
                        <button
                          className="bg-blue-900 rounded-full p-2"
                          onClick={() => {
                            handleShowEvent();
                            setId(val.id);
                            setEditTitle(val.title);
                            setEditDate(val.date);
                            setEditStart(val.start);
                            setEditEnd(val.end);
                            setEditLocation(val.location);
                            setEditEmail(val.calendar);
                          }}
                        >
                          <svg
                            width="17"
                            height="17"
                            viewBox="0 0 17 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_2902_11509)">
                              <mask
                                id="path-1-inside-1_2902_11509"
                                fill="white"
                              >
                                <path d="M15.0116 4.44563L12.534 1.95101C12.3703 1.78783 12.1487 1.69623 11.9178 1.69623C11.6868 1.69623 11.4653 1.78783 11.3016 1.95101L2.51829 10.7371L1.71636 14.2042C1.68869 14.331 1.68964 14.4623 1.71913 14.5886C1.74862 14.715 1.80591 14.8331 1.88682 14.9344C1.96772 15.0357 2.07019 15.1176 2.18674 15.1742C2.3033 15.2307 2.43099 15.2605 2.5605 15.2613C2.62084 15.2674 2.68165 15.2674 2.74199 15.2613L6.24095 14.4579L15.0116 5.68025C15.1745 5.51624 15.2659 5.2943 15.2659 5.06294C15.2659 4.83158 15.1745 4.60964 15.0116 4.44563ZM5.81888 13.6968L2.53939 14.386L3.28646 11.1642L9.8581 4.6063L12.3905 7.1432L5.81888 13.6968ZM12.9561 6.53011L10.4237 3.99321L11.8925 2.53027L14.3827 5.06717L12.9561 6.53011Z" />
                              </mask>
                              <path
                                d="M15.0116 4.44563L12.534 1.95101C12.3703 1.78783 12.1487 1.69623 11.9178 1.69623C11.6868 1.69623 11.4653 1.78783 11.3016 1.95101L2.51829 10.7371L1.71636 14.2042C1.68869 14.331 1.68964 14.4623 1.71913 14.5886C1.74862 14.715 1.80591 14.8331 1.88682 14.9344C1.96772 15.0357 2.07019 15.1176 2.18674 15.1742C2.3033 15.2307 2.43099 15.2605 2.5605 15.2613C2.62084 15.2674 2.68165 15.2674 2.74199 15.2613L6.24095 14.4579L15.0116 5.68025C15.1745 5.51624 15.2659 5.2943 15.2659 5.06294C15.2659 4.83158 15.1745 4.60964 15.0116 4.44563ZM5.81888 13.6968L2.53939 14.386L3.28646 11.1642L9.8581 4.6063L12.3905 7.1432L5.81888 13.6968ZM12.9561 6.53011L10.4237 3.99321L11.8925 2.53027L14.3827 5.06717L12.9561 6.53011Z"
                                fill="#EDEDED"
                              />
                              <path
                                d="M12.534 1.95101L13.3855 1.10539L13.3811 1.10109L12.534 1.95101ZM11.3016 1.95101L10.4544 1.10108L10.4529 1.10262L11.3016 1.95101ZM2.51829 10.7371L1.66963 9.88874L1.42662 10.1318L1.34916 10.4667L2.51829 10.7371ZM1.71636 14.2042L0.547223 13.9338L0.545547 13.9411L0.54396 13.9483L1.71636 14.2042ZM2.5605 15.2613L2.68127 14.0674L2.62466 14.0616L2.56776 14.0613L2.5605 15.2613ZM2.74199 15.2613L2.86276 16.4552L2.9374 16.4476L3.01052 16.4308L2.74199 15.2613ZM6.24095 14.4579L6.50948 15.6275L6.84587 15.5503L7.08982 15.3061L6.24095 14.4579ZM15.0116 5.68025L15.8604 6.52844L15.863 6.52588L15.0116 5.68025ZM5.81888 13.6968L6.06567 14.8712L6.41413 14.798L6.66625 14.5465L5.81888 13.6968ZM2.53939 14.386L1.37041 14.115L0.945566 15.9472L2.78619 15.5604L2.53939 14.386ZM3.28646 11.1642L2.43882 10.3148L2.19521 10.5579L2.11747 10.8931L3.28646 11.1642ZM9.8581 4.6063L10.7074 3.75852L9.85973 2.90938L9.01046 3.75688L9.8581 4.6063ZM12.3905 7.1432L13.2379 7.99289L14.088 7.14511L13.2398 6.29542L12.3905 7.1432ZM12.9561 6.53011L12.1068 7.37789L12.9661 8.23868L13.8152 7.3679L12.9561 6.53011ZM10.4237 3.99321L9.57684 3.14299L8.72567 3.99077L9.57439 4.84099L10.4237 3.99321ZM11.8925 2.53027L12.7488 1.68966L11.9021 0.827024L11.0456 1.68005L11.8925 2.53027ZM14.3827 5.06717L15.2418 5.90496L16.0615 5.0644L15.2391 4.22656L14.3827 5.06717ZM15.863 3.60002L13.3855 1.1054L11.6826 2.79662L14.1601 5.29124L15.863 3.60002ZM13.3811 1.10109C12.9927 0.71394 12.4666 0.496228 11.9178 0.496228V2.89623C11.8309 2.89623 11.7479 2.86172 11.6869 2.80094L13.3811 1.10109ZM11.9178 0.496228C11.369 0.496228 10.8429 0.713939 10.4544 1.10109L12.1487 2.80094C12.0877 2.86172 12.0047 2.89623 11.9178 2.89623V0.496228ZM10.4529 1.10262L1.66963 9.88874L3.36696 11.5855L12.1502 2.7994L10.4529 1.10262ZM1.34916 10.4667L0.547223 13.9338L2.88549 14.4746L3.68742 11.0076L1.34916 10.4667ZM0.54396 13.9483C0.478246 14.2494 0.480498 14.5613 0.550554 14.8614L2.88771 14.3158C2.89879 14.3633 2.89914 14.4125 2.88875 14.4601L0.54396 13.9483ZM0.550554 14.8614C0.620612 15.1615 0.756738 15.4423 0.949128 15.6832L2.8245 14.1856C2.85509 14.2239 2.87664 14.2684 2.88771 14.3158L0.550554 14.8614ZM0.949128 15.6832C1.14153 15.9241 1.38536 16.1191 1.6629 16.2538L2.71059 14.0946C2.75502 14.1161 2.79391 14.1473 2.8245 14.1856L0.949128 15.6832ZM1.6629 16.2538C1.94045 16.3885 2.24464 16.4594 2.55323 16.4612L2.56776 14.0613C2.61734 14.0616 2.66614 14.073 2.71059 14.0946L1.6629 16.2538ZM2.43973 16.4552C2.58038 16.4694 2.72211 16.4694 2.86276 16.4552L2.62122 14.0674C2.64118 14.0653 2.6613 14.0653 2.68127 14.0674L2.43973 16.4552ZM3.01052 16.4308L6.50948 15.6275L5.97242 13.2883L2.47346 14.0917L3.01052 16.4308ZM7.08982 15.3061L15.8604 6.52844L14.1627 4.83206L5.39208 13.6097L7.08982 15.3061ZM15.863 6.52588C16.2494 6.13684 16.4659 5.61083 16.4659 5.06294H14.0659C14.0659 4.97777 14.0996 4.89564 14.1602 4.83463L15.863 6.52588ZM16.4659 5.06294C16.4659 4.51505 16.2494 3.98903 15.863 3.6L14.1602 5.29125C14.0996 5.23024 14.0659 5.14811 14.0659 5.06294H16.4659ZM5.57209 12.5225L2.2926 13.2117L2.78619 15.5604L6.06567 14.8712L5.57209 12.5225ZM3.70838 14.6571L4.45545 11.4352L2.11747 10.8931L1.37041 14.115L3.70838 14.6571ZM4.1341 12.0136L10.7057 5.45571L9.01046 3.75688L2.43882 10.3148L4.1341 12.0136ZM9.00882 5.45408L11.5412 7.99097L13.2398 6.29542L10.7074 3.75852L9.00882 5.45408ZM11.5432 6.29351L4.97152 12.8472L6.66625 14.5465L13.2379 7.99289L11.5432 6.29351ZM13.8054 5.68233L11.2729 3.14544L9.57439 4.84099L12.1068 7.37789L13.8054 5.68233ZM11.2705 4.84344L12.7393 3.38049L11.0456 1.68005L9.57684 3.14299L11.2705 4.84344ZM11.0361 3.37088L13.5263 5.90778L15.2391 4.22656L12.7488 1.68966L11.0361 3.37088ZM13.5236 4.22938L12.097 5.69232L13.8152 7.3679L15.2418 5.90496L13.5236 4.22938Z"
                                fill="#EDEDED"
                                mask="url(#path-1-inside-1_2902_11509)"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_2902_11509">
                                <rect
                                  width="16.962"
                                  height="16.962"
                                  fill="white"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                        <button
                          className="bg-blue-900 rounded-full p-2"
                          onClick={() => {
                            setId(val.id);
                            setDeleteEvent(true);
                          }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.90793 2.50842H4.79887C4.85885 2.50842 4.90793 2.45934 4.90793 2.39936V2.50842H9.0523V2.39936C9.0523 2.45934 9.10138 2.50842 9.16137 2.50842H9.0523V3.48998H10.0339V2.39936C10.0339 1.91812 9.64261 1.52686 9.16137 1.52686H4.79887C4.31763 1.52686 3.92637 1.91812 3.92637 2.39936V3.48998H4.90793V2.50842ZM11.7789 3.48998H2.18137C1.94007 3.48998 1.74512 3.68493 1.74512 3.92623V4.36248C1.74512 4.42246 1.7942 4.47154 1.85418 4.47154H2.6776L3.01433 11.6015C3.03614 12.0664 3.42059 12.4331 3.88547 12.4331H10.0748C10.541 12.4331 10.9241 12.0677 10.9459 11.6015L11.2826 4.47154H12.1061C12.166 4.47154 12.2151 4.42246 12.2151 4.36248V3.92623C12.2151 3.68493 12.0202 3.48998 11.7789 3.48998ZM9.96979 11.4515H3.99044L3.66053 4.47154H10.2997L9.96979 11.4515Z"
                              fill="#EDEDED"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>

        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header
            closeButton
            className="m-4"
            style={{ borderBottomColor: "transparent" }}
          >
            <Modal.Title>Add Event</Modal.Title>
          </Modal.Header>
          <Modal.Body className="mx-4">
            <div className="bg-red-100 w-full p-3 rounded-lg flex gap-5">
              <a
                href="#"
                style={{
                  color: index == 0 ? "#780000" : "#00000080",
                  borderColor: index == 0 ? "#780000" : "#00000080",
                  paddingBottom: index == 0 ? "5px" : "",
                  borderBottomStyle: index == 0 ? "solid" : "",
                  borderBottomWidth: index == 0 ? "4px" : "",
                  width: index == 0 ? "fit-content" : "",
                }}
                className="mt-2"
                onClick={() => setIndex(0)}
              >
                Event
              </a>
              <a
                href="#"
                style={{
                  color: index == 1 ? "#780000" : "#00000080",
                  borderColor: index == 1 ? "#780000" : "#00000080",
                  paddingBottom: index == 1 ? "5px" : "",
                  borderBottomStyle: index == 1 ? "solid" : "",
                  borderBottomWidth: index == 1 ? "4px" : "",
                  width: index == 1 ? "fit-content" : "",
                }}
                className="mt-2"
                onClick={() => setIndex(1)}
              >
                My To Do
              </a>
            </div>
            <div className="p-3">
              {index == 0 ? (
                <>
                  <div className="form-group mt-3">
                    <label>Title</label>
                    <input
                      type="text"
                      placeholder="Input Event Title"
                      // value={newEvent.title}
                      // onChange={(e) =>
                      //   setNewEvent({ ...newEvent, title: e.target.value })
                      // }
                      onChange={(e) => setTitle(e.target.value)}
                      className="form-control rounded-lg"
                    />
                  </div>
                  <div className="">
                    <div className="form-group mt-3">
                      <label>Date</label>
                      <input
                        type="date"
                        placeholderText="Start Date"
                        className="form-control rounded-lg"
                        //   style={{ marginRight: "10px" }}
                        // selected={newEvent.start}
                        // onChange={(end) => setNewEvent({ ...newEvent, end })}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="form-group mt-3">
                      <label>Start Time</label>
                      <input
                        type="time"
                        placeholderText="Start Time"
                        className="form-control rounded-lg"
                        //   style={{ marginRight: "10px" }}
                        // selected={newEvent.end}
                        // onChange={(end) => setNewEvent({ ...newEvent, end })}
                        onChange={(e) => setStart(e.target.value)}
                      />
                    </div>
                    <div className="form-group mt-3">
                      <label>End Time</label>
                      <input
                        type="time"
                        placeholderText="End Time"
                        className="form-control rounded-lg"
                        //   style={{ marginRight: "10px" }}
                        // selected={newEvent.start}
                        // onChange={(start) =>
                        //   setNewEvent({ ...newEvent, start })
                        // }
                        onChange={(e) => setEnd(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group mt-3">
                    <label>Location</label>
                    <input
                      type="text"
                      placeholder="Add Location"
                      // value={newEvent.location}
                      // onChange={(e) =>
                      //   setNewEvent({ ...newEvent, location: e.target.value })
                      // }
                      className="form-control rounded-lg"
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Calendar</label>
                    <input
                      type="email"
                      placeholder="Type your email"
                      // value={newEvent.email}
                      // onChange={(e) =>
                      //   setNewEvent({ ...newEvent, email: e.target.value })
                      // }
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control rounded-lg"
                    />
                  </div>

                  <div className="w-full flex gap-5 justify-end mt-5">
                    <Button
                      style={{
                        backgroundColor: "#C1121F",
                        color: "#FFFFFF",
                        width: "100px",
                      }}
                      onClick={postData}
                    >
                      Save
                    </Button>
                  </div>
                </>
              ) : index == 1 ? (
                <>
                  <div className="form-group mt-3">
                    <label>Title</label>
                    <input
                      type="text"
                      placeholder="Input Event Title"
                      // value={newEvent.title}
                      // onChange={(e) =>
                      //   setNewEvent({ ...newEvent, title: e.target.value })
                      // }
                      onChange={(e) => setTitleTodo(e.target.value)}
                      className="form-control rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="form-group mt-3">
                      <label>Date</label>
                      <input
                        type="date"
                        placeholderText="Start Date"
                        className="form-control rounded-lg"
                        //   style={{ marginRight: "10px" }}
                        // selected={newEvent.start}
                        // onChange={(end) => setNewEvent({ ...newEvent, end })}
                        onChange={(e) => setDateTodo(e.target.value)}
                      />
                    </div>
                    <div className="form-group mt-3">
                      <label>Time</label>
                      <input
                        type="time"
                        placeholderText="Start Time"
                        className="form-control rounded-lg"
                        //   style={{ marginRight: "10px" }}
                        // selected={newEvent.end}
                        // onChange={(end) => setNewEvent({ ...newEvent, end })}
                        onChange={(e) => setTime(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group mt-3">
                    <label>Calendar</label>
                    <input
                      type="email"
                      placeholder="Type your email"
                      // value={newEvent.email}
                      // onChange={(e) =>
                      //   setNewEvent({ ...newEvent, email: e.target.value })
                      // }
                      onChange={(e) => setEmailTodo(e.target.value)}
                      className="form-control rounded-lg"
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Details</label>
                    <textarea
                      placeholder="type details activity"
                      // value={newEvent.location}
                      // onChange={(e) =>
                      //   setNewEvent({ ...newEvent, location: e.target.value })
                      // }
                      onChange={(e) => setDetail(e.target.value)}
                      className="form-control rounded-lg"
                    />
                  </div>

                  <div className="w-full flex gap-5 justify-end mt-5">
                    <Button
                      style={{
                        backgroundColor: "#C1121F",
                        color: "#FFFFFF",
                        width: "100px",
                      }}
                      onClick={postDataTodo}
                    >
                      Save
                    </Button>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </Modal.Body>
        </Modal>
        <Modal size="lg" show={showEditEvent} onHide={handleCloseEvent}>
          <Modal.Header
            closeButton
            className="m-4"
            style={{ borderBottomColor: "transparent" }}
          >
            <Modal.Title>Edit Event</Modal.Title>
          </Modal.Header>
          <Modal.Body className="mx-4">
            <div className="bg-red-100 w-full p-3 rounded-lg flex gap-5">
              <a
                href="#"
                style={{
                  color: index == 0 ? "#780000" : "#00000080",
                  borderColor: index == 0 ? "#780000" : "#00000080",
                  paddingBottom: index == 0 ? "5px" : "",
                  borderBottomStyle: index == 0 ? "solid" : "",
                  borderBottomWidth: index == 0 ? "4px" : "",
                  width: index == 0 ? "fit-content" : "",
                }}
                className="mt-2"
                onClick={() => setIndex(0)}
              >
                Event
              </a>
              <a
                href="#"
                style={{
                  color: index == 1 ? "#780000" : "#00000080",
                  borderColor: index == 1 ? "#780000" : "#00000080",
                  paddingBottom: index == 1 ? "5px" : "",
                  borderBottomStyle: index == 1 ? "solid" : "",
                  borderBottomWidth: index == 1 ? "4px" : "",
                  width: index == 1 ? "fit-content" : "",
                }}
                className="mt-2"
                onClick={() => setIndex(1)}
              >
                My To Do
              </a>
            </div>
            <div className="p-3">
              <div className="form-group mt-3">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Input Event Title"
                  value={editTitle}
                  // onChange={(e) =>
                  //   setNewEvent({ ...newEvent, title: e.target.value })
                  // }
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="form-control rounded-lg"
                />
              </div>
              <div className="">
                <div className="form-group mt-3">
                  <label>Date</label>
                  <input
                    type="date"
                    placeholderText="Start Date"
                    className="form-control rounded-lg"
                    //   style={{ marginRight: "10px" }}
                    // selected={newEvent.start}
                    // onChange={(end) => setNewEvent({ ...newEvent, end })}
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="form-group mt-3">
                  <label>Start Time</label>
                  <input
                    type="time"
                    placeholderText="Start Time"
                    className="form-control rounded-lg"
                    //   style={{ marginRight: "10px" }}
                    // selected={newEvent.end}
                    // onChange={(end) => setNewEvent({ ...newEvent, end })}
                    value={editStart}
                    onChange={(e) => setEditStart(e.target.value)}
                  />
                </div>
                <div className="form-group mt-3">
                  <label>End Time</label>
                  <input
                    type="time"
                    placeholderText="End Time"
                    className="form-control rounded-lg"
                    //   style={{ marginRight: "10px" }}
                    // selected={newEvent.start}
                    // onChange={(start) =>
                    //   setNewEvent({ ...newEvent, start })
                    // }
                    value={editEnd}
                    onChange={(e) => setEditEnd(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group mt-3">
                <label>Location</label>
                <input
                  type="text"
                  placeholder="Add Location"
                  // value={newEvent.location}
                  // onChange={(e) =>
                  //   setNewEvent({ ...newEvent, location: e.target.value })
                  // }
                  className="form-control rounded-lg"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Calendar</label>
                <input
                  type="email"
                  placeholder="Type your email"
                  // value={newEvent.email}
                  // onChange={(e) =>
                  //   setNewEvent({ ...newEvent, email: e.target.value })
                  // }
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="form-control rounded-lg"
                />
              </div>

              <div className="w-full flex gap-5 justify-end mt-5">
                <Button
                  style={{
                    backgroundColor: "#C1121F",
                    color: "#FFFFFF",
                    width: "100px",
                  }}
                  onClick={editData}
                >
                  Save
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Modal size="lg" show={showEditTodo} onHide={handleCloseTodo}>
          <Modal.Header
            closeButton
            className="m-4"
            style={{ borderBottomColor: "transparent" }}
          >
            <Modal.Title>Edit My To Do</Modal.Title>
          </Modal.Header>
          <Modal.Body className="mx-4">
            <div className="bg-red-100 w-full p-3 rounded-lg flex gap-5">
              <a
                href="#"
                style={{
                  color: index == 1 ? "#780000" : "#00000080",
                  borderColor: index == 1 ? "#780000" : "#00000080",
                  paddingBottom: index == 1 ? "5px" : "",
                  borderBottomStyle: index == 1 ? "solid" : "",
                  borderBottomWidth: index == 1 ? "4px" : "",
                  width: index == 1 ? "fit-content" : "",
                }}
                className="mt-2"
                onClick={() => setIndex(0)}
              >
                Event
              </a>
              <a
                href="#"
                style={{
                  color: index == 0 ? "#780000" : "#00000080",
                  borderColor: index == 0 ? "#780000" : "#00000080",
                  paddingBottom: index == 0 ? "5px" : "",
                  borderBottomStyle: index == 0 ? "solid" : "",
                  borderBottomWidth: index == 0 ? "4px" : "",
                  width: index == 0 ? "fit-content" : "",
                }}
                className="mt-2"
                onClick={() => setIndex(1)}
              >
                My To Do
              </a>
            </div>
            <div className="p-3">
              <div className="form-group mt-3">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Input Event Title"
                  // value={newEvent.title}
                  // onChange={(e) =>
                  //   setNewEvent({ ...newEvent, title: e.target.value })
                  // }
                  value={editTitleTodo}
                  onChange={(e) => setEditTitleTodo(e.target.value)}
                  className="form-control rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="form-group mt-3">
                  <label>Date</label>
                  <input
                    type="date"
                    placeholderText="Start Date"
                    className="form-control rounded-lg"
                    //   style={{ marginRight: "10px" }}
                    // selected={newEvent.start}
                    // onChange={(end) => setNewEvent({ ...newEvent, end })}
                    value={editDateTodo}
                    onChange={(e) => setEditDateTodo(e.target.value)}
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Time</label>
                  <input
                    type="time"
                    placeholderText="Start Time"
                    className="form-control rounded-lg"
                    //   style={{ marginRight: "10px" }}
                    // selected={newEvent.end}
                    // onChange={(end) => setNewEvent({ ...newEvent, end })}
                    value={editTime}
                    onChange={(e) => setEditTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group mt-3">
                <label>Calendar</label>
                <input
                  type="email"
                  placeholder="Type your email"
                  // value={newEvent.email}
                  // onChange={(e) =>
                  //   setNewEvent({ ...newEvent, email: e.target.value })
                  // }
                  value={editEmailTodo}
                  onChange={(e) => setEditEmailTodo(e.target.value)}
                  className="form-control rounded-lg"
                />
              </div>
              <div className="form-group mt-3">
                <label>Details</label>
                <textarea
                  placeholder="type details activity"
                  // value={newEvent.location}
                  // onChange={(e) =>
                  //   setNewEvent({ ...newEvent, location: e.target.value })
                  // }
                  value={editDetail}
                  onChange={(e) => setEditDetail(e.target.value)}
                  className="form-control rounded-lg"
                />
              </div>

              <div className="w-full flex gap-5 justify-end mt-5">
                <Button
                  style={{
                    backgroundColor: "#C1121F",
                    color: "#FFFFFF",
                    width: "100px",
                  }}
                  onClick={editDataTodo}
                >
                  Save
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <ModalDelete
          close={() => {
            setDeleteEvent(false);
          }}
          submit={() => {
            DeleteEvent(id);
            setDeleteEvent(false);
            inAwait();
          }}
          active={isdeleteEvent}
        />
        <ModalDelete
          close={() => {
            setDeleteTodo(false);
          }}
          submit={() => {
            DeleteTodo(id);
            setDeleteTodo(false);
            inAwait();
          }}
          active={isdeleteTodo}
        />
      </div>
    </>
  );
}

export default Cal;
