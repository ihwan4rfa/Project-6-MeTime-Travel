import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image';

const Navbar = () => {
    const router = useRouter();
    const currentPath = router.pathname;

    const linkList = {
        Home: "/",
        Destinations: "/destinations",
        Promo: "/promo",
        Login: "/login_register"
    }
    const keys = Object.keys(linkList);

    return (
        <nav className='fixed flex items-center justify-between w-full h-16 mb-12 bg-white shadow-lg shadow-slate-200 px-36 text-primaryblack font-poppins'>
            <Image src="/images/Logo.png" width={130} height={80} />
            <div className="flex items-center gap-16 text-sm font-medium">
                {keys.map((key, index) => (
                    <div key={index}>
                        <button onClick={() => router.push(linkList[key])} className={`cursor-pointer hover:text-primaryred ${currentPath === linkList[key] ? 'text-primaryred' : ''} ${key === "Login" ? "px-4 py-2 border hover:text-white hover:bg-primaryred rounded-lg border-primaryred" : ""}`}>{key}</button>
                    </div>
                ))}
            </div>
        </nav >
    )
}

export default Navbar
