'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import logo from "../../../public/logo.svg";
import FormField from "./Form_field";
import Button from "@/components/Button";
import Link from 'next/link';

export default function Login() {
    const [isClient, setIsClient] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleLogin = async () => {
        setError('');

        const res = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            router.push('/');
        } else {
            const data = await res.json();
            setError(data?.message || 'Login failed');
        }
    };

    if (!isClient) return null;

    return (
        <div className="grid grid-cols-3 grid-rows-3 h-[32rem] w-full min-h-screen items-center">
            <Link href="/" className="m-[1rem]">
                <Image src={logo} alt="logo" className="invert-100 w-83" />
            </Link>

            <div className="col-start-1 row-start-2 col-span-2 flex flex-col justify-center m-22">
                <p className="text-7xl">Login into</p>
                <p className="text-7xl">your account</p>
                <p className="text-2xl py-4">Make currency tracking easy peasy</p>
            </div>

            <div className="bg-[#1A2E40] col-start-2 row-start-2 col-span-2 row-span-2 rounded-[15px] h-[30rem] w-[45rem] m-[25rem] p-[3rem]">
                <FormField type="text" label="Email" onChange={setEmail} />
                <br />
                <FormField type="password" label="Password" onChange={setPassword} />

                {error && <p className="text-red-500 text-xl mt-4">{error}</p>}

                <div className="flex items-center justify-between mt-8">
                    <p className="text-2xl">
                        Do not have an account?{' '}
                        <span
                            className="text-[#362ED4] underline cursor-pointer"
                            onClick={() => router.push('/register')}
                        >
                            Sign up
                        </span>
                    </p>
                    <Button
                        onClick={handleLogin}
                        text="Login"
                        className="text-4xl text-primary px-4 py-2 rounded-[15px] border border-black"
                    />
                </div>
            </div>
        </div>
    );
}
