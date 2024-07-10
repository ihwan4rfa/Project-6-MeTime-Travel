import React from 'react'
import { useSelector } from 'react-redux';

const ModalProfile = ({ showProfile, handleShowProfile }) => {
    const user = useSelector((state) => state.userLogged.user);

    return (
        user && (
            <>
                <div className={`absolute z-20 w-full h-full opacity-40 bg-primaryblack ${showProfile === true ? '' : 'hidden'}`}></div>
                <div className={`${showProfile === true ? '' : 'hidden'} absolute z-30 flex items-center justify-center w-full h-full`}>
                    <div className='bg-white shadow-lg h-[220px] w-[450px] rounded-lg text-[13px] flex justify-center relative text-primaryblack font-medium'>
                        <div className='absolute flex justify-end w-full p-2'>
                            <button onClick={handleShowProfile} className='w-8 h-8 text-xl rounded-lg hover:text-primaryred'><i class=" fa-solid fa-xmark"></i></button>
                        </div>
                        <div className='flex flex-col items-center justify-center w-full h-full'>
                            <h1 className='z-10 p-5'>My Profile</h1>
                            <div className='flex items-center justify-center w-full h-full'>
                                <div className='w-24 h-24 overflow-hidden rounded-lg'>
                                    <img src={user.profilePictureUrl} className='object-cover w-full h-full'></img>
                                </div>
                                <div className='flex flex-col gap-2 ml-6'>
                                    <h1 className='text-lg font-semibold'>
                                        <i class={`fa-solid mr-2 ${user?.role === "admin" ? 'fa-user-plus text-primaryblue' : 'fa-user text-primaryred'}`}></i>
                                        {user.name}
                                    </h1>
                                    <div className='flex flex-col gap-1 text-primarygray'>
                                        <h1><i class="fa-regular fa-envelope mr-2"></i>{user.email}</h1>
                                        <h1><i class="fa-brands fa-whatsapp mr-2"></i>{user.phoneNumber}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center justify-end w-full p-5 text-primarygray hover:text-primaryblack'>
                                <button><i class="mr-2 fa-solid fa-pen-to-square"></i>Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    )
}

export default ModalProfile
