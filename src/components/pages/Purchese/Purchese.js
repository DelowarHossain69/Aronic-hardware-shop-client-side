import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../../firebase.init";
import Loading from "../../shared/Loading/Loading";

const Purchese = () => {
  const [user, loading] = useAuthState(auth);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { name, price, description, img, maxQuantity, minQuantity, _id } =
    product;
  const [quantity, setQuantity] = useState(minQuantity);

  useEffect(() => {
    const url = `http://localhost:5000/product/${id}?email=${user?.email}`;
    fetch(url, {
      headers: {
        auth: `Bearer ${localStorage.getItem("accessToken")} `,
      },
    })
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id, user]);

  const handleQuantity = (e) => {
    const quantity = e.target.value;
    setQuantity(quantity);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-5 my-24 rounded space-x-8 space-y-8">
      <div className="col-span-3">
        <div class="hero min-h-screen bg-[#dddddd29] rounded shadow-xl">
          <div class="hero-content flex-col lg:flex-row space-x-5 items-start">
            <div className="lg:w-1/2">
              <img
                src={img}
                class="max-w-full rounded-lg "
                alt="product pic"
              />
            </div>
            <div className="lg:w-1/2 space-y-5">
              <h1 class="text-3xl mt-8 lg:mt-0">{name}</h1>
              <h2 class="text-2xl font-bold">
                Price : ${price}
                <strong className="text-[#cb7e26]"> /peace</strong>
              </h2>
              <h2 class="text-xl ">
                Available quantity : <strong>{maxQuantity} peace</strong>
              </h2>
              <h2 class="text-xl">
                Min order quantity : <strong>{minQuantity} peace</strong>
              </h2>

              <form action="" onChange={handleQuantity}>
                <p>
                  Quantity :
                  <input
                    type="number"
                    placeholder="Quantity"
                    class="input input-bordered w-28 ml-3"
                    min={minQuantity}
                    value={quantity}
                  />
                </p>
              </form>

              <div>
                <h2 className="text-xl font-bold mt-8 mb-3">Order Summary</h2>
                <table>
                  <tr>
                    <td>Subtotal ({quantity || minQuantity} Items)</td>
                    <td> : $ {price * (quantity || minQuantity)} </td>
                  </tr>
                  <tr>
                    <td>Shipping Fee</td>
                    <td>: $ {5 * (quantity || minQuantity)} </td>
                  </tr>
                  <tr>
                    <td>Total: </td>
                    <td>
                      : ${" "}
                      {5 * (quantity || minQuantity) +
                        price * (quantity || minQuantity)}{" "}
                    </td>
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
        
        <form action="" className="space-y-5 w-full  md:w-4/5 lg:max-w-full lg:w-full mx-auto shadow-lg p-5 rounded">
        <h2 className="text-xl mb-3 font-bold">Shipping & Billing</h2>
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text  text-lg">Your name</span>
            </label>
            <input type="text" class="input input-bordered w-full text-lg" value={user?.displayName}  disabled/>
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text  text-lg">Your Email</span>
            </label>
            <input type="text" class="input input-bordered w-full text-lg" value={user?.email}  disabled/>
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text  text-lg">Phone*</span>
            </label>
            <input type="number" class="input input-bordered w-full text-lg" required />
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text  text-lg">Address*</span>
            </label>
            <input type="text" class="input input-bordered w-full text-lg" required placeholder="Your address"/>
          </div>
          
          <button className="btn btn-secondary w-full">Place order</button>
        </form>
      </div>
    </section>
  );
};

export default Purchese;
