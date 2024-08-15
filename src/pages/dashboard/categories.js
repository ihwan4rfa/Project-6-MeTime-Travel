import moment from 'moment/moment'
import Navbar from '@/components/Fragments/Navbar'
import Sidebar from '@/components/Elements/Sidebar'
import React, { useEffect, useState } from 'react'
import useGetData from '@/Hooks/useGetData'
import { useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import ModalConfirmDeleteCategory from '@/components/Elements/ModalConfirmDeleteCategory'
import ModalEditCategory from '@/components/Elements/ModalEditCategory'
import ModalAddCategory from '@/components/Elements/ModalAddCategory'
import Image from 'next/image'

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const { getData } = useGetData();
    const [showEditCategory, setShowEditCategory] = useState(false);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const showModal = useSelector((state) => state.showModal.modal);
    const [showDeleteCategory, setShowDeleteCategory] = useState(false);
    const [search, setSearch] = useState("");
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    useEffect(() => {
        getData("categories", (res) => setCategories(res.data.data));
        setTimeout(() => {
            setIsPageLoaded(true);
        }, 2000);
    }, [showDeleteCategory, showEditCategory, showAddCategory]);

    const handleShowAddCategory = () => {
        setShowAddCategory(!showAddCategory);
    }

    const handleEditCategory = async (categoryId) => {
        const getCategory = async () => {
            await getData(`category/${categoryId}`, (res) => {
                setSelectedCategory(res.data.data);
            })
        }

        try {
            await getCategory();
            setShowEditCategory(!showEditCategory);
        } catch (error) {
            console.log(error);
        }
    }

    const handleShowModalConfirmDelete = async (categoryId) => {
        const getCategory = async () => {
            await getData(`category/${categoryId}`, (res) => {
                setSelectedCategory(res.data.data);
            })
        }

        try {
            await getCategory();
            setShowDeleteCategory(!showDeleteCategory);
        } catch (error) {
            console.log(error);
        }
    }

    // Event every search changed
    useEffect(() => {
        getData("categories", (res) => { // must be refetch every load new data
            const filtered = res.data.data.filter((category) =>
                category.name.toLowerCase().includes(search.toLowerCase())
            )
            setCategories(filtered); // update banners every search changed
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
                    <div className='flex items-center justify-between h-14 '>
                        <h1 className='text-2xl font-semibold'>Categories</h1>
                        <div className='flex items-center text-[13px] my-2'>
                            <h1 className={`mr-4 text-slate-400 ${search === "" ? 'hidden' : ''}`}><b>{categories.length}</b> {categories.length > 1 ? 'categories' : 'category'} found</h1>
                            <div className='flex py-2 bg-white rounded-lg dark:bg-primaryblack text-primaryblack'>
                                <div className='px-4'><i class="fa-solid fa-magnifying-glass dark:text-slate-200"></i></div>
                                <input onChange={handleSearch} type="text" placeholder="Search Category" className="pr-4 bg-transparent outline-none placeholder:text-slate-300 dark:placeholder:text-slate-500 dark:text-slate-200" />
                            </div>
                            <button onClick={handleShowAddCategory} type="button" className="px-4 py-2 ml-4 font-medium text-white rounded-lg cursor-default cursor-scale lg:cursor-none bg-primaryyellow hover:bg-yellowhover">
                                <i class="fa-solid fa-plus mr-2" />
                                New Category
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-1 mt-1 overflow-y-scroll no-scrollbar rounded-xl'>
                        <div className='flex flex-wrap h-fit w-full gap-[2%]'>
                            {categories.map((category, index) => (
                                <div key={index} className='w-[32%] overflow-hidden bg-white dark:bg-primaryblack dark:text-slate-200 text-primaryblack rounded-xl h-64 text-[13px] mb-5'>
                                    {category.imageUrl.startsWith("https://") && (category.imageUrl.includes(".jpg") || category.imageUrl.includes(".png") || category.imageUrl.includes("images")) ?
                                        <img src={category.imageUrl} className='object-cover w-full bg-slate-200 h-[65%]'></img>
                                        : <Image src="/images/no-image.png" className='object-cover w-full h-[65%]' width={500} height={500} alt='Unknown Profile' />
                                    }
                                    <div className='flex relative w-full flex-col h-[35%] px-4 py-3 gap-2'>
                                        <h1 className='font-semibold capitalize'>{category.name}</h1>
                                        <div className='flex flex-col text-[11px] text-primarygray dark:text-slate-400 gap-1'>
                                            <p><i class="fa-regular fa-calendar-plus mr-2 text-primaryyellow"></i>{moment(category.createdAt).format("DD MMMM YYYY • HH:mm:ss")}</p>
                                            <p><i class="fa-regular fa-calendar-check mr-2 text-primaryblue"></i>{moment(category.updatedAt).format("DD MMMM YYYY • HH:mm:ss")}</p>
                                        </div>
                                        <div className='absolute bottom-0 right-0 flex m-2'>
                                            <button onClick={() => handleEditCategory(category.id)} className='w-8 h-8 rounded-lg cursor-default cursor-scale lg:cursor-none text-primaryblue hover:text-bluehover'><i class="fa-solid fa-pen-to-square"></i></button>
                                            <button onClick={() => handleShowModalConfirmDelete(category.id)} className='w-8 h-8 rounded-lg cursor-default cursor-scale lg:cursor-none text-primaryred hover:text-redhover'><i class="fa-regular fa-trash-can"></i></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ModalConfirmDeleteCategory showDeleteCategory={showDeleteCategory} setShowDeleteCategory={setShowDeleteCategory} selectedCategory={selectedCategory} />
            <ModalEditCategory showEditCategory={showEditCategory} setShowEditCategory={setShowEditCategory} selectedCategory={selectedCategory} />
            <ModalAddCategory showAddCategory={showAddCategory} setShowAddCategory={setShowAddCategory} />
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

export default Categories