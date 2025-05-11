import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navitem from './Navitem.jsx';

import icon_feed from '../../assets/Feather.svg';
import icon_convert from '../../assets/Divide_square.svg';
import icon_compare from '../../assets/Book_open.svg';
import icon_dashboard from '../../assets/Sidebar.svg';

export default function Navbar() {
    const [activeTab, setActiveTab] = useState('Dashboard');
    const navigate = useNavigate();

    const handleNavClick = (tab, path) => {
        setActiveTab(tab);
        navigate(path);
    };

    return (
        <nav className={"bg-[#1A2E40] flex rounded-[15px] justify-center"}>
            <ul className={"flex grow items-center justify-center"}>
                <Navitem icon={icon_dashboard} title={"Dashboard"} isActive={activeTab === 'Dashboard'} onClick={() => handleNavClick('Dashboard', '/')} />
                <Navitem icon={icon_convert} title={"Convert"} isActive={activeTab === 'Convert'} onClick={() => handleNavClick('Convert', '/convert')} />
                <Navitem icon={icon_compare} title={"Compare"} isActive={activeTab === 'Compare'} onClick={() => handleNavClick('Compare', '/compare')} />
                <Navitem icon={icon_feed} title={"News"} isActive={activeTab === 'News'} onClick={() => handleNavClick('News', '/news')} />
            </ul>
        </nav>
    );
}