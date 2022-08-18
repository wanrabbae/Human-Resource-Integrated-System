import { React, useState } from "react";

function DetailReport() {
  return (
    <>
      <div className="space-y-5">
        <div className="bg-white p-3 rounded-lg">
          <div>
            <h1 className="font-bold">Personal</h1>
            <div className="mt-4 grid grid-cols-3 gap-3 items-center text-xs">
              <p>Employee Full Name</p>
              <p className="col-span-2">: Fakhri</p>
              <p>Employee ID</p>
              <p className="col-span-2">: 12345</p>
              <p>Birth of Date</p>
              <p className="col-span-2">: 22-06-1999</p>
              <p>Gender</p>
              <p className="col-span-2">: Male</p>
              <p>Nationality</p>
              <p className="col-span-2">: Indonesia</p>
              <p>Drive’s License Number</p>
              <p className="col-span-2">: 92142144444</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg">
          <div>
            <h1 className="font-bold">Contact Details</h1>
            <div className="mt-4 grid grid-cols-3 gap-3 items-center text-xs">
              <p>Address</p>
              <p className="col-span-2">
                : Karangklesem, Puri Hijau, No. 18, Purwokerto, Central Java,
                Postal Code 53144, Indonesia
              </p>
              <p>Telephone</p>
              <p className="col-span-2">: (123) 654789</p>
              <p>Mobile</p>
              <p className="col-span-2">: 081325679843</p>
              <p>Email</p>
              <p className="col-span-2">: Fakhriazmi@gmail.com</p>
              <p>Other Email</p>
              <p className="col-span-2">: -</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg">
          <div>
            <h1 className="font-bold">Emergency Contact</h1>
            <div className="mt-4 grid grid-cols-3 gap-3 items-center text-xs">
              <p>Name</p>
              <p className="col-span-2">
                : Putri Delina
              </p>
              <p>Relationship</p>
              <p className="col-span-2">: Wife</p>
              <p>Telephone</p>
              <p className="col-span-2">: (123) 654789</p>
              <p>Mobile</p>
              <p className="col-span-2">: 081344576891</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailReport;
