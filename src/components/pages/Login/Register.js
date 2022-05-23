import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import LoginWithGoogle from "./LoginWithGoogle";
import auth from "./../../../firebase.init";
import Loading from "../../shared/Loading/Loading";
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from "react-firebase-hooks/auth";

const Register = () => {
  const [createUserWithEmailAndPassword, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating] = useUpdateProfile(auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (loading) {
    return <Loading />;
  }

  const onSubmit = async (data) => {
      const userInfo = {
          name : data.name,
          email : data.email,
          role : 'user'
      }

      await createUserWithEmailAndPassword(data.email, data.password);
      await updateProfile({displayName: data.name});

      
  }

  return (
    <section className="my-24">
      <div class="card w-96 bg-base-100 shadow-xl mx-auto">
        <div class="card-body">
          <h2 class="text-3xl text-center font-bold mb-3">Register</h2>
          <form
            action=""
            className="space-y-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text font-bold">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name here..."
                class="input input-bordered w-full max-w-xs"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
              />
              <label class="label">
                {errors.name?.type === "required" && (
                  <span class="label-text-alt text-sm font-bold text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </label>
            </div>

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

            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text font-bold">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password here..."
                class="input input-bordered w-full max-w-xs"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  // pattern: {
                  //   value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                  //   message: "Please enter a valid email",
                  // },
                })}
              />
              <label class="label">
                {errors.password?.type === "required" && (
                  <span class="label-text-alt text-sm font-bold text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {/* {errors.email?.type === 'pattern' && <span class="label-text-alt text-sm font-bold">{errors.email.message}</span>} */}
              </label>
            </div>

            <button className="btn btn-secondary w-full">Register</button>
          </form>

          <Link to="/login" className="mt-3">
            Already have an account? <strong> Login</strong>
          </Link>

          <LoginWithGoogle />
        </div>
      </div>
    </section>
  );
};

export default Register;
