import { useState, useEffect } from "react";

const useAdmin = (user) => {
  const [isAdmin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (user?.email) {
      fetch(`https://protected-chamber-45180.herokuapp.com/isAdmin?email=${user?.email}`, {
        headers : {
            auth : `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
        .then((res) => res.json())
        .then((admin) => {
            setAdmin(admin.isAdmin)
            setLoading(false)
        });
    }
  }, [user]);
  return [isAdmin, loading];
};

export default useAdmin;
