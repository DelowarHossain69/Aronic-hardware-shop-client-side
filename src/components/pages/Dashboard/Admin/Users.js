import React, { useState } from "react";
import { useQuery } from "react-query";
import Loading from "../../../shared/Loading/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../../../firebase.init";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Users = () => {
  const MySwal = withReactContent(Swal);
  const defaultImage = 'https://i.ibb.co/Z6Sh6Vj/admin-user-icon-24.png';
  const [user, loading] = useAuthState(auth);
  // Load users
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("allUser", () =>
    fetch(`http://localhost:5000/allUser?email=${user?.email}`, {
        headers : {
            auth : `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then((res) => res.json())
  );

  console.log(users);

  const handleAdmin = async (info, e) => {
    console.log(e.target.value);

    if (e.target.value === "makeAdmin") {
      MySwal.fire({
        title: "Do you want to make admin?",
        html: `
                <h1>Name : ${info?.name}</h1>
                <h2>Email : ${info?.email}</h2>
            `,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Make admin",
      }).then((result) => {
        if (result.isConfirmed) {
          MySwal.fire("Successful!", "Admin create successful", "success");

          //   action database
          fetch(
            `http://localhost:5000/admin?email=${user?.email}&id=${info._id}`,
            {
              method: "PUT",
              headers: {
                auth: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          )
            .then((res) => res.json())
            .then((result) => {
              if (result.modifiedCount) {
                refetch();
              }
            });
        }
      });
    } else if (e.target.value === "removeUser") {
      // Delete user
      MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          MySwal.fire("Deleted!", "The user has been deleted.", "success");
        }

        // Action database
        fetch(
          `http://localhost:5000/user?email=${user?.email}&id=${info._id}`,
          {
            method: "DELETE",
            headers: {
              auth: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
          .then((res) => res.json())
          .then((result) => {
            if (result.deletedCount > 0) {
              refetch();
            }
          });
      });
    }
  };

  if (isLoading || loading) {
    return <Loading />;
  }

  return (
    <section>
      <h2 className="text-2xl mb-3">All user</h2>

      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>No.</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((info, index) => (
              <tr key={info._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={info?.image || defaultImage}
                    alt=""
                    className="w-14 rounded-full border-2"
                  />
                </td>
                <td>{info?.name}</td>
                <td>{info?.email}</td>
                <td>{info?.role === "Admin" ? "Admin" : "User"}</td>

                <td>
                  <select
                    class="select select-bordered w-28"
                    onChange={(e) => handleAdmin(info, e)}
                  >
                    <option disabled selected>
                      Action
                    </option>
                    <option value="removeUser">Remove</option>
                    <option value="viewDetails">View</option>
                    <option value="makeAdmin" disabled={info?.role === "Admin"}>
                      Admin
                    </option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Users;
