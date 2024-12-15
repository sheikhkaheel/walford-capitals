import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './Nav.css';
import 'animate.css';

export default function Nav() {
    const [openMenu, setOpenMenu] = useState(false);

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    };

    return (
        <nav className="h-20 navBorder overflow-hidden">
            <div className="animate__animated animate__fadeInDown header lg:pt-4 lg:pr-4 lg:pl-2 flex justify-between text-zinc-300">
                <Link to="/main"><img src="../../../../Logo.png" className="w-20 pt-6 pl-4 lg:w-20 lg:h-8 lg:pt-0 mt-2  lg:px-2" alt="" /></Link>

                <div className="lg:hidden pt-6 text-3xl" onClick={toggleMenu}>
                    <i className={` ${openMenu ? 'fa-solid fa-xmark text-2xl' : 'fa-solid fa-bars'} z-30 absolute right-4`}></i>
                </div>

                <div className={`links work-sans-normal flex lg:text-[1rem] lg:w-1/2 lg:flex-row ${openMenu ? 'bg-black bg-opacity-30 backdrop-blur-2xl p-8 rounded-lg shadow-lg py-48 flex-col h-dvh z-20 items-center justify-around text-xl absolute w-dvw' : 'hidden lg:block'}`}>
                    <ol className="flex justify-around pt-3">
                        <li><Link className="mr-6" to="/main">Home</Link></li>
                        <li><Link className="mr-6" to="#">Events</Link></li>
                        <li><Link className="mr-6" to="#">About us</Link></li>
                        <li><Link className="mr-6" to="/dashboard">Dashboard</Link></li>
                    </ol>
                </div>

                <Link to='/'>
                    <button className="w-28 work-sans-normal md:block lg:visible invisible rounded-full text-md py-3 transition bg-white text-black hover:bg-lime-700 hover:text-white" >
                        Sign Up
                    </button>
                </Link>
            </div>
        </nav>
    );
}
