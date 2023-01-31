import { Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { Alert, Modal, Table } from "react-bootstrap";
import { PostLogin } from "../../Repository/AuthRepository";
import logo from "../../Resourse/img/logo-humanusia.png";
import pw from "../../Resourse/img/pw.png";
import { LoadingDialog } from "../Modals";
import lg from "../../Resourse/img/logo-humanusia.png";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function Navbar() {
  const [modalLogin, setModalLogin] = useState(false);
  const navigate = useNavigate();
  const [modalPW, setModalPW] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const pathname = window.location.pathname;

  useEffect(() => {
    if (window.localStorage.getItem("users") != null) {
      navigate("/dashboard");
    }
  }, []);
  const [state, setState] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ul className="flex flex-col p-2 mt-2 bg-gray-50 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          {pathname === "/" ? (
            <a
              href="/"
              className="block py-2 pr-4 pl-3 text-[#003049] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              aria-current="page"
            >
              Home
            </a>
          ) : (
            <a
              href="/"
              className="block py-2 pr-4 pl-3 text-[#A8A8A8] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              aria-current="page"
            >
              Home
            </a>
          )}
        </li>
        <li>
          {pathname === "/features" ? (
            <a
              href="/feature"
              className="block py-2 pr-4 pl-3 text-[#003049] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              aria-current="page"
            >
              Features
            </a>
          ) : (
            <a
              href="/feature"
              className="block py-2 pr-4 pl-3 text-[#A8A8A8] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              aria-current="page"
            >
              Features
            </a>
          )}
        </li>
        <li>
          {pathname === "/pricing" ? (
            <a
              href="/pricing"
              className="block py-2 pr-4 pl-3 text-[#003049] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              aria-current="page"
            >
              Pricing
            </a>
          ) : (
            <a
              href="/pricing"
              className="block py-2 pr-4 pl-3 text-[#A8A8A8] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              aria-current="page"
            >
              Pricing
            </a>
          )}
        </li>
        <div className="h-0.5 w-1/2 bg-gray-200"></div>
        <li>
          <a
            href="#"
            className="block py-2 pr-4 pl-3 text-[#003049] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            aria-current="page"
            onClick={() => setModalLogin(true)}
          >
            Login
          </a>
        </li>
        <li>
          <Link
            to="/create-account"
            type="button"
            className="bg-[#0E5073] py-2 px-3 text-white rounded-full hover:bg-[#003049] md:border-0 md:hover:text-white md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent w-fit"
          >
            Get Started
          </Link>
        </li>
      </ul>
    </Box>
  );
  return (
    <>
      <nav className="bg-white shadow-md px-2 sm:px-4 py-1 rounded dark:bg-gray-900">
        <div className="flex flex-wrap justify-between mx-5">
          <a to="#" className="flex items-center">
            <img src={lg} />
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={toggleDrawer("right", true)}
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
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
          >
            {list("right")}
          </Drawer>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <div className="flex gap-20">
              <ul className="flex flex-col p-2 mt-2 bg-gray-50 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  {pathname === "/" ? (
                    <Link
                      to="/"
                      className="block py-2 pr-4 pl-3 text-[#790001] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      aria-current="page"
                    >
                      Home
                    </Link>
                  ) : (
                    <Link
                      to="/"
                      className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      aria-current="page"
                    >
                      Home
                    </Link>
                  )}
                </li>
                <li>
                  {pathname === "/feature" ? (
                    <Link
                      to="/feature"
                      className="block py-2 pr-4 pl-3 text-[#790001] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Features
                    </Link>
                  ) : (
                    <Link
                      to="/feature"
                      className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Features
                    </Link>
                  )}
                </li>
                <li>
                  {pathname === "/pricing" ? (
                    <Link
                      to="/pricing"
                      className="block py-2 pr-4 pl-3 text-[#790001] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Pricing
                    </Link>
                  ) : (
                    <Link
                      to="/pricing"
                      className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Pricing
                    </Link>
                  )}
                </li>
              </ul>
              <ul className="flex flex-col p-2 mt-2 bg-gray-50 rounded-lg md:flex-row md:space-x-4 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link
                    to="#"
                    className="block py-2  text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    aria-current="page"
                    onClick={() => setModalLogin(true)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="bg-[#0E5073] block py-2 px-3 text-white rounded-full hover:bg-[#003049] md:border-0 md:hover:text-white md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* start:modal login */}
      <Modal show={modalLogin} size="md" onHide={() => setModalLogin(false)}>
        <Modal.Body className="flex flex-col gap-3 m-4">
          <Alert
            show={message != null ? true : false}
            variant="danger"
            onClose={() => {
              setMessage(null);
            }}
            dismissible
          >
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
          <Link
            to="#"
            className="self-end text-[#33596D] hover:text-[#2D4D5F] text-sm"
            onClick={() => setModalPW(true)}
          >
            Forgot Password?
          </Link>
          <button
            onClick={async () => {
              setMessage(null);
              try {
                var requestBody = {
                  username: document.getElementById("username").value,
                  password: document.getElementById("password").value,
                };
                setModalLogin(false);
                setLoading(true);
                var data = await PostLogin(requestBody);
                setLoading(false);
                setModalLogin(true);

                  var toJson = JSON.stringify(data["data"]);
                  window.localStorage.setItem("users", toJson);
                  window.localStorage.setItem("token", data["token"]);
                  window.location.href = "/dashboard";
              } catch (error) {
                setLoading(false);
                setModalLogin(true);
                setMessage("Wrong username or password");
              }
            }}
            className="bg-[#0E5073] block py-2 px-3 text-center text-white rounded-full hover:bg-[#003049] md:border-0 md:hover:text-white md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Login
          </button>
          <p className="text-xs text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="#"
              className="text-[#003049] hover:text-[#001A27] font-semibold"
            >
              Sign Up
            </Link>
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
          <Link
            to="#"
            className="bg-[#0E5073] block py-2 px-3 text-center text-white rounded-full hover:bg-[#003049] md:border-0 md:hover:text-white md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Send
          </Link>
          <Link
            to="#"
            className="self-center text-[#33596D] hover:text-[#2D4D5F] text-sm"
            onClick={() => setModalPW(false)}
          >
            Back to login
          </Link>
        </Modal.Body>
      </Modal>
      {/* end:modal forgot password */}
      <LoadingDialog active={isLoading} />
    </>
  );
}

export default Navbar;
