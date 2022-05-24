import React from 'react';
import BestOffer from './BestOffer/BestOffer';
import Products from './Products/Products';
import Slider from './Slider/Slide';
import BusenessSummery from './BusinessSummery/BusenessSummery';
import Reviews from './Reviews/Reviews';

const Home = () => {
    return (
        <div>
            <Slider />
            <BestOffer/>
            <Products/>
            <BusenessSummery/>
            <Reviews />
        </div>
    );
};

export default Home;