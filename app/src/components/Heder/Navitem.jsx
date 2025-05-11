export default function Navitem({ icon, title, isActive, onClick }) {
    return (
        <li className={`flex grow items-center justify-center gap-1 cursor-pointer rounded-[15px] w-[10rem] h-[4rem] ${isActive ? "bg-[#1F394F]" : ""} `} onClick={onClick}>
            <img src={icon} alt={title} className="h-10 w-10" />
            <a className="text-xl" href="#">{title}</a>
        </li>
    );
}