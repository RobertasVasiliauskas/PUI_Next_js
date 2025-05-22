import Chart from "@/components/Dashboard/Chart.tsx";
import {useState} from "react";

interface CurrencyStatsProps {
    title: string;
}

const sampleData = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];


export default function CurrencyStats({ title }: CurrencyStatsProps) {

    const [period, setPeriod] = useState<string>("1w");

    const periods = [
        { label: "1 Week", value: "1w" },
        { label: "1 Month", value: "1m" },
        { label: "3 Months", value: "3m" },
        { label: "1 Year", value: "1y" },
    ];

    const userDate = new Date();

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
            <Chart data={sampleData} />
        </div>
    )
}