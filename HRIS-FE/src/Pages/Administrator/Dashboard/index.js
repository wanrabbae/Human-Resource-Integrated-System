import React, { Component } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import d1 from "../../../Resourse/img/d1.png";
import d2 from "../../../Resourse/img/d2.png";
import d3 from "../../../Resourse/img/d3.png";
import d4 from "../../../Resourse/img/d4.png";
import {
  CreateForum,
  GetBirthdate,
  GetDashboard,
  GetForum,
} from "../../../Repository/DashboardRepository";
import { useEffect } from "react";
import { useState } from "react";
import dateFormat from "dateformat";
import { Send } from "@mui/icons-material";
import { HiUserGroup } from "react-icons/hi";
import { FaUserCheck, FaUserMinus, FaUserTie } from "react-icons/fa";
import moment from "moment/moment";
import { GetNews } from "../../../Repository/NewsRepository";
import bg1 from "../../../Resourse/img/finance-1.png";
import bg2 from "../../../Resourse/img/finance-2.png";
import bg3 from "../../../Resourse/img/finance-3.png";
import bg4 from "../../../Resourse/img/finance-4.png";
import { Link } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [totalEmployee, setTotalEmployee] = useState([]);
  const [totalNewEmployee, setTotalNewEmployee] = useState([]);
  const [totalAppliedEmployee, setTotalAppliedEmployee] = useState([]);
  const [totalResignEmployee, setTotalResignEmployee] = useState([]);
  const [female, setFemale] = useState([]);
  const [male, setMale] = useState([]);
  const [employeeJobTitleData, setEmployeeJobTitleData] = useState([]);
  const [dataBirthdate, setDataBirthdate] = useState([]);
  const [dataForum, setDataForum] = useState([]);
  const [desc, setDesc] = useState("");
  const [employeeId, setDataEmployeeId] = useState("");

  const [dataNews, setDataNews] = useState([])

  const inAwait = async () => {
    var data = await GetDashboard();
    setTotalEmployee(data.result.totalEmployee);
    setTotalNewEmployee(data.result.totalNewEmployee);
    setTotalAppliedEmployee(data.result.totalAppliedEmployee);
    setTotalResignEmployee(data.result.totalResignedEmployee);

    setFemale(data.result.employeeGender.female);
    console.log(data.result.employeeGender.female);
    setMale(data.result.employeeGender.male);
    setEmployeeJobTitleData(data.result.employeeJobTitleData);

    var birthdate = await GetBirthdate();
    setDataBirthdate(birthdate.data);
    console.log(birthdate.data);

    var forum = await GetForum();
    console.log("ini", forum.data);
    setDataForum(forum.data);

    var data = JSON.parse(window.localStorage.getItem("users"));
    console.log(data);
    setDataEmployeeId(data.employeeId);

    var news = await GetNews();
    console.log("ini news", news.data);
<<<<<<< HEAD
    setDataNews(news.data.sort((a, b) => b.id-a.id));
=======
    setDataNews(news.data.sort((a, b) => b.id - a.id));
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
  };

  const postData = async (e) => {
    e.preventDefault();

    var requestBody = {
      employeeId: employeeId,
      description: desc,
    };
    console.log(requestBody);
    await CreateForum(requestBody)
      .then((response) => {
        console.log(response);
        inAwait();
      })
      .catch((e) => {
        console.log("error", e.response);
        // if (e.response) {
        //   setMsg(e.response.data.message);
        // }
      });
  };

  const persentase = (data1, data2) => {
    var persent = ((data1 / (data1 + data2)) * 100).toFixed(2);
    return persent;
  };

  // console.log(Object.keys(employeeJobTitleData).length)
  var array = [];
  for (let index = 0; index < employeeJobTitleData.length; index++) {
    array[index] = employeeJobTitleData[index].count;
  }

  var arrayColor = [
    "#5C0000",
    "#700101",
    "#890000",
    "#A80101",
    "#B70000",
    "#C53333",
    "#E00101",
    "#E63434",

    "#00094B",
    "#00056A",
    "#000E71",
    "#00079F",
    "#001296",
    "#0009D4",
    "#3341AB",
    "#333ADD",
  ];
  var color = [];
  var x = -1;
  for (let index = 0; index < employeeJobTitleData.length; index++) {
    x++;
    if (x > 20) {
      x = 0;
    }
    color[index] = arrayColor[x];
  }

  // console.log(totalEmployee)
  // console.log(totalNewEmployee)
  // console.log(totalAppliedEmployee)
  // console.log(female)

  useEffect(() => {
    inAwait();
    if (window.localStorage.getItem("users") == null) {
      window.location.href = "/";
    } else {
      var data = JSON.parse(window.localStorage.getItem("users"));
      setUsers(data);
      // inAwait();
    }
  }, []);

  var date = new Date();
  // console.log(date);

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      <div className="flex flex-row gap-2">
<<<<<<< HEAD
        <div className="grid grid-cols-12 gap-2 items-center w-full">
          <div className="col-span-3 flex w-full p-4 items-center justify-between bg-white rounded-lg">
