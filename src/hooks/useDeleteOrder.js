import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../firebase.init";
import Loading from "../components/shared/Loading/Loading";

const useDeleteOrder = (order) => {
  const [user, loading] = useAuthState(auth);
  const [deleted, setDeleted] = useState(false);
  const { _id } = order;

  if (loading) {
    return <Loading />;
  }

  if (_id) {
    fetch(`http://localhost:5000/order?email=${user?.email}&id=${_id}`, {
      method: "DELETE",
      headers: {
        auth: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setDeleted(true);
        }
      });
  }
  return [deleted];
};

export default useDeleteOrder;
