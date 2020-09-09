import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../utils/userContext";
import './header.css';


// Refer to this to auto collapse menu after clicking off it
// https://medium.com/@pitipatdop/little-neat-trick-to-capture-click-outside-with-react-hook-ba77c37c7e82


function Header() {

    const { user } = useContext(UserContext);

    function toggleNav() {
        document.getElementById("nav-content").classList.toggle("slide");
    }


    return (
        <nav className="flex shadow items-center justify-between flex-wrap bg-red p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
                <span className="font-semibold text-xl tracking-tight">Combat</span>
            </div>
            <div className="block sm:hidden">
                <button
                    className="flex items-center px-3 py-2 border rounded text-red-200 border-red-400 hover:text-white hover:border-white"
                    onClick={() => toggleNav()}>
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
            </div>
            <div className="w-full block flex-grow flex items-center w-full sm:w-auto">
                <div id="nav-content" className=" sm:block text-sm w-full sm:flex-grow">

                    {/* Only visable on hamburger expanded */}
                    <div className="block border-b-2 pb-1 border-red-900 sm:hidden w-full flex align-center items-center justify-center">
                        {
                            !user.username ?
                                <Link to="/login" className="self-end inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-red-500 hover:bg-white mt-4 sm:mt-0">Login</Link>
                                :
                                <div className="inline-block">
                                    <div className="inline-block text-sm text-white mr-4">
                                        Hello <Link to={"/user/" + user.username} className="text-white font-semibold ">{user.username}</Link>
                                    </div>
                                    <button className="inline-block text-sm mr-4 px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-red-500 hover:bg-white mt-4 sm:mt-0">Logout</button>
                                </div>
                        }
                    </div>


                    <Link to="/" className="block mt-4 sm:inline-block sm:mt-0 text-red-200 hover:text-white mr-4">
                        Home
                    </Link>
                    <Link to="/features" className="block mt-4 sm:inline-block sm:mt-0 text-red-200 hover:text-white mr-4">
                        Features
                    </Link>
                    <Link to="/user" className="block mt-4 sm:inline-block sm:mt-0 text-red-200 hover:text-white mr-4">
                        Users
                    </Link>
                </div>
            </div>

            <div className="hidden sm:inline-block">
                {
                    !user.username ?
                        <Link to="/login" className="self-end inline-block text-sm px-4 py-2 mr-4 leading-none border rounded text-white border-white hover:border-transparent hover:text-red-500 hover:bg-white mt-4 sm:mt-0">Login</Link>
                        :
                        <div className="inline-block">
                            <div className="inline-block text-sm text-white mr-4">
                                Hello <Link to={"/user/" + user.username} className="text-white font-semibold ">{user.username}</Link>
                            </div>
                            <button className="inline-block text-sm mr-4 px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-red-500 hover:bg-white mt-4 sm:mt-0">Logout</button>
                        </div>
                }
            </div>
        </nav>
    );
}

export default Header;