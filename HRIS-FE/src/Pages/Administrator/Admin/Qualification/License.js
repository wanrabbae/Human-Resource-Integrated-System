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

import { useEffect, useState, useRef } from "react";
import { Button } from "@mui/material";
import {
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
} from "react-bootstrap";
import { TextFieldFile } from "../../../../Components/TextField";
import { ModalDelete, SwalSuccess } from "../../../../Components/Modals";
import {
  AddLicense,
  deleteLicense,
  EditLicense,
  getLicense,
} from "../../../../Repository/AdminRepository";
import { endpoint } from "../../../../Utils/constant";

function License() {
  const [licenses, setLicenses] = useState([]);
  const [editValues, setEditValues] = useState();
  const [dialogTitle, setTitle] = useState(false);
  const [dialogEditTitle, setEditTitle] = useState(false);
  const [isdelete, setDelete] = useState(false);
  const [id, setId] = useState();
  var attachmentRef = useRef();
  const [attachment, setAttachment] = useState();
  const [isCheckedAll, setCheckedAll] = useState(false);
  const [isDelAll, setDelAll] = useState([]);
  const [isCheck, setIsCheck] = useState([]);

  const inAwait = async () => {
    var rec = await getLicense();
    setLicenses(rec);
  };

  useEffect(() => {
    inAwait();
  }, []);

  const handleSelectAll = async (e) => {
    setCheckedAll(!isCheckedAll);
    var arr = [];
    if (!isCheckedAll) {
      for (var x = 0;x < licenses.length;x++) {
        arr.push(licenses[x].id);
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
          <b>License</b>
        </h5>
        <p>
          <small>list of License</small>
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
                  await deleteLicense(isCheck[x]);
                };
                // console.log(isDelAll)
                SwalSuccess({ message: "Success Delete All Lisence" });
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
              Add License
            </Button>
          </div>
        </div>
        <br></br>
        <Table borderless responsive style={{ color: "#00000070", fontSize: "0.75rem" }}>
          <thead>
            <tr style={{ backgroundColor: "#EBF7FF" }}>
              <th width="10px">
                <input type="checkbox" style={{ borderRadius: "2px" }} onChange={handleSelectAll} checked={isCheckedAll}/>
              </th>
              <th onClick={() => {}}>
                License <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {licenses.length > 0 ? (
              licenses.map((license) => (
                <tr key={license.id}>
                  <td className="align-middle">
                    <input 
                      key={license.id}
                      type="checkbox" 
                      value={license.id}
                      style={{ borderRadius: "2px" }} 
                      // checked={isCheckedAll ? true : false}
                      checked={isCheck.includes(license.id)}
                      // onChange={(e) => console.log(skill["id"])}
                      onChange={handleClick} 
                    />
                  </td>
                  <td className="align-middle" style={{ minWidth: "200px" }}>
                    {license.name}
                  </td>
                  <td className="align-middle" style={{ minWidth: "100px" }}>
                    <button
                      onClick={() => {
                        setId(license.id);
                        setEditValues(license);
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
                      onClick={() => {
                        setDelete(true);
                        setId(license.id);
                      }}
                      style={{
                        backgroundColor: "#CEDFEA",
                        borderRadius: "8px",
                      }}
                    >
                      <DeleteOutline fontSize="10px" />
                    </button>
                  </td>
                </tr>
              ))
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
          <Modal.Title>Add License</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append("name", document.getElementById("name").value);
            formData.append("attachment", attachment);
            var res = await AddLicense(formData);
            setTitle(!dialogTitle);
            SwalSuccess({ message: "Success add license" });
            inAwait();
          }}
        >
          <Modal.Body className="mx-4">
            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    License Name <span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    className="bg-light-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="License name..."
                    id="name"
                  />
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    Attachment <span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    ref={attachmentRef}
                    onChange={(val) => setAttachment(val.target.files[0])}
                    className="form-control"
                    type="file"
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
              onClick={() => setTitle(!dialogTitle)}
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
        onHide={() => setEditTitle(!dialogEditTitle)}
      >
        <Modal.Header
          closeButton
          className="m-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title>Edit License</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  License Name <span className="text-danger">*</span>
                </label>
                <input
                  className="bg-light-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="License name..."
                  id="nameEdit"
                  value={editValues?.name ?? null}
                  onChange={(e) =>
                    setEditValues({ ...editValues, name: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  Attachment <span className="text-danger">*</span>
                </label>
                <input
                  ref={attachmentRef}
                  onChange={(val) => setAttachment(val.target.files[0])}
                  className="form-control"
                  type="file"
                />
                {/* <img src={`${endpoint}/${editValues.attachment}`} width={30} /> */}
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
            onClick={async () => {
              const formData = new FormData();
              formData.append("id", editValues.id);
              formData.append(
                "name",
                document.getElementById("nameEdit").value
              );
              formData.append("attachment", attachment);
              var res = await EditLicense(formData);
              setEditTitle(!dialogEditTitle);
              SwalSuccess({ message: "Success edit license" });
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
        submit={async() => {
          await deleteLicense(id);
          setDelete(false);
          SwalSuccess({ message: "Success delete license" });
          await inAwait();
        }}
        active={isdelete}
      />
    </>
  );
}

export default License;
