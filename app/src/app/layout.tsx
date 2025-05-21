import { cookies } from 'next/headers';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import UserProvider from '@/components/UserProvider';
import jwt from 'jsonwebtoken';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

async function getUserFromAuthCookie() {
    const cookie = await cookies();
    const token = cookie.get('auth')?.value;

    if (!token) return null;

    try {
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not set');
            return null;
        }
        return jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    } catch (err) {
        console.error('Invalid JWT', err);
        return null;
    }
}

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    const user = await getUserFromAuthCookie();
    const isAuthenticated = !!user;

    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider user={user}>
            <Header isAuthenticated={isAuthenticated} />
            {children}
        </UserProvider>
        </body>
        </html>
    );
}
