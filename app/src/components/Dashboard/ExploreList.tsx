'use client';

import Image from 'next/image';
import Button from '../Button';
import ExploreItem from './ExploreItem';
import React, { useState } from 'react';
import { getCurrencyIcon } from '@/lib/currencyIcons';

const allCurrencies = [
    { title: "PLN" },
    { title: "USD" },
    { title: "EUR" },
    { title: "GBP" },
    { title: "JPY" },
    { title: "CAD" },
    { title: "AUD" },
    { title: "CHF" },
    { title: "SEK" },
    { title: "NOK" },
    { title: "CZK" },
    { title: "HUF" },
    { title: "INR" },
    { title: "CNY" },
    { title: "BRL" },
    { title: "MXN" },
    { title: "ZAR" },
    { title: "NZD" },
    { title: "SGD" },
    { title: "KRW" },
];

export default function ExploreList({
                                        followedCurrencies,
                                        refreshFollowedCurrencies,
                                    }: {
    followedCurrencies: string[];
    refreshFollowedCurrencies: () => void;
}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className={`m-4 bg-[#1A2E40] p-4 mr-12 rounded-[15px] w-[30%] h-full relative transition-all duration-200 ${showModal ? 'opacity-40 pointer-events-none' : ''}`}>
                <div className="flex items-center justify-between text-center">
                    <h1 className="text-5xl p-2 mr-5">Explore</h1>
                    <Button
                        onClick={() => setShowModal(true)}
                        text="View All"
                        className="text-m border-solid border-black border-1 rounded-[5px] h-[3rem] w-[7rem]"
                    />
                </div>

                <ul className="flex flex-col gap-1 justify-center space-y-2 mt-4">
                    {allCurrencies.slice(0, 4).map(({ title }) => (
                        <ExploreItem
                            key={title}
                            title={title}
                            icon={<Image src={getCurrencyIcon(title)} alt={`${title} Icon`} width={50} height={50} />}
                            followedCurrencies={followedCurrencies}
                            refreshFollowedCurrencies={refreshFollowedCurrencies}
                        />
                    ))}
                </ul>
            </div>

            {showModal && (
                <>
                    <div className="fixed inset-0 z-10 bg-black opacity-50 transition-opacity"></div>
                    <div className="fixed inset-0 z-20 flex items-center justify-center">
                        <div className="bg-[#1A2E40] p-8 rounded-[15px] min-w-[600px] max-w-[95vw] max-h-[85vh] w-[700px] shadow-lg flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-3xl">All Currencies</h2>
                                <button
                                    className="text-white text-2xl px-3 py-1 rounded hover:bg-[#9D5C63]"
                                    onClick={() => setShowModal(false)}
                                    aria-label="Close"
                                >
                                    &#x2715;
                                </button>
                            </div>
                            <div className="overflow-y-auto pr-4" style={{ maxHeight: '65vh' }}>
                                <ul className="flex flex-col gap-8">
                                    {allCurrencies.map(({ title }) => (
                                        <ExploreItem
                                            key={title}
                                            title={title}
                                            icon={<Image src={getCurrencyIcon(title)} alt={`${title} Icon`} width={50} height={50} />}
                                            followedCurrencies={followedCurrencies}
                                            refreshFollowedCurrencies={refreshFollowedCurrencies}
                                        />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
