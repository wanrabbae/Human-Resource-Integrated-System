import React from "react";
import { Link } from "react-router-dom";
import bg1 from "../../../Resourse/img/finance-1.png";
import bg2 from "../../../Resourse/img/finance-2.png";
import bg3 from "../../../Resourse/img/finance-3.png";
import bg4 from "../../../Resourse/img/finance-4.png";

function Finance() {
  return (
    <div className="mt-1 px-4 pt-4 pb-56 bg-[#F3F6FF] rounded-lg space-y-10">
      <div>
        <h1 className="text-xl font-semibold">Finance</h1>
        <p className="text-xs font-light">Finance Menu</p>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <Link to="/finance/reimburstment" className="relative hover:brightness-50">
          <img src={bg1} className="brightness-75" />
          <p className="absolute inset-0 top-24 text-center text-white text-xl font-semibold">Reimbrusment</p>
        </Link>
        <Link to="/finance/cash-advance" className="relative hover:brightness-50">
          <img src={bg2} className="brightness-75" />
          <p className="absolute inset-0 top-24 text-center text-white text-xl font-semibold">Cash Advance</p>
        </Link>
        <Link to="/finance/loan" className="relative hover:brightness-50">
          <img src={bg3} className="brightness-75" />
          <p className="absolute inset-0 top-24 text-center text-white text-xl font-semibold">Loan</p>
        </Link>
        <Link to="/finance/finance-setting" className="relative hover:brightness-50">
          <img src={bg4} className="brightness-75" />
          <p className="absolute inset-0 top-24 text-center text-white text-xl font-semibold">Finance Setting</p>
        </Link>
      </div>
    </div>
  );
}

export default Finance;
