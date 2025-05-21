'use client';

import { useState, useEffect } from 'react';
import Carousel from './Carousel';
import ExploreList from './ExploreList';
import Chart from './Chart';

const sampleData = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

export default function Dashboard() {
    const [followedCurrencies, setFollowedCurrencies] = useState<string[]>([]);

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

    useEffect(() => {
        fetchFollowedCurrencies();
    }, []);

    return (
        <div className="flex flex-col">

            {followedCurrencies.length > 0 ? (
                <Carousel followedCurrencies={followedCurrencies} />
            ) : (
                <div className="w-full flex flex-col items-center py-10">
                    <h1 className="text-center text-4xl font-bold mb-6 text-white">
                        Your Currencies
                    </h1>
                    <div className="relative w-[95%] min-h-[200px] flex items-center justify-center bg-[#1A2E40] rounded-lg">
                        <p className="text-white text-xl text-center p-8">
                            You are not following any currencies yet. This space will be used for your personal currency carousel.
                        </p>
                    </div>
                </div>
            )}

            <div className="flex flex-row gap-4 flex-1">
                <div className="w-[70%] max-h-full bg-[#1A2E40] rounded-[15px] mt-4 mb-4 flex flex-col">
                    <p className="text-white text-4xl font-bold mt-4 ml-16">Currency insight</p>
                    <Chart data={sampleData} />
                </div>
                <ExploreList
                    followedCurrencies={followedCurrencies}
                    refreshFollowedCurrencies={fetchFollowedCurrencies}
                />
            </div>
        </div>
    );
}
