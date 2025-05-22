'use client';

import Chart from "@/components/Dashboard/Chart";
import { useEffect, useState } from "react";

const currencies = ["USD", "EUR", "GBP"];

const periodInDays: Record<string, number> = {
    "1w": 7,
    "1m": 30,
    "3m": 90,
    "1y": 365,
};

const formatDate = (date: Date) => date.toISOString().split("T")[0];

async function fetchCurrencyData(currency: string, startDate: string, endDate: string) {
    try {
        const response = await fetch(`http://localhost:3001/currency/${currency}?startDate=${startDate}&endDate=${endDate}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        return data?.rates || [];
    } catch (error) {
        console.error(`Error fetching data for ${currency}:`, error);
        return [];
    }
}

export default function Compare() {
    const [leftCurrency, setLeftCurrency] = useState("USD");
    const [rightCurrency, setRightCurrency] = useState("EUR");
    const [period, setPeriod] = useState("1w");
    const [mergedData, setMergedData] = useState<any[]>([]);

    useEffect(() => {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - periodInDays[period]);

        const fetchData = async () => {
            const [dataLeft, dataRight] = await Promise.all([
                fetchCurrencyData(leftCurrency, formatDate(startDate), formatDate(endDate)),
                fetchCurrencyData(rightCurrency, formatDate(startDate), formatDate(endDate)),
            ]);

            const merged = dataLeft.map((item: any) => {
                const match = dataRight.find((d: any) => d.date === item.date);
                return {
                    date: item.date,
                    [`${leftCurrency}_bid`]: item.bid,
                    [`${rightCurrency}_bid`]: match?.bid ?? null,
                    [`${leftCurrency}_ask`]: item.ask,
                    [`${rightCurrency}_ask`]: match?.ask ?? null,
                };
            });

            setMergedData(merged);
        };

        fetchData();
    }, [leftCurrency, rightCurrency, period]);

    const periods = [
        { label: "1 Week", value: "1w" },
        { label: "1 Month", value: "1m" },
        { label: "3 Months", value: "3m" },
        { label: "1 Year", value: "1y" },
    ];

    return (
        <div className="p-5 mx-12 my-16 flex flex-col gap-30 items-center ">
            <div className="flex justify-between gap-7 mb-4">
                <div>
                    <label className="text-white mr-2">Left Currency:</label>
                    <select
                        className="bg-[#223A53] text-white rounded px-3 py-2"
                        value={leftCurrency}
                        onChange={(e) => setLeftCurrency(e.target.value)}
                    >
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-white mr-2">Right Currency:</label>
                    <select
                        className="bg-[#223A53] text-white rounded px-3 py-2"
                        value={rightCurrency}
                        onChange={(e) => setRightCurrency(e.target.value)}
                    >
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-white mr-2">Period:</label>
                    <select
                        className="bg-[#223A53] text-white rounded px-3 py-2"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                    >
                        {periods.map((p) => (
                            <option key={p.value} value={p.value}>
                                {p.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="bg-[#1A2E40] rounded-xl p-5 w-full">

                <Chart data={mergedData} singleCurrencyMode={false} />
            </div>
        </div>
    );
}
