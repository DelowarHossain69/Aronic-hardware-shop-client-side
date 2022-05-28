import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../../../firebase.init";
import Loading from "../../../shared/Loading/Loading";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

const UpdateProduct = () => {
    const [availableQuantity, setAvailableQuantity] = useState(0);
  const [user, loading] = useAuthState(auth);
  const { id } = useParams();
    console.log(availableQuantity);
  const { data: product, isLoading, refetch } = useQuery(
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
        const minQuantity = e.target.minQuantity.value || product?.minQuantity;
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

        // Action database
        const url = `http://localhost:5000/product/${product._id}?email=${user?.email}`;
        fetch(url, {
            method : 'PUT',
            headers: {
                'content-type' : 'application/json',
                auth: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body : JSON.stringify(updatedProduct)
        })
        .then(res => res.json())
        .then(result => {
            if(result.modifiedCount){
                toast.success('The product has been updated');
                refetch();
                e.target.reset();
            }
        });
      }

  if (loading || isLoading) {
    return <Loading />;
  }

  return (
    <section>
      <div className="hero py-5 bg-base-200 px-5">
        <div className="hero-content flex-col lg:flex-row-reverse items-start justify-between w-full">
          <div className="text-center lg:text-left flex-1">
            <div className="bg-white w-fit p-3 rounded">
              <img src={product?.img} className="rounded mb-2" alt="" />
              <h1 className="text-2xl font-bold mb-2">{product?.name}</h1>
              <h3 className="text-xl font-semibold mb-1">
                Price : {product?.price}
              </h3>
              <h3 className="text-xl font-semibold my-1">
                Available quantity : {product?.maxQuantity}
              </h3>
              <h3 className="text-xl font-semibold">
                Minimum order quantity : {product?.minQuantity}
              </h3>
              <p className="py-6">{product?.description}</p>
            </div>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 flex-1">
            <form action="" onSubmit={handleUpdate}>
                <h2 className="text-center font-bold text-2xl mt-3">Update Product</h2>
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Product Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Product name "
                    className="input input-bordered"
                    name='name'
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Price"
                    className="input input-bordered"
                    name='price'
                    min='0'
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Available quantity</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Available quantity"
                    className="input input-bordered"
                    name='maxQuantity'
                    min='0'
                    onChange={(e)=> setAvailableQuantity(e.target.value)}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Minimum order</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Minimum order"
                    className="input input-bordered"
                    name='minQuantity'
                    max={availableQuantity}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Photo URL"
                    className="input input-bordered"
                    name='img'
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea className="textarea textarea-bordered w-full" placeholder="Description" name='description'></textarea>
                </div>


                <div className="form-control mt-6">
                  <button className="btn btn-secondary">Update</button>
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
