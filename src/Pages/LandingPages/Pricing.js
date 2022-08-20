import React from "react";
import lp2 from "../../Resourse/img/lp-2.png";
import c1 from "../../Resourse/img/client/1.png";
import c2 from "../../Resourse/img/client/2.png";
import Navbar from "../../Components/landingPages/Navbar";
import c3 from "../../Resourse/img/client/3.png";
import c4 from "../../Resourse/img/client/4.png";
import c5 from "../../Resourse/img/client/5.png";
import c6 from "../../Resourse/img/client/6.png";
import c7 from "../../Resourse/img/client/7.png";
import c8 from "../../Resourse/img/client/8.png";
import c9 from "../../Resourse/img/client/9.png";
import c10 from "../../Resourse/img/client/10.png";
import { CheckCircleIcon } from "@heroicons/react/solid";
import Footer from "../../Components/landingPages/Footer";

function Pricing() {
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </div>
      <div className="mx-5 pt-28 space-y-20">
        <div className="flex flex-row">
          <div className="w-1/2">
            <p className="text-[#780000] text-5xl font-bold leading-relaxed">
              We provide many features that help and make it easier for you
            </p>
          </div>
          <div className="w-1/2">
            <img src={lp2} />
          </div>
        </div>
      </div>

      <div className="bg-[#ECEEF6] p-5 mt-5 space-y-5">
        <div className="mb-5 mx-72">
          <div className="text-center">
            <p className="text-3xl text-[#003049] font-bold">Plan & Pricing</p>
            <p className="text-sm text-gray-400">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-3 justify-center">
          <div class="bg-white w-1/4 h-screen rounded-lg overflow-hidden shadow-md border">
            <div class="px-6 py-4 space-y-5">
              <h1 className="font-bold text-lg">Starter</h1>
              <p className="text-sm">Subscribtion for 6 months</p>
              <p className="font-bold">Rp 999.000 /Month</p>
              <p className="text-sm">
                Basic package for those of you who are just started the gym
              </p>
              <p className="text-sm">Free features</p>
              <div className="space-y-3">
                <div className="flex flex-row items-start gap-3 text-sm">
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
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Lorem ipsum dolor sit amet
                  </p>
                </div>
                <div className="flex flex-row items-start gap-3 text-sm">
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
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Lorem ipsum dolor sit amet
                  </p>
                </div>
                <div className="flex flex-row items-start gap-3 text-sm">
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
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Lorem ipsum dolor sit amet
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <a
                  href="#"
                  className="bg-[#0E5073] block py-2 px-3 text-white rounded-full hover:bg-[#003049] md:border-0 md:hover:text-white md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
          <div class="bg-[#CADAE8] w-1/4 h-screen rounded-lg overflow-hidden shadow-md border">
            <div class="px-6 py-4 space-y-5">
              <h1 className="font-bold text-lg">Premium</h1>
              <p className="text-sm">Subscribtion for 6 months</p>
              <p className="font-bold">Rp 1.999.000 /Month</p>
              <p className="text-sm">
                Basic package for those of you who are just started the gym
              </p>
              <p className="text-sm">Free features</p>
              <div className="space-y-3">
                <div className="flex flex-row items-start gap-3 text-sm">
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
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Lorem ipsum dolor sit amet
                  </p>
                </div>
                <div className="flex flex-row items-start gap-3 text-sm">
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
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Lorem ipsum dolor sit amet
                  </p>
                </div>
                <div className="flex flex-row items-start gap-3 text-sm">
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
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Lorem ipsum dolor sit amet
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <a
                  href="#"
                  className="bg-[#0E5073] block py-2 px-3 text-white rounded-full hover:bg-[#003049] md:border-0 md:hover:text-white md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-5 pt-28 space-y-20">
        <p className="text-3xl text-[#003049] font-bold text-center">
          Have Any Question?
          <br />
          Contact Us Now
        </p>
        <div className="flex flex-row">
          <div className="w-1/2 space-y-5">
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
              <div class="basis-10/12 flex flex-col gap-2">
                <p className="text-sm text-gray-400">Phone Number</p>
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
              <div class="basis-10/12 flex flex-col gap-2">
                <p className="text-sm text-gray-400">Email</p>
                <p>hello@upcareers.com</p>
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
              <div class="basis-10/12 flex flex-col gap-2">
                <p className="text-sm text-gray-400">Map Street</p>
                <p>8819 Ohio St. South Gate</p>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <form>
              <div class="mb-6">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your Full Name"
                  required=""
                />
              </div>
              <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    for="website"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Subject
                  </label>
                  <input
                    type="url"
                    id="website"
                    class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Subject"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="visitors"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    type="number"
                    id="visitors"
                    class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="email@example.com"
                    required=""
                  />
                </div>
              </div>
              <div class="mb-6">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write Your Message"
                  rows={4}
                  required=""
                ></textarea>
              </div>
              <button
                type="submit"
                class="bg-[#0E5073] block py-2 px-3 text-white text-sm rounded-lg hover:bg-[#003049] md:border-0 md:hover:text-white md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
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
