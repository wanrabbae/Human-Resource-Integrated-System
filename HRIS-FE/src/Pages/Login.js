import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { PostLogin } from "../Repository/AuthRepository";
import logo from "../Resourse/img/logo.png";

function Login() {
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
  return (
    <div className="bg-red-100 w-full h-screen grid md:grid-cols-3 grid-cols- gap-4 place-content-center">
      <div className="md:block hidden"></div>
      <div className="flex flex-col justfy-center gap-3 p-5 bg-white shadow-lg rounded-lg">
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
        {/* <Link
          to="#"
          className="self-end text-[#33596D] hover:text-[#2D4D5F] text-sm"
          onClick={() => setModalPW(true)}
        >
          Forgot Password?
        </Link> */}
        <button
          onClick={async () => {
            var requestBody = {
              username: document.getElementById("username").value,
              password: document.getElementById("password").value,
            };
            setModalLogin(false);
            setLoading(true);
            var data = await PostLogin(requestBody);
            setLoading(false);
            setModalLogin(true);
            if (data["message"] != "Success") {
              setMessage("Wrong username or password");
            } else {
              var toJson = JSON.stringify(data["data"]);
              window.localStorage.setItem("users", toJson);
              window.localStorage.setItem("token", data["token"]);
              window.location.href = "/dashboard";
            }
          }}
          className="bg-[#0E5073] block py-2 px-3 text-center text-white rounded-full hover:bg-[#003049] md:border-0 md:hover:text-white md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        >
          Login
        </button>
        {/* <p className="text-xs text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="#"
            className="text-[#003049] hover:text-[#001A27] font-semibold"
          >
            Sign Up
          </Link>
        </p> */}
      </div>
      <div className="md:block hidden"></div>
    </div>
  );
}

export default Login;
