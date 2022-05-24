import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLineChart } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  return (
    <section className="my-12">
      <div className="flex items-center ml-7">
        <label
          for="dashboard-sideBar"
          class="drawer-button lg:hidden"
        >
            <FontAwesomeIcon
          icon={faLineChart}
          className=" py-1 btn btn-xs rounded"
        />
        </label>
        
        <h2 className="ml-2 text-2xl font-bold">Your Dashboard</h2>
      </div>

      <div class="drawer drawer-mobile">
        <input id="dashboard-sideBar" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col items-center justify-center">
          sass
        </div>
        <div class="drawer-side">
          <label for="dashboard-sideBar" class="drawer-overlay"></label>
          <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
