import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Swal from "sweetalert2";
import auth from "./../../../firebase.init";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Loading from "../../shared/Loading/Loading";

const CheckoutForm = ({ product }) => {
  const [user, loading] = useAuthState(auth);
  const { price, customer, email, _id, productImg } = product;
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();
  const [paymentLoading, setLoading] = useState(false);

  useEffect(() => {
    if (price) {
      fetch(
        `https://protected-chamber-45180.herokuapp.com/create-payment-intent?email=${user?.email}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            auth: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ price }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
        });
    }
  }, [price, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error?.message);
    } else {
      setCardError("");
    }

    if(loading || paymentLoading){
      return <Loading />
    }
    // confirm card payment
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: customer,
            email: email,
          },
        },
      });

    if (intentError) {
      setCardError(intentError?.message);
    } else {
      setCardError("");
      setLoading(true);

      // update data in database
      const transactionInfo = {
        paid: true,
        transactionId: paymentIntent?.id,
      };

      fetch(`https://protected-chamber-45180.herokuapp.com/update?email=${user?.email}&id=${_id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          auth: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(transactionInfo),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result?.modifiedCount > 0) {
            Swal.fire(
              "Your payment has been completed.",
              `Transaction id : ${paymentIntent?.id}`,
              "success"
            );

            setLoading(false);
          }
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="btn btn-secondary btn-sm mt-6"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>

      {cardError && <span>{cardError}</span>}
    </>
  );
};

export default CheckoutForm;
