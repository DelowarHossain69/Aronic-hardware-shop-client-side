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
      

      <input type="checkbox" id="deleteOrder" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <h3 class="font-bold text-lg">
            {productName}
          </h3>

          <div class="modal-action">
            <label for="deleteOrder" class="btn" onClick={handleCancelOrder}>
              Delete
            </label>
            <label for="deleteOrder" class="btn">
                Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
