import {useNavigate}  from "react-router-dom";

import logo from '../../assets/logo.svg'
import Button from '../Button.jsx'
import Navbar from './Navbar.jsx';
import Search from './Search.jsx'

export default function Header() {

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <header className={"h-[8rem] flex items-center justify-between px-[2rem]"}>
            <img src={logo} alt={"logo"} className={"invert-100 h-[8rem] -ml-[50px]"}/>
            <Navbar />
            <div className={"flex items-center space-x-4"}>
                <Search/>
                <Button onClick={handleLoginClick} text={"Login"} className={"text-2xl text-primary px-4 py-2 rounded-[15px]"} />
            </div>
        </header>
    )
}