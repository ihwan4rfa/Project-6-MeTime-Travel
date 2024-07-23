import React from 'react'
import Image from 'next/image'

const FooterSection = () => {
    return (
        <div className='flex flex-col items-center gap-12 pb-6 bg-white shadow-footer'>
            <div className='flex justify-between w-full h-fit'>
                <div className='flex flex-col gap-6'>
                    <Image className='w-fit h-9' src="/images/Logo.png" width={500} height={500} />
                    <div className='flex flex-col gap-1'>
                        <h1 className='font-medium text-primarygray'>Adventure awaits!</h1>
                        <h1 className='font-medium text-primarygray'>Make time with Me Time Travel</h1>
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <h1 className='font-medium'>Company</h1>
                    <div className='flex flex-col gap-3 text-primarygray'>
                        <h1>About</h1>
                        <h1>Social Media</h1>
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <h1 className='font-medium'>Contact</h1>
                    <div className='flex flex-col gap-3 text-primarygray'>
                        <h1>Salatiga, Indonesia</h1>
                        <h1>metimetravel@gmail.com</h1>
                        <h1>0858 7502 9000</h1>
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <h1 className='font-medium'>Quick links</h1>
                    <div className='flex flex-col gap-3 text-primarygray'>
                        <h1>Destinations</h1>
                        <h1>Promo</h1>
                    </div>
                </div>
            </div>
            <h1 className='font-medium text-gray-400'>
                <i class="fa-regular fa-copyright mr-1"></i>2024 MeTime Travel
                <span className='mx-3'>|</span>
                All rights reserved
                <span className='mx-3'>|</span>
                <span className='py-2 cursor-pointer hover:text-primaryred'>
                    <a href='https://github.com/ihwan4rfa' target='_blank'><i class="fa-brands fa-github mr-1"></i>ihwan4rfa</a>
                </span>
            </h1>
        </div>
    )
}

export default FooterSection
