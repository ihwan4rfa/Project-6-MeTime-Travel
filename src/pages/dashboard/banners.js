import moment from 'moment/moment'
import Navbar from '@/components/Fragments/Navbar'
import Sidebar from '@/components/Fragments/Sidebar'
import React, { useEffect, useState } from 'react'
import useGetData from '@/Hooks/useGetData'
import ModalEditBanner from '@/components/Elements/ModalEditBanner'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import ModalConfirmDeleteBanner from '@/components/Elements/ModalConfirmDeleteBanner'
import ModalAddBanner from '@/components/Elements/ModalAddBanner'
import Image from 'next/image'

const Banners = () => {
    const [banners, setBanners] = useState([]);
    const { getData } = useGetData();
    const [showEditBanner, setShowEditBanner] = useState(false);
    const [showAddBanner, setShowAddBanner] = useState(false);
    const [selectedBanner, setSelectedBanner] = useState([]);
    const showModal = useSelector((state) => state.showModal.modal);
    const [showDeleteBanner, setShowDeleteBanner] = useState(false);

    useEffect(() => {
        getData("banners", (res) => setBanners(res.data.data));
    }, [showEditBanner, showDeleteBanner, showAddBanner]);

    const handleShowAddBanner = () => {
        setShowAddBanner(!showAddBanner);
    }

    const handleShowEditBanner = async (bannerId) => {
        const getBanner = async () => {
            await getData(`banner/${bannerId}`, (res) => {
                setSelectedBanner(res.data.data);
            })
        }

        try {
            await getBanner();
            setShowEditBanner(!showEditBanner);
        } catch (error) {
            console.log(error);
        }
    }

    const handleShowModalConfirmDelete = async (bannerId) => {
        const getBanner = async () => {
            await getData(`banner/${bannerId}`, (res) => {
                setSelectedBanner(res.data.data);
            })
        }

        try {
            await getBanner();
            setShowDeleteBanner(!showDeleteBanner);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex w-full h-screen bg-slate-100 font-poppins text-primaryblack'>
            <Navbar />
            <Sidebar />
            <div className='w-5/6 px-10 pt-20'>
                <div className='flex flex-col w-full h-full'>
                    <div className='flex items-center justify-between h-14'>
                        <h1 className='text-2xl font-semibold'>Banners</h1>
                        <div className='flex items-center text-[13px] my-2'>
                            <h1 className={`mr-4 text-slate-400`}><b>10</b> banners found</h1>
                            <div className='flex py-2 bg-white rounded-lg text-primaryblack'>
                                <button className='px-4'><i class="fa-solid fa-magnifying-glass"></i></button>
                                <input type="text" placeholder="Search User" className="pr-4 bg-transparent outline-none placeholder:text-slate-300" />
                            </div>
                            <button onClick={handleShowAddBanner} type="button" className="px-4 py-2 ml-4 font-medium text-white rounded-lg bg-primaryyellow hover:bg-yellowhover">
                                <i class="fa-solid fa-plus mr-2" />
                                New Banner
                            </button>
                        </div>
                    </div>
                    <div className='h-[2px] bg-opacity-50 rounded-full bg-slate-300'></div>
                    <div className='flex flex-1 overflow-y-scroll no-scrollbar'>
                        <div className='flex flex-wrap h-fit w-full gap-[2%] pt-2'>
                            {banners.map((banner, index) => (
                                <div key={index} className='w-[32%] overflow-hidden bg-white text-primaryblack rounded-xl h-64 text-[13px] my-3'>
                                    {banner.imageUrl.startsWith("https://") && (banner.imageUrl.includes(".jpg") || banner.imageUrl.includes(".png") || banner.imageUrl.includes("images")) ?
                                        <img src={banner.imageUrl} className='object-cover w-full bg-slate-200 h-[65%]'></img>
                                        : <Image src="/images/no-image.png" className='object-cover w-full h-[65%]' width={500} height={500} alt='Unknown Profile' />
                                    }
                                    <div className='flex relative w-full flex-col h-[35%] px-4 py-3 gap-2'>
                                        <h1 className='font-semibold'>{banner.name}</h1>
                                        <div className='flex flex-col text-[11px] text-primarygray gap-1'>
                                            <p><i class="fa-regular fa-calendar-plus mr-2 text-primaryyellow"></i>{moment(banner.createdAt).format("DD MMMM YYYY • HH:mm:ss")}</p>
                                            <p><i class="fa-regular fa-calendar-check mr-2 text-primaryblue"></i>{moment(banner.updatedAt).format("DD MMMM YYYY • HH:mm:ss")}</p>
                                        </div>
                                        <div className='absolute bottom-0 right-0 flex m-2'>
                                            <button onClick={() => handleShowEditBanner(banner.id)} className='w-8 h-8 rounded-lg text-primaryblue hover:text-bluehover'><i class="fa-solid fa-pen-to-square"></i></button>
                                            <button onClick={() => handleShowModalConfirmDelete(banner.id)} className='w-8 h-8 rounded-lg text-primaryred hover:text-redhover'><i class="fa-regular fa-trash-can"></i></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ModalConfirmDeleteBanner showDeleteBanner={showDeleteBanner} setShowDeleteBanner={setShowDeleteBanner} selectedBanner={selectedBanner} />
            <ModalEditBanner showEditBanner={showEditBanner} setShowEditBanner={setShowEditBanner} selectedBanner={selectedBanner} />
            <ModalAddBanner showAddBanner={showAddBanner} setShowAddBanner={setShowAddBanner} />
            <div className={`${showModal === true ? 'invisible' : ''} text-[11px] text-left`}>
                <Toaster
                    position="top-center"
                    toastOptions={{
                        duration: 3000,
                        success: {
                            style: {
                                background: 'white',
                                color: 'black'
                            },
                            iconTheme: {
                                primary: '#10b981',
                                secondary: 'white'
                            }
                        },
                        error: {
                            style: {
                                background: '#DF6951',
                                color: 'white',
                            },
                            iconTheme: {
                                primary: 'white',
                                secondary: '#DF6951'
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default Banners