import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../../firebase.init';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Loading/Loading';

const RequireAuth = ({children}) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();


    if(loading){
        return <Loading />
    }

    if(! user){
       <Navigate to='/login' state={{from : location}} replace /> 
    }

    return children;
};

export default RequireAuth;