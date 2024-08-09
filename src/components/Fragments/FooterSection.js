import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useSelector } from 'react-redux';

const FooterSection = () => {
    const router = useRouter();
    const isDark = useSelector((state) => state.theme.isDark);

    return (
        <div className='flex flex-col items-center gap-12 pb-6 text-[10px] lg:text-[11px] xl:text-[13px]'>
            <div className='flex flex-wrap w-full gap-5 sm:gap-0 sm:flex h-fit'>
                <div className='flex flex-col items-center sm:items-start gap-3 lg:gap-4 xl:gap-6 w-full sm:w-[40%]'>
                    <Image className='h-7 w-fit lg:h-8 xl:h-9' src={isDark ? "/images/Logo-dark.png" : "/images/Logo.png"} width={500} height={500} />
                    <div className='flex flex-col w-full gap-1 text-center text-primarygray dark:text-slate-400 sm:text-left'>
                        <h1>Adventure awaits!</h1>
                        <h1>Make time with Me Time Travel</h1>
                    </div>
                </div>
                <div className='flex flex-col gap-5 sm:gap-0 justify-between sm:flex-row w-full sm:w-[60%]'>
                    <div className='flex flex-col gap-3 lg:gap-4 xl:gap-6'>
                        <h1 className='font-medium text-center sm:text-left'>Company</h1>
                        <div className='flex flex-col items-center gap-2 sm:items-start xl:gap-3 text-primarygray dark:text-slate-400'>
                            <button className='hover:text-primaryred dark:hover:text-primaryyellow'>About</button>
                            <div className='flex gap-2 lg:gap-3 xl:gap-4 text-[13px] lg:text-[14px] xl:text-[16px]'>
                                <a href='https://www.instagram.com/ihwanarfa' target='_blank'><i class="fa-brands fa-instagram hover:text-primaryred dark:hover:text-primaryyellow"></i></a>
                                <a href='https://web.facebook.com/ihwan.arifandi.5' target='_blank'><i class="fa-brands fa-facebook-f hover:text-primaryred dark:hover:text-primaryyellow"></i></a>
                                <a href='https://www.x.com/ihwanarfa' target='_blank'><i class="fa-brands fa-x-twitter hover:text-primaryred dark:hover:text-primaryyellow"></i></a>
                                <a href='https://www.tiktok.com/@ihwanarfa' target='_blank'><i class="fa-brands fa-tiktok hover:text-primaryred dark:hover:text-primaryyellow"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 text-center lg:gap-4 xl:gap-6 sm:text-left'>
                        <h1 className='font-medium'>Contact</h1>
                        <div className='flex flex-col gap-2 xl:gap-3 text-primarygray dark:text-slate-400'>
                            <h1>Salatiga, Indonesia</h1>
                            <h1>metimetravel@gmail.com</h1>
                            <h1>0858 7502 9000</h1>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 lg:gap-4 xl:gap-6'>
                        <h1 className='font-medium text-center sm:text-left'>Quick links</h1>
                        <div className='flex flex-col items-center gap-2 xl:gap-3 text-primarygray dark:text-slate-400 sm:items-start'>
                            <button onClick={() => router.push("/destinations")} className='hover:text-primaryred dark:hover:text-primaryyellow'>Destinations</button>
                            <button onClick={() => router.push("/promos")} className='hover:text-primaryred dark:hover:text-primaryyellow'>Promos</button>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className='text-gray-400 dark:text-slate-500 text-[9px] lg:text-[10px] xl:text-[12px] text-center'>
                <i class="fa-regular fa-copyright mr-1"></i>2024 MeTime Travel. All Rights Reserved
                <span className='mx-2'>|</span>
                <span className='py-2 cursor-pointer hover:text-primaryblue'>
                    <a href='https://github.com/ihwan4rfa' target='_blank'><i class="fa-brands fa-github mr-1"></i>ihwan4rfa</a>
                </span>
            </h1>
        </div>
    )
}

export default FooterSection
