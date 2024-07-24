import Navbar from '@/components/Fragments/Navbar'
import React, { useEffect, useState } from 'react'
import useGetData from '@/Hooks/useGetData'
import Image from 'next/image'
import ModalDetailPromo from '@/components/Elements/ModalDetailPromo'
import { useDispatch } from 'react-redux';
import { setShowModal } from '@/redux/slice/showModalSlice';

const index = () => {
    const [promos, setPromos] = useState([]);
    const { getData } = useGetData();
    const [search, setSearch] = useState("");
    const [showDetailPromo, setShowDetailPromo] = useState(false);
    const [selectedPromo, setSelectedPromo] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        getData("promos", (res) => setPromos(res.data.data));
    }, []);

    const formatNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

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

    const handleShowDetailPromo = async (promoId) => {
        const getPromo = async () => {
            await getData(`promo/${promoId}`, (res) => {
                setSelectedPromo(res.data.data);
            })
        }

        try {
            await getPromo();
            setShowDetailPromo(true);
            dispatch(setShowModal(true));
        } catch (error) {
            console.log(error);
        }
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
                            <h1 className='text-2xl font-bold tracking-tight font-volkhov'>Special Promo for You</h1>
                            <h1 className='text-2xl font-bold tracking-tight font-volkhov text-primaryred'>Don't Miss Out!</h1>
                        </div>
                        <div className='flex items-center my-2'>
                            <h1 className={`mr-4 text-slate-400 ${search === "" ? 'hidden' : ''}`}><b>{promos.length}</b> {promos.length > 1 ? 'promos' : 'promo'} found</h1>
                            <div className='flex py-3 bg-white shadow-label rounded-lg text-primaryblack'>
                                <button className='px-4'><i class="fa-solid fa-magnifying-glass"></i></button>
                                <input onChange={handleSearch} type="text" placeholder="Search Promo" className="pr-4 bg-transparent outline-none placeholder:text-slate-300" />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-1 rounded-t-xl overflow-y-scroll no-scrollbar'>
                        <div className='flex flex-wrap h-fit w-full gap-[2%]'>
                            {promos.map((promo, index) => (
                                <button onClick={() => handleShowDetailPromo(promo.id)} key={index} className='w-[23.5%] mb-[1.5%] overflow-hidden bg-white border border-white hover:border-primaryred text-primaryblack rounded-xl h-56'>
                                    {promo.imageUrl.startsWith("https://") && (promo.imageUrl.includes(".jpg") || promo.imageUrl.includes(".png") || promo.imageUrl.includes("images")) ?
                                        <img src={promo.imageUrl} className='object-cover w-full bg-slate-200 h-[80%]'></img>
                                        : <Image src="/images/no-image.png" className='object-cover w-full h-[80%]' width={500} height={500} alt='Unknown Profile' />
                                    }
                                    <div className='flex justify-between font-medium items-center w-full h-[20%] px-4 py-3'>
                                        <h1 className='capitalize'>{promo.title}</h1>
                                        <h1 className='text-primaryblue'>Rp{formatNumber(promo.promo_discount_price)}</h1>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ModalDetailPromo showDetailPromo={showDetailPromo} setShowDetailPromo={setShowDetailPromo} selectedPromo={selectedPromo} setSelectedPromo={setSelectedPromo} />
        </div>
    )
}

export default index