import {
  Add,
  AlignVerticalCenter,
  ArrowUpwardTwoTone,
  Close,
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

import { useEffect, useState } from "react";
import {
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Form,
} from "react-bootstrap";
import {
  AddWorkShift,
  deleteWorkShift,
  EditWorkShift,
  GetJobPosition,
  getWorkShift,
} from "../../../../Repository/AdminRepository";
import { GetEmployeeName } from "../../../../Repository/EmployeeRepository";
import { ModalDelete, SwalSuccess } from "../../../../Components/Modals";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

function WorkShift() {
  var array = [
    "Faris",
    "Ahmad",
    "Subarja",
    "Soleh",
    "Pesulap Merah",
    "Pesulap Hijau",
    "Pesulap Pink",
    "Pesulap Biru",
    "Pesulap Kuning",
  ];
  const [workshift, setWorkShift] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [workshiftEdit, setWorkShiftEdit] = useState();
  const [jobposition, setJobPosition] = useState([]);
  const inAwait = async () => {
    var emp = await GetEmployeeName();
    var rec = await getWorkShift();
    console.log(rec);
    setWorkShift(rec);
    setEmployee(emp);
    var jpos = await GetJobPosition();
    setJobPosition(jpos["result"]);
  };
  useEffect(() => {
    inAwait();
  }, []);
  const [dialogTitle, setTitle] = useState(false);
  const [dialogEditTitle, setEditTitle] = useState(false);
  const [selected, setSelected] = useState([]);
  const [posisi, setPosisi] = useState([]);
  const [isEmp, setEmp] = useState(false);
  const [isPosi, setPosi] = useState(false);
  const [duration, setDuration] = useState("");
  //   const [workshiftIds, setWorkShiftIds] = useState([]);
  const [radioValue, setRadioValue] = useState("1");
  const [isdelete, setDelete] = useState(false);
  const [id, setId] = useState();
  const [isCheckedAll, setCheckedAll] = useState(false);
  const [isDelAll, setDelAll] = useState([]);
  const [isCheck, setIsCheck] = useState([]);

  const handleSelectAll = async (e) => {
    setCheckedAll(!isCheckedAll);
    var arr = [];
    if (!isCheckedAll) {
      for (var x = 0;x < workshift.length;x++) {
        arr.push(workshift[x].id);
      }
    }
    setIsCheck(arr);
  };

  const handleClick = async (e) => {
    setCheckedAll(false);
    const value = parseInt(e.target.value);
    var data = [...isCheck];
    if (isCheck.includes(value)) {
      var index = data.indexOf(value);
      data.splice(index,1);
    } else {
      data.push(value);
    }
    setIsCheck(data);
  };

  return (
    <>
      <div
        className="w-100 p-4"
        style={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
      >
        <h5>
          <b>Work Shift</b>
        </h5>
        <p>
          <small>list of Work Shift</small>
        </p>
        <br></br>
        <div className="d-flex justify-content-between">
          <div>
            <Button
              style={{
                color: "#003049",
                border: "1px solid #00000040",
                borderRadius: "7px",
                backgroundColor: "transparent",
              }}
              variant="contained"
              startIcon={<DeleteOutline />}
              onClick={async () => {
                for (var x = 0;x < isCheck.length;x++) {
                  await deleteWorkShift(isCheck[x]);
                }
                // console.log(isDelAll)
                SwalSuccess({ message: "Success Delete All Workshift" });
                setIsCheck([]);
                await inAwait();
                setCheckedAll(false);
              }}
            >
              Delete
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                setTitle(!dialogTitle);
              }}
              style={{
                color: "#FFFFFF",
                borderRadius: "7px",
                backgroundColor: "#0E5073",
              }}
              variant="contained"
              startIcon={<Add />}
            >
              Add Work Shift
            </Button>
          </div>
        </div>
        <br></br>
        <Table borderless responsive style={{ color: "#00000070", fontSize: "0.75rem"}}>
          <thead>
            <tr style={{ backgroundColor: "#EBF7FF" }}>
              <th width="10px">
                <input type="checkbox" style={{ borderRadius: "2px" }} onChange={handleSelectAll} checked={isCheckedAll}/>
              </th>
              <th onClick={() => {}}>
                Work Shift <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {workshift.length > 0 ? (
              workshift.map((val) => {
                return (
                  <tr>
                    <td className="align-middle">
                      <input
                        key={val.id}
                        type="checkbox" 
                        value={val.id}
                        style={{ borderRadius: "2px" }} 
                        // checked={isCheckedAll ? true : false}
                        checked={isCheck.includes(val.id)}
                        // onChange={(e) => console.log(skill["id"])}
                        onChange={handleClick} 
                      />
                    </td>
                    <td className="align-middle" style={{ minWidth: "200px" }}>
                      {val["name"]}
                    </td>
                    <td className="align-middle" style={{ minWidth: "100px" }}>
                      <button
                        onClick={() => {
                          if (val.jobpositions.length > 0) {
                            val.jobpositions.forEach((job) =>
                              setSelected((current) => [...current, job.id])
                            );
                            setPosi(true);
                          } else {
                            val.employees.forEach((emp) =>
                              setSelected((current) => [...current, emp.id])
                            );
                            setEmp(true);
                          }
                          setEditTitle(!dialogEditTitle);
                          setWorkShiftEdit(val);
                        }}
                        className="btn btn-sm mx-1"
                        style={{
                          backgroundColor: "#CEDFEA",
                          borderRadius: "8px",
                        }}
                      >
                        <EditOutlined fontSize="10px" />
                      </button>
                      <button
                        className="btn btn-sm mx-1"
                        style={{
                          backgroundColor: "#CEDFEA",
                          borderRadius: "8px",
                        }}
                        onClick={() => {
                          setDelete(true);
                          setId(val["id"]);
                        }}
                      >
                        <DeleteOutline fontSize="10px" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <td colSpan={3}>
                <div className="d-flex justify-content-center align-middle text-center">
                  No Data
                </div>
              </td>
            )}
          </tbody>
        </Table>
      </div>

      <Modal
        show={dialogTitle}
        size="lg"
        onHide={() => {
          setSelected([]);
          setPosisi([]);
          setTitle(!dialogTitle);
          setDuration("");
        }}
      >
        <Modal.Header
          closeButton
          className="m-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title>Add Work Shift</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            var requestBody = {
              name: document.getElementById("name").value,
              start: document.getElementById("start").value,
              end: document.getElementById("end").value,
              duration: duration,
              employee_ids: selected,
              position_ids: posisi,
            };
            var res = await AddWorkShift(requestBody);
            setTitle(!dialogTitle);
            setSelected([]);
            setDuration("");
            setPosisi([]);
            inAwait();
          }}
        >
          <Modal.Body className="mx-4">
            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    Work Shift Name <span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    id="name"
                    className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Work Shift..."
                  />
                </div>
              </div>
              <h1>Working hours</h1>
              <div className="col-md-4 my-3">
                <div className="form-group">
                  <label className="mb-1">Start</label>
                  <input
                    required
                    type="time"
                    id="start"
                    className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="col-md-4 my-3">
                <div className="form-group">
                  <label className="mb-1">End</label>
                  <input
                    required
                    type="time"
                    id="end"
                    onChange={(e) => {
                      let checkDuration =
                        parseInt(e.target.value.split(":")[0]) +
                        parseInt(
                          document.getElementById("start").value.split(":")[0]
                        );
                      let duration1 = Math.abs(
                        parseInt(e.target.value.split(":")[0]) -
                          parseInt(
                            document.getElementById("start").value.split(":")[0]
                          )
                      );
                      let duration2 = Math.abs(
                        parseInt(e.target.value.split(":")[1]) -
                          parseInt(
                            document.getElementById("start").value.split(":")[1]
                          )
                      );
                      if (checkDuration >= 60) {
                        duration1 += 1;
                      }
                      setDuration(`${duration1}:${duration2}`);
                    }}
                    className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
              {/* <div className="col-md-4 my-3">
                <div className="form-group">
                  <label className="mb-1">Duration per day</label>
                  <h6>{duration}</h6>
                  <input
                    readOnly
                    type="time"
                    id="duration"
                    value={duration}
                    className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div> */}
              <div className="col-md-12 my-3">
                <div className="form-group">
                  <label className="mb-1">Assign To</label>
                  <div>
                    <div className="grid w-50 grid-cols-2 space-x-2 mb-2 bg-[#F0F0F3] rounded-xl p-1.5">
                      <div>
                        <input
                          type="radio"
                          name="option"
                          id="1"
                          className="peer hidden"
                          checked={isEmp}
                          onChange={async () => {
                            setEmp(true);
                            setPosi(false);
                          }}
                        />
                        <label
                          for="1"
                          className="text-[#CACACA] block cursor-pointer text-sm select-none rounded-xl p-2 text-center peer-checked:bg-white peer-checked:font-bold peer-checked:text-[#5C5C5C]"
                        >
                          Employee
                        </label>
                      </div>

                      <div>
                        <input
                          type="radio"
                          name="option"
                          id="2"
                          class="peer hidden"
                          checked={isPosi}
                          onChange={async () => {
                            setPosi(true);
                            setEmp(false);
                          }}
                        />
                        <label
                          for="2"
                          className="text-[#CACACA] block cursor-pointer text-sm select-none rounded-xl p-2 text-center peer-checked:bg-white peer-checked:font-bold peer-checked:text-[#5C5C5C]"
                        >
                          Position
                        </label>
                      </div>
                    </div>
                  </div>
                  <select
                    required={isEmp}
                    style={{
                      display: isEmp ? "block" : !isPosi ? "none" : "none",
                    }}
                    onChange={(val) =>
                      setSelected((current) => [...current, val.target.value])
                    }
                    className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Search Employee</option>
                    {employee.map((val) => {
                      return (
                        <option value={val["id"]}>{val["firstName"]}</option>
                      );
                    })}
                  </select>
                  <div className="d-flex flex-wrap justify-content-start mt-3">
                    {selected.map((value) => (
                      <div
                        className="px-2 d-flex align-items-center my-2 mr-3"
                        style={{
                          backgroundColor: "#00000030",
                          color: "#00000050",
                          borderRadius: "5px",
                        }}
                      >
                        {value}
                        <button
                          onClick={() => {
                            return setSelected(
                              selected.filter((val) => val !== value)
                            );
                          }}
                          type="button"
                          className="btn btn-sm"
                          style={{ color: "#00000030" }}
                        >
                          <Close />
                        </button>
                      </div>
                    ))}
                  </div>
                  <select
                    required={isPosi}
                    style={{
                      display: isPosi ? "block" : !isEmp ? "none" : "none",
                    }}
                    onChange={(val) =>
                      setPosisi((current) => [...current, val.target.value])
                    }
                    className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Search Position</option>
                    {jobposition.map((val) => {
                      return <option value={val.id}>{val.name}</option>;
                    })}
                  </select>
                </div>
                <div className="d-flex flex-wrap justify-content-start mt-3">
                  {posisi.map((value) => (
                    <div
                      className="px-2 d-flex align-items-center my-2 mr-3"
                      style={{
                        backgroundColor: "#00000030",
                        color: "#00000050",
                        borderRadius: "5px",
                      }}
                    >
                      {value}
                      <button
                        onClick={() => {
                          return setPosisi(
                            posisi.filter((val) => val !== value)
                          );
                        }}
                        type="button"
                        className="btn btn-sm"
                        style={{ color: "#00000030" }}
                      >
                        <Close />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="m-4">
            <button
              className="btn"
              style={{
                backgroundColor: "#00000010",
                border: "1px solid transparent",
                color: "#0E5073",
                width: "100px",
              }}
              onClick={() => {
                setSelected([]);
                setPosisi([]);
                setTitle(!dialogTitle);
                setDuration("");
              }}
              type="button"
            >
              Cancel
            </button>
            <button
              className="btn"
              style={{
                backgroundColor: "#0E5073",
                border: "1px solid transparent",
                color: "#FFFFFF",
                width: "100px",
              }}
              type="submit"
            >
              Add
            </button>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal
        show={dialogEditTitle}
        size="lg"
        onHide={() => {
          setSelected([]);
          setPosisi([]);
          setEmp(false);
          setPosi(false);
          setDuration("");
          setEditTitle(!dialogEditTitle);
        }}
      >
        <Modal.Header
          closeButton
          className="m-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title>Edit Work Shift</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  Work Shift Name <span className="text-danger">*</span>
                </label>
                <input
                  id="nameEdit"
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Work Shift..."
                  value={workshiftEdit?.name ?? null}
                  onChange={(e) =>
                    setWorkShiftEdit({ ...workshiftEdit, name: e.target.value })
                  }
                />
              </div>
            </div>
            <h1>Working hours</h1>
            <div className="col-md-4 my-3">
              <div className="form-group">
                <label className="mb-1">Start</label>
                <input
                  type="time"
                  value={workshiftEdit?.start ?? null}
                  onChange={(e) =>
                    setWorkShiftEdit({
                      ...workshiftEdit,
                      start: e.target.value,
                    })
                  }
                  id="startEdit"
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div className="col-md-4 my-3">
              <div className="form-group">
                <label className="mb-1">End</label>
                <input
                  type="time"
                  value={workshiftEdit?.end ?? null}
                  onChange={(e) => {
                    setWorkShiftEdit({ ...workshiftEdit, end: e.target.value });
                    let checkDuration =
                      parseInt(e.target.value.split(":")[0]) +
                      parseInt(
                        document.getElementById("startEdit").value.split(":")[0]
                      );
                    let duration1 = Math.abs(
                      parseInt(e.target.value.split(":")[0]) -
                        parseInt(
                          document
                            .getElementById("startEdit")
                            .value.split(":")[0]
                        )
                    );
                    let duration2 = Math.abs(
                      parseInt(e.target.value.split(":")[1]) -
                        parseInt(
                          document
                            .getElementById("startEdit")
                            .value.split(":")[1]
                        )
                    );
                    if (checkDuration >= 60) {
                      duration1 += 1;
                    }
                    setDuration(`${duration1}:${duration2}`);
                  }}
                  id="endEdit"
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div className="col-md-4 my-3">
              <div className="form-group">
                <label className="mb-1">Duration per day</label>
                <h6>{duration != "" ? duration : workshiftEdit?.duration}</h6>
              </div>
            </div>
            <div className="col-md-12 my-3">
              <div className="form-group">
                <label className="mb-1">Assign To</label>
                <div>
                  <div className="grid w-50 grid-cols-2 space-x-2 mb-2 bg-[#F0F0F3] rounded-xl p-1.5">
                    <div>
                      <input
                        type="radio"
                        name="option"
                        id="1"
                        className="peer hidden"
                        checked={isEmp}
                        onChange={async () => {
                          setEmp(true);
                          setPosi(false);
                        }}
                      />
                      <label
                        for="1"
                        className="text-[#CACACA] block cursor-pointer text-sm select-none rounded-xl p-2 text-center peer-checked:bg-white peer-checked:font-bold peer-checked:text-[#5C5C5C]"
                      >
                        Employee
                      </label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        name="option"
                        id="2"
                        class="peer hidden"
                        checked={isPosi}
                        onChange={async () => {
                          setPosi(true);
                          setEmp(false);
                        }}
                      />
                      <label
                        for="2"
                        className="text-[#CACACA] block cursor-pointer text-sm select-none rounded-xl p-2 text-center peer-checked:bg-white peer-checked:font-bold peer-checked:text-[#5C5C5C]"
                      >
                        Position
                      </label>
                    </div>
                  </div>
                </div>
                <select
                  style={{
                    display: isEmp ? "block" : !isPosi ? "none" : "none",
                  }}
                  onChange={(val) =>
                    setSelected((current) => [...current, val.target.value])
                  }
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>Search Employee</option>
                  {employee.map((val) => {
                    return (
                      <option value={val["id"]}>{val["firstName"]}</option>
                    );
                  })}
                </select>
                <select
                  style={{
                    display: isPosi ? "block" : !isEmp ? "none" : "none",
                  }}
                  onChange={(val) =>
                    setSelected((current) => [...current, val.target.value])
                  }
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>Search Position</option>
                  {jobposition.map((val) => {
                    return <option value={val.id}>{val.name}</option>;
                  })}
                </select>
              </div>
              <div className="d-flex flex-wrap justify-content-start mt-3">
                {selected.map((value, index) => (
                  <div
                    key={index}
                    className="px-2 d-flex align-items-center my-2 mr-3"
                    style={{
                      backgroundColor: "#00000030",
                      color: "#00000050",
                      borderRadius: "5px",
                    }}
                  >
                    {value}
                    <button
                      onClick={() => {
                        return setSelected(
                          selected.filter((val) => val !== value)
                        );
                      }}
                      className="btn btn-sm"
                      style={{ color: "#00000030" }}
                    >
                      <Close />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="m-4">
          <button
            className="btn"
            style={{
              backgroundColor: "#00000010",
              border: "1px solid transparent",
              color: "#0E5073",
              width: "100px",
            }}
            onClick={() => {
              setSelected([]);
              setPosisi([]);
              setEmp(false);
              setPosi(false);
              setDuration("");
              setEditTitle(!dialogEditTitle);
            }}
          >
            Cancel
          </button>
          <button
            className="btn"
            style={{
              backgroundColor: "#0E5073",
              border: "1px solid transparent",
              color: "#FFFFFF",
              width: "100px",
            }}
            onClick={async () => {
              var requestBody = {
                id: workshiftEdit.id,
                name: document.getElementById("nameEdit")?.value,
                start: document.getElementById("startEdit")?.value,
                end: document.getElementById("endEdit")?.value,
                duration: duration,
                employee_ids: selected ?? [],
              };
              var res = await EditWorkShift(requestBody);
              setEditTitle(!dialogEditTitle);
              setSelected([]);
              setPosisi([]);
              setDuration("");
              inAwait();
            }}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>

      <ModalDelete
        close={() => {
          setDelete(false);
        }}
        submit={() => {
          deleteWorkShift(id);
          inAwait();
          setDelete(false);
        }}
        active={isdelete}
      />
    </>
  );
}

export default WorkShift;
