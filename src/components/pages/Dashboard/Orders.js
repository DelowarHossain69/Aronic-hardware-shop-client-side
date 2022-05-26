import React, { useState } from "react";
import { useQuery } from "react-query";
import auth from "../../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../../shared/Loading/Loading";
import useDeleteOrder from './../../../hooks/useDeleteOrder';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)



const Orders = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [deleteOrder, setDeleteOrder] = useState({});
  const [deleted] = useDeleteOrder(deleteOrder); 

  
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
  
  if(deleted){
    refetch();
  }

  // Delete confirm alert;
  const handleDeleteOrder = (order) => {
    MySwal.fire({
      title: '<strong>Are you sure?</strong>',
      icon: 'question',
      html:
        `<h2>${order?.productName}</h2>
          <h3>Price : $${order?.price} </h3>
          <h3>Quantity : ${order?.quantity} </h3>
        `,

      isConfirmed: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Delete',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        '<i class="fa fa-thumbs-down">Cancel</i>',
      cancelButtonAriaLabel: 'Thumbs down'
    })
    .then(res => {
      if(res.isConfirmed){
        setDeleteOrder(order);
      }
    });

  }

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
                          onClick={()=> navigate(`payment/${order?._id}`)}
                        >Pay </button>

                        <button  class="btn btn-sm ml-2 bg-red-500 modal-button" onClick={()=> handleDeleteOrder(order)}>Cancel</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {orders?.length === 0 && (
        <div className="flex justify-center items-center mt-24 flex-col">
          <h2 className="text-2xl">No orders available!</h2>
          <Link to="/products">
            <button className="btn btn-secondary mt-5">
              Continue shopping
            </button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default Orders;
