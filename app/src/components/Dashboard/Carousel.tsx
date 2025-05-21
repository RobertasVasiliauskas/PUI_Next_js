'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CurrencyCarousel({
    followedCurrencies,
}: {
    followedCurrencies: string[];
}) {
    const [displayedCurrencies, setDisplayedCurrencies] = React.useState<string[]>(followedCurrencies);

    React.useEffect(() => {
        // Add new currencies
        setDisplayedCurrencies((prev) => {
            const toAdd = followedCurrencies.filter((c) => !prev.includes(c));
            return [...prev, ...toAdd];
        });
        // Remove currencies after exit animation
        const toRemove = displayedCurrencies.filter((c) => !followedCurrencies.includes(c));
        if (toRemove.length > 0) {
            const timeout = setTimeout(() => {
                setDisplayedCurrencies((prev) => prev.filter((c) => followedCurrencies.includes(c)));
            }, 500); // match animation duration
            return () => clearTimeout(timeout);
        }
        // eslint-disable-next-line
    }, [followedCurrencies.join(',')]);

    return (
        <div className="w-full flex flex-col items-center py-10">
            <h1 className="text-center text-4xl font-bold mb-6 text-white">
                Your Currencies
            </h1>
            <div className="relative w-[95%] min-h-[180px] flex items-center">
                {displayedCurrencies.length === 0 ? (
                    <div className="text-white text-center py-8 w-full">No currencies followed.</div>
                ) : (
                    <div className="flex gap-5 w-full justify-center min-w-[720px] max-w-[100%]">
                        <AnimatePresence>
                            {displayedCurrencies.map((currency) => (
                                <motion.div
                                    key={currency}
                                    className="h-[180px] w-[25%] bg-[#1A2E40] flex justify-center items-center rounded-lg text-center"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20, duration: 0.5 }}
                                    layout
                                >
                                    <h1 className="text-white text-2xl font-semibold flex items-center justify-center h-full w-full">
                                        {currency}
                                    </h1>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}
