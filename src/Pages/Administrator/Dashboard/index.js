import React, { Component } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import d1 from "../../../Resourse/img/d1.png";
import d2 from "../../../Resourse/img/d2.png";
import d3 from "../../../Resourse/img/d3.png";
import d4 from "../../../Resourse/img/d4.png";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

function Dashboard() {
  return (
    <>
      <div className="m-0">
        <h1 className="text-2xl">Hello, Agatha!</h1>
        <p className="text-sm">it’s Monday, 21 Februari 2022</p>
      </div>
      <div className="flex flex-row gap-2">
        <div className="w-1/2">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-row justify-between bg-[#669BBC] rounded-lg">
              <div className="flex flex-col gap-2 p-4 text-sm">
                <h1 className="text-gray-200 font-semibold uppercase">
                  Total employees
                </h1>
                <h1 className="text-white">7,482,120</h1>
              </div>
              <img className="rounded-lg" src={d1} />
            </div>
            <div className="flex flex-row justify-between bg-[#669BBC] rounded-lg">
              <div className="flex flex-col gap-2 p-4 text-sm">
                <h1 className="text-gray-200 font-semibold uppercase">
                  New employees
                </h1>
                <h1 className="text-white">7,482,120</h1>
              </div>
              <img className="rounded-lg" src={d4} />
            </div>
            <div className="flex flex-row justify-between bg-[#669BBC] rounded-lg">
              <div className="flex flex-col gap-2 p-4 text-sm">
                <h1 className="text-gray-200 font-semibold uppercase">
                  Applied employees
                </h1>
                <h1 className="text-white">7,482,120</h1>
              </div>
              <img className="rounded-lg" src={d2} />
            </div>
            <div className="flex flex-row justify-between bg-[#669BBC] rounded-lg">
              <div className="flex flex-col gap-2 p-4 text-sm">
                <h1 className="text-gray-200 font-semibold uppercase">
                  Resigned employees
                </h1>
                <h1 className="text-white">7,482,120</h1>
              </div>
              <img className="rounded-lg" src={d3} />
            </div>
          </div>
        </div>
        <div className="bg-[#F3F6FF]  w-1/2">
          <div className="flex flex-col gap-2 p-4 rounded-lg">
            <h1 className="text-gray-700 font-semibold">Employee status</h1>
            <div className="flex">
              <div className="h-2 bg-[#669BBC]" style={{ width: "48px" }}></div>
              <div className="h-2 bg-[#C1121F]" style={{ width: "26px" }}></div>
              <div className="h-2 bg-[#780000]" style={{ width: "26px" }}></div>
              <div className="h-2 bg-[#FDF0D5]" style={{ width: "43px" }}></div>
              <div
                className="h-2 bg-[#003049]"
                style={{ width: "100px" }}
              ></div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex gap-2 items-center">
                <div className="w-5 h-1 bg-[#669BBC]"></div>
                <p className="text-gray-400 text-xs">Fulltime</p>
                <p className="text-gray-700 text-xs">30</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-5 h-1 bg-[#C1121F]"></div>
                <p className="text-gray-400 text-xs">Fulltime</p>
                <p className="text-gray-700 text-xs">30</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-5 h-1 bg-[#780000]"></div>
                <p className="text-gray-400 text-xs">Fulltime</p>
                <p className="text-gray-700 text-xs">30</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-5 h-1 bg-[#FDF0D5]"></div>
                <p className="text-gray-400 text-xs">Fulltime</p>
                <p className="text-gray-700 text-xs">30</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-5 h-1 bg-[#003049]"></div>
                <p className="text-gray-400 text-xs">Fulltime</p>
                <p className="text-gray-700 text-xs">30</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-5 h-1 bg-[#003049]"></div>
                <p className="text-gray-400 text-xs">Fulltime</p>
                <p className="text-gray-700 text-xs">30</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="bg-[#F3F6FF] p-3 w-1/2">
          <h1 className="text-gray-700 font-semibold">Job Title</h1>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-row items-center gap-5 rounded-lg">
              <Doughnut
                data={{
                  datasets: [
                    {
                      label: "Job Title",
                      data: [1, 4, 8, 10, 44],
                      backgroundColor: [
                        "#003049",
                        "#FDF0D5",
                        "#780000",
                        "#C1121F",
                        "#669BBC",
                      ],
                    },
                  ],
                }}
              />
              <div className="flex flex-col">
                <div className="flex gap-10 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-[#003049]"></div>
                    <p className="text-gray-400 text-xs">CEO</p>
                  </div>
                  <p className="text-gray-700 text-xs">1</p>
                </div>
                <div className="flex gap-10 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-[#FDF0D5]"></div>
                    <p className="text-gray-400 text-xs">Manager</p>
                  </div>
                  <p className="text-gray-700 text-xs">4</p>
                </div>
                <div className="flex gap-10 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-[#780000]"></div>
                    <p className="text-gray-400 text-xs">HRD</p>
                  </div>
                  <p className="text-gray-700 text-xs">8</p>
                </div>
                <div className="flex gap-10 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-[#C1121F]"></div>
                    <p className="text-gray-400 text-xs">Supervisor</p>
                  </div>
                  <p className="text-gray-700 text-xs">10</p>
                </div>
                <div className="flex gap-10 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-[#669BBC]"></div>
                    <p className="text-gray-400 text-xs">Staff</p>
                  </div>
                  <p className="text-gray-700 text-xs">44</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#F3F6FF] p-3 w-1/2">
          <h1 className="text-gray-700 font-semibold">Gender Diversity</h1>
          <div className="flex flex-col items-center gap-3">
            <div className="max-w-sm">
              <Doughnut
                data={{
                  datasets: [
                    {
                      label: "Gender",
                      data: [38, 31],
                      backgroundColor: ["#EEE5FF", "#8950FC"],
                    },
                  ],
                }}
                width={"180px"}
              />
            </div>
            <div className="flex flex-row gap-5">
              <div className="flex gap-10 items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-[#8950FC] p-1 rounded-lg">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_200_2733)">
                        <path
                          d="M7.29551 1.33301C12.1797 1.33301 13.2415 4.58208 13.2415 6.4296C13.2415 8.06475 13.0292 8.76554 13.0292 8.76554H1.56185C1.56185 8.76554 1.34949 8.06475 1.34949 6.4296C1.34949 4.58208 2.41128 1.33301 7.29551 1.33301Z"
                          fill="#594640"
                        />
                        <path
                          d="M12.6469 7.91632C12.6469 7.91632 12.477 7.21554 12.3921 5.75027C12.2859 4.15759 10.0774 5.43174 7.29547 5.43174C4.51359 5.43174 2.30506 4.15759 2.19888 5.75027C2.11394 7.21554 1.94405 7.91632 1.94405 7.91632C0.563728 7.91632 0.563728 10.1673 2.029 10.1673C2.029 12.5882 5.06572 14.0747 7.29547 14.0747C9.52523 14.0747 12.562 12.5882 12.562 10.1673C14.0272 10.1673 14.0272 7.91632 12.6469 7.91632Z"
                          fill="#FFE1BD"
                        />
                        <path
                          d="M9.94991 9.82706C10.7122 9.82706 11.3302 9.20907 11.3302 8.44673C11.3302 7.6844 10.7122 7.06641 9.94991 7.06641C9.18757 7.06641 8.56958 7.6844 8.56958 8.44673C8.56958 9.20907 9.18757 9.82706 9.94991 9.82706Z"
                          fill="white"
                        />
                        <path
                          d="M9.94987 9.40243C10.4776 9.40243 10.9055 8.97459 10.9055 8.44682C10.9055 7.91905 10.4776 7.49121 9.94987 7.49121C9.4221 7.49121 8.99426 7.91905 8.99426 8.44682C8.99426 8.97459 9.4221 9.40243 9.94987 9.40243Z"
                          fill="#664E27"
                        />
                        <path
                          d="M9.94988 8.765C10.1258 8.765 10.2684 8.62239 10.2684 8.44647C10.2684 8.27054 10.1258 8.12793 9.94988 8.12793C9.77396 8.12793 9.63135 8.27054 9.63135 8.44647C9.63135 8.62239 9.77396 8.765 9.94988 8.765Z"
                          fill="#231F20"
                        />
                        <path
                          d="M4.64095 9.82706C5.40328 9.82706 6.02127 9.20907 6.02127 8.44673C6.02127 7.6844 5.40328 7.06641 4.64095 7.06641C3.87861 7.06641 3.26062 7.6844 3.26062 8.44673C3.26062 9.20907 3.87861 9.82706 4.64095 9.82706Z"
                          fill="white"
                        />
                        <path
                          d="M4.64104 9.40243C5.1688 9.40243 5.59665 8.97459 5.59665 8.44682C5.59665 7.91905 5.1688 7.49121 4.64104 7.49121C4.11327 7.49121 3.68542 7.91905 3.68542 8.44682C3.68542 8.97459 4.11327 9.40243 4.64104 9.40243Z"
                          fill="#664E27"
                        />
                        <path
                          d="M4.64092 8.765C4.81685 8.765 4.95946 8.62239 4.95946 8.44647C4.95946 8.27054 4.81685 8.12793 4.64092 8.12793C4.465 8.12793 4.32239 8.27054 4.32239 8.44647C4.32239 8.62239 4.465 8.765 4.64092 8.765Z"
                          fill="#231F20"
                        />
                        <path
                          d="M9.01552 11.1225C7.91126 11.887 6.67958 11.887 5.57532 11.1225C5.4479 11.0375 5.32049 11.1862 5.40543 11.3348C5.74521 11.887 6.42475 12.3754 7.29542 12.3754C8.16609 12.3754 8.84563 11.887 9.1854 11.3348C9.27035 11.1862 9.14293 11.0375 9.01552 11.1225Z"
                          fill="#664E27"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_200_2733">
                          <rect
                            width="13.5909"
                            height="13.5909"
                            fill="white"
                            transform="translate(0.5 0.908203)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-400 text-xs">Male</p>
                    <div className="flex flex-row gap-5 justify-between text-gray-600">
                      <p className="text-xs">31</p>
                      <p className="text-xs">44.9%</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-10 items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-[#EEE5FF] p-1 rounded-lg">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_200_2713)">
                        <path
                          d="M12.7743 9.40261C12.7743 9.40261 13.4538 8.21341 13.4538 6.4296C13.4538 4.09366 11.7337 1.33301 7.29546 1.33301C2.85718 1.33301 1.13708 4.09366 1.13708 6.4296C1.13708 8.21341 1.79539 9.40261 1.79539 9.40261C1.0309 10.2733 0.563711 12.0358 1.22202 13.1826C1.49809 13.6498 4.21627 15.3062 4.4711 12.3544H10.0773C10.3534 15.2849 13.0716 13.6498 13.3264 13.1826C14.006 12.0358 13.5388 10.2733 12.7743 9.40261Z"
                          fill="#594640"
                        />
                        <path
                          d="M7.29545 2.18262C4.04638 2.18262 1.66797 3.88148 1.66797 6.00506C1.66797 6.00506 2.53864 2.81969 7.29545 2.81969C12.0523 2.81969 12.7106 6.00506 12.7106 6.00506C12.7106 3.88148 10.5445 2.18262 7.29545 2.18262Z"
                          fill="#C28FEF"
                        />
                        <path
                          d="M12.6681 9.8275C13.9847 9.8275 13.9847 7.91628 12.6681 7.91628V7.27921C12.6681 7.27921 5.23555 7.08809 3.53668 4.51855C3.9614 7.10932 1.90153 7.91628 1.90153 7.91628C0.584908 7.91628 0.584908 9.8275 1.90153 9.8275C1.90153 11.314 3.45174 13.6499 7.27418 13.6499C11.0966 13.6499 12.6681 11.314 12.6681 9.8275Z"
                          fill="#FFE1BD"
                        />
                        <path
                          d="M9.94991 10.04C10.7122 10.04 11.3302 9.42196 11.3302 8.65962C11.3302 7.89729 10.7122 7.2793 9.94991 7.2793C9.18757 7.2793 8.56958 7.89729 8.56958 8.65962C8.56958 9.42196 9.18757 10.04 9.94991 10.04Z"
                          fill="white"
                        />
                        <path
                          d="M4.64095 10.04C5.40328 10.04 6.02127 9.42196 6.02127 8.65962C6.02127 7.89729 5.40328 7.2793 4.64095 7.2793C3.87861 7.2793 3.26062 7.89729 3.26062 8.65962C3.26062 9.42196 3.87861 10.04 4.64095 10.04Z"
                          fill="white"
                        />
                        <path
                          d="M9.94987 9.61532C10.4776 9.61532 10.9055 9.18748 10.9055 8.65971C10.9055 8.13194 10.4776 7.7041 9.94987 7.7041C9.4221 7.7041 8.99426 8.13194 8.99426 8.65971C8.99426 9.18748 9.4221 9.61532 9.94987 9.61532Z"
                          fill="#664E27"
                        />
                        <path
                          d="M9.94988 8.97789C10.1258 8.97789 10.2684 8.83528 10.2684 8.65936C10.2684 8.48343 10.1258 8.34082 9.94988 8.34082C9.77396 8.34082 9.63135 8.48343 9.63135 8.65936C9.63135 8.83528 9.77396 8.97789 9.94988 8.97789Z"
                          fill="#231F20"
                        />
                        <path
                          d="M4.64104 9.61532C5.1688 9.61532 5.59665 9.18748 5.59665 8.65971C5.59665 8.13194 5.1688 7.7041 4.64104 7.7041C4.11327 7.7041 3.68542 8.13194 3.68542 8.65971C3.68542 9.18748 4.11327 9.61532 4.64104 9.61532Z"
                          fill="#664E27"
                        />
                        <path
                          d="M4.64092 8.97789C4.81685 8.97789 4.95946 8.83528 4.95946 8.65936C4.95946 8.48343 4.81685 8.34082 4.64092 8.34082C4.465 8.34082 4.32239 8.48343 4.32239 8.65936C4.32239 8.83528 4.465 8.97789 4.64092 8.97789Z"
                          fill="#231F20"
                        />
                        <path
                          d="M9.01552 11.1225C7.91126 11.887 6.67958 11.887 5.57532 11.1225C5.4479 11.0375 5.32049 11.1862 5.40543 11.3348C5.74521 11.887 6.42475 12.3754 7.29542 12.3754C8.16609 12.3754 8.84563 11.887 9.1854 11.3348C9.27035 11.1862 9.14293 11.0375 9.01552 11.1225Z"
                          fill="#664E27"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_200_2713">
                          <rect
                            width="13.5909"
                            height="13.5909"
                            fill="white"
                            transform="translate(0.5 0.908203)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-400 text-xs">Female</p>
                    <div className="flex flex-row gap-5 justify-between text-gray-600">
                      <p className="text-xs">38</p>
                      <p className="text-xs">55.1%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
