'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import icon_feed from '../../../public/Feather.svg';
import icon_convert from '../../../public/Divide_square.svg';
import icon_compare from '../../../public/Book_open.svg';
import Button from '../Button';
import ExploreItem from './ExploreItem';

export default function ExploreList() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Ensures this only runs on the client
    }, []);

    if (!isClient) {
        return null; // Don't render until it's client-side
    }

    return (
        <div className="m-4 bg-[#1A2E40] p-4 rounded-[15px] w-[30%] h-full">
            <div className="flex items-center justify-between text-center">
                <h1 className="text-5xl p-2 mr-5">Explore</h1>
                <Button onClick={() => alert('View all clicked')} text={"View All"} className={"text-m border-solid border-black border-1 rounded-[5px] h-[3rem] w-[7rem]"} />
            </div>

            <ul className="flex flex-col gap-1 justify-center space-y-2 mt-4">
                <ExploreItem
                    title="USD"
                    icon={<Image src={icon_feed} alt="USD Icon" />}
                />
                <ExploreItem
                    title="EUR"
                    icon={<Image src={icon_convert} alt="EUR Icon" />}
                />
                <ExploreItem
                    title="PLN"
                    icon={<Image src={icon_compare} alt="PLN Icon" />}
                />
                <ExploreItem
                    title="FR"
                    icon={<Image src={icon_compare} alt="FR Icon" />}
                />
            </ul>
        </div>
    );
}
