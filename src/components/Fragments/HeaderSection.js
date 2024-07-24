import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

const HeaderSection = () => {
    const router = useRouter();

    return (
        <div className='z-30 relative flex items-center w-full pt-20 h-fit'>
            <div className='absolute z-0 bg-primaryyellow bg-opacity-10 rounded-full w-[300px] h-[300px] blur-3xl -top-28 -left-56'></div>
            <div className='flex relative flex-col justify-center w-1/2 h-full'>
                <h1 className='overflow-hidden text-2xl font-bold tracking-tight font-volkhov whitespace-nowrap animate-typing text-primaryred'>It's Time for Me Time!</h1>
                <h1 className='relative w-full text-[50px] font-bold font-volkhov leading-tight tracking-tight mb-5'>
                    Adventure Awaits!<br />Make Time with<br />Me Time Travel
                    <Image src="/images/line-decore.png" className='absolute top-[50px] left-[10%] opacity-50' width={450} height={10} alt='Line Decore' />
                </h1>
                <h1 className='font-medium text-primarygray'>
                    Explore breathtaking destinations, create unforgettable <br />memories, and discover new horizons with our personalized <br />travel experiences
                </h1>
                <button onClick={() => router.push("/destinations")} type="button" className="px-5 py-3 mt-8 font-medium text-white rounded-lg w-fit bg-primaryyellow hover:bg-yellowhover">
                    Explore Now
                </button>
            </div>
            <div className='flex relative items-center justify-center w-1/2 h-full'>
                <Image src="/images/header-model.png" className='p-4' width={500} height={500} alt='Line Decore' />
            </div>
        </div>
    )
}

export default HeaderSection