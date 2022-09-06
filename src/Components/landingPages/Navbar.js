import { Button } from "flowbite-react";
import { React, useEffect, useState } from "react";
import { Alert, Modal, Table } from "react-bootstrap";
import { PostLogin } from "../../Repository/AuthRepository";
import logo from "../../Resourse/img/logo.png";
import pw from "../../Resourse/img/pw.png";
import { LoadingDialog } from "../Modals";

function Navbar() {
  const [modalLogin, setModalLogin] = useState(false);
  const [modalPW, setModalPW] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const pathname = window.location.pathname

  useEffect(() => {
    if (window.localStorage.getItem("users") != null) {
      window.location.href = "/dashboard";
    };
  }, []);
  return (
    <>
      <nav className="bg-white shadow-md px-2 sm:px-4 py-1 rounded dark:bg-gray-900">
        <div className="flex flex-wrap justify-between mx-5">
          <a href="#" className="flex items-center">
            {/* <img
        src="https://flowbite.com/docs/images/logo.svg"
        className="mr-3 h-6 sm:h-9"
        alt="Flowbite Logo"
      /> */}
            <span className="bg-[#780000] px-5 py-1.5 text-white self-center text-sm font-semibold whitespace-nowrap dark:text-white">
              HRIS
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <div className="flex gap-20">
              <ul className="flex flex-col p-2 mt-2 bg-gray-50 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  { pathname === '/' ? 
                    <a
                      href="/"
                      className="block py-2 pr-4 pl-3 text-gray-700 rounded bg-red-500 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      aria-current="page"
                    >
                      Home
                    </a>
                  :
                    <a
                      href="/"
                      className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      aria-current="page"
                    >
                      Home
                    </a>
                  
                  }
                </li>
                <li>
                  <a
                    href="/feature"
                    className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="/pricing"
                    className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
              <ul className="flex flex-col p-2 mt-2 bg-gray-50 rounded-lg md:flex-row md:space-x-4 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a
                    href="#"
                    className="block py-2  text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    aria-current="page"
                    onClick={() => setModalLogin(true)}
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="bg-[#0E5073] block py-2 px-3 text-white rounded-full hover:bg-[#003049] md:border-0 md:hover:text-white md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Get Started
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* start:modal login */}
      <Modal show={modalLogin} size="md" onHide={() => setModalLogin(false)}>
        <Modal.Body className="flex flex-col gap-3 m-4">
          <Alert show={message != null ? true : false} variant="danger" onClose={() => { setMessage(null) }} dismissible>
            {message}
          </Alert>
          <div className="self-center">
            <img src={logo} className="" />
          </div>
          <h1 className="text-xl text-center">Welcome Back!!</h1>
          <input
            type="text"
            className="w-full rounded-lg border-[#780000] focus:ring-[#780000] focus:border-[#780000] text-sm"
            id="username"
            placeholder="Username"
          ></input>
          <input
            type="password"
            className="w-full rounded-lg border-[#780000] focus:ring-[#780000] focus:border-[#780000] text-sm"
            id="password"
            placeholder="Password"
          ></input>
          <a
            href="#"
            className="self-end text-[#33596D] hover:text-[#2D4D5F] text-sm"
            onClick={() => setModalPW(true)}
          >
            Forgot Password?
          </a>
          <button
            onClick={async () => {
              var requestBody = {
                username: document.getElementById('username').value,
                password: document.getElementById("password").value,
              };
              setModalLogin(false);
              setLoading(true);
              var data = await PostLogin(requestBody);
              setLoading(false);
              setModalLogin(true);
              if (data['message'] != "Success") {
                setMessage("Wrong username or password");
              } else {
                var toJson = JSON.stringify(data['data']);
                window.localStorage.setItem("users", toJson);
                window.location.href = "/dashboard";
              }
            }}
            className="bg-[#0E5073] block py-2 px-3 text-center text-white rounded-full hover:bg-[#003049] md:border-0 md:hover:text-white md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Login
          </button>
          <p className="text-xs text-gray-400">
            Don’t have an account?{" "}
            <a
              href="#"
              className="text-[#003049] hover:text-[#001A27] font-semibold"
            >
              Sign Up
            </a>
          </p>
        </Modal.Body>
      </Modal>
      {/* end:modal login */}
      {/* start:modal forgot password */}
      <Modal show={modalPW} size="md" onHide={() => setModalPW(false)}>
        <Modal.Body className="flex flex-col gap-3 m-4">
          <div className="self-center">
            <img src={pw} className="" />
          </div>
          <div>
            <h1 className="text-xl text-center">Forgot Password?</h1>
            <p className="text-sm text-center text-gray-400">
              No worries, we’ll send you reset instructions
            </p>
          </div>
          <div className="space-y-2">
            <label>Email</label>
            <input
              type="text"
              className="w-full rounded-lg border-[#780000] focus:ring-[#780000] focus:border-[#780000] text-sm"
              placeholder="Username"
            ></input>
          </div>
          <a
            href="#"
            className="bg-[#0E5073] block py-2 px-3 text-center text-white rounded-full hover:bg-[#003049] md:border-0 md:hover:text-white md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Send
          </a>
          <a
            href="#"
            className="self-center text-[#33596D] hover:text-[#2D4D5F] text-sm"
            onClick={() => setModalPW(false)}
          >
            Back to login
          </a>
        </Modal.Body>
      </Modal>
      {/* end:modal forgot password */}
      <LoadingDialog active={isLoading} />
    </>
  );
}

export default Navbar;
