import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import useGetData from '@/Hooks/useGetData';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { useRouter } from 'next/router';

const PromoSection = () => {
    const [promos, setPromos] = useState([]);
    const { getData } = useGetData();
    const router = useRouter();
    const handleDragStart = (e) => e.preventDefault();

    useEffect(() => {
        getData("promos", (res) => setPromos(res.data.data));
    }, []);

    const formatNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const responsive = {
        500: {
            items: 1,
        },
        900: {
            items: 2,
        },
        1200: {
            items: 3,
        },
        1500: {
            items: 4,
        }
    };

    return (
        <div className='relative z-20 flex flex-col w-full gap-10 h-fit'>
            <div className='absolute z-0 bg-primaryyellow bg-opacity-10 rounded-full w-[500px] h-[400px] blur-3xl -top-5 -left-20'></div>
            <div className='relative flex justify-between w-full'>
                <h1 className='flex text-3xl font-bold tracking-tight font-volkhov'>Special Promo!</h1>
                <button onClick={() => router.push("/promos")} type="button" className="px-5 py-3 font-medium text-white rounded-lg w-fit bg-primaryyellow hover:bg-yellowhover">
                    View All Offers
                </button>
            </div>
            <div className='w-full relative overflow-x-hidden rounded-xl'>
                <AliceCarousel mouseTracking paddingRight={160} infinite autoPlay animationDuration={1500} disableButtonsControls disableDotsControls responsive={responsive}>
                    {promos.map((promo, index) => (
                        <div key={index} onDragStart={handleDragStart} className='w-[95%] h-60 overflow-hidden bg-white border border-white hover:border-primaryred cursor-pointer text-primaryblack rounded-xl'>
                            {promo.imageUrl.startsWith("https://") && (promo.imageUrl.includes(".jpg") || promo.imageUrl.includes(".png") || promo.imageUrl.includes("images")) ?
                                <img src={promo.imageUrl} className='object-cover w-full bg-slate-200 h-[80%]'></img>
                                : <Image src="/images/no-image.png" className='object-cover w-full h-[80%]' width={500} height={500} alt='Unknown Profile' />
                            }
                            <div className='flex justify-between font-medium items-center w-full h-[20%] px-4 py-3'>
                                <h1 className='capitalize'>{promo.title}</h1>
                                <h1 className='text-primaryblue'>Rp{formatNumber(promo.promo_discount_price)}</h1>
                            </div>
                        </div>
                    ))}
                </AliceCarousel>
            </div>
        </div>
    )
}

export default PromoSection
