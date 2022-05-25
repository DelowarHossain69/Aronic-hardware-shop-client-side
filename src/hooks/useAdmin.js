import { useState, useEffect } from "react";

const useAdmin = (user) => {
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/isAdmin?email=${user?.email}`, {
        headers : {
            auth : `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
        .then((res) => res.json())
        .then((admin) => {
            setAdmin(admin.isAdmin)
            console.log(admin);
        });
    }
  }, [user]);
  return [isAdmin];
};

export default useAdmin;
