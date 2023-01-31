import { useEffect, useState } from "react";
import {
  GetInfo,
  updateInformation,
} from "../../../../Repository/AdminRepository";
import { SwalError, SwalSuccess } from "../../../../Components/Modals";

const { Edit, Save } = require("@mui/icons-material");
const { IconButton, Button } = require("@mui/material");

function GeneralInformation() {
  const [isEdited, setEdited] = useState(false);
  const [ginfo, setGinfo] = useState([]);
  const [editValues, setEditValues] = useState({});
  const inAwait = async () => {
    var rec = await GetInfo();
    setGinfo(rec["result"]);
  };
  useEffect(() => {
    inAwait();
  }, []);

  console.log(ginfo);

  console.log(ginfo);
  const editData = async () => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(ginfo)) {
      formData.append(key, value);
    }
    const update = await updateInformation(formData);
    if (update.status === 200) {
      SwalSuccess({ message: "Update information successfuly!" });
      inAwait();
    } else {
      SwalError();
    }
    setEdited(!isEdited);
  };

  return (
    <div
      className="p-4"
      style={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
    >
      <div className="d-flex justify-content-between align-items-center pb-3">
        <div>
          <h2>
            <b>General Information</b>
          </h2>
          <h6>General company information</h6>
        </div>
        <Button
          onClick={() => {
            if (isEdited === true) {
              editData();
            } else {
              setEdited(!isEdited);
            }
          }}
          style={{ color: "#FFFFFF", backgroundColor: "#0E5073" }}
          startIcon={isEdited === true ? <Save /> : <Edit />}
        >
          {" "}
          {isEdited === true ? "Save" : "Edit"}
        </Button>
      </div>
      <hr></hr>
      <div className="row mt-3">
        <div className="flex">
          <label>Company Logo</label>
          <label className="cursor-pointer" for="Clogo">
            <input
              id="Clogo"
              accept="image/*"
              type="file"
              disabled={!isEdited}
              className="hidden"
              onChange={(e) =>
                setGinfo({ ...editValues, image2: e.target.files[0] })
              }
            />
            <img
              for="Clogo"
              // src={
              //   ginfo.image == "http://staging.api.humanusia.id/assets/ethos/" ? (
              //     "https://cdn.discordapp.com/attachments/990841636386897971/1056795799570366464/Group_1000005990.png"
              //   ) : (
              //     ginfo.image 
              //   )
              // }
              src={
                  "https://cdn.discordapp.com/attachments/990841636386897971/1056795799570366464/Group_1000005990.png" ??
                  ginfo.image 
              }
              alt="Company Logo"
              style={{ maxWidth: "150px" }}
            />
          </label>
        </div>
        <div className="w-100"></div>
        <div className="col-md-7 my-3">
          <div className="form-group">
            <label>Organization name</label>
            <input
              value={
                ginfo
                  ? ginfo.organization_name
                    ? ginfo.organization_name
                    : ""
                  : ""
              }
              onChange={(val) => {
                setGinfo({ ...ginfo, organization_name: val.target.value });
              }}
              disabled={!isEdited}
              className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
            />
          </div>
        </div>
        <div className="col-md-5 my-3">
          <div className="form-group">
            <label>Number of employee</label>
            <input
              value={
                ginfo ? (ginfo.countEmployee ? ginfo.countEmployee : "") : ""
              }
              disabled
              className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
            />
          </div>
        </div>
        <div className="col-md-6 my-3">
          <div className="form-group">
            <label>Registration Number</label>
            <input
              value={
                ginfo
                  ? ginfo.register_number
                    ? ginfo.register_number
                    : ""
                  : ""
              }
              onChange={(val) => {
                setGinfo({ ...ginfo, register_number: val.target.value });
              }}
              disabled={!isEdited}
              className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
            />
          </div>
        </div>
        <div className="col-md-6 my-3">
          <div className="form-group">
            <label>Tax ID</label>
            <input
              disabled={!isEdited}
              value={ginfo ? (ginfo.tax_id ? ginfo.tax_id : "") : ""}
              onChange={(val) => {
                setGinfo({ ...ginfo, tax_id: val.target.value });
              }}
              className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
            />
          </div>
        </div>
        <div className="col-12 my-3">
          <hr></hr>
        </div>
        <div className="col-md-4 my-3">
          <div className="form-group">
            <label>Phone</label>
            <input
              value={ginfo ? (ginfo.phone ? ginfo.phone : "") : ""}
              onChange={(val) => {
                setGinfo({ ...ginfo, phone: val.target.value });
              }}
              disabled={!isEdited}
              type="number"
              className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
            />
          </div>
        </div>
        <div className="col-md-4 my-3">
          <div className="form-group">
            <label>Fax</label>
            <input
              value={ginfo ? (ginfo.fax ? ginfo.fax : "") : ""}
              onChange={(val) => {
                setGinfo({ ...ginfo, fax: val.target.value });
              }}
              disabled={!isEdited}
              className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
            />
          </div>
        </div>
        <div className="col-md-4 my-3">
          <div className="form-group">
            <label>Email</label>
            <input
              value={ginfo ? (ginfo.email ? ginfo.email : "") : ""}
              onChange={(val) => {
                setGinfo({ ...ginfo, email: val.target.value });
              }}
              disabled={!isEdited}
              className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
            />
          </div>
        </div>
        <div className="col-12 my-3">
          <hr></hr>
        </div>
        <div className="col-md-6 my-3">
          <div className="form-group">
            <label>Address 1</label>
            <input
              value={ginfo ? (ginfo.address_1 ? ginfo.address_1 : "") : ""}
              onChange={(val) => {
                setGinfo({ ...ginfo, address_1: val.target.value });
              }}
              disabled={!isEdited}
              className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
            />
          </div>
        </div>
        <div className="col-md-6 my-3">
          <div className="form-group">
            <label>Address 2</label>
            <input
              value={ginfo ? (ginfo.address_2 ? ginfo.address_2 : "") : ""}
              onChange={(val) => {
                setGinfo({ ...ginfo, address_2: val.target.value });
              }}
              disabled={!isEdited}
              className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
            />
          </div>
        </div>
        <div className="col-md-6 my-3">
          <div className="form-group">
            <label>Postal Code</label>
            <input
              value={ginfo ? (ginfo.postal_code ? ginfo.postal_code : "") : ""}
              onChange={(val) => {
                setGinfo({ ...ginfo, postal_code: val.target.value });
              }}
              disabled={!isEdited}
              className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
            />
          </div>
        </div>
        <div className="col-md-6 my-3">
          <div className="form-group">
            <label>Country</label>
            <input
              value={ginfo ? (ginfo.country ? ginfo.country : "") : ""}
              onChange={(val) => {
                setGinfo({ ...ginfo, country: val.target.value });
              }}
              disabled={!isEdited}
              className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
            />
          </div>
        </div>
        <div className="col-md-6 my-3">
          <div className="form-group">
            <label>City</label>
            <input
              value={ginfo ? (ginfo.city ? ginfo.city : "") : ""}
              onChange={(val) => {
                setGinfo({ ...ginfo, city: val.target.value });
              }}
              disabled={!isEdited}
              className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
            />
          </div>
        </div>
        <div className="col-md-6 my-3">
          <div className="form-group">
            <label>Province</label>
            <input
              value={ginfo ? (ginfo.province ? ginfo.province : "") : ""}
              onChange={(val) => {
                setGinfo({ ...ginfo, province: val.target.value });
              }}
              disabled={!isEdited}
              className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
            />
          </div>
        </div>
        <div className="col-md-6 my-3">
          <div className="form-group">
            <label>Notes</label>
            <textarea
              value={ginfo ? (ginfo.notes ? ginfo.notes : "") : ""}
              onChange={(val) => {
                setGinfo({ ...ginfo, notes: val.target.value });
              }}
              disabled={!isEdited}
              rows={4}
              style={{ backgroundColor: !isEdited ? "#00000005" : "#FFFFFF" }}
              className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            ></textarea>
          </div>
        </div>
      </div>
      <div
        className="m-4 gap-4 justify-content-end"
        style={{
          display: !isEdited ? "none" : "flex",
        }}
      >
        <Button
          style={{
            border: "none",
            fontSize: "14px",
            backgroundColor: "#ECECEC",
            color: "#003049",
            fontWeight: "500",
          }}
          className="px-3"
          onClick={() => {
            setEdited(!isEdited);
            inAwait();
          }}
          // onClick={() => {
          //     // setModal(false);
          //     // navigate("/recruitment");
          // }}
        >
          Cancel
        </Button>
        <Button
          style={{
            border: "none",
            fontSize: "14px",
            backgroundColor: "#0E5073",
            color: "#FFFFFF",
          }}
          onClick={() => editData()}
          className="px-3"
          type="submit"
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default GeneralInformation;
