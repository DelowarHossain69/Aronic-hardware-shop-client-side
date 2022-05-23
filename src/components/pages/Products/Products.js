import React from 'react';
import { useQuery } from 'react-query';
import ProductCart from '../Home/Products/ProductCart';

const Products = () => {
    const {data:products, isLoading} = useQuery('getAllData', ()=> 
        fetch('http://localhost:5000/products')
        .then(res => res.json())
    )

    return (
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
                products?.map(product => <ProductCart
                    key={product._id}
                    product={product}
                ></ProductCart>)
            }
        </section>
    );
};

export default Products;