import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "../../shared/Loading/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../../firebase.init";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51L2GiKA5NiZMUTJ42BNhcx2ATOkpZ6GKYw73nNQQj1eMEc08E9pYzCGX2vvw8evoFztJuICCsOo52Z65lMxZdG2y0068ovf5xd"
);

const Payment = () => {
  const [user, loading] = useAuthState(auth);
  const { id } = useParams();

  const { data: product, isLoading } = useQuery(["purcheseProduct", id], () =>
    axios
      .get(`http://localhost:5000/orderDetails?email=${user?.email}&id=${id}`, {
        headers: {
          auth: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((data) => data.data)
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="">
      <div className="card bg-base-100 shadow-xl w-fit ">
        <figure>
          <img src={product?.productImg} alt={product?.productName} className='h-96' />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product?.productName}</h2>
          <h2>Price : ${product?.price}</h2>
          <h2>Quantity : {product?.quantity}</h2>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl rounded w-96 mt-6 p-4">
        <h2 className="text-xl mb-5 text-center font-bold">Please Payment</h2>
        <div className="">
          <Elements stripe={stripePromise}>
            <CheckoutForm product={product} />
          </Elements>
        </div>
      </div>
    </section>
  );
};

export default Payment;
