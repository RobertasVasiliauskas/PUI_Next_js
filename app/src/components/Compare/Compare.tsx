'use client'

import Chart from "../Dashboard/Chart";
import { useEffect, useState } from "react";

interface Currency {
    code: string;
    rate: number;
}

interface BackendCurrency {
    code: string;
    rates: { bid: number; ask: number; date: string }[];
}

export default function Compare() {
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [selectedCurrencyL, setSelectedCurrencyL] = useState<Currency | null>(null);
    const [selectedCurrencyR, setSelectedCurrencyR] = useState<Currency | null>(null);
    const [selectedDataL, setSelectedDataL] = useState<ChartData[]>([]);
    const [selectedDataR, setSelectedDataR] = useState<ChartData[]>([]);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await fetch("/currency");
                if (!response.ok) {
                    throw new Error("Failed to fetch currencies");
                }
                const data: BackendCurrency[] = await response.json();
                const fetchedCurrencies = data.map((currency) => ({
                    code: currency.code,
                    rate: currency.rates[0]?.bid || 0,
                }));
                setCurrencies(fetchedCurrencies);
                if (fetchedCurrencies.length > 0) {
                    setSelectedCurrencyL(fetchedCurrencies[0]);
                    setSelectedCurrencyR(fetchedCurrencies[1] || fetchedCurrencies[0]);
                }
            } catch (error) {
                console.error("Error fetching currencies:", error);
            }
        };

        fetchCurrencies();
    }, []);

    interface ChartData {
        name: string;
        pv: number;
        uv: number;
    }

    const fetchChartData = async (currencyCode: string, setSelectedData: (data: ChartData[]) => void) => {
        try {
            const response = await fetch(`/currency/${currencyCode}`);
            if (!response.ok) {
                throw new Error("Failed to fetch chart data");
            }
            const data: BackendCurrency = await response.json();
            const chartData = data.rates.map((rate) => ({
                name: rate.date,
                pv: rate.bid,
                uv: rate.ask,
            }));
            setSelectedData(chartData);
        } catch (error) {
            console.error("Error fetching chart data:", error);
        }
    };

    useEffect(() => {
        if (selectedCurrencyL) {
            fetchChartData(selectedCurrencyL.code, setSelectedDataL);
        }
    }, [selectedCurrencyL]);

    useEffect(() => {
        if (selectedCurrencyR) {
            fetchChartData(selectedCurrencyR.code, setSelectedDataR);
        }
    }, [selectedCurrencyR]);

    return (
        <div className="p-5 h-full">
            <div className="flex justify-between mb-8">
                <div className="flex flex-col w-[48%]">
                    <p className="text-white text-4xl font-bold mb-5">Currency insight (Left)</p>
                    <select
                        className="p-2 border rounded-md bg-[#1A2E40] mt-2"
                        value={selectedCurrencyL?.code || ""}
                        onChange={(e) => {
                            const currency = currencies.find((c) => c.code === e.target.value);
                            if (currency) setSelectedCurrencyL(currency);
                        }}
                    >
                        {currencies.map((currency) => (
                            <option key={currency.code} value={currency.code}>
                                {currency.code}
                            </option>
                        ))}
                    </select>
                    <div className="h-[500px] mt-10 bg-[#1A2E40] rounded-xl">
                        <Chart data={selectedDataL} />
                    </div>
                </div>

                <div className="flex flex-col w-[48%]">
                    <p className="text-white text-4xl font-bold mb-5">Currency insight (Right)</p>
                    <select
                        className="p-2 border rounded-md bg-[#1A2E40] mt-2"
                        value={selectedCurrencyR?.code || ""}
                        onChange={(e) => {
                            const currency = currencies.find((c) => c.code === e.target.value);
                            if (currency) setSelectedCurrencyR(currency);
                        }}
                    >
                        {currencies.map((currency) => (
                            <option key={currency.code} value={currency.code}>
                                {currency.code}
                            </option>
                        ))}
                    </select>
                    <div className="h-[500px] mt-10 bg-[#1A2E40] rounded-xl">
                        <Chart data={selectedDataR} />
                    </div>
                </div>
            </div>
        </div>
    );
}