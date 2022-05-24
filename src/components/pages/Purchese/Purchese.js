import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../../firebase.init';
import Loading from "../../shared/Loading/Loading";


const Purchese = () => {
    const [user, loading] = useAuthState(auth);
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const {name, img, description, } = product;
    
    useEffect(()=>{
        const url = `http://localhost:5000/product/${id}?email=${user?.email}`;
        fetch(url, {
            headers : {
                auth : `Bearer ${localStorage.getItem('accessToken')} `
            }
        })
        .then(res => res.json())
        .then(data => setProduct(data));
    }, [id, user]);

    if(loading){
        return <Loading />
    }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2">

        <div class="hero min-h-screen bg-base-200">
          <div class="hero-content flex-col lg:flex-row">
            <img
              src={img}
              class="max-w-sm rounded-lg shadow-2xl" alt="product pic"
            />
            <div>
              <h1 class="text-5xl font-bold">{name}</h1>
              <p class="py-6">{description}</p>
              <button class="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>

      <div className=" w-1/2">

      </div>
    </section>
  );
};

export default Purchese;
