'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '../Button';
import Navbar from './Navbar';
import Search from './Search';
import logo from '../../../public/logo.svg';

export default function Header({ isAuthenticated }: { isAuthenticated: boolean }) {
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    const pathname = usePathname();

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

    const handleLoginClick = () => {
        router.push('/login');
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    const hideHeader = pathname === '/login' || pathname === '/register';

    if (hideHeader || !isClient) return null;

    return (
        <header className="h-32 flex items-center justify-between px-8">
            <Image src={logo} alt="logo" width={200} height={200} className="invert h-32 -ml--12" />
            <Navbar />
            <div className="flex items-center space-x-4">
                <Search />

                {isAuthenticated ? (
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => console.log(isAuthenticated)}
                            className="text-2xl text-primary px-4 py-2 rounded-lg"
                        >
                            Profile
                        </button>
                        <button
                            onClick={handleLogout}
                            className="text-2xl text-red-500 px-4 py-2 rounded-lg"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Button onClick={handleLoginClick} text="Login" className="text-2xl text-primary px-4 py-2 rounded-lg" />
                )}
            </div>
        </header>
    );
}
