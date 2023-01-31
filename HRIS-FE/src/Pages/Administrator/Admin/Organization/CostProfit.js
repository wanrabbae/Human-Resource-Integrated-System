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
import { Button } from "@mui/material";
import {
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
} from "react-bootstrap";
import {
  AddCost,
  AddProfit,
  deleteCost,
  deleteProfit,
  EditCost,
  EditProfit,
  getCost,
  GetJobPosition,
  getProfit,
} from "../../../../Repository/AdminRepository";
import { ModalDelete, SwalSuccess } from "../../../../Components/Modals";

function CostProfit() {
  const [isdelete, setDelete] = useState(false);
  const [id, setId] = useState();
  const [profit, setProfit] = useState([]);
  const [cost, setGCost] = useState([]);
  const [profitEdit, setProfitEdit] = useState({});
  const [costEdit, setGCostEdit] = useState({});
  const [checkData, setCheckData] = useState("");
  const [jobposition, setJobPosition] = useState([]);
  const inAwait = async () => {
    var rec = await getProfit();
    setProfit(rec["result"]);
    var cost = await getCost();
    setGCost(cost["result"]);
    var jpos = await GetJobPosition();
    setJobPosition(jpos["result"]);
  };
  useEffect(() => {
    inAwait();
  }, []);
  const [dialogTitle, setTitle] = useState(false);
  const [dialogEditTitle, setEditTitle] = useState(false);
  const [dialogCost, setCost] = useState(false);
  const [dialogEditCost, setEditCost] = useState(false);

  const addProfit = async (data) => {
    await AddProfit(data);
    inAwait();
    SwalSuccess({ message: "Add profit successfuly!" });
    setTitle(!dialogTitle);
  };

  const editProfit = async (data) => {
    await EditProfit(data);
    inAwait();
    SwalSuccess({ message: "Edit profit successfuly!" });
    setEditTitle(!dialogEditTitle);
  };

  const addCost = async (data) => {
    await AddCost(data);
    inAwait();
    SwalSuccess({ message: "Add Cost successfuly!" });
    setCost(!dialogCost);
  };

  const editCost = async (data) => {
    await EditCost(data);
    inAwait();
    SwalSuccess({ message: "Edit cost successfuly!" });
    setEditCost(!dialogEditCost);
  };

  const [isCheckedAll, setCheckedAll] = useState(false);
  const [isDelAll, setDelAll] = useState([]);
  const [isCheck, setIsCheck] = useState([]);

  const handleSelectAllProfit = async (e) => {
    setCheckedAll(!isCheckedAll);
    var arr = [];
    if (!isCheckedAll) {
      for (var x = 0;x < profit.length;x++) {
        arr.push(profit[x].id);
      }
    }
    setIsCheck(arr);
  };

  const handleClickProfit = async (e) => {
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
  
  const [isCheckedAllC, setCheckedAllC] = useState(false);
  const [isDelAllC, setDelAllC] = useState([]);
  const [isCheckC, setIsCheckC] = useState([]);
  
  const handleSelectAllCost = async (e) => {
    setCheckedAllC(!isCheckedAllC);
    var arr = [];
    if (!isCheckedAllC) {
      for (var x = 0;x < cost.length;x++) {
        arr.push(cost[x].id);
      }
    }
    setIsCheckC(arr);
  };

  const handleClickCost = async (e) => {
    setCheckedAllC(false);
    const value = parseInt(e.target.value);
    var data = [...isCheckC];
    if (isCheckC.includes(value)) {
      var index = data.indexOf(value);
      data.splice(index,1);
    } else {
      data.push(value);
    }
    setIsCheckC(data);
  };
  return (
    <>
      <div
        className="w-100 p-4 mb-5"
        style={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
      >
        <h5>
          <b>Profit Center</b>
        </h5>
        <p>
          <small>list of Profit Employee</small>
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
                  await deleteProfit(isCheck[x]);
                }
                SwalSuccess({ message: "Success Delete All Profit Employee" });
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
              Add Profit
            </Button>
          </div>
        </div>
        <br></br>
        <Table borderless responsive style={{ color: "#00000070", fontSize: "0.75rem" }}>
          <thead>
            <tr style={{ backgroundColor: "#EBF7FF" }}>
              <th width="10px">
                <input type="checkbox" style={{ borderRadius: "2px" }} onChange={handleSelectAllProfit} checked={isCheckedAll}/>
              </th>
              <th onClick={() => {}}>
                Profit Employee <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {profit.length > 0 ? (
              profit.map((val) => {
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
                        onChange={handleClickProfit}
                      />
                    </td>
                    <td className="align-middle" style={{ minWidth: "200px" }}>
                      {val["name"]}
                    </td>
                    <td className="align-middle" style={{ minWidth: "100px" }}>
                      <button
                        onClick={() => {
                          setEditTitle(!dialogEditTitle);
                          setProfitEdit({ name: val.name, id: val.id });
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
                          setCheckData("profit");
                          setId(val.id);
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
      <Modal show={dialogTitle} size="lg" onHide={() => setTitle(!dialogTitle)}>
        <Modal.Header
          closeButton
          className="m-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title>Profit Centre Unit Additions</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            addProfit({ name: document.getElementById("positionAdd").value });
          }}
        >
          <Modal.Body className="mx-4">
            <div className="row">
              <div className="col-md-12 my-3">
                <div className="form-group">
                  <label className="mb-1">
                    Employee Position <span className="text-danger">*</span>
                  </label>
                  <select
                    id="positionAdd"
                    required
                    className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="" selected disabled>
                      Select Job Position
                    </option>
                    {jobposition.map((val) => {
                      return <option value={val.name}>{val.name}</option>;
                    })}
                  </select>
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
              onClick={() => setTitle(!dialogTitle)}
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
        onHide={() => setEditTitle(!dialogEditTitle)}
      >
        <Modal.Header
          closeButton
          className="m-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title>Edit Profit Centre Unit Additions</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="row">
            <div className="col-md-12 my-3">
              <div className="form-group">
                <label className="mb-1">
                  Employee Position <span className="text-danger">*</span>
                </label>
                <select
                  id="positionEdit"
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected disabled>
                    Select Job Position
                  </option>
                  {jobposition.map((val) => {
                    return (
                      <option
                        value={val.name}
                        selected={profitEdit.name == val.name ? true : false}
                      >
                        {val.name}
                      </option>
                    );
                  })}
                </select>
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
            onClick={() => setEditTitle(!dialogEditTitle)}
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
            onClick={() =>
              editProfit({
                name: document.getElementById("positionEdit").value,
                id: profitEdit?.id,
              })
            }
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>

      <div
        className="w-100 p-4 mb-3"
        style={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
      >
        <h5>
          <b>Cost Center</b>
        </h5>
        <p>
          <small>list of Cost Employee</small>
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
                for (var x = 0;x < isCheckC.length;x++) {
                  await deleteCost(isCheckC[x]);
                }
                SwalSuccess({ message: "Success Delete All Cost Employee" });
                // var del = await deleteCompanyLocation(isDelAll)
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
                setCost(!dialogCost);
              }}
              style={{
                color: "#FFFFFF",
                borderRadius: "7px",
                backgroundColor: "#0E5073",
              }}
              variant="contained"
              startIcon={<Add />}
            >
              Add Cost
            </Button>
          </div>
        </div>
        <br></br>
        <Table borderless responsive style={{ color: "#00000070", fontSize: "0.75rem" }}>
          <thead>
            <tr style={{ backgroundColor: "#EBF7FF" }}>
              <th width="10px">
                <input type="checkbox" style={{ borderRadius: "2px" }} onChange={handleSelectAllCost} checked={isCheckedAllC}/>
              </th>
              <th onClick={() => {}}>
                Cost Employee
                <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {cost.length > 0 ? (
              cost.map((val) => {
                return (
                  <tr>
                    <td className="align-middle">
                      <input 
                        key={val.id}
                        type="checkbox" 
                        style={{ borderRadius: "2px" }} 
                        // checked={isCheckedAll ? true : false}
                        checked={isCheckC.includes(val.id)}
                        // onChange={(e) => console.log(skill["id"])}
                        onChange={handleClickCost}
                      />
                    </td>
                    <td className="align-middle" style={{ minWidth: "200px" }}>
                      {val.name}
                    </td>
                    <td className="align-middle" style={{ minWidth: "100px" }}>
                      <button
                        className="btn btn-sm mx-1"
                        style={{
                          backgroundColor: "#CEDFEA",
                          borderRadius: "8px",
                        }}
                        onClick={() => {
                          setEditCost(!dialogEditCost);
                          setGCostEdit({ name: val.name, id: val.id });
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
                          setCheckData("cost");
                          setId(val.id);
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

      <Modal show={dialogCost} size="lg" onHide={() => setCost(!dialogCost)}>
        <Modal.Header
          closeButton
          className="m-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title>Cost Centre Unit Additions</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            addCost({ name: document.getElementById("costAdd").value });
          }}
        >
          <Modal.Body className="mx-4">
            <div className="row">
              <div className="col-md-12 my-3">
                <div className="form-group">
                  <label className="mb-1">
                    Employee Position <span className="text-danger">*</span>
                  </label>
                  <select
                    required
                    id="costAdd"
                    className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="" selected disabled>
                      Select Job Position
                    </option>
                    {jobposition.map((val) => {
                      return <option value={val.name}>{val.name}</option>;
                    })}
                  </select>
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
              onClick={() => setCost(!dialogCost)}
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
        show={dialogEditCost}
        size="lg"
        onHide={() => setEditCost(!dialogEditCost)}
      >
        <Modal.Header
          closeButton
          className="m-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title>Edit Cost Centre Unit Additions</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="row">
            <div className="col-md-12 my-3">
              <div className="form-group">
                <label className="mb-1">
                  Employee Position <span className="text-danger">*</span>
                </label>
                <select
                  id="costEdit"
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected disabled>
                    Select Job Position
                  </option>
                  {jobposition.map((val) => {
                    return (
                      <option
                        value={val.name}
                        selected={val.name === costEdit.name ? true : false}
                      >
                        {val.name}
                      </option>
                    );
                  })}
                </select>
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
            onClick={() => setEditCost(!dialogEditCost)}
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
            onClick={() =>
              editCost({
                name: document.getElementById("costEdit").value,
                id: costEdit?.id,
              })
            }
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>

      <ModalDelete
        close={() => {
          setDelete(false);
        }}
        submit={() => {
          if (checkData === "profit") {
            deleteProfit(id);
          } else {
            deleteCost(id);
          }
          inAwait();
          setDelete(false);
          SwalSuccess({ message: "Success delete data" });
        }}
        active={isdelete}
      />
    </>
  );
}

export default CostProfit;
