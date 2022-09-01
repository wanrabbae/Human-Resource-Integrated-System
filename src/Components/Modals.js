import { CircularProgress } from "@mui/material";
import { Modal, ModalBody } from "react-bootstrap";

function LoadingDialog(props) {
    return (
        <Modal size="sm" centered show={props.active}>
            <ModalBody>
                <center><CircularProgress /></center>
            </ModalBody>
        </Modal>
    );
}

export { LoadingDialog }