import ExploreItem from "./ExploreItem.jsx";

import icon_feed from '../../assets/Feather.svg';
import icon_convert from '../../assets/Divide_square.svg';
import icon_compare from '../../assets/Book_open.svg';

import Button from "../Button.jsx";

export default function ExploreList() {

    return (
        <div className=" m-4 bg-[#1A2E40] p-4 rounded-[15px] w-[30%] h-full">
            <div className="flex items-center justify-between text-center">
                <h1 className="text-5xl p-2 mr-5">Explore</h1>
                <Button onClick={() => alert('View all clicked')} text={"View All"} className={"text-m border-solid border-black border-1 rounded-[5px] h-[3rem] w-[7rem]"} />
            </div>

            <ul className="flex flex-col gap-1 justify-center space-y-2 mt-4 ">
                <ExploreItem
                    title="USD"
                    icon={icon_feed}
                />
                <ExploreItem
                    title="EUR"
                    icon={icon_convert}
                />
                <ExploreItem
                    title="PLN"
                    icon={icon_compare}
                />
                <ExploreItem
                    title="FR"
                    icon={icon_compare}
                />

            </ul>
        </div>

    );
}