import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../Hooks/useAuth';
import { setUser } from '@/redux/slice/userLoggedSlice';

const Navbar = () => {
    const router = useRouter();
    const currentPath = router.pathname;
    const { userLog } = useAuth();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userLogged.user)

    // Update global state (user) to ensure it's not null upon reload

    const getUserLogged = () => {
        const token = localStorage.getItem("token");
        if (token) {
            userLog("user", (res) => dispatch(setUser(res)));
        }
    }

    useEffect(() => {
        getUserLogged();
    }, []);
    
    // ===============================================================

    const linkList = {
        Home: "/",
        Destinations: "/destinations",
        Promo: "/promo",
        Login: "/login_register"
    }

    const modifiedLinklist = { ...linkList };
    if (user !== null) {
        delete modifiedLinklist.Login;
        modifiedLinklist.Dashboard = "/dashboard";
        modifiedLinklist.Logout = "/login_register";
    }

    const keys = Object.keys(modifiedLinklist);

    return (
        <nav className='fixed flex items-center justify-between w-full h-16 mb-12 bg-white shadow-lg shadow-slate-200 px-36 text-primaryblack font-poppins'>
            <button onClick={() => router.push(modifiedLinklist.Home)}><Image src="/images/Logo.png" width={130} height={80} /></button>
            <div className="flex items-center gap-16 text-sm font-medium">
                {keys.map((key, index) => (
                    <div key={index}>
                        <button
                            onClick={() => router.push(modifiedLinklist[key])}
                            className={`cursor-pointer hover:text-primaryred ${currentPath === modifiedLinklist[key] && currentPath === "/login_register" ? 'text-white bg-primaryred'
                                : (currentPath === modifiedLinklist[key] ? 'text-primaryred' : '')} ${key === "Login" ? "px-4 py-2 border hover:text-white hover:bg-primaryred rounded-lg border-primaryred" : ""}`}>
                            {key}
                        </button>
                    </div>
                ))}
            </div>
        </nav >
    )
}

export default Navbar
