import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLineChart } from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet } from "react-router-dom";
import useAdmin from "./../../../hooks/useAdmin";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../../firebase.init";
import Loading from "../../shared/Loading/Loading";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const [isAdmin] = useAdmin(user);
  console.log('admin ', isAdmin);
  if (loading) {
    return <Loading />;
  }

  return (
    <section className="my-12">
      <div className="flex items-center ml-7">
        <label for="dashboard-sideBar" class="drawer-button lg:hidden">
          <FontAwesomeIcon
            icon={faLineChart}
            className=" py-1 btn btn-xs rounded"
          />
        </label>

        <h2 className="ml-2 text-2xl font-bold">Your Dashboard</h2>
      </div>

      <div class="drawer drawer-mobile">
        <input id="dashboard-sideBar" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          <Outlet />
        </div>
        <div class="drawer-side">
          <label for="dashboard-sideBar" class="drawer-overlay"></label>
          <ul class="menu p-4  w-80 bg-base-100 text-base-content">
            {isAdmin && (
              <>
                <li>
                  <Link to="/dashboard/">Manage Orders</Link>
                </li>
                <li>
                  <Link to="/dashboard/manageProducts">Manage Products</Link>
                </li>
                <li>
                  <Link to="/dashboard/addProduct">Add product</Link>
                </li>
                <li>
                  <Link to="/dashboard/users">All users</Link>
                </li>
              </>
            )}

            {!isAdmin && (
              <>
                <li>
                  <Link to="/dashboard/">Orders</Link>
                </li>
                <li>
                  <Link to="/dashboard/addReview">Add review</Link>
                </li>
              </>
            )}
            <li>
              <Link to="/dashboard/profile">My profile</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
