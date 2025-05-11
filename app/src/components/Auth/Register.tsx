'use client'

import { useState, useEffect } from "react";
import logo from "../../../public/logo.svg";
import Image from "next/image";
import FormField from "./Form_field";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function Register() {
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    const handleSignInClick = () => {
        router.push('/login');
    };

    const handleSignUpClick = () => {
        router.push('/');
    };

    useEffect(() => {
        setIsClient(true);  // Ensures this only runs on the client
    }, []);

    if (!isClient) {
        return null;  // Don't render anything until it's client-side
    }

    return (
        <div className="grid grid-cols-3 grid-rows-3 h-screen w-screen overflow-hidden items-center">
            <a href="/" className="m-[1rem]">
                <Image src={logo} alt="logo" className="invert-100 w-83" />
            </a>

            <div className="col-start-1 row-start-2 col-span-2 flex flex-col justify-center m-22">
                <p className="text-7xl">Login into</p>
                <p className="text-7xl">your account</p>
                <p className="text-2xl py-4">Make currency tracking easy peasy</p>
            </div>

            <div className="bg-[#1A2E40] col-start-2 row-start-2 col-span-2 row-span-2 rounded-[15px] h-[40rem] w-[45rem] p-[3rem] relative top-[-5rem] left-[25rem]">
                <FormField type="text" label="Username" />
                <br />
                <FormField type="text" label="Email" />
                <br />
                <FormField type="password" label="Password" />

                <div className="flex items-center justify-between my-15">
                    <p className="text-2xl">
                        Already have an account?
                        <a className="text-[#362ED4] underline ml-2 cursor-pointer" onClick={handleSignInClick}>
                            Sign in
                        </a>
                    </p>
                    <Button
                        onClick={handleSignUpClick}
                        text="Register"
                        className="text-6xl text-primary px-4 py-2 rounded-[15px] border border-black"
                    />
                </div>
            </div>
        </div>
    );
}
