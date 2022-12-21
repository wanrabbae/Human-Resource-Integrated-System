import React from "react";
import { Link } from "react-router-dom";
import leave from "../../../Resourse/img/to1.png";
import permission from "../../../Resourse/img/to3.png";
import overtime from "../../../Resourse/img/to2.png";

const TimeOff = () => {
  return (
    <div className="bg-white rounded-xl px-6 py-9 ">
      <div className="flex justify-between">
        <div>
          <h1 className="text-black">Time Off</h1>
          <h1 className="text-xs text-[#737373]">List of Time Off Permission</h1>
        </div>
      </div>
      <div className="mt-10">
        <div className="flex justify-between items-center gap-5">
          <Link to={"/timeManagement/time-off/leave"} className="relative">
            <img
              className="brightness-75 transition-all duration-500 ease-in-out hover:brightness-50"
              src={leave}
            />
            <p className="absolute inset-0 top-32 text-center text-white text-xl font-semibold">
              Leave
            </p>
          </Link>
          <Link to={"/timeManagement/time-off/permission"} className="relative">
            <img
              className="brightness-75 transition-all duration-500 ease-in-out hover:brightness-50"
              src={permission}
            />
            <p className="absolute inset-0 top-32 text-center text-white text-xl font-semibold">
              Permission
            </p>
          </Link>
          <Link to={"/timeManagement/time-off/overtime"} className="relative">
            <img
              className="brightness-75 transition-all duration-500 ease-in-out hover:brightness-50"
              src={overtime}
            />
            <p className="absolute inset-0 top-32 text-center text-white text-xl font-semibold">
              Overtime
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TimeOff;
