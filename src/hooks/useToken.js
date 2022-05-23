import { useState, useEffect } from 'react';

const useToken = (user) => {
    const [token, setToken] = useState('');
    const email = user?.user?.email;
    console.log(user, email);
   useEffect(()=>{
       
    if(email){
        fetch('http://localhost:5000/user', {
        method : 'PUT',
        headers : {
            'content-type' : 'application/json'
        },
        body: JSON.stringify({
            email : user?.user?.email,
            name : user?.user?.displayName,
        })
      })
      .then(res => res.json())
      .then(data => {
        if(data.success){
            setToken(data.accessToken);
            localStorage.setItem('accessToken', data.accessToken);
        }
      });
    }

   }, [user, email]);

    return [token];
};

export default useToken;