import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import useUpload from '@/Hooks/useUpload';
import useUpdate from '@/Hooks/useUpdate';

const ModalEditCategory = ({ showEditCategory, setShowEditCategory, selectedCategory }) => {

    const [categoryImageUrl, setCategoryImageUrl] = useState(null);
    const [fileName, setFileName] = useState(null);
    const { upload } = useUpload();
    const { update } = useUpdate();
    const formRef = useRef(null);

    const handleUpload = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];

        if (!file) {
            return;
        } else if (!file.type.startsWith("image/")) {
            setCategoryImageUrl(null);
            setFileName(null);
            toast.error("The file must be an image in \n JPEG, PNG, GIF, BMP, or TIFF format.");
            return false;
        }
        const formData = new FormData();
        formData.append("image", file);
        try {
            const res = await upload("upload-image", formData);
            setCategoryImageUrl(res.data.url);
            setFileName(file.name);
            toast.success("Image uploaded");
            return res.data.url;
        } catch (error) {
            setCategoryImageUrl(null);
            setFileName(null);
            toast.error("Failed to upload image. \n Maybe the image is too big. \n Try another image.");
        }
    };

    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        const categoryData = {
            name: e.target.name.value,
            imageUrl: categoryImageUrl || selectedCategory.imageUrl
        };

        const res = await update(`update-category/${selectedCategory.id}`, categoryData);
        if (res.status === 200) {
            toast.success(res.data.message);
            setShowEditCategory(false);
            e.target.reset();
            setCategoryImageUrl(null);
        } else {
            toast.error(res.response.data.message);
        }
    }

    const handleCloseEditCategory = () => {
        setShowEditCategory(false);
        formRef.current.reset();
        setCategoryImageUrl(null);
    }

    return (
        <>
            <div className={`absolute z-20 w-full h-full opacity-40 bg-primaryblack ${showEditCategory === true ? '' : 'hidden'}`}></div>
            <div className={`${showEditCategory === true ? '' : 'hidden'} absolute z-30 flex items-center justify-center w-full h-full`}>
                <div className={`bg-white shadow-lg rounded-lg text-[13px] flex justify-center relative text-primaryblack h-fit w-[600px]`}>
                    <div className='absolute flex justify-end w-full p-2'>
                        <button onClick={handleCloseEditCategory} className='w-8 h-8 text-xl rounded-lg hover:text-primaryred'><i class=" fa-solid fa-xmark"></i></button>
                    </div>
                    <form ref={formRef} onSubmit={handleUpdateCategory} className={`flex flex-col items-center justify-center w-full h-full p-5`}>
                        <h1 className='z-10 pb-4 font-medium'>Edit Category</h1>
                        <div className='flex flex-col items-start justify-center w-full gap-4 h-fit'>
                            {selectedCategory.imageUrl && (
                                <div className='w-full h-48 overflow-hidden rounded-lg'>
                                    <img src={categoryImageUrl === null ? selectedCategory.imageUrl : categoryImageUrl} className='object-cover w-full h-full'></img>
                                </div>
                            )}
                            <div class="bg-slate-200 text-slate-400 px-4 text-[13px] text-start rounded-lg w-full flex items-center overflow-hidden whitespace-nowrap">
                                <label htmlFor="categoryImageUrl" className="bg-slate-300 text-primaryblack w-fit cursor-pointer py-[10px] -ml-4 px-4 rounded-l-lg">Choose File</label>
                                <span className={`px-4 overflow-hidden text-ellipsis ${categoryImageUrl ? 'text-primaryblack' : ''}`}>{categoryImageUrl === null ? 'No File Selected' : `${fileName}`}</span>
                            </div>
                            <input onChange={handleUpload} type="file" name="categoryImageUrl" id="categoryImageUrl" className="hidden" />
                            <input defaultValue={selectedCategory.name} type="text" name="name" id="name" placeholder="Category Name" className="bg-slate-200 placeholder:text-slate-400 text-primaryblack py-[10px] px-4 text-[13px] rounded-lg w-full outline-none" />
                        </div>
                        <button type="submit" className=" bg-primaryblue hover:bg-bluehover text-white text-[13px] py-[10px] mt-4 px-8 rounded-lg font-medium">Save</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ModalEditCategory