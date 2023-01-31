import {
  Add,
  AlignVerticalCenter,
  ArrowUpuseEffect,
  wardTwoTone,
  Close,
  Delete,
  DeleteOutline,
  EditOutlined,
  Filter,
  Filter1,
  FilterCenterFocus,
  FilterList,
  ImportExport,
  Search,
} from "@mui/icons-material";

import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import {
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
} from "react-bootstrap";
import { ModalDelete, SwalSuccess } from "../../../../Components/Modals";
import {
  AddCompanyLocation,
  deleteCompanyLocation,
  EditCompanyLocation,
  getCityProvince,
  getCompanyLocation,
  getCountries,
  getProfit,
  getProvince,
} from "../../../../Repository/AdminRepository";

function Locations() {
  const [locations, setLocations] = useState([]);
  const [idProvince, setIdProvince] = useState(0);
  const [anotherData, setAnotherData] = useState({});
  const [province, setProvince] = useState([]);
  const [cprovince, setCityProvince] = useState([]);
  const [editValues, setEditValues] = useState({});
  const [dialogTitle, setTitle] = useState(false);
  const [countries, SetCountries] = useState([]);
  const [dialogEditTitle, setEditTitle] = useState(false);
  const [selectedOption, setSelectedOption] = useState(province[0]);
  const [isdelete, setDelete] = useState(false);
  const [id, setId] = useState();
  const [isCheckedAll, setCheckedAll] = useState(false);
  const [isDelAll, setDelAll] = useState();
  const [isCheck, setIsCheck] = useState([]);

  const inAwait = async () => {
    var rec = await getCompanyLocation();
    setLocations(rec);
    var prov = await getProvince();
    setProvince(prov["provinsi"]);
    var con = await getCountries();
    SetCountries(con);
  };
  useEffect(() => {
    inAwait();
  }, []);

  const handleSelectAll = async (e) => {
    setCheckedAll(!isCheckedAll);
    var arr = [];
    if (!isCheckedAll) {
      for (var x = 0;x < locations.length;x++) {
        arr.push(locations[x].id);
      }
    }
    setIsCheck(arr);
  };

  const handleClick = async (e) => {
    setCheckedAll(false);
    const value = parseInt(e.target.value);
    var data = [...isCheck];
    if (isCheck.includes(value)) {
      var index = data.indexOf(value);
      data.splice(index,1);
    } else {
      data.push(value);
    }
    setIsCheck(data);
  };

  return (
    <>
      <div
        className="w-100 p-4"
        style={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
      >
        <h5>
          <b>Company Locations</b>
        </h5>
        <p>
          <small>list of Company Locations</small>
        </p>
        <br></br>
        <div className="d-flex justify-content-between">
          <div>
            <Button
              style={{
                color: "#003049",
                border: "1px solid #00000040",
                borderRadius: "7px",
                backgroundColor: "transparent",
              }}
              variant="contained"
              startIcon={<DeleteOutline />}
              onClick={async () => {
                for (var x = 0;x < isCheck.length;x++) {
                  await deleteCompanyLocation(isCheck[x]);
                }
                SwalSuccess({ message: "Success Delete All Lisence" });
                // var del = await deleteCompanyLocation(isDelAll)
                setIsCheck([]);
                await inAwait();
                setCheckedAll(false);
              }}
            >
              Delete
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                setTitle(!dialogTitle);
              }}
              style={{
                color: "#FFFFFF",
                borderRadius: "7px",
                backgroundColor: "#0E5073",
              }}
              variant="contained"
              startIcon={<Add />}
            >
              Add Location
            </Button>
          </div>
        </div>
        <br></br>
        <Table borderless responsive style={{ color: "#00000070", fontSize: "0.75rem" }}>
          <thead>
            <tr style={{ backgroundColor: "#EBF7FF" }}>
              <th width="10px">
                <input type="checkbox" style={{ borderRadius: "2px" }} onChange={handleSelectAll} checked={isCheckedAll}/>
              </th>
              <th onClick={() => {}}>
                Name <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}}>
                City <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}}>
                Country <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}}>
                Phone <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {locations.length > 0 ? (
              locations.map((location) => (
                <tr>
                  <td className="align-middle">
                    <input
                      key={location.id}
                      type="checkbox" 
                      value={location.id}
                      style={{ borderRadius: "2px" }} 
                      // checked={isCheckedAll ? true : false}
                      checked={isCheck.includes(location.id)}
                      // onChange={(e) => console.log(skill["id"])}
                      onChange={handleClick} 
                    />
                  </td>
                  <td className="align-middle" style={{ minWidth: "200px" }}>
                    {location.name}
                  </td>
                  <td className="align-middle" style={{ minWidth: "200px" }}>
                    {location.city}
                  </td>
                  <td className="align-middle" style={{ minWidth: "200px" }}>
                    {location.country}
                  </td>
                  <td className="align-middle" style={{ minWidth: "200px" }}>
                    {location.phone}
                  </td>
                  <td className="align-middle" style={{ minWidth: "100px" }}>
                    <button
                      onClick={() => {
                        setId(location.id);
                        setEditValues(location);
                        setEditTitle(!dialogEditTitle);
                      }}
                      className="btn btn-sm mx-1"
                      style={{
                        backgroundColor: "#CEDFEA",
                        borderRadius: "8px",
                      }}
                    >
                      <EditOutlined fontSize="10px" />
                    </button>
                    <button
                      onClick={() => {
                        setDelete(true);
                        setId(location.id);
                      }}
                      className="btn btn-sm mx-1"
                      style={{
                        backgroundColor: "#CEDFEA",
                        borderRadius: "8px",
                      }}
                    >
                      <DeleteOutline fontSize="10px" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <td colSpan={6}>
                <div className="d-flex justify-content-center align-middle text-center">
                  No Data
                </div>
              </td>
            )}
          </tbody>
        </Table>
      </div>

      <Modal show={dialogTitle} size="lg" onHide={() => setTitle(!dialogTitle)}>
        <Modal.Header
          closeButton
          className="m-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title>Add Location</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const getProvinceId = await getProvince(idProvince);
            var requestBody = {
              name: document.getElementById("name").value,
              city: anotherData?.city,
              province: getProvinceId?.nama,
              country: document.getElementById("country").value,
              postalCode: document.getElementById("postalCode").value,
              phone: document.getElementById("phone").value,
              fax: document.getElementById("fax").value,
              address: document.getElementById("address").value,
              note: document.getElementById("note").value,
            };
            var res = await AddCompanyLocation(requestBody);
            setTitle(!dialogTitle);
            SwalSuccess({ message: "Success add location" });
            inAwait();
          }}
        >
          <Modal.Body className="mx-4">
            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label className="mb-1">
                    Location Name <span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Location Name..."
                    id="name"
                  />
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div className="form-group">
                  <label className="mb-1">
                    Province <span className="text-danger">*</span>
                  </label>
                  <select
                    onChange={async (e) => {
                      var Cprov = await getCityProvince(e.target.value);
                      setIdProvince(e.target.value);
                      setCityProvince(Cprov["kota_kabupaten"]);
                    }}
                    id="province"
                    required
                    className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Select Province</option>
                    {province.map((val) => {
                      return <option value={val.id}>{val.nama}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div className="form-group">
                  <label className="mb-1">
                    City <span className="text-danger">*</span>
                  </label>
                  <select
                    required
                    id="city"
                    onChange={(e) =>
                      setAnotherData({ ...anotherData, city: e.target.value })
                    }
                    className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Select City</option>
                    {cprovince.map((val) => {
                      return <option value={val.nama}>{val.nama}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div className="form-group">
                  <label className="mb-1">
                    Country <span className="text-danger">*</span>
                  </label>
                  <select
                    required
                    id="country"
                    className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Select Country</option>
                    {countries.map((val) => (
                      <option className="py-3" value={val.name}>
                        {val.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div className="form-group">
                  <label className="mb-1">
                    Postal Code <span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    id="postalCode"
                    placeholder="Postal Code..."
                    type="number"
                    className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="col-md-6 my-3">
                <div className="form-group">
                  <label className="mb-1">
                    Phone <span className="text-danger">*</span>
                  </label>
                  <input
                    id="phone"
                    required
                    placeholder="Phone number..."
                    type="number"
                    className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="col-md-6 my-3">
                <div className="form-group">
                  <label className="mb-1">
                    Fax <span className="text-danger">*</span>
                  </label>
                  <input
                    id="fax"
                    required
                    placeholder="Fax number..."
                    type="number"
                    className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="col-md-12 my-3">
                <div className="form-group">
                  <label className="mb-1">
                    Address <span className="text-danger">*</span>
                  </label>
                  <textarea
                    required
                    id="address"
                    rows={4}
                    className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Address..."
                  ></textarea>
                </div>
              </div>
              <div className="col-md-12 my-3">
                <div className="form-group">
                  <label className="mb-1">Note</label>
                  <textarea
                    id="note"
                    required
                    rows={4}
                    className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Note..."
                  ></textarea>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="m-4">
            <button
              type="button"
              className="btn"
              style={{
                backgroundColor: "#00000010",
                border: "1px solid transparent",
                color: "#0E5073",
                width: "100px",
              }}
              onClick={() => setTitle(!dialogTitle)}
            >
              Cancel
            </button>
            <button
              className="btn"
              type="submit"
              style={{
                backgroundColor: "#0E5073",
                border: "1px solid transparent",
                color: "#FFFFFF",
                width: "100px",
              }}
            >
              Add
            </button>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal
        show={dialogEditTitle}
        size="lg"
        onHide={() => setEditTitle(!dialogEditTitle)}
      >
        <Modal.Header
          closeButton
          className="m-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title>Edit Location</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <label className="mb-1">
                  Location Name <span className="text-danger">*</span>
                </label>
                <input
                  id="nameEdit"
                  value={editValues?.name ?? null}
                  onChange={(e) =>
                    setEditValues({ ...editValues, name: e.target.value })
                  }
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Location Name..."
                />
              </div>
            </div>
            <div className="col-md-6 my-3">
              <div className="form-group">
                <label className="mb-1">
                  Province <span className="text-danger">*</span>
                </label>
                <select
                  onChange={async (e) => {
                    var Cprov = await getCityProvince(e.target.value);
                    setIdProvince(e.target.value);
                    setCityProvince(Cprov["kota_kabupaten"]);
                  }}
                  id="province"
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>Select Province</option>
                  {province.map((val) => {
                    return (
                      <option
                        selected={
                          editValues?.province == val.nama ? true : false
                        }
                        value={val.id}
                      >
                        {val.nama}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col-md-6 my-3">
              <div className="form-group">
                <label className="mb-1">
                  City <span className="text-danger">*</span>
                </label>
                <select
                  id="city"
                  onChange={(e) =>
                    setAnotherData({ ...anotherData, city: e.target.value })
                  }
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>Select City</option>
                  {cprovince.map((val) => {
                    return (
                      <option
                        selected={editValues.city == val.nama ? true : false}
                        value={val.nama}
                      >
                        {val.nama}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col-md-6 my-3">
              <div className="form-group">
                <label className="mb-1">
                  Country <span className="text-danger">*</span>
                </label>
                <select
                  id="country"
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>Select Country</option>
                  <option
                    selected={editValues?.country == "Indonesia" ? true : false}
                  >
                    Indonesia
                  </option>
                  <option
                    selected={editValues?.country == "Malaysia" ? true : false}
                  >
                    Malaysia
                  </option>
                  <option
                    selected={editValues?.country == "Maroko" ? true : false}
                  >
                    Maroko
                  </option>
                  <option
                    selected={editValues?.country == "Arab" ? true : false}
                  >
                    Arab
                  </option>
                </select>
              </div>
            </div>
            <div className="col-md-6 my-3">
              <div className="form-group">
                <label className="mb-1">
                  Postal Code <span className="text-danger">*</span>
                </label>
                <input
                  value={editValues?.postalCode ?? null}
                  onChange={(e) =>
                    setEditValues({ ...editValues, postalCode: e.target.value })
                  }
                  placeholder="Postal Code..."
                  type="number"
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>

            <div className="col-md-6 my-3">
              <div className="form-group">
                <label className="mb-1">
                  Phone <span className="text-danger">*</span>
                </label>
                <input
                  value={editValues?.phone ?? null}
                  onChange={(e) =>
                    setEditValues({ ...editValues, phone: e.target.value })
                  }
                  placeholder="Phone number..."
                  type="number"
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>

            <div className="col-md-6 my-3">
              <div className="form-group">
                <label className="mb-1">
                  Fax <span className="text-danger">*</span>
                </label>
                <input
                  value={editValues?.fax ?? null}
                  onChange={(e) =>
                    setEditValues({ ...editValues, fax: e.target.value })
                  }
                  placeholder="Fax number..."
                  type="number"
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>

            <div className="col-md-12 my-3">
              <div className="form-group">
                <label className="mb-1">
                  Address <span className="text-danger">*</span>
                </label>
                <textarea
                  id="addressEdit"
                  value={editValues?.address ?? null}
                  onChange={(e) =>
                    setEditValues({ ...editValues, address: e.target.value })
                  }
                  rows={4}
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Address..."
                ></textarea>
              </div>
            </div>
            <div className="col-md-12 my-3">
              <div className="form-group">
                <label className="mb-1">Note</label>
                <textarea
                  id="noteEdit"
                  value={editValues?.note ?? null}
                  onChange={(e) =>
                    setEditValues({ ...editValues, note: e.target.value })
                  }
                  rows={4}
                  className="bg-light-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Note..."
                ></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="m-4">
          <button
            className="btn"
            style={{
              backgroundColor: "#00000010",
              border: "1px solid transparent",
              color: "#0E5073",
              width: "100px",
            }}
            onClick={() => setEditTitle(!dialogEditTitle)}
          >
            Cancel
          </button>
          <button
            className="btn"
            style={{
              backgroundColor: "#0E5073",
              border: "1px solid transparent",
              color: "#FFFFFF",
              width: "100px",
            }}
            onClick={async () => {
              const getProvinceId = await getProvince(idProvince);
              var requestBody = {
                id: editValues.id,
                name: document.getElementById("nameEdit")?.value,
                city: anotherData?.city,
                province: getProvinceId?.nama,
                country: document.getElementById("countryEdit")?.value,
                postalCode: document.getElementById("postalCodeEdit")?.value,
                phone: document.getElementById("phoneEdit")?.value,
                fax: document.getElementById("faxEdit")?.value,
                address: document.getElementById("addressEdit")?.value,
                note: document.getElementById("noteEdit")?.value,
              };
              var res = await EditCompanyLocation(requestBody);
              setEditTitle(!dialogEditTitle);
              SwalSuccess({ message: "Success edit location" });
              inAwait();
            }}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>

      <ModalDelete
        close={() => {
          setDelete(false);
        }}
        submit={() => {
          deleteCompanyLocation(id);
          setDelete(false);
          inAwait();
          SwalSuccess({ message: "Success delete location" });
        }}
        active={isdelete}
      />
    </>
  );
}

export default Locations;