=======
        <div className="grid md:grid-cols-12 grid-cols-1 gap-2 items-center w-full">
          <div className="md:col-span-3 flex w-full p-4 items-center justify-between bg-white rounded-lg">
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
            <div className="flex flex-col gap-2 text-sm">
              <h1 className="text-[#E00101] capitalize">Total employees</h1>
              <h1 className="text-[#E00101] font-semibold text-2xl">
                {totalEmployee}
              </h1>
            </div>
            <HiUserGroup className="text-[#E00101] text-[49px]" />
          </div>
<<<<<<< HEAD
          <div className="col-span-3 flex w-full p-4 items-center justify-between bg-white rounded-lg">
=======
          <div className="md:col-span-3 flex w-full p-4 items-center justify-between bg-white rounded-lg">
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
            <div className="flex flex-col gap-2 text-sm">
              <h1 className="text-[#E00101] capitalize">New employees</h1>
              <h1 className="text-[#E00101] font-semibold text-2xl">
                {totalNewEmployee}
              </h1>
            </div>
            <FaUserTie className="text-[#E00101] text-[40px]" />
          </div>
<<<<<<< HEAD
          <div className="col-span-3 flex w-full p-4 items-center justify-between bg-white rounded-lg">
=======
          <div className="md:col-span-3 flex w-full p-4 items-center justify-between bg-white rounded-lg">
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
            <div className="flex flex-col gap-2 text-sm">
              <h1 className="text-[#E00101] capitalize">Applied employees</h1>
              <h1 className="text-[#E00101] font-semibold text-2xl">
                {totalAppliedEmployee}
              </h1>
            </div>
            <FaUserCheck className="text-[#E00101] text-[49px]" />
          </div>
<<<<<<< HEAD
          <div className="col-span-3 flex w-full p-4 items-center justify-between bg-white rounded-lg">
=======
          <div className="md:col-span-3 flex w-full p-4 items-center justify-between bg-white rounded-lg">
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
            <div className="flex flex-col gap-2 text-sm">
              <h1 className="text-[#E00101] capitalize">Resigned employees</h1>
              <h1 className="text-[#E00101] font-semibold text-2xl">
                {totalResignEmployee}
              </h1>
            </div>
            <FaUserMinus className="text-[#E00101] text-[49px]" />
          </div>
        </div>
      </div>
<<<<<<< HEAD
      <div className="flex flex-row gap-2">
        <div className="bg-white rounded-lg p-3 w-1/2">
=======
      <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
        <div className="bg-white rounded-lg p-3">
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
          {/* Job Level */}
          {/* <h1 className="text-gray-700 font-semibold mb-5">Job Level</h1>
          <div className="flex flex-col gap-5 rounded-lg">
            <div className="w-full flex items-center justify-center gap-5">
              {array != 0 ? (
                <>
                  <div className="w-52">
                    <Doughnut
                      data={{
                        datasets: [
                          {
                            label: "Job Level",
                            data: array,
                            backgroundColor: color,
                          },
                        ],
                      }}
                    />
                  </div>
                  <div className="h-48 w-1/2 overflow-y-auto px-3">
                    <div className="space-y-3">
                      {employeeJobTitleData.map((val, index) => (
                        <div className="flex gap-3 items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-5 h-5"
                              style={{ backgroundColor: color[index] }}
                            ></div>
                            <p className="text-gray-400 text-xs">{val.name}</p>
                          </div>
                          <p className="text-gray-700 text-xs">{val.count}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-center">No Data</p>
              )}
            </div>
            <div className="flex flex-row flex-wrap gap-5">
            </div>
          </div> */}
          {/* Job Level */}
          {/* News */}

<<<<<<< HEAD
          <div className="flex justify-between text-center">
