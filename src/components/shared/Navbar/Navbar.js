import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "./../../../firebase.init";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faUser } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const defaultImage = `https://i.ibb.co/Z6Sh6Vj/admin-user-icon-24.png`;
  const menus = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/products">Products</Link>
      </li>
      <li>
        <Link to="/protfolio">Portfolio</Link>
      </li>
      <li>
        <Link to="/blog">Blog</Link>
      </li>
      {!user && (
        <li>
          <Link to="/login">login</Link>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar bg-slate-100 px-2">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 uppercase"
          >
            {menus}
          </ul>
        </div>
        <Link to="/">
          <img src="https://i.ibb.co/Gcyxt8j/logo.webp" alt="" />
        </Link>
      </div>

      <div className="navbar-end">
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal p-0 uppercase">{menus}</ul>
        </div>
    {/* When a user login  */}
        {user && (
          <div className="dropdown dropdown-end">
            <label tabIndex="1" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {
                  <img
                    src={user?.photoURL || defaultImage}
                    alt="user"
                    className=" bg-gray-400"
                  />
                }
              </div>
            </label>
            <ul
              tabIndex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <img
                src={user?.photoURL || defaultImage}
                className=" w-24 mx-auto bg-slate-400 rounded-full mb-2"
                alt=""
              />
              <h3 className="text-center font-bold mb-3">
                {user?.displayName}
              </h3>
  
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/products">All products</Link>
              </li>
              <li>
                <button onClick={() => signOut(auth)}>Log out</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
