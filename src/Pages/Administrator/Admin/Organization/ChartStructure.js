import { Button, FormControlLabel, Switch } from "@mui/material";
import { DeleteOutlineOutlined, CreateOutlined } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { useCallback, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTreeState, treeHandlers } from "react-hyper-tree";
import classNames from "classnames";
import ChevronDown from "react-multiselect-checkboxes/lib/ChevronDown";
import {
  ArrowDown,
  ArrowUp,
  CaretUp,
  CaretDown,
  TreeStructure,
  Export,
} from "phosphor-react";
import { getStructure } from "../../../../Repository/AdminRepository";
import { removeSpace } from "../../../../Constant/utils";
// import { Tree, TreeNode } from "react-organizational-chart";
import OrganizationChart from "@dabeng/react-orgchart";
// import { Tree } from "react-tree-graph";
import Tree from 'react-hierarchy-tree-graph';
import OrgChart from "react-orgchart";
// import Tree from 'react-d3-tree';

function ChartStructure() {
  const [isSelected, setSelected] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [allStruct, setStruct] = useState([]);

  const [data, setData] = useState([]);
  const loadData = async () => {
    var structure = await getStructure();
    var allStructure = await getStructure(1);
    setData(structure);
    setStruct(allStructure);
  };
  useEffect(() => {
    loadData();
  }, []);
  
  console.log(data);
  const data2 = {
    name: "Parent",
    children: [
      {
        name: "Child One",
      },
      {
        name: "Child Two",
      },
    ],
  };

  // const renderNode = useCallback(({
  //   node,
  //   onToggle,
  // }) => (
  //   <div className="tree-node" key={node.data.title}>
  //     <div className="d-flex align-items-center">
  //       <div className="align-center align-items-center">
  //         {
  //           node.data.children.length >= 1 ?
  //             node.options.opened
  //               ?
  //               <button className="p-2.5 bg-[#C1121F] rounded-xl mt-3 mr-3" onClick={onToggle}><CaretUp color="white" size={16} weight="fill" /></button>
  //               : <button className="p-2.5 bg-[#C1121F] rounded-xl mt-3 mr-3" onClick={onToggle}><CaretDown color="white" size={16} weight="fill" /></button> : <div className="px-4"></div>
  //         }
  //       </div>
  //       <div
  //         className="mt-3 py-2.5 px-3 w-full shadow-md rounded-xl flex justify-between items-center"

  //       // className={classnames({
  //       //   'node-content-wrapper': true,
  //       //   'node-selected': node.isSelected(),
  //       // })}
  //       >
  //         <div className="titles">
  //           <div className="node-title">
  //             {node.data.position.name}
  //           </div>
  //         </div>
  //         {node.data.isSelected == true ? (
  //           <div className="flex space-x-3">
  //             <button
  //               className="bg-[#FFFFFF] flex items-center p-2 rounded-lg"
  //             //   onClick={() => setModalAdd(true)}
  //             >
  //               <DeleteOutlineOutlined
  //                 className="text-[#003049] h-5 w-5"
  //                 aria-hidden="true"
  //               />
  //             </button>
  //             <button
  //               className="bg-[#FFFFFF] flex items-center p-2 rounded-lg"
  //             //   onClick={() => setModalAdd(true)}
  //             >
  //               <CreateOutlined
  //                 className="text-[#003049] h-5 w-5"
  //                 aria-hidden="true"
  //               />
  //             </button>
  //           </div>
  //         ) : (
  //           <></>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // ), [])
  const MyNodeComponent = ({node}) => {
    return (
      <div style={{borderRadius:10}} className="p-3">{ node.name }</div>
    );
  };
  return (
    <>
      <div
        className="py-4 px-4"
        style={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
      >
        <div className="d-flex justify-content-between align-items-center pb-3">
          <div>
            <h2 className="text-lg">
              <b>Organizational Structure chart</b>
            </h2>
            <h6 className="text-[#00000030] text-xs">
              Organizational structure chart overview
            </h6>
          </div>
          <div className="flex">
            <button
              style={{
                borderRadius: "10px",
                color: "white",
                fontSize: "14px",
                fontWeight: "500",
              }}
              className="ms-3 bg-[#0E5073] btn d-flex align-items-center"
              onClick={() => {
                // exportExcel();
              }}
              type=""
            >
              <Export className="me-2" size={15} weight="bold" />
              Export
            </button>
          </div>
        </div>
        <hr></hr>
        <div className="mt-2 p-4 bg-[#F3F3F3]" style={{ borderRadius: "5px" }}>
          {/* <OrganizationChart datasource={data} pan={true} zoom={true} /> */}
          <div id="treeWrapper" style={{width: '50em', height: '20em'}}>
            <Tree data={data2} rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf" key={data.id}/>
    
          </div>
          {/* <OrgChart tree={data} NodeComponent={MyNodeComponent}/> */}
          {/* <Tree
            data={data}
            key={data.id}
            height={400}
            width={600}
          /> */}
          {/* {
            data.length > 0 ? (
              data.map((val) => {
                return (
                  <Tree
                  key={val.id}
                  lineWidth={'2px'}
                  lineColor={'green'}
                  lineBorderRadius={'10px'}      
                  label={<div>{val.name}</div>}>
                    {
                      val.children.length > 0 ? (
                        <TreeNode key={val.id} label={<div>{val.name}</div>}>
                          {
                            val.children.length > 0 ? (
                              <TreeNode key={val.id} label={<div>{val.name}</div>}>
                                {
                                  val.children.length > 0 ? (
                                    <TreeNode key={val.id} label={<div>{val.name}</div>}>
                                      {
                                        val.children.length > 0 ? (
                                          <TreeNode key={val.id} label={<div>{val.name}</div>}>
                                            {
                                              val.children.length > 0 ? (
                                                <TreeNode key={val.id} label={<div>{val.name}</div>}>
                                                  {
                                                    val.children.length > 0 ? (
                                                      <TreeNode key={val.id} label={<div>{val.name}</div>}>
                                                        {
                                                          val.children.length > 0 ? (
                                                            <TreeNode key={val.id} label={<div>{val.name}</div>}>
                                                              <TreeNode key={val.id} label={<div>{val.name}</div>} />
                                                            </TreeNode>
                                                          ) : (
                                                            <TreeNode key={val.id} label={<div>{val.name}</div>}/>
                                                          )
                                                        }
                                                      </TreeNode>
                                                    ) : (
                                                      <TreeNode key={val.id} label={<div>{val.name}</div>}/>
                                                    )
                                                  }
                                                </TreeNode>
                                              ) : (
                                                <TreeNode key={val.id} label={<div>{val.name}</div>}/>
                                              )
                                            }
                                          </TreeNode>
                                        ) : (
                                          <TreeNode key={val.id} label={<div>{val.name}</div>}/>
                                        )
                                      }
                                    </TreeNode>
                                  ) : (
                                    <TreeNode key={val.id} label={<div>{val.name}</div>}/>
                                  )
                                }
                              </TreeNode>
                            ) : (
                              <TreeNode key={val.id} label={<div>{val.name}</div>}/>
                            )
                          }
                        </TreeNode>
                      ) : (
                        <TreeNode key={val.id}  label={<div>{val.name}</div>}/>
                      )
                    }
                  </Tree>
                )
              })
            ) : (
              ""
            )
          } */}
        </div>
        {/* <p className="mt-3 py-2 px-3 w-full shadow-md rounded-xl flex justify-between items-center">
          <span className="">PT Ethos Kreatif Indonesia</span>
          <button
            className="bg-[#0E5073] hover:bg-[#003049] text-white flex items-center px-2 py-1 rounded-md"
            onClick={() => setModalAdd(true)}
          >
            <AddIcon className="text-white h-5 w-5" aria-hidden="true" />{" "}
            Add
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
          disableVerticalLines={false}s
          verticalLineTopOffset={-4}
          verticalLineOffset={18}
          renderNode={renderNode}
        /> */}
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
        <Modal.Body className="mx-4">
          <div className="grid grid-cols-1 gap-3 mt-3">
            <div className="w-full">
              <label className="text-xs">Job Position</label>
              <select
                id="job_position"
                className="bg-gray-50 appearance-none border rounded w-full text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
              >
                <option className="py-3" hidden>
                  Select
                </option>
                {allStruct.map((e, i) => {
                  return (
                    <option
                      className="py-3"
                      value={JSON.stringify([e?.id, e?.name])}
                    >
                      {e?.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-full">
              <label className="text-xs">Structure ID</label>
              <input
                id="id"
                readOnly
                value={id}
                onChange={(val) => setId(val.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="ID..."
              />
            </div>
            <div className="w-full">
              <label className="text-xs">Color</label>
              <input
                id="color"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="color"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="m-4">
          <button
            onClick={() => {
              setModalAdd(false);
            }}
            type="button"
            className="text-[#003049] bg-gray-200 hover:bg-gray-300 font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-gray-200 dark:hover:bg-gray-300 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              var getJob = document.getElementById("job_position").value;
              var color = document.getElementById("color").value;
              var jobPos = JSON.parse(getJob);
              const requestBody = {
                position_id: jobPos[0] == 0 ? null : jobPos[0],
                structure_id: id,
                color: color,
              };

              console.log(requestBody);
            }}
            type="button"
            className="text-white bg-[#0E5073] hover:bg-[#003049] font-sm rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-[#0E5073] dark:hover:bg-[#003049] focus:outline-none"
          >
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ChartStructure;
