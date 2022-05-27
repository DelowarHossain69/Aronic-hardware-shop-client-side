import React, { useState } from "react";
import { toast } from 'react-toastify';


const DeleteModal = ({ order, refetch, setDeleteOrder, user}) => {
  const {productName,quantity, paid, status, price, productImg, _id} = order;

  const handleCancelOrder = () => {
    fetch(`http://localhost:5000/order?email=${user?.email}&id=${_id}`, {
      method: "DELETE",
      headers: {
        auth: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          toast.success("Delete successful");
          refetch();
        } else {
          toast.error(" You can't delete");
        }
      });

      setDeleteOrder(null);
  };

  return (
    <div>
      

      <input type="checkbox" id="deleteOrder" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {productName}
          </h3>

          <div className="modal-action">
            <label htmlFor="deleteOrder" className="btn" onClick={handleCancelOrder}>
              Delete
            </label>
            <label htmlFor="deleteOrder" className="btn">
                Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
