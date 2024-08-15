import moment from 'moment/moment'
import Navbar from '@/components/Fragments/Navbar'
import Sidebar from '@/components/Elements/Sidebar'
import React, { useEffect, useState } from 'react'
import useGetData from '@/Hooks/useGetData'
import { useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import ModalConfirmDeleteDestination from '@/components/Elements/ModalConfirmDeleteDestination'
import ModalEditDestination from '@/components/Elements/ModalEditDestination'
import ModalAddDestination from '@/components/Elements/ModalAddDestination'
import Image from 'next/image'
import DropDownFilterByCategory from '@/components/Elements/DropDownFilterByCategory'

const Destinations = () => {
    const [destinations, setDestinations] = useState([]);
    const { getData } = useGetData();
    const [showEditDestination, setShowEditDestination] = useState(false);
    const [showDeleteDestination, setShowDeleteDestination] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState([]);
    const showModal = useSelector((state) => state.showModal.modal);
    const [showAddDestination, setShowAddDestination] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [categoryAllSelected, setCategoryAllSelected] = useState(true);
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    useEffect(() => {
        if (selectedCategoryId === null) {
            getData("activities", (res) => { // must be refetch every load new data
                const filtered = res.data.data.filter((activity) =>
                    activity.title.toLowerCase().includes(search.toLowerCase())
                )
                setDestinations(filtered); // update destinations every search changed
            });
        } else if (selectedCategoryId !== null) {
            getData(`activities-by-category/${selectedCategoryId}`, (res) => {
                const filtered = res.data.data.filter((activity) =>
                    activity.categoryId === selectedCategoryId && activity.title.toLowerCase().includes(search.toLowerCase())
                )
                setDestinations(filtered);
            })
        } else {
            getData("activities", (res) => setDestinations(res.data.data));
        }

        setTimeout(() => {
            setIsPageLoaded(true);
        }, 2000);
    }, [showDeleteDestination, showEditDestination, showAddDestination]);

    const handleShowAddDestination = () => {
        setShowAddDestination(!showAddDestination);
    }

    const handleShowEditDestination = async (destinationId) => {
        const getCategory = async () => {
            await getData(`activity/${destinationId}`, (res) => {
                setSelectedDestination(res.data.data);
            })
        }

        try {
            await getCategory();
            setShowEditDestination(!showEditDestination);
        } catch (error) {
            console.log(error);
        }
    }

    const handleShowModalConfirmDelete = async (destinationId) => {
        const getCategory = async () => {
            await getData(`activity/${destinationId}`, (res) => {
                setSelectedDestination(res.data.data);
            })
        }

        try {
            await getCategory();
            setShowDeleteDestination(!showDeleteDestination);
        } catch (error) {
            console.log(error);
        }
    }

    // Event every filter changed
    useEffect(() => {
        if (selectedCategoryId === null) {
            getData("activities", (res) => { // must be refetch every load new data
                const filtered = res.data.data.filter((activity) =>
                    activity.title.toLowerCase().includes(search.toLowerCase())
                )
                setDestinations(filtered); // update destinations every search changed
            });
        } else {
            getData(`activities-by-category/${selectedCategoryId}`, (res) => {
                const filtered = res.data.data.filter((activity) =>
                    activity.categoryId === selectedCategoryId && activity.title.toLowerCase().includes(search.toLowerCase())
                )
                setDestinations(filtered);
            })
        }
    }, [selectedCategoryId]);

    // Event every search changed
    useEffect(() => {
        if (selectedCategoryId === null) {
            getData("activities", (res) => { // must be refetch every load new data
                const filtered = res.data.data.filter((activity) =>
                    activity.title.toLowerCase().includes(search.toLowerCase())
                )
                setDestinations(filtered); // update destinations every search changed
            });
        } else {
            getData(`activities-by-category/${selectedCategoryId}`, (res) => {
                const filtered = res.data.data.filter((activity) =>
                    activity.categoryId === selectedCategoryId && activity.title.toLowerCase().includes(search.toLowerCase())
                )
                setDestinations(filtered);
            })
        }
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
                        <h1 className='text-2xl font-semibold'>Destinations</h1>
                        <div className='flex items-center justify-end w-full text-[13px] my-2 gap-4'>
                            <h1 className={`text-slate-400 ${search === "" && selectedCategoryId === null ? 'hidden' : ''}`}><b>{destinations.length}</b> {destinations.length > 1 ? 'destinations' : 'destination'} found</h1>
                            <div className='flex py-2 bg-white rounded-lg dark:bg-primaryblack text-primaryblack'>
                                <div className='px-4'><i class="fa-solid fa-magnifying-glass dark:text-slate-200"></i></div>
                                <input onChange={handleSearch} type="text" placeholder="Search Destination" className="pr-4 bg-transparent outline-none placeholder:text-slate-300 dark:placeholder:text-slate-500 dark:text-slate-200" />
                            </div>
                            <DropDownFilterByCategory selectedCategoryId={selectedCategoryId} setSelectedCategoryId={setSelectedCategoryId} categoryAllSelected={categoryAllSelected} setCategoryAllSelected={setCategoryAllSelected} setDestinations={setDestinations} />
                            <button onClick={handleShowAddDestination} type="button" className="px-4 py-2 font-medium text-white rounded-lg cursor-default cursor-scale lg:cursor-none bg-primaryyellow hover:bg-yellowhover">
                                <i class="fa-solid fa-plus mr-2" />
                                New Destination
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-1 mt-1 overflow-y-scroll no-scrollbar rounded-xl'>
                        <div className='flex flex-wrap h-fit w-full gap-[2%]'>
                            {destinations.map((destination, index) => (
                                <div key={index} className='w-[32%] overflow-hidden bg-white dark:bg-primaryblack dark:text-slate-200 text-primaryblack rounded-xl h-64 text-[13px] mb-5'>
                                    {destination.imageUrls[0].startsWith("https://") && (destination.imageUrls[0].includes(".jpg") || destination.imageUrls[0].includes(".png") || destination.imageUrls[0].includes("images")) ?
                                        <img src={destination.imageUrls[0]} className='object-cover w-full bg-slate-200 h-[65%]'></img>
                                        : <Image src="/images/no-image.png" className='object-cover w-full h-[65%]' width={500} height={500} alt='Unknown Profile' />
                                    }
                                    <div className='flex relative w-full flex-col h-[35%] px-4 py-3 gap-2'>
                                        <h1 className='font-semibold capitalize'>{destination.title}</h1>
                                        <div className='flex flex-col text-[11px] text-primarygray dark:text-slate-400 gap-1'>
                                            <p><i class="fa-regular fa-calendar-plus mr-2 text-primaryyellow"></i>{moment(destination.createdAt).format("DD MMMM YYYY • HH:mm:ss")}</p>
                                            <p><i class="fa-regular fa-calendar-check mr-2 text-primaryblue"></i>{moment(destination.updatedAt).format("DD MMMM YYYY • HH:mm:ss")}</p>
                                        </div>
                                        <div className='absolute bottom-0 right-0 flex m-2'>
                                            <button onClick={() => handleShowEditDestination(destination.id)} className='w-8 h-8 rounded-lg cursor-default cursor-scale lg:cursor-none text-primaryblue hover:text-bluehover'><i class="fa-solid fa-pen-to-square"></i></button>
                                            <button onClick={() => handleShowModalConfirmDelete(destination.id)} className='w-8 h-8 rounded-lg cursor-default cursor-scale lg:cursor-none text-primaryred hover:text-redhover'><i class="fa-regular fa-trash-can"></i></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ModalConfirmDeleteDestination showDeleteDestination={showDeleteDestination} setShowDeleteDestination={setShowDeleteDestination} selectedDestination={selectedDestination} />
            <ModalEditDestination showEditDestination={showEditDestination} setShowEditDestination={setShowEditDestination} selectedDestination={selectedDestination} />
            <ModalAddDestination showAddDestination={showAddDestination} setShowAddDestination={setShowAddDestination} />
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

export default Destinations