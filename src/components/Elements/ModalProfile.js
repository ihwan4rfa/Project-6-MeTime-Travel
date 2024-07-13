import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/slice/userLoggedSlice';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import useUpload from '@/Hooks/useUpload';
import useUpdate from '@/Hooks/useUpdate';
import useAuth from '@/Hooks/useAuth';

const ModalProfile = ({ showProfile, handleShowProfile }) => {
    const [editProfile, setEditProfile] = useState(false);
    const [fileName, setFileName] = useState(null);
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);
    const { upload } = useUpload();
    const { update } = useUpdate();
    const { userLog } = useAuth();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userLogged.user);

    const handleEditProfile = () => {
        setEditProfile(!editProfile);
        setProfilePictureUrl(null);
    }

    const handleUpload = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];

        if (!file) {
            return;
        } else if (!file.type.startsWith("image/")) {
            setProfilePictureUrl(null);
            setFileName(null);
            toast.error("The file must be an image in \n JPEG, PNG, GIF, BMP, or TIFF format.");
            return false;
        }
        const formData = new FormData();
        formData.append("image", file);
        try {
            const res = await upload("upload-image", formData);
            setProfilePictureUrl(res.data.url);
            setFileName(file.name);
            toast.success("Image uploaded");
            return res.data.url;
        } catch (error) {
            setProfilePictureUrl(null);
            setFileName(null);
            toast.error("Failed to upload image. \n Maybe the image is too big. \n Try another image.");
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        const userData = {
            name: e.target.name.value,
            email: e.target.email.value,
            phoneNumber: e.target.phoneNumber.value,
            profilePictureUrl: profilePictureUrl || user.profilePictureUrl
        };

        const res = await update(`update-profile/`, userData);
        if (res.status === 200) {
            toast.success(res.data.message);
            handleEditProfile();
            getUserLogged();
        } else {
            toast.error(res.response.data.message);
        }
    }

    const getUserLogged = () => {
        const token = localStorage.getItem("token");
        token && userLog("user", (res) => dispatch(setUser(res)));
    };

    return (
        user && (
            <>
                <div className={`absolute z-20 w-full h-full opacity-40 bg-primaryblack ${showProfile === true ? '' : 'hidden'}`}></div>
                <div className={`${showProfile === true ? '' : 'hidden'} absolute z-30 flex items-center justify-center w-full h-full`}>
                    <div className={`bg-white shadow-lg rounded-lg text-[13px] flex justify-center relative text-primaryblack ${editProfile === true ? 'h-fit w-[600px]' : 'h-fit w-fit'}`}>
                        <div className='absolute flex justify-end w-full p-2'>
                            <button onClick={editProfile === true ? handleEditProfile : handleShowProfile} className='w-8 h-8 text-xl rounded-lg hover:text-primaryred'><i class=" fa-solid fa-xmark"></i></button>
                        </div>
                        <div className={`flex flex-col items-center justify-center w-full h-full ${editProfile === true ? "hidden" : ''}`}>
                            <h1 className='z-10 p-5 font-medium'>My Profile</h1>
                            <div className='flex items-center justify-center w-full h-full px-12'>
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
                            <div className='flex items-center justify-end w-full p-5'>
                                <button onClick={handleEditProfile} className='text-slate-400 hover:text-primaryblack'><i class="mr-2 fa-solid fa-pen-to-square"></i>Edit</button>
                            </div>
                        </div>
                        <form onSubmit={handleUpdateUser} className={`flex flex-col items-center justify-center w-full h-full ${editProfile === true ? '' : 'hidden'}`}>
                            <h1 className='z-10 p-5 font-medium'>Edit Profile</h1>
                            <div className='flex items-start justify-center w-full gap-4 px-12 h-fit'>
                                <div className='w-24 h-24 overflow-hidden rounded-lg'>
                                    <img src={profilePictureUrl === null ? user.profilePictureUrl : profilePictureUrl} className='object-cover w-full h-full'></img>
                                </div>
                                <div className='flex flex-col flex-1 w-full gap-2'>
                                    <div class="bg-slate-200 text-slate-400 px-4 text-[13px] text-start rounded-lg w-full flex items-center overflow-hidden whitespace-nowrap">
                                        <label htmlFor="profilePictureUrl" className="bg-slate-300 text-primaryblack w-fit cursor-pointer py-[10px] -ml-4 px-4 rounded-l-lg">Choose Profile</label>
                                        <span className={`px-4 overflow-hidden text-ellipsis ${profilePictureUrl ? 'text-primaryblack' : ''}`}>{profilePictureUrl === null ? 'No File Selected' : `${fileName}`}</span>
                                    </div>
                                    <input type="file" name="profilePictureUrl" id="profilePictureUrl" onChange={handleUpload} className="hidden" />
                                    <input type="text" name="name" id="name" placeholder="Full Name" defaultValue={user.name} className="bg-slate-200 placeholder:text-slate-400 text-primaryblack my-2 py-[10px] px-4 text-[13px] rounded-lg w-full outline-none" />
                                </div>
                            </div>
                            <div className='flex items-start justify-center w-full gap-4 px-12 h-fit'>
                                <input type="email" name="email" id="email" placeholder="Email" defaultValue={user.email} className="bg-slate-200 placeholder:text-slate-400 text-primaryblack my-2 py-[10px] px-4 text-[13px] rounded-lg outline-none flex w-full" />
                                <input type="number" name="phoneNumber" id="phone" placeholder="Phone Number" defaultValue={user.phoneNumber} className="bg-slate-200 placeholder:text-slate-400 text-primaryblack my-2 py-[10px] px-4 text-[13px] rounded-lg outline-none flex w-full" />
                            </div>
                            <button type="submit" className=" bg-primaryblue hover:bg-bluehover text-white text-[13px] py-[10px] mt-4 mb-8 px-8 rounded-lg font-medium">Save</button>
                        </form>
                        <div className={`text-[11px] text-left`}>
                            <Toaster
                                position="bottom-center"
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
                                            background: 'white',
                                            color: 'black',
                                        },
                                        iconTheme: {
                                            primary: '#DF6951',
                                            secondary: 'white'
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    )
}

export default ModalProfile
