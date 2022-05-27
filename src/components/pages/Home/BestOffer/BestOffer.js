import React from "react";
import { Link } from 'react-router-dom';

const BestOffer = () => {
  return (
    <section className="bg-white">
      <div className="hero py-24 my-12">
        <div className="hero-content flex-col lg:flex-row">
          <div className="flex-1 flex justify-center">
          <img
            src="https://i.ibb.co/F4wVYqT/offer.webp"
            className="rounded-lg " alt=""
          />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl font-bold">We Make All kind Of Tools</h1>
            <p className="py-6">
            A power tool is a tool that is actuated by an additional power source and mechanism other than the solely manual labor used with hand tools. The most common types of power tools use electric motors. Internal combustion engines and compressed air are also commonly used.
            </p>
            <Link to='/products'>
            <button className="btn btn-secondary hover:bg-transparent hover:text-secondary">Our Products</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestOffer;
