import React from "react";
import Swal from "sweetalert2";

const Subscribe = () => {
    const handleSubscribe = e => {
        e.preventDefault();
        const email = e.target.email.value;
        if(email){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your email has been submitted',
                showConfirmButton: false,
                timer: 1500
              })
        }
    }
  return (
    <section className="py-12 bg-secondary my-12 rounded-lg flex items-center justify-center">
      <div className="w-full lg:w-3/6 relative px-10 mx-auto">
        <form action="" onSubmit={handleSubscribe}>
          <input
            type="email"
            name='email'
            placeholder="Enter your email"
            class="input input-bordered w-full rounded-full"
            required
          />
          <button className="btn btn-primary absolute to-0 right-0 rounded-full">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Subscribe;
