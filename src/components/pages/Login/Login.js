import React from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginWithGoogle from "./LoginWithGoogle";
import auth from "./../../../firebase.init";
import useToken from './../../../hooks/useToken';
import Loading from "../../shared/Loading/Loading";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, loginError] =
    useSignInWithEmailAndPassword(auth);    
  const [token] = useToken(user);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  if(loading){
      return <Loading />
  }

  if(token){
      navigate(from, {replace : true});
  }

  return (
    <section className="my-24">
      <div className="card w-full md:w-96 bg-base-100 shadow-xl mx-auto">
        <div className="card-body">
          <h2 className="text-3xl text-center font-bold mb-3">Login</h2>
          <form
            action=""
            className="space-y-2"
            onSubmit={handleSubmit(onSubmit)}
          >
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

            <button className="btn btn-secondary w-full">Login</button>
          </form>

          <p className="mt-3">
            Need an account?
            <strong>
              <Link to="/register"> register</Link>
            </strong>
          </p>

          <p className="mt-3 font-bold">
            <Link to="/forget-password">Forget password?</Link>
          </p>

          <LoginWithGoogle />

          <p className="mt-3 text-red-500">{loginError && loginError.message}</p>
        </div>
      </div>
    </section>
  );
};

export default Login;
