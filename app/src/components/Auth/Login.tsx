'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import logo from "../../../public/logo.svg";
import FormField from "./Form_field";
import Button from "@/components/Button";

export default function Login() {
    const [isClient, setIsClient] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSignInClick = async () => {

        setError("");

        try {
            const payload = {
                email: email.trim(),
                password: password.trim(),
            };

            const response = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
        },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            let result;
            const contentType = response.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
                result = await response.json();
            } else {
                result = {};
            }

            if (response.ok) {
                router.push("/dashboard");
            } else {
                setError(result?.error || "Login failed");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            console.error("Error registering:", err);
        }
    };

    const handleSignUpClick = () => {
        router.push('/register');
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <div className="grid grid-cols-3 grid-rows-3 h-[32rem] w-full min-h-screen items-center">
            <a href="/" className="m-[1rem]">
                <Image src={logo} alt="logo" className="invert-100 w-83" />
            </a>

            <div className="col-start-1 row-start-2 col-span-2 flex flex-col justify-center m-22">
                <p className="text-7xl">Login into</p>
                <p className="text-7xl">your account</p>
                <p className="text-2xl py-4">Make currency tracking easy peasy</p>
            </div>

            <div className="bg-[#1A2E40] col-start-2 row-start-2 col-span-2 row-span-2 rounded-[15px] h-[30rem] w-[45rem] m-[25rem] p-[3rem]">
                <FormField type="text" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <FormField type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                {error && (
                    <p className="text-red-500 text-lg my-4">
                        {error}
                    </p>
                )}

                <div className="flex items-center justify-between my-15">
                    <p className="text-2xl">
                        Do not have an account?{" "}
                        <a className="text-[#362ED4] underline cursor-pointer" onClick={handleSignUpClick}>
                            Sign up
                        </a>
                    </p>
                    <Button
                        onClick={handleSignInClick}
                        text="Login"
                        className="text-6xl text-primary px-4 py-2 rounded-[15px] border border-black"
                    />
                </div>
            </div>
        </div>
    );
}
