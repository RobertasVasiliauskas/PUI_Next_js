import { useEffect } from 'react';

type RefType = React.RefObject<HTMLElement | null>;
type CallbackType = () => void;

export function useOutsideClick(ref: RefType, callback: CallbackType): void {
    useEffect(() => {
        if (typeof window === "undefined") return;

        function handleClickOutside(event: MouseEvent): void {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
}