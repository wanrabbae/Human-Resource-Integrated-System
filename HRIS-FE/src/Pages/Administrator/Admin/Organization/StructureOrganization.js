import { Button, FormControlLabel, Switch } from "@mui/material";
import { DeleteOutlineOutlined, CreateOutlined } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { useCallback, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Tree, { useTreeState, treeHandlers } from "react-hyper-tree";
import classNames from "classnames";
import ChevronDown from "react-multiselect-checkboxes/lib/ChevronDown";
import { ArrowDown, ArrowUp, CaretUp, CaretDown, TreeStructure } from "phosphor-react";
import { AddJobPosition, addStructure, deleteStructure, DelJobPosition, getCodeStructure, GetInfo, GetJobGrade, GetJobPosition, getStructure, UpdateJobPosition, updateStructure } from "../../../../Repository/AdminRepository";
import { removeSpace } from "../../../../Constant/utils";
import { ModalDelete, SwalSuccess } from "../../../../Components/Modals";

function StructureOrganization() {
  const [isSelected, setSelected] = useState(false);
  const [isEdited, setEdited] = useState(false);
  const [controllerEdited, setController] = useState({});
  const [modalAdd, setModalAdd] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [ginfo, setGinfo] = useState([]);
  const [jobPosition, setJobPosition] = useState([]);
  const [jobgrade, setJobGrade] = useState([]);
  const [allStruct, setStruct] = useState([]);
  const [isdelete, setDelete] = useState(false);


  const [data, setData] = useState([]);
  const loadData = async () => {
    var grd = await GetJobGrade();
    setJobGrade(grd);
    var rec = await GetJobPosition();
    setJobPosition(rec["result"]);
    var structure = await getStructure();
    var allStructure = await getStructure(1);
    setData(structure);
    setStruct(allStructure);
    var general = await GetInfo();
    setGinfo(general["result"]);
  };
  useEffect(() => {
    loadData();
  }, []);
  
  console.log(ginfo);
  const { required, handlers } = useTreeState({
    id: "tree",
    data: data,
    defaultOpened: true,
  });

  const renderNode = useCallback(({
    node,
    onToggle,
  }) => (
    <div className="tree-node" key={node.data.title}>
      <div className="d-flex align-items-center">
        <div className="align-center align-items-center">
          {
            node.data.children.length >= 1 ?
              node.options.opened
                ?
                <button className="p-2.5 bg-[#C1121F] rounded-xl mt-3 mr-3" onClick={onToggle}><CaretUp color="white" size={16} weight="fill" /></button>
                : <button className="p-2.5 bg-[#C1121F] rounded-xl mt-3 mr-3" onClick={onToggle}><CaretDown color="white" size={16} weight="fill" /></button> : <div className="px-4"></div>
          }
        </div>
        <div
          className={`mt-3 py-2.5 px-3 w-full shadow-md rounded-xl flex justify-between items-center`}
          style={{ backgroundColor: `${node.data.color.toUpperCase()}` }}
        // className={classnames({
        //   'node-content-wrapper': true,
        //   'node-selected': node.isSelected(),
        // })}
        >
          <div className="flex titles">
            <div className="node-title max-w-max truncate">
              {isSelected == true ? (
                    <div className="flex items-center">
                      {node.data.name}
                      <span style={{ maxWidth: "300px" }} className="max-w-max truncate text-[10px] " > {node.data.structure_id}</span>
                    </div>
                ) : (
                  <div>
                    {node.data.name}
                  </div>
                )
              }
            </div>
          </div>
          <div className="flex space-x-3" style={{ display: `${isSelected == false ? "none" : ""}` }}>
            <button
              className="bg-[#FFFFFF] flex items-center rounded-lg"
              onClick={async () => {
                setId(node.data.id);
                setDelete(true);
              }}
            >
              <DeleteOutlineOutlined
                className="text-[#003049] h-5 w-5"
                aria-hidden="true"
              />
            </button>
            <button
              className="bg-[#FFFFFF] flex items-center rounded-lg"
              onClick={() => {
                setController({
                  id: node.data.id,
                  name: node.data.name,
                  grade_id: node.data.grade_id,
                  relation_code: node.data.relation_code,
                  job_id: node.data.job_id,
                  color: node.data.color,
                });
                setEdited(true);
              }}
            >
              <CreateOutlined
                className="text-[#003049] h-5 w-5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  ), [isSelected, data])
  return (
    <>
      <div
        className="py-4 px-4"
        style={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
      >
        <div className="d-flex justify-content-between align-items-center pb-3">
          <div>
            <h2 className="text-lg">
              <b>Structure Organization</b>
            </h2>
            <h6 className="text-[#00000030] text-xs">
              Organizational structure of the company
            </h6>
          </div>
          <div className="flex">
            {/* <button
              style={{
                borderRadius: "7px",
                border: "1px solid #CACACA",
                color: "#003049",
                fontSize: "14px",
                fontWeight: "500",
              }}
              className="ms-3 btn d-flex align-items-center"
              // onClick={() => {
              //   window.location.href = "/admin/organization/ChartStructureOrganization";
              // }}
              type=""
            >
              <TreeStructure className="me-2" size={20} color="#003049" />
              See Chart Soon
            </button> */}
            <FormControlLabel
              value={isSelected}
              control={<Switch color="primary" />}
              label="Edit"
              labelPlacement="start"
              onChange={(val) => {
                setSelected(!isSelected)
              }}
            />
          </div>
        </div>
        <hr></hr>
        <p className="mt-3 py-2 px-3 w-full shadow-md rounded-xl flex justify-between items-center">
            <span className="">{ginfo === null ? 'Input Company Name at General Information' : ginfo.organization_name}</span>
          <button
            className="bg-[#0E5073] hover:bg-[#003049] text-white flex items-center px-2 py-1 rounded-md"
            onClick={() => setModalAdd(true)}
          >
            <AddIcon className="text-white h-5 w-5" aria-hidden="true" /> Add
          </button>
        </p>
        <Tree
          {...required}
          {...handlers}
          horizontalLineStyles={{
            stroke: '#737373',
            strokeWidth: 2,
          }}
          verticalLineStyles={{
            stroke: '#737373',
            strokeWidth: 2,
          }}
          draggable={false}
          depthGap={55}
          gapMode="padding"
          disableLines={false}
          disableHorizontalLines={false}
          disableVerticalLines={false}
          verticalLineTopOffset={-4}
          verticalLineOffset={18}
          renderNode={renderNode}
        />
        {/* <div onClick={() => { }} className="mt-3 py-2 px-3 w-100 border-2 p-2 border-[#00000020] rounded-xl">
                    Organization
                </div> */}
        {/* <ul>
          <li className="">
            <p className="mt-3 py-2 px-3 w-full shadow-md rounded-xl flex justify-between items-center">
              <span className="">Organization</span>
              <button
                className="bg-[#0E5073] hover:bg-[#003049] text-white flex items-center px-2 py-1 rounded-md"
                onClick={() => setModalAdd(true)}
              >
                <AddIcon className="text-white h-5 w-5" aria-hidden="true" />{" "}
                Add
              </button>
            </p>
            <ul className="ml-10">
              <li className="">
                <p className="mt-3 py-2 px-3 w-full shadow-md rounded-xl flex justify-between items-center">
                  <span>CEO</span>
                  {isSelected ? (
                    <div className="flex space-x-3">
                      <button
                        className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                      //   onClick={() => setModalAdd(true)}
                      >
                        <DeleteOutlineOutlined
                          className="text-[#003049] h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                      <button
                        className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                      //   onClick={() => setModalAdd(true)}
                      >
                        <CreateOutlined
                          className="text-[#003049] h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                      <button
                        className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                        onClick={() => setModalAdd(true)}
                      >
                        <AddIcon
                          className="text-[#003049] h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </p>
                <ul className="ml-10">
                  <li className="">
                    <p className="mt-3 py-2 px-3 w-full shadow-md rounded-xl flex justify-between items-center">
                      <span>ADM dan F/T/A</span>
                      {isSelected ? (
                        <div className="flex space-x-3">
                          <button
                            className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                          //   onClick={() => setModalAdd(true)}
                          >
                            <DeleteOutlineOutlined
                              className="text-[#003049] h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                          <button
                            className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                          //   onClick={() => setModalAdd(true)}
                          >
                            <CreateOutlined
                              className="text-[#003049] h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                          <button
                            className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                            onClick={() => setModalAdd(true)}
                          >
                            <AddIcon
                              className="text-[#003049] h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </p>
                    <ul className="ml-10">
                      <li className="">
                        <p className="mt-3 py-2 px-3 w-full shadow-md rounded-xl flex justify-between items-center">
                          <span>HR/GA</span>
                          {isSelected ? (
                            <div className="flex space-x-3">
                              <button
                                className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                              //   onClick={() => setModalAdd(true)}
                              >
                                <DeleteOutlineOutlined
                                  className="text-[#003049] h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                              <button
                                className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                              //   onClick={() => setModalAdd(true)}
                              >
                                <CreateOutlined
                                  className="text-[#003049] h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                              <button
                                className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                                onClick={() => setModalAdd(true)}
                              >
                                <AddIcon
                                  className="text-[#003049] h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          ) : (
                            ""
                          )}
                        </p>
                      </li>
                      <li className="">
                        <p className="mt-3 py-2 px-3 w-full shadow-md rounded-xl flex justify-between items-center">
                          <span>F/T/A</span>
                          {isSelected ? (
                            <div className="flex space-x-3">
                              <button
                                className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                              //   onClick={() => setModalAdd(true)}
                              >
                                <DeleteOutlineOutlined
                                  className="text-[#003049] h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                              <button
                                className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                              //   onClick={() => setModalAdd(true)}
                              >
                                <CreateOutlined
                                  className="text-[#003049] h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                              <button
                                className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                                onClick={() => setModalAdd(true)}
                              >
                                <AddIcon
                                  className="text-[#003049] h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          ) : (
                            ""
                          )}
                        </p>
                      </li>
                    </ul>
                  </li>
                  <li className="">
                    <p className="mt-3 py-2 px-3 w-full shadow-md rounded-xl flex justify-between items-center">
                      <span>BBISDEV/ COMMERCE</span>
                      {isSelected ? (
                        <div className="flex space-x-3">
                          <button
                            className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                          //   onClick={() => setModalAdd(true)}
                          >
                            <DeleteOutlineOutlined
                              className="text-[#003049] h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                          <button
                            className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                          //   onClick={() => setModalAdd(true)}
                          >
                            <CreateOutlined
                              className="text-[#003049] h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                          <button
                            className="bg-[#CEDFEA] hover:bg-[#9EB6C6] flex items-center px-2 py-1 rounded-md"
                            onClick={() => setModalAdd(true)}
                          >
                            <AddIcon
                              className="text-[#003049] h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul> */}
      </div>
      {/* Modal Add */}
      <Modal show={modalAdd} size="lg" onHide={() => setModalAdd(false)}>
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Add Organization Unit
          </Modal.Title>
        </Modal.Header>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            var relation_code = document.getElementById("relation_code").value;
            var color = document.getElementById("color").value;
            var jobGrade = document.getElementById("grade_id").value;
            var name = document.getElementById("name").value;
            var id = document.getElementById("id").value;
            const requestBody = {
              name: name,
              grade_id: jobGrade,
              relation_code: relation_code,
              job_id: id,
              color: color,
            };
            var data = await AddJobPosition(requestBody);
            console.log(data);
            if (data['status'] == 400) {
              alert("Parent tidak ditemukan, harap tambahkan terlebih dahulu");
            } else {
              setId("");
              setModalAdd(false);
              await loadData();
            }
          }}
        >
        <Modal.Body className="mx-4">
          <div className="grid grid-cols-1 gap-3 mt-3">
            <div className="w-full">
              <label className="text-xs">Position Name</label>
              <input
                required
                id="name"
                className="bg-gray-50 appearance-none border rounded w-full text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
              />

            </div>
            <div className="w-full">
              <label className="text-xs">Position ID</label>
              <input
                id="id"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="ID..."
                />
            </div>
            <div className="w-full">
              <label className="text-xs">Job Grade</label>
              <select
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="grade_id"
                >
                <option value="" hidden>Select Job Grade</option>
                {
                  jobgrade.map((val) => {
                    return (
                      <option selected={val?.grade_id == val.id ? true : false} value={val.id}>{val.name}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className="w-full">
              <label className="text-xs">Superior Title / Id</label>
              <select
                required
                id="relation_code"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                <option className="py-3" value="" hidden>
                Select Superior Title / Id
                </option>
                <option className="py-3" value="Select">
                  As Parent
                </option>
                {jobPosition.map((e, i) => {
                  return (
                    <option
                    className="py-3"
                      value={e?.id}
                      >
                      {`${e?.name} | ${e?.job_id}`}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-full">
              <label className="text-xs">Color</label>
              <input
                required
                id="color"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="color"
                value="#ffffff"
                />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="m-4">
          <button
            onClick={() => {
              setModalAdd(false);
              setId("");
            }}
            type="button"
            className="text-[#003049] bg-gray-200 hover:bg-gray-300 font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-gray-200 dark:hover:bg-gray-300 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-white bg-[#0E5073] hover:bg-[#003049] font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-[#0E5073] dark:hover:bg-[#003049] focus:outline-none"
            >
            Add
          </button>
        </Modal.Footer>
        </form>
      </Modal>

      {/* Modal Update */}
      <Modal show={isEdited} size="lg" onHide={() => setEdited(false)}>
        <Modal.Header
          closeButton
          className="mx-4 mt-4"
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Update Organization Unit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="grid grid-cols-1 gap-3 mt-3">
            <div className="w-full">
              <label className="text-xs">Position Name</label>
              <input
                id="name"
                className="bg-gray-50 appearance-none border rounded w-full text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                value={controllerEdited.name}
                onChange={(val) => setController({ ...controllerEdited, name: val.target.value })}
              />

            </div>
            <div className="w-full">
              <label className="text-xs">Job ID</label>
              <input
                id="id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                value={controllerEdited.job_id}
                onChange={(val) => setController({ ...controllerEdited, job_id: val.target.value })}
                placeholder="ID..."
              />
            </div>
            <div className="w-full">
              <label className="text-xs">Job Grade</label>
              <select
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="grade_id"
                onChange={(val) => setController({ ...controllerEdited, grade_id: val.target.value })}
              >
                <option value="" hidden>Select Job Grade</option>
                {
                  jobgrade.map((val) => {
                    return (
                      <option selected={controllerEdited.grade_id == val.id ? true : false} value={val.id}>{val.name}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className="w-full">
              <label className="text-xs">Superior Title / Id</label>
              <select
                required
                id="relation_code"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(val) => setController({ ...controllerEdited, relation_code: val.target.value })}
              >
                <option className="py-3">
                  Select
                </option>
                {jobPosition.map((e, i) => {
                  if (controllerEdited?.id != e?.id) {
                    return (
                      <option
                        className="py-3"
                        value={e?.id}
                        selected={controllerEdited.relation_code == e?.id ? true : false}
                      >
                        {`${e?.name} | ${e?.job_id}`}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <div className="w-full">
              <label className="text-xs">Color</label>
              <input
                id="color"
                value={controllerEdited.color}
                onChange={(val) => setController({ ...controllerEdited, color: val.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="color"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="m-4">
          <button
            onClick={() => {
              setEdited(false);
              setController({});
            }}
            type="button"
            className="text-[#003049] bg-gray-200 hover:bg-gray-300 font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-gray-200 dark:hover:bg-gray-300 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              var data = await UpdateJobPosition(controllerEdited);
              await loadData();
              setEdited(false);
              setController({});
            }}
            type="button"
            className="text-white bg-[#0E5073] hover:bg-[#003049] font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-[#0E5073] dark:hover:bg-[#003049] focus:outline-none"
          >
            Add
          </button>
        </Modal.Footer>
      </Modal>

      <ModalDelete
        close={() => {
          setDelete(false);
        }}
        submit={async () => {
          var del = await DelJobPosition(id);
          console.log(del);
          await loadData();
          SwalSuccess({ message: "Success delete job position" });
          setDelete(false);
        }}
        active={isdelete}
      />
    </>
  );
}

export default StructureOrganization;
