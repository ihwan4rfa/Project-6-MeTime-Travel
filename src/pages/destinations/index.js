import Navbar from '@/components/Fragments/Navbar'
import React, { useEffect, useState } from 'react'
import useGetData from '@/Hooks/useGetData'
import Image from 'next/image'
import DropDownFilterByCategory from '@/components/Fragments/DropDownFilterByCategory'

const index = () => {
    const [destinations, setDestinations] = useState([]);
    const { getData } = useGetData();
    const [search, setSearch] = useState("");
    const dropDownUser = true;
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [categoryAllSelected, setCategoryAllSelected] = useState(true);

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
    }, []);

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
        <div className='flex relative w-full h-screen text-[13px] font-poppins text-primaryblack'>
            <Navbar />
            <div className='absolute z-0 bg-primaryyellow bg-opacity-10 rounded-full w-1/2 h-1/2 blur-3xl right-10 top-20'></div>
            <div className='absolute z-0 bg-primaryyellow bg-opacity-10 rounded-full w-1/2 h-1/2 blur-3xl left-10 bottom-0'></div>
            <div className='w-full relative px-36 pt-24'>
                <div className='flex flex-col w-full h-full gap-7'>
                    <div className='flex items-center justify-between h-14'>
                        <div className='flex flex-col'>
                            <h1 className='text-2xl font-bold tracking-tight font-volkhov'>Explore All Destination</h1>
                            <h1 className='text-2xl font-bold tracking-tight font-volkhov text-primaryred'>Find Yours!</h1>
                        </div>
                        <div className='flex items-center my-2 gap-4'>
                            <h1 className={`text-slate-400 ${search === "" && selectedCategoryId === null ? 'hidden' : ''}`}><b>{destinations.length}</b> {destinations.length > 1 ? 'destinations' : 'destination'} found</h1>
                            <div className='flex py-3 bg-white shadow-label rounded-lg text-primaryblack'>
                                <button className='px-4'><i class="fa-solid fa-magnifying-glass"></i></button>
                                <input onChange={handleSearch} type="text" placeholder="Search Destination" className="pr-4 bg-transparent outline-none placeholder:text-slate-300" />
                            </div>
                            <DropDownFilterByCategory dropDownUser={dropDownUser} selectedCategoryId={selectedCategoryId} setSelectedCategoryId={setSelectedCategoryId} categoryAllSelected={categoryAllSelected} setCategoryAllSelected={setCategoryAllSelected} setDestinations={setDestinations} />
                        </div>
                    </div>
                    <div className='flex flex-1 rounded-t-xl overflow-y-scroll no-scrollbar'>
                        <div className='flex flex-wrap h-fit w-full gap-[2%]'>
                            {destinations && destinations.map((destination, index) => (
                                <button key={index} className='w-[32%] mb-[1.5%] relative overflow-hidden bg-white text-primaryblack rounded-xl h-64'>
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
        </div>
    )
}

export default index