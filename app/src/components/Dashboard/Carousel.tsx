'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';

export default function CurrencyCarousel({
                                             followedCurrencies,
                                             onCurrencySelect,
                                         }: {
    followedCurrencies: string[];
    onCurrencySelect: (currency: string) => void;
}) {
    return (
        <div className="w-full flex flex-col items-center py-10">
            <h1 className="text-center text-4xl font-bold mb-6 text-white">
                Your Currencies
            </h1>
            <div className="relative w-[95%] min-h-[170px]">
                {followedCurrencies.length === 0 ? (
                    <div className="text-white text-center py-8 w-full">No currencies followed.</div>
                ) : (
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={20}
                        slidesPerView={4}
                        navigation
                        loop={true}
                        loopAdditionalSlides={1}
                        className="pb-10"
                        style={{ minHeight: 180 }}
                    >
                        {followedCurrencies.map((currency) => (
                            <SwiperSlide key={currency}>
                                <motion.div
                                    className="h-[180px] bg-[#1A2E40] flex justify-center items-center rounded-lg text-center cursor-pointer"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20, duration: 0.5 }}
                                    layout
                                    onClick={() => onCurrencySelect(currency)}
                                >
                                    <h1 className="text-white text-2xl font-semibold flex items-center justify-center h-full w-full">
                                        {currency.toUpperCase()}
                                    </h1>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>
    );
}