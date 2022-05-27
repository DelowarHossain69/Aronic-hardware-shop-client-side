import React from "react";
import { Link } from "react-router-dom";

const ProductCart = ({product}) => {
    const {name, price, description, img, maxQuantity, minQuantity, _id} = product;
  return (
    <div className="card bg-base-100 shadow-xl md:hover:translate-y-[-10px] transition-all duration-500 hover:translate-y-0">
      <figure className="px-5 pt-10">
        <img
          src={img}
          alt="tools"
          className="rounded-xl object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-bold text-3xl">{name}</h2>
        <div className=" space-y-2">
            <h3 className="text-2xl font-bold">Price : $ {price} <span className="text-primary text-lg font-bold">/peace</span></h3>
            <h4 className="font-bold text-lg">Minimum order quantity : {minQuantity}</h4>
            <h4 className="font-bold text-lg">Available quantity : {maxQuantity}</h4>
        </div>
        <p>
            {description?.length > 200 ? description.slice(0, 200) : description}
            {description?.length > 200 && ' ....'}
        </p>
        <div className="card-actions mt-3">
            <Link to={`/purchese/${_id}`} className="block w-full">
              <button className="btn btn-secondary w-full text-lg hover:bg-transparent hover:text-secondary">Place order</button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
