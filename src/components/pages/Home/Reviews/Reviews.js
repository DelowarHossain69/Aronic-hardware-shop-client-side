import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import "swiper/css";
import "swiper/css/pagination";

const Reviews = () => {
  return (
    <section className="my-12">
      <h2 className="text-3xl text-center font-bold mb-6">Reviews</h2>

      <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <div className="w-full md:w-1/2 mx-auto text-center py-10 shadow-xl p-5">
                <div>
                    <img src="https://i.ibb.co/Z6Sh6Vj/admin-user-icon-24.png" alt="" className=" w-28 mx-auto"/>
                </div>
                <div>
                    <FontAwesomeIcon icon={faStar} className='text-yellow-400 mx-1' />
                    <FontAwesomeIcon icon={faStar} className='text-yellow-400 mx-1' />
                    <FontAwesomeIcon icon={faStar} className='text-yellow-400 mx-1' />
                    <FontAwesomeIcon icon={faStar} className='text-yellow-400 mx-1' />
                    <FontAwesomeIcon icon={faStar} className='text-yellow-400 mx-1' />
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus odio fuga quis enim dolorem cumque obcaecati ab hic minima aut?</p>
                <h1 className="font-bold mt-2 text-lg">This a ademon review.</h1>
            </div>
        </SwiperSlide>

      </Swiper>
      </div>
    </section>
  );
};

export default Reviews;
