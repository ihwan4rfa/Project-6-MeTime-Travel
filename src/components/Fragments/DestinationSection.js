import React, { useState, useEffect } from 'react'
import useGetData from '@/Hooks/useGetData'
import Image from 'next/image';
import { useRouter } from 'next/router';

const DestinationSection = () => {
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

    return (
        <div className='relative z-10 flex w-full h-fit'>
            <div className='absolute z-0 bg-primaryyellow bg-opacity-10 rounded-full w-[550px] h-[550px] blur-3xl -top-10 -right-20'></div>
            <div className='relative flex flex-col items-start justify-start w-1/3 h-full'>
                <div className='mb-4'>
                    <h1 className='w-full text-3xl font-bold leading-tight tracking-tight font-volkhov'>
                        Discover Your<br />Favorite Destination
                    </h1>
                    <h1 className='overflow-hidden text-2xl font-bold tracking-tight whitespace-nowrap animate-typing text-primaryred font-volkhov'>Find Yours Today!</h1>
                </div>
                <h1 className='font-medium text-center text-primaryblack'>Category <i class="text-primaryred fa-solid fa-chevron-right mx-2 text-[11px]"></i> {selectedCategoryName ? selectedCategoryName : 'All'}</h1>
                <div className='flex w-full pl-2 pr-12 my-6 overflow-y-scroll h-52 no-scrollbar'>
                    <div className='flex flex-wrap gap-4 mb-4 w-fit h-fit'>
                        <div onClick={handleChangeAllCategory} className='flex items-center p-2 font-medium bg-white cursor-pointer shadow-label hover:shadow-hoverlabel hover:scale-103 rounded-xl'>
                            <div className='w-12 h-12 overflow-hidden rounded-lg'>
                                <Image src="/images/all-category.jpg" className='object-cover w-full h-full' width={200} height={200} alt='All Category' />
                            </div>
                            <h1 className='px-2'>All</h1>
                        </div>
                        {categories && categories.map((category, index) => (
                            <div key={index} onClick={() => handleOptionChange(category.id, category.name)} className='flex items-center p-2 font-medium bg-white cursor-pointer shadow-label hover:shadow-hoverlabel hover:scale-103 rounded-xl'>
                                <div className='w-12 h-12 overflow-hidden rounded-lg'>
                                    <img src={category.imageUrl} className='object-cover w-full h-full'></img>
                                </div>
                                <h1 className='px-2'>{category.name}</h1>
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={() => router.push("/destinations")} type="button" className="px-5 py-3 mt-2 font-medium text-white rounded-lg w-fit bg-primaryyellow hover:bg-yellowhover">
                    Explore All
                </button>
            </div>
            <div className='relative flex flex-col items-end w-2/3 h-full gap-6 pt-7'>
                <div className="flex items-end justify-between w-full">
                    <h1 className={`text-slate-400 ${search === "" && selectedCategoryId === null ? 'invisible' : 'visible'}`}><b>{destinations && destinations.length}</b> {destinations && destinations.length > 1 ? 'destinations' : 'destination'} found</h1>
                    <div className='flex py-3 bg-white rounded-lg shadow-label text-primaryblack'>
                        <button className='px-4'><i class="fa-solid fa-magnifying-glass"></i></button>
                        <input onChange={handleSearch} type="text" placeholder="Search Destination" className="pr-4 bg-transparent outline-none placeholder:text-slate-300" />
                    </div>
                </div>
                <div className='flex h-[380px] overflow-y-scroll no-scrollbar w-full rounded-xl'>
                    <div className='flex flex-wrap justify-end rounded-xl w-full gap-[3%]'>
                        {destinations && destinations.map((destination, index) => (
                            <button key={index} onDragStart={handleDragStart} className='w-[48.5%] mb-[1.5%] relative overflow-hidden bg-white text-primaryblack rounded-xl h-64'>
                                <div className='flex text-[11px] items-center z-10 absolute bg-white h-fit w-fit py-1 px-2 m-2 rounded-lg right-0'>
                                    <i className="fa-solid fa-star text-primaryyellow mr-1"></i>
                                    <h1 className='text-primarygray pt-[1px]'>{destination.rating}</h1>
                                </div>
                                {destination.imageUrls[0].startsWith("https://") && (destination.imageUrls[0].includes(".jpg") || destination.imageUrls[0].includes(".png") || destination.imageUrls[0].includes("images")) ?
                                    <img src={destination.imageUrls[0]} className='object-cover relative w-full bg-slate-200 h-[73%]'></img>
                                    : <Image src="/images/no-image.png" className='object-cover relative w-full h-[80%]' width={500} height={500} alt='Unknown Profile' />
                                }
                                <div className='flex relative justify-between font-medium items-center w-full h-[27%] px-4'>
                                    <div className='flex flex-col w-4/6 gap-1 text-start'>
                                        <h1>{destination.title}</h1>
                                        <div className='text-[11px] flex items-center gap-2'>
                                            <i class="fa-solid fa-location-dot text-primaryred"></i>
                                            <h1 className='text-primarygray'>{`${destination.city}, ${destination.province}`}</h1>
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-end w-2/6 gap-1'>
                                        <div className='relative flex w-fit'>
                                            <div className='absolute z-10 w-full h-[2px] bg-primaryred rounded-full -rotate-6 top-[40%]'></div>
                                            <h1 className='relative text-primarygray text-[11px]'>{destination.price}</h1>
                                        </div>
                                        <h1 className='text-primaryblue'>{`${destination.price_discount}`}</h1>
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