import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import Form_field from "./Form_field.jsx";
import Button from "../Button.jsx";

export default function Login() {
    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate('/');
    };

    const handleSignUpClick = () => {
        navigate('/register');
    };

    return (
        <div className="grid grid-cols-3 grid-rows-3 h-[32rem] w-full min-h-screen items-center">

            <a href="/" className="m-[1rem]">
                <img src={logo} alt="logo" className="invert-100 w-83" />
            </a>

            <div className="col-start-1 row-start-2 col-span-2 flex flex-col justify-center m-22">
                <p className="text-7xl">Login into</p>
                <p className="text-7xl">your account</p>
                <p className="text-2xl py-4">Make currency tracking easy peasy</p>
            </div>

            <div className={"bg-[#1A2E40] col-start-2 row-start-2 col-span-2 row-span-2 rounded-[15px] h-[30rem] w-[45rem] m-[25rem] p-[3rem]"}>
                <Form_field type="text" label="Email" />
                <br/>
                <Form_field type="password" label="Password" />

                <div className={"flex items-center justify-between my-15 "}>
                    <p className="text-2xl">Do not have an account? <a className={"text-[#362ED4] underline"} onClick={handleSignUpClick}> Sign up </a> </p>
                    <Button
                        onClick={handleSignUpClick}
                        text={"Login"}
                        className="text-6xl text-primary px-4 py-2 rounded-[15px] border-solid border-1 border-black"
                    />
                </div>
            </div>
        </div>
    );
}