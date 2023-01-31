import { InfoRounded } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { TrashSimple, WarningOctagon } from "phosphor-react";
import { Col, Modal, ModalBody, Row } from "react-bootstrap";
import Swal from "sweetalert2";

function LoadingDialog(props) {
  return (
    <Modal size="sm" centered show={props.active}>
      <ModalBody>
        <center>
          <CircularProgress />
        </center>
      </ModalBody>
    </Modal>
  );
}
function ModalDelete(props) {
  return (
    <Modal size="sm" centered show={props.active}>
      <ModalBody>
        <center>
          <Row>
            <TrashSimple
              className="mt-3"
              size={32}
              weight="bold"
              color="#C1121F"
            />
            <h1 className="text-[#003049] font-semibold my-2">Delete Entry</h1>
            <p className="text-[#737373] text-sm my-1 px-5">
              Are you sure want to delete this? this action cannot be undo
            </p>
            <div className="my-3 d-flex justify-content-center">
              <button
                className="btn bg-[#ECECEC] font-medium mx-2 px-4 text-[#0E5073]"
                onClick={props.close}
              >
                Cancel
              </button>
              <button
                onClick={props.submit}
                className="btn bg-[#0E5073] font-medium mx-2 px-4 text-white"
              >
                Delete
              </button>
            </div>
          </Row>
        </center>
      </ModalBody>
    </Modal>
  );
}
function ModalSignOut(props) {
  return (
    <Modal size="sm" centered show={props.active}>
      <ModalBody>
        <center>
          <Row>
            <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 4H17C16.7348 4 16.4804 4.10536 16.2929 4.29289C16.1054 4.48043 16 4.73478 16 5C16 5.26522 16.1054 5.51957 16.2929 5.70711C16.4804 5.89464 16.7348 6 17 6H18V18H17C16.7348 18 16.4804 18.1054 16.2929 18.2929C16.1054 18.4804 16 18.7348 16 19C16 19.2652 16.1054 19.5196 16.2929 19.7071C16.4804 19.8946 16.7348 20 17 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V5C20 4.73478 19.8946 4.48043 19.7071 4.29289C19.5196 4.10536 19.2652 4 19 4ZM11.8 7.4C11.6409 7.18783 11.404 7.04756 11.1414 7.01005C10.8789 6.97254 10.6122 7.04087 10.4 7.2C10.1878 7.35913 10.0476 7.59603 10.0101 7.85858C9.97254 8.12113 10.0409 8.38783 10.2 8.6L12 11H4C3.73478 11 3.48043 11.1054 3.29289 11.2929C3.10536 11.4804 3 11.7348 3 12C3 12.2652 3.10536 12.5196 3.29289 12.7071C3.48043 12.8946 3.73478 13 4 13H12.09L10.37 15.44C10.2933 15.5475 10.2386 15.6691 10.2091 15.7978C10.1796 15.9266 10.1759 16.0599 10.1982 16.19C10.2206 16.3202 10.2684 16.4446 10.3391 16.5562C10.4098 16.6678 10.5018 16.7642 10.61 16.84C10.78 16.9587 10.9827 17.0216 11.19 17.02C11.3486 17.0193 11.5048 16.9808 11.6457 16.9078C11.7865 16.8347 11.908 16.7292 12 16.6L14.82 12.6C14.9451 12.4287 15.0126 12.2221 15.0126 12.01C15.0126 11.7979 14.9451 11.5913 14.82 11.42L11.8 7.4Z"
                    fill="#780000"
                  />
                </svg>
            {/* <TrashSimple
              className="mt-3"
              size={32}
              weight="bold"
              color="#C1121F"
            /> */}
            <h1 className="text-[#003049] font-semibold my-2">Sign Out</h1>
            <p className="text-[#737373] text-sm my-1 px-5">
              Are you sure want to Sign Out?
            </p>
            <div className="my-3 d-flex justify-content-center">
              <button
                className="btn bg-[#ECECEC] font-medium mx-2 px-4 text-[#0E5073]"
                onClick={props.close}
              >
                Cancel
              </button>
              <button
                onClick={props.submit}
                className="btn bg-[#0E5073] font-medium mx-2 px-4 text-white"
              >
                Confirm
              </button>
            </div>
          </Row>
        </center>
      </ModalBody>
    </Modal>
  );
}

