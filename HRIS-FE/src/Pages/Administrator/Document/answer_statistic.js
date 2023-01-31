import { useEffect, useState } from "react";
import {
  Plus,
  Eye,
  FileText,
  DotsThreeOutline,
  MagnifyingGlass,
  FunnelSimple,
  DotsThreeOutlineVertical,
  ArrowRight,
} from "phosphor-react";
// import { Button, Modal, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import ReactSelect from "react-select";
// import faker from 'faker';
import { components } from "react-select";
import {
  AnswerDoc,
  GetDetailDoc,
  GetDoc,
  GetRespondend,
} from "../../../Repository/DocumentRepository";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SwalError, SwalSuccess } from "../../../Components/Modals";
import { pushNotif } from "../../../Repository/NotifRepository";
import { getProfile } from "../../../Repository/ProfileRepository";
import { getReport } from "../../../Repository/ProfileEmployeeRepository";
import { GetJobPositionWithEmployee } from "../../../Repository/AdminRepository";
import { Box, Button, Dialog, Modal, Table, Typography } from "@mui/material";
import { blue, green, grey, red, teal, yellow } from "@mui/material/colors";
import { Cancel, CheckCircle, Close, ImportExport, KeyboardArrowLeft, KeyboardArrowRight, WatchLater } from "@mui/icons-material";
import CircleIcon from '@mui/icons-material/Circle'; 

