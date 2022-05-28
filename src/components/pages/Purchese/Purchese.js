import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../../firebase.init";
import Loading from "../../shared/Loading/Loading";
import { toast } from "react-toastify";

const Purchese = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { name, price, description, img, maxQuantity, minQuantity, _id } =
    product;

  const [quantity, setQuantity] = useState(minQuantity);
  const [disaboldBtn, setDisabold] = useState(false);

  const handleProductQuantity = e => {
      const value = parseInt(e.target.value);
      const minimumQuantity = parseInt(minQuantity);
      const maximumQuantity = parseInt(maxQuantity);

      setQuantity(value);

      if(value >= minimumQuantity && value <= maximumQuantity){
        setDisabold(false);
      }
      else{
        setDisabold(true);
        console.log('order is not ok');
      }
  }
  
  useEffect(() => {
    const url = `https://protected-chamber-45180.herokuapp.com/product/${id}?email=${user?.email}`;
    fetch(url, {
      headers: {
        auth: `Bearer ${localStorage.getItem("accessToken")} `,
      },
    })
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id, user]);

  // Calculate order summery
  const productQuantity = quantity || minQuantity;
  const subTotal = price * productQuantity;
  const shipping = 5 * productQuantity;
  const total = subTotal + shipping;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const phone = e.target.phone.value;
    const shippingAddress = e.target.shippingAddress.value;

    const orderInfo = {
      productName: name,
      quantity: productQuantity,
      productId: _id,
      paid: false,
      email: user?.email,
      customer: user?.displayName,
      status: "Pending",
      price: total,
      phone,
      shippingAddress,
      productImg: img,
    };

    if (_id) {
      fetch(`https://protected-chamber-45180.herokuapp.com/order?email=${user?.email}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          auth: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(orderInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            toast.success("Your order have been complete. Continue shopping");
            navigate("/products");
          }
        });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-5 my-24 rounded space-x-8 space-y-8">
      <div className="col-span-3">
        <div className="hero min-h-screen bg-[#dddddd29] rounded shadow-xl">
          <div className="hero-content flex-col lg:flex-row space-x-5 items-start">
            <div className="lg:w-1/2">
              <img src={img} className="max-w-full rounded-lg " alt="product pic" />
            </div>
            <div className="lg:w-1/2 space-y-5">
              <h1 className="text-3xl mt-8 lg:mt-0">{name}</h1>
              <h2 className="text-2xl font-bold">
                Price : ${price}
                <strong className="text-[#cb7e26]"> /peace</strong>
              </h2>
              <h2 className="text-xl ">
                Available quantity : <strong>{maxQuantity} peace</strong>
              </h2>
              <h2 className="text-xl">
                Min order quantity : <strong>{minQuantity} peace</strong>
              </h2>

              <div>
                <h2 className="text-xl font-bold mt-8 mb-3">Order Summary</h2>
                <table>
                  <tr>
                    <td>Subtotal ({productQuantity} Items)</td>
                    <td> : $ {subTotal} </td>
                  </tr>
                  <tr>
                    <td>Shipping Fee</td>
                    <td>: $ {shipping}</td>
                  </tr>
                  <tr>
                    <td>Total: </td>
                    <td>: $ {total}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-xl">{description}</p>
        </div>
      </div>

      <div className="lg:col-span-2">
        <form
          action=""
          className="space-y-5 w-full  md:w-4/5 lg:max-w-full lg:w-full mx-auto shadow-lg p-5 rounded"
          onSubmit={handlePlaceOrder}
        >
          <h2 className="text-xl mb-3 font-bold">Shipping & Billing</h2>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text  text-lg">Your name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full text-lg"
              value={user?.displayName}
              disabled
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text  text-lg">Your Email</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full text-lg"
              value={user?.email}
              disabled
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text  text-lg">Product Quantity</span>
            </label>
            <input
              type="number"
              placeholder="Product quantity"
              className="input input-bordered w-full text-lg"
              onChange={handleProductQuantity}
              min={minQuantity}
              max={maxQuantity}
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text  text-lg">Phone*</span>
            </label>
            <input
              type="number"
              name="phone"
              placeholder="Phone"
              className="input input-bordered w-full text-lg"
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text  text-lg">Shipping address*</span>
            </label>
            <input
              type="text"
              name="shippingAddress"
              className="input input-bordered w-full text-lg"
              required
              placeholder="Your address"
            />
          </div>

          <button className="btn btn-secondary w-full" disabled={disaboldBtn}>Place order</button>
        </form>
      </div>
    </section>
  );
};

export default Purchese;
