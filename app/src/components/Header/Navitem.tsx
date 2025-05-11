import Image from 'next/image';
interface NavitemProps {
    icon: string;
    title: string;
    isActive: boolean;
    onClick: () => void;
}

export default function Navitem({ icon, title, isActive, onClick }: NavitemProps) {
    return (
        <li
            className={`flex grow items-center justify-center gap-1 cursor-pointer rounded-[15px] w-[10rem] h-[4rem] ${
                isActive ? 'bg-[#1F394F]' : ''
            }`}
            onClick={onClick}
        >
            <Image src={icon} alt={title} width={40} height={40} />
            <span className="text-xl">{title}</span>
        </li>
    );
}
