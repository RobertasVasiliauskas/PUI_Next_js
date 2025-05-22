'use client';

import { useState, useEffect } from 'react';
import Carousel from './Carousel';
import ExploreList from './ExploreList';
import CurrencyStats from "@/components/Dashboard/CurrencyStats.tsx";
export default function Dashboard() {
    const [followedCurrencies, setFollowedCurrencies] = useState<string[]>([]);
    const [selectedCurrency, setSelectedCurrency] = useState<string>("");

    async function fetchFollowedCurrencies() {
        try {
            const response = await fetch('http://localhost:3001/user/followed', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setFollowedCurrencies(data);
            } else {
                console.error('Error fetching followed currencies');
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    async function fetchDefaultCurrency() {
        try {
            const response = await fetch('http://localhost:3001/user/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setSelectedCurrency(data.baseCurrency);

                setFollowedCurrencies((prev) => {
                    if (!prev.includes(data.baseCurrency)) {
                        fetch('http://localhost:3001/user/followed', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                            },
                            credentials: 'include',
                            body: JSON.stringify({ currency: data.baseCurrency }),
                        }).then(() => {
                            fetchFollowedCurrencies();
                        }).catch((err) => {
                            console.error('Error following base currency', err);
                        });
                        return [...prev, data.baseCurrency];
                    }
                    return prev;
                });
            } else {
                console.error('Error fetching default currency');
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    useEffect(() => {
        fetchFollowedCurrencies();
    }, []);

    useEffect(() => {
        fetchDefaultCurrency();
    }, []);

    useEffect(() => {
        console.log("Selected currency:", selectedCurrency);
    }, [selectedCurrency]);

    return (
        <div className="flex flex-col">

            {followedCurrencies.length > 0 ? (
                <Carousel followedCurrencies={followedCurrencies} onCurrencySelect={setSelectedCurrency} />
            ) : (
                <div className="w-full flex flex-col items-center py-10">
                    <h1 className="text-center text-4xl font-bold mb-6 text-white">
                        Your Currencies
                    </h1>
                    <div className="relative w-[95%] min-h-[180px] flex items-center justify-center bg-[#1A2E40] rounded-lg">
                        <p className="text-white text-xl text-center p-8">
                            You are not following any currencies yet. This space will be used for your personal currency carousel.
                        </p>
                    </div>
                </div>
            )}

            <div className="flex flex-row gap-4 flex-1">
                <CurrencyStats title={selectedCurrency}/>
                <ExploreList
                    followedCurrencies={followedCurrencies}
                    refreshFollowedCurrencies={fetchFollowedCurrencies}
                />
            </div>
        </div>
    );
}
