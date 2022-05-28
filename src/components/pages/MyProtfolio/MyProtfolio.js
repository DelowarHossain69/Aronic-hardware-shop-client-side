import React from 'react';
import html from "../../../images/html.png";
import css from "../../../images/css.png";
import js from "../../../images/js.jpg";
import bootstrap from "../../../images/bootstrap.jpg";
import tailwind from "../../../images/tailwind.png";
import react from "../../../images/react.png";
import firebase from "../../../images/firebase.png";
import express from "../../../images/express.png";
import mongodb from "../../../images/mongodb.png";
import delowar from "../../../images/programmer-delowar.jpg";

const MyProtfolio = () => {
    return (
        <section className='my-12'>
            <h2 className='text-3xl mb-5 uppercase text-center lg:text-left'>My Portfolio</h2>

            <div className='grid grid-cols-1 lg:grid-cols-8 gap-5'>
                <div className='cols-span-1 lg:col-span-3 bg-white p-5 rounded'>

                    <img src={delowar} alt="" className='rounded-full w-48 h-48 mx-auto object-contain' />
                    <h2 className='text-2xl text-center mt-3 font-bold'>Name : Delowar Hossain</h2>
                    <h2 className='text-xl text-center mt-3'>Email : daloar2400@gmail.com</h2>
                    <h2 className='text-xl text-center mt-3'>Education : Diploma in computer engineering</h2>
                </div>
                <div className='cols-span-1 lg:col-span-5 bg-white rounded'>
                <h2 className='text-2xl md:text-4xl text-center mt-5 font-bold uppercase'>
                    I am an expert in : 
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16 p-5'>
                    <div className='flex items-center justify-center flex-col'>
                        <img src={html} alt="" className='w-28' />
                        <h2 className='font-bold text-3xl'>HTML</h2>
                    </div>

                    <div className='flex items-center justify-center flex-col'>
                        <img src={css} alt="" className='w-28' />
                        <h2 className='font-bold text-3xl'>CSS</h2>
                    </div>

                    <div className='flex items-center justify-center flex-col'>
                        <img src={js} alt="" className='w-28' />
                        <h2 className='font-bold text-3xl'>JS</h2>
                    </div>

                    <div className='flex items-center justify-center flex-col'>
                        <img src={bootstrap} alt="" className='w-28' />
                        <h2 className='font-bold text-3xl'>Bootstrap</h2>
                    </div>

                    <div className='flex items-center justify-center flex-col'>
                        <img src={tailwind} alt="" className='w-28' />
                        <h2 className='font-bold text-3xl'>Tailwind</h2>
                    </div>

                    <div className='flex items-center justify-center flex-col'>
                        <img src={react} alt="" className='w-28' />
                        <h2 className='font-bold text-3xl'>React</h2>
                    </div>
                    <div className='flex items-center justify-center flex-col'>
                        <img src={firebase} alt="" className='w-28' />
                        <h2 className='font-bold text-3xl'>Firebase</h2>
                    </div>

                    <div className='flex items-center justify-center flex-col'>
                        <img src={mongodb} alt="" className='w-28' />
                        <h2 className='font-bold text-3xl'>Mongodb</h2>
                    </div>

                    <div className='flex items-center justify-center flex-col'>
                        <img src={express} alt="" className='w-28' />
                        <h2 className='font-bold text-3xl'>Express js</h2>
                    </div>
                </div>
                </div>
            </div>
        </section>
    );
};

export default MyProtfolio;