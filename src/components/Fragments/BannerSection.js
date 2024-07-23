import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import useGetData from '@/Hooks/useGetData';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

const BannerSection = () => {
    const [banners, setBanners] = useState([]);
    const { getData } = useGetData();

    useEffect(() => {
        getData("banners", (res) => setBanners(res.data.data));
    }, []);

    return (
        <div className='flex flex-col w-full gap-10 h-fit'>
            <div className='relative flex items-center w-full h-full overflow-x-hidden rounded-2xl'>
                <div className='absolute z-20 w-2/5 left-[10%]'>
                    <h1 className='overflow-hidden text-2xl font-bold tracking-tight left-[20%] font-volkhov whitespace-nowrap animate-typing text-primaryyellow'>It's Time for Me Time!</h1>
                    <h1 className='text-white '>
                        Explore breathtaking destinations, create unforgettable<br />
                        memories, and discover new horizons with our personalized<br />
                        travel experiences.</h1>
                </div>
                <div className='absolute z-10 w-full h-full bg-gradient-to-r from-black from-[-10%]'></div>
                <AliceCarousel infinite autoPlay animationDuration={4000} disableButtonsControls disableDotsControls animationType='fadeout'>
                    {banners.map((promo, index) => (
                        <button key={index} className='flex w-full relative items-center overflow-hidden bg-white text-primaryblack h-64 text-[13px]'>
                            {promo.imageUrl.startsWith("https://") && (promo.imageUrl.includes(".jpg") || promo.imageUrl.includes(".png") || promo.imageUrl.includes("images")) ?
                                <img src={promo.imageUrl} className='object-cover w-full h-full bg-slate-200'></img>
                                : <Image src="/images/no-image.png" className='object-cover w-full h-full' width={500} height={500} alt='Unknown Profile' />
                            }
                        </button>
                    ))}
                </AliceCarousel>
            </div>
        </div>
    )
}

export default BannerSection
