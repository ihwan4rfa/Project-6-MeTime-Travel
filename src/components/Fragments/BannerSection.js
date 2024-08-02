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
        <div className='relative flex flex-col w-full gap-10 h-fit text-[10px] lg:text-[11px] xl:text-[13px]'>
            <div className='absolute z-0 bg-primaryyellow dark:bg-primaryblue bg-opacity-10 dark:bg-opacity-20 rounded-full w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] blur-3xl -top-20 -left-10'></div>
            <div className='relative flex items-center w-full h-full overflow-x-hidden rounded-tr-[60px] rounded-bl-[60px] lg:rounded-tr-[70px] lg:rounded-bl-[70px] xl:rounded-tr-[80px] xl:rounded-bl-[80px] rounded-2xl'>
                <div className='flex flex-col items-center sm:items-start px-[20%] sm:px-0 absolute z-20 w-full sm:w-[40%] sm:left-[10%]'>
                    <h1 className='overflow-hidden text-lg lg:text-xl xl:text-2xl font-bold tracking-tight left-[20%] font-volkhov whitespace-nowrap sm:animate-typing text-primaryyellow'>It's Time for Me Time!</h1>
                    <h1 className='text-white text-center sm:text-left'>
                        Explore breathtaking destinations, create unforgettable memories, and discover new horizons with our personalized travel experiences
                    </h1>
                </div>
                <div className='absolute z-10 w-full h-full bg-gradient-to-t from-black to-black opacity-60 sm:opacity-100 sm:bg-gradient-to-r sm:from-black sm:from-[-20%]'></div>
                <AliceCarousel infinite autoPlay animationDuration={4000} disableButtonsControls disableDotsControls animationType='fadeout'>
                    {banners.map((banner, index) => (
                        <div key={index} className='relative flex items-center w-full h-52 lg:h-56 xl:h-64 overflow-hidden bg-white text-primaryblack'>
                            {banner.imageUrl.startsWith("https://") && (banner.imageUrl.includes(".jpg") || banner.imageUrl.includes(".png") || banner.imageUrl.includes("images")) ?
                                <img src={banner.imageUrl} className='object-cover w-full h-full bg-slate-200'></img>
                                : <Image src="/images/no-image.png" className='object-cover w-full h-full' width={500} height={500} alt='Unknown Image' />
                            }
                        </div>
                    ))}
                </AliceCarousel>
            </div>
        </div>
    )
}

export default BannerSection
