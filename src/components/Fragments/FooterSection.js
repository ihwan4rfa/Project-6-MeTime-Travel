import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

const FooterSection = () => {
    const router = useRouter();

    return (
        <div className='flex flex-col items-center gap-12 pb-6 bg-white shadow-footer'>
            <div className='flex w-full h-fit'>
                <div className='flex flex-col gap-6 w-[40%]'>
                    <Image className='w-fit h-9' src="/images/Logo.png" width={500} height={500} />
                    <div className='flex flex-col gap-1'>
                        <h1 className='font-medium text-primarygray'>Adventure awaits!</h1>
                        <h1 className='font-medium text-primarygray'>Make time with Me Time Travel</h1>
                    </div>
                </div>
                <div className='flex justify-between w-[60%]'>
                    <div className='flex flex-col gap-6'>
                        <h1 className='font-medium'>Company</h1>
                        <div className='flex flex-col items-start gap-3 text-primarygray'>
                            <button className='hover:text-primaryred'>About</button>
                            <div className='flex gap-4 text-base'>
                                <a href='https://www.instagram.com/ihwanarfa' target='_blank'><i class="fa-brands fa-instagram hover:text-primaryred"></i></a>
                                <a href='https://web.facebook.com/ihwan.arifandi.5' target='_blank'><i class="fa-brands fa-facebook-f text-[15px] hover:text-primaryred"></i></a>
                                <a href='https://www.x.com/ihwanarfa' target='_blank'><i class="fa-brands fa-x-twitter hover:text-primaryred"></i></a>
                                <a href='https://www.tiktok.com/@ihwanarfa' target='_blank'><i class="fa-brands fa-tiktok text-[15px] hover:text-primaryred"></i></a>
                            </div>
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
                        <div className='flex flex-col items-start gap-3 text-primarygray'>
                            <button onClick={() => router.push("/destinations")} className='hover:text-primaryred'>Destinations</button>
                            <button onClick={() => router.push("/promos")} className='hover:text-primaryred'>promos</button>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className='text-gray-400 text-[12px]'>
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
