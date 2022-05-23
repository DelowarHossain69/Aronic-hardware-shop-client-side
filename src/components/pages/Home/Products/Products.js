import React, { useState } from 'react';

const Products = () => {
    const [products, setProducts] = useState([]);
    return (
        <section>
            <h1></h1>

            <div className='gird grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    products?.map(product => )
                }
            </div>
        </section>
    );
};

export default Products;