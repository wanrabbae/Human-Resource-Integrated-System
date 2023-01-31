import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import Select from "react-select";
import { getJob, getProfile, updateJob } from "../../../../Repository/ProfileRepository";

function Job({data}) {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [ContractDetail, setContractDetail] = useState(false);
  const [job, setJob] = useState([]);
  const [datprof, setDatprof] = useState([]);

  const [contractStart, setContractStart] = useState([]);
  const [contractEnd, setContractEnd] = useState([]);
  const [contractFile, setContractFile] = useState([]);


  const inAwait = async () => {
    var datas = await getJob();
    setJob(datas.result);
    var dataProfile = await getProfile();
    setDatprof(dataProfile.result);
    setContractStart(data?.result?.contractStart);
    setContractEnd(data?.result?.contractEnd);
    setContractFile(data?.result?.contractFile);
  };

  useEffect(() => {
    inAwait();
    if (window.localStorage.getItem("users") == null) {
      window.location.href = "/";
    } else {
      var data = JSON.parse(window.localStorage.getItem("users"));
      setUsers(data);
      // inAwait();
    }
  }, []);

  const postData = async () => {
    var requestBody = {
      contractStart: contractStart,
      contractEnd: contractEnd,
      contractFile: contractFile,
    };
    console.log(requestBody);
    inAwait();
    setModal(false);
    var res = await updateJob(requestBody);
    console.log(res);
  };
  return (
    <>
      <div>
        <div className="mb-4">
          <span style={{ fontWeight: "600" }}>Job Details</span>
        </div>
        <form>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Joined Date
              </label>
              <input
                disabled
                value={job.joinDate}
                className=" appearance-none border rounded w-full py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
              />
            </div>
            <div className="">
              <label className="block text-gray-700 text-sm mb-2">
                Position Id
              </label>
              <input
                disabled
                value={datprof?.employee?.position_id}
                className=" appearance-none border rounded w-full py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
              />
            </div>
            <div className="">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Superior Id
              </label>
              <input
                disabled
                value={datprof?.employee?.superior_id}
                className=" appearance-none border rounded w-full py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
              />
            </div>
            <div className="">
              <label className="block text-gray-700 text-sm mb-2">
              Superior Title
              </label>
              <input
                disabled
                value={datprof?.employee?.superior_title}
                className=" appearance-none border rounded w-full py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
              />
            </div>
            <div className="">
              <label className="block text-gray-700 text-sm mb-2">
                Job Level
              </label>
              <input
                disabled
                value={job.jobLevel?.name}
                className=" appearance-none border rounded w-full py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
              />
            </div>
            {/* <div className="">
              <label className="block text-gray-700 text-sm mb-2">
                Job Title
              </label>
              <input
                disabled
                value={job.jobTitle?.name}
                className=" appearance-none border rounded w-full py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
              />
            </div> */}
            <div className="">
              <label className="block text-gray-700 text-sm mb-2">
                Job Position
              </label>
              <input
                disabled
                value={job.jobPosition?.name}
                className=" appearance-none border rounded w-full py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
              />
            </div>
            <div className="">
              <label className="block text-gray-700 text-sm mb-2">
                Location
              </label>
              <input
                disabled
                value={job.location}
                className=" appearance-none border rounded w-full py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
              />
            </div>
          </div>
          <hr style={{ backgroundColor: "#CACACA" }} className="mb-4"></hr>
          <div className="d-flex justify-content-between my-4 align-middle">
            <div className="align-middle align-items-center align-center">
              <label
                for="checked-toggle"
                className="inline-flex relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  value=""
                  id="checked-toggle"
                  onClick={() => setContractDetail((s) => !s)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-0 dark:peer-focus:ring-0 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#669BBC]"></div>
                <span
                  className="ml-3 "
                  style={{ fontSize: "15px", color: "#737373" }}
                >
                  Include Employment Contract Details
                </span>
              </label>
            </div>
            <Button
              style={{
                border: "1px solid #CACACA",
                fontSize: "14px",
                backgroundColor: "#FFFFFF",
                color: "#003049",
                fontWeight: "500",
              }}
              className=""
              onClick={() => setModal(true)}
              hidden
            >
              Terminate Employement
            </Button>
          </div>
          {ContractDetail ? (
            <div onHide={() => setContractDetail(false)}>
              <div className="row mb-4">
                <div className="col-4">
                  <label
                    className="block text-gray-700 text-sm mb-2"
                    for="username"
                  >
                    Contract Start Date
                  </label>
                  <input
                    className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                    id="username"
                    type="text"
                    value={contractStart}
                    onChange={(e) => setContractStart(e.target.value)}
                    disabled
                  />
                </div>
                <div className="col-4">
                  <label
                    className="block text-gray-700 text-sm mb-2"
                    for="username"
                  >
                    Contract End Date
                  </label>
                  <input
                    className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                    id="username"
                    type="text"
                    value={contractEnd}
                    onChange={(e) => setContractEnd(e.target.value)}
                    disabled
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-8">
                  <label
                    className="block text-gray-700 text-sm mb-2"
                    for="username"
                  >
                    Contract Details
                  </label>
                  {/* <input
                    className="block text-sm w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                    onChange={(e) => setContractFile(e.target.files[0])}
                  /> */}
                  <a
                  href={contractFile}
                    style={{
                      border: "none",
                      fontSize: "14px",
                      backgroundColor: "#0E5073",
                      color: "#FFFFFF",
                      padding: "10px",
                      borderRadius: "10px",
                    }}
                    target="_blank"
                    download
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          {/* <div>
                    {!hidden ? <p>You can see me!</p> : null}
                    <button onClick={() => setHidden(s => !s)}>
                        react show hide component
                    </button>
                    </div> */}
          <div className="d-flex justify-content-end mt-4">
            <Button
              style={{
                border: "none",
                fontSize: "14px",
                backgroundColor: "#0E5073",
                color: "#FFFFFF",
              }}
              className="px-4"
              onClick={postData}
              hidden
            >
              Save
            </Button>
          </div>
        </form>
      </div>
      <Modal show={modal} size="lg" onHide={() => setModal(false)}>
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Terminate Employement
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Termination Date <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="date"
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Termination Reason <span style={{ color: "#780000" }}>*</span>
              </label>
              <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                <option className="py-3" hidden>
                  Select
                </option>
                <option className="py-3">Contract Not Renewed</option>
                <option className="py-3">Deceased</option>
                <option className="py-3">Dismised</option>
                <option className="py-3">Laid-off</option>
                <option className="py-3">Other</option>
              </select>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-6">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Note
              </label>
              <textarea
                rows="4"
                className=" appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="m-4">
          <Button
            style={{
              border: "none",
              fontSize: "14px",
              backgroundColor: "#ECECEC",
              color: "#003049",
            }}
            className="px-3"
            onClick={() => setModal(false)}
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
            className="px-3"
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Job;
