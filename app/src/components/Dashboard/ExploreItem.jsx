export default function ExploreItem({ icon, title }) {
    return (
        <li
            className="group relative flex items-center justify-center gap-2 cursor-pointer rounded-[15px] w-auto h-[4.8rem] bg-blue-400 overflow-hidden"
        >
            <img src={icon} alt={title} className="h-5 w-5" />
            <h1 className="text-lg font-semibold">{title}</h1>

            <div
                className="absolute top-0 right-0 h-full w-[33%] flex items-center justify-center gap-2 bg-blue-600 text-white
                           transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"
            >
                <p className="text-base">Follow</p>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
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
