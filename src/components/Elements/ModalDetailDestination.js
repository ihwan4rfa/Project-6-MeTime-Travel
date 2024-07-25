import React, { useState } from 'react'
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { setShowModal } from '@/redux/slice/showModalSlice';

const ModalDetailDestination = ({ showDetailDestination, setShowDetailDestination, selectedDestination, setSelectedDestination }) => {
    const dispatch = useDispatch();
    const [viewMap, setViewMap] = useState(false);
    const [srcUrl, setSrcUrl] = useState();

    const handleCloseDetailDestination = () => {
        if (viewMap === true) {
            setViewMap(false);
        } else {
            setShowDetailDestination(false);
            dispatch(setShowModal(false));
            setSelectedDestination(null);
            setSrcUrl(null);
        }
    }

    const handleViewMap = () => {
        setViewMap(true);
        const match = selectedDestination.location_maps.match(/<iframe[^>]+src="([^"]+)"/);
        if (match && match[1]) {
            setSrcUrl(match[1]);
        } else {
            setSrcUrl(null);
        }
    }

    const formatNumber = (number) => {
        return `Rp${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
    };

    const percent = (price, priceDiscount) => {
        const discountPercentage = 100 - ((priceDiscount / price) * 100);
        return `${Number.isInteger(discountPercentage) ? discountPercentage : discountPercentage.toFixed(1)}% OFF`
    }

    return (
        selectedDestination &&
        <>
            <div className={`absolute z-20 w-full h-full opacity-40 bg-primaryblack ${showDetailDestination === true ? '' : 'hidden'}`}></div>
            <div className={`${showDetailDestination === true ? '' : 'hidden'} absolute z-30 flex items-center justify-center w-full h-full`}>
                <div className={`bg-white shadow-lg rounded-lg text-[13px] flex justify-center relative text-primaryblack h-fit w-fit`}>
                    <div className='absolute flex items-center justify-end w-full p-2'>
                        <button onClick={handleCloseDetailDestination} className='w-8 h-8 text-xl rounded-lg hover:text-primaryred'><i class=" fa-solid fa-xmark"></i></button>
                    </div>
                    <div className={`flex flex-col items-center justify-center w-full h-full p-5`}>
                        <div className='flex flex-col items-start justify-center w-full gap-4 h-fit'>
                            <div className={`flex w-full gap-4 ${viewMap ? 'hidden' : ''}`}>
                                <div className='flex flex-col w-[380px] overflow-scroll no-scrollbar gap-3 rounded-lg h-[280px]'>
                                    {selectedDestination.imageUrls.map((imageUrl, index) => (
                                        <div key={index} className={`flex relative w-full ${selectedDestination.imageUrls.length === 1 ? 'h-full' : 'h-[75%]'}`}>
                                            {imageUrl.startsWith("https://") && (imageUrl.includes(".jpg") || imageUrl.includes(".png") || imageUrl.includes("images")) ?
                                                <img src={imageUrl} className='object-cover w-full h-full rounded-lg'></img>
                                                : <Image src="/images/no-image.png" className='object-cover w-full h-full rounded-lg' width={500} height={500} alt='Unknown Image' />
                                            }
                                        </div>
                                    ))}
                                </div>
                                <div className='flex flex-col w-[500px] gap-2'>
                                    <div className='flex items-center gap-3'>
                                        <h1 className='text-2xl font-semibold capitalize'>{selectedDestination.title}</h1>
                                        <h1 className='px-1 capitalize rounded-sm bg-slate-100'>{selectedDestination.category.name}</h1>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <div className='flex items-center'>
                                            <i className="mr-1 fa-solid fa-star text-primaryyellow"></i>
                                            <h1 className='pt-[1px]'>{selectedDestination.rating}</h1>
                                        </div>
                                        <h1 className='text-slate-300'>|</h1>
                                        <h1>{selectedDestination.total_reviews} review</h1>
                                        <h1 className='text-slate-300'>|</h1>
                                        <div className='flex items-start'>
                                            <i class="fa-solid fa-location-dot mt-[3px] text-primaryred mr-1"></i>
                                            <h1 className='capitalize'>{`${selectedDestination.city}, ${selectedDestination.province}`}</h1>
                                        </div>
                                    </div>
                                    <div className='flex items-center w-full gap-3 px-3 py-2 mb-2 rounded-lg bg-slate-100'>
                                        <div className='relative flex w-fit'>
                                            <div className='absolute z-10 w-full h-[2px] bg-primaryred rounded-full -rotate-6 top-[40%]'></div>
                                            <h1 className='relative text-primarygray'>{formatNumber(selectedDestination.price)}</h1>
                                        </div>
                                        <h1 className='text-2xl font-semibold text-primaryblue'>{formatNumber(selectedDestination.price_discount)}</h1>
                                        <h1 className='text-[11px] font-semibold text-white bg-primaryred px-1 rounded-sm'>{percent(selectedDestination.price, selectedDestination.price_discount)}</h1>
                                    </div>
                                    <div className='flex w-auto gap-8 ml-3'>
                                        <h1 className='w-[25%] text-primarygray'>Description</h1>
                                        <h1 className='w-[75%]'>{selectedDestination.description}</h1>
                                    </div>
                                    <div className='flex w-auto gap-8 ml-3'>
                                        <h1 className='w-[25%] text-primarygray'>Facilities</h1>
                                        <h1 className='w-[75%]'>{selectedDestination.facilities}</h1>
                                    </div>
                                    <div className='flex w-auto gap-8 ml-3'>
                                        <h1 className='w-[25%] text-primarygray'>Address</h1>
                                        <div className='w-[75%] flex flex-col gap-1 items-start'>
                                            <h1>{selectedDestination.address}</h1>
                                            <button onClick={handleViewMap} className='font-medium text-primaryred hover:text-redhover'>View Map<i class="fa-solid fa-chevron-right mx-2 text-[11px]"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`flex flex-col w-[896px] h-[280px] ${viewMap ? '' : 'hidden'}`}>
                                <h1 className='pb-2 font-medium text-center'>{selectedDestination.title}</h1>
                                {srcUrl &&
                                    <iframe className='rounded-lg' src={srcUrl} width="100%" height="100%"></iframe>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalDetailDestination
