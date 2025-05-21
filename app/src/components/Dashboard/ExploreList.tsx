'use client';

import Image from 'next/image';
import icon_feed from '../../../public/Feather.svg';
import icon_convert from '../../../public/Divide_square.svg';
import icon_compare from '../../../public/Book_open.svg';
import Button from '../Button';
import ExploreItem from './ExploreItem';

export default function ExploreList({
                                        followedCurrencies,
                                        refreshFollowedCurrencies,
                                    }: {
    followedCurrencies: string[];
    refreshFollowedCurrencies: () => void;
}) {
    return (
        <div className="m-4 bg-[#1A2E40] p-4 rounded-[15px] w-[30%] h-full">
            <div className="flex items-center justify-between text-center">
                <h1 className="text-5xl p-2 mr-5">Explore</h1>
                <Button
                    onClick={() => alert('View all clicked')}
                    text="View All"
                    className="text-m border-solid border-black border-1 rounded-[5px] h-[3rem] w-[7rem]"
                />
            </div>

            <ul className="flex flex-col gap-1 justify-center space-y-2 mt-4">
                <ExploreItem
                    title="USD"
                    icon={<Image src={icon_feed} alt="USD Icon" />}
                    followedCurrencies={followedCurrencies}
                    refreshFollowedCurrencies={refreshFollowedCurrencies}
                />
                <ExploreItem
                    title="EUR"
                    icon={<Image src={icon_convert} alt="EUR Icon" />}
                    followedCurrencies={followedCurrencies}
                    refreshFollowedCurrencies={refreshFollowedCurrencies}
                />
                <ExploreItem
                    title="PLN"
                    icon={<Image src={icon_compare} alt="PLN Icon" />}
                    followedCurrencies={followedCurrencies}
                    refreshFollowedCurrencies={refreshFollowedCurrencies}
                />
                <ExploreItem
                    title="JPY"
                    icon={<Image src={icon_compare} alt="JPY Icon" />}
                    followedCurrencies={followedCurrencies}
                    refreshFollowedCurrencies={refreshFollowedCurrencies}
                />
                <ExploreItem
                    title="cad"
                    icon={<Image src={icon_compare} alt="YEN Icon" />}
                    followedCurrencies={followedCurrencies}
                    refreshFollowedCurrencies={refreshFollowedCurrencies}
                />
            </ul>
        </div>
    );
}
