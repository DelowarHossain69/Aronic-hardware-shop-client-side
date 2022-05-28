import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../shared/Loading/Loading';
import ProductCart from '../Home/Products/ProductCart';

const Products = () => {
    const {data:products, isLoading} = useQuery('getAllData', ()=> 
        fetch('https://protected-chamber-45180.herokuapp.com/products')
        .then(res => res.json())
    )

    if(isLoading){
        return <Loading />
    }

    return (
        <section className='py-24'>
            <h4 className='text-4xl mb-12 text-center md:text-left'>All Product : </h4>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
                products?.map(product => <ProductCart
                    key={product._id}
                    product={product}
                ></ProductCart>)
            }
            </div>
        </section>
    );
};

export default Products;