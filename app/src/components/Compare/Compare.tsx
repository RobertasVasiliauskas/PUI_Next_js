'use client'

import Chart from "../Dashboard/Chart";
import { useState } from "react";

const sampleData = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];
const sampleData2 = [
    { name: 'Item A', uv: 7000, pv: 4400, amt: 3200 },
    { name: 'Item B', uv: 3300, pv: 1200, amt: 2600 },
    { name: 'Item C', uv: 2100, pv: 9000, amt: 2100 },
    { name: 'Item D', uv: 4900, pv: 3800, amt: 2700 },
    { name: 'Item E', uv: 3600, pv: 4400, amt: 2300 },
    { name: 'Item F', uv: 4100, pv: 5300, amt: 2500 },
    { name: 'Item G', uv: 5600, pv: 6300, amt: 2800 },
];

const currencies = [
    { code: "USD", rate: 4.0 },
    { code: "EUR", rate: 4.5 },
    { code: "GBP", rate: 5.2 },
    { code: "PLN", rate: 1.0 }
];

export default function Compare() {
    const [selectedCurrencyL, setSelectedCurrencyL] = useState(currencies[0]);
    const [selectedCurrencyR, setSelectedCurrencyR] = useState(currencies[1]);
    const [selectedDataL, setSelectedDataL] = useState(sampleData);
    const [selectedDataR, setSelectedDataR] = useState(sampleData2);

    const handleCurrencyChange = (currencyCode: string, setSelectedCurrency: Function, setSelectedData: Function) => {
        const currency = currencies.find((c) => c.code === currencyCode);
        if (currency) {
            setSelectedCurrency(currency);
            setSelectedData(currency.code === "USD" || currency.code === "GBP" ? sampleData : sampleData2);
        }
    };

    return (
        <div className="p-5 h-full">
            <div className="flex justify-between mb-8">
                <div className="flex flex-col w-[48%]">
                    <p className="text-white text-4xl font-bold mb-5">Currency insight (Left)</p>
                    <select
                        className="p-2 border rounded-md bg-[#1A2E40] mt-2"
                        value={selectedCurrencyL.code}
                        onChange={(e) => handleCurrencyChange(e.target.value, setSelectedCurrencyL, setSelectedDataL)}
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
                        value={selectedCurrencyR.code}
                        onChange={(e) => handleCurrencyChange(e.target.value, setSelectedCurrencyR, setSelectedDataR)}
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