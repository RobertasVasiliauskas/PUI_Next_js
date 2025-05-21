'use client';

import React from 'react';

interface ExploreItemProps {
    icon: React.ReactNode;
    title: string;
    followedCurrencies: string[];
    refreshFollowedCurrencies: () => void;
}

export default function ExploreItem({
                                        icon,
                                        title,
                                        followedCurrencies,
                                        refreshFollowedCurrencies,
                                    }: ExploreItemProps) {
    const isFollowed = followedCurrencies.includes(title.toLowerCase());

    async function handleFollowClick() {
        const url = 'http://localhost:3001/user/followed';
        const method = isFollowed ? 'DELETE' : 'POST';

        try {
            await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ currency: title }),
            });

            refreshFollowedCurrencies();
        } catch (error) {
            console.error(`Error ${isFollowed ? 'unfollowing' : 'following'} the currency`, error);
        }
    }

    return (
        <li
            className="group relative flex items-center justify-center gap-2 cursor-pointer rounded-[15px] w-auto h-[4.8rem] bg-[#1A2E40] border-2 border-white-600 border-solid overflow-hidden"
        >
            {icon}
            <h1 className="text-lg font-semibold">{title}</h1>

            <div
                className="absolute top-0 right-0 h-full w-[33%] flex items-center justify-center gap-2 bg-[#9D5C63] text-white
                           transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"
                onClick={handleFollowClick}
            >
                <p className="text-base">{isFollowed ? 'Unfollow' : 'Follow'}</p>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={isFollowed ? 'red' : 'white'}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                </svg>
            </div>
        </li>
    );
}
