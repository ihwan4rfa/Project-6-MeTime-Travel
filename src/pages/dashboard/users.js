import Navbar from '@/components/Fragments/Navbar'
import Sidebar from '@/components/Fragments/Sidebar'
import React from 'react'

const Users = () => {
    return (
        <div className='flex w-full h-screen bg-slate-100 font-poppins'>
            <Navbar />
            <Sidebar />
        </div>
    )
}

export default Users