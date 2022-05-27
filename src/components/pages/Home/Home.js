import React from 'react';
import BestOffer from './BestOffer/BestOffer';
import Products from './Products/Products';
import BusenessSummery from './BusinessSummery/BusenessSummery';
import Reviews from './Reviews/Reviews';
import Slider from './Slider/Slide';
import Contact from './Contact/Contact';
import Subscribe from './Subscribe/Subscribe';

const Home = () => {
    return (
        <div>
            <Slider/>
            <Subscribe />
            <BestOffer/>
            <Products/>
            <BusenessSummery/>
            <Reviews />
            <Contact />
        </div>
    );
};

export default Home;