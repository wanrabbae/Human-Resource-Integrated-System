import React from "react";
import lp1 from "../../Resourse/img/lp-1.png";
import lp2 from "../../Resourse/img/lp-2.png";
import lp3 from "../../Resourse/img/lp-3.png";
import lp4 from "../../Resourse/img/lp-4.png";
import c1 from "../../Resourse/img/client/1.png";
import c2 from "../../Resourse/img/client/2.png";
import Navbar from "../../Components/landingPages/Navbar";
import c3 from "../../Resourse/img/client/3.png";
import c4 from "../../Resourse/img/client/4.png";
import c5 from "../../Resourse/img/client/5.png";
import c6 from "../../Resourse/img/client/6.png";
import c7 from "../../Resourse/img/client/7.png";
import c8 from "../../Resourse/img/client/8.png";
import bg1 from "../../Resourse/img/lp/bg1.png";
import bg2 from "../../Resourse/img/lp/bg2.png";
import bg3 from "../../Resourse/img/lp/bg3.png";
import bg4 from "../../Resourse/img/lp/bg4.png";
import people1 from "../../Resourse/img/lp/people1.png";
import people2 from "../../Resourse/img/lp/people2.png";
import people3 from "../../Resourse/img/lp/people3.png";
import { CheckCircleIcon } from "@heroicons/react/solid";
import Footer from "../../Components/landingPages/Footer";
import { Link } from "react-router-dom";
import { CheckCircle } from "@mui/icons-material";
import { indigo } from "@mui/material/colors";

