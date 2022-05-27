import React from 'react';
import BestOffer from './BestOffer/BestOffer';
import Products from './Products/Products';
import BusenessSummery from './BusinessSummery/BusenessSummery';
import Reviews from './Reviews/Reviews';
import Slider from './Slider/Slide';

const Home = () => {
    return (
        <div>
            <Slider/>
            <BestOffer/>
            <Products/>
            <BusenessSummery/>
            <Reviews />
        </div>
    );
};

export default Home;