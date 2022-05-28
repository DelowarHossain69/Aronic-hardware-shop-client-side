import { useEffect } from 'react';
import useAdmin from './../../../hooks/useAdmin';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../../firebase.init';
import Loading from '../Loading/Loading';
import { Navigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const RequireAdmin = ({children}) => {
    const [user, loading] = useAuthState(auth);
    const [isAdmin, adminLoading] = useAdmin(user);

    if(loading || adminLoading){
        return <Loading />
    }

// If user not available
    if(!user || !isAdmin){
        
        // Sign out the user
        signOut(auth);
        // remove token
        localStorage.removeItem('accessToken');

        return <Navigate to="/login" />
    }

    return children;
};

export default RequireAdmin;