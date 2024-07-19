import moment from 'moment/moment'
import Navbar from '@/components/Fragments/Navbar'
import Sidebar from '@/components/Fragments/Sidebar'
import React, { useEffect, useState } from 'react'
import useGetData from '@/Hooks/useGetData'
import { useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import ModalConfirmDeletePromo from '@/components/Elements/ModalConfirmDeletePromo'
import ModalEditPromo from '@/components/Elements/ModalEditPromo'
import Image from 'next/image'
import ModalAddPromo from '@/components/Elements/ModalAddPromo'

const Promos = () => {
    const [promos, setPromos] = useState([]);
    const { getData } = useGetData();
    const [showEditPromo, setShowEditPromo] = useState(false);
    const [showDeletePromo, setShowDeletePromo] = useState(false);
    const [selectedPromo, setSelectedPromo] = useState([]);
    const showModal = useSelector((state) => state.showModal.modal);
    const [showAddPromo, setShowAddPromo] = useState(false);

    useEffect(() => {
        getData("promos", (res) => setPromos(res.data.data));
    }, [showDeletePromo, showEditPromo, showAddPromo]);

    const handleShowAddPromo = () => {
        setShowAddPromo(!showAddPromo);
    }

    const handleShowEditPromo = async (promoId) => {
        const getPromo = async () => {
            await getData(`promo/${promoId}`, (res) => {
                setSelectedPromo(res.data.data);
            })
        }

        try {
            await getPromo();
            setShowEditPromo(!showEditPromo);
        } catch (error) {
            console.log(error);
        }
    }

    const handleShowModalConfirmDelete = async (promoId) => {
        const getPromo = async () => {
            await getData(`promo/${promoId}`, (res) => {
                setSelectedPromo(res.data.data);
            })
        }

        try {
            await getPromo();
            setShowDeletePromo(!showDeletePromo);
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
                        <h1 className='text-2xl font-semibold'>Promos</h1>
                        <div className='flex items-center text-[13px] my-2'>
                            <h1 className={`mr-4 text-slate-400`}><b>10</b> promos found</h1>
                            <div className='flex py-2 bg-white rounded-lg text-primaryblack'>
                                <button className='px-4'><i class="fa-solid fa-magnifying-glass"></i></button>
                                <input type="text" placeholder="Search User" className="pr-4 bg-transparent outline-none placeholder:text-slate-300" />
                            </div>
                            <button onClick={handleShowAddPromo} type="button" className="px-4 py-2 ml-4 font-medium text-white rounded-lg bg-primaryyellow hover:bg-yellowhover">
                                <i class="fa-solid fa-plus mr-2" />
                                New Promo
                            </button>
                        </div>
                    </div>
                    <div className='h-[2px] bg-opacity-50 rounded-full bg-slate-300'></div>
                    <div className='flex flex-1 overflow-y-scroll no-scrollbar'>
                        <div className='flex flex-wrap h-fit w-full gap-[2%] pt-2'>
                            {promos.map((promo, index) => (
                                <div key={index} className='w-[32%] overflow-hidden bg-white text-primaryblack rounded-xl h-64 text-[13px] my-3'>
                                    {promo.imageUrl.startsWith("https://") && (promo.imageUrl.includes(".jpg") || promo.imageUrl.includes(".png") || promo.imageUrl.includes("images")) ?
                                        <img src={promo.imageUrl} className='object-cover w-full bg-slate-200 h-[65%]'></img>
                                        : <Image src="/images/no-image.png" className='object-cover w-full h-[65%]' width={500} height={500} alt='Unknown Profile' />
                                    }
                                    <div className='flex relative w-full flex-col h-[35%] px-4 py-3 gap-2'>
                                        <h1 className='font-semibold'>{promo.title}</h1>
                                        <div className='flex flex-col text-[11px] text-primarygray gap-1'>
                                            <p><i class="fa-regular fa-calendar-plus mr-2 text-primaryyellow"></i>{moment(promo.createdAt).format("DD MMMM YYYY • HH:mm:ss")}</p>
                                            <p><i class="fa-regular fa-calendar-check mr-2 text-primaryblue"></i>{moment(promo.updatedAt).format("DD MMMM YYYY • HH:mm:ss")}</p>
                                        </div>
                                        <div className='absolute bottom-0 right-0 flex m-2'>
                                            <button onClick={() => handleShowEditPromo(promo.id)} className='w-8 h-8 rounded-lg text-primaryblue hover:text-bluehover'><i class="fa-solid fa-pen-to-square"></i></button>
                                            <button onClick={() => handleShowModalConfirmDelete(promo.id)} className='w-8 h-8 rounded-lg text-primaryred hover:text-redhover'><i class="fa-regular fa-trash-can"></i></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ModalConfirmDeletePromo showDeletePromo={showDeletePromo} setShowDeletePromo={setShowDeletePromo} selectedPromo={selectedPromo} />
            <ModalEditPromo showEditPromo={showEditPromo} setShowEditPromo={setShowEditPromo} selectedPromo={selectedPromo} />
            <ModalAddPromo showAddPromo={showAddPromo} setShowAddPromo={setShowAddPromo} />
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

export default Promos