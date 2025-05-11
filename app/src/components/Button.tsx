interface ButtonProps {
    text: string;
    className?: string;
    onClick?: () => void;
}

export default function Button({ text, className, onClick }: ButtonProps) {
    return (
        <button className={`bg-[#1A2E40] ${className || ''}`} onClick={onClick}>
            {text}
        </button>
    );
}