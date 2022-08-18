import { useState } from "react";

const { Edit } = require("@mui/icons-material");
const { IconButton, Button } = require("@mui/material");

function GeneralInformation() {
    const [isEdited, setEdited] = useState(false);
    return (
        <div className="p-4" style={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}>
            <div className="d-flex justify-content-between align-items-center pb-3">
                <div>
                    <h2><b>General Information</b></h2>
                    <h6>General company information</h6>
                </div>
                <Button onClick={() => setEdited(!isEdited)} style={{ color: "#FFFFFF", backgroundColor: "#0E5073" }} startIcon={<Edit />}> Edit</Button>
            </div>
            <hr></hr>
            <div className="row mt-3">
                <div className="col-md-7 my-3">
                    <div className="form-group">
                        <label>Organization name</label>
                        <input value="PT. Ethos Kreatif Indonesia" disabled={!isEdited} className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " />
                    </div>
                </div>
                <div className="col-md-5 my-3">
                    <div className="form-group">
                        <label>Number of employee</label>
                        <input disabled className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " />
                    </div>
                </div>
                <div className="col-md-6 my-3">
                    <div className="form-group">
                        <label>Registration Number</label>
                        <input value="123-ETS/2010" disabled={!isEdited} className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " />
                    </div>
                </div>
                <div className="col-md-6 my-3">
                    <div className="form-group">
                        <label>Tax ID</label>
                        <input disabled={!isEdited} className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " />
                    </div>
                </div>
                <div className="col-12 my-3">
                    <hr></hr>
                </div>
                <div className="col-md-4 my-3">
                    <div className="form-group">
                        <label>Phone</label>
                        <input value="081283293212" disabled={!isEdited} className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " />
                    </div>
                </div>
                <div className="col-md-4 my-3">
                    <div className="form-group">
                        <label>Fax</label>
                        <input value="081283293212" disabled={!isEdited} className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " />
                    </div>
                </div>
                <div className="col-md-4 my-3">
                    <div className="form-group">
                        <label>Email</label>
                        <input value="ethoskreatif@yahoo.com" disabled={!isEdited} className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " />
                    </div>
                </div>
                <div className="col-12 my-3">
                    <hr></hr>
                </div>
                <div className="col-md-6 my-3">
                    <div className="form-group">
                        <label>Address 1</label>
                        <input value="Jl. kalibaru cirebon" disabled={!isEdited} className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " />
                    </div>
                </div>
                <div className="col-md-6 my-3">
                    <div className="form-group">
                        <label>Address 2</label>
                        <input value="" disabled={!isEdited} className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " />
                    </div>
                </div>
                <div className="col-md-6 my-3">
                    <div className="form-group">
                        <label>City</label>
                        <input value="Cilacap" disabled={!isEdited} className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " />
                    </div>
                </div>
                <div className="col-md-6 my-3">
                    <div className="form-group">
                        <label>Province</label>
                        <input value="Jawa Tengah" disabled={!isEdited} className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " />
                    </div>
                </div>
                <div className="col-md-6 my-3">
                    <div className="form-group">
                        <label>Postal Code</label>
                        <input disabled={!isEdited} className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " />
                    </div>
                </div>
                <div className="col-md-6 my-3">
                    <div className="form-group">
                        <label>Country</label>
                        <input disabled={!isEdited} className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " />
                    </div>
                </div>
                <div className="col-md-6 my-3">
                    <div className="form-group">
                        <label>Notes</label>
                        <textarea disabled={!isEdited} rows={4} style={{ backgroundColor: !isEdited ? "#00000005" : "#FFFFFF" }} className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GeneralInformation;