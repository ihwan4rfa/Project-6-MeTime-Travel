import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import useUpload from '@/Hooks/useUpload';
import useCreate from '@/Hooks/useCreate';
import Image from 'next/image';

const ModalAddBanner = ({ showAddBanner, setShowAddBanner }) => {

    const [addBannerImageUrl, setAddBannerImageUrl] = useState(null);
    const [addFileName, setAddFileName] = useState(null);
    const { upload } = useUpload();
    const { create } = useCreate();
    const formRef = useRef(null);

    const handleUpload = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];

        if (!file) {
            return;
        } else if (!file.type.startsWith("image/")) {
            setAddBannerImageUrl(null);
            setAddFileName(null);
            toast.error("The file must be an image in \n JPEG, PNG, GIF, BMP, or TIFF format.");
            return false;
        }
        const formData = new FormData();
        formData.append("image", file);
        try {
            const res = await upload("upload-image", formData);
            setAddBannerImageUrl(res.data.url);
            setAddFileName(file.name);
            toast.success("Image uploaded");
            return res.data.url;
        } catch (error) {
            setAddBannerImageUrl(null);
            setAddFileName(null);
            toast.error("Failed to upload image. \n Maybe the image is too big. \n Try another image.");
        }
    };

    const handleAddBanner = async (e) => {
        e.preventDefault();
        const bannerData = {
            name: e.target.name.value,
            imageUrl: addBannerImageUrl
        };

        for (const key in bannerData) {
            if (!bannerData[key]) {
                toast.error("Please input all fields!");
                return;
            }
        }

        const res = await create("create-banner", bannerData);
        if (res.status === 200) {
            toast.success("Banner created");
            setShowAddBanner(false);
            e.target.reset();
            setAddBannerImageUrl(null);
        } else {
            toast.error("Failed to create banner");
        }
    }

    const handleCloseAddBanner = () => {
        setShowAddBanner(false);
        formRef.current.reset();
        setAddBannerImageUrl(null);
    }

    return (
        <>
            <div className={`absolute z-20 w-full h-full opacity-40 bg-primaryblack dark:bg-primarygray ${showAddBanner === true ? '' : 'hidden'}`}></div>
            <div className={`${showAddBanner === true ? '' : 'hidden'} absolute z-30 flex items-center justify-center w-full h-full`}>
                <div className={`bg-white dark:bg-primaryblack shadow-lg rounded-lg text-[13px] flex justify-center relative text-primaryblack dark:text-slate-200 h-fit w-[600px]`}>
                    <div className='absolute flex justify-end w-full p-2'>
                        <button onClick={handleCloseAddBanner} className='w-8 h-8 text-xl rounded-lg cursor-default cursor-scale lg:cursor-none hover:text-primaryred'><i class=" fa-solid fa-xmark"></i></button>
                    </div>
                    <form ref={formRef} onSubmit={handleAddBanner} className={`flex flex-col items-center justify-center w-full h-full p-5`}>
                        <h1 className='z-10 pb-4 font-medium'>Add Banner</h1>
                        <div className='flex flex-col items-start justify-center w-full gap-4 h-fit'>
                            <div className='w-full h-48 overflow-hidden rounded-lg'>
                                {addBannerImageUrl ?
                                    <img src={addBannerImageUrl} className='object-cover w-full h-full'></img>
                                    : <Image src="/images/no-image.png" className='object-cover w-full h-full' width={500} height={500} alt='Unknown Profile' />
                                }
                            </div>
                            <div class="bg-slate-200 dark:bg-slate-700 text-slate-400 px-4 text-[13px] text-start rounded-lg w-full flex items-center overflow-hidden whitespace-nowrap">
                                <label htmlFor="addBannerImageUrl" className="cursor-scale lg:cursor-none bg-slate-300 dark:bg-slate-600 text-primaryblack dark:text-slate-200 w-fit cursor-pointer py-[10px] -ml-4 px-4 rounded-l-lg">Choose Image</label>
                                <span className={`px-4 overflow-hidden text-ellipsis ${addBannerImageUrl ? 'text-primaryblack dark:text-slate-200 ' : ''}`}>{addBannerImageUrl === null ? 'No File Selected' : `${addFileName}`}</span>
                            </div>
                            <input onChange={handleUpload} type="file" name="addBannerImageUrl" id="addBannerImageUrl" className="hidden" />
                            <input type="text" name="name" id="name" placeholder="Banner Name" className="bg-slate-200 dark:bg-slate-700 placeholder:text-slate-400 text-primaryblack dark:text-slate-200  py-[10px] px-4 text-[13px] rounded-lg w-full outline-none" />
                        </div>
                        <button type="submit" className="cursor-default cursor-scale lg:cursor-none bg-primaryyellow hover:bg-yellowhover text-white text-[13px] py-[10px] mt-4 px-8 rounded-lg font-medium">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ModalAddBanner
