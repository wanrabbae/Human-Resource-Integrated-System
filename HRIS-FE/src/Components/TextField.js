import { Search } from "@mui/icons-material";
import { createRef, useRef, useState } from "react"

function TextFieldSearch() {
    const ref = createRef();
    return (
        <div onClick={() => {
            ref.current.focus();
        }} className="d-flex align-items-center py-2 px-1 justify-content-between" style={{ border: "1px solid #00000050", width: "auto", borderRadius: "7px", }}>
            <Search className="mx-2" style={{ color: "#00000050", }} />

            <input ref={ref} className="mr-2" placeholder="Search..." style={{ width: "auto", fontSize: "12px", backgroundColor: "transparent", border: "none", outline: "none", }} />
        </div>
    );
}

function TextFieldFile() {
    const ref = createRef();
    const [name, setName] = useState();
    return (
        <>
            <div onClick={() => ref.current.click()
            } className="border-2 border-gray-300 rounded-lg p-2">
                <button className="btn btn-sm bg-[#00000010] rounded-lg px-4 py-1.5 text-[#00000090]">Browse</button>
                <span className="px-2 text-[#00000030]">{name ?? "No file choosen"}</span>
                <input hidden ref={ref} onChange={(e) => {
                    setName(e.currentTarget.files[0].name)
                }} type="file" name="file" />
            </div>
            <span className="text-[#00000030] italic text-sm">*No more than 64 MB</span>
        </>
    )
}

export { TextFieldSearch, TextFieldFile };