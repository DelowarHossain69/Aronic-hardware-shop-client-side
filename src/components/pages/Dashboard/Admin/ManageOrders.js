import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../../../firebase.init";
import { useQuery } from "react-query";
import Loading from "../../../shared/Loading/Loading";

const ManageOrders = () => {
  const [user, loading] = useAuthState(auth);

  const { data: orders, isLoading } = useQuery(["manageAllOrders", user], () =>
    fetch(`http://localhost:5000/manageOrders?email=${user?.email}`, {
      headers: {
        auth: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  function handelOrders(id) {
    
  }

  if (loading || isLoading) {
    return <Loading />;
  }

  return (
    <section>
      <h2 className="text-xl mb-3">Manage Orders</h2>

      <div class="overflow-x-auto">
        <table class="table w-full text-center">
          <thead>
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Quantity</th>
              <th>Order</th>
              <th>Customer</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={order?.productImg}
                    alt=""
                    className="w-16 h-16 rounded"
                  />
                </td>
                <td>{order?.quantity}</td>
                <td>{order?.productName}</td>
                <td>{order?.customer}</td>
                <td>{order?.paid ? "Paid" : "Unpaid"}</td>
                <td>{order?.status}</td>
                <td>
                  <select class="select select-bordered w-full max-w-xs" onChange={handelOrders}>
                    <option disabled selected>
                      Action
                    </option>
                    <option value='shipped'>Shipped</option>
                    <option value='delivered'>Delivered</option>
                    <option value='cancel' disabled={order?.paid}>Cancel</option>
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

export default ManageOrders;
