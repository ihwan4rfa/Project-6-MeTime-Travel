import Navbar from '@/components/Fragments/Navbar'
import Sidebar from '@/components/Fragments/Sidebar'
import React from 'react'
import { useEffect, useState, useRef } from 'react'
import useAuth from '@/components/Hooks/useAuth'
import Image from 'next/image'

const Users = () => {

    const [users, setUsers] = useState([]);
    const { userLog } = useAuth();
    const [filterUsers, setFilterUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [user, setUser] = useState({});
    const [visibleUsers, setVisibleUsers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);
    const BATCH_SIZE = 10;

    useEffect(() => {
        userLog("all-user", (data) => {
            setUsers(data);
            setVisibleUsers(data.slice(0, BATCH_SIZE));
            setCurrentIndex(BATCH_SIZE);
        });
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current.scrollHeight - containerRef.current.scrollTop <= containerRef.current.clientHeight + 50) {
                loadMoreData();
            }
        };

        const container = containerRef.current;
        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, [currentIndex, users]);

    const loadMoreData = () => {
        if (currentIndex < users.length) {
            setVisibleUsers((prevVisibleUsers) => [
                ...prevVisibleUsers,
                ...users.slice(currentIndex, currentIndex + BATCH_SIZE)
            ]);
            setCurrentIndex((prevIndex) => prevIndex + BATCH_SIZE);
        }
    };

    useEffect(() => {
        setFilterUsers(
            users.filter((user) =>
                user.name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [users, search]);

    return (
        <div className='flex w-full h-screen bg-slate-100 font-poppins text-primaryblack'>
            <Navbar />
            <Sidebar />
            <div className='w-5/6 px-10 pt-24'>
                <div className='w-full h-full'>
                    <h1 className='text-2xl font-bold h-[9.5%]'>Users</h1>
                    <div className='h-[0.5%] bg-slate-300 bg-opacity-50 rounded-full'></div>
                    <div ref={containerRef} className='flex flex-col w-full h-[90%] overflow-y-scroll no-scrollbar gap-2'>
                        {visibleUsers.map((user, index) => (
                            <div key={index} className='flex items-center w-full bg-white h-fit rounded-xl'>
                                <div className='my-2 ml-2 overflow-hidden rounded-lg w-14 h-14'>
                                    {user.profilePictureUrl && user.profilePictureUrl.startsWith("https://")
                                        && (user.profilePictureUrl.includes((".jpg") && (".png") && ("images")) || user.profilePictureUrl.includes(".png") || user.profilePictureUrl.includes("images")) ?
                                        <img src={user.profilePictureUrl} className='object-cover w-full h-full' alt='Profile' />
                                        : <Image src="/images/unknown-profile-user.jpg" className='object-cover w-full h-full' width={100} height={100} alt='Unknown Profile' />
                                    }
                                </div>
                                <div className='flex items-center justify-between w-full font-medium'>
                                    <div className='flex flex-col gap-1 ml-5'>
                                        <h1>{user.name}</h1>
                                        <div className='flex text-[13px] gap-5 text-primarygray'>
                                            <div className='flex'>
                                                <h1><i class='fa-regular fa-envelope'></i></h1>
                                                <h1 className='ml-2'>{user.email}</h1>
                                            </div>
                                            <div className='flex'>
                                                <h1><i class="fa-brands fa-whatsapp"></i></h1>
                                                <h1 className='ml-2'>{user.phoneNumber}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <button className={`flex text-[13px] mr-4 ${user.role === "admin" ? "text-primaryblue" : "text-primaryred"}`}>
                                        <h1>{user.role}</h1>
                                        <h1 className='ml-2'><i class="fa-solid fa-pen-to-square"></i></h1>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users