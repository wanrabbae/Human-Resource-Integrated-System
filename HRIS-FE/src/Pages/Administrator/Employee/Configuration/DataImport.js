import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { SwalSuccess, SwalError, LoadingDialog } from "../../../../Components/Modals";
import { ImportEmployee } from "../../../../Repository/EmployeeRepository";
import { endpoint } from "../../../../Utils/constant";

function DataImport() {
  const [file, setFile] = useState();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate()
  const employees = [];
  const handleChange = async (e) => {
    setLoading(true);
    try {
      var formData = new FormData();
      formData.append("file", file)
      var res = await ImportEmployee(formData);
      console.log(res);
      setLoading(false);
      SwalSuccess({message: "Success import employees!"})
      navigate("/employee/employee-list")
    } catch (error) {
      console.log(error);
      setLoading(false);
      SwalError({ message: "Error while importing the employees data!" });
    }
  };

  const handleImport = async () => {
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
          const wsname = readedData.SheetNames[0];
          const ws = readedData.Sheets[wsname];

          /* Convert array to json*/
          const dataParse = XLSX.utils.sheet_to_json(ws, {
            header: 0,
            raw: false,
            dateNF: "yyyy-mm-dd",
          });
          await ImportEmployee(dataParse);
          SwalSuccess({message: "Success import employees!"})
          navigate("/employee/employee-list")
        } catch (error) {
          console.log(error);
          SwalError({ message: "Error while importing the employees data!" });
        }
      };
      await reader.readAsBinaryString(file);
      SwalSuccess({ message: "Success importing employee data" });
    } catch (error) {
      console.log(error);
      SwalError({ message: "Error while importing the employees data!" });
    }
  };

  return (
    <>
      <div className="bg-white p-3 rounded-lg space-y-5">
        <div className="space-y-2">
          <h1 className="font-bold">Data Import</h1>
          <p className="text-xs text-gray-400">
            Import a CVS to update external user data
          </p>
        </div>
        <div className="space-y-2 mx-3">
          <h1 className="font-bold">Note :</h1>
          <ul className="list-disc mx-3">
            <li>Excel file must have column labelsin the first row.</li>
            <li>Excel file must not contain unicode characters.</li>
            <li>Column order should not be changed</li>
            <li>
              First Name and Last Name are compulsory, if gender is specified,
              value should be either Male or Female
            </li>
            <li>All date fields should be in YYYY-MM-DD format</li>
            <li>
              Each import file should be configured for 100 records or less
            </li>
          </ul>
          <a
            href={`${endpoint}/assets/employee/ImportEmployee.xlsx`}
            download
            target={"_blank"}
            className="inline-flex items-center text-[#59B6CD] hover:text-[#59B6CD]"
          >
            <span>Excel template</span>
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
              onChange={(e) => {setFile(e.currentTarget.files[0])}}
              type="file"
              accept={".xlsx,.csv"}
            />
            <p className="text-xs">max 64 MB</p>
          </div>
          <div className="d-flex justify-end">
            <button
              onClick={() => handleChange()}
              className="bg-[#0E5073] hover:bg-[#003049] text-white text-sm flex items-center px-3 py-2 rounded-md"
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

export default DataImport;
