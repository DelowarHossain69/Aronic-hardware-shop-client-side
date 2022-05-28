import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../../../shared/Loading/Loading';
import auth from './../../../../firebase.init';
import { toast } from 'react-toastify';

const AddProduct = () => {
    const [user, loading] = useAuthState(auth)
    const [availableQuantity, setAvailableQuantity] = useState(1);
    const handleForm = e => {
        e.preventDefault();

        const info = e.target;
        const productInfo = {
            img : info.img.value,
            price : info.price.value,
            name : info.name.value,
            minQuantity : info.minQuantity.value,
            maxQuantity : info.maxQuantity.value,
            description : info.description.value,
        }

        // Action database
        fetch(`https://protected-chamber-45180.herokuapp.com/product?email=${user?.email}`, {
            method : "POST", 
            headers : {
                'content-type' : 'application/json',
                auth : `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(productInfo)
        })
        .then(res => res.json())
        .then(result => {
            if(result?.insertedId){
                toast.success("Product added successfully");
                e.target.reset();
            }
        })
    }

    if(loading){
        return <Loading />
    }
    return (
        <div>
            <form action="" className='w-full md:w-3/6 mx-auto  space-y-4 shadow-xl p-5 rounded' onSubmit={handleForm}>
                <h2 className='text-2xl text-center mb-4'>Add new Product</h2>

                <input type="text" name="name" placeholder="Product name" className="input input-bordered w-full" required/>

                <input type="number" name="price" placeholder="Price" className="input input-bordered w-full" required />

                <input type="number" name='maxQuantity' placeholder="Available quantity" className="input input-bordered w-full" onChange={(e)=> setAvailableQuantity(e.target.value)} required/>

                <input type="number" name='minQuantity' placeholder="Minimum orders" className="input input-bordered w-full" min='0' max={availableQuantity} required />

                <input type="text" name="img" placeholder="Product image" className="input input-bordered w-full" required/>

                <textarea className="textarea textarea-bordered w-full" placeholder="Description" name='description' required></textarea>

                <button className='btn btn-secondary w-full'>Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;