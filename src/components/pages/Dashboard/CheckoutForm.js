import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Swal from "sweetalert2";
import auth from "./../../../firebase.init";

const CheckoutForm = ({ product }) => {
  const [user, loading] = useAuthState(auth);
  const { price, customer, email, _id, productImg } = product;
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (price) {
      fetch("http://localhost:5000/create-payment-intent", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ price }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
        });
    }
  }, [price]);

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

      // update data in database
      const transactionInfo = {
        paid: true,
        transactionId: paymentIntent?.id,
      };

      fetch(`http://localhost:5000/update?email=${user?.email}&id=${_id}`, {
        method: "PATCH",
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
              "question"
            );
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