function AnswerStatistic() {
  const { id } = useParams();
  const [modalDetailApproval, setModalDetailApproval] = useState(false);
  const [editUserData, setEditUserData] = useState();
  const [users, setUsers] = useState({});
  const [employeeLog, setEmployeeLog] = useState({});
  const [reportTo, setReportTo] = useState([]);
  const [Doc, setDoc] = useState([]);
  const [responden, setResponden] = useState([]);
  const [valueAns, setValueAns] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [supervisor, setSupervisor] = useState([]);
  const navigate = useNavigate();
  const inAwait = async () => {
    var empLog = await getProfile();
    var data = JSON.parse(window.localStorage.getItem("users"));
    var rec = await GetDetailDoc(id);
    var res = await GetRespondend()
    var report = await getReport(data?.employeeId);
    const getJobPositionWithEmployee = await GetJobPositionWithEmployee(
      empLog.result?.employee?.jobposition?.relation_code
    );
    setUsers(data);
    setReportTo(report.result);
    setSupervisor(getJobPositionWithEmployee.result?.employees);
    setEmployeeLog(empLog.result);
    setDoc(rec["result"]);
    setResponden(res["data"]);
    console.log(responden)
  };

  var array = [1,2,3];
  var color = ['#304676','#ED6F51','#9ED4D9'];
  var pgbar = [
    {
      'text':'This is example for question number one ',
      'bg':'#003049',
      'prog':'36'
    },
    {
      'text':'This is loongg example for question number two  ',
      'bg':'#304676',
      'prog':'74'
    },
    {
      'text':'This is little long example for question number three',
      'bg':'#219EBC',
      'prog':'86'
    },
    {
      'text':'This is longer than previous example for question number three',
      'bg':'#669BBC',
      'prog':'59'
    },
    {
      'text':'This is longest than previous example for question number Four',
      'bg':'#ED6F51',
      'prog':'86'
    },
    {
      'text':'This is most long than previous example for question number five',
      'bg':'#FF525F',
      'prog':'59'
    }
  ];
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
  var time = [
    {
      'time': [
        '03.15',
        '03.05',
        '03.25',
      ]
    },
    {
      'time': [
        '04.15',
        '04.05',
        '04.25',
      ]
    },
    {
      'time': [
        '05.15',
        '05.05',
        '05.25',
      ]
    },
    {
      'time': [
        '06.15',
        '06.05',
        '06.25',
      ]
    },
  ];
  const date = [
    "15",
    "1",
    "23",
    "29",
    "5",
    "9",
    "30",
    "11",
    "18",
    "15",
    "25",
    "29",
  ];

  useEffect(() => {
    inAwait();
  }, []);

  return (
    <>
      <div className="px-4 mb-4 flex-row space-y-5 ">
          <div className="p-0">
            <h1 className="font-bold">Statistic Answer</h1>
            <p className="text-xs text-gray-400">
            Percentage of overall answers
            </p>
          </div>
        <div
          className="mt-5 p-4 rounded-lg "
          style={{ backgroundColor: "white" }}
        >
          <h1 className="font-bold">Multiple Choice</h1>
          <p className="text-xs m-0 text-gray-400">
            10 answers
            </p>
            <div className="flex justify-center gap-x-56 items-center">
              <div className="w-1/4">
                <Doughnut
                  data={{
                    datasets: [
                      {
                        label: "Job Title",
                        data: array,
                        backgroundColor: color,
                      },
                    ],
                  }}
                />
              </div>
              <div className="flex-row space-y-2">
                <div className="flex space-x-3 items-center">
                  <CircleIcon sx={{color:'#304676'}}/>
                  <p className="" style={{ letterSpacing:'1px' }}>Done</p>
                </div>
                <div className="flex space-x-3 items-center">
                  <CircleIcon sx={{color:'#ED6F51'}}/>
                  <p className="" style={{ letterSpacing:'1px' }}>To Do</p>
                </div>
                <div className="flex space-x-3 items-center">
                  <CircleIcon sx={{color:'#9ED4D9'}}/>
                  <p className="" style={{ letterSpacing:'1px' }}>Pending</p>
                </div>
              </div>
            </div>
        </div>
        <div
          className="p-4 rounded-lg "
          style={{ backgroundColor: "white" }}
        >
          <h1 className="font-bold">Dropdown Answer</h1>
          <p className="text-xs m-0 text-gray-400">
            10 answers
            </p>
            <div className="flex justify-center gap-x-56 items-center">
              <div className="w-1/4">
                <Doughnut
                  data={{
                    datasets: [
                      {
                        label: "Job Title",
                        data: array,
                        backgroundColor: color,
                      },
                    ],
                  }}
                />
              </div>
              <div className="flex-row space-y-2">
                <div className="flex space-x-3 items-center">
                  <CircleIcon sx={{color:'#304676'}}/>
                  <p className="" style={{ letterSpacing:'1px' }}>Done</p>
                </div>
                <div className="flex space-x-3 items-center">
                  <CircleIcon sx={{color:'#ED6F51'}}/>
                  <p className="" style={{ letterSpacing:'1px' }}>To Do</p>
                </div>
                <div className="flex space-x-3 items-center">
                  <CircleIcon sx={{color:'#9ED4D9'}}/>
                  <p className="" style={{ letterSpacing:'1px' }}>Pending</p>
                </div>
              </div>
            </div>
        </div>
        <div
          className="p-4 rounded-lg "
          style={{ backgroundColor: "white" }}
        >
          <h1 className="font-bold">Checkbox Answer</h1>
          <p className="text-xs m-0 text-gray-400">
            10 answers
            </p>
            <div className="mt-2 flex-col justify-center gap-x-5 items-center">
              <div className="flex-row space-y-4">
                {
                  pgbar.map((val)=> {
                    return (
                      <div className="grid grid-cols-2 gap-3 items-center">
                        <p className="m-0 text-right text-xs">{val.text}</p>
                          <div className={` bg-[#F5F5F5] h-6 rounded-lg dark:bg-gray-700`}>
                            <div className={`bg-[${val.bg}] text-xs h-6 font-medium text-blue-100 text-center p-0.5 leading-none rounded-lg flex ps-2 items-center`} style={{width:`${val.prog}%`,backgroundColor:`${val.bg}`}}> {`%${val.prog}`}</div>
                          </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
        </div>
        <div
          className="p-4 rounded-lg "
          style={{ backgroundColor: "white" }}
        >
          <h1 className="font-bold">Shortanswer Answer</h1>
          <p className="text-xs m-0 text-gray-400">
            10 answers
            </p>
            <div className="mt-4 flex-col justify-center gap-x-5 items-center">
              <div className="flex-row space-y-4">
                {
                  pgbar.map((val)=> {
                    return (
                      <div className="bg-[#F3F3F3]  rounded-lg p-2.5 flex justify-start">
                        <p className="m-0 text-right text-xs">{val.text}</p>
                      </div>
                    )
                  })
                }
                {/* {
                  pgbar.map((val)=> {
                    return (
                      <div className="grid grid-cols-2 gap-3 items-center">
                        <p className="m-0 text-right text-xs">{val.text}</p>
                          <div className={` bg-[#F5F5F5] h-6 rounded-lg dark:bg-gray-700`}>
                            <div className={`bg-[${val.bg}] text-xs h-6 font-medium text-blue-100 text-center p-0.5 leading-none rounded-lg flex ps-2 items-center`} style={{width:`${val.prog}%`,backgroundColor:`${val.bg}`}}> {`%${val.prog}`}</div>
                          </div>
                      </div>
                    )
                  })
                } */}
              </div>
            </div>
        </div>
        <div
          className="p-4 rounded-lg "
          style={{ backgroundColor: "white" }}
        >
          <h1 className="font-bold">Paragraf Answer</h1>
          <p className="text-xs m-0 text-gray-400">
            10 answers
            </p>
            <div className="mt-4 flex-col justify-center gap-x-5 items-center">
              <div className="flex-row space-y-4">
                {
                  pgbar.map((val)=> {
                    return (
                      <div className="bg-[#F3F3F3] rounded-lg p-2.5 flex justify-start">
                        <p className="m-0 text-right text-xs">{val.text}</p>
                      </div>
                    )
                  })
                }
                {/* {
                  pgbar.map((val)=> {
                    return (
                      <div className="grid grid-cols-2 gap-3 items-center">
                        <p className="m-0 text-right text-xs">{val.text}</p>
                          <div className={` bg-[#F5F5F5] h-6 rounded-lg dark:bg-gray-700`}>
                            <div className={`bg-[${val.bg}] text-xs h-6 font-medium text-blue-100 text-center p-0.5 leading-none rounded-lg flex ps-2 items-center`} style={{width:`${val.prog}%`,backgroundColor:`${val.bg}`}}> {`%${val.prog}`}</div>
                          </div>
                      </div>
                    )
                  })
                } */}
              </div>
            </div>
        </div>
        <div
          className="p-4 rounded-lg "
          style={{ backgroundColor: "white" }}
        >
          <h1 className="font-bold">Upload File Answer</h1>
          <p className="text-xs m-0 text-gray-400">
            10 answers
            </p>
            <div className="mt-4 flex-col justify-center gap-x-5 items-center">
              <div className="flex-row space-y-4">
                {
                  pgbar.map((val)=> {
                    return (
                      <div className="bg-[#EFF7FD] rounded-lg px-3 py-2 flex justify-start items-center">
                        <div className="p-1.5 bg-[#A5C6DB] rounded-sm me-2">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 18C1.45 18 0.979 17.8043 0.587 17.413C0.195667 17.021 0 16.55 0 16V2C0 1.45 0.195667 0.979 0.587 0.587C0.979 0.195667 1.45 0 2 0H16C16.55 0 17.021 0.195667 17.413 0.587C17.8043 0.979 18 1.45 18 2V16C18 16.55 17.8043 17.021 17.413 17.413C17.021 17.8043 16.55 18 16 18H2ZM3 14H15L11.25 9L8.25 13L6 10L3 14Z" fill="#3B5D6F"/>
                          </svg>
                        </div>
                        <p className="m-0 text-right text-xs">{val.text}</p>
                      </div>
                    )
                  })
                }
                {/* {
                  pgbar.map((val)=> {
                    return (
                      <div className="grid grid-cols-2 gap-3 items-center">
                        <p className="m-0 text-right text-xs">{val.text}</p>
                          <div className={` bg-[#F5F5F5] h-6 rounded-lg dark:bg-gray-700`}>
                            <div className={`bg-[${val.bg}] text-xs h-6 font-medium text-blue-100 text-center p-0.5 leading-none rounded-lg flex ps-2 items-center`} style={{width:`${val.prog}%`,backgroundColor:`${val.bg}`}}> {`%${val.prog}`}</div>
                          </div>
                      </div>
                    )
                  })
                } */}
              </div>
            </div>
        </div>
        <div
          className="p-4 rounded-lg "
          style={{ backgroundColor: "white" }}
        >
          <h1 className="font-bold">Date Answer</h1>
          <p className="text-xs m-0 text-gray-400">
            10 answers
            </p>
            <div className="mt-4 flex-col justify-start gap-x-5 items-center">
              <div className="col-8 space-y-4">
                <div className="grid grid-cols-2 gap-x-3 items-center"
                style={{
                  height: "235px",
                  borderRadius: "5px",
                  overflow: "hidden",
                  whiteSpace: "unset",
                  scrollbarColor: "transparent",
                  scrollbarWidth: "none",
                }}
                >
                  <div className="" style={{borderRight:'1px solid #737373'}}>
                    {
                      month.map((val)=> {
                        return (
                            <div className="me-2 p-2 py-3 ">
                              <p className="m-0 text-xs">{val}</p>
                            </div>
                        )
                      })
                    }
                  </div>
                  <div className="">
                    {
                      date.map((val)=> {
                        return (
                          <div className="flex">
                            {
                              [1,2,3].map((val)=> {
                                return(
                                  <div className="me-2 p-1 py-2 ">
                                    <div className="p-2 w-8 h-8 justify-center flex items-center text-white rounded-md bg-[#003049]">
                                      <p className="m-0 text-xs text-center">{val}</p>
                                    </div>
                                  </div>
                                )
                              })
                            }
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div
          className="p-4 rounded-lg "
          style={{ backgroundColor: "white" }}
        >
          <h1 className="font-bold">Time Answer</h1>
          <p className="text-xs m-0 text-gray-400">
            10 answers
            </p>
            <div className="mt-4 flex-col justify-start gap-x-5 items-center">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-x-3 items-center"
                style={{
                  height: "235px",
                  borderRadius: "5px",
                  overflowY: "hidden",
                  whiteSpace: "unset",
                  scrollbarColor: "transparent",
                  scrollbarWidth: "none",
                }}
                >
                  <div className="col-4" style={{borderRight:'1px solid #737373'}}>
                    {
                      ['03.__','04.__','05.__','06.__'].map((val)=> {
                        return (
                            <div className="me-2 p-2 py-3 ">
                              <p className="m-0 text-xs">{val}</p>
                            </div>
                        )
                      })
                    }
                  </div>
                  <div className="col-8">
                    {
                      time.map((val)=> {
                        return (
                          <div className="flex">
                            {
                              time.map((val) => {
                                return (
                                  <div className="me-2 p-1 py-2 ">
                                    <div className="p-2 w-auto justify-center flex items-center text-white rounded-md bg-[#003049]">
                                      <p className="m-0 text-xs text-center">{val.time}</p>
                                    </div>
                                  </div>
                                )
                              })
                            }
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
      <Modal
        open={modalDetailApproval}
        onClose={() => setModalDetailApproval(false)}
      >
        <Dialog
          open={modalDetailApproval}
          onClose={() => setModalDetailApproval(false)}
          scroll="body"
          fullWidth={true}
          maxWidth="sm"
        >
          <div className="m-5">
            <div className="flex justify-between mb-5">
              <h3 className="font-semibold text-xl">Detail Approval</h3>
              <button onClick={() => setModalDetailApproval(false)}>
                <Close />
              </button>
            </div>
            <div className="space-y-3">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs bg-[#EBF7FF] text-gray-700 uppercase dark:text-gray-400">
                  <tr className="capitalize">
                    <th className="py-3 px-3">Leader Name</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-3">Abdan Syakuro</td>
                    <td className="py-2 px-3">
                      <CheckCircle sx={{ color: teal[500] }} />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">Abdan Syakuro</td>
                    <td className="py-2 px-3">
                      <WatchLater
                        sx={{ color: yellow[800] }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">Abdan Syakuro</td>
                    <td className="py-2 px-3">
                      <Cancel sx={{ color: red[800] }} />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-end gap-2 mt-5">
                <button
                  className="bg-[#0E5073] rounded-lg px-4 py-2 text-white"
                  onClick={() => setModalDetailApproval(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </Modal>
    </>
  );
}
export default AnswerStatistic;
