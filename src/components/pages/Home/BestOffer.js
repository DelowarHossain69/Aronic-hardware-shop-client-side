import React from "react";

const BestOffer = () => {
  return (
    <div>
      <div class="hero min-h-screen">
        <div class="hero-content flex-col lg:flex-row">
          <div className="flex-1 flex justify-center">
          <img
            src="https://i.ibb.co/F4wVYqT/offer.webp"
            class="max-w-sm rounded-lg shadow-2xl" alt=""
          />
          </div>
          <div className="flex-1">
            <h1 class="text-5xl font-bold">Best Offer Today</h1>
            <p class="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button class="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestOffer;
