import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "./../../../firebase.init";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faUser } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);
  console.log(user)
  const menus = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/products">Products</Link>
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
    <div class="navbar bg-slate-100 px-2">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabindex="0"
            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 uppercase"
          >
            {menus}
          </ul>
        </div>
        <Link to="/">
          <img src="https://i.ibb.co/Gcyxt8j/logo.webp" alt="" />
        </Link>
      </div>

      <div class="navbar-end">
        <div class="hidden lg:flex">
          <ul class="menu menu-horizontal p-0 uppercase">{menus}</ul>
        </div>

        {user && <div class="dropdown dropdown-end">
          <label tabindex="1" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              {
                <img src={user?.photoURL} alt="user" className=" bg-gray-400"/>
              }
            </div>
          </label>
          <ul
            tabindex="0"
            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <img src={user?.photoURL} className=" w-24 mx-auto bg-slate-400 rounded-full mb-2" alt="" />
            <h3 className="text-center font-bold mb-3">{user?.displayName}</h3>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
            <Link to="/products">All products</Link>
            </li>
            <li>
            <button onClick={()=> signOut(auth)}>Log out</button>
            </li>
          </ul>
        </div>}
      </div>
    </div>
  );
};

export default Navbar;