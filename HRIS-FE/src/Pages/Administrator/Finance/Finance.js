import React from "react";
import { Link } from "react-router-dom";
import bg1 from "../../../Resourse/img/finance-1.png";
import bg2 from "../../../Resourse/img/finance-2.png";
import bg3 from "../../../Resourse/img/finance-3.png";
import bg4 from "../../../Resourse/img/finance-4.png";
import Upcoming from '../../../Resourse/img/Upcoming.png'

function Finance() {
  var data = JSON.parse(window.localStorage.getItem("users"));
  return (
    // <div>
    //   <img src={Upcoming}/>
    // </div>
    <div className="bg-white rounded-xl px-6 py-9 ">
      <div className="flex justify-between">
        <div>
          <h1 className="text-black">Finance</h1>
          <h1 className="text-xs text-[#737373]">Finance Menu</h1>
        </div>
      </div>
      <div className="mt-10">
        <div className="flex justify-between items-center gap-5">
          <Link to={"/finance/reimburstment"} className="relative">
            <img
              className="brightness-75 transition-all duration-500 ease-in-out hover:brightness-50"
              src={bg1}
            />
            <p className="absolute inset-0 top-32 text-center text-white text-xl font-semibold">
              Reimbursment
            </p>
          </Link>
          <Link to={"/finance/cash-advance"} className="relative">
            <img
              className="brightness-75 transition-all duration-500 ease-in-out hover:brightness-50"
              src={bg2}
            />
            <p className="absolute inset-0 top-32 text-center text-white text-xl font-semibold">
              Cash Advance
            </p>
          </Link>
          <Link to={"/finance/loan"} className="relative">
            <img
              className="brightness-75 transition-all duration-500 ease-in-out hover:brightness-50"
              src={bg3}
            />
            <p className="absolute inset-0 top-32 text-center text-white text-xl font-semibold">
              Loan
            </p>
          </Link>
          {data?.role == "admin"  || data?.role == "subsdiary" || data?.role == "subadmin" ? (
            <Link to={"/finance/finance-setting"} className="relative">
              <img
                className="brightness-75 transition-all duration-500 ease-in-out hover:brightness-50"
                src={bg4}
              />
              <p className="absolute inset-0 top-32 text-center text-white text-xl font-semibold">
                Finance Setting
              </p>
            </Link>
           ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Finance;
