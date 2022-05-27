import { faSadCry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Error = () => {
  return (
    <section className="h-screen flex items-center justify-center">
        <div className="text-center">
            <FontAwesomeIcon icon={faSadCry} className="text-9xl text-secondary" />
            <h2 className="uppercase text-4xl mt-5">404 page not found!</h2>
        </div>
    </section>
  );
};

export default Error;
