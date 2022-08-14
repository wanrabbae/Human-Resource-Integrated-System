import { Search } from "@mui/icons-material";
import { createRef, useRef } from "react"

function TextFieldSearch() {
    const ref = createRef();
    return (
        <div onClick={() => {
            ref.current.focus();
        }} className="d-flex align-items-center py-2 px-1 justify-content-between" style={{ border: "1px solid #00000050", width: "auto", borderRadius: "7px", }}>
            <Search className="mx-2" style={{ color: "#00000050", }} />

            <input ref={ref} className="mr-2" placeholder="Search by Employee Name" style={{ width: "auto", fontSize: "12px", backgroundColor: "transparent", border: "none", outline: "none", }} />
        </div>
    );
}

export default TextFieldSearch;