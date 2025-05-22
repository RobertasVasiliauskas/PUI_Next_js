import Chart from "@/components/Dashboard/Chart.tsx";
import { useEffect, useState } from "react";

interface CurrencyStatsProps {
    title: string;
}

async function fetchCurrencyData(currency: string, date?: string, startDate?: string, endDate?: string) {
    try {
        let url = "";
        if (date) {
            url = `http://localhost:3001/currency/${currency}?date=${date}`;
        } else if (startDate && endDate) {
            url = `http://localhost:3001/currency/${currency}?startDate=${startDate}&endDate=${endDate}`;
        } else {
            url = `http://localhost:3001/currency/${currency}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');

        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

export default function CurrencyStats({ title }: CurrencyStatsProps) {
    const [period, setPeriod] = useState<string>("1w");
    const [chartData, setChartData] = useState<any[]>([]);

    const periodInDays: Record<string, number> = {
        "1w": 7,
        "1m": 30,
        "3m": 90,
        "1y": 365,
    };

    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    useEffect(() => {
        if (!title) return;

        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - periodInDays[period]);

        async function getData() {
            const data = await fetchCurrencyData(
                title,
                undefined,
                formatDate(startDate),
                formatDate(endDate)
            );

            if (!data || !Array.isArray(data.rates)) return;

            const tempChartData = data.rates.map((rate: any) => ({
                name: rate.date,
                bid: rate.bid,
                ask: rate.ask
            }));

            setChartData(tempChartData);
        }

        getData();
    }, [title, period]);

    const periods = [
        { label: "1 Week", value: "1w" },
        { label: "1 Month", value: "1m" },
        { label: "3 Months", value: "3m" },
        { label: "1 Year", value: "1y" },
    ];

    return (
        <div className="w-[70%] max-h-full bg-[#1A2E40] rounded-[15px] mt-4 mb-4 ml-12 flex flex-col">
            <div className="flex items-center justify-between mt-4 ml-16 mr-16">
                <p className="text-white text-4xl font-bold">Currency insight for {title}</p>
                <select
                    className="bg-[#223A53] text-white rounded px-4 py-2 text-lg"
                    value={period}
                    onChange={e => setPeriod(e.target.value)}
                >
                    {periods.map(p => (
                        <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                </select>
            </div>
            <Chart data={chartData} singleCurrencyMode={true}/>
        </div>
    );
}
