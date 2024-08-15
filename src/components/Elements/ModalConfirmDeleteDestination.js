import React from 'react'
import useDelete from '@/Hooks/useDelete';
import toast from 'react-hot-toast';

const ModalConfirmDeleteDestination = ({ showDeleteDestination, setShowDeleteDestination, selectedDestination }) => {
    const { deleteData } = useDelete();

    const handleDeleteDestination = async (destinationId) => {
        const res = await deleteData(`delete-activity/${destinationId}`)
        if (res.status === 200) {
            setShowDeleteDestination(false);
            toast.success("Destination deleted");
        } else {
            toast.error("Failed to delete destination");
        }
    }

    return (
        <>
            <div className={`absolute z-20 w-full h-full opacity-40 bg-primaryblack dark:bg-primarygray dark:opacity-60 ${showDeleteDestination === true ? '' : 'hidden'}`}></div>
            <div className={`${showDeleteDestination === true ? '' : 'hidden'} absolute z-30 flex items-center justify-center w-full h-full`}>
                <div className={`bg-white dark:bg-primaryblack shadow-lg rounded-lg text-[13px] flex justify-center relative text-primaryblack dark:text-slate-200 h-fit w-fit`}>
                    <div className={`flex flex-col items-center justify-center w-full h-full p-5 gap-4`}>
                        <div className='flex flex-col items-center w-full'>
                            <i class="text-3xl text-primaryred fa-solid fa-triangle-exclamation"></i>
                            <h1 className='z-10 w-full p-1 font-medium text-center rounded-md'>Delete <b>{selectedDestination.title}</b> destination?</h1>
                        </div>
                        <div className='flex items-center justify-center gap-4'>
                            <button onClick={() => setShowDeleteDestination(false)} type="submit" className="cursor-default cursor-scale lg:cursor-none hover:bg-slate-200 dark:hover:bg-slate-700 text-primaryblack dark:text-slate-200 text-[13px] py-[10px] px-8 rounded-lg font-medium">Keep it</button>
                            <button onClick={() => handleDeleteDestination(selectedDestination.id)} type="submit" className="cursor-default cursor-scale lg:cursor-none bg-primaryred hover:bg-redhover text-white text-[13px] py-[10px] px-8 rounded-lg font-medium">Yes, Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalConfirmDeleteDestination
