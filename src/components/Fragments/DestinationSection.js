import React, { useState, useEffect } from 'react'
import useGetData from '@/Hooks/useGetData'
import Image from 'next/image';
import { useRouter } from 'next/router';

const DestinationSection = ({ handleShowDetailDestination }) => {
    const { getData } = useGetData();
    const [categories, setCategories] = useState();
    const [destinations, setDestinations] = useState();
    const [search, setSearch] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedCategoryName, setSelectedCategoryName] = useState(null);
    const router = useRouter();
    const handleDragStart = (e) => e.preventDefault();

    useEffect(() => {
        getData("activities", (res) => setDestinations(res.data.data))
        getData("categories", (res) => setCategories(res.data.data))
    }, [])

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

    const handleChangeAllCategory = () => {
        setSelectedCategoryId(null);
        setSelectedCategoryName(null);
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
    }

    const handleOptionChange = (categoryId, categoryName) => {
        setSelectedCategoryId(categoryId);
        setSelectedCategoryName(categoryName);
    };

    const formatNumber = (number) => {
        return `Rp${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
    };

    return (
        <div className='relative z-10 flex flex-col sm:flex-row w-full h-fit text-[10px] lg:text-[11px] xl:text-[13px]'>
            <div className='absolute z-0 bg-primaryyellow dark:bg-primaryblue bg-opacity-10 dark:bg-opacity-20 rounded-full w-[250px] h-[250px] lg:w-[550px] lg:h-[550px] blur-3xl -top-10 right-0 lg:-right-20'></div>
            <div className='relative flex flex-col items-start justify-start w-full sm:w-[50%] md:w-[40%] lg:w-1/3 h-full'>
                <div className='flex items-end justify-between w-full mb-2 lg:mb-4'>
                    <div>
                        <h1 className='w-full text-xl font-bold leading-tight tracking-tight lg:text-2xl xl:text-3xl font-volkhov'>
                            Discover Your<br />Favorite Destination
                        </h1>
                        <h1 className='overflow-hidden text-lg font-bold tracking-tight lg:text-xl xl:text-2xl whitespace-nowrap animate-typing text-primaryred dark:text-primaryyellow font-volkhov'>Find Yours Today!</h1>
                    </div>
                    <button onClick={() => router.push("/destinations")} type="button" className="cursor-default cursor-scale lg:cursor-none flex sm:hidden px-3 py-2 mb-[6px] font-medium text-white rounded-lg w-fit bg-primaryyellow hover:bg-yellowhover dark:bg-primaryred dark:hover:bg-redhover">
                        Explore All
                    </button>
                </div>
                <h1 className='font-medium text-center capitalize dark:text-slate-200'>Category <i class="text-primaryred dark:text-primaryyellow fa-solid fa-chevron-right mx-2 text-[8px] lg:text-[9px] xl:text-[11px]"></i> {selectedCategoryName ? selectedCategoryName : 'All'}</h1>
                <div className='flex w-full h-16 pl-2 pr-8 my-4 overflow-y-scroll lg:pr-10 xl:pr-12 lg:my-6 sm:overflow-y-scroll sm:h-52 no-scrollbar'>
                    <div className='flex gap-2 mb-4 sm:flex-wrap lg:gap-3 xl:gap-4 w-fit h-fit'>
                        <div onClick={handleChangeAllCategory} className='cursor-scale lg:cursor-none flex items-center p-[6px] xl:p-2 font-medium bg-white cursor-pointer dark:bg-primaryblack shadow-label hover:shadow-hoverlabel dark:shadow-slate-700 hover:scale-103 rounded-xl'>
                            <div className='w-8 h-8 overflow-hidden rounded-lg lg:w-10 lg:h-10 xl:w-12 xl:h-12'>
                                <Image src="/images/all-category.jpg" className='object-cover w-full h-full' width={200} height={200} alt='All Category' />
                            </div>
                            <h1 className='px-2'>All</h1>
                        </div>
                        {categories && categories.map((category, index) => (
                            <div key={index} onClick={() => handleOptionChange(category.id, category.name)} className='cursor-scale lg:cursor-none flex items-center p-[6px] xl:p-2 font-medium bg-white cursor-pointer dark:bg-primaryblack shadow-label hover:shadow-hoverlabel dark:shadow-slate-700 hover:scale-103 rounded-xl'>
                                <div className='w-8 h-8 overflow-hidden rounded-lg lg:w-10 lg:h-10 xl:w-12 xl:h-12'>
                                    <img src={category.imageUrl} className='object-cover w-full h-full'></img>
                                </div>
                                <h1 className='px-2 capitalize'>{category.name}</h1>
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={() => router.push("/destinations")} type="button" className="hidden px-3 py-2 mt-2 font-medium text-white rounded-lg cursor-default cursor-scale lg:cursor-none sm:flex xl:px-5 xl:py-3 w-fit bg-primaryyellow hover:bg-yellowhover dark:bg-primaryred dark:hover:bg-redhover">
                    Explore All
                </button>
            </div>
            <div className='relative flex flex-col items-end w-full sm:w-[50%] md:w-[60%] lg:w-2/3 h-full gap-6 sm:pt-7'>
                <div className="flex items-end justify-between w-full">
                    <h1 className={`text-slate-400 ${search === "" && selectedCategoryId === null ? 'invisible' : 'visible'}`}><b>{destinations && destinations.length}</b> {destinations && destinations.length > 1 ? 'destinations' : 'destination'} found</h1>
                    <div className='flex w-40 py-3 bg-white rounded-lg lg:w-44 xl:w-48 dark:bg-primaryblack shadow-label dark:shadow-primarygray text-primaryblack dark:text-slate-200'>
                        <div className='px-4'><i class="fa-solid fa-magnifying-glass"></i></div>
                        <input onChange={handleSearch} type="text" placeholder="Search Destination" className="pr-4 bg-transparent outline-none w-28 lg:w-32 xl:w-36 placeholder:text-slate-300 dark:placeholder:text-slate-500 dark:text-slate-200" />
                    </div>
                </div>
                <div className='flex h-[380px] overflow-y-scroll no-scrollbar w-full rounded-xl'>
                    <div className='flex flex-wrap justify-end rounded-xl w-full gap-[3%] h-fit'>
                        {destinations && destinations.map((destination, index) => (
                            <button key={index} onClick={() => handleShowDetailDestination(destination.id)} onDragStart={handleDragStart} className='cursor-default cursor-scale lg:cursor-none w-full xs:w-[48.5%] sm:w-full md:w-[48.5%] mb-[1.5%] relative overflow-hidden bg-white dark:bg-primaryblack border border-white dark:border-primaryblack hover:border-primaryred dark:hover:border-primaryred text-primaryblack rounded-xl h-52 xl:h-64'>
                                <div className='flex text-[8px] lg:text-[9px] xl:text-[11px] items-center z-10 absolute bg-white dark:bg-primaryblack h-fit w-fit py-1 px-2 m-2 rounded-lg right-0'>
                                    <i className="mr-1 fa-solid fa-star text-primaryyellow"></i>
                                    <h1 className='text-primarygray dark:text-slate-400 pt-[1px]'>{destination.rating}</h1>
                                </div>
                                {destination.imageUrls[0].startsWith("https://") && (destination.imageUrls[0].includes(".jpg") || destination.imageUrls[0].includes(".png") || destination.imageUrls[0].includes("images")) ?
                                    <img src={destination.imageUrls[0]} className='object-cover relative w-full bg-slate-200 h-[76%] xl:h-[73%]'></img>
                                    : <Image src="/images/no-image.png" className='object-cover relative w-full h-[80%]' width={500} height={500} alt='Unknown Profile' />
                                }
                                <div className='flex relative justify-between font-medium items-center w-full h-[24%] xl:h-[27%] px-4'>
                                    <div className='flex flex-col w-4/6 gap-[3px] xl:gap-1 text-start'>
                                        <h1 className='capitalize dark:text-slate-200'>{destination.title}</h1>
                                        <div className='text-[8px] lg:text-[9px] xl:text-[11px] flex items-start gap-1 lg:gap-[6px] xl:gap-2'>
                                            <i class="fa-solid fa-location-dot mt-[1px] lg:mt-[2px] xl:mt-[3px] text-primaryred"></i>
                                            <h1 className='capitalize text-primarygray dark:text-slate-400'>{`${destination.city}, ${destination.province}`}</h1>
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-end w-2/6 gap-[3px] xl:gap-1'>
                                        <div className='relative flex w-fit'>
                                            <div className=' absolute z-10 w-full h-[2px] bg-primaryred rounded-full -rotate-6 top-[40%]'></div>
                                            <h1 className='relative text-primarygray dark:text-slate-400 text-[8px] lg:text-[9px] xl:text-[11px]'>{formatNumber(destination.price)}</h1>
                                        </div>
                                        <h1 className='text-primaryblue'>{`${formatNumber(destination.price_discount)}`}</h1>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DestinationSection