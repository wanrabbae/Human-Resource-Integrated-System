import React from "react";
import lp1 from "../../Resourse/img/lp-1.png";
import lp2 from "../../Resourse/img/lp-2.png";
import lp3 from "../../Resourse/img/lp-3.png";
import lp4 from "../../Resourse/img/lp-4.png";
import c1 from "../../Resourse/img/client/1.png";
import c2 from "../../Resourse/img/client/2.png";
import c3 from "../../Resourse/img/client/3.png";
import c4 from "../../Resourse/img/client/4.png";
import c5 from "../../Resourse/img/client/5.png";
import c6 from "../../Resourse/img/client/6.png";
import c7 from "../../Resourse/img/client/7.png";
import c8 from "../../Resourse/img/client/8.png";
import c9 from "../../Resourse/img/client/9.png";
import c10 from "../../Resourse/img/client/10.png";
import { CheckCircleIcon } from "@heroicons/react/solid";

function LandingPages() {
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-10">
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
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <div className="flex gap-20">
                <ul className="flex flex-col p-2 mt-2 bg-gray-50 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                    <a
                      href="#"
                      className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      aria-current="page"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
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
      </div>
      <div className="mx-5 mt-28 space-y-20">
        <div className="flex flex-row">
          <div className="w-1/2 flex flex-col gap-2 justify-center">
            <p className="text-[#780000] text-5xl font-bold leading-relaxed">
              HR software for more effective business operations
            </p>
            <p>
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups.
            </p>
          </div>
          <div className="w-1/2">
            <img src={lp1} />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-1/2 flex flex-col gap-2 justify-center">
            <p className="text-[#003049] text-3xl font-bold leading-relaxed">
              Manage all needs with the
              <br />
              features we provide
            </p>
            <div className="flex flex-row items-start gap-3 w-96 mt-10">
              <div>
                <CheckCircleIcon className="h-8 w-8" />
              </div>

              <p>
                Lorem ipsum is placeholder text commonly used in the graphic,
                print, and publishing industries for previewing layouts and
                visual mockups.
              </p>
            </div>
            <div className="flex flex-row gap-3 items-start w-96 ml-10 mt-10">
              <div>
                <CheckCircleIcon className="h-8 w-8" />
              </div>

              <p>
                Lorem ipsum is placeholder text commonly used in the graphic,
                print, and publishing industries for previewing layouts and
                visual mockups.
              </p>
            </div>
            <div className="flex flex-row gap-3 items-start w-96 ml-20 mt-10">
              <div>
                <CheckCircleIcon className="h-8 w-8" />
              </div>

              <p>
                Lorem ipsum is placeholder text commonly used in the graphic,
                print, and publishing industries for previewing layouts and
                visual mockups.
              </p>
            </div>
          </div>
          <div className="w-1/2">
            <img src={lp2} />
          </div>
        </div>
      </div>

      <div className="bg-[#ECEEF6] p-5 mt-5 space-y-5">
        <p className="text-3xl text-[#003049] text-center font-bold">
          Many Companies Use HRIS Software
        </p>
        <div className="flex flex-wrap justify-between gap-5">
          <img src={c1} />
          <img src={c1} />
          <img src={c1} />
          <img src={c1} />
          <img src={c1} />
          <img src={c1} />
          <img src={c1} />
          <img src={c1} />
          <img src={c1} />
          <img src={c1} />
        </div>
      </div>

      <div className="mx-5 mt-5 space-y-20">
        <div className="flex flex-row items-center">
          <div className="w-1/2">
            <img src={lp3} />
          </div>
          <div className="w-1/2 flex flex-col gap-2 justify-center">
            <p className="text-[#003049] text-4xl font-bold leading-relaxed">
              Manage payroll & HR administration so much easier
            </p>
            <div className="flex flex-row items-start gap-3">
              <div>
                <CheckCircleIcon className="h-8 w-8" />
              </div>

              <p>Lorem ipsum is placeholder text commonly used</p>
            </div>
            <div className="flex flex-row items-start gap-3">
              <div>
                <CheckCircleIcon className="h-8 w-8" />
              </div>

              <p>Lorem ipsum is placeholder text commonly used</p>
            </div>
            <div className="flex flex-row items-start gap-3">
              <div>
                <CheckCircleIcon className="h-8 w-8" />
              </div>

              <p>Lorem ipsum is placeholder text commonly used</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#ECEEF6] p-5 mt-5 space-y-5">
        <div className="text-center space-y-2 my-5">
          <p className="text-3xl text-[#003049] font-bold">
            Trusted By Company Recruiters
          </p>
          <p className="text-sm text-gray-400">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam.
          </p>
        </div>
        <div className="flex flex-wrap justify-between gap-3">
          <div class="bg-white max-w-sm rounded-lg overflow-hidden shadow-md border">
            <div class="px-6 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-quote"
                viewBox="0 0 16 16"
              >
                <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
              </svg>
              <p class="text-gray-700 text-base text-center ps-3 pt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien
                vulputate at eget bibendum egestas. Donec vel viverra fermentum
                tortor quisque lectus nulla. Amet eget leo morbi ac pulvinar
                donec enim risus. Commodo sed maecenas
              </p>
              <div className="flex flex-row gap-3 mt-3">
                <div className="basis-4/12 md:basis-2/12">
                  <img src={c2} alt="register" />
                </div>
                <div className="basis-8/12 md:basis-10/12">
                  <p className="text-sm">
                    <span className="font-bold">Anete Black 4</span>
                    <br />
                    <span className="text-muted">
                      HR Management Mandiri Bank
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white max-w-sm rounded-lg overflow-hidden shadow-md border">
            <div class="px-6 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-quote"
                viewBox="0 0 16 16"
              >
                <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
              </svg>
              <p class="text-gray-700 text-base text-center ps-3 pt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien
                vulputate at eget bibendum egestas. Donec vel viverra fermentum
                tortor quisque lectus nulla. Amet eget leo morbi ac pulvinar
                donec enim risus. Commodo sed maecenas
              </p>
              <div className="flex flex-row gap-3 mt-3">
                <div className="basis-4/12 md:basis-2/12">
                  <img src={c2} alt="register" />
                </div>
                <div className="basis-8/12 md:basis-10/12">
                  <p className="text-sm">
                    <span className="font-bold">Anete Black 4</span>
                    <br />
                    <span className="text-muted">
                      HR Management Mandiri Bank
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white max-w-sm rounded-lg overflow-hidden shadow-md border">
            <div class="px-6 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-quote"
                viewBox="0 0 16 16"
              >
                <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
              </svg>
              <p class="text-gray-700 text-base text-center ps-3 pt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien
                vulputate at eget bibendum egestas. Donec vel viverra fermentum
                tortor quisque lectus nulla. Amet eget leo morbi ac pulvinar
                donec enim risus. Commodo sed maecenas
              </p>
              <div className="flex flex-row gap-3 mt-3">
                <div className="basis-4/12 md:basis-2/12">
                  <img src={c2} alt="register" />
                </div>
                <div className="basis-8/12 md:basis-10/12">
                  <p className="text-sm">
                    <span className="font-bold">Anete Black 4</span>
                    <br />
                    <span className="text-muted">
                      HR Management Mandiri Bank
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#ECEEF6] space-y-5 py-28">
        <div className="flex flex-row items-center px-5 bg-[#E9DCE5]">
          <div className="w-1/2">
            <h1 className="text-[#780000] text-4xl font-bold">
              Get Started Now
            </h1>
            <p>
              let's join now and have a pleasant experience with us and also
              very satisfying results for the body and mind, fresh and muscular
            </p>
          </div>
          <div className="w-1/2">
            <img src={lp4} />
          </div>
        </div>
      </div>

      <footer>
        <div class="container py-10 flex flex-col md:flex-row justify-between gap-5">
          <div class="basis-3/12 space-y-3">
            <div className="me-5">
              <span className="text-xl font-semibold whitespace-nowrap dark:text-white">
                HRIS
              </span>
            </div>
            <p className="text-muted text-sm text-justify">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat
            </p>
            <div class="">
              <div className="flex flex-row gap-3">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 16.0893C0 24.044 5.77733 30.6587 13.3333 32V20.444H9.33333V16H13.3333V12.444C13.3333 8.444 15.9107 6.22267 19.556 6.22267C20.7107 6.22267 21.956 6.4 23.1107 6.57733V10.6667H21.0667C19.1107 10.6667 18.6667 11.644 18.6667 12.8893V16H22.9333L22.2227 20.444H18.6667V32C26.2227 30.6587 32 24.0453 32 16.0893C32 7.24 24.8 0 16 0C7.2 0 0 7.24 0 16.0893Z"
                    fill="black"
                  />
                </svg>

                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.8006 15.9999C20.8006 17.2729 20.2949 18.4938 19.3947 19.394C18.4946 20.2942 17.2737 20.7999 16.0006 20.7999C14.7276 20.7999 13.5067 20.2942 12.6065 19.394C11.7063 18.4938 11.2006 17.2729 11.2006 15.9999C11.2006 15.7263 11.2294 15.4591 11.279 15.1999H9.60063V21.5951C9.60063 22.0399 9.96062 22.3999 10.4054 22.3999H21.5974C21.8106 22.3995 22.0149 22.3145 22.1655 22.1636C22.3161 22.0127 22.4006 21.8083 22.4006 21.5951V15.1999H20.7222C20.7718 15.4591 20.8006 15.7263 20.8006 15.9999ZM16.0006 19.1999C16.421 19.1998 16.8372 19.1169 17.2255 18.9559C17.6138 18.795 17.9666 18.5591 18.2637 18.2618C18.5608 17.9645 18.7965 17.6116 18.9573 17.2232C19.118 16.8349 19.2007 16.4186 19.2006 15.9983C19.2005 15.578 19.1176 15.1618 18.9567 14.7735C18.7957 14.3852 18.5599 14.0324 18.2626 13.7352C17.9653 13.4381 17.6124 13.2024 17.224 13.0416C16.8356 12.8809 16.4194 12.7982 15.999 12.7983C15.1501 12.7985 14.3361 13.1359 13.736 13.7364C13.1358 14.3368 12.7988 15.151 12.799 15.9999C12.7992 16.8488 13.1367 17.6629 13.7371 18.263C14.3375 18.8631 15.1517 19.2001 16.0006 19.1999ZM19.8406 12.6399H21.759C21.8865 12.6399 22.0087 12.5894 22.099 12.4994C22.1893 12.4094 22.2402 12.2873 22.2406 12.1599V10.2415C22.2406 10.1138 22.1899 9.99127 22.0996 9.90095C22.0093 9.81063 21.8868 9.75989 21.759 9.75989H19.8406C19.7129 9.75989 19.5904 9.81063 19.5001 9.90095C19.4098 9.99127 19.359 10.1138 19.359 10.2415V12.1599C19.3606 12.4239 19.5766 12.6399 19.8406 12.6399ZM16.0006 0.639893C11.9269 0.639893 8.02002 2.25817 5.13946 5.13873C2.25891 8.01929 0.640625 11.9262 0.640625 15.9999C0.640625 20.0736 2.25891 23.9805 5.13946 26.8611C8.02002 29.7416 11.9269 31.3599 16.0006 31.3599C18.0177 31.3599 20.0151 30.9626 21.8786 30.1907C23.7422 29.4188 25.4355 28.2874 26.8618 26.8611C28.2881 25.4347 29.4195 23.7415 30.1914 21.8779C30.9633 20.0144 31.3606 18.017 31.3606 15.9999C31.3606 13.9828 30.9633 11.9854 30.1914 10.1219C29.4195 8.25831 28.2881 6.56504 26.8618 5.13873C25.4355 3.71242 23.7422 2.58102 21.8786 1.8091C20.0151 1.03719 18.0177 0.639893 16.0006 0.639893ZM24.0006 22.2223C24.0006 23.1999 23.2006 23.9999 22.223 23.9999H9.77822C8.80062 23.9999 8.00063 23.1999 8.00063 22.2223V9.77749C8.00063 8.79989 8.80062 7.99989 9.77822 7.99989H22.223C23.2006 7.99989 24.0006 8.79989 24.0006 9.77749V22.2223Z"
                    fill="black"
                  />
                </svg>

                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.5654 15.7327L14.9718 14.0559C14.6582 13.9103 14.4006 14.0735 14.4006 14.4207V17.5791C14.4006 17.9263 14.6582 18.0895 14.9718 17.9439L18.5638 16.2671C18.879 16.1199 18.879 15.8799 18.5654 15.7327ZM16.0006 0.639893C7.51743 0.639893 0.640625 7.51669 0.640625 15.9999C0.640625 24.4831 7.51743 31.3599 16.0006 31.3599C24.4838 31.3599 31.3606 24.4831 31.3606 15.9999C31.3606 7.51669 24.4838 0.639893 16.0006 0.639893ZM16.0006 22.2399C8.13823 22.2399 8.00063 21.5311 8.00063 15.9999C8.00063 10.4687 8.13823 9.75989 16.0006 9.75989C23.863 9.75989 24.0006 10.4687 24.0006 15.9999C24.0006 21.5311 23.863 22.2399 16.0006 22.2399Z"
                    fill="black"
                  />
                </svg>

                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.0006 0.639893C7.51743 0.639893 0.640625 7.51669 0.640625 15.9999C0.640625 24.4831 7.51743 31.3599 16.0006 31.3599C24.4838 31.3599 31.3606 24.4831 31.3606 15.9999C31.3606 7.51669 24.4838 0.639893 16.0006 0.639893ZM12.2406 22.3663H9.13023V12.3567H12.2406V22.3663ZM10.6662 11.1279C9.68382 11.1279 9.04862 10.4319 9.04862 9.57109C9.04862 8.69269 9.70302 8.01749 10.7062 8.01749C11.7094 8.01749 12.3238 8.69269 12.343 9.57109C12.343 10.4319 11.7094 11.1279 10.6662 11.1279ZM23.6006 22.3663H20.4902V16.8191C20.4902 15.5279 20.039 14.6511 18.9142 14.6511C18.055 14.6511 17.5446 15.2447 17.319 15.8159C17.2358 16.0191 17.215 16.3071 17.215 16.5935V22.3647H14.103V15.5487C14.103 14.2991 14.063 13.2543 14.0214 12.3551H16.7238L16.8662 13.7455H16.9286C17.3382 13.0927 18.3414 12.1295 20.0198 12.1295C22.0662 12.1295 23.6006 13.5007 23.6006 16.4479V22.3663Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="basis-1/12 space-y-3">
            <h5 className="font-bold">Menu</h5>
            <div className="flex flex-col gap-3">
              <a href="/" className="text-muted text-sm no-underline">
                Home
              </a>
              <a href="/feature" className="text-muted text-sm no-underline">
                Feature
              </a>
              <a href="/pricing" className="text-muted text-sm no-underline">
                Pricing
              </a>
            </div>
          </div>
          <div class="basis-1/12 space-y-3">
            <h5 className="font-bold">Support</h5>
            <p className="text-muted text-sm">Help</p>
            <p className="text-muted text-sm">Contact Us</p>
          </div>
          <div class="basis-3/12 space-y-3">
            <h5 className="font-bold">Get in Touch</h5>
            <div class="flex flex-row">
              <div class="basis-1/12 p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#C1121F"
                  class="bi bi-geo-alt"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
              </div>
              <div class="basis-10/12">
                <p>8819 Ohio St. South Korea, CA 90280</p>
              </div>
            </div>
            <div class="flex flex-row">
              <div class="basis-1/12 p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#C1121F"
                  class="bi bi-envelope"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                </svg>
              </div>
              <div class="basis-10/12">
                <p>support@powerkerto.com</p>
              </div>
            </div>
            <div class="flex flex-row">
              <div class="basis-1/12 p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#C1121F"
                  class="bi bi-telephone"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                </svg>
              </div>
              <div class="basis-10/12">
                <p>+1 386-688-3295</p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer bg-[#8A0505] text-center text-white p-1">
          <small>@2022 Powerkerto. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
}

export default LandingPages;
