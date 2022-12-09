import {
  AccessTimeFilled,
  Add,
  CheckCircle,
  DeleteOutline,
  EditOutlined,
  ImportExport,
  VisibilityOutlined,
} from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button } from "@mui/material";
import { red, teal, yellow } from "@mui/material/colors";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import React, { useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { TextFieldSearch } from "../../../Components/TextField";

function DetailLoan() {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  return (
    <>
      <div className="w-100 bg-[#FFFFFF] p-4 rounded-t-xl">
        <h2 className="text-lg">
          <b>Dona Adiloviana</b>
        </h2>
        <br></br>
        <div className="space-y-3 mb-3">
          <div>
            <h3>Loan Name</h3>
            <p className="text-gray-400">Keperluan pribadi</p>
          </div>
          <div className="flex gap-5">
            <div>
              <h3>Loan Date</h3>
              <p className="text-gray-400">15/01/2021</p>
            </div>
            <div>
              <h3>Expired Date</h3>
              <p className="text-gray-400">15/01/2022</p>
            </div>
          </div>
        </div>
        <Table borderless responsive style={{ color: "#00000070" }}>
          <thead>
            <tr style={{ backgroundColor: "#EBF7FF" }}>
              {/* <th width="10px">
                <input type="checkbox" style={{ borderRadius: "2px" }} />
              </th> */}
              <th onClick={() => {}} style={{ minWidth: "10em" }}>
                Installment <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}} style={{ minWidth: "10em" }}>
                Payment Date <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}} style={{ minWidth: "10em" }}>
                Payment <ImportExport fontSize="2px" />
              </th>
              <th onClick={() => {}} style={{ minWidth: "11em" }}>
                Remaining Payment <ImportExport fontSize="2px" />
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {dataAttendance.length > 0 ? (
          dataAttendance.map((value, index) => ( */}
            <tr>
              {/* <td className="align-middle">
                <input type="checkbox" style={{ borderRadius: "2px" }} />
              </td> */}
              <td className="align-middle">1</td>
              <td className="align-middle">15 Feb 2022</td>
              <td className="align-middle">Rp. 530.000</td>
              <td className="align-middle">Rp. 5.324.000</td>
            </tr>
            <tr>
              {/* <td className="align-middle">
                <input type="checkbox" style={{ borderRadius: "2px" }} />
              </td> */}
              <td className="align-middle">2</td>
              <td className="align-middle">15 Mar 2022</td>
              <td className="align-middle">Rp. 530.000</td>
              <td className="align-middle">Rp. 5.324.000</td>
            </tr>
            <tr>
              {/* <td className="align-middle">
                <input type="checkbox" style={{ borderRadius: "2px" }} />
              </td> */}
              <td className="align-middle">3</td>
              <td className="align-middle">15 Apr 2022</td>
              <td className="align-middle">Rp. 530.000</td>
              <td className="align-middle">Rp. 5.324.000</td>
            </tr>
            {/* ))
        ) : (
          <tr>
            <td colSpan={8}>
              <div className="d-flex justify-content-center align-middle text-center">
                No Data
              </div>
            </td>
          </tr>
        )} */}
          </tbody>
        </Table>
      </div>
      <div className="bg-[#FBFBFB] mt-0 px-4 py-3 rounded-b-xl d-flex align-items-center justify-content-between ">
        <div>
          <h6 className="text-[#A098AE]">
            Showing <span className="text-[#0E5073]">1-5</span> from{" "}
            <span className="text-[#0E5073]">100</span> data
          </h6>
        </div>
        <div>
          <button className="btn btn-sm">
            <ArrowLeft />
          </button>
          <button className="btn mx-2 bg-[#78000010] rounded-md text-[#780000]">
            1
          </button>
          <button className="btn bg-[#780000] rounded-md text-[#FFFFFF]">
            2
          </button>
          <button className="btn mx-2 bg-[#78000010] rounded-md text-[#780000]">
            3
          </button>
          <button className="btn btn-sm">
            <ArrowRight />
          </button>
        </div>
      </div>
    </>
  );
}

export default DetailLoan;
