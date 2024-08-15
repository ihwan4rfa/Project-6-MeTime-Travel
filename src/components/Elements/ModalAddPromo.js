import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import useUpload from '@/Hooks/useUpload';
import useCreate from '@/Hooks/useCreate';
import Image from 'next/image';

const ModalAddPromo = ({ showAddPromo, setShowAddPromo }) => {

    const [addPromoImageUrl, setAddPromoImageUrl] = useState(null);
    const [fileName, setFileName] = useState(null);
    const { upload } = useUpload();
    const { create } = useCreate();
    const formRef = useRef(null);

    const handleUpload = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];

        if (!file) {
            return;
        } else if (!file.type.startsWith("image/")) {
            setAddPromoImageUrl(null);
            setFileName(null);
            toast.error("The file must be an image in \n JPEG, PNG, GIF, BMP, or TIFF format.");
            return false;
        }
        const formData = new FormData();
        formData.append("image", file);
        try {
            const res = await upload("upload-image", formData);
            setAddPromoImageUrl(res.data.url);
            setFileName(file.name);
            toast.success("Image uploaded");
            return res.data.url;
        } catch (error) {
            setAddPromoImageUrl(null);
            setFileName(null);
            toast.error("Failed to upload image. \n Maybe the image is too big. \n Try another image.");
        }
    };

    const handleAddPromo = async (e) => {
        e.preventDefault();
        const promoData = {
            title: e.target.title.value,
            description: e.target.description.value,
            imageUrl: addPromoImageUrl,
            terms_condition: e.target.terms_condition.value,
            promo_code: e.target.promo_code.value,
            promo_discount_price: parseFloat(e.target.promo_discount_price.value),
            minimum_claim_price: parseFloat(e.target.minimum_claim_price.value)
        };

        for (const key in promoData) {
            if (!promoData[key]) {
                toast.error("Please input all fields.");
                return;
            }
        }

        const res = await create(`create-promo`, promoData);
        if (res.status === 200) {
            toast.success("Promo created");
            setShowAddPromo(false);
            e.target.reset();
            setAddPromoImageUrl(null);
        } else {
            toast.error("Failed to create promo");
        }
    }

    const handleCloseAddPromo = () => {
        setShowAddPromo(false);
        formRef.current.reset();
        setAddPromoImageUrl(null);
    }

    return (
        <>
            <div className={`absolute z-20 w-full h-full opacity-40 bg-primaryblack dark:bg-primarygray dark:opacity-60 ${showAddPromo === true ? '' : 'hidden'}`}></div>
            <div className={`${showAddPromo === true ? '' : 'hidden'} absolute z-30 flex items-center justify-center w-full h-full`}>
                <div className={`bg-white dark:bg-primaryblack shadow-lg rounded-lg text-[13px] flex justify-center relative text-primaryblack dark:text-slate-200 h-fit w-[850px]`}>
                    <div className='absolute flex justify-end w-full p-2'>
                        <button onClick={handleCloseAddPromo} className='w-8 h-8 text-xl rounded-lg cursor-default cursor-scale lg:cursor-none hover:text-primaryred'><i class=" fa-solid fa-xmark"></i></button>
                    </div>
                    <form ref={formRef} onSubmit={handleAddPromo} className={`flex flex-col items-center justify-center w-full h-full p-5`}>
                        <h1 className='z-10 pb-4 font-medium'>Add Promo</h1>
                        <div className='flex flex-col items-start justify-center w-full gap-4 h-fit'>
                            <div className='flex w-full gap-4'>
                                <div className='w-2/5 overflow-hidden rounded-lg h-[207px]'>
                                    {addPromoImageUrl ?
                                        <img src={addPromoImageUrl} className='object-cover w-full h-full'></img>
                                        : <Image src="/images/no-image.png" className='object-cover w-full h-full' width={500} height={500} alt='Unknown Profile' />
                                    }
                                </div>
                                <div className='flex flex-col w-3/5 gap-4'>
                                    <input type="text" name="title" id="title" placeholder="Promo Name" className="bg-slate-200 dark:bg-slate-700 placeholder:text-slate-400 text-primaryblack dark:text-slate-200 py-[10px] px-4 text-[13px] rounded-lg w-full outline-none" />
                                    <textarea name="description" id="description" placeholder="Description" className="bg-slate-200 dark:bg-slate-700 placeholder:text-slate-400 text-primaryblack dark:text-slate-200 py-[10px] px-4 text-[13px] rounded-lg w-full h-24 outline-none no-scrollbar" />
                                    <div className='flex gap-4'>
                                        <input type="text" name="terms_condition" id="terms_condition" placeholder="Terms and Condition" className="bg-slate-200 dark:bg-slate-700 placeholder:text-slate-400 text-primaryblack dark:text-slate-200 py-[10px] px-4 text-[13px] rounded-lg w-full outline-none" />
                                        <input type="text" name="promo_code" id="promo_code" placeholder="Promo Code" className="bg-slate-200 dark:bg-slate-700 placeholder:text-slate-400 text-primaryblack dark:text-slate-200 py-[10px] px-4 text-[13px] rounded-lg w-full outline-none" />
                                    </div>
                                </div>
                            </div>
                            <div className='flex w-full gap-4'>
                                <div class="bg-slate-200 dark:bg-slate-700 text-slate-400 px-4 text-[13px] text-start rounded-lg w-2/5 flex items-center overflow-hidden whitespace-nowrap">
                                    <label htmlFor="addPromoImageUrl" className="cursor-scale lg:cursor-none bg-slate-300 dark:bg-slate-600 text-primaryblack dark:text-slate-200 w-fit cursor-pointer py-[10px] -ml-4 px-4 rounded-l-lg">Choose Image</label>
                                    <span className={`px-4 overflow-hidden text-ellipsis ${addPromoImageUrl ? 'text-primaryblack dark:text-slate-200' : ''}`}>{addPromoImageUrl === null ? 'No File Selected' : `${fileName}`}</span>
                                </div>
                                <input onChange={handleUpload} type="file" name="addPromoImageUrl" id="addPromoImageUrl" className="hidden" />
                                <div className='flex w-3/5 gap-4'>
                                    <input type="number" name="promo_discount_price" id="promo_discount_price" placeholder="Discount Price" className="bg-slate-200 dark:bg-slate-700 placeholder:text-slate-400 text-primaryblack dark:text-slate-200 py-[10px] px-4 text-[13px] rounded-lg w-full outline-none" />
                                    <input type="number" name="minimum_claim_price" id="minimum_claim_price" placeholder="Minimum Claim Price" className="bg-slate-200 dark:bg-slate-700 placeholder:text-slate-400 text-primaryblack dark:text-slate-200 py-[10px] px-4 text-[13px] rounded-lg w-full outline-none" />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="cursor-default cursor-scale lg:cursor-none bg-primaryyellow hover:bg-yellowhover text-white text-[13px] py-[10px] mt-4 px-8 rounded-lg font-medium">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ModalAddPromo
