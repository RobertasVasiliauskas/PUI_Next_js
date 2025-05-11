import Carousel from "./Carousel.jsx"
import ExploreList from "./ExploreList.jsx"
import Chart from "./Chart.jsx"

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
    return (
        <div className="flex flex-col ">
            <Carousel />

            <div className="flex flex-row gap-4 flex-1">

                <div className="w-[70%] max-h-full bg-[#1A2E40] rounded-[15px] mt-4 mb-4 flex flex-col ">
                    <p className="text-white text-4xl font-bold mt-4 ml-16">Currency insight</p>
                    <Chart data={sampleData} />
                </div>

                <ExploreList />
            </div>
        </div>
    );
}
