import React from 'react';
import BestOffer from './BestOffer';
import Products from './Products/Products';
import Slider from './Slide';
import BusenessSummery from './BusinessSummery/BusenessSummery';

const Home = () => {
    return (
        <div>
            <Slider />
            <BestOffer/>
            <Products/>
            <BusenessSummery/>
        </div>
    );
};

export default Home;