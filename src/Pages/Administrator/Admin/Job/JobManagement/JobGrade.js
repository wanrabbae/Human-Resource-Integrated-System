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
  const [dialogTitle, setTitle] = useState(false);
  const [dialogEditTitle, setEditTitle] = useState(false);
  const [isdelete, setDelete] = useState(false);
  const [isRange, setIsRange] = useState(false);
  const [id, setId] = useState();
  const [isMulti, setMulti] = useState(true);
  const [rangeValues, setRangeValues] = useState([]);

  /* Fungsi formatRupiah */
  // function formatRupiah(angka, prefix) {
  //   var number_string = angka.replace(/[^,\d]/g, "").toString(),
  //     split = number_string.split(","),
  //     sisa = split[0].length % 3,
  //     rupiah = split[0].substr(0, sisa),
  //     ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  //   // tambahkan titik jika yang di input sudah menjadi angka ribuan
  //   if (ribuan) {
  //     separator = sisa ? "." : "";
  //     rupiah += separator + ribuan.join(".");
  //   }

  //   rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
  //   return prefix == undefined ? rupiah : rupiah ? rupiah : "";
  // }

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
              Add Job Grade
            </Button>
          </div>
        </div>
        <br></br>
        <Table borderless responsive style={{ color: "#00000070" }}>
          <thead>
            <tr style={{ backgroundColor: "#EBF7FF" }}>
              <th width="10px">
                <input type="checkbox" style={{ borderRadius: "2px" }} />
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
                      <input type="checkbox" style={{ borderRadius: "2px" }} />
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
                          if (val?.rangegrade?.length > 0) setIsRange(true);
                          setEditValues(val);
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
              <td>
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
          setMaxGaji("");
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
                  disabled={isRange}
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
                onClick={() => setMulti(!isMulti)}
                type="checkbox"
                value=""
                checked={isRange}
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
              style={{ display: !isMulti || isRange ? "block" : "none" }}
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
                {range.length > 0
                  ? range.map((val) => {
                      return (
                        <div className="mb-3">
                          <div className="form-group" style={{ width: "70px" }}>
                            <label className="mb-1 text-sm">
                              {val + 1} Range
                            </label>
                            <input
                              className="form-control "
                              id="name2"
                              style={{
                                borderRadius: "0.25rem",
                                border: "1px solid #ced4da",
                              }}
                            />
                          </div>
                        </div>
                      );
                    })
                  : editValues?.rangegrade?.map((reng, i) => (
                      <div className="mb-3">
                        <div className="form-group" style={{ width: "70px" }}>
                          <label className="mb-1 text-sm">Range</label>
                          <input
                            className="form-control "
                            id={i}
                            defaultValue={reng}
                            // onChange={(e) =>
                            //   setRangeValues((current) => [e.target.value])
                            // }
                            style={{
                              borderRadius: "0.25rem",
                              border: "1px solid #ced4da",
                            }}
                          />
                        </div>
                      </div>
                    ))}
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
              await editValues?.rangegrade?.map((r, i) =>
                rangeValue.push(document.getElementById(i).value)
              );
              rangeValue.map((r) => rangeValue2.push(`"${r}"`));
              var requestBody = {
                id: editValues.id,
                name:
                  isMulti == true
                    ? rangeValue[0] + "-" + rangeValue[rangeValue.length - 1]
                    : document.getElementById("nameEdit").value,
                range: `[${rangeValue2}]`,
                type: editValues.type,
                minsalary: editValues.minsalary,
                maxsalary: editValues.maxsalary,
              };
              var res = await EditJobGrade(requestBody);
              setEditTitle(!dialogEditTitle);
              setIsRange(false);
              setMinGaji("");
              setMaxGaji("");
              SwalSuccess({ message: "Success edit job grade" });
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
