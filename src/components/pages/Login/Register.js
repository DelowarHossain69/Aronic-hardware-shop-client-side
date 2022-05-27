import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import LoginWithGoogle from "./LoginWithGoogle";
import auth from "./../../../firebase.init";
import Loading from "../../shared/Loading/Loading";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import useToken from "./../../../hooks/useToken";

const Register = () => {
  const [createUserWithEmailAndPassword, user, loading, registerError] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating] = useUpdateProfile(auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [token] = useToken(user);

  if (token) {
    navigate("/");
  }

  if (loading || updating) {
    return <Loading />;
  }


  const onSubmit = async (data) => {
    const userInfo = {
        displayName : data.name,
        photoURL : 'https://i.ibb.co/Z6Sh6Vj/admin-user-icon-24.png',
    }
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile(userInfo);
  };

  return (
    <section className="my-24">
      <div className="card w-96 bg-base-100 shadow-xl mx-auto">
        <div className="card-body">
          <h2 className="text-3xl text-center font-bold mb-3">Register</h2>
          <form
            action=""
            className="space-y-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-bold">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name here..."
                className="input input-bordered w-full max-w-xs"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
              />
              <label className="label">
                {errors.name?.type === "required" && (
                  <span className="label-text-alt text-sm font-bold text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </label>
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-bold">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email here..."
                className="input input-bordered w-full max-w-xs"
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
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-sm font-bold text-red-500">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-sm font-bold text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-bold">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password here..."
                className="input input-bordered w-full max-w-xs"
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
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-sm font-bold text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {/* {errors.email?.type === 'pattern' && <span className="label-text-alt text-sm font-bold">{errors.email.message}</span>} */}
              </label>
            </div>

            <button className="btn btn-secondary w-full">Register</button>
          </form>

          <Link to="/login" className="mt-3">
            Already have an account? <strong> Login</strong>
          </Link>

          <LoginWithGoogle />

          <p className="mt-3 text-red-500">{registerError && registerError.message}</p>
        </div>
      </div>
    </section>
  );
};

export default Register;
