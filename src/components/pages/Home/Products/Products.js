import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../../../shared/Loading/Loading';
import ProductCart from './ProductCart';

const Products = () => {
    const {data:products, isLoading} = useQuery('resentProduct', ()=> 
    fetch('http://localhost:5000/resent-products')
    .then(res => res.json())
    )

    if(isLoading){
        return <Loading/>
    }

    return (
        <section>
            <h1 className='text-3xl font-bold mb-10 my-24'>OUR BEST PRODUCTS</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
                {
                    products?.map(product => <ProductCart
                        key={product._id}
                        product = {product}
                    ></ProductCart>)
                }
            </div>
        </section>
    );
};

export default Products;