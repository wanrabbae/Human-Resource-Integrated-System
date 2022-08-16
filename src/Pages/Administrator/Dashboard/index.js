import React, { Component } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

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
        <div className="border w-2/3">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-2 bg-[#669BBC] p-4 rounded-lg">
              <h1 className="text-gray-200 font-semibold uppercase">
                total employees
              </h1>
              <h1 className="text-white">7,482,120</h1>
            </div>
            <div className="flex flex-col gap-2 bg-[#669BBC] p-4 rounded-lg">
              <h1 className="text-gray-200 font-semibold uppercase">
                new employees
              </h1>
              <h1 className="text-white">7,482,120</h1>
            </div>
            <div className="flex flex-col gap-2 bg-[#669BBC] p-4 rounded-lg">
              <h1 className="text-gray-200 font-semibold uppercase">
                applied employees
              </h1>
              <h1 className="text-white">7,482,120</h1>
            </div>
            <div className="flex flex-col gap-2 bg-[#669BBC] p-4 rounded-lg">
              <h1 className="text-gray-200 font-semibold uppercase">
                resigned employees
              </h1>
              <h1 className="text-white">7,482,120</h1>
            </div>
          </div>
        </div>
        <div className="bg-[#F3F6FF]  w-2/3">
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
          <h1 className="text-gray-700 font-semibold">Employee status</h1>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-row items-center gap-5 rounded-lg">
              <Doughnut
                data={{
                  datasets: [
                    {
                      label: "employee status",
                      data: [26, 48, 3],
                      backgroundColor: ["#C1121F", "#669BBC", "#E4E6EF"],
                    },
                  ],
                }}
              />
              <div className="flex flex-col">
                <div className="flex gap-10 items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-[#003049]"></div>
                    <p className="text-gray-400 text-xs">Fulltime</p>
                  </div>
                  <p className="text-gray-700 text-xs">30</p>
                </div>
                <div className="flex gap-10 items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-[#003049]"></div>
                    <p className="text-gray-400 text-xs">Fulltime</p>
                  </div>
                  <p className="text-gray-700 text-xs">30</p>
                </div>
                <div className="flex gap-10 items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-[#003049]"></div>
                    <p className="text-gray-400 text-xs">Fulltime</p>
                  </div>
                  <p className="text-gray-700 text-xs">30</p>
                </div>
                <div className="flex gap-10 items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-[#003049]"></div>
                    <p className="text-gray-400 text-xs">Fulltime</p>
                  </div>
                  <p className="text-gray-700 text-xs">30</p>
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
