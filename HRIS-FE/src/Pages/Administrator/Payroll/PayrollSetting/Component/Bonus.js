import {
  EditOutlined,
  ImportExport,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { PencilSimple, Plus, Trash, X } from "phosphor-react";
import {
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { ModalDelete, SwalSuccess } from "../../../../../Components/Modals";
import Select from "react-select";
import { GetEmployeeName } from "../../../../../Repository/EmployeeRepository";
import {
  GetJobGrade,
  GetJobLevel,
  GetJobPosition,
  GetJobTittle,
} from "../../../../../Repository/AdminRepository";
import {
    AddPayrollBonus,
  DeletePayrollBonus,
  GetPayrolComponent,
  GetPayrollBonus,
} from "../../../../../Repository/PayrollRepository";

function Bonus() {
  const [isdelete, setDelete] = useState(false);
  const [addbonus, setAddbonus] = useState(false);
  const [editbonus, setEditbonus] = useState(false);
  const [isEmp, setEmp] = useState(false);
  const [isFilter, setFilter] = useState(false);
  const [pBonus, setPbonus] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [jposi, setJobPosi] = useState([]);
  const [jgrade, setJobGrade] = useState([]);
  const [jlevel, setJobLevel] = useState([]);
  const [jtitle, setJobtitle] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [allPages, setAllPages] = useState([]);
  const [delid, setdelId] = useState([]);
  const [selected, setSelected] = useState([]);
  const [editval, setEditval] = useState([]);
  
  const [byemp, setByemp] = useState([]);
  const [bname, setBname] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const jgradeoption = [];
  const jlevoption = [];
  const jtitoption = [];
  const jposoption = [];
  const employe = [];
  const inAwait = async () => {
    var data = await GetPayrollBonus({ page: 1, size: 10 });
    setPbonus(data?.data?.requests);
    console.log(pBonus);
    setTotalItems(data?.data?.totalItems);
    setTotalPage(data?.data?.totalPages);
    var pageList = [];
    for (let i = 1; i <= data?.data?.totalPages; i++) {
      pageList.push(i);
    }
    setAllPages(pageList);

    var emp = await GetEmployeeName();
    emp.map((em) => employe.push({ value: em.id, label: em.firstName }));
    setEmployee(employe);
    var jgra = await GetJobGrade();
    jgra.map((em) => jgradeoption.push({ value: em.id, label: em.name }));
    setJobGrade(jgradeoption);
    var jlev = await GetJobLevel();
    jlev.map((em) => jlevoption.push({ value: em.id, label: em.name }));
    setJobLevel(jlevoption);
    var jtit = await GetJobTittle();
    jtit.map((em) => jtitoption.push({ value: em.id, label: em.name }));
    setJobtitle(jtitoption);
    var jpos = await GetJobPosition();
    jpos?.result.map((em) => jposoption.push({ value: em.id, label: em.name }));
    setJobPosi(jposoption);
  };
  useEffect(() => {
    inAwait();
  }, []);

  const previousPage = async () => {
    setCurrentPage((current) => current - 1);
    if (currentPage == 1) {
      setCurrentPage(1);
    }
    var data = await GetPayrollBonus({ page: currentPage, size: 10 });
    setPbonus(data?.data?.requests);
  };

  const nextPage = async () => {
    setCurrentPage((current) => current + 1);
    if (currentPage == totalPage) {
      setCurrentPage(1);
    }
    var data = await GetPayrollBonus({ page: currentPage, size: 10 });
    setPbonus(data?.data?.requests);
  };

  const changePage = async (value) => {
    var data = await GetPayrollBonus({ page: value, size: 10 });
    setPbonus(data?.data?.requests);
  };

  return (
    <>
      <div
        className='my-4 w-100 rounded-xl'
        style={{
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className='p-4'>
          <div className='flex justify-between items-center align-center'>
            <div className='flex items-center align-center '>
              <div>
                <h5>
                  <b>Bonus</b>
                </h5>
              </div>
            </div>
            <button
              style={{
                borderRadius: "10px",
                backgroundColor: "#0E5073",
                fontSize: "14px",
                fontWeight: "500",
              }}
              className='btn d-flex align-items-center text-white'
              onClick={() => {
                setAddbonus(!addbonus);
              }}
              type=''
            >
              <Plus size={15} className='me-2' weight='bold' />
              Add
            </button>
          </div>
          <br></br>
          <br></br>
          <Table
            borderless
            responsive
            style={{ color: "#00000070", fontSize: "0.75rem" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#EBF7FF" }}>
                <th onClick={() => {}}>
                  Bonus <ImportExport fontSize='2px' />
                </th>
                <th onClick={() => {}}>
                  Amount <ImportExport fontSize='2px' />
                </th>
                <th onClick={() => {}}>
                  Submitted To <ImportExport fontSize='2px' />
                </th>
                <th onClick={() => {}}>
                  Action
                  <ImportExport fontSize='2px' />
                </th>
              </tr>
            </thead>
            <tbody>
              {pBonus.length > 0 ? (
                pBonus.map((x) => {
                  return (
                    <tr>
                      <td className='align-middle'>{x.name}</td>
                      <td className='align-middle'>{x.amount}</td>
                      <td className='align-middle text-[#219EBC]'>
                        {x.delegated_to}
                      </td>
                      <td className='align-middle'>
                        <div className='flex flex-row gap-2'>
                          <button
                            className='bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg'
                            onClick={() => {
                                setEditval(x);
                                console.log(editval)
                              setEditbonus(true);
                            }}
                          >
                            <PencilSimple
                              color='#003049'
                              className='h-5 w-5'
                              weight='bold'
                              aria-hidden='true'
                            />
                          </button>
                          <button
                            className='bg-[#CEDFEA] hover:bg-[#669BBC] p-2 rounded-lg'
                            onClick={() => {
                              setdelId(x.id);
                              setDelete(true);
                            }}
                          >
                            <Trash
                              color='#003049'
                              weight='bold'
                              className='h-5 w-5'
                              aria-hidden='true'
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className='text-center'>
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <div className='bg-[#FBFBFB] mt-0 px-4 py-2 rounded-b-xl d-flex align-items-center justify-between '>
          <div>
            <h1 className='text-[10px] text-[#A098AE]'>
              Showing <span>{pBonus.length} </span>
              from <span> {totalItems} </span>data
            </h1>
          </div>
          <div className='flex items-center gap-2'>
            <button className='btn btn-sm' onClick={() => previousPage()}>
              <KeyboardArrowLeft />
            </button>
            {/* <button className="bg-[#780000] bg-opacity-10 rounded-md w-6 h-6 flex items-center justify-center text-[10px] text-[#780000]">
                        1
                    </button>
                    <button className="bg-[#780000] rounded-md w-6 h-6 flex items-center justify-center text-[10px] text-white">
                        2
                    </button>
                    <button className="bg-[#780000] bg-opacity-10 rounded-md w-6 h-6 flex items-center justify-center text-[10px] text-[#780000]">
                        3
                    </button> */}
            {allPages.map((page) => (
              <button
                onClick={() => changePage(page)}
                className='bg-[#780000] bg-opacity-10 rounded-md w-6 h-6 flex items-center justify-center text-[10px] text-[#780000]'
              >
                {page}
              </button>
            ))}
            <button className='btn btn-sm' onClick={() => nextPage()}>
              <KeyboardArrowRight />
            </button>
          </div>
        </div>
      </div>
      <Modal show={addbonus} size='lg' onHide={() => setAddbonus(!addbonus)}>
        <Modal.Header
          closeButton
          className='m-4'
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title>Add Bonus</Modal.Title>
        </Modal.Header>
        <form
            onSubmit={async(e) => {
                e.preventDefault();

                // let delget = byemp;
                // for (let i = 0; i < delget.length; i++) {
                //   delget[i]["delegated_to"] = JSON.stringify(
                //     delget[i]["delegated_to"]
                //   );
                //   // _incomes[i]["delegated_to"] = JSON.parse(
                //   //   _incomes[i]["delegated_to"]
                //   // );
                // }
                var requestbody = {
                    name : bname,
                    amount : amount,
                    status : status,
                    delegated_to : byemp
                }
                var dat = JSON.stringify(requestbody);
                console.log(requestbody);
                var add = await AddPayrollBonus(dat);
                // var add = await AddPayrollBonus(requestbody);
                console.log(add)
                setByemp([])
                setEmp(false);
                setFilter(false);
                inAwait();
                setAddbonus(!addbonus);

            }}
        >
          <Modal.Body className='mx-4'>
            <div className='row'>
              <div className='col-md-12 mb-3'>
                <div className='form-group'>
                  <label className='mb-1'>
                    Bonus Name<span className='text-danger'>*</span>
                  </label>
                  <input
                    className='form-control'
                    id='name'
                    required
                    placeholder='Income name...'
                    onChange={(e) => setBname(e.target.value)}
                  />
                </div>
              </div>
              <div className='col-md-12 mb-3'>
                <div className='form-group'>
                  <label className='mb-1'>
                    Amount <span className='text-danger'>*</span>
                  </label>
                  <input
                    className='form-control'
                    id='name'
                    required
                    placeholder='Nominal or Persentage'
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className='col-md-12 mb-3'>
                <div className='form-group'>
                  <FormControl
                    sx={{
                      width: "100%",
                    }}
                  >
                    <RadioGroup
                      aria-labelledby='demo-controlled-radio-buttons-group'
                      name='controlled-radio-buttons-group'
                    >
                      <FormControlLabel
                        value='All Employee'
                        control={<Radio />}
                        label='All Employee'
                        onChange={async (e) => {
                          setStatus("all")
                          setByemp(null)
                          setEmp(false);
                          setFilter(false);
                        }}
                      />
                      <FormControlLabel
                        value='Search by Employee'
                        control={<Radio />}
                        label='Search by Employee'
                        checked={isEmp}
                        onChange={async (e) => {
                            setStatus("employees")
                          setEmp(true);
                          setFilter(false);
                          setByemp([])
                        }}
                      />
                      <div
                        required={isEmp}
                        style={{
                          display: isEmp ? "block" : !isEmp ? "none" : "none",
                        }}
                      >
                        <Select
                            options={employee}
                            isMulti
                            onChange={(e) => {
                                var data = [];
                                for (var i in e) {
                                data.push(String(e[i].value));
                                }
                                setByemp(data);
                                console.log(byemp)
                            }}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            // components={{
                            //   Option,
                            // }}
                        />
                      </div>
                      <FormControlLabel
                        value='Select Filter'
                        control={<Radio />}
                        label='Select Filter'
                        checked={isFilter}
                        onChange={async (e) => {
                            setStatus(e.target.value)
                          setEmp(false);
                          setFilter(true);
                          setByemp([
                            {
                              name: "Job Grade",
                              data: [],
                            },
                            {
                              name: "Job Level",
                              data: [],
                            },
                            {
                              name: "Job Position",
                              data: [],
                            },
                          ]);
                        }}
                      />
                      <div
                        className='grid gap-3'
                        style={{
                          display: isFilter
                            ? "grid"
                            : !isFilter
                            ? "none"
                            : "none",
                        }}
                      >
                        <div className=''>
                          <label
                            className='block text-gray-700 text-sm mb-2'
                            for='username'
                          >
                            Job Grade
                          </label>
                          <Select
                            options={jgrade}
                            isMulti
                            onChange={(e) => {
                              var data = [];
                                for (var i in e) {
                                data.push(String(e[i].value));
                                }
                              byemp[0]["data"] = data;
                              setByemp(byemp);
                              console.log(byemp)
                            }}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                          />
                        </div>
                        <div className=''>
                          <label
                            className='block text-gray-700 text-sm mb-2'
                            for='username'
                          >
                            Job Level
                          </label>
                          <Select
                            options={jlevel}
                            isMulti
                            onChange={(e) => {
                              var data = [];
                                for (var i in e) {
                                data.push(String(e[i].value));
                                }
                              byemp[1]["data"] = data;
                              setByemp(byemp);
                              console.log(byemp)
                            }}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                          />
                        </div>
                        {/* <div className=''>
                          <label
                            className='block text-gray-700 text-sm mb-2'
                            for='username'
                          >
                            Job Title
                          </label>
                          <Select
                            options={jtitle}
                            isMulti
                            // onChange={(e) => {
                            //     var data = [];
                            //     for (var i in e) {
                            //     data.push(parseInt(e[i].value));
                            //     }
                            //     setShowTo(data);
                            // }}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                          />
                        </div> */}
                        <div className=''>
                          <label
                            className='block text-gray-700 text-sm mb-2'
                            for='username'
                          >
                            Job Postition
                          </label>
                          <Select
                            options={jposi}
                            isMulti
                            onChange={(e) => {
                              var data = [];
                                for (var i in e) {
                                data.push(String(e[i].value));
                                }
                              byemp[2]["data"] = data;
                              setByemp(byemp);
                              console.log(byemp)
                            }}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                          />
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className='m-4'>
            <button
              className='btn'
              style={{
                backgroundColor: "#00000010",
                border: "1px solid transparent",
                color: "#0E5073",
                width: "100px",
              }}
              type='button'
              onClick={() => setAddbonus(!addbonus)}
            >
              Cancel
            </button>
            <button
              className='btn'
              style={{
                backgroundColor: "#0E5073",
                border: "1px solid transparent",
                color: "#FFFFFF",
                width: "100px",
              }}
              type='submit'
            >
              Add
            </button>
          </Modal.Footer>
        </form>
      </Modal>
      <Modal show={editbonus} size='lg' onHide={() => setEditbonus(!editbonus)}>
        <Modal.Header
          closeButton
          className='m-4'
          style={{ borderBottomColor: "transparent" }}
        >
          <Modal.Title>Edit Bonus</Modal.Title>
        </Modal.Header>
        <form
            onSubmit={async(e) => {
                e.preventDefault();

                var requestbody = {
                    name : bname,
                    amount : amount,
                    status : status,
                    delegated_to : byemp
                }
                // console.log(requestbody);
                var dat = JSON.stringify(requestbody);
                var add = await AddPayrollBonus(dat);
                await inAwait();
                setAddbonus(!addbonus);

            }}
        >
          <Modal.Body className='mx-4'>
            <div className='row'>
              <div className='col-md-12 mb-3'>
                <div className='form-group'>
                  <label className='mb-1'>
                    Bonus Name<span className='text-danger'>*</span>
                  </label>
                  <input
                    className='form-control'
                    id='name'
                    required
                    value={editval.name}
                    placeholder='Income name...'
                    onChange={(e) => setBname(e.target.value)}
                  />
                </div>
              </div>
              <div className='col-md-12 mb-3'>
                <div className='form-group'>
                  <label className='mb-1'>
                    Amount <span className='text-danger'>*</span>
                  </label>
                  <input
                    className='form-control'
                    id='name'
                    required
                    value={editval.amount}
                    placeholder='Nominal or Persentage'
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className='col-md-12 mb-3'>
                <div className='form-group'>
                  <FormControl
                    sx={{
                      width: "100%",
                    }}
                  >
                    <RadioGroup
                      aria-labelledby='demo-controlled-radio-buttons-group'
                      name='controlled-radio-buttons-group'
                    >
                      <FormControlLabel
                        value='All Employee'
                        control={<Radio />}
                        label='All Employee'
                        checked={editval.status == "all"}
                        onChange={async (e) => {
                          setStatus(e.target.value)
                          setByemp(e.target.value)
                          setEmp(false);
                          setFilter(false);
                        }}
                      />
                      <FormControlLabel
                        value='Search by Employee'
                        control={<Radio />}
                        label='Search by Employee'
                        checked={ editval.status ? "employees" == isEmp : !isEmp}
                        onChange={async (e) => {
                            setStatus(e.target.value)
                          setEmp(true);
                          setFilter(false);
                        }}
                      />
                      <div
                        required={isEmp}
                        style={{
                          display: isEmp ? "block" : !isEmp ? "none" : "none",
                        }}
                      >
                        <Select
                            options={employee}
                            isMulti
                            defaultValue={editval.delegated_to}
                            onChange={(e) => {
                                var data = [];
                                for (var i in e) {
                                data.push(parseInt(e[i].value));
                                }
                                setByemp(data);
                                console.log(byemp)
                            }}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            // components={{
                            //   Option,
                            // }}
                        />
                      </div>
                      <FormControlLabel
                        value='Select Filter'
                        control={<Radio />}
                        label='Select Filter'
                        checked={isFilter}
                        onChange={async (e) => {
                            setStatus(e.target.value)
                          setEmp(false);
                          setFilter(true);
                          setByemp([
                            {
                              name: "Job Grade",
                              data: [],
                            },
                            {
                              name: "Job Level",
                              data: [],
                            },
                            {
                              name: "Job Position",
                              data: [],
                            },
                          ]);
                        }}
                      />
                      <div
                        className='grid gap-3'
                        style={{
                          display: isFilter
                            ? "grid"
                            : !isFilter
                            ? "none"
                            : "none",
                        }}
                      >
                        <div className=''>
                          <label
                            className='block text-gray-700 text-sm mb-2'
                            for='username'
                          >
                            Job Grade
                          </label>
                          <Select
                            options={jgrade}
                            isMulti
                            value={isFilter == false ? [] : byemp[0]["data"]}
                            onChange={(e) => {
                              var data = [];
                                for (var i in e) {
                                data.push(String(e[i].value));
                                }
                              byemp[0]["data"] = data;
                              setByemp(byemp);
                              console.log(byemp)
                            }}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                          />
                        </div>
                        <div className=''>
                          <label
                            className='block text-gray-700 text-sm mb-2'
                            for='username'
                          >
                            Job Level
                          </label>
                          <Select
                            options={jlevel}
                            isMulti
                            value={isFilter == false ? [] : byemp[1]["data"]}
                            onChange={(e) => {
                              var data = [];
                                for (var i in e) {
                                data.push(String(e[i].value));
                                }
                              byemp[1]["data"] = data;
                              setByemp(byemp);
                              console.log(byemp)
                            }}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                          />
                        </div>
                        {/* <div className=''>
                          <label
                            className='block text-gray-700 text-sm mb-2'
                            for='username'
                          >
                            Job Title
                          </label>
                          <Select
                            options={jtitle}
                            isMulti
                            // onChange={(e) => {
                            //     var data = [];
                            //     for (var i in e) {
                            //     data.push(parseInt(e[i].value));
                            //     }
                            //     setShowTo(data);
                            // }}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                          />
                        </div> */}
                        <div className=''>
                          <label
                            className='block text-gray-700 text-sm mb-2'
                            for='username'
                          >
                            Job Postition
                          </label>
                          <Select
                            options={jposi}
                            isMulti
                            value={isFilter == false ? [] : byemp[2]["data"]}
                            onChange={(e) => {
                              var data = [];
                                for (var i in e) {
                                data.push(String(e[i].value));
                                }
                              byemp[2]["data"] = data;
                              setByemp(byemp);
                              console.log(byemp)
                            }}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                          />
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className='m-4'>
            <button
              className='btn'
              style={{
                backgroundColor: "#00000010",
                border: "1px solid transparent",
                color: "#0E5073",
                width: "100px",
              }}
              type='button'
              onClick={() => setEditbonus(!editbonus)}
            >
              Cancel
            </button>
            <button
              className='btn'
              style={{
                backgroundColor: "#0E5073",
                border: "1px solid transparent",
                color: "#FFFFFF",
                width: "100px",
              }}
              type='submit'
            >
              Save
            </button>
          </Modal.Footer>
        </form>
      </Modal>
      <ModalDelete
        close={() => {
          setDelete(false);
        }}
        submit={async () => {
          setDelete(false);
          await DeletePayrollBonus(delid);
          await inAwait();
        }}
        active={isdelete}
      />
    </>
  );
}

export default Bonus;
