"use client";

import {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import FormField from "./Form_field";
import Button from "@/components/Button";

export default function Register() {
    const [isClient, setIsClient] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    const handleSignUp = async () => {
        setError("");
        setSubmitting(true);

        try {
            const payload = {
                name: username.trim(),
                email: email.trim(),
                password: password.trim(),
            };

            const response = await fetch("http://localhost:3001/auth/register", {
                method: "PUT",
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
                setError(result?.error || "Registration failed");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            console.error("Error registering:", err);
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <div className="grid grid-cols-3 grid-rows-3 h-screen w-screen overflow-hidden items-center">
            <Link href="/" className="m-[1rem]">
                <Image src="/logo.svg" alt="logo" width={132} height={50} className="invert-100 w-83" />
            </Link>

            <div className="col-start-1 row-start-2 col-span-2 flex flex-col justify-center m-[5.5rem]">
                <p className="text-7xl">Register for</p>
                <p className="text-7xl">your account</p>
                <p className="text-2xl py-4">Make currency tracking easy peasy</p>
            </div>

            <div className="bg-[#1A2E40] col-start-2 row-start-2 col-span-2 row-span-2 rounded-[15px] h-[40rem] w-[45rem] p-[3rem] relative top-[-5rem] left-[25rem]">
                <FormField type="text" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <br />
                <FormField type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <FormField type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                {error && (
                    <p className="text-red-500 text-lg my-4">
                        {error}
                    </p>
                )}

                <div className="flex items-center justify-between my-[3.75rem]">
                    <p className="text-2xl">
                        Already have an account?
                        <Link href="/login" className="text-[#362ED4] underline ml-2 cursor-pointer">
                            Sign in
                        </Link>
                    </p>
                    <Button
                        onClick={handleSignUp}
                        text={submitting ? "Registering..." : "Register"}
                        className="text-6xl text-primary px-4 py-2 rounded-[15px] border border-black"
                        disabled={submitting}
                    />
                </div>
            </div>
        </div>
    );
}

