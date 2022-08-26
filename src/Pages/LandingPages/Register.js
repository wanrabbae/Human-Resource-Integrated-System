import React from "react";
import bg from "../../Resourse/img/bg-register.png";
import logo from "../../Resourse/img/logo.png";

function Register() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 h-screen">
      <div className="col-span-7 bg-[#ECEEF6] flex flex-col">
        <div className="self-center flex flex-row gap-3 items-center mt-10 z-40 p-10">
          <img src={logo} />
          <h1 className="text-[#003049] font-bold text-3xl">
            HUMAN RESOURCES
            <br />
            INTEGRATED SYSTEM
          </h1>
        </div>
        <div className="hidden md:block">
          <img src={bg} className="absolute bottom-0 left-0 h-3/4" />
        </div>
      </div>
      <div className="col-span-5 p-10 md:overflow-y-auto">
        <h1 className="text-3xl font-semibold">Create New Account</h1>
        <p className="text-sm text-gray-300">
          Already have an Account?{" "}
          <a href="/" className="text-blue-400">
            Login
          </a>
        </p>
        <form>
          <div className="space-y-3 mt-3">
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Full name
              </label>
              <input
                type="text"
                className="w-full rounded-lg border-[#780000] focus:ring-[#780000] focus:border-[#780000] text-sm"
                placeholder="enter your name..."
              ></input>
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Username
              </label>
              <input
                type="text"
                className="w-full rounded-lg border-[#780000] focus:ring-[#780000] focus:border-[#780000] text-sm"
                placeholder="enter your username..."
              ></input>
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-lg border-[#780000] focus:ring-[#780000] focus:border-[#780000] text-sm"
                placeholder="enter your email..."
              ></input>
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Phone Number
              </label>
              <input
                type="text"
                className="w-full rounded-lg border-[#780000] focus:ring-[#780000] focus:border-[#780000] text-sm"
                placeholder="enter your phone number..."
              ></input>
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded-lg border-[#780000] focus:ring-[#780000] focus:border-[#780000] text-sm"
                placeholder="enter your password..."
              ></input>
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Confirm Password
              </label>
              <input
                type="text"
                className="w-full rounded-lg border-[#780000] focus:ring-[#780000] focus:border-[#780000] text-sm"
                placeholder="re-enter your password..."
              ></input>
            </div>
            <a
              href="/dashboard"
              className="ms-auto mt-4 bg-[#0E5073] block py-2 px-3 text-center text-white rounded-lg w-fit hover:bg-[#003049] md:border-0 md:hover:text-white md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
