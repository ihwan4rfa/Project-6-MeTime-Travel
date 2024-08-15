import React from 'react'
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
            toast.success("User updated");
            handleEditProfile();
            getUserLogged();
        } else {
            toast.error("Failed to update user");
        }
    }

    const getUserLogged = () => {
        const token = localStorage.getItem("token");
        token && userLog("user", (res) => dispatch(setUser(res)));
    };

    return (
        user && (
            <>
                <div className={`absolute z-40 w-full h-full opacity-40 bg-primaryblack dark:bg-primarygray dark:opacity-60 text-[10px] lg:text-[11px] xl:text-[13px] ${showProfile === true ? '' : 'hidden'}`}></div>
                <div className={`${showProfile === true ? '' : 'hidden'} absolute z-40 flex items-center justify-center w-full h-full`}>
                    <div className={`bg-white dark:bg-primaryblack shadow-lg rounded-lg flex justify-center relative text-primaryblack dark:text-slate-200 ${editProfile === true ? 'h-fit w-[85%] xs:w-[400px] lg:w-[500px] xl:w-[600px]' : 'h-fit w-fit'}`}>
                        <div className='absolute flex justify-end w-full p-2'>
                            <button onClick={editProfile === true ? handleEditProfile : handleShowProfile} className='w-8 h-8 text-base rounded-lg cursor-default cursor-scale lg:cursor-none lg:text-lg xl:text-xl hover:text-primaryred'><i class=" fa-solid fa-xmark"></i></button>
                        </div>
                        <div className={`flex flex-col items-center justify-center w-full h-full ${editProfile === true ? "hidden" : ''}`}>
                            <h1 className='z-10 pt-5 pb-3 font-medium lg:pb-4'>My Profile</h1>
                            <div className='flex flex-col items-center justify-center w-full h-full gap-3 px-10 xs:flex-row xl:px-12 xs:gap-0'>
                                <div className='w-20 h-20 overflow-hidden rounded-lg xs:w-16 lg:w-20 xl:w-24 xs:h-16 lg:h-20 xl:h-24'>
                                    <img src={user.profilePictureUrl} className='object-cover w-full h-full'></img>
                                </div>
                                <div className='flex flex-col items-center gap-2 ml-0 xs:items-start xs:ml-4 lg:ml-5 xl:ml-6'>
                                    <h1 className='text-sm font-semibold capitalize lg:text-base xl:text-lg'>
                                        <i class={`fa-solid mr-1 lg:mr-[6px] xl:mr-2 ${user?.role === "admin" ? 'fa-user-plus text-primaryblue' : 'fa-user text-primaryred'}`}></i>
                                        {user.name}
                                    </h1>
                                    <div className='flex flex-col items-center gap-1 xs:items-start text-primarygray dark:text-slate-400'>
                                        <h1><i class="fa-regular fa-envelope mr-1 lg:mr-[6px] xl:mr-2"></i>{user.email}</h1>
                                        <h1><i class="fa-brands fa-whatsapp mr-1 lg:mr-[6px] xl:mr-2"></i>{user.phoneNumber}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center justify-end w-full p-5'>
                                <button onClick={handleEditProfile} className='cursor-default cursor-scale lg:cursor-none text-slate-400 hover:text-primaryblack dark:hover:text-slate-200'><i class="mr-2 fa-solid fa-pen-to-square"></i>Edit</button>
                            </div>
                        </div>
                        <form onSubmit={handleUpdateUser} className={`flex flex-col items-center gap-3 lg:gap-4 p-5 justify-center w-full h-full ${editProfile === true ? '' : 'hidden'}`}>
                            <h1 className='z-10 font-medium'>Edit Profile</h1>
                            <div className='flex flex-col items-center justify-center w-full gap-3 xs:flex-row xs:items-start lg:gap-4 h-fit'>
                                <div className='w-20 xs:w-[86px] lg:w-[90px] xl:w-24 h-20 xs:h-[82px] lg:h-[90px] xl:h-24 overflow-hidden rounded-lg'>
                                    <img src={profilePictureUrl === null ? user.profilePictureUrl : profilePictureUrl} className='object-cover w-full h-full'></img>
                                </div>
                                <div className='flex flex-col flex-1 w-full gap-3 xs:w-1/3 lg:gap-4'>
                                    <div class="bg-slate-200 dark:bg-slate-700 text-slate-400 px-4 text-start rounded-lg w-full flex items-center overflow-hidden whitespace-nowrap">
                                        <label htmlFor="profilePictureUrl" className="bg-slate-300 dark:bg-slate-600 text-primaryblack dark:text-slate-200 w-fit cursor-scale lg:cursor-none cursor-pointer py-[10px] -ml-4 px-4 rounded-l-lg">Choose Profile</label>
                                        <span className={`px-4 overflow-hidden text-ellipsis ${profilePictureUrl ? 'text-primaryblack dark:text-slate-200' : ''}`}>{profilePictureUrl === null ? 'No File Selected' : `${fileName}`}</span>
                                    </div>
                                    <input type="file" name="profilePictureUrl" id="profilePictureUrl" onChange={handleUpload} className="hidden" />
                                    <input type="text" name="name" id="name" placeholder="Full Name" defaultValue={user.name} className="bg-slate-200 dark:bg-slate-700 placeholder:text-slate-400 text-primaryblack dark:text-slate-200 py-[10px] px-4 rounded-lg w-full outline-none" />
                                </div>
                            </div>
                            <div className='flex flex-col items-start justify-center w-full gap-3 xs:flex-row xs:gap-4 h-fit'>
                                <input type="email" name="email" id="email" placeholder="Email" defaultValue={user.email} className="bg-slate-200 dark:bg-slate-700 placeholder:text-slate-400 text-primaryblack dark:text-slate-200 py-[10px] px-4 rounded-lg outline-none flex w-full" />
                                <input type="number" name="phoneNumber" id="phone" placeholder="Phone Number" defaultValue={user.phoneNumber} className="bg-slate-200 dark:bg-slate-700 placeholder:text-slate-400 text-primaryblack dark:text-slate-200 py-[10px] px-4 rounded-lg outline-none flex w-full" />
                            </div>
                            <button type="submit" className="cursor-default cursor-scale lg:cursor-none bg-primaryblue hover:bg-bluehover text-white py-[10px] px-8 rounded-lg font-medium">Save</button>
                        </form>
                        <div className={`${showProfile ? 'invisible dark:visible' : 'invisible'} text-[11px] text-left`}>
                            <Toaster
                                position="bottom-center"
                                toastOptions={{
                                    duration: 3000,
                                    success: {
                                        style: {
                                            background: '#212832',
                                            color: 'white'
                                        },
                                        iconTheme: {
                                            primary: '#10b981',
                                            secondary: 'white'
                                        }
                                    },
                                    error: {
                                        style: {
                                            background: '#212832',
                                            color: 'white',
                                        },
                                        iconTheme: {
                                            primary: '#DF6951',
                                            secondary: 'white'
                                        }
                                    }
                                }}
                            />
                        </div>
                        <div className={`${showProfile ? 'visible dark:invisible' : 'invisible'} text-[11px] text-left`}>
                            <Toaster
                                position="bottom-center"
                                toastOptions={{
                                    duration: 3000,
                                    success: {
                                        style: {
                                            background: 'white',
                                            color: '#212832'
                                        },
                                        iconTheme: {
                                            primary: '#10b981',
                                            secondary: 'white'
                                        }
                                    },
                                    error: {
                                        style: {
                                            background: 'white',
                                            color: '#212832',
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
