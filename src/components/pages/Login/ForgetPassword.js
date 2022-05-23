import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <section className="my-24">
      <div class="card w-96 bg-base-100 shadow-xl mx-auto">
        <div class="card-body">
          <h2 class="text-3xl text-center font-bold mb-3">
            Reset Your Password
          </h2>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text font-bold">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email here..."
                class="input input-bordered w-full max-w-xs"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                    message: "Please enter a valid email",
                  },
                })}
              />
              <label class="label">
                {errors.email?.type === "required" && (
                  <span class="label-text-alt text-sm font-bold text-red-500">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span class="label-text-alt text-sm font-bold text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>

            <button className="btn btn-secondary w-full">Send email</button>
          </form>

          <p className="mt-3 font-bold flex items-center text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <Link to="/login"> Cancel forget password</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
