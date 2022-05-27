import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import Loading from "../../shared/Loading/Loading";
import auth from "./../../../firebase.init";
import useToken from './../../../hooks/useToken';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const LoginWithGoogle = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/';

  const [token] = useToken(user);

  if(loading){
      return <Loading />
  }

  if(token){
    navigate(from, {replace : true});
}
  return (
    <div>
      <div className="divider">OR</div>
      <button className="btn bg-[#ddd] hover:bg-[#bab3b3] text-black w-full border-0" onClick={()=> signInWithGoogle()}>
        <img
          src="https://i.ibb.co/5xfQpxz/google.png"
          className=" w-7 mr-3"
          alt=""
        />
        Continue with google
      </button>
      
      <p className="mt-3 text-red-500">{error && error.message}</p>
    </div>
  );
};

export default LoginWithGoogle;
