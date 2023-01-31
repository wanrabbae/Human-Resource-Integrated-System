import { ImportExport } from "@mui/icons-material";
import { setDate } from "date-fns/esm";
import { PencilSimple, Plus, Trash } from "phosphor-react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { ModalDelete, SwalSuccess } from "../../../../Components/Modals";
import {
  addImigration,
  deleteImigration,
  getCountry,
  getImigration,
  updateImigration,
} from "../../../../Repository/ProfileEmployeeRepository";

function Imigration({ idEmployee }) {
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [isdelete, setDelete] = useState(false);
  const [id, setId] = useState([]);
  const [delid, setdelId] = useState([]);
  const [imigration, setImigration] = useState([]);
  const [documentType, setDocumentType] = useState([]);
  const [docNumber, setDocNumber] = useState([]);
  const [issueDate, setIssueDate] = useState([]);
  const [expiryDate, setExpiryDate] = useState([]);
  const [eligibleStatus, setEligibleStatus] = useState([]);
  const [issuedBy, setIssuedBy] = useState([]);
  const [eligibleReviewDate, setEligibleReviewDate] = useState([]);
  const [comment, setComment] = useState([]);

  const [country, setCountry] = useState([])
 
  const [editDocumentType, setEditDocumentType] = useState([]);
  const [editDocNumber, setEditDocNumber] = useState([]);
  const [editIssueDate, setEditIssueDate] = useState([]);
  const [editExpiryDate, setEditExpiryDate] = useState([]);
  const [editEligibleStatus, setEditEligibleStatus] = useState([]);
  const [editIssuedBy, setEditIssuedBy] = useState([]);
  const [editEligibleReviewDate, setEditEligibleReviewDate] = useState([]);
  const [editComment, setEditComment] = useState([]);

  const inAwait = async () => {
    var data = await getImigration(idEmployee);
    console.log(data.result);
    setImigration(data.result);
    var cntr = await getCountry();
    setCountry(cntr["countries"]);
  };

  useEffect(() => {
    inAwait();
  }, []);

  console.log(country)
  const postData = async () => {
    var requestBody = {
      documentType: documentType,
      number: docNumber,
      issueDate: issueDate,
      expiryDate: expiryDate,
      eligibleStatus: eligibleStatus,
      issuedby: issuedBy,
      eligileIssueDate: eligibleReviewDate,
      comment: comment,
    };
    console.log(requestBody);
    setModal(false);
    var res = await addImigration(requestBody, idEmployee);
    inAwait();
    console.log(res);
  };
  const postDataEdit = async () => {
    var requestBody = {
      id: id,
      documentType: editDocumentType,
      number: editDocNumber,
      issueDate: editIssueDate,
      expiryDate: editExpiryDate,
      eligibleStatus: editEligibleStatus,
      issuedby: editIssuedBy,
      eligileIssueDate: editEligibleReviewDate,
      comment: editComment,
    };
    console.log(requestBody);
    setModalEdit(false);
    var res = await updateImigration(requestBody);
    inAwait();
    console.log(res);
  };
  const deletedImigration = async (data) => {
    var res = await deleteImigration(data);
    console.log(res);
    inAwait();
  };

  return (
    <>
      <div>
        <div className="mb-4 d-flex justify-content-between">
          <div className="row">
            <h3 style={{ fontSize: "20px", fontWeight: "600" }}>Immigration</h3>
            <span
              style={{ fontSize: "10px", fontWeight: "400", color: "#737373" }}
            >
              List of immigration{" "}
            </span>
          </div>
          <button
            style={{
              borderRadius: "10px",
              color: "white",
              fontSize: "14px",
              fontWeight: "500",
            }}
            className="bg-[#0E5073] me-3 btn d-flex align-items-center align-middle"
            onClick={() => setModal(true)}
          >
            <Plus className="me-2" size={20} weight="bold" />
            Add
          </button>
        </div>
        <hr style={{ backgroundColor: "#CACACA" }} className=""></hr>
        <div className="overflow-x-auto">
          <Table borderless responsive style={{ color: "#00000070" }}>
            <thead>
              <tr style={{ backgroundColor: "#EBF7FF" }}>
                <th
                  className="align-middle "
                  onClick={() => {}}
                  style={{ minWidth: "10em" }}
                >
                  Document <ImportExport fontSize="2px" />
                </th>
                <th
                  className="align-middle "
                  onClick={() => {}}
                  style={{ minWidth: "10em" }}
                >
                  Number <ImportExport fontSize="2px" />
                </th>
                <th
                  className="align-middle "
                  onClick={() => {}}
                  style={{ minWidth: "10em" }}
                >
                  Issue Date
                  <ImportExport fontSize="2px" />
                </th>
                <th
                  className="align-middle "
                  onClick={() => {}}
                  style={{ minWidth: "10em" }}
                >
                  Expiry Date
                  <ImportExport fontSize="2px" />
                </th>
                <th
                  className="align-middle "
                  onClick={() => {}}
                  style={{ minWidth: "10em" }}
                >
                  Eligible Status
                  <ImportExport fontSize="2px" />
                </th>
                <th
                  className="align-middle "
                  onClick={() => {}}
                  style={{ minWidth: "10em" }}
                >
                  Issue By
                  <ImportExport fontSize="2px" />
                </th>
                <th
                  className="align-middle "
                  onClick={() => {}}
                  style={{ minWidth: "10em" }}
                >
                  Eligible Review Date
                  <ImportExport fontSize="2px" />
                </th>
                <th
                  className="align-middle "
                  onClick={() => {}}
                  style={{ minWidth: "10em" }}
                >
                  Comment
                  <ImportExport fontSize="2px" />
                </th>
                <th className="align-middle pe-5" onClick={() => {}}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {imigration.length > 0 ? (
                imigration.map((val, index) => (
                  <tr key={index}>
                    <td className="align-middle">{val.documentType}</td>
                    <td className="align-middle">{val.number}</td>
                    <td className="align-middle">{val.issueDate}</td>
                    <td className="align-middle">{val.expiryDate}</td>
                    <td className="align-middle">{val.eligibleStatus}</td>
                    <td className="align-middle">{val.issuedby}</td>
                    <td className="align-middle">{val.eligileIssueDate}</td>
                    <td className="align-middle">{val.comment}</td>
                    <td className="align-middle">
                      <div className="flex flex-row gap-2">
                        <button
                          className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                          onClick={() => {
                            setId(val.id);
                            setEditDocumentType(val.documentType);
                            setEditDocNumber(val.number);
                            setEditIssueDate(val.issueDate);
                            setEditExpiryDate(val.expiryDate);
                            setEditEligibleStatus(val.eligibleStatus);
                            setEditIssuedBy(val.issuedby);
                            setEditEligibleReviewDate(val.eligileIssueDate);
                            setEditComment(val.comment);
                            setModalEdit(true);
                          }}
                        >
                          <PencilSimple
                            color="#003049"
                            className="h-5 w-5"
                            weight="bold"
                            aria-hidden="true"
                          />
                        </button>
                        <button
                          className="bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg"
                          onClick={() => {
                            setDelete(true);
                            setdelId(val.id);
                          }}
                        >
                          <Trash
                            color="#003049"
                            weight="bold"
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9}>
                    <div className="d-flex justify-content-center align-middle text-center">
                      No Data
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
      <Modal show={modal} size="lg" onHide={() => setModal(false)}>
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Add Immigration
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Document
              </label>
              <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                onChange={(e) => setDocumentType(e.target.value)}
              >
                <option className="py-3" hidden>
                  Select Document...
                </option>
                <option value="Visa" className="py-3">
                  Visa
                </option>
                <option value="Passport" className="py-3">
                  Passport
                </option>
              </select>
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Number
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="text"
                placeholder="Document number.."
                onChange={(e) => setDocNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Issued Date
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="date"
                onChange={(e) => setIssueDate(e.target.value)}
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Expiry Date
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="date"
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Eligible Status
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="text"
                placeholder=""
                onChange={(e) => setEligibleStatus(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Issued By
              </label>
              <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                onChange={(e) => setIssuedBy(e.target.value)}
              >
                <option className="py-3" hidden>
                  Select
                </option>
                {
                  country.map((val) => {
                    return(
                      <option value={val.name}>
                        {val.name}
                      </option>
                    )
                  })
                }
              </select>
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Eligible Review Date
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="date"
                onChange={(e) => setEligibleReviewDate(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Comment
              </label>
              <textarea
                rows="4"
                className=" appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="m-4">
          <Button
            style={{
              border: "none",
              fontSize: "14px",
              backgroundColor: "#ECECEC",
              color: "#003049",
            }}
            className="px-3"
            onClick={() => setModal(false)}
          >
            Cancel
          </Button>
          <Button
            style={{
              border: "none",
              fontSize: "14px",
              backgroundColor: "#0E5073",
              color: "#FFFFFF",
            }}
            className="px-3"
            onClick={postData}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={modalEdit} size="lg" onHide={() => setModalEdit(false)}>
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Immigration
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Document
              </label>
              <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                onChange={(e) => setEditDocumentType(e.target.value)}
              >
                <option className="py-3" value={editDocumentType} hidden>
                  {editDocumentType != null
                    ? editDocumentType
                    : "Select Document.."}
                </option>
                <option value="Visa" className="py-3">
                  Visa
                </option>
                <option value="Passport" className="py-3">
                  Passport
                </option>
              </select>
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Number
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="text"
                placeholder="Document number.."
                value={editDocNumber}
                onChange={(e) => setEditDocNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Issued Date
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="date"
                value={editIssueDate}
                onChange={(e) => setEditIssueDate(e.target.value)}
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Expiry Date
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="date"
                value={editExpiryDate}
                onChange={(e) => setEditExpiryDate(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Eligible Status
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="text"
                placeholder=""
                value={editEligibleStatus}
                onChange={(e) => setEditEligibleStatus(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Issued By
              </label>
              <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                onChange={(e) => setEditIssuedBy(e.target.value)}
              >
                <option className="py-3" hidden>
                  {editIssuedBy != null ? editIssuedBy : "Select Issued By..."}
                </option>
                {
                  country.map((val) => {
                    return(
                      <option selected={editIssuedBy == val.name ? true : false} value={val.name}>
                        {val.name}
                      </option>
                    )
                  })
                }
              </select>
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Eligible Review Date
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                type="date"
                value={editEligibleReviewDate}
                onChange={(e) => setEditEligibleReviewDate(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Comment
              </label>
              <textarea
                rows="4"
                className=" appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="m-4">
          <Button
            style={{
              border: "none",
              fontSize: "14px",
              backgroundColor: "#ECECEC",
              color: "#003049",
            }}
            className="px-3"
            onClick={() => setModalEdit(false)}
          >
            Cancel
          </Button>
          <Button
            style={{
              border: "none",
              fontSize: "14px",
              backgroundColor: "#0E5073",
              color: "#FFFFFF",
            }}
            className="px-3"
            onClick={postDataEdit}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <ModalDelete
        close={() => {
          setDelete(false);
        }}
        submit={async() => {
          await deleteImigration(delid);
          inAwait();
          setDelete(false);
          SwalSuccess({ message: "Success Delete Imigration" });
        }}
        active={isdelete}
      />
    </>
  );
}
export default Imigration;
