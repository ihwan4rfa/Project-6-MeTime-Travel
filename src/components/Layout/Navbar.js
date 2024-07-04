import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../Hooks/useAuth';
import { setUser, clearUser } from '@/redux/slice/userLoggedSlice';

const Navbar = () => {
    const router = useRouter();
    const currentPath = router.pathname;
    const { userLog } = useAuth();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userLogged.user);

    useEffect(() => {
        getUserLogged();
    }, []);

    // Update global state (user) to ensure it's not null upon reload
    const getUserLogged = () => {
        const token = localStorage.getItem("token");
        if (token) {
            userLog("user", (res) => dispatch(setUser(res)));
        }
    }
    // ===============================================================

    const getFirstName = (fullName) => {
        return fullName.split(' ')[0];
    }

    const logout = async () => {
        await userLog("logout");
        dispatch(clearUser());
        router.push("/login_register");
    }

    const linkList = {
        Home: "/",
        Destinations: "/destinations",
        Promo: "/promo",
        Login: "/login_register"
    }

    const modifiedLinklist = { ...linkList };
    if (user?.role === "admin") {
        delete modifiedLinklist.Login;
        modifiedLinklist.Dashboard = "/dashboard/user";
    } else if (user) {
        delete modifiedLinklist.Login;
    }

    const keys = Object.keys(modifiedLinklist);

    return (
        <nav className={`${currentPath.startsWith('/dashboard') ? 'px-10' : 'px-36'} fixed flex items-center justify-between w-full h-16 mb-12 bg-white shadow-lg shadow-slate-200 text-primaryblack font-poppins`}>
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
                {user && (
                    <button className='flex items-center w-fit'>
                        <div className='rounded-lg h-10 w-10 overflow-hidden mr-3'>
                            <img src={user.profilePictureUrl} className='h-full w-full object-cover'></img>
                        </div>
                        <div className='text-left'>
                            <div className='flex items-center'>
                                <h1 className='mr-2'>{getFirstName(user.name)}</h1>
                                <i class={`${user.role === 'admin' ? 'text-primaryblue' : 'text-primaryred'} fa-solid fa-caret-down`}></i>
                            </div>
                            <p className='text-[10px] leading-3 text-primarygray'>{user.role}</p>
                        </div>
                    </button>
                )}
            </div>
        </nav >
    )
}

export default Navbar
