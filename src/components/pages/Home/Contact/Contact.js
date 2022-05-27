import React from "react";
import Swal from "sweetalert2";

const Contact = () => {
  const handleContact = e => {
    e.preventDefault();
    const email = e.target.email.value;

    if(email){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Information has been submitted',
        showConfirmButton: false,
        timer: 1500
      })
    }

  }
  return (
    <section className="my-12">
      <h2 className="font-bold text-center mb-10 text-3xl">CONTACT US</h2>
      <div className="flex flex-col-reverse lg:flex-row items-stretch">
        <div className="flex-1">
          <form action="" className="bg-white p-5 rounded-lg space-y-5" onSubmit={handleContact}>
            <input
              type="Name"
              placeholder="Enter your name"
              className="input input-bordered w-full"
              name='name'
              required
            />
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              name='email'
              required
            />
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Your message"
              name='message'
              required
            ></textarea>

            <div className="text-center">
              <button className="btn btn-secondary w-full md:w-3/6">Submit</button>
            </div>
          </form>
        </div>

        <div className="flex-1">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116747.03036132448!2d90.19132949928661!3d23.87739268145876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755ebd3d6df9569%3A0x277b3819d4da3e91!2sSavar%20Union!5e0!3m2!1sen!2sbd!4v1653649101130!5m2!1sen!2sbd" height="320" className="border-0 w-full" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="contact us"></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
