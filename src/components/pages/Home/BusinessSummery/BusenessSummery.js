import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faPeopleRobbery, faMessage, faPeopleCarryBox, } from "@fortawesome/free-solid-svg-icons";
import "./BusinessSummery.css";

const BusenessSummery = () => {
    
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-24 gap-10 business-summery px-12 my-24 rounded">

      <div className="p-5 rounded flex items-center justify-center flex-col space-y-5 text-white cursor-pointer hover:translate-y-[-10px] transition-all duration-500 hover:bg-[#dddddd3c] hover:border-2 border-2">
      <FontAwesomeIcon icon={faPeopleCarryBox} className="text-6xl text-[#f86217]" />
        <h3 className="text-4xl font-bold">750+</h3>
        <h3 className="text-xl uppercase">Complete Projects</h3>
      </div>

      <div className="p-5 rounded flex items-center justify-center flex-col space-y-5 text-white cursor-pointer hover:translate-y-[-10px] transition-all duration-500 hover:bg-[#dddddd3c] hover:border-2 border-2">
      <FontAwesomeIcon icon={faTrophy} className="text-6xl text-[#f86217]" />
        <h3 className="text-4xl font-bold">85+</h3>
        <h3 className="text-xl uppercase">Award</h3>
      </div>

      <div className="p-5 rounded flex items-center justify-center flex-col space-y-5 text-white cursor-pointer hover:translate-y-[-10px] transition-all duration-500 hover:bg-[#dddddd3c] hover:border-2 border-2">
      <FontAwesomeIcon icon={faPeopleRobbery} className="text-6xl text-[#f86217]" />
        <h3 className="text-4xl font-bold">5000+</h3>
        <h3 className="text-xl uppercase">Happy clients</h3>
      </div>

      <div className="p-5 rounded flex items-center justify-center flex-col space-y-5 text-white cursor-pointer hover:translate-y-[-10px] transition-all duration-500 hover:bg-[#dddddd3c] hover:border-2 border-2">
      <FontAwesomeIcon icon={faMessage} className="text-6xl text-[#f86217]" />
        <h3 className="text-4xl font-bold">300+</h3>
        <h3 className="text-xl uppercase">Feedback</h3>
      </div>

    </section>
  );
};

export default BusenessSummery;
