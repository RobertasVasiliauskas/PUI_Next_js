'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function CurrencyCarousel({
                                             followedCurrencies,
                                         }: {
    followedCurrencies: string[];
}) {
    return (
        <div className="w-full flex flex-col items-center py-10">
            <h1 className="text-center text-4xl font-bold mb-6 text-white">
                Your Currencies
            </h1>

            <div className="relative w-[95%]">
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={4}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    loop={true}
                    className="pb-10"
                >
                    {/* Navigation Buttons */}
                    <div className="swiper-button-prev custom-prev !left-0"></div>
                    <div className="swiper-button-next custom-next !right-0"></div>

                    {followedCurrencies.map((currency, index) => (
                        <SwiperSlide
                            key={index}
                            className="!h-[180px] bg-[#1A2E40] flex justify-center items-center rounded-lg text-center"
                        >
                            <h1 className="text-white text-2xl font-semibold flex items-center justify-center h-full w-full">
                                {currency}
                            </h1>
                        </SwiperSlide>

                    ))}
                </Swiper>
            </div>
        </div>
    );
}
