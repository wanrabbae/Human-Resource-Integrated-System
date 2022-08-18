import { Button } from "@mui/material";
import { Edit, Add, AlignVerticalCenter, ArrowUpwardTwoTone, Close, Delete, DeleteOutline, EditOutlined, Filter, Filter1, FilterCenterFocus, FilterList, ImportExport, Search } from "@mui/icons-material";


function StructureOrganization() {
    return (
        <>
            <div className="p-4" style={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}>
                <div className="d-flex justify-content-between align-items-center pb-3">
                    <div>
                        <h2><b>General Information</b></h2>
                        <h6>General company information</h6>
                    </div>
                    <Button onClick={() => { }} style={{ color: "#FFFFFF", backgroundColor: "#0E5073" }} startIcon={<Edit />}> Edit</Button>
                </div>
            </div>
        </>
    )
}

export default StructureOrganization;