import React from 'react'
import Image from 'next/image'

const HeaderSection = () => {
    return (
        <div className='flex w-full pt-20 h-fit'>
            <div className='flex flex-col justify-center w-1/2 h-full'>
                <h1 className='overflow-hidden text-lg font-bold uppercase whitespace-nowrap animate-typing text-primaryred'>It's time for me time</h1>
                <h1 className='relative w-full text-[55px] font-bold font-volkhov leading-tight tracking-tight my-5'>
                    Adventure Awaits!<br />Make Time with<br />Me Time Travel
                    <Image src="/images/line-decore.png" className='absolute w-[400] top-[55px] left-[10%]' width={500} height={500} alt='Line Decore' />
                </h1>
                <h1 className='pr-24 font-medium text-primarygray'>
                    Explore breathtaking destinations, create unforgettable memories, and discover new horizons with our personalized travel experiences.
                </h1>
                <button type="button" className="px-5 py-3 mt-8 font-medium text-white rounded-lg w-fit bg-primaryyellow hover:bg-yellowhover">
                    Explore Now
                </button>
            </div>
            <div className='flex items-center justify-center w-1/2 h-full'>
                <Image src="/images/header-model.png" className='p-4' width={500} height={500} alt='Line Decore' />
            </div>
        </div>
    )
}

export default HeaderSection