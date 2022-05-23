import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import "./BusinessSummery.css";

const BusenessSummery = () => {
    
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-24 gap-10 business-summery px-12 my-24 rounded">
      <div className="bg-[#dddddd3c] p-5 rounded flex items-center justify-center flex-col space-y-5 text-white cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class=" w-14"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <h3 className="text-4xl font-bold">750+</h3>
        <h3 className="text-2xl">Complete Projects</h3>
      </div>

      <div className="bg-[#dddddd3c] p-5 rounded flex items-center justify-center flex-col space-y-5 text-white cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class=" w-14"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <h3 className="text-4xl font-bold">750+</h3>
        <h3 className="text-2xl">Complete Projects</h3>
      </div>

      <div className="bg-[#dddddd3c] p-5 rounded flex items-center justify-center flex-col space-y-5 text-white cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class=" w-14"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <h3 className="text-4xl font-bold">750+</h3>
        <h3 className="text-2xl">Complete Projects</h3>
      </div>

      <div className="bg-[#dddddd3c] p-5 rounded flex items-center justify-center flex-col space-y-5 text-white cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class=" w-14"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <h3 className="text-4xl font-bold">750+</h3>
        <h3 className="text-2xl">Complete Projects</h3>
      </div>
    </section>
  );
};

export default BusenessSummery;