=======
          <div className="flex justify-between">
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
            <h3 className="text-xl font-semibold">Company News</h3>
            <Link to={"/news"} className="text-sm text-gray-500 hover:text-gray-600">See More</Link>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center justify-center px-2 mt-4">
            {dataNews.length > 0 ?
              dataNews.slice(0, 2).map((val, index) => (
<<<<<<< HEAD
                <Link key={index} to={"/finance/reimburstment"} className="relative">
=======
                <Link key={index} to={`/news/detail/${val.id}`} className="relative">
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
                  {val.image ?
                    // <div className="brightness-75 transition-all duration-500 ease-in-out hover:brightness-50 h-[150px] w-full rounded-xl bg-no-repeat bg-center bg-cover" style={{backgroundImage: `url(${val.image})`}}></div>
                    <img className="brightness-75 transition-all duration-500 ease-in-out hover:brightness-50 h-[150px] w-full rounded-xl bg-no-repeat bg-center bg-cover" crossOrigin="anonymous" src={val.image} />
                    :
                    <div className="brightness-75 transition-all duration-500 ease-in-out hover:brightness-50 bg-gray-400 h-[150px] rounded-xl"></div>
                  }
                  <div className="absolute bottom-5 left-5 text-white">
                    <p className="font-semibold">{val.title}</p>
                    <p className="font-thin text-xs">{moment(val.createdAt).format("ll")}</p>
                  </div>
                </Link>
              ))
              : <div className="mt-20 rounded-lg text-center col-span-3">No Data</div>}
          </div>
          {/* News */}
        </div>
<<<<<<< HEAD
        <div className="bg-white p-3 rounded-lg w-1/2">
          <h1 className="text-gray-700 font-semibold mb-2">Gender Diversity</h1>
          <div className="flex gap-5 items-center gap-3">
            <div className="w-52">
=======
        <div className="bg-white p-3 rounded-lg">
          <h1 className="text-gray-700 font-semibold mb-2">Gender Diversity</h1>
          <div className="grid lg:grid-cols-2 grid-cols-1 items-center justify-center gap-3">
            <div className="lg:w-52 w-32">
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
              {female != 0 && male != 0 ? (
                <Doughnut
                  data={{
                    datasets: [
                      {
                        label: "Gender",
                        data: [female, male],
                        backgroundColor: ["#B70000", "#3341AB"],
                      },
                    ],
                  }}
                />
              ) : (
                <p className="h-48">No Data</p>
              )}
            </div>
