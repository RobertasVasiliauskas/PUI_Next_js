'use client';

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Profile() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:3001/auth/logout", {
                method: "POST",
                credentials: "include",
            });

            if (response.ok) {
                router.push("/login");
            } else {
                console.error("Failed to log out");
            }
        } catch (err) {
            console.error("Error during logout:", err);
        }
    };

    const handleMenu = () => setOpen(prev => !prev);

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            <button
                onClick={handleMenu}
                className="bg-[#223A53] hover:bg-[#2e4a6d] text-white px-5 py-2 rounded-[15px] text-3xl font-medium transition duration-150"
            >
                Profile
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-40 bg-[#223A53]  rounded-[15px] shadow-lg ring-1 ring-black/10 z-50"
                    >
                        <ul className="py-2 text-sm text-gray-800">
                            <li
                                onClick={handleLogout}
                                className="px-4 py-2 text-white text-xl cursor-pointer transition text-center"
                            >
                                Logout
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
