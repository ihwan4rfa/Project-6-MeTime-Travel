import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import useUpload from '@/Hooks/useUpload';
import useUpdate from '@/Hooks/useUpdate';
import DropDownCategory from './DropDownCategory';
import Image from 'next/image'

const ModalEditDestination = ({ showEditDestination, setShowEditDestination, selectedDestination }) => {

    const [imageUrls, setImageUrls] = useState([]);
    const [fileName, setFileName] = useState(null);
    const { upload } = useUpload();
    const { update } = useUpdate();
    const formRef = useRef(null);
    const [showNextStep, setShowNextStep] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [destinationCategoryName, setDestinationCategoryName] = useState(null);
    const [selectedCategoryName, setSelectedCategoryName] = useState(null);
    const [dropDownHidden, setDropDownHidden] = useState(true);
    const [linkMap, setLinkMap] = useState(null);
    const [srcUrl, setSrcUrl] = useState();

    const handleNextStep = () => {
        setShowNextStep(!showNextStep);
    }

    useEffect(() => {
        if (selectedDestination !== undefined) {
            setImageUrls(selectedDestination.imageUrls);
        }
    }, [selectedDestination])

    const handleRemoveImage = (index) => {
        const newImageUrls = [...imageUrls];
        newImageUrls.splice(index, 1);
        imageUrls.length === 1 ? setImageUrls(['']) : setImageUrls(newImageUrls);
    }

    const handleLinkMap = (e) => {
        setLinkMap(e.target.value);
    }

    useEffect(() => {
        if (selectedDestination.location_maps === undefined) {
            setSrcUrl(null);
        } else {
            if (linkMap === null) {
                const match = selectedDestination.location_maps.match(/<iframe[^>]+src="([^"]+)"/);
                if (match && match[1]) {
                    setSrcUrl(match[1]);
                } else {
                    setSrcUrl(null);
                }
            } else {
                const match = linkMap.match(/<iframe[^>]+src="([^"]+)"/);
                if (match && match[1]) {
                    setSrcUrl(match[1]);
                } else {
                    setSrcUrl(null);
                }
            }
        }
    }, [linkMap, showEditDestination])

    const handleUpload = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];

        if (!file) {
            return;
        } else if (!file.type.startsWith("image/")) {
            setImageUrls([...imageUrls]);
            setFileName(null);
            toast.error("The file must be an image in \n JPEG, PNG, GIF, BMP, or TIFF format.");
            return false;
        }
        const formData = new FormData();
        formData.append("image", file);
        try {
            const res = await upload("upload-image", formData);
            imageUrls[0] === '' ? setImageUrls([res.data.url]) : setImageUrls([...imageUrls, res.data.url]);
            setFileName(file.name);
            toast.success("Image uploaded");
            return res.data.url;
        } catch (error) {
            setImageUrls([...imageUrls]);
            setFileName(null);
            toast.error("Failed to upload image. \n Maybe the image is too big. \n Try another image.");
        }
    };

    const handleUpdateDestination = async (e) => {
        e.preventDefault();
        const destinationData = {
            categoryId: selectedCategoryId || selectedDestination.categoryId,
            title: e.target.title.value,
            description: e.target.description.value,
            imageUrls: imageUrls || selectedDestination.imageUrls,
            price: parseFloat(e.target.price.value),
            price_discount: parseFloat(e.target.price_discount.value),
            rating: parseFloat(e.target.rating.value),
            total_reviews: parseFloat(e.target.total_reviews.value),
            facilities: e.target.facilities.value,
            address: e.target.address.value,
            province: e.target.province.value,
            city: e.target.city.value,
            location_maps: e.target.location_maps.value
        };

        for (const key in destinationData) {
            if (!destinationData[key]) {
                toast.error("Please input all fields");
                return;
            }
        }

        const res = await update(`update-activity/${selectedDestination.id}`, destinationData);
        if (res.status === 200) {
            toast.success("Destination updated");
            e.target.reset();
            setShowEditDestination(false);
            setShowNextStep(false);
            setSelectedCategoryId(null);
            setDestinationCategoryName(null);
            setSelectedCategoryName(null);
            setDropDownHidden(true);
            setFileName(null);
            setLinkMap(null);
            setSrcUrl(null);
        } else {
            toast.error("Failed to update destination");
        }
    }

    const handleCloseEditDestination = () => {
        formRef.current.reset();
        setShowEditDestination(false);
        setShowNextStep(false);
        setSelectedCategoryId(null);
        setDestinationCategoryName(null);
        setSelectedCategoryName(null);
        setDropDownHidden(true);
        setFileName(null);
        setLinkMap(null);
        setSrcUrl(null);
    }

    return (
        <>
            <div className={`absolute z-20 w-full h-full opacity-40 bg-primaryblack dark:bg-primarygray dark:opacity-60 ${showEditDestination === true ? '' : 'hidden'}`}></div>
            <div className={`${showEditDestination === true ? '' : 'hidden'} absolute z-30 flex items-center justify-center w-full h-full`}>
                <div className={`bg-white dark:bg-primaryblack shadow-lg rounded-lg text-[13px] flex justify-center relative text-primaryblack dark:text-slate-200 h-fit w-[900px]`}>
                    <div className='absolute flex justify-end w-full p-2'>
                        <button onClick={handleCloseEditDestination} className='w-8 h-8 text-xl rounded-lg cursor-default cursor-scale lg:cursor-none hover:text-primaryred'><i class=" fa-solid fa-xmark"></i></button>
                    </div>
                    <form ref={formRef} onSubmit={handleUpdateDestination} className={`flex flex-col items-center justify-center w-full h-full p-5`}>
                        <h1 className='z-10 pb-2 font-medium'>Edit Destination</h1>
                        <div className={`flex absolute top-[55px] w-[95.4%] h-[2px] rounded-full bg-gradient-to-r ${showNextStep === true ? 'bg-primaryblue' : 'from-primaryblue via-slate-200 dark:via-slate-600 to-slate-200 dark:to-slate-600'}`}></div>
                        <div className='z-10 flex items-center justify-between w-1/2 pb-4'>
                            <h1 className="flex items-center justify-center text-white bg-primaryblue text-[11px] w-4 h-4 rounded-full font-semibold">1</h1>
                            <h1 className={`flex items-center justify-center text-white ${showNextStep === true ? 'bg-primaryblue' : 'bg-slate-200 dark:bg-slate-600'} text-[11px] w-4 h-4 rounded-full font-semibold`}>2</h1>
                        </div>
                        <div className={`flex flex-col items-start justify-center w-full gap-4 h-fit ${showNextStep === true ? 'hidden' : ''}`}>
                            <div className='flex w-full gap-4'>
                                <div className='flex flex-col w-2/5 overflow-scroll no-scrollbar rounded-lg h-[207px] gap-3'>
                                    {imageUrls !== undefined && imageUrls.map((imageUrl, index) => (
                                        <div key={index} className={`flex relative w-full ${imageUrls.length === 1 ? 'h-full' : 'h-[75%]'}`}>
                                            <button onClick={() => handleRemoveImage(index)} type='button' className={`${imageUrls[0] === '' ? 'hidden' : ''} cursor-default cursor-scale lg:cursor-none absolute flex items-center justify-center m-2 bg-white dark:bg-primaryblack rounded-full  hover:bg-primaryred dark:hover:bg-primaryred w-7 h-7 text-primaryred hover:text-white`}><i class="fa-regular fa-trash-can"></i></button>
                                            {imageUrl.startsWith("https://") && (imageUrl.includes(".jpg") || imageUrl.includes(".png") || imageUrl.includes("images")) ?
                                                <img src={imageUrl} className='object-cover w-full h-full rounded-lg'></img>
                                                : <Image src="/images/no-image.png" className='object-cover w-full h-full rounded-lg' width={500} height={500} alt='Unknown Profile' />
                                            }
                                        </div>
                                    ))}
                                </div>
                                <div className='flex flex-col w-3/5 gap-4'>
                                    <div className='flex gap-4'>
                                        <input defaultValue={selectedDestination.title} type="text" name="title" id="title" placeholder="Destination Name" className="bg-slate-200 dark:bg-slate-700 placeholder:text-slate-400 text-primaryblack dark:text-slate-200 py-[10px] px-4 text-[13px] rounded-lg w-4/6 outline-none" />
                                        <DropDownCategory
                                            dropDownHidden={dropDownHidden}
                                            setDropDownHidden={setDropDownHidden}
                                            setSelectedCategoryId={setSelectedCategoryId}
                                            destinationCategoryName={destinationCategoryName}
                                            setDestinationCategoryName={setDestinationCategoryName}
                                            selectedCategoryName={selectedCategoryName}
                                            setSelectedCategoryName={setSelectedCategoryName}
                                            showEditDestination={showEditDestination}
                                            destinationCategoryId={selectedDestination.categoryId}
                                        />
                                    </div>
                                    <div className='flex gap-4'>
                                        <textarea name="description" id="description" placeholder="Description" defaultValue={selectedDestination.description} className="bg-slate-200 dark:bg-slate-700 placeholder:text-slate-400 text-primaryblack dark:text-slate-200 py-[10px] px-4 text-[13px] rounded-lg w-full h-24 outline-none no-scrollbar" />
                                        <textarea name="facilities" id="facilities" placeholder="Facilities" defaultValue={selectedDestination.facilities} className="bg-slate-200 dark:bg-slate-700 placeholder:text-slate-400 text-primaryblack dark:text-slate-200 py-[10px] px-4 text-[13px] rounded-lg w-full outline-none no-scrollbar" />
                                    </div>
                                    <div className='flex gap-4'>
                                        <input type="number" name="price" id="price" placeholder="Price" defaultValue={selectedDestination.price} className="bg-slate-200 dark:bg-slate-700 placeholder:text-slate-400 text-primaryblack dark:text-slate-200 py-[10px] px-4 text-[13px] rounded-lg w-full outline-none" />
                                        <input type="number" name="price_discount" id="price_discount" placeholder="Discount Price" defaultValue={selectedDestination.price_discount} className="bg-slate-200 dark:bg-slate-700 placeholder:text-slate-400 text-primaryblack dark:text-slate-200 py-[10px] px-4 text-[13px] rounded-lg w-full outline-none" />
                                    </div>
                                </div>
                            </div>
                            <div className='flex w-full gap-4'>
                                <div class="bg-slate-200 dark:bg-slate-700 text-slate-400 px-4 text-[13px] text-start rounded-lg w-2/5 flex items-center overflow-hidden whitespace-nowrap">
                                    <label htmlFor="imageUrls" className="cursor-pointer cursor-scale lg:cursor-none bg-slate-300 dark:bg-slate-600 text-primaryblack dark:text-slate-200 w-fit py-[10px] -ml-4 px-4 rounded-l-lg">Add Image</label>
                                    <span className={`px-4 overflow-hidden text-ellipsis ${imageUrls ? 'text-primaryblack dark:text-slate-200' : ''}`}>{fileName === null ? 'No File Selected' : `${fileName}`}</span>
                                </div>
                                <input onChange={handleUpload} type="file" name="imageUrls" id="imageUrls" className="hidden" />
                                <div className='flex w-3/5 gap-4'>
                                    <input type="number" name="rating" id="rating" placeholder="Rating" defaultValue={selectedDestination.rating} className="bg-slate-200 dark:bg-slate-700 placeholder:text-slate-400 text-primaryblack dark:text-slate-200 py-[10px] px-4 text-[13px] rounded-lg w-full outline-none" />
                                    <input type="number" name="total_reviews" id="total_reviews" placeholder="Total Reviews" defaultValue={selectedDestination.total_reviews} className="bg-slate-200 dark:bg-slate-700 placeholder:text-slate-400 text-primaryblack dark:text-slate-200 py-[10px] px-4 text-[13px] rounded-lg w-full outline-none" />
                                </div>
                            </div>
                        </div>
                        <div className={`flex flex-col items-start justify-center w-full gap-4 h-fit ${showNextStep === true ? '' : 'hidden'}`}>
                            <div className='flex flex-col w-full gap-4'>
                                <div className='flex gap-4'>
                                    <input defaultValue={selectedDestination.address} type="text" name="address" id="address" placeholder="Address" className="bg-slate-200 dark:bg-slate-700 placeholder:text-slate-400 text-primaryblack dark:text-slate-200 py-[10px] px-4 text-[13px] rounded-lg w-3/5 outline-none" />
                                    <input defaultValue={selectedDestination.province} type="text" name="province" id="province" placeholder="Province" className="bg-slate-200 dark:bg-slate-700 placeholder:text-slate-400 text-primaryblack dark:text-slate-200 py-[10px] px-4 text-[13px] rounded-lg w-3/5 outline-none" />
                                </div>
                                <div className='flex gap-4'>
                                    <input defaultValue={selectedDestination.city} type="text" name="city" id="city" placeholder="City" className="bg-slate-200 dark:bg-slate-700 placeholder:text-slate-400 text-primaryblack dark:text-slate-200 py-[10px] px-4 text-[13px] rounded-lg w-3/5 outline-none" />
                                    <input onChange={handleLinkMap} defaultValue={selectedDestination.location_maps} type="text" name="location_maps" id="location_maps" placeholder="Location Maps" className="bg-slate-200 dark:bg-slate-700 placeholder:text-slate-400 text-primaryblack dark:text-slate-200 py-[10px] px-4 text-[13px] rounded-lg w-3/5 outline-none" />
                                </div>
                                {srcUrl &&
                                    <iframe className='rounded-lg hide-custom-cursor' src={srcUrl} width="100%" height="152"></iframe>
                                }
                            </div>
                        </div>
                        <div className='flex gap-4'>
                            <button onClick={handleNextStep} type="button" className={`${showNextStep === true ? '' : 'hidden'} cursor-default cursor-scale lg:cursor-none bg-primaryred hover:bg-redhover text-white text-[13px] py-[10px] mt-4 px-8 rounded-lg font-medium`}>Back</button>
                            <button onClick={handleNextStep} type="button" className={`${showNextStep === true ? 'hidden' : ''} cursor-default cursor-scale lg:cursor-none bg-primaryblue hover:bg-bluehover text-white text-[13px] py-[10px] mt-4 px-8 rounded-lg font-medium`}>Next Step</button>
                            <button type="submit" className={`${showNextStep === true ? '' : 'hidden'} cursor-default cursor-scale lg:cursor-none bg-primaryblue hover:bg-bluehover text-white text-[13px] py-[10px] mt-4 px-8 rounded-lg font-medium`}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ModalEditDestination
