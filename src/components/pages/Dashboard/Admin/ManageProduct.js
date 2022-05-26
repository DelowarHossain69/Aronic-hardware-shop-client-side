import React, { useEffect, useState } from "react";
import auth from "./../../../../firebase.init";
import { useQuery } from "react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../../../shared/Loading/Loading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ManageProduct = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery("getAllProducts", () =>
    fetch(`http://localhost:5000/products?email=${user?.email}`).then((res) =>
      res.json()
    )
  );

  const handleProduct = (e, product) => {
    const action = e.target.value;
    // Delete product;
    if (action === "delete") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          // confirm alert
          Swal.fire("Deleted!", "Your Product has been deleted.", "success");

          //   Action database
          fetch(
            `http://localhost:5000/product?email=${user?.email}&id=${product._id}`,
            {
              method: "DELETE",
              headers: {
                auth: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.deletedCount > 0) {
                refetch();
              }
            });
        }
      });
    } else if (action === "update") {
    }
  };

  if (loading || isLoading) {
    return <Loading />;
  }

  return (
    <section>
      <div class="overflow-x-auto">
        <table class="table w-full text-center">
          <thead>
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Available Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={product?.img}
                    alt=""
                    className="w-16 h-16 rounded"
                  />
                </td>
                <td>{product?.name}</td>
                <td>{product?.price}</td>
                <td>{product?.maxQuantity}</td>
                <td>
                  <select
                    class="select select-bordered w-18"
                    onChange={(e) => handleProduct(e, product)}
                  >
                    <option disabled selected>
                      Action
                    </option>
                    <option value="update">Update</option>
                    <option value="delete">Delete</option>
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

export default ManageProduct;
