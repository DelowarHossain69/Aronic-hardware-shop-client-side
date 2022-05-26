import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../../../firebase.init";
import Loading from "../../../shared/Loading/Loading";
import { useQuery } from "react-query";

const UpdateProduct = () => {
  const [user, loading] = useAuthState(auth);
  const { id } = useParams();

  const { data: product, isLoading } = useQuery(
    ["updateProduct", id, user],
    () =>
      fetch(`http://localhost:5000/product/${id}?email=${user?.email}`, {
        headers: {
          auth: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json())
  );

//   Handle update product
      const handleUpdate = e => {
        e.preventDefault();
        const name = e.target.name.value || product?.name;
        const price = e.target.price.value || product?.price;
        const maxQuantity = e.target.maxQuantity.value || product?.maxQuantity;
        const minQuantity = e.target.name.value || product?.minQuantity;
        const description = e.target.description.value || product?.description;
        const img = e.target.img.value || product?.img;

        const updatedProduct = {
            img,
            name,
            price,
            maxQuantity,
            minQuantity,
            description
        }

        console.log(updatedProduct)
      }

  if (loading || isLoading) {
    return <Loading />;
  }

  return (
    <section>
      <div class="hero py-5 bg-base-200 px-5">
        <div class="hero-content flex-col lg:flex-row-reverse items-start justify-between w-full">
          <div class="text-center lg:text-left flex-1">
            <div className="bg-white w-fit p-3 rounded">
              <img src={product?.img} className="rounded mb-2" alt="" />
              <h1 class="text-2xl font-bold mb-2">{product?.name}</h1>
              <h3 className="text-xl font-semibold mb-1">
                Price : {product?.price}
              </h3>
              <h3 className="text-xl font-semibold my-1">
                Available quantity : {product?.maxQuantity}
              </h3>
              <h3 className="text-xl font-semibold">
                Minimum order quantity : {product?.minQuantity}
              </h3>
              <p class="py-6">{product?.description}</p>
            </div>
          </div>
          <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 flex-1">
            <form action="" onSubmit={handleUpdate}>
                <h2 className="text-center font-bold text-2xl mt-3">Update Product</h2>
              <div class="card-body">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Product Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Product name "
                    class="input input-bordered"
                    name='name'
                  />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Price</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Price"
                    class="input input-bordered"
                    name='price'
                  />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Available quantity</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Available quantity"
                    class="input input-bordered"
                    name='maxQuantity'
                  />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Minimum order</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Minimum order"
                    class="input input-bordered"
                    name='minQuantity'
                  />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Photo URL</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Photo URL"
                    class="input input-bordered"
                    name='img'
                  />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Description</span>
                  </label>
                  <textarea class="textarea textarea-bordered w-full" placeholder="Description" name='description'></textarea>
                </div>


                <div class="form-control mt-6">
                  <button class="btn btn-secondary">Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateProduct;
