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
            <div className={`absolute z-30 w-full h-full opacity-40 bg-primaryblack dark:bg-primarygray dark:opacity-60 ${showDetailDestination === true ? '' : 'hidden'}`}></div>
            <div className={`${showDetailDestination === true ? '' : 'hidden'} absolute z-30 flex items-center justify-center w-full h-full`}>
                <div className={`bg-white dark:bg-primaryblack shadow-lg rounded-lg text-[10px] lg:text-[11px] xl:text-[13px] flex justify-center relative text-primaryblack dark:text-slate-200 h-fit w-fit`}>
                    <div className='absolute flex items-center justify-end w-full p-2'>
                        <button onClick={handleCloseDetailDestination} className='w-8 h-8 text-xl rounded-lg cursor-default cursor-scale lg:cursor-none hover:text-primaryred dark:hover:text-primaryred'><i class=" fa-solid fa-xmark"></i></button>
                    </div>
                    <div className={`flex flex-col items-center justify-center w-fit h-fit p-5`}>
                        <div className='flex flex-col items-start justify-center gap-4 w-fit h-fit'>
                            <div className={`flex flex-col sm:flex-row w-full gap-4 ${viewMap ? 'hidden' : ''}`}>
                                <div className='flex items-center gap-2 -mb-2 sm:hidden'>
                                    <h1 className='text-lg font-semibold capitalize lg:text-xl xl:text-2xl'>{selectedDestination.title}</h1>
                                    <h1 className='px-1 capitalize rounded-sm bg-slate-100 dark:bg-slate-700'>{selectedDestination.category.name}</h1>
                                </div>
                                <div className='flex flex-col -mb-2 sm:mb-0 w-[280px] xs:w-[290px] sm:w-[260px] md:w-[300px] lg:w-[340px] xl:w-[380px] overflow-scroll no-scrollbar gap-3 rounded-lg h-[194px] md:h-[240px] lg:h-[260px] xl:h-[280px]'>
                                    {selectedDestination.imageUrls.map((imageUrl, index) => (
                                        <div key={index} className={`flex relative w-full ${selectedDestination.imageUrls.length === 1 ? 'h-full' : 'h-[75%]'}`}>
                                            {imageUrl.startsWith("https://") && (imageUrl.includes(".jpg") || imageUrl.includes(".png") || imageUrl.includes("images")) ?
                                                <img src={imageUrl} className='object-cover w-full h-full rounded-lg'></img>
                                                : <Image src="/images/no-image.png" className='object-cover w-full h-full rounded-lg' width={500} height={500} alt='Unknown Image' />
                                            }
                                        </div>
                                    ))}
                                </div>
                                <div className='flex flex-col gap-1 w-fit text-primaryblack dark:text-slate-200'>
                                    <div className='hidden sm:flex items-center gap-2 md:gap-[10px] xl:gap-3'>
                                        <h1 className='text-lg font-semibold capitalize lg:text-xl xl:text-2xl'>{selectedDestination.title}</h1>
                                        <h1 className='px-1 capitalize rounded-sm bg-slate-100 dark:bg-slate-700'>{selectedDestination.category.name}</h1>
                                    </div>
                                    <div className='flex w-[280px] xs:w-full items-center gap-2'>
                                        <div className='flex items-center'>
                                            <i className="mr-1 fa-solid fa-star text-primaryyellow"></i>
                                            <h1 className='pt-[1px]'>{selectedDestination.rating}</h1>
                                        </div>
                                        <h1 className='text-slate-300 dark:text-slate-500'>|</h1>
                                        <h1>{selectedDestination.total_reviews} review</h1>
                                        <h1 className='text-slate-300 dark:text-slate-500'>|</h1>
                                        <div className='flex items-start'>
                                            <i class="fa-solid fa-location-dot mt-[3px] text-primaryred mr-1"></i>
                                            <h1 className='capitalize'>{`${selectedDestination.city}, ${selectedDestination.province}`}</h1>
                                        </div>
                                    </div>
                                    <div className='flex items-center w-[280px] xs:w-full gap-2 md:gap-[10px] xl:gap-3 px-3 py-1 lg:py-[6px] xl:py-2 mb-1 lg:mb-[6px] xl:mb-2 rounded-lg bg-slate-100 dark:bg-slate-700'>
                                        <div className='relative flex w-fit'>
                                            <div className='absolute z-10 w-full h-[2px] bg-primaryred rounded-full -rotate-6 top-[40%]'></div>
                                            <h1 className='relative text-primarygray dark:text-slate-400'>{formatNumber(selectedDestination.price)}</h1>
                                        </div>
                                        <h1 className='text-lg font-semibold lg:text-xl xl:text-2xl text-primaryblue'>{formatNumber(selectedDestination.price_discount)}</h1>
                                        <h1 className='text-[8px] lg:text-[9px] xl:text-[11px] font-semibold text-white bg-primaryred px-1 rounded-sm'>{percent(selectedDestination.price, selectedDestination.price_discount)}</h1>
                                    </div>
                                    <div className='flex flex-col w-[280px] xs:w-[290px] md:w-[300px] lg:w-[330px] xl:w-[380px] h-[98px] md:h-[143px] lg:h-[155px] xl:h-[160px] gap-2 overflow-y-scroll no-scrollbar'>
                                        <div className='flex w-auto gap-8 ml-3'>
                                            <h1 className='w-[30%] text-primarygray dark:text-slate-400'>Description</h1>
                                            <h1 className='w-[70%]'>{selectedDestination.description}</h1>
                                        </div>
                                        <div className='flex w-auto gap-8 ml-3'>
                                            <h1 className='w-[30%] text-primarygray dark:text-slate-400'>Facilities</h1>
                                            <h1 className='w-[70%]'>{selectedDestination.facilities}</h1>
                                        </div>
                                        <div className='flex w-auto gap-8 ml-3'>
                                            <h1 className='w-[30%] text-primarygray dark:text-slate-400'>Address</h1>
                                            <div className='w-[70%] flex flex-col gap-1 items-start'>
                                                <h1>{selectedDestination.address}</h1>
                                                <button onClick={handleViewMap} className='font-medium cursor-default cursor-scale lg:cursor-none text-primaryred hover:text-redhover dark:text-primaryyellow dark:hover:text-yellowhover'>View Map<i class="fa-solid fa-chevron-right mx-2 text-[11px]"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`flex flex-col w-[280px] xs:w-[290px] sm:w-[567px] md:w-[616px] lg:w-[686px] xl:w-[777px] h-[401px] sm:h-[195px] md:h-[240px] lg:h-[260px] xl:h-[280px] ${viewMap ? '' : 'hidden'}`}>
                                <h1 className='pb-2 font-medium text-center capitalize'>{selectedDestination.title}</h1>
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
