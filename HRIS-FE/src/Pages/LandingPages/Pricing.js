import React from "react";
import lp2 from "../../Resourse/img/lp-2.png";
import Navbar from "../../Components/landingPages/Navbar";
import Footer from "../../Components/landingPages/Footer";
import bg10 from "../../Resourse/img/lp/bg10.png";
import bg11 from "../../Resourse/img/lp/bg11.png";
import { WhatsApp } from "@mui/icons-material";

function Pricing() {
  return (
    <div className="bg-[#ECEEF6]">
      <div className="fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </div>
      <div
        className="px-5 pt-28 space-y-20 h-screen bg-bottom"
        style={{ backgroundImage: `url(${bg10})` }}
      >
        <div className="flex flex-col-reverse md:flex-row items-center">
          <div className="w-full md:w-1/2 md:px-20 md:text-start text-center">
            <p className="text-[#780000] text-xl md:text-5xl font-bold leading-relaxed">
              We provide many features that help and make it easier for you
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img src={lp2} />
          </div>
        </div>
      </div>

      <div className="bg-[#ECEEF6] p-5 mt-5 space-y-5">
        <div className="mb-5 mx-0 md:mx-72">
          <div className="text-center">
            <p className="text-3xl text-[#003049] font-bold">Plan & Pricing</p>
            <p className="text-sm text-gray-400 md:px-96">
              Select your plan and manage it according to company requirement
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 justify-center">
          <div className="bg-white w-full md:w-1/4 rounded-lg overflow-hidden shadow-md border">
            <div className="flex flex-col justify-between h-full px-6 py-4 space-y-20">
              <div className="space-y-5">
                <h1 className="font-bold text-lg">Starter</h1>
                <p className="text-sm">
                  The basic package is for those of you who have a medium-sized
                  business
                </p>
                {/* <p className="font-bold">Rp 999.000 /Month</p>
              <p className="text-sm">
                Basic package for those of you who are just started the gym
              </p> */}
                <p className="text-sm">Features</p>
                <div className="space-y-3">
                  <div className="flex flex-row items-center gap-3 text-sm">
                    <div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="12" fill="#457B9D" />
                        <path
                          d="M6 12.4444L9.69231 16L18 8"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Job Management System
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-3 text-sm">
                    <div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="12" fill="#457B9D" />
                        <path
                          d="M6 12.4444L9.69231 16L18 8"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Organisation Management System
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-3 text-sm">
                    <div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="12" fill="#457B9D" />
                        <path
                          d="M6 12.4444L9.69231 16L18 8"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Personal Information Memorandums (PIMs)
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-3 text-sm">
                    <div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="12" fill="#457B9D" />
                        <path
                          d="M6 12.4444L9.69231 16L18 8"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Document Management System
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-sm text-gray-500">Discuss with us</p>
                <a
                target="_blank"
                  href="https://wa.me/6285173372750"
                  className="flex items-center gap-3 bg-gradient-to-r from-[#0E5073] via-[#003049] to-[#0E5073] block py-2 px-5 text-sm text-white rounded-full hover:bg-[#003049] md:border-0 md:hover:text-white md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_5095_35668)">
                      <path
                        d="M0.59752 13.8324C0.596863 16.185 1.21636 18.4821 2.39433 20.5067L0.484863 27.4245L7.61961 25.5682C9.59299 26.6342 11.804 27.1927 14.0509 27.1929H14.0568C21.474 27.1929 27.5119 21.204 27.515 13.843C27.5165 10.276 26.1178 6.92185 23.5766 4.39838C21.0358 1.87512 17.6566 0.484782 14.0562 0.483154C6.63808 0.483154 0.600691 6.47168 0.597629 13.8324"
                        fill="url(#paint0_linear_5095_35668)"
                      />
                      <path
                        d="M0.117031 13.8281C0.116266 16.2653 0.757969 18.6445 1.97794 20.7417L0 27.9074L7.39058 25.9846C9.42692 27.0863 11.7196 27.6671 14.0526 27.668H14.0586C21.742 27.668 27.9967 21.4637 28 13.8392C28.0013 10.144 26.5523 6.66932 23.9203 4.05544C21.288 1.44189 17.788 0.00151938 14.0586 0C6.37394 0 0.120203 6.20341 0.117141 13.8281H0.117031ZM4.51828 20.3805L4.24233 19.9459C3.0823 18.1157 2.47002 16.0007 2.47089 13.829C2.47341 7.49152 7.67134 2.3355 14.063 2.3355C17.1583 2.33681 20.0672 3.53408 22.2552 5.70636C24.443 7.87885 25.6469 10.7668 25.6461 13.8383C25.6433 20.1757 20.4452 25.3324 14.0586 25.3324H14.054C11.9745 25.3313 9.93497 24.7772 8.15631 23.73L7.73303 23.4809L3.34731 24.6219L4.51828 20.3804V20.3805Z"
                        fill="url(#paint1_linear_5095_35668)"
                      />
                      <path
                        d="M10.5741 8.04704C10.3132 7.47152 10.0385 7.45991 9.79036 7.44981C9.58714 7.44113 9.35483 7.44178 9.12273 7.44178C8.89042 7.44178 8.51297 7.5285 8.19392 7.87416C7.87455 8.22014 6.97461 9.05623 6.97461 10.7567C6.97461 12.4574 8.22291 14.1008 8.39692 14.3316C8.57116 14.562 10.8068 18.1634 14.3475 19.5489C17.2901 20.7002 17.8889 20.4712 18.5276 20.4135C19.1663 20.356 20.5886 19.5776 20.8788 18.7705C21.1692 17.9635 21.1692 17.2717 21.0821 17.1272C20.9951 16.9832 20.7627 16.8967 20.4144 16.7239C20.0659 16.551 18.3533 15.7148 18.0341 15.5994C17.7147 15.4842 17.4825 15.4267 17.2502 15.7728C17.0179 16.1183 16.3508 16.8967 16.1475 17.1272C15.9443 17.3582 15.741 17.387 15.3928 17.2141C15.0442 17.0407 13.9223 16.6761 12.5913 15.4987C11.5558 14.5825 10.8567 13.4511 10.6534 13.1051C10.4502 12.7595 10.6317 12.5722 10.8063 12.4C10.9629 12.2451 11.1548 11.9963 11.3292 11.7946C11.5028 11.5927 11.5608 11.4487 11.677 11.2182C11.7932 10.9875 11.735 10.7856 11.6481 10.6127C11.5608 10.4398 10.8839 8.73054 10.5741 8.04715"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear_5095_35668"
                        x1="13.9999"
                        y1="27.4245"
                        x2="13.9999"
                        y2="0.483154"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#1FAF38" />
                        <stop offset="1" stop-color="#60D669" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_5095_35668"
                        x1="14"
                        y1="27.9074"
                        x2="14"
                        y2="0"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F9F9F9" />
                        <stop offset="1" stop-color="white" />
                      </linearGradient>
                      <clipPath id="clip0_5095_35668">
                        <rect width="28" height="28" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Get Started
                </a>
              </div>
            </div>
          </div>
          <div className="bg-[#CADAE8] w-full md:w-1/4 rounded-lg overflow-hidden shadow-md border">
            <div className="flex flex-col justify-between h-full px-6 py-4 space-y-20">
              <div className="space-y-5">
                <h1 className="font-bold text-lg">Premium</h1>
                <p className="text-sm">
                  The basic package is for those of you who have a large-scale
                  business
                </p>
                {/* <p className="font-bold">Rp 999.000 /Month</p>
              <p className="text-sm">
                Basic package for those of you who are just started the gym
              </p> */}
                <p className="text-sm">Features</p>
                <div className="space-y-3">
                  <div className="flex flex-row items-center gap-3 text-sm">
                    <div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="12" fill="#FFFFFF" />
                        <path
                          d="M6 12.4444L9.69231 16L18 8"
                          stroke="#457B9D"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-800 text-sm">
                      Performance analysis using KPIs
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-3 text-sm">
                    <div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="12" fill="#FFFFFF" />
                        <path
                          d="M6 12.4444L9.69231 16L18 8"
                          stroke="#457B9D"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-800 text-sm">
                      Robust performance management
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-3 text-sm">
                    <div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="12" fill="#FFFFFF" />
                        <path
                          d="M6 12.4444L9.69231 16L18 8"
                          stroke="#457B9D"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-800 text-sm">
                      Interconnected system management
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-3 text-sm">
                    <div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="12" fill="#FFFFFF" />
                        <path
                          d="M6 12.4444L9.69231 16L18 8"
                          stroke="#457B9D"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-800 text-sm">
                      HR Analytics data visual representation
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-3 text-sm">
                    <div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="12" fill="#FFFFFF" />
                        <path
                          d="M6 12.4444L9.69231 16L18 8"
                          stroke="#457B9D"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-800 text-sm">
                      Optimized recruitment flow monitoring
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-sm text-gray-500">Discuss with us</p>
                <a
                target="_blank"
                  href="https://wa.me/6285173372750"
                  className="flex items-center gap-3 bg-gradient-to-r from-[#0E5073] via-[#003049] to-[#0E5073] block py-2 px-5 text-sm text-white rounded-full hover:bg-[#003049] md:border-0 md:hover:text-white md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_5095_35668)">
                      <path
                        d="M0.59752 13.8324C0.596863 16.185 1.21636 18.4821 2.39433 20.5067L0.484863 27.4245L7.61961 25.5682C9.59299 26.6342 11.804 27.1927 14.0509 27.1929H14.0568C21.474 27.1929 27.5119 21.204 27.515 13.843C27.5165 10.276 26.1178 6.92185 23.5766 4.39838C21.0358 1.87512 17.6566 0.484782 14.0562 0.483154C6.63808 0.483154 0.600691 6.47168 0.597629 13.8324"
                        fill="url(#paint0_linear_5095_35668)"
                      />
                      <path
                        d="M0.117031 13.8281C0.116266 16.2653 0.757969 18.6445 1.97794 20.7417L0 27.9074L7.39058 25.9846C9.42692 27.0863 11.7196 27.6671 14.0526 27.668H14.0586C21.742 27.668 27.9967 21.4637 28 13.8392C28.0013 10.144 26.5523 6.66932 23.9203 4.05544C21.288 1.44189 17.788 0.00151938 14.0586 0C6.37394 0 0.120203 6.20341 0.117141 13.8281H0.117031ZM4.51828 20.3805L4.24233 19.9459C3.0823 18.1157 2.47002 16.0007 2.47089 13.829C2.47341 7.49152 7.67134 2.3355 14.063 2.3355C17.1583 2.33681 20.0672 3.53408 22.2552 5.70636C24.443 7.87885 25.6469 10.7668 25.6461 13.8383C25.6433 20.1757 20.4452 25.3324 14.0586 25.3324H14.054C11.9745 25.3313 9.93497 24.7772 8.15631 23.73L7.73303 23.4809L3.34731 24.6219L4.51828 20.3804V20.3805Z"
                        fill="url(#paint1_linear_5095_35668)"
                      />
                      <path
                        d="M10.5741 8.04704C10.3132 7.47152 10.0385 7.45991 9.79036 7.44981C9.58714 7.44113 9.35483 7.44178 9.12273 7.44178C8.89042 7.44178 8.51297 7.5285 8.19392 7.87416C7.87455 8.22014 6.97461 9.05623 6.97461 10.7567C6.97461 12.4574 8.22291 14.1008 8.39692 14.3316C8.57116 14.562 10.8068 18.1634 14.3475 19.5489C17.2901 20.7002 17.8889 20.4712 18.5276 20.4135C19.1663 20.356 20.5886 19.5776 20.8788 18.7705C21.1692 17.9635 21.1692 17.2717 21.0821 17.1272C20.9951 16.9832 20.7627 16.8967 20.4144 16.7239C20.0659 16.551 18.3533 15.7148 18.0341 15.5994C17.7147 15.4842 17.4825 15.4267 17.2502 15.7728C17.0179 16.1183 16.3508 16.8967 16.1475 17.1272C15.9443 17.3582 15.741 17.387 15.3928 17.2141C15.0442 17.0407 13.9223 16.6761 12.5913 15.4987C11.5558 14.5825 10.8567 13.4511 10.6534 13.1051C10.4502 12.7595 10.6317 12.5722 10.8063 12.4C10.9629 12.2451 11.1548 11.9963 11.3292 11.7946C11.5028 11.5927 11.5608 11.4487 11.677 11.2182C11.7932 10.9875 11.735 10.7856 11.6481 10.6127C11.5608 10.4398 10.8839 8.73054 10.5741 8.04715"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear_5095_35668"
                        x1="13.9999"
                        y1="27.4245"
                        x2="13.9999"
                        y2="0.483154"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#1FAF38" />
                        <stop offset="1" stop-color="#60D669" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_5095_35668"
                        x1="14"
                        y1="27.9074"
                        x2="14"
                        y2="0"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F9F9F9" />
                        <stop offset="1" stop-color="white" />
                      </linearGradient>
                      <clipPath id="clip0_5095_35668">
                        <rect width="28" height="28" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="px-5 py-10 space-y-20 px-20 md:h-screen bg-top bg-cover"
        style={{ backgroundImage: `url(${bg11})` }}
      >
        <p className="text-3xl text-[#003049] font-bold text-center">
          Have Any Question?
          <br />
          Contact Us Now
        </p>
        <div className="flex flex-col-reverse md:flex-row gap-5">
          <div className="w-full md:w-1/2 space-y-5">
            <h5 className="font-bold">Get in Touch</h5>
            <div className="flex flex-row">
              <div className="basis-1/12 p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#C1121F"
                  className="bi bi-geo-alt"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
              </div>
              <div className="basis-10/12 flex flex-col gap-2">
                <p className="text-sm text-gray-400">Phone Number</p>
                <p>+62 2817779707</p>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="basis-1/12 p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#C1121F"
                  className="bi bi-envelope"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                </svg>
              </div>
              <div className="basis-10/12 flex flex-col gap-2">
                <p className="text-sm text-gray-400">Email</p>
                <p>support@Powerkerto.com</p>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="basis-1/12 p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#C1121F"
                  className="bi bi-telephone"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                </svg>
              </div>
              <div className="basis-10/12 flex flex-col gap-2">
                <p className="text-sm text-gray-400">Map Street</p>
                <p>Purwokerto, Jawa Tengah, Indonesia</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <form>
              <div className="mb-6">
                <label
                  for="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your Full Name"
                  required=""
                />
              </div>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    for="website"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Subject
                  </label>
                  <input
                    type="url"
                    id="website"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Subject"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="visitors"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    type="number"
                    id="visitors"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="email@example.com"
                    required=""
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  for="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write Your Message"
                  rows={4}
                  required=""
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#0E5073] block py-2 px-3 text-white text-sm rounded-lg hover:bg-[#003049] md:border-0 md:hover:text-white md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="pt-28">
        <iframe
          width="100%"
          height="300px"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1881.9189617380805!2d109.25757718821114!3d-7.427293402638826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655fcb4e28fba1%3A0x6f5a4f82723e89f6!2sPT%20Powerkerto!5e0!3m2!1sid!2sid!4v1649917249388!5m2!1sid!2sid"
        ></iframe>
      </div>
      <Footer />
    </div>
  );
}

export default Pricing;
