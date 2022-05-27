import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slider.css";
import { Parallax, Pagination, Navigation, Autoplay, EffectFade } from "swiper";
import { Link } from "react-router-dom";
const Slider = () => {
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#000",
          "--swiper-pagination-color": "#fb5200",
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <section className="py-28 custom-slider px-5 rounded text-center md:text-left flex items-center justify-between flex-col md:flex-row relative">
            <div className="flex-1 text-yellow-100 md:text-secondary ml-0 md:ml-8">
              <div className="title" data-swiper-parallax="-300">
                <h2 className=" text-4xl md:text-5xl mb-3">
                  Modern Power Tools
                </h2>
              </div>
              <div className="subtitle" data-swiper-parallax="-200">
                <h3 className="text-xl md:text-2xl mb-3">
                  The best offer in 2022
                </h3>
              </div>
              <div className="text" data-swiper-parallax="-100">
                <p>
                  Almost every home in Country has at least one power tool, but
                  many homeowners are not always sure how and when to use them.
                  Start by checking out our guide to power tools below. Read the
                  instructions and follow the safety guidelines that came with
                  your power tool before using it. You’ll finish your home
                  project in no time!
                </p>

                <Link to="/products">
                  <button className="btn btn-secondary mt-5 custom-btn">
                    Shop now
                  </button>
                </Link>
              </div>
            </div>

            <div className="flex-1">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-500 absolute top-8 right-8 flex items-center justify-center text-white font-bold flex-col">
                <h2 className="text-xl">20%</h2>
                <h2 className="text-xl">OFF</h2>
              </div>
            </div>
          </section>
        </SwiperSlide>

        <SwiperSlide>
          <section className="py-28 custom-slider px-5 rounded text-center md:text-left flex items-center justify-between flex-col md:flex-row relative">
            <div className="flex-1 text-yellow-100 md:text-secondary ml-0 md:ml-8">
              <div className="title" data-swiper-parallax="-300">
                <h2 className=" text-4xl md:text-5xl mb-3">
                  Best Quality Power Tools
                </h2>
              </div>
              <div className="subtitle" data-swiper-parallax="-200">
                <h3 className="text-xl md:text-2xl mb-3">Modern Power Tools</h3>
              </div>
              <div className="text" data-swiper-parallax="-100">
                <p>
                  A power tool is a tool that is actuated by an additional power
                  source and mechanism other than the solely manual labor used
                  with hand tools. The most common types of power tools use
                  electric motors. Internal combustion engines and compressed
                  air are also commonly used.
                </p>

                <Link to="/products">
                  <button className="btn btn-secondary mt-5 custom-btn">
                    Shop now
                  </button>
                </Link>
              </div>
            </div>

            <div className="flex-1">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-500 absolute top-8 right-8 flex items-center justify-center text-white font-bold flex-col">
                <h2 className="text-xl">20%</h2>
                <h2 className="text-xl">OFF</h2>
              </div>
            </div>
          </section>
        </SwiperSlide>

        <SwiperSlide>
          <section className="py-28 custom-slider px-5 rounded text-center md:text-left flex items-center justify-between flex-col md:flex-row relative">
            <div className="flex-1 text-yellow-100 md:text-secondary ml-0 md:ml-8">
              <div className="title" data-swiper-parallax="-300">
                <h2 className=" text-4xl md:text-5xl mb-3">
                  We make all kinds of power tools
                </h2>
              </div>
              <div className="subtitle" data-swiper-parallax="-200">
                <h3 className="text-xl md:text-2xl mb-3">Modern Power Tools</h3>
              </div>
              <div className="text" data-swiper-parallax="-100">
                <p>
                  What are power tools made of? Housings are made with plastic
                  and metal — plastic surrounding the motor, switch and hand
                  grip, and metal for housing gears, shafts, and bearings. Tool
                  housings must absorb shock from drops and hold internal parts
                  firmly in position
                </p>

                <Link to="/products">
                  <button className="btn btn-secondary mt-5 custom-btn">
                    Shop now
                  </button>
                </Link>
              </div>
            </div>

            <div className="flex-1">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-500 absolute top-8 right-8 flex items-center justify-center text-white font-bold flex-col">
                <h2 className="text-xl">20%</h2>
                <h2 className="text-xl">OFF</h2>
              </div>
            </div>
          </section>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
