import React from 'react';

const AddProduct = () => {
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

        console.log(productInfo);
    }
    return (
        <div>
            <form action="" className='w-full md:w-3/6 mx-auto  space-y-4 shadow-xl p-5 rounded' onSubmit={handleForm}>
                <h2 className='text-2xl text-center mb-4'>Add new Product</h2>

                <input type="text" name="name" placeholder="Product name" class="input input-bordered w-full" />

                <input type="number" name="price" placeholder="Price" class="input input-bordered w-full" />

                <input type="number" name='maxQuantity' placeholder="Available quantity" class="input input-bordered w-full" />

                <input type="number" name='minQuantity' placeholder="Minimum orders" class="input input-bordered w-full" />

                <input type="text" name="img" placeholder="Product image" class="input input-bordered w-full" />

                <textarea class="textarea textarea-bordered w-full" placeholder="Description" name='description'></textarea>

                <button className='btn btn-secondary w-full'>Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;