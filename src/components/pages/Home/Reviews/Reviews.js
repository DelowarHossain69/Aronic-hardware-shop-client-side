import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Reviews = () => {
    const {data:reviews, isLoading} = useQuery('getReviews', ()=> 
        fetch('http://localhost:5000/rating')
        .then(res => res.json())
    )

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
        {
            reviews?.map(review => <SwiperSlide key={review._id}>
                <div className="w-full md:w-1/2 mx-auto text-center py-10 shadow-xl p-5">
                    <div>
                        <img src={review?.img} alt="" className=" w-28 h-28 mx-auto rounded-full mb-2 border-2"/>
                    </div>
                    <div>
                        {
                            // rating
                            [...Array(review?.rating)].map(() => <FontAwesomeIcon icon={faStar} className='text-yellow-400 mx-1' />)
                           
                        }
                        {
                            // Blank rating
                            [...Array(5 - review?.rating)].map(()=> <FontAwesomeIcon icon={faStar} className='text-gray-400 mx-1' />)
                        }
                    </div>
                    <p className="my-2">{review?.comment}</p>
                    <h1 className="font-bold mt-2 text-lg">{review?.name}</h1>
                </div>
            </SwiperSlide>)
        }

      </Swiper>
      </div>
    </section>
  );
};

export default Reviews;
