import Navbar from '@/components/Fragments/Navbar'
import Sidebar from '@/components/Fragments/Sidebar'
import React from 'react'
import { useEffect, useState, useRef } from 'react'
import useAuth from '@/components/Hooks/useAuth'
import Image from 'next/image'
import useUpdate from '@/components/Hooks/useUpdate'
import toast, { Toaster } from "react-hot-toast";

const Users = () => {

    const [users, setUsers] = useState([]);
    const { userLog } = useAuth();
    const [search, setSearch] = useState("");
    const [displayedUser, setDisplayedUser] = useState([]);
    const [currentUserBatchIndex, setCurrentUserBatchIndex] = useState(0);
    const containerRef = useRef(null);
    const displayedUserPerBatch = 15;
    const [activeIndex, setActiveIndex] = useState(null);
    const { update } = useUpdate();

    // Display first 15 users from API in initial load
    useEffect(() => {
        userLog("all-user", (data) => {
            setUsers(data);
            setDisplayedUser(data.slice(0, displayedUserPerBatch));
            setCurrentUserBatchIndex(displayedUserPerBatch);
        });
    }, []);

    // Handle scroll
    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current.scrollHeight - containerRef.current.scrollTop <= containerRef.current.clientHeight + 50) {
                loadMoreData();
            }
        };

        const container = containerRef.current;
        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, [currentUserBatchIndex, users]);

    // Load users on scroll 
    const loadMoreData = () => {
        if (currentUserBatchIndex < users.length) { // users changed every search changed and role updated
            setDisplayedUser((prevDisplayedUser) => [
                ...prevDisplayedUser,
                ...users.slice(currentUserBatchIndex, currentUserBatchIndex + displayedUserPerBatch)
            ]);
            setCurrentUserBatchIndex((prevUserBatchIndex) => prevUserBatchIndex + displayedUserPerBatch);
        }
    };

    // Event every search changed
    useEffect(() => {
        userLog("all-user", (data) => { // must be refetch every load new data
            const filtered = data.filter((user) =>
                user.name.toLowerCase().includes(search.toLowerCase())
            )
            setUsers(filtered); // update users every search changed

            setDisplayedUser(filtered.slice(0, displayedUserPerBatch));
            setCurrentUserBatchIndex(displayedUserPerBatch);
        });
    }, [search]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    // Handle update role
    const handleUpdateRole = async (user, role) => {
        const roleInputAPI = {
            role: role
        }
        const res = await update(`update-user-role/${user.id}`, roleInputAPI);

        // Event every role updated
        if (res.status === 200) {
            userLog("all-user", (data) => { // must be refetch every load new data
                const filtered = data.filter((user) =>
                    user.name.toLowerCase().includes(search.toLowerCase())
                )
                setUsers(filtered); // update users every updated role

                if (search === "") {
                    setDisplayedUser(data.slice(0, displayedUserPerBatch));
                    setCurrentUserBatchIndex(displayedUserPerBatch);
                } else {
                    setDisplayedUser(filtered.slice(0, displayedUserPerBatch));
                    setCurrentUserBatchIndex(displayedUserPerBatch);
                }
            });
            toast.success(<span>Updated <b>{user.name}</b> to <b className={`${role === "admin" ? 'text-primaryblue' : 'text-primaryred'}`}>{role}</b></span>);
        } else {
            toast.error(`Failed to update ${user.name}`);
        }

        setActiveIndex(null);
    };

    const handleDropDownToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className='flex w-full h-screen bg-slate-100 font-poppins text-primaryblack'>
            <Navbar />
            <Sidebar />
            <div className='w-5/6 px-10 pt-24'>
                <div className='flex flex-col w-full h-full'>
                    <div className='flex justify-between h-14'>
                        <h1 className='text-2xl font-semibold'>Users</h1>
                        <div className='flex items-center text-[13px] my-2'>
                            <h1 className={`mr-4 text-slate-400 ${search === "" ? 'hidden' : ''}`}><b>{users.length}</b> users found</h1>
                            <div className='flex py-2 bg-white rounded-lg text-primaryblack'>
                                <button className='px-4'><i class="fa-solid fa-magnifying-glass"></i></button>
                                <input onChange={handleSearch} type="text" placeholder="Search User" className="pr-4 bg-transparent outline-none placeholder:text-slate-300" />
                            </div>
                        </div>
                    </div>
                    <div className='h-[2px] bg-opacity-50 rounded-full bg-slate-300'></div>
                    <div ref={containerRef} className='flex flex-col flex-1 w-full gap-2 overflow-y-scroll no-scrollbar'>
                        {displayedUser.map((user, index) => (
                            <div key={index} className='flex items-center w-full bg-white h-fit rounded-xl'>
                                <div className='my-2 ml-2 overflow-hidden rounded-lg w-14 h-14'>
                                    {user.profilePictureUrl && user.profilePictureUrl.startsWith("https://")
                                        && (user.profilePictureUrl.includes((".jpg") && (".png") && ("images")) || user.profilePictureUrl.includes(".png") || user.profilePictureUrl.includes("images")) ?
                                        <img src={user.profilePictureUrl} className='object-cover w-full h-full' alt='Profile' />
                                        : <Image src="/images/unknown-profile-user.jpg" className='object-cover w-full h-full' width={100} height={100} alt='Unknown Profile' />
                                    }
                                </div>
                                <div className='flex items-center justify-between w-full font-medium'>
                                    <div className='flex flex-col gap-1 ml-3'>
                                        <h1 className='text-[13px] font-semibold'>{user.name}</h1>
                                        <div className='flex text-[11px] gap-3 text-primarygray'>
                                            <div className='flex'>
                                                <h1><i class='fa-regular fa-envelope'></i></h1>
                                                <h1 className='ml-1'>{user.email}</h1>
                                            </div>
                                            <div className='flex'>
                                                <h1><i class="fa-brands fa-whatsapp"></i></h1>
                                                <h1 className='ml-1'>{user.phoneNumber}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='relative flex justify-end w-full mr-4 text-[11px]'>
                                        <button onClick={() => handleDropDownToggle(index)} className={`flex ${user.role === "admin" ? "text-primaryblue" : "text-primaryred"}`}>
                                            <h1>{user.role}</h1>
                                            <h1 className='ml-2'><i class="fa-solid fa-pen-to-square"></i></h1>
                                        </button>
                                        <div className={`absolute right-0 w-36 z-10 mt-6 bg-white shadow-lg text-primaryblack rounded-lg ${activeIndex === index ? '' : 'hidden'}`}>
                                            <div className="px-2">
                                                <button
                                                    onClick={() => handleUpdateRole(user, 'admin')} type="button" className={`flex items-center justify-between w-full px-4 py-1 my-2 rounded-md hover:bg-slate-200 ${user.role === 'admin' ? 'bg-slate-200' : ''}`}>
                                                    <h1>admin</h1>
                                                    <h1 className={'text-primaryblue'}><i class="fa-solid fa-user-plus"></i></h1>
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateRole(user, 'user')} type="button" className={`flex items-center justify-between w-full px-4 py-1 my-2 rounded-md hover:bg-slate-200 ${user.role === 'user' ? 'bg-slate-200' : ''}`}>
                                                    <h1>user</h1>
                                                    <h1 className='text-primaryred'><i class="fa-solid fa-user"></i></h1>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="text-[11px] text-left">
                            <Toaster
                                position="top-center"
                                toastOptions={{
                                    duration: 3000,
                                    success: {
                                        style: {
                                            background: 'white',
                                            color: 'black'
                                        },
                                        iconTheme: {
                                            primary: '#10b981',
                                            secondary: 'white'
                                        }
                                    },
                                    error: {
                                        style: {
                                            background: '#DF6951',
                                            color: 'white',
                                        },
                                        iconTheme: {
                                            primary: 'white',
                                            secondary: '#DF6951'
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users