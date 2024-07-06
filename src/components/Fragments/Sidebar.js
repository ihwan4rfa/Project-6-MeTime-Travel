import React, { useState } from 'react'
import { useRouter } from 'next/router'

const Sidebar = () => {
    const router = useRouter();
    const currentPath = router.pathname;
    console.log(currentPath);

    const linkList = {
        Users: "/dashboard/users",
        Banners: "/dashboard/banners",
        Promos: "/dashboard/promos",
        Categories: "/dashboard/categories",
        Destinations: "/dashboard/destinations"
    }

    const iconList = {
        Users: "fa-users",
        Banners: "fa-flag",
        Promos: "fa-percent",
        Categories: "fa-tag",
        Destinations: "fa-location-dot"
    }

    const keys = Object.keys(linkList);

    return (
        <div className='w-1/6 h-screen bg-white'>
            <div className='flex flex-col gap-3 mt-24 text-[13px] font-medium'>
                <button onClick={() => router.push("/")} className='flex items-center justify-between px-4 py-2 mx-4 bg-white rounded-lg cursor-pointer hover:bg-slate-200'>
                    <h1>Preview</h1>
                    <div className='w-5'>
                        <h1><i class='fa-solid fa-globe text-primaryred'></i></h1>
                    </div>
                </button>
                <div className='h-[2px] mx-4 bg-secondaryyellow rounded-full'></div>
                {keys.map((key, index) => (
                    <button key={index} onClick={() => router.push(linkList[key])} className={`flex items-center justify-between px-4 py-2 mx-4 rounded-lg cursor-pointer hover:bg-slate-200 ${currentPath === linkList[key] ? 'bg-slate-200' : ''}`}>
                        <h1>{key}</h1>
                        <div className='w-5'>
                            <h1><i class={`text-primaryred fa-solid ${iconList[key]}`}></i></h1>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
