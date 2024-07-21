import React from 'react'
import useDelete from '@/Hooks/useDelete';
import toast from 'react-hot-toast';

const ModalConfirmDeleteBanner = ({ showDeleteBanner, setShowDeleteBanner, selectedBanner }) => {
    const { deleteData } = useDelete();

    const handleDeleteBanner = async (bannerId) => {
        const res = await deleteData(`delete-banner/${bannerId}`)
        if (res.status === 200) {
            setShowDeleteBanner(false);
            toast.success("Banner deleted");
        } else {
            toast.error("Failed to delete banner");
        }
    }

    return (
        <>
            <div className={`absolute z-20 w-full h-full opacity-40 bg-primaryblack ${showDeleteBanner === true ? '' : 'hidden'}`}></div>
            <div className={`${showDeleteBanner === true ? '' : 'hidden'} absolute z-30 flex items-center justify-center w-full h-full`}>
                <div className={`bg-white shadow-lg rounded-lg text-[13px] flex justify-center relative text-primaryblack h-fit w-fit`}>
                    <div className={`flex flex-col items-center justify-center w-full h-full p-5 gap-4`}>
                        <div className='flex flex-col items-center w-full'>
                            <i class="text-3xl text-primaryred fa-solid fa-triangle-exclamation"></i>
                            <h1 className='z-10 w-full p-1 font-medium text-center rounded-md'>Delete <b>{selectedBanner.name}</b> banner?</h1>
                        </div>
                        <div className='flex items-center justify-center gap-4'>
                            <button onClick={() => setShowDeleteBanner(false)} type="submit" className="hover:bg-slate-200 text-primaryblack text-[13px] py-[10px] px-8 rounded-lg font-medium">Keep it</button>
                            <button onClick={() => handleDeleteBanner(selectedBanner.id)} type="submit" className=" bg-primaryred hover:bg-redhover text-white text-[13px] py-[10px] px-8 rounded-lg font-medium">Yes, Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalConfirmDeleteBanner
