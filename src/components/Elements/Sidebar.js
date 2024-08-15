import React from 'react'
import { useRouter } from 'next/router'

const Sidebar = () => {
    const router = useRouter();
    const currentPath = router.pathname;

    const linkList = {
        Users: "/dashboard/users",
        Categories: "/dashboard/categories",
        Destinations: "/dashboard/destinations",
        Promos: "/dashboard/promos",
        Banners: "/dashboard/banners"
    }

    const iconList = {
        Users: "fa-users",
        Categories: "fa-tag",
        Destinations: "fa-location-dot",
        Promos: "fa-percent",
        Banners: "fa-flag"
    }

    const keys = Object.keys(linkList);

    return (
        <div className='flex flex-col justify-between w-1/6 h-screen bg-white dark:bg-primaryblack text-primaryblack dark:text-slate-200'>
            <div className='flex flex-col gap-4 mt-[89px] text-[13px] font-medium'>
                <button onClick={() => router.push("/")} className='flex items-center justify-between px-4 py-2 mx-4 rounded-lg cursor-default cursor-scale lg:cursor-none hover:bg-slate-200 dark:hover:bg-slate-700'>
                    <h1>Preview</h1>
                    <div className='w-5'>
                        <h1><i class='fa-solid fa-globe text-primaryred'></i></h1>
                    </div>
                </button>
                <div className='h-[2px] mx-4 bg-primaryyellow opacity-20 rounded-full'></div>
                {keys.map((key, index) => (
                    <button key={index} onClick={() => router.push(linkList[key])} className={`cursor-default cursor-scale lg:cursor-none flex items-center justify-between px-4 py-2 mx-4 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 ${currentPath === linkList[key] ? 'bg-slate-200 dark:bg-slate-700' : ''}`}>
                        <h1>{key}</h1>
                        <div className='w-5'>
                            <h1><i class={`text-primaryred fa-solid ${iconList[key]}`}></i></h1>
                        </div>
                    </button>
                ))}
            </div>
            <h1 className='text-gray-400 dark:text-slate-500 text-[9px] lg:text-[10px] xl:text-[12px] text-center mb-5'>
                Developed by<a href='https://github.com/ihwan4rfa' className='py-2 cursor-default cursor-scale lg:cursor-none hover:text-primaryblue' target='_blank'><i class="fa-brands fa-github mx-1"></i>ihwan4rfa</a>
            </h1>
        </div>
    )
}

export default Sidebar
