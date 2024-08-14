import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../../Hooks/useAuth';
import { setUser, clearUser } from '@/redux/slice/userLoggedSlice';
import ModalProfile from '../Elements/ModalProfile';
import { setShowModal } from '@/redux/slice/showModalSlice';
import { dark, light } from '@/redux/slice/themeSlice';

const Navbar = () => {
    const router = useRouter();
    const currentPath = router.pathname;
    const { userLog } = useAuth();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userLogged.user);
    const showModal = useSelector((state) => state.showModal.modal);
    const [dropDownHidden, setDropDownHidden] = useState(true);
    const [showProfile, setShowProfile] = useState(false);
    const isDark = useSelector((state) => state.theme.isDark);
    const [menuBarClicked, setMenuBarClicked] = useState(false);

    useEffect(() => {
        getUserLogged();
    }, []);

    const handleTheme = () => {
        dispatch(isDark ? light() : dark());
        setDropDownHidden(!dropDownHidden);
        setMenuBarClicked(false);
    }

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

    const handleDropDownToggle = () => {
        setDropDownHidden(!dropDownHidden);
    };

    const handleMenuBarToggle = () => {
        setMenuBarClicked(!menuBarClicked);
        setDropDownHidden(true);
    };

    const handleShowProfile = () => {
        setShowProfile(!showProfile);
        dispatch(setShowModal(!showProfile));
        showProfile === true ? setDropDownHidden(true) : setDropDownHidden(!dropDownHidden);
        setMenuBarClicked(false);
    }

    const linkList = {
        Home: "/",
        Destinations: "/destinations",
        Promos: "/promos",
        Login: "/login_register"
    }

    let modifiedLinkList = { ...linkList };

    if (user?.role === "admin") {
        if (currentPath.startsWith("/dashboard")) {
            modifiedLinkList = {};
        } else {
            delete modifiedLinkList.Login;
        }
    } else if (user) {
        delete modifiedLinkList.Login;
    }

    const keys = Object.keys(modifiedLinkList);

    return (
        <div className='text-[10px] lg:text-[11px] xl:text-[13px] font-poppins'>
            <div className={`${currentPath.startsWith('/dashboard') ? 'px-10' : 'lg:px-36 sm:px-10 px-5'} ${showProfile || showModal || currentPath.startsWith('/dashboard') ? 'bg-opacity-100' : 'bg-opacity-[85%] backdrop-blur-lg dark:bg-opacity-[85%] dark:backdrop-blur-lg'} z-[51] fixed flex items-center justify-between w-full h-12 md:h-14 xl:h-16 bg-white dark:bg-primaryblack shadow-navbar3 md:shadow-navbar2 xl:shadow-navbar dark:shadow-slate-600 text-primaryblack`}>
                <button onClick={() => currentPath.startsWith("/dashboard") ? router.push("/dashboard/users") : router.push(linkList.Home)} className='cursor-scale'><Image className='w-auto h-7 md:h-8 xl:h-9' src={isDark ? "/images/Logo-dark.png" : "/images/Logo.png"} width={500} height={500} /></button>
                <button onClick={handleMenuBarToggle} className='flex items-center justify-center text-lg sm:hidden dark:text-white'>{menuBarClicked ? <i class="fa-solid fa-xmark text-xl"></i> : <i class="fa-solid fa-bars"></i>}</button>
                <div className="items-center hidden gap-10 font-medium lg:gap-14 xl:gap-16 sm:flex">
                    {keys.map((key, index) => (
                        <div key={index}>
                            <button
                                onClick={() => router.push(modifiedLinkList[key])}
                                className={`cursor-scale dark:text-white hover:text-primaryred dark:hover:text-primaryyellow ${currentPath === modifiedLinkList[key] && currentPath === "/login_register" ? 'text-white bg-primaryred dark:bg-primaryyellow'
                                    : (currentPath === modifiedLinkList[key] ? 'text-primaryred dark:text-yellowprimary' : '')} ${key === "Login" ? "px-3 lg:px-4 py-[6px] lg:py-2 border hover:text-white dark:hover:text-white hover:bg-primaryred dark:hover:bg-primaryyellow rounded-lg border-primaryred dark:border-primaryyellow" : ""}`}>
                                {key}
                            </button>
                        </div>
                    ))}
                    {user && (
                        <div className='relative flex w-full'>
                            <button onClick={handleDropDownToggle} className='flex items-center w-fit cursor-scale'>
                                <div className='mr-2 overflow-hidden rounded-md w-7 h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 xl:mr-3 xl:rounded-lg'>
                                    <img src={user.profilePictureUrl} className='object-cover w-full h-full'></img>
                                </div>
                                <div className='text-left'>
                                    <div className='flex items-center dark:text-slate-200'>
                                        <h1 className='mr-2 capitalize'>{getFirstName(user.name)}</h1>
                                        <i class={`${user.role === 'admin' ? 'text-primaryblue' : 'text-primaryred'} fa-solid ${dropDownHidden ? 'fa-caret-down' : 'fa-caret-up'}`}></i>
                                    </div>
                                    <p className='text-[8px] lg:text-[9px] xl:text-[11px] leading-3 text-primarygray dark:text-slate-400 capitalize'>{user.role}</p>
                                </div>
                            </button>
                            <div className={`absolute right-0 w-32 xl:w-36 z-10 mt-14 bg-white dark:bg-primaryblack dark:text-slate-200 shadow-dropdown dark:shadow-slate-600 text-primaryblack rounded-lg ${dropDownHidden ? 'hidden' : ''}`}>
                                <div className="px-2">
                                    <button
                                        onClick={handleShowProfile} className='flex items-center justify-between w-full px-2 py-1 my-2 rounded-md cursor-scale xl:px-4 hover:bg-slate-200 dark:hover:bg-slate-700'>
                                        <h1>Profile</h1>
                                        <h1 className={`text-[8px] lg:text-[9px] xl:text-[11px] ${user.role === 'admin' ? 'text-primaryblue' : 'text-primaryred'}`}><i class={`fa-solid ${user?.role === "admin" ? 'fa-user-plus' : 'fa-user'}`}></i></h1>
                                    </button>
                                    <button
                                        onClick={currentPath.startsWith("/dashboard") ? () => router.push("/") : () => router.push("dashboard/users")} className={`${user.role === "admin" ? '' : 'hidden'} cursor-scale flex items-center w-full justify-between px-2 xl:px-4 py-1 my-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700`}>
                                        <h1>{currentPath.startsWith("/dashboard") ? "Preview" : "Dashboard"}</h1>
                                        <h1 className={`text-[8px] lg:text-[9px] xl:text-[11px] ${user.role === 'admin' ? 'text-primaryblue' : 'text-primaryred'}`}><i class={`fa-solid ${currentPath.startsWith("/dashboard") ? 'fa-globe' : 'fa-table-columns'}`}></i></h1>
                                    </button>
                                    <button
                                        onClick={handleTheme} className='flex items-center justify-between w-full px-2 py-1 my-2 rounded-md cursor-scale xl:px-4 hover:bg-slate-200 dark:hover:bg-slate-700'>
                                        <h1>{isDark ? 'Light' : 'Dark'}</h1>
                                        <h1 className={`text-[8px] lg:text-[9px] xl:text-[11px] ${user.role === 'admin' ? 'text-primaryblue' : 'text-primaryred'}`}><i class={`fa-solid ${isDark ? 'fa-sun' : 'fa-moon mr-[2px]'}`}></i></h1>
                                    </button>
                                    <button
                                        onClick={logout} className='flex items-center justify-between w-full px-2 py-1 my-2 rounded-md cursor-scale xl:px-4 hover:bg-slate-200 dark:hover:bg-slate-700'>
                                        <h1>Logout</h1>
                                        <h1 className={`text-[8px] lg:text-[9px] xl:text-[11px] ${user.role === 'admin' ? 'text-primaryblue' : 'text-primaryred'}`}><i class="fa-solid fa-right-from-bracket"></i></h1>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div >
            <div className={`absolute ${menuBarClicked ? 'top-0' : '-top-56'} z-50 flex font-medium sm:hidden items-left w-full px-5 pt-[70px] pb-7 duration-300 ease-in-out bg-white dark:bg-primaryblack rounded-b-xl shadow-button dark:shadow-slate-600`}>
                <div className='flex flex-col gap-5'>
                    {keys.map((key, index) => (
                        <div key={index}>
                            <button
                                onClick={() => router.push(modifiedLinkList[key])}
                                className={`cursor-pointer dark:text-white hover:text-primaryred dark:hover:text-primaryyellow ${currentPath === modifiedLinkList[key] && currentPath === "/login_register" ? 'text-white bg-primaryred dark:bg-primaryyellow'
                                    : (currentPath === modifiedLinkList[key] ? 'text-primaryred dark:text-yellowprimary' : '')} ${key === "Login" ? "px-3 lg:px-4 py-[6px] lg:py-2 border hover:text-white dark:hover:text-white hover:bg-primaryred dark:hover:bg-primaryyellow rounded-lg border-primaryred dark:border-primaryyellow" : ""}`}>
                                {key}
                            </button>
                        </div>
                    ))}
                </div>
                {user && (
                    <div className='relative flex items-start justify-end w-full'>
                        <button onClick={handleDropDownToggle} className='flex items-center w-fit'>
                            <div className='mr-2 overflow-hidden rounded-md w-7 h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 xl:mr-3 xl:rounded-lg'>
                                <img src={user.profilePictureUrl} className='object-cover w-full h-full'></img>
                            </div>
                            <div className='text-left'>
                                <div className='flex items-center dark:text-slate-200'>
                                    <h1 className='mr-2 capitalize'>{getFirstName(user.name)}</h1>
                                    <i class={`${user.role === 'admin' ? 'text-primaryblue' : 'text-primaryred'} fa-solid ${dropDownHidden ? 'fa-caret-down' : 'fa-caret-up'}`}></i>
                                </div>
                                <p className='text-[8px] lg:text-[9px] xl:text-[11px] leading-3 text-primarygray dark:text-slate-400 capitalize'>{user.role}</p>
                            </div>
                        </button>
                        <div className={`absolute w-32 z-10 mt-10 bg-white dark:bg-primaryblack dark:text-slate-200 shadow-dropdown dark:shadow-slate-600 text-primaryblack rounded-lg ${dropDownHidden ? 'hidden' : ''}`}>
                            <div className="px-2">
                                <button
                                    onClick={handleShowProfile} className='flex items-center justify-between w-full px-2 py-1 my-2 rounded-md xl:px-4 hover:bg-slate-200 dark:hover:bg-slate-700'>
                                    <h1>Profile</h1>
                                    <h1 className={`text-[8px] lg:text-[9px] xl:text-[11px] ${user.role === 'admin' ? 'text-primaryblue' : 'text-primaryred'}`}><i class={`fa-solid ${user?.role === "admin" ? 'fa-user-plus' : 'fa-user'}`}></i></h1>
                                </button>
                                <button
                                    onClick={currentPath.startsWith("/dashboard") ? () => router.push("/") : () => router.push("dashboard/users")} className={`${user.role === "admin" ? '' : 'hidden'} flex items-center w-full justify-between px-2 xl:px-4 py-1 my-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700`}>
                                    <h1>{currentPath.startsWith("/dashboard") ? "Preview" : "Dashboard"}</h1>
                                    <h1 className={`text-[8px] lg:text-[9px] xl:text-[11px] ${user.role === 'admin' ? 'text-primaryblue' : 'text-primaryred'}`}><i class={`fa-solid ${currentPath.startsWith("/dashboard") ? 'fa-globe' : 'fa-table-columns'}`}></i></h1>
                                </button>
                                <button
                                    onClick={handleTheme} className='flex items-center justify-between w-full px-2 py-1 my-2 rounded-md xl:px-4 hover:bg-slate-200 dark:hover:bg-slate-700'>
                                    <h1>{isDark ? 'Light' : 'Dark'}</h1>
                                    <h1 className={`text-[8px] lg:text-[9px] xl:text-[11px] ${user.role === 'admin' ? 'text-primaryblue' : 'text-primaryred'}`}><i class={`fa-solid ${isDark ? 'fa-sun' : 'fa-moon mr-[2px]'}`}></i></h1>
                                </button>
                                <button
                                    onClick={logout} className='flex items-center justify-between w-full px-2 py-1 my-2 rounded-md xl:px-4 hover:bg-slate-200 dark:hover:bg-slate-700'>
                                    <h1>Logout</h1>
                                    <h1 className={`text-[8px] lg:text-[9px] xl:text-[11px] ${user.role === 'admin' ? 'text-primaryblue' : 'text-primaryred'}`}><i class="fa-solid fa-right-from-bracket"></i></h1>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <ModalProfile showProfile={showProfile} handleShowProfile={handleShowProfile} />
        </div>
    )
}

export default Navbar
