import React, { useState } from 'react'
import Image from 'next/image'

const FacilitiesSection = () => {

    const iconList = {
        icon1: "/images/icon-facility-1.png",
        icon2: "/images/icon-facility-2.png",
        icon3: "/images/icon-facility-3.png",
        icon4: "/images/icon-facility-4.png"
    }

    const titleList = [
        "Calculated Weather",
        "Best Flights",
        "Local Events",
        "Good Testimonials",
    ]

    const descriptionList = [
        "Precision weather forecasting for seamless adventures",
        "Discover best flights for your perfect getaway",
        "Explore local events for unforgettable experiences",
        "Trusted by many with excellent customer testimonials",
    ]

    const keys = Object.keys(iconList);

    const [hoverIndex, setHoverIndex] = useState(null);

    return (
        <div className='relative z-30 flex flex-col w-full gap-8 -mt-16 h-fit'>
            <div className='absolute z-0 bg-primaryyellow bg-opacity-10 rounded-full w-[300px] h-[300px] blur-3xl -top-24 -right-20'></div>
            <Image src="/images/aksen.png" className='absolute w-24 -top-10 -left-20' width={500} height={500} alt='Line Decore' />
            <h1 className='flex items-center justify-center w-full text-3xl font-bold tracking-tight font-volkhov'>
                Why Me Time Travel?
            </h1>
            <div className='flex justify-between w-full'>
                {keys.map((key, index) => (
                    <div className='relative'>
                        <div key={index} onMouseEnter={() => setHoverIndex(index)} onMouseLeave={() => setHoverIndex(null)} className='relative z-10 flex flex-col h-64 duration-75 bg-white hover:shadow-card hover:scale-103 w-52 rounded-2xl'>
                            <div className='flex items-end justify-center w-full h-2/5'>
                                <Image src={iconList[key]} className='w-auto h-16' width={500} height={500} alt="Icon" />
                            </div>
                            <div className='flex flex-col items-center gap-4 py-6 h-3/5'>
                                <h1 className='font-medium'>{titleList[index]}</h1>
                                <h1 className='px-8 text-center text-primarygray'>{descriptionList[index]}</h1>
                            </div>
                        </div>
                        <div className={`${hoverIndex === index ? 'scale-100' : 'scale-0'} flex -bottom-6 duration-75 -left-6 absolute z-0 w-24 h-24 rounded-bl-[30px] rounded-2xl bg-primaryred`}></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FacilitiesSection
