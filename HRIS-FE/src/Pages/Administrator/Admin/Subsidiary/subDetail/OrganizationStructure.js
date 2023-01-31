import { Button, FormControlLabel, Switch } from "@mui/material";
import { DeleteOutlineOutlined, CreateOutlined } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { useCallback, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Tree, { useTreeState, treeHandlers } from "react-hyper-tree";
import classNames from "classnames";
import ChevronDown from "react-multiselect-checkboxes/lib/ChevronDown";
import { ArrowDown, ArrowUp, CaretUp, CaretDown, TreeStructure } from "phosphor-react";
import { GetInfo, GetJobGrade, GetJobPosition, getStructure } from "../../../../../Repository/AdminRepository";

function OrganizationStructure() {
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
          <div className="titles">
            <div className="node-title">
              {isSelected == true ? `${node.data.name} ${node.data.structure_id}` : node.data.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  ), [isSelected, data])
  return (
    <>
      <div
        className="py-4 px-4 rounded-xl"
        style={{ backgroundColor: "#FFFFFF", boxShadow:'0px 0px 3px rgba(0, 0, 0, 0.25)'}}
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
            {/* <FormControlLabel
              value={isSelected}
              control={<Switch color="primary" />}
              label="Edit"
              labelPlacement="start"
              onChange={(val) => {
                setSelected(!isSelected)
              }}
            /> */}
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
    </>
  );
}

export default OrganizationStructure;
