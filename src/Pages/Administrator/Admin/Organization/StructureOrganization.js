import { Button, FormControlLabel, Switch } from "@mui/material";
import { Edit, Add, AlignVerticalCenter, ArrowUpwardTwoTone, Close, Delete, DeleteOutline, EditOutlined, Filter, Filter1, FilterCenterFocus, FilterList, ImportExport, Search } from "@mui/icons-material";
import { useState } from "react";


function StructureOrganization() {
    const [isSelected, setSelected] = useState(true);
    return (
        <>
            <div className="py-4 px-4" style={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}>
                <div className="d-flex justify-content-between align-items-center pb-3">
                    <div>
                        <h2 className="text-lg"><b>Structure Organization</b></h2>
                        <h6 className="text-[#00000030] text-xs">Organizational structure of the company</h6>
                    </div>
                    <FormControlLabel
                        value={isSelected}
                        control={<Switch color="primary" />}
                        label="Edit"
                        labelPlacement="start"
                        onChange={(val) => {
                            setSelected(!isSelected);
                        }}
                    />
                </div>
                <hr></hr>
                <div onClick={() => { }} className="mt-3 py-2 px-3 w-100 border-2 p-2 border-[#00000020] rounded-xl">
                    Organization
                </div>
            </div>
        </>
    )
}

export default StructureOrganization;