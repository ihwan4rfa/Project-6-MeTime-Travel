import moment from 'moment/moment'
import Navbar from '@/components/Fragments/Navbar'
import Sidebar from '@/components/Elements/Sidebar'
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
    const [search, setSearch] = useState("");
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    useEffect(() => {
        getData("promos", (res) => setPromos(res.data.data));
        setTimeout(() => {
            setIsPageLoaded(true);
        }, 2000);
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

    // Event every search changed
    useEffect(() => {
        getData("promos", (res) => { // must be refetch every load new data
            const filtered = res.data.data.filter((promo) =>
                promo.title.toLowerCase().includes(search.toLowerCase())
            )
            setPromos(filtered); // update banners every search changed
        });
    }, [search]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    return (
        <div className='flex w-full h-screen cursor-default lg:cursor-none bg-slate-100 font-poppins dark:bg-slate-700 dark:text-slate-200 text-primaryblack'>
            <Navbar />
            <Sidebar />
            <div className='w-5/6 px-10 pt-20'>
                <div className='flex flex-col w-full h-full'>
                    <div className='flex items-center justify-between h-14'>
                        <h1 className='text-2xl font-semibold'>Promos</h1>
                        <div className='flex items-center text-[13px] my-2'>
                            <h1 className={`mr-4 text-slate-400 ${search === "" ? 'hidden' : ''}`}><b>{promos.length}</b> {promos.length > 1 ? 'promos' : 'promo'} found</h1>
                            <div className='flex py-2 bg-white rounded-lg dark:bg-primaryblack text-primaryblack'>
                                <div className='px-4'><i class="fa-solid fa-magnifying-glass dark:text-slate-200"></i></div>
                                <input onChange={handleSearch} type="text" placeholder="Search Promo" className="pr-4 bg-transparent outline-none placeholder:text-slate-300 dark:placeholder:text-slate-500 dark:text-slate-200" />
                            </div>
                            <button onClick={handleShowAddPromo} type="button" className="px-4 py-2 ml-4 font-medium text-white rounded-lg cursor-default cursor-scale lg:cursor-none bg-primaryyellow hover:bg-yellowhover">
                                <i class="fa-solid fa-plus mr-2" />
                                New Promo
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-1 mt-1 overflow-y-scroll no-scrollbar rounded-xl'>
                        <div className='flex flex-wrap h-fit w-full gap-[2%]'>
                            {promos.map((promo, index) => (
                                <div key={index} className='w-[32%] overflow-hidden bg-white dark:bg-primaryblack dark:text-slate-200 text-primaryblack rounded-xl h-64 text-[13px] mb-5'>
                                    {promo.imageUrl.startsWith("https://") && (promo.imageUrl.includes(".jpg") || promo.imageUrl.includes(".png") || promo.imageUrl.includes("images")) ?
                                        <img src={promo.imageUrl} className='object-cover w-full bg-slate-200 h-[65%]'></img>
                                        : <Image src="/images/no-image.png" className='object-cover w-full h-[65%]' width={500} height={500} alt='Unknown Profile' />
                                    }
                                    <div className='flex relative w-full flex-col h-[35%] px-4 py-3 gap-2'>
                                        <h1 className='font-semibold capitalize'>{promo.title}</h1>
                                        <div className='flex flex-col text-[11px] text-primarygray dark:text-slate-400 gap-1'>
                                            <p><i class="fa-regular fa-calendar-plus mr-2 text-primaryyellow"></i>{moment(promo.createdAt).format("DD MMMM YYYY • HH:mm:ss")}</p>
                                            <p><i class="fa-regular fa-calendar-check mr-2 text-primaryblue"></i>{moment(promo.updatedAt).format("DD MMMM YYYY • HH:mm:ss")}</p>
                                        </div>
                                        <div className='absolute bottom-0 right-0 flex m-2'>
                                            <button onClick={() => handleShowEditPromo(promo.id)} className='w-8 h-8 rounded-lg cursor-default cursor-scale lg:cursor-none text-primaryblue hover:text-bluehover'><i class="fa-solid fa-pen-to-square"></i></button>
                                            <button onClick={() => handleShowModalConfirmDelete(promo.id)} className='w-8 h-8 rounded-lg cursor-default cursor-scale lg:cursor-none text-primaryred hover:text-redhover'><i class="fa-regular fa-trash-can"></i></button>
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
            <div className={`${showModal || !isPageLoaded ? 'invisible' : 'visible dark:invisible'} text-[11px] text-left`}>
                <Toaster
                    position="top-center"
                    toastOptions={{
                        duration: 3000,
                        success: {
                            style: {
                                background: 'white',
                                color: '#212832'
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
            <div className={`${showModal || !isPageLoaded ? 'invisible' : 'invisible dark:visible'} text-[11px] text-left`}>
                <Toaster
                    position="top-center"
                    toastOptions={{
                        duration: 3000,
                        success: {
                            style: {
                                background: '#334155',
                                color: 'white'
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