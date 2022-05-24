import React, { useState } from "react";
import { useQuery } from "react-query";
import auth from "../../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../../shared/Loading/Loading";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteModal from "./DeleteModal";

const Orders = () => {
  const [user, loading] = useAuthState(auth);
  const [deleteOrder, setDeleteOrder] = useState(null);

  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery(["myOrders", user], () =>
    fetch(`http://localhost:5000/orders?email=${user?.email}`, {
      headers: {
        auth: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading || loading) {
    return <Loading />;
  }
  // const {productName,quantity, paid, status, price, productImg} = orders;

  return (
    <section>
      {orders?.length > 0 && (
        <div class="overflow-x-auto">
          <table class="table w-full text-center">
            <thead>
              <tr>
                <th>#No.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Status</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, index) => (
                <tr key={order?._id}>
                  <td>{index + 1}</td>
                  <td>
                    {
                      <img
                        src={order?.productImg}
                        alt=""
                        className=" w-14 h-14 rounded-lg"
                      />
                    }
                  </td>
                  <td>{order?.productName}</td>
                  <td>{order?.status}</td>
                  <td>{order?.quantity}</td>
                  <td>${order?.price}</td>
                  <td>
                    {order?.paid ? (
                      <span className=" text-green-500 italic">Paid</span>
                    ) : (
                      <>
                        <button
                          className="btn btn-sm"
                          disabled={orders?.status === "cancel"}
                        >
                          Pay
                        </button>

                        <label for="deleteOrder" class="btn btn-sm ml-2 bg-red-500 modal-button" onClick={() => setDeleteOrder(order)}>Cancel</label>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {orders?.length == 0 && (
        <div className="flex justify-center items-center mt-24 flex-col">
          <h2 className="text-2xl">No orders available!</h2>
          <Link to="/products">
            <button className="btn btn-secondary mt-5">
              Continue shopping
            </button>
          </Link>
        </div>
      )}

      {/* Delete modal */}
      {deleteOrder && (
        <DeleteModal setDeleteOrder={setDeleteOrder} order={deleteOrder} refetch={refetch} user={user} />
      )}
    </section>
  );
};

export default Orders;
