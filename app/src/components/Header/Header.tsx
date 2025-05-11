'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '../Button';
import Navbar from './Navbar';
import Search from './Search';
import logo from '../../../public/logo.svg';

export default function Header() {
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    const handleLoginClick = () => {
        router.push('/login');
    };

    useEffect(() => {
        setIsClient(true);  // Ensures this only runs on the client
    }, []);

    if (!isClient) {
        return null;  // Don't render anything until it's client-side
    }

    return (
        <header className="h-32 flex items-center justify-between px-8">
            <Image src={logo} alt="logo" width={100} height={100} className="invert h-32 -ml-12" />
            <Navbar />
            <div className="flex items-center space-x-4">
                <Search />
                <Button onClick={handleLoginClick} text="Login" className="text-2xl text-primary px-4 py-2 rounded-lg" />
            </div>
        </header>
    );
}
