import { CircularProgress } from "@mui/material";
import { TrashSimple } from "phosphor-react";
import { Col, Modal, ModalBody, Row } from "react-bootstrap";

function LoadingDialog(props) {
    return (
        <Modal size="sm" centered show={props.active}>
            <ModalBody>
                <center><CircularProgress /></center>
            </ModalBody>
        </Modal>
    );
}
function ModalDelete(props) {
    return(
        <Modal size="sm" centered show={props.active}>
            <ModalBody>
                <center>
                    <Row>
                        <TrashSimple size={32} weight="bold"  color="#C1121F"/>
                        <h1 className="text-[#003049] font-semibold my-2">Delete Entry</h1>
                        <p className="text-[#737373] text-sm my-1 px-5">Are you sure want to delete this? this action cannot be undo</p>
                        <div className="my-3 d-flex justify-content-center">
                            <button className="btn bg-[#ECECEC] font-medium mx-2 px-4 text-[#0E5073]" onClick={props.close} >Cancel</button>
                            <button className="btn bg-[#0E5073] font-medium mx-2 px-4 text-white">Delete</button>
                        </div>
                    </Row>    
                </center>
            </ModalBody>
        </Modal>
    )
}
export { LoadingDialog, ModalDelete }