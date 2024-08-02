import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import useGetData from '@/Hooks/useGetData';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { useSelector } from 'react-redux';

const HeaderSection = () => {
    const router = useRouter();
    const [banners, setBanners] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const { getData } = useGetData();
    const isDark = useSelector((state) => state.theme.isDark);

    useEffect(() => {
        getData("banners", (res) => setBanners(res.data.data));
        getData("activities", (res) => setDestinations(res.data.data));
    }, []);

    return (
        <div className='relative z-30 flex-wrap items-center w-full pt-20 sm:pt-14 md:pt-16 xl:pt-20 sm:flex h-fit'>
            <div className='absolute z-0 bg-primaryyellow dark:bg-primaryblue bg-opacity-10 dark:bg-opacity-20 rounded-full blur-3xl w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] -top-12 lg:-top-28 -left-28 lg:-left-56'></div>
            <div className='absolute flex items-center w-full right-0 xs:right-[15%] sm:right-0 xs:w-[70%] sm:w-1/2 h-[130px] md:h-[140px] lg:h-[170px] xl:h-[220px] overflow-hidden rounded-tl-[50px] md:rounded-tl-[70px] xl:rounded-tl-[90px] rounded-br-[50px] md:rounded-br-[70px] xl:rounded-br-[90px] rounded-2xl xl:rounded-3xl top-[430px] sm:top-32 md:top-40 xl:top-52'>
                <AliceCarousel infinite autoPlay animationDuration={4000} disableButtonsControls disableDotsControls animationType='fadeout'>
                    {banners.map((banner, index) => (
                        <div key={index} className='flex items-center w-full h-[130px] md:h-[140px] lg:h-[170px] xl:h-[220px] overflow-hidden bg-white text-primaryblack'>
                            {banner.imageUrl.startsWith("https://") && (banner.imageUrl.includes(".jpg") || banner.imageUrl.includes(".png") || banner.imageUrl.includes("images")) ?
                                <img src={banner.imageUrl} className='object-cover w-full h-full bg-slate-200'></img>
                                : <Image src="/images/no-image.png" className='object-cover w-full h-full' width={500} height={500} alt='Unknown Profile' />
                            }
                        </div>
                    ))}
                </AliceCarousel>
            </div>
            <div className='absolute z-10 flex items-center gap-1 px-3 xl:px-4 xl:py-1 bg-black dark:bg-white rounded-lg backdrop-blur-sm bg-opacity-[0.15] dark:bg-opacity-[0.15] right-[10%] sm:right-2 xl:-right-5 bottom-40 lg:bottom-48 xl:bottom-64 rounded-br-2xl sm:rounded-br-3xl rounded-tl-2xl sm:rounded-tl-3xl'>
                <h1 className=' text-[26px] lg:text-[29px] xl:text-[35px] font-bold text-primaryyellow'>{destinations.length}</h1>
                <h1 className='leading-tight text-white text-[9px] lg:text-[10px] xl:text-[13px]'>Destinations<br />Await</h1>
            </div>
            <div className='relative flex flex-col items-center justify-center w-full sm:items-start h-fit sm:w-1/2'>
                <h1 className='overflow-hidden font-bold tracking-tight text-lg lg:text-xl xl:text-2xl font-volkhov w-fit whitespace-nowrap sm:animate-typing text-primaryred dark:text-primaryyellow'>It's Time for Me Time!</h1>
                <h1 className='relative overflow-hidden w-full text-center sm:text-left text-[30px] lg:text-[35px] xl:text-[50px] font-bold font-volkhov leading-tight tracking-tight mb-3 xl:mb-5'>
                    Adventure Awaits!<br />Make Time with<br />Me Time Travel
                    <Image src={isDark ? "/images/line-decore-dark.png" : "/images/line-decore.png"} className='absolute top-[30px] lg:top-[35px] xl:top-[50px] left-[20%] xs:left-[28%] sm:left-[10%] opacity-70 w-[280px] lg:w-[330px] xl:w-[450px]' width={450} height={10} alt='Line Decore' />
                </h1>
                <h1 className='font-medium w-[85%] xs:w-[50%] sm:w-2/3 text-primarygray text-center sm:text-left dark:text-slate-400 text-[10px] lg:text-[11px] xl:text-[13px]'>
                    Explore breathtaking destinations, create unforgettable memories, and discover new horizons with our personalized travel experiences
                </h1>
                <button onClick={() => router.push("/destinations")} type="button" className="text-[10px] lg:text-[11px] xl:text-[13px] px-3 py-2 xl:px-5 xl:py-3 mt-5 xl:mt-8 font-medium text-white rounded-lg w-fit bg-primaryyellow hover:bg-yellowhover dark:bg-primaryred dark:hover:bg-redhover">
                    Explore Now
                </button>
            </div>
            <div className='relative flex items-center justify-center w-full mt-4 sm:mt-0 h-fit sm:w-1/2'>
                <Image src={isDark ? "/images/header-model-dark.png" : "/images/header-model.png"} className='p-4 w-[360px] lg:w-[400px] xl:w-[500px]' width={500} height={500} alt='Line Decore' />
            </div>
        </div>
    )
}

export default HeaderSection