function ModalConfirmEmail(props) {
  return (
    <Modal size="sm" centered show={props.active}>
      <ModalBody>
        <center>
          <Row>
            <WarningOctagon
              className="mt-3"
              size={52}
              weight="bold"
              color="#C1121F"
            />
            <h1 className="text-[#003049] font-semibold my-2">
              Send email to applicant
            </h1>
            <p className="text-[#737373] text-sm my-1 px-3">
              Apakah anda sudah yakin dengan stage ini ? Jika sudah yakin maka
              sistem akan mengirim email kepada applicant ini
            </p>
            <div className="my-3 d-flex justify-content-center">
              <button
                className="btn bg-[#ECECEC] font-medium mx-2 px-4 text-[#0E5073]"
                onClick={props.close}
              >
                Cancel
              </button>
              <button
                onClick={props.submit}
                className="btn bg-[#0E5073] font-medium mx-2 px-4 text-white"
              >
                Send
              </button>
            </div>
          </Row>
        </center>
      </ModalBody>
    </Modal>
  );
}
function ModalConfirmApplicant(props) {
  return (
    <Modal size="sm" centered show={props.active}>
      <ModalBody>
        <center>
          <Row>
            <WarningOctagon
              className="mt-3"
              size={52}
              weight="bold"
              color="#C1121F"
            />
            <h1 className="text-[#003049] font-semibold my-2">
              Accept Applicant
            </h1>
            <p className="text-[#737373] text-sm my-1 px-3">
              Apakah anda sudah yakin ingin menerima pelamar ini?
            </p>
            <div className="my-3 d-flex justify-content-center">
              <button
                className="btn bg-[#ECECEC] font-medium mx-2 px-4 text-[#0E5073]"
                onClick={props.close}
              >
                Cancel
              </button>
              <button
                onClick={props.submit}
                className="btn bg-[#0E5073] font-medium mx-2 px-4 text-white"
              >
                Send
              </button>
            </div>
          </Row>
        </center>
      </ModalBody>
    </Modal>
  );
}
function ModalRejectApplicant(props) {
  return (
    <Modal size="sm" centered show={props.active}>
      <ModalBody>
        <center>
          <Row>
            <WarningOctagon
              className="mt-3"
              size={52}
              weight="bold"
              color="#C1121F"
            />
            <h1 className="text-[#003049] font-semibold my-2">
              Reject Applicant
            </h1>
            <p className="text-[#737373] text-sm my-1 px-3">
              Apakah anda sudah yakin ingin menolak pelamar ini?
            </p>
            <div className="my-3 d-flex justify-content-center">
              <button
                className="btn bg-[#ECECEC] font-medium mx-2 px-4 text-[#0E5073]"
                onClick={props.close}
              >
                Cancel
              </button>
              <button
                onClick={props.submit}
                className="btn bg-[#0E5073] font-medium mx-2 px-4 text-white"
              >
                Send
              </button>
            </div>
          </Row>
        </center>
      </ModalBody>
    </Modal>
  );
}

function SwalSuccess(props) {
  return Swal.fire({
    icon: "success",
    title: props.message ?? "Successfuly",
    showConfirmButton: false,
    timer: 2000,
  });
}

function SwalError(props) {
  Swal.fire({
    icon: "error",
    title: props.message ?? "Something went wrong",
    showConfirmButton: false,
    timer: 2000,
  });
}

export {
  LoadingDialog,
  ModalDelete,
  SwalSuccess,
  SwalError,
  ModalConfirmEmail,
  ModalConfirmApplicant,
  ModalRejectApplicant,
  ModalSignOut
};
