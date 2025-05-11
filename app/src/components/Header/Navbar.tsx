'use client';

import { usePathname, useRouter } from 'next/navigation';
import Navitem from './Navitem';

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    const handleNavClick = (path: string) => {
        router.push(path);
    };

    return (
        <nav className="bg-[#1A2E40] flex rounded-[15px] justify-center">
            <ul className="flex grow items-center justify-center">
                <Navitem
                    icon="/Sidebar.svg"
                    title="Dashboard"
                    isActive={pathname === '/'}
                    onClick={() => handleNavClick('/')}
                />
                <Navitem
                    icon="/Divide_square.svg"
                    title="Convert"
                    isActive={pathname === '/convert'}
                    onClick={() => handleNavClick('/convert')}
                />
                <Navitem
                    icon="/Book_open.svg"
                    title="Compare"
                    isActive={pathname === '/compare'}
                    onClick={() => handleNavClick('/compare')}
                />
                <Navitem
                    icon="/Feather.svg"
                    title="News"
                    isActive={pathname === '/news'}
                    onClick={() => handleNavClick('/news')}
                />
            </ul>
        </nav>
    );
}
