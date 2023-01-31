import { React, useState } from "react";
import * as XLSX from "xlsx";
import { SwalSuccess, SwalError, LoadingDialog } from "../../../../Components/Modals";
import { endpoint } from "../../../../Utils/constant";
import {
  BulkUploudJob,
  BulkUploudJobGrade,
  BulkUploudJobLevel,
  BulkUploudJobPosition,
  BulkUploudJobTitle,
  ImportJobManagement,
} from "../../../../Repository/AdminRepository";
import { useNavigate } from "react-router-dom";

function BulkUploud() {
  const [file, setFile] = useState();
  const [errorMsg, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleChange = async (e) => {
    setLoading(true);
    try {
      var formData = new FormData();
      formData.append("file", file)
      var res = await ImportJobManagement(formData);
      console.log(res);
      setLoading(false);
      SwalSuccess({message: "Success import Job!"})
      navigate("/admin/job/jobManagement")
    } catch (error) {
      console.log(error);
      setLoading(false);
      SwalError({ message: "Error while importing the Job data!" });
    }
  };

  const handleImport = async () => {
    const job = ["Job_Grade", "Job_Level", "Job_Title", "Job_Position"];
    if (!file) {
      setError("Please upload the valid file");
      return false;
    }
    try {
      const reader = new FileReader();
      reader.onload = async function (e) {
        try {
          var data = e.target.result;
          let readedData = XLSX.read(data, {
            type: "binary",
            cellText: false,
            cellDates: true,
          });
          job.map(async (data) => {
            const ws = readedData.Sheets[data];

            /* Convert array to json*/
            const dataParse = XLSX.utils.sheet_to_json(ws, {
              header: 0,
              raw: false,
              dateNF: "yyyy-mm-dd",
            });
            console.log(data);

            if (data == "Job_Grade") {
              await BulkUploudJobGrade(dataParse);
            } else if (data == "Job_Level") {
              await BulkUploudJobLevel(dataParse);
            } else if (data == "Job_Title") {
              await BulkUploudJobTitle(dataParse);
            } else if (data == "Job_Position") {
              await BulkUploudJobPosition({ data: dataParse });
              console.log("TEST JOB POSITION");
            } else {
              console.log("GK ADA!!!");
            }
          });
        } catch (error) {
          setError("");
          console.log(error);
          SwalError({ message: "Error while importing the employees data!" });
        }
      };
      await reader.readAsBinaryString(file);
      setError("");
      SwalSuccess({ message: "Bulk Data Import Successfully!" });
    } catch (error) {
      setError("");
      console.log(error);
      SwalError({ message: "Error while importing the employees data!" });
    }
  };
  return (
    <>
      <div className="bg-white p-5 rounded-lg space-y-5">
        <div className="space-y-5">
          <h1 className="font-bold">Bulk Upload</h1>
          <p className="text-xs text-gray-400">
            Import a CVS to update external user data
          </p>
        </div>
        <div className="space-y-5 mx-3">
          <h1 className="font-bold">Step :</h1>
          <ul className="list-disc mx-3">
            <li>Select the type of work template</li>
            <li>Download Job tamplate</li>
            <li>Fill in Job data according to the available template</li>
            <li>Make sure the data you fill is correct</li>
          </ul>
          <h1 className="font-bold">Download Template :</h1>
          <label
            className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-300"
            for="file_input"
          >
            Job management template
          </label>
          <div className="d-flex">
            <a
              href={`${endpoint}/assets/JobManagement.xlsx`}
              download
              target={"_blank"}
              className="inline-flex items-center text-[#59B6CD] hover:text-[#59B6CD]"
            >
              <span>CSV template</span>
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.4998 13.7498V16.4998H5.49984V13.7498H3.6665V16.4998C3.6665 17.5082 4.4915 18.3332 5.49984 18.3332H16.4998C17.5082 18.3332 18.3332 17.5082 18.3332 16.4998V13.7498H16.4998ZM15.5832 10.0832L14.2907 8.79067L11.9165 11.1557V3.6665H10.0832V11.1557L7.709 8.79067L6.4165 10.0832L10.9998 14.6665L15.5832 10.0832Z"
                  fill="#219EBC"
                  fill-opacity="0.75"
                />
              </svg>
            </a>
          </div>
          <div className="mt-5 space-y-2">
            <label
              className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-300"
              for="file_input"
            >
              Upload file
            </label>
            <input
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              accept={".xlsx,.csv"}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <p className="text-xs">max 64 MB</p>
            <p className="text-red-600">{errorMsg ? errorMsg : ""}</p>
          </div>
          <div className="d-flex justify-end">
            <button
              onClick={() => handleChange()}
              className="bg-[#0E5073] hover:bg-[#003049] text-white flex items-center px-3 py-2 fs-5 rounded-md"
            >
              Import
            </button>
          </div>
        </div>
      </div>
      <LoadingDialog active={isLoading} />
    </>
  );
}

export default BulkUploud;
