import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import Loading from "../../shared/Loading/Loading";
import { toast } from 'react-toastify';

const AddReviews = () => {
  const [user, loading] = useAuthState(auth);
  const [ratingCount, setRatingCount] = useState(2);
  const [isLoading, setLoading] = useState(false);

  const handleComment = (e) => {
      e.preventDefault();
      setLoading(true);

      const name = user?.displayName;
      const img = user?.photoURL;
      const comment = e.target.comment.value;
      const rating = ratingCount;

      const ratingInfo = {
        name,
        img,
        comment,
        rating,
    }
    console.log(ratingInfo)

      fetch(`http://localhost:5000/rating?email=${user?.email}`, {
          method : 'POST',
          headers : {
              'content-type' : 'application/json',
              auth : `Bearer ${localStorage.getItem('accessToken')}`
          },
          body : JSON.stringify(ratingInfo)
      })
      .then(res => res.json())
      .then(data => {

        if(data.insertedId){
        setLoading(false);
        toast.success('Your comment has been added.');
        e.target.reset();
        }

      });
  };

  if (loading || isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="w-full md:w-1/2 mx-auto text-center py-10 shadow-xl p-5">
        <div>
          <img
            src={user?.photoURL}
            alt=""
            className=" w-28 mx-auto rounded-full mb-2"
          />
          <h1 className="font-bold mt-2 text-xl">{user?.displayName}</h1>
        </div>

        <form action="" onSubmit={handleComment}>
            
          <textarea
            className="textarea textarea-bordered w-full h-28 my-4 text-lg"
            name='comment'
            placeholder="Your comment"
            maxLength="250"
           autoFocus required></textarea>

            <h2 className="mb-3 font-bold text-lg">Double click to add ratings ({ratingCount} star)</h2>
          <div className="rating space-x-2">
          
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-orange-400"
              onClick={()=> setRatingCount(1)}
            />
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-orange-400"
              checked
              onClick={()=> setRatingCount(2)}
              
            />
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-orange-400"
              onClick={()=> setRatingCount(3)}
            />
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-orange-400"
              onClick={()=> setRatingCount(4)}
            />
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-orange-400"
              onClick={()=> setRatingCount(5)}
            />

          </div>

          <div className="mt-6 text-center">
            <button className="btn btn-secondary" disabled={! user}>Add Review</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviews;
