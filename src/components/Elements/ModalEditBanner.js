import React from 'react'

const ModalEditBanner = ({ showEditBanner, handleShowEditBanner }) => {
    return (
        <>
            <div className={`absolute z-20 w-full h-full opacity-40 bg-primaryblack ${showEditBanner === true ? '' : 'hidden'}`}></div>
            <div className={`${showEditBanner === true ? '' : 'hidden'} absolute z-30 flex items-center justify-center w-full h-full`}>
                <div className={`bg-white shadow-lg rounded-lg text-[13px] flex justify-center relative text-primaryblack h-fit w-[600px]`}>
                    <div className='absolute flex justify-end w-full p-2'>
                        <button onClick={handleShowEditBanner} className='w-8 h-8 text-xl rounded-lg hover:text-primaryred'><i class=" fa-solid fa-xmark"></i></button>
                    </div>
                    <form className={`flex flex-col items-center justify-center w-full h-full`}>
                        <h1 className='z-10 p-5 font-medium'>Edit Banner</h1>
                        <div className='flex flex-col items-start justify-center w-full gap-4 px-12 h-fit'>
                            <div className='w-full h-48 overflow-hidden rounded-lg'>
                                <img className='object-cover w-full h-full'></img>
                            </div>
                            <div class="bg-slate-200 text-slate-400 px-4 text-[13px] text-start rounded-lg w-full flex items-center overflow-hidden whitespace-nowrap">
                                <label htmlFor="profilePictureUrl" className="bg-slate-300 text-primaryblack w-fit cursor-pointer py-[10px] -ml-4 px-4 rounded-l-lg">Choose Banner</label>
                                <span className={`px-4 overflow-hidden text-ellipsis`}>No File Selected</span>
                            </div>
                            <input type="file" name="profilePictureUrl" id="profilePictureUrl" className="hidden" />
                            <input type="text" name="name" id="name" placeholder="Banner Name" className="bg-slate-200 placeholder:text-slate-400 text-primaryblack mb-2 py-[10px] px-4 text-[13px] rounded-lg w-full outline-none" />
                        </div>
                        <button type="submit" className=" bg-primaryblue hover:bg-bluehover text-white text-[13px] py-[10px] mt-4 mb-8 px-8 rounded-lg font-medium">Save</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ModalEditBanner
