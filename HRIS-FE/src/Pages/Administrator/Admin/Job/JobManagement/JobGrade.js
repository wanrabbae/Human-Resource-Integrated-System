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
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "react-bootstrap";
// import { GetJobGrade } from "../../../../../Repository/AdminRepository";
import {
  AddJobGrade,
  DeleteJobGrade,
  EditJobGrade,
  GetJobGrade,
} from "../../../../../Repository/AdminRepository";
import { ModalDelete, SwalSuccess } from "../../../../../Components/Modals";
import * as XLSX from "xlsx";

function JobGrade() {
  const [jobgrade, setJobGrade] = useState([]);
  const [editValues, setEditValues] = useState();
  const [range, setRange] = useState([]);
  const [minGaji, setMinGaji] = useState("");
  const [maxGaji, setMaxGaji] = useState("");
  const inAwait = async () => {
    var rec = await GetJobGrade();
    setJobGrade(rec);
  };
  useEffect(() => {
    inAwait();
  }, []);
  const [isCheckedAll, setCheckedAll] = useState(false);
  const [isDelAll, setDelAll] = useState([]);
  const [isCheck, setIsCheck] = useState([]);

  const handleSelectAll = async (e) => {
    setCheckedAll(!isCheckedAll);
    var arr = [];
    if (!isCheckedAll) {
      for (var x = 0; x < jobgrade.length; x++) {
        arr.push(jobgrade[x].id);
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
      data.splice(index, 1);
    } else {
      data.push(value);
    }
    setIsCheck(data);
  };
  const [dialogTitle, setTitle] = useState(false);
  const [dialogEditTitle, setEditTitle] = useState(false);
  const [isdelete, setDelete] = useState(false);
  const [isRange, setIsRange] = useState(false);
  const [id, setId] = useState();
  const [isMulti, setMulti] = useState(true);
  const [isMulti2, setMulti2] = useState(false);
  
  const exportExcel = async () => {
    if (jobgrade.length > 0) {
      var wb = XLSX.utils.book_new();
      var data = [];

      await jobgrade.map((app) => {
        data.push({
          "Name": app.name,
          "Currency": app.type,
          "Minimum Salary": app.minsalary,
          "Maximum Salary": app.maxsalary,
        });
      });

      var ws = XLSX.utils.json_to_sheet(data);

      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

      XLSX.writeFile(wb, "Job Grade.xlsx");
      console.log("Exported excel!");
    } else {
      alert("Data masih kosong");
    }
  };

  const addGrade = async (e) => {
    e.preventDefault();
    console.log("TEST");
    let rangeValue = [];
    await range.map((r) => rangeValue.push(document.getElementById(r).value));
    let rangeValue2 = `[${rangeValue.map((r) => `"${r}"`)}]`;
    var requestBody = {
      name:
        isMulti == true
          ? document.getElementById("name").value
          : rangeValue[0] + "-" + rangeValue[rangeValue.length - 1],
      type: document.getElementById("type").value,
      range: rangeValue2,
      minsalary: document.getElementById("minsalary").value,
      maxsalary: document.getElementById("maxsalary").value,
    };
    var res = await AddJobGrade(requestBody);
    setTitle(!dialogTitle);
    setRange([]);
    setMulti(false);
    setMinGaji("");
    setMaxGaji("");
    SwalSuccess({ message: "Success add job grade" });
    inAwait();
    console.log(res);
  };

  return (
    <>
      <div
        className="w-100 p-4"
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "15px",
          boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.25)",
        }}
      >
        <h5>
          <b>Job Grade</b>
        </h5>
        <p>
          <small>list of job grade</small>
        </p>
        <br></br>
        <div className="d-flex justify-content-between">
          <div className="flex gap-3">
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
                for (var x = 0; x < isCheck.length; x++) {
                  await DeleteJobGrade(isCheck[x]);
                }
                // console.log(isDelAll)
                SwalSuccess({ message: "Success Delete All Job Grade" });
                setIsCheck([]);
                await inAwait();
                setCheckedAll(false);
              }}
            >
              Delete
            </Button>
            {/* <Button
              style={{
                color: "#003049",
                border: "1px solid #00000040",
                borderRadius: "7px",
                backgroundColor: "transparent",
              }}
              variant="contained"
              className="flex gap-2"
              onClick={() => {
                exportExcel();
              }}
            >
              <svg
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
            </Button> */}
          </div>
          <div>
            <Button
              onClick={() => {
                setMulti(false);
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
              Add Job Grade
            </Button>
          </div>
        </div>
        <br></br>
        <Table
          borderless
          responsive
          style={{ color: "#00000070", fontSize: "0.75rem" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#EBF7FF" }}>
              <th width="10px">
                <input
                  type="checkbox"
                  style={{ borderRadius: "2px" }}
                  onChange={handleSelectAll}
                  checked={isCheckedAll}
                />
              </th>
              <th onClick={() => {}}>
                Grade Name <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}}>Currency</th>
              <th onClick={() => {}}>Minimum salary</th>
              <th onClick={() => {}}>Maximum salary</th>
              <th onClick={() => {}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobgrade.length > 0 ? (
              jobgrade.map((val) => {
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
                    <td className="align-middle">{val["type"]}</td>
                    <td className="align-middle">{val["minsalary"]}</td>
                    <td className="align-middle">{val["maxsalary"]}</td>
                    <td className="align-middle" style={{ minWidth: "100px" }}>
                      <button
                        onClick={() => {
                          setId(val["id"]);
                          if (val?.rangegrade?.length > 0) {
                            setIsRange(true);
                            setMulti2(true);
                          }
                          setEditValues(val);
                          setRange(val?.rangegrade ?? []);
                          setEditTitle(!dialogEditTitle);
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
              <td colSpan={6}>
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
          setRange([]);
          setMinGaji("");
          setMaxGaji("");
          setTitle(!dialogTitle);
          setMulti(!isMulti);
        }}
      >
        <Modal.Header
          closeButton
          className="m-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title>Add Job Grade</Modal.Title>
        </Modal.Header>
        <form onSubmit={(e) => addGrade(e)}>
          <Modal.Body className="mx-4">
            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    Job Grade <span className="text-danger">*</span>
                  </label>
                  <input
                    disabled={!isMulti}
                    className="form-control"
                    id="name"
                    placeholder="Job grade..."
                    required={!isMulti}
                  />
                </div>
              </div>
              <div className="flex items-center mb-3">
                <input
                  id="checked-checkbox"
                  onClick={() => setMulti(!isMulti)}
                  type="checkbox"
                  value=""
                  required={false}
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded-md border-gray-300 focus:ring-0"
                />
                <label
                  for="checked-checkbox"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Customize grade range
                </label>
              </div>
              <div
                className="mb-3"
                style={{ display: !isMulti ? "block" : "none" }}
              >
                <div className="col-md-4 mb-3">
                  <div className="form-group">
                    <label className="mb-1">Number of Ranges Used</label>
                    <input
                      className="form-control"
                      type="number"
                      required={!isMulti}
                      id="name2"
                      onChange={() => {
                        var value = parseInt(
                          document.getElementById("name2").value
                        );
                        let data = [];

                        if (value == NaN || !value || value == "") {
                          console.log("asd");
                          setRange([]);
                        } else {
                          for (let i = 0; i < value; i++) {
                            data.push(i);
                            setRange(data);
                          }
                          console.log(range);
                        }
                      }}
                      placeholder="Job grade..."
                      style={{
                        borderRadius: "0.25rem",
                        border: "1px solid #ced4da",
                      }}
                    />
                  </div>
                </div>
                <div className="w-100"></div>
                <div className="grid gap-3 grid-rows-1 grid-cols-8">
                  {range.map((val) => {
                    return (
                      <div className="mb-3">
                        <div className="form-group" style={{ width: "70px" }}>
                          <label className="mb-1 text-sm">
                            {val + 1} Range
                          </label>
                          <input
                            className="form-control "
                            id={val}
                            style={{
                              borderRadius: "0.25rem",
                              border: "1px solid #ced4da",
                            }}
                            required={isMulti}
                            // onChange={(e) =>
                            //   setRangeValues([...rangeValues, e.target.value])
                            // }
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-12 mb-3">
                <h2>Currency</h2>
              </div>
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label className="mb-1">Currency type</label>
                  <select required id="type" className="form-control">
                    <option value="">Select currency</option>
                    <option value="IDR">IDR (Indonesia Rupiah)</option>
                    <option value="USD">USD (United Stated Dollar)</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    Minimum salary <span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    id="minsalary"
                    className="form-control"
                    value={minGaji}
                    onChange={(e) => setMinGaji(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    Maximum salary <span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    id="maxsalary"
                    className="form-control"
                    value={maxGaji}
                    onChange={(e) => setMaxGaji(e.target.value)}
                  />
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
              type="button"
              onClick={() => {
                setRange([]);
                setMinGaji("");
                setMaxGaji("");
                setTitle(!dialogTitle);
                setMulti(!isMulti);
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
          setIsRange(false);
          setMinGaji("");
          setMulti2(false);
          setMaxGaji("");
          setRange([]);
          setEditTitle(!dialogEditTitle);
        }}
      >
        <Modal.Header
          closeButton
          className="m-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title>Edit Job Grade</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  Job Grade <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  placeholder="Jobl grade..."
                  id="nameEdit"
                  disabled={isMulti2}
                  value={editValues?.name ?? null}
                  onChange={(e) =>
                    setEditValues({ ...editValues, name: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex items-center mb-3">
              <input
                id="checked-checkbox"
                onClick={() => {
                  setMulti2(!isMulti2);
                  setIsRange(!isRange);
                }}
                type="checkbox"
                value=""
                checked={isMulti2}
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded-md border-gray-300 focus:ring-0"
              />
              <label
                for="checked-checkbox"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Customize grade range
              </label>
            </div>
            <div
              className="mb-3"
              style={{ display: isMulti2 ? "block" : "none" }}
            >
              <div className="col-md-4 mb-3">
                <div className="form-group">
                  <label className="mb-1">Number of Ranges Used</label>
                  <input
                    className="form-control"
                    type="number"
                    id="name3"
                    onChange={() => {
                      var value = parseInt(
                        document.getElementById("name3").value
                      );
                      let data = [];

                      if (value == NaN || !value || value == "") {
                        console.log("asd");
                        setRange([]);
                      } else {
                        for (let i = 0; i < value; i++) {
                          data.push(i);
                          setRange(data);
                        }
                        console.log(range);
                      }
                    }}
                    placeholder="Job grade..."
                    style={{
                      borderRadius: "0.25rem",
                      border: "1px solid #ced4da",
                    }}
                  />
                </div>
              </div>
              <div className="w-100"></div>
              <div className="grid gap-3 grid-rows-1 grid-cols-8">
                {range.length > 0 || range != null
                  ? range.map((val, i) => {
                      return (
                        <div className="mb-3">
                          <div className="form-group" style={{ width: "70px" }}>
                            <label className="mb-1 text-sm">
                              {i + 1} Range
                            </label>
                            <input
                              className="form-control "
                              id={i}
                              defaultValue={val}
                              style={{
                                borderRadius: "0.25rem",
                                border: "1px solid #ced4da",
                              }}
                            />
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
            <div className="col-12 mb-3">
              <h2>Currency</h2>
            </div>
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <label className="mb-1">Currency type</label>
                <select
                  className="form-control"
                  onChange={(e) =>
                    setEditValues({ ...editValues, type: e.target.value })
                  }
                >
                  <option>Select currency</option>
                  <option
                    selected={editValues?.type == "IDR" ? true : false}
                    value="IDR"
                  >
                    IDR (Indonesia Rupiah)
                  </option>
                  <option
                    selected={editValues?.type == "USD" ? true : false}
                    value="USD"
                  >
                    USD (United Stated Dollar)
                  </option>
                </select>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  Minimum salary <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  value={editValues?.minsalary ?? null}
                  onChange={(e) =>
                    setEditValues({ ...editValues, minsalary: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  Maximum salary <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  value={editValues?.maxsalary ?? null}
                  onChange={(e) =>
                    setEditValues({ ...editValues, maxsalary: e.target.value })
                  }
                />
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
              setIsRange(false);
              setMinGaji("");
              setMaxGaji("");
              setMulti2(false);
              setRange([]);
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
              let rangeValue = [];
              let rangeValue2 = [];
              range.map((val, i) =>
                rangeValue.push(document.getElementById(i).value)
              );
              rangeValue.map((r) => rangeValue2.push(`"${r}"`));
              var requestBody = {
                id: editValues.id,
                name:
                  isMulti2 == true
                    ? rangeValue[0] + "-" + rangeValue[rangeValue.length - 1]
                    : document.getElementById("nameEdit").value,
                range: isMulti2 == true ? `[${rangeValue2}]` : null,
                type: editValues.type,
                minsalary: editValues.minsalary,
                maxsalary: editValues.maxsalary,
              };
              var res = await EditJobGrade(requestBody);
              setEditTitle(!dialogEditTitle);
              setIsRange(false);
              setMulti2(false);
              setMinGaji("");
              setMaxGaji("");
              setRange([]);
              SwalSuccess({ message: "Success edit job grade" });
              inAwait();
            }}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>

      <ModalDelete
        close={() => {
          setDelete(false);
        }}
        submit={async () => {
          await DeleteJobGrade(id);
          setDelete(false);
          SwalSuccess({ message: "Success delete job grade" });
          await inAwait();
        }}
        active={isdelete}
      />
    </>
  );
}

export default JobGrade;
