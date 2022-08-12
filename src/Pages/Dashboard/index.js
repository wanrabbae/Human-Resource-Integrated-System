import React from "react";
import Sidebar from "../../Components/Sidebar";

function Dashboard() {
  return (
    <div className="bg-gray-100">
      <aside class="w-3/12 fixed top-0 left-0 right-0 z-10" aria-label="Sidebar">
        <Sidebar/>
      </aside>
      <div className="ml-auto h-screen w-9/12 p-5 space-y-5">
        
      </div>
    </div>
  );
}

export default Dashboard;
