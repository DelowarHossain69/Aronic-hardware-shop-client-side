import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../../../firebase.init";
import { useQuery } from "react-query";
import Loading from "../../../shared/Loading/Loading";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageOrders = () => {
  const [user, loading] = useAuthState(auth);

  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery(["manageAllOrders", user], () =>
    fetch(`https://protected-chamber-45180.herokuapp.com/manageOrders?email=${user?.email}`, {
      headers: {
        auth: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  function handelOrders(e, id) {
    const status = e.target.value;

    // update status
    const updateStatus = (updatedData) => {
      const url = `https://protected-chamber-45180.herokuapp.com/updateOrder?email=${user?.email}&id=${id}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          auth: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(updatedData),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result?.modifiedCount > 0) {
            Swal.fire({
              position: "top",
              icon: "success",
              title: "The status has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
        });
    };

    if (id && status === "shipped") {
      updateStatus({ status: "Shipped" });
    } else if (id && status === "delivered") {
      updateStatus({ status: "Delivered" });
    } else if (id && status === "pending") {
      updateStatus({ status: "Pending" });
    } else if (id && status === "cancel") {

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!",
      }).then((result) => {

        if (result.isConfirmed) {

          //   Action database
          const deleteURL = `https://protected-chamber-45180.herokuapp.com/orderCancel?email=${user?.email}&id=${id}`;
          fetch(deleteURL, {
            method: "DELETE",
            headers: {
              auth: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
            .then((res) => res.json())
            .then((deleted) => {

                if(deleted?.deletedCount > 0){
                    Swal.fire("Cancel!", "The order has been deleted.", "success");
                    refetch();
                }
            });
        }
      });
    }
  }

  if (loading || isLoading) {
    return <Loading />;
  }

  return (
    <section>
      <h2 className="text-xl mb-3">Manage Orders</h2>

      <div className="overflow-x-auto">
        <table className="table w-full text-center">
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
                  <select
                    className="select select-bordered w-full max-w-xs"
                    onChange={(e) => handelOrders(e, order._id)}
                  >
                    <option disabled selected>
                      Action
                    </option>

                    <option
                      value="shipped"
                      disabled={order?.status === "Shipped" || !order?.paid}
                    >
                      Shipped
                    </option>

                    <option
                      value="pending"
                      disabled={order?.status === "Pending"}
                    >
                      {order?.status === "Pending" ? 'Pending (already)' : 'Pending'}
                    </option>

                    <option value="delivered" disabled={!order?.paid}>
                      Delivered {!order?.paid && "(unpaid)"}
                    </option>

                    <option value="cancel" disabled={order?.paid}>
                      Cancel {order?.paid && "(paid)"}
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

export default ManageOrders;
