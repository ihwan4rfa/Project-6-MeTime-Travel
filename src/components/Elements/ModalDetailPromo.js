import React, { useState } from 'react'
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { setShowModal } from '@/redux/slice/showModalSlice';

const ModalDetailPromo = ({ showDetailPromo, setShowDetailPromo, selectedPromo, setSelectedPromo }) => {
    const [promoCopied, setPromoCopied] = useState(false);
    const dispatch = useDispatch();

    const handleCopy = (promoCode) => {
        navigator.clipboard.writeText(promoCode.toUpperCase());
        setPromoCopied(true);
        setTimeout(() => {
            setPromoCopied(false);
        }, 1000);
    }

    const handleCloseEditPromo = () => {
        setShowDetailPromo(false);
        dispatch(setShowModal(false));
        setSelectedPromo(null);
    }

    const formatNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        selectedPromo &&
        <>
            <div className={`absolute z-30 w-full h-full opacity-40 bg-primaryblack ${showDetailPromo === true ? '' : 'hidden'}`}></div>
            <div className={`${showDetailPromo === true ? '' : 'hidden'} absolute z-30 flex items-center justify-center w-full h-full`}>
                <div className={`bg-white shadow-lg rounded-lg text-[13px] flex justify-center relative text-primaryblack h-fit w-fit`}>
                    <div className='absolute flex justify-end w-full p-2'>
                        <button onClick={handleCloseEditPromo} className='w-8 h-8 text-xl rounded-lg hover:text-primaryred'><i class=" fa-solid fa-xmark"></i></button>
                    </div>
                    <div className={`flex flex-col items-center justify-center w-full h-full p-5`}>
                        <div className='flex flex-col items-start justify-center w-full gap-4 h-fit'>
                            <div className='flex w-full gap-4'>
                                {selectedPromo.imageUrl && (
                                    <div className='w-[300px] overflow-hidden rounded-lg h-[180px]'>
                                        {selectedPromo.imageUrl.startsWith("https://") && (selectedPromo.imageUrl.includes(".jpg") || selectedPromo.imageUrl.includes(".png") || selectedPromo.imageUrl.includes("images")) ?
                                            <img src={selectedPromo.imageUrl} className='object-cover w-full h-full'></img>
                                            : <Image src="/images/no-image.png" className='object-cover w-full h-full' width={500} height={500} alt='Unknown Profile' />
                                        }
                                    </div>
                                )}
                                <div className='flex flex-col w-[450px] gap-2'>
                                    <h1 className='text-2xl font-semibold capitalize'>{selectedPromo.title}</h1>
                                    <div className='flex justify-between w-full py-2 pl-3 pr-2 mb-2 rounded-lg bg-slate-100'>
                                        <div className='flex flex-col items-start justify-between'>
                                            <h1 className='text-2xl font-semibold text-primaryblue'>Rp{formatNumber(selectedPromo.promo_discount_price)}</h1>
                                            <h1 className='text-[11px]'>
                                                Spend at least <span className='font-semibold rounded-md text-primaryred '>
                                                    Rp{formatNumber(selectedPromo.minimum_claim_price)}
                                                </span> to get this promo
                                            </h1>
                                        </div>
                                        <div className='flex flex-col items-end justify-between'>
                                            <h1 className='text-[11px]'>Promo Code</h1>
                                            <div className='px-3 py-1 rounded-md cursor-pointer h-fit bg-primaryblue hover:bg-bluehover'>
                                                <button onClick={() => handleCopy(selectedPromo.promo_code)} className={`text-white ${promoCopied ? '' : 'uppercase'}`}><i class={`fa-solid mr-2 ${promoCopied ? 'fa-check' : 'fa-clone'}`}></i>{promoCopied ? 'Copied' : selectedPromo.promo_code}</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex w-auto gap-8 ml-3'>
                                        <h1 className='w-1/3 text-primarygray'>Description</h1>
                                        <h1 className='w-2/3'>{selectedPromo.description}</h1>
                                    </div>
                                    <div className='flex w-auto gap-8 ml-3'>
                                        <h1 className='w-1/3 text-primarygray'>Terms and condition</h1>
                                        <h1 className='w-2/3'>{selectedPromo.terms_condition}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalDetailPromo
