import React from "react";
import { Link } from "react-router-dom";

const ProductCart = ({product}) => {
    const {name, price, description, img, maxQuantity, minQuantity, _id} = product;
  return (
    <div class="card bg-base-100 shadow-xl">
      <figure class="px-5 pt-10">
        <img
          src={img}
          alt="tools"
          class="rounded-xl object-cover"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title font-bold text-3xl">{name}</h2>
        <div className=" space-y-2">
            <h3 className="text-2xl font-bold">Price : $ {price} <span className="text-primary text-lg font-bold">/peace</span></h3>
            <h4 className="font-bold text-lg">Minimum order quantity : {minQuantity}</h4>
            <h4 className="font-bold text-lg">Available quantity : {maxQuantity}</h4>
        </div>
        <p>
            {description?.length > 200 ? description.slice(0, 200) : description}
            {description?.length > 200 && ' ....'}
        </p>
        <div class="card-actions mt-3">
            <Link to={`/purchese/${_id}`} className="block w-full">
              <button class="btn btn-secondary w-full text-lg">Place order</button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