<<<<<<< HEAD
            <div className="flex flex-col gap-5">
              <div className="flex gap-10 items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-[#3341AB] p-1 rounded-lg">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_200_2733)">
                        <path
                          d="M7.29551 1.33301C12.1797 1.33301 13.2415 4.58208 13.2415 6.4296C13.2415 8.06475 13.0292 8.76554 13.0292 8.76554H1.56185C1.56185 8.76554 1.34949 8.06475 1.34949 6.4296C1.34949 4.58208 2.41128 1.33301 7.29551 1.33301Z"
                          fill="#594640"
                        />
                        <path
                          d="M12.6469 7.91632C12.6469 7.91632 12.477 7.21554 12.3921 5.75027C12.2859 4.15759 10.0774 5.43174 7.29547 5.43174C4.51359 5.43174 2.30506 4.15759 2.19888 5.75027C2.11394 7.21554 1.94405 7.91632 1.94405 7.91632C0.563728 7.91632 0.563728 10.1673 2.029 10.1673C2.029 12.5882 5.06572 14.0747 7.29547 14.0747C9.52523 14.0747 12.562 12.5882 12.562 10.1673C14.0272 10.1673 14.0272 7.91632 12.6469 7.91632Z"
                          fill="#FFE1BD"
                        />
                        <path
                          d="M9.94991 9.82706C10.7122 9.82706 11.3302 9.20907 11.3302 8.44673C11.3302 7.6844 10.7122 7.06641 9.94991 7.06641C9.18757 7.06641 8.56958 7.6844 8.56958 8.44673C8.56958 9.20907 9.18757 9.82706 9.94991 9.82706Z"
                          fill="white"
                        />
                        <path
                          d="M9.94987 9.40243C10.4776 9.40243 10.9055 8.97459 10.9055 8.44682C10.9055 7.91905 10.4776 7.49121 9.94987 7.49121C9.4221 7.49121 8.99426 7.91905 8.99426 8.44682C8.99426 8.97459 9.4221 9.40243 9.94987 9.40243Z"
                          fill="#664E27"
                        />
                        <path
                          d="M9.94988 8.765C10.1258 8.765 10.2684 8.62239 10.2684 8.44647C10.2684 8.27054 10.1258 8.12793 9.94988 8.12793C9.77396 8.12793 9.63135 8.27054 9.63135 8.44647C9.63135 8.62239 9.77396 8.765 9.94988 8.765Z"
                          fill="#231F20"
                        />
                        <path
                          d="M4.64095 9.82706C5.40328 9.82706 6.02127 9.20907 6.02127 8.44673C6.02127 7.6844 5.40328 7.06641 4.64095 7.06641C3.87861 7.06641 3.26062 7.6844 3.26062 8.44673C3.26062 9.20907 3.87861 9.82706 4.64095 9.82706Z"
                          fill="white"
                        />
                        <path
                          d="M4.64104 9.40243C5.1688 9.40243 5.59665 8.97459 5.59665 8.44682C5.59665 7.91905 5.1688 7.49121 4.64104 7.49121C4.11327 7.49121 3.68542 7.91905 3.68542 8.44682C3.68542 8.97459 4.11327 9.40243 4.64104 9.40243Z"
                          fill="#664E27"
                        />
                        <path
                          d="M4.64092 8.765C4.81685 8.765 4.95946 8.62239 4.95946 8.44647C4.95946 8.27054 4.81685 8.12793 4.64092 8.12793C4.465 8.12793 4.32239 8.27054 4.32239 8.44647C4.32239 8.62239 4.465 8.765 4.64092 8.765Z"
                          fill="#231F20"
                        />
                        <path
                          d="M9.01552 11.1225C7.91126 11.887 6.67958 11.887 5.57532 11.1225C5.4479 11.0375 5.32049 11.1862 5.40543 11.3348C5.74521 11.887 6.42475 12.3754 7.29542 12.3754C8.16609 12.3754 8.84563 11.887 9.1854 11.3348C9.27035 11.1862 9.14293 11.0375 9.01552 11.1225Z"
                          fill="#664E27"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_200_2733">
                          <rect
                            width="13.5909"
                            height="13.5909"
                            fill="white"
                            transform="translate(0.5 0.908203)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="flex items-center gap-5 justify-between w-44">
                    <div>
                      <p className="text-gray-400 text-xs">Male</p>
                      <p className="text-xs">{male}</p>
                    </div>
                    <div className="flex flex-row gap-5 justify-between text-gray-600">
                      <p className="text-xs">
                        {male != 0 && female != 0
                          ? persentase(male, female)
                          : 0}{" "}
                        %
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-10 items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-[#B70000] p-1 rounded-lg">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_200_2713)">
                        <path
                          d="M12.7743 9.40261C12.7743 9.40261 13.4538 8.21341 13.4538 6.4296C13.4538 4.09366 11.7337 1.33301 7.29546 1.33301C2.85718 1.33301 1.13708 4.09366 1.13708 6.4296C1.13708 8.21341 1.79539 9.40261 1.79539 9.40261C1.0309 10.2733 0.563711 12.0358 1.22202 13.1826C1.49809 13.6498 4.21627 15.3062 4.4711 12.3544H10.0773C10.3534 15.2849 13.0716 13.6498 13.3264 13.1826C14.006 12.0358 13.5388 10.2733 12.7743 9.40261Z"
                          fill="#594640"
                        />
                        <path
                          d="M7.29545 2.18262C4.04638 2.18262 1.66797 3.88148 1.66797 6.00506C1.66797 6.00506 2.53864 2.81969 7.29545 2.81969C12.0523 2.81969 12.7106 6.00506 12.7106 6.00506C12.7106 3.88148 10.5445 2.18262 7.29545 2.18262Z"
                          fill="#C28FEF"
                        />
                        <path
                          d="M12.6681 9.8275C13.9847 9.8275 13.9847 7.91628 12.6681 7.91628V7.27921C12.6681 7.27921 5.23555 7.08809 3.53668 4.51855C3.9614 7.10932 1.90153 7.91628 1.90153 7.91628C0.584908 7.91628 0.584908 9.8275 1.90153 9.8275C1.90153 11.314 3.45174 13.6499 7.27418 13.6499C11.0966 13.6499 12.6681 11.314 12.6681 9.8275Z"
                          fill="#FFE1BD"
                        />
                        <path
                          d="M9.94991 10.04C10.7122 10.04 11.3302 9.42196 11.3302 8.65962C11.3302 7.89729 10.7122 7.2793 9.94991 7.2793C9.18757 7.2793 8.56958 7.89729 8.56958 8.65962C8.56958 9.42196 9.18757 10.04 9.94991 10.04Z"
                          fill="white"
                        />
                        <path
                          d="M4.64095 10.04C5.40328 10.04 6.02127 9.42196 6.02127 8.65962C6.02127 7.89729 5.40328 7.2793 4.64095 7.2793C3.87861 7.2793 3.26062 7.89729 3.26062 8.65962C3.26062 9.42196 3.87861 10.04 4.64095 10.04Z"
                          fill="white"
                        />
                        <path
                          d="M9.94987 9.61532C10.4776 9.61532 10.9055 9.18748 10.9055 8.65971C10.9055 8.13194 10.4776 7.7041 9.94987 7.7041C9.4221 7.7041 8.99426 8.13194 8.99426 8.65971C8.99426 9.18748 9.4221 9.61532 9.94987 9.61532Z"
                          fill="#664E27"
                        />
                        <path
                          d="M9.94988 8.97789C10.1258 8.97789 10.2684 8.83528 10.2684 8.65936C10.2684 8.48343 10.1258 8.34082 9.94988 8.34082C9.77396 8.34082 9.63135 8.48343 9.63135 8.65936C9.63135 8.83528 9.77396 8.97789 9.94988 8.97789Z"
                          fill="#231F20"
                        />
                        <path
                          d="M4.64104 9.61532C5.1688 9.61532 5.59665 9.18748 5.59665 8.65971C5.59665 8.13194 5.1688 7.7041 4.64104 7.7041C4.11327 7.7041 3.68542 8.13194 3.68542 8.65971C3.68542 9.18748 4.11327 9.61532 4.64104 9.61532Z"
                          fill="#664E27"
                        />
                        <path
                          d="M4.64092 8.97789C4.81685 8.97789 4.95946 8.83528 4.95946 8.65936C4.95946 8.48343 4.81685 8.34082 4.64092 8.34082C4.465 8.34082 4.32239 8.48343 4.32239 8.65936C4.32239 8.83528 4.465 8.97789 4.64092 8.97789Z"
                          fill="#231F20"
                        />
                        <path
                          d="M9.01552 11.1225C7.91126 11.887 6.67958 11.887 5.57532 11.1225C5.4479 11.0375 5.32049 11.1862 5.40543 11.3348C5.74521 11.887 6.42475 12.3754 7.29542 12.3754C8.16609 12.3754 8.84563 11.887 9.1854 11.3348C9.27035 11.1862 9.14293 11.0375 9.01552 11.1225Z"
                          fill="#664E27"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_200_2713">
                          <rect
                            width="13.5909"
                            height="13.5909"
                            fill="white"
                            transform="translate(0.5 0.908203)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="flex gap-5 items-center justify-between w-44">
                    <div>
                      <p className="text-gray-400 text-xs">Female</p>
                      <p className="text-xs">{female}</p>
                    </div>
                    <div className="flex flex-row gap-5 justify-between text-gray-600">
                      <p className="text-xs">
                        {male != 0 && female != 0
                          ? persentase(female, male)
                          : 0}{" "}
                        %
                      </p>
                    </div>
=======
            <div className="grid grid-rows-2 lg:gap-5 gap-3">
              <div className="flex items-center gap-3">
                <div className="bg-[#3341AB] p-1 rounded-lg">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_200_2733)">
                      <path
                        d="M7.29551 1.33301C12.1797 1.33301 13.2415 4.58208 13.2415 6.4296C13.2415 8.06475 13.0292 8.76554 13.0292 8.76554H1.56185C1.56185 8.76554 1.34949 8.06475 1.34949 6.4296C1.34949 4.58208 2.41128 1.33301 7.29551 1.33301Z"
                        fill="#594640"
                      />
                      <path
                        d="M12.6469 7.91632C12.6469 7.91632 12.477 7.21554 12.3921 5.75027C12.2859 4.15759 10.0774 5.43174 7.29547 5.43174C4.51359 5.43174 2.30506 4.15759 2.19888 5.75027C2.11394 7.21554 1.94405 7.91632 1.94405 7.91632C0.563728 7.91632 0.563728 10.1673 2.029 10.1673C2.029 12.5882 5.06572 14.0747 7.29547 14.0747C9.52523 14.0747 12.562 12.5882 12.562 10.1673C14.0272 10.1673 14.0272 7.91632 12.6469 7.91632Z"
                        fill="#FFE1BD"
                      />
                      <path
                        d="M9.94991 9.82706C10.7122 9.82706 11.3302 9.20907 11.3302 8.44673C11.3302 7.6844 10.7122 7.06641 9.94991 7.06641C9.18757 7.06641 8.56958 7.6844 8.56958 8.44673C8.56958 9.20907 9.18757 9.82706 9.94991 9.82706Z"
                        fill="white"
                      />
                      <path
                        d="M9.94987 9.40243C10.4776 9.40243 10.9055 8.97459 10.9055 8.44682C10.9055 7.91905 10.4776 7.49121 9.94987 7.49121C9.4221 7.49121 8.99426 7.91905 8.99426 8.44682C8.99426 8.97459 9.4221 9.40243 9.94987 9.40243Z"
                        fill="#664E27"
                      />
                      <path
                        d="M9.94988 8.765C10.1258 8.765 10.2684 8.62239 10.2684 8.44647C10.2684 8.27054 10.1258 8.12793 9.94988 8.12793C9.77396 8.12793 9.63135 8.27054 9.63135 8.44647C9.63135 8.62239 9.77396 8.765 9.94988 8.765Z"
                        fill="#231F20"
                      />
                      <path
                        d="M4.64095 9.82706C5.40328 9.82706 6.02127 9.20907 6.02127 8.44673C6.02127 7.6844 5.40328 7.06641 4.64095 7.06641C3.87861 7.06641 3.26062 7.6844 3.26062 8.44673C3.26062 9.20907 3.87861 9.82706 4.64095 9.82706Z"
                        fill="white"
                      />
                      <path
                        d="M4.64104 9.40243C5.1688 9.40243 5.59665 8.97459 5.59665 8.44682C5.59665 7.91905 5.1688 7.49121 4.64104 7.49121C4.11327 7.49121 3.68542 7.91905 3.68542 8.44682C3.68542 8.97459 4.11327 9.40243 4.64104 9.40243Z"
                        fill="#664E27"
                      />
                      <path
                        d="M4.64092 8.765C4.81685 8.765 4.95946 8.62239 4.95946 8.44647C4.95946 8.27054 4.81685 8.12793 4.64092 8.12793C4.465 8.12793 4.32239 8.27054 4.32239 8.44647C4.32239 8.62239 4.465 8.765 4.64092 8.765Z"
                        fill="#231F20"
                      />
                      <path
                        d="M9.01552 11.1225C7.91126 11.887 6.67958 11.887 5.57532 11.1225C5.4479 11.0375 5.32049 11.1862 5.40543 11.3348C5.74521 11.887 6.42475 12.3754 7.29542 12.3754C8.16609 12.3754 8.84563 11.887 9.1854 11.3348C9.27035 11.1862 9.14293 11.0375 9.01552 11.1225Z"
                        fill="#664E27"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_200_2733">
                        <rect
                          width="13.5909"
                          height="13.5909"
                          fill="white"
                          transform="translate(0.5 0.908203)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="flex items-center justify-between w-full">
                  <div>
                    <p className="text-gray-400 text-xs">Male</p>
                    <p className="text-xs">{male}</p>
                  </div>
                  <div className="flex flex-row gap-5 justify-between text-gray-600">
                    <p className="text-xs">
                      {male != 0 && female != 0
                        ? persentase(male, female)
                        : 0}{" "}
                      %
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[#B70000] p-1 rounded-lg">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_200_2713)">
                      <path
                        d="M12.7743 9.40261C12.7743 9.40261 13.4538 8.21341 13.4538 6.4296C13.4538 4.09366 11.7337 1.33301 7.29546 1.33301C2.85718 1.33301 1.13708 4.09366 1.13708 6.4296C1.13708 8.21341 1.79539 9.40261 1.79539 9.40261C1.0309 10.2733 0.563711 12.0358 1.22202 13.1826C1.49809 13.6498 4.21627 15.3062 4.4711 12.3544H10.0773C10.3534 15.2849 13.0716 13.6498 13.3264 13.1826C14.006 12.0358 13.5388 10.2733 12.7743 9.40261Z"
                        fill="#594640"
                      />
                      <path
                        d="M7.29545 2.18262C4.04638 2.18262 1.66797 3.88148 1.66797 6.00506C1.66797 6.00506 2.53864 2.81969 7.29545 2.81969C12.0523 2.81969 12.7106 6.00506 12.7106 6.00506C12.7106 3.88148 10.5445 2.18262 7.29545 2.18262Z"
                        fill="#C28FEF"
                      />
                      <path
                        d="M12.6681 9.8275C13.9847 9.8275 13.9847 7.91628 12.6681 7.91628V7.27921C12.6681 7.27921 5.23555 7.08809 3.53668 4.51855C3.9614 7.10932 1.90153 7.91628 1.90153 7.91628C0.584908 7.91628 0.584908 9.8275 1.90153 9.8275C1.90153 11.314 3.45174 13.6499 7.27418 13.6499C11.0966 13.6499 12.6681 11.314 12.6681 9.8275Z"
                        fill="#FFE1BD"
                      />
                      <path
                        d="M9.94991 10.04C10.7122 10.04 11.3302 9.42196 11.3302 8.65962C11.3302 7.89729 10.7122 7.2793 9.94991 7.2793C9.18757 7.2793 8.56958 7.89729 8.56958 8.65962C8.56958 9.42196 9.18757 10.04 9.94991 10.04Z"
                        fill="white"
                      />
                      <path
                        d="M4.64095 10.04C5.40328 10.04 6.02127 9.42196 6.02127 8.65962C6.02127 7.89729 5.40328 7.2793 4.64095 7.2793C3.87861 7.2793 3.26062 7.89729 3.26062 8.65962C3.26062 9.42196 3.87861 10.04 4.64095 10.04Z"
                        fill="white"
                      />
                      <path
                        d="M9.94987 9.61532C10.4776 9.61532 10.9055 9.18748 10.9055 8.65971C10.9055 8.13194 10.4776 7.7041 9.94987 7.7041C9.4221 7.7041 8.99426 8.13194 8.99426 8.65971C8.99426 9.18748 9.4221 9.61532 9.94987 9.61532Z"
                        fill="#664E27"
                      />
                      <path
                        d="M9.94988 8.97789C10.1258 8.97789 10.2684 8.83528 10.2684 8.65936C10.2684 8.48343 10.1258 8.34082 9.94988 8.34082C9.77396 8.34082 9.63135 8.48343 9.63135 8.65936C9.63135 8.83528 9.77396 8.97789 9.94988 8.97789Z"
                        fill="#231F20"
                      />
                      <path
                        d="M4.64104 9.61532C5.1688 9.61532 5.59665 9.18748 5.59665 8.65971C5.59665 8.13194 5.1688 7.7041 4.64104 7.7041C4.11327 7.7041 3.68542 8.13194 3.68542 8.65971C3.68542 9.18748 4.11327 9.61532 4.64104 9.61532Z"
                        fill="#664E27"
                      />
                      <path
                        d="M4.64092 8.97789C4.81685 8.97789 4.95946 8.83528 4.95946 8.65936C4.95946 8.48343 4.81685 8.34082 4.64092 8.34082C4.465 8.34082 4.32239 8.48343 4.32239 8.65936C4.32239 8.83528 4.465 8.97789 4.64092 8.97789Z"
                        fill="#231F20"
                      />
                      <path
                        d="M9.01552 11.1225C7.91126 11.887 6.67958 11.887 5.57532 11.1225C5.4479 11.0375 5.32049 11.1862 5.40543 11.3348C5.74521 11.887 6.42475 12.3754 7.29542 12.3754C8.16609 12.3754 8.84563 11.887 9.1854 11.3348C9.27035 11.1862 9.14293 11.0375 9.01552 11.1225Z"
                        fill="#664E27"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_200_2713">
                        <rect
                          width="13.5909"
                          height="13.5909"
                          fill="white"
                          transform="translate(0.5 0.908203)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="flex items-center justify-between w-full">
                  <div>
                    <p className="text-gray-400 text-xs">Female</p>
                    <p className="text-xs">{female}</p>
                  </div>
                  <div className="flex flex-row gap-5 justify-between text-gray-600">
                    <p className="text-xs">
                      {male != 0 && female != 0
                        ? persentase(female, male)
                        : 0}{" "}
                      %
                    </p>
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
<<<<<<< HEAD
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 h-fit flex flex-col gap-3">
          <div className="bg-white rounded-lg p-3">
            <div className="grid grid-cols-12 gap-3">
              <div className="">
=======
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-2">
        <div className="lg:col-span-2 h-fit flex flex-col gap-3">
          <div className="bg-white rounded-lg p-3">
            <div className="grid lg:grid-cols-12 grid-cols-3 gap-3">
              <div className="lg:block hidden">
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
                <div className="flex items-center justify-center overflow-hidden w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                  <svg
                    className="mt-2 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
<<<<<<< HEAD
              <div className="col-span-9">
=======
              <div className="lg:col-span-9 col-span-2">
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
                <input
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  placeholder="What do you want to post..."
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
              <button
<<<<<<< HEAD
                className="col-span-2 bg-[#003049] flex gap-2 p-1 items-center justify-center text-white border border-gray-100 rounded-lg hover:bg-[#003049]"
                onClick={postData}
              >
                <Send />
                <p>Send</p>
=======
                className="lg:col-span-2 bg-[#003049] flex gap-2 lg:p-1 p-0.5 items-center justify-center text-white border border-gray-100 rounded-lg hover:bg-[#003049]"
                onClick={postData}
              >
                <Send />
                <p className="lg:block hidden">Send</p>
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
              </button>
            </div>
          </div>
          <div className={`overflow-y-auto space-y-3` + dataForum.length > 0 ? "h-screen" : ""}>
            {dataForum.length > 0
              ? dataForum.map((val, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-3 flex flex-col gap-3"
                >
                  <div className="flex justify-between items-center">
                    <div className="grid grid-cols-12 gap-3">
                      <div className="col-span-3">
                        <div className="overflow-hidden flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                          {val.image ? (
                            <img src={val.image} />
                          ) : (
                            <svg
                              className="mt-2 text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="col-span-9 flex flex-col gap-1 justify-center">
                        <p className="text-sm">
                          {val.employee ? val.employee.firstName : "Admin"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {val.employee
                            ? val.employee?.jobtitle?.name
                            : "Admin"}
                        </p>
<<<<<<< HEAD
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 font-light">
=======
                        <p className="md:hidden block text-xs text-gray-500 font-light">
                          {val.posted_at
                            ? moment(val.posted_at).format("lll")
                            : "-"}
                        </p>
                      </div>
                    </div>
                    <p className="md:block hidden text-xs text-gray-500 font-light">
>>>>>>> 5505341d8d16fb6211ef3c4ab90b72e27d1785f1
                      {val.posted_at
                        ? moment(val.posted_at).format("llll")
                        : "-"}
                    </p>
                  </div>
                  <p className="text-sm text-gray-800 font-light">
                    {val.description ? val.description : "-"}
                  </p>
                </div>
              ))
              : <div className="h-[80px] bg-white flex justify-center items-center"><p>No Data</p></div>}
          </div>
        </div>
        <div className="bg-white h-fit p-3 rounded-lg">
          <h1 className="text-gray-700 font-semibold mb-4">
            Who’s Birthday In this Month
          </h1>
          <div className="flex flex-col gap-3">
            <h1 className="uppercase text-gray-400 text-sm">
              {dataBirthdate.current_month}
            </h1>
            <div className={`overflow-y-auto space-y-3 max-h-64`}>
              {/* <div className={`overflow-y-auto space-y-3` + dataBirthdate.length > 0 ? "h-screen" : ""}> */}
              {dataBirthdate?.employeesHappyBirthDay?.length > 0 ? (
                dataBirthdate.employeesHappyBirthDay.map((val, index) =>
                  val.birthDate ? (
                    <div key={index} className="grid grid-cols-12">
                      <div className="col-span-3">
                        <div className="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-lg dark:bg-gray-600">
                          {val.image ? (
                            <img src={val.image} />
                          ) : (
                            <svg
                              className="absolute -left-1 w-12 h-12 text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="col-span-9 flex flex-col gap-1 justify-center">
                        <p className="text-sm text-gray-600">{val.firstName}</p>
                        <p className="text-xs text-gray-400">
                          {val.jobtitle ? val.jobtitle.name : "-"}
                        </p>
                      </div>
                    </div>
                  ) : null
                )
              ) : (
                <p className="text-center h- mt-20">No birthday this month</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
