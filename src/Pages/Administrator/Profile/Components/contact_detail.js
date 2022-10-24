import { Button } from "react-bootstrap";
import Select from "react-select";

function ContactDetail({ data }) {
  const provinces = ["Jawa Tengah", "Jawa Barat", "Jawa Timur", "DKI Jakarta"];
  const countries = ["Indonesia", "Malaysia", "Arab", "Jepang", "Korea"];
  return (
    <>
      <div>
        <div className="mb-4">
          <span style={{ fontWeight: "600" }}>Contact Detail</span>
        </div>
        <form>
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Street <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                value={data?.employee?.street}
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                City <span style={{ color: "#780000" }}>*</span>
              </label>
              <input
                // value="Banyumas"
                value={data?.employee?.city}
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
              />
            </div>
          </div>
          <hr style={{ backgroundColor: "#CACACA" }} className="mb-4"></hr>
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Province
              </label>
              <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                <option className="py-3" hidden>
                  Select
                </option>
                {provinces.map((val) => (
                  <option
                    className="py-3"
                    selected={data?.employee?.province === val ? true : false}
                  >
                    {val}
                  </option>
                ))}
                {/* <option className="py-3" selected>
                  Jawa Tengah
                </option>
                <option className="py-3">Jawa Barat</option>
                <option className="py-3">Jawa Timut</option>
                <option className="py-3">DKI Jakarta</option> */}
              </select>
            </div>
            <div className="col-3">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Zip/ Postal Code
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                value={data?.employee?.postalCode}
                type="text"
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Country
              </label>
              <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline">
                <option className="py-3" hidden>
                  Select
                </option>
                {countries.map((val) => (
                  <option
                    className="py-3"
                    selected={data?.employee?.country === val ? true : false}
                  >
                    {val}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <hr style={{ backgroundColor: "#CACACA" }} className="mb-4"></hr>
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Telephone
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="username"
                type="text"
                value={data?.employee?.phone}
                placeholder="ex: (123) 445566"
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Mobile
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                placeholder="ex : 0812xxxxxxxx"
                id="username"
                type="text"
                value={data?.employee?.mobilePhone}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Email
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                id="email"
                type="text"
                placeholder="ex : vinahaha@gmail.com"
                value={data?.employee?.email}
              />
            </div>
            <div className="col">
              <label
                className="block text-gray-700 text-sm mb-2"
                for="username"
              >
                Other Email
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-0 focus:shadow-outline"
                placeholder="another email"
                id="username"
                type="text"
                value={data?.employee?.otherEmail}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end mt-4">
            <Button
              style={{
                border: "none",
                fontSize: "14px",
                backgroundColor: "#0E5073",
                color: "#FFFFFF",
              }}
              className="px-4"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
export default ContactDetail;