function Home() {
  return (
    <div className="bg-[#ECEEF6]">
      <div className="fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </div>
      <div
        className="px-5 pt-28 space-y-20 md:px-20 h-screen md:bg-cover bg-bottom"
        style={{ backgroundImage: `url(${bg1})` }}
      >
        <div className="flex flex-col-reverse md:flex-row items-center gap-5 md:gap-0 w-full">
          <div className="w-full md:w-1/2 flex flex-col gap-3 md:gap-2">
            <p className="text-[#780000] text-xl md:text-5xl font-bold leading-relaxed">
              HR software for more effective business operations
            </p>
            <p className="tex-xs md:text-normal">
              Centralized system and has an important role for companies to
              manage human resource data
            </p>
          </div>
          <div className="w-full w-1/2 flex justify-center">
            <img src={lp1} />
          </div>
        </div>
      </div>
      <div
        className="px-5 space-y-20 md:px-20 md:h-screen md:bg-cover bg-top"
        style={{ backgroundImage: `url(${bg2})` }}
      >
        <div className="flex md:flex-row flex-col-reverse md:pt-32 pb-20">
          <div className="w-full md:w-1/2 flex flex-col gap-2 justify-center">
            <p className="text-[#003049] text-xl md:text-3xl font-bold leading-relaxed">
              Manage all needs with the
              <br />
              features we provide
            </p>
            <div className="flex flex-row items-start gap-3 w-fit md:w-96 mt-10">
              <div>
                <CheckCircle
                  sx={{ color: indigo["A100"] }}
                  className="h-8 w-8"
                />
              </div>

              <p>
                Make Repetitive Jobs Automated and Facilitate Employee
                Performance Control
              </p>
            </div>
            <div className="flex flex-row gap-3 items-start w-fit md:w-96 ml-0 md:ml-10 mt-10">
              <div>
                <CheckCircle
                  sx={{ color: indigo["A100"] }}
                  className="h-8 w-8"
                />
              </div>

              <p>
                Minimizing Operational Costs, Simplifying the Recruitment
                Process, and Helping the Decision Making Process
              </p>
            </div>
            <div className="flex flex-row gap-3 items-start w-fit md:w-96 ml-0 md:ml-20 mt-10">
              <div>
                <CheckCircle
                  sx={{ color: indigo["A100"] }}
                  className="h-8 w-8"
                />
              </div>

              <p>
                Reducing Human Errors, Ease of Accessing Data, and Increasing
                Employee Satisfaction
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img src={lp2} />
          </div>
        </div>
      </div>

      <div className="p-5 pt-10 space-y-5 mt-20">
        <p className=" text-xl md:text-3xl text-[#003049] text-center font-bold">
          Many Companies Use HRIS Software
        </p>
        <div className="flex flex-wrap justify-center md:justify-center md:gap-20 gap-10 md:mx-20">
          <img src={c1} />
          <img src={c2} />
          <img src={c3} />
          <img src={c4} />
          <img src={c5} />
          <img src={c6} />
          <img src={c7} />
          <img src={c8} />
        </div>
      </div>
      <div
        className="px-5 pt-5 space-y-20 md:px-20 min-h-screen bg-cover bg-bottom"
        style={{ backgroundImage: `url(${bg3})` }}
      >
        <div className="flex md:flex-row flex-col items-center">
          <div className="w-full md:w-1/2">
            <img src={lp3} />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-2 justify-center">
            <p className="text-[#003049] text-xl md:text-4xl font-bold leading-relaxed text-enter">
              Manage payroll & HR administration so much easier
            </p>
            <div className="flex flex-row items-start gap-3">
              <div>
                <CheckCircle
                  sx={{ color: indigo["A100"] }}
                  className="h-8 w-8"
                />
              </div>

              <p>Calculating overtime pay</p>
            </div>
            <div className="flex flex-row items-start gap-3">
              <div>
                <CheckCircle
                  sx={{ color: indigo["A100"] }}
                  className="h-8 w-8"
                />
              </div>

              <p>
                Calculating bonuses, religious festivity allowance, and fines
              </p>
            </div>
            <div className="flex flex-row items-start gap-3">
              <div>
                <CheckCircle
                  sx={{ color: indigo["A100"] }}
                  className="h-8 w-8"
                />
              </div>

              <p>Calculation of employee salaries and employee loans</p>
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
        <div className="grid md:grid-cols-3 grid-cols-1 justify-between gap-3 md:px-20">
          <div className="bg-white max-w-sm rounded-lg overflow-hidden shadow-md border">
            <div className="flex flex-col justify-between px-6 py-4 h-full">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-quote"
                  viewBox="0 0 16 16"
                >
                  <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
                </svg>
                <p className="text-gray-700 text-base text-center ps-3 pt-3">
                  As a human resources manager, I am constantly juggling a full
                  range of tasks and responsibilities. Humanusia platform has
                  saved my life by streamlining and automating many of my HR
                  processes. Humanusia platform has it all, from tracking
                  employee attendance and performance to managing benefits and
                  training. I am extremely grateful to have this tool at my
                  disposal and highly recommend it to anyone working in human
                  resources.
                </p>
              </div>
              <div className="flex flex-row gap-3 mt-3">
                <div className="basis-4/12 md:basis-2/12">
                  <img src={people1} alt="register" />
                </div>
                <div className="basis-8/12 md:basis-10/12">
                  <p className="text-sm">
                    <span className="font-bold">Dewi</span>
                    <br />
                    <span className="text-muted">HR and Human Capital</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white max-w-sm rounded-lg overflow-hidden shadow-md border">
            <div className="flex flex-col justify-between px-6 py-4 h-full">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-quote"
                  viewBox="0 0 16 16"
                >
                  <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
                </svg>
                <p className="text-gray-700 text-base text-center ps-3 pt-3">
                  Our HR department was bogged down by paperwork and manual
                  processes prior to implementing the HRIS platform. It was
                  time-consuming and error-prone, and we were always struggling
                  to meet the demand. However, since implementing the Humanusia,
                  everything has improved. Our team is more efficient and
                  productive, and we have significantly more time to devote to
                  strategic HR initiatives. I can't imagine going back to how
                  things were before.
                </p>
              </div>
              <div className="flex flex-row gap-3 mt-3">
                <div className="basis-4/12 md:basis-2/12">
                  <img src={people2} alt="register" />
                </div>
                <div className="basis-8/12 md:basis-10/12">
                  <p className="text-sm">
                    <span className="font-bold">Yudhistira</span>
                    <br />
                    <span className="text-muted">
                      HR Management Specialist{" "}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white max-w-sm rounded-lg overflow-hidden shadow-md border">
            <div className="flex flex-col justify-between px-6 py-4 h-full">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-quote"
                  viewBox="0 0 16 16"
                >
                  <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
                </svg>
                <p className="text-gray-700 text-base text-center ps-3 pt-3">
                  As an HR professional, I understand the importance of having
                  accurate and up-to-date information at your fingertips. In
                  this regard, the HRIS platform has exceeded my expectations by
                  providing me with a single source of truth for all of my HR
                  data. I can easily access employee records, manage benefits
                  and training, and track attendance and performance. The
                  platform is simple to use and intuitive, making it a joy to
                  work with. I wholeheartedly recommend it to any HR team
                  looking to boost efficiency and effectiveness.
                </p>
              </div>
              <div className="flex flex-row gap-3 mt-3">
                <div className="basis-4/12 md:basis-2/12">
                  <img src={people3} alt="register" />
                </div>
                <div className="basis-8/12 md:basis-10/12">
                  <p className="text-sm">
                    <span className="font-bold">Rizky</span>
                    <br />
                    <span className="text-muted">HR Senior Manager</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-5 py-28">
        <div className="flex flex-col-reverse md:flex-row items-center justify-around md:px-24 bg-center md:bg-no-repeat bg-repeat md:py-0 py-20"  style={{ backgroundImage: `url(${bg4})` }}>
          <div className="w-full md:w-1/2 space-y-5">
            <h1 className="text-[#780000] text-4xl font-bold">
              Get Started Now
            </h1>
            <p>
            Hello and welcome to our Humanusia! We are delighted to be able to offer you a comprehensive and user-friendly tool for managing all aspects of your HR processes.
            </p>
            <div className="w-fit">
              <Link
                to={"/register"}
                className="bg-[#0E5073] block py-2 px-3 text-white rounded-full hover:bg-[#003049] md:border-0 md:hover:text-white md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img src={lp4} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
