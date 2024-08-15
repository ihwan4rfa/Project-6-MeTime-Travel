import React, { useEffect, useState } from 'react';
import useGetData from '@/Hooks/useGetData';

const DropDownCategory = (props) => {
    const {
        dropDownHidden,
        setDropDownHidden,
        setSelectedCategoryId,
        destinationCategoryName,
        setDestinationCategoryName,
        selectedCategoryName,
        setSelectedCategoryName,
        showEditDestination,
        destinationCategoryId } = props
    const [categories, setCategories] = useState([]);
    const { getData } = useGetData();

    useEffect(() => {
        getData("categories", (res) => setCategories(res.data.data));
    }, []);

    useEffect(() => {
        if (destinationCategoryId === undefined) {
            setDestinationCategoryName(null);
        } else {
            const category = categories.find(category => category.id === destinationCategoryId);
            if (category) {
                setDestinationCategoryName(category.name);
            } else {
                setDestinationCategoryName(null);
            }
        }
    }, [showEditDestination]);

    const handleOptionChange = (categoryId, categoryName) => {
        setSelectedCategoryId(categoryId);
        setSelectedCategoryName(categoryName);
        setDestinationCategoryName(null);
        setDropDownHidden(!dropDownHidden);
    };

    const handleDropDownToggle = () => {
        setDropDownHidden(!dropDownHidden);
    };

    return (
        <div className="flex relative text-[13px] w-2/6">
            <button type='button' onClick={handleDropDownToggle} className="cursor-default cursor-scale lg:cursor-none flex justify-between w-full px-4 py-[10px] rounded-lg bg-slate-200 dark:bg-slate-700 text-primaryblack dark:text-slate-200">
                <h1 className='capitalize dark:text-slate-200'>{selectedCategoryName ? selectedCategoryName : (destinationCategoryName ? destinationCategoryName : 'Category')}</h1>
                <h1><i class={`fa-solid ${dropDownHidden ? 'fa-caret-down' : 'fa-caret-up'}`}></i></h1>
            </button>
            <div className={`absolute w-full z-10 mt-11 bg-slate-200 dark:bg-slate-700 h-fit max-h-[166px] overflow-y-scroll no-scrollbar shadow-dropdown dark:shadow-slate-600 text-primaryblack rounded-lg ${dropDownHidden ? 'hidden' : ''}`}>
                <div className="px-2">
                    {categories.map((category, index) => (
                        <button key={index} onClick={() => handleOptionChange(category.id, category.name)} type="button" className={`cursor-default cursor-scale lg:cursor-none flex items-center justify-between w-full px-4 py-1 my-2 rounded-md hover:bg-white dark:hover:bg-primaryblack ${selectedCategoryName === category.name ? 'bg-white dark:bg-primaryblack' : (destinationCategoryName === category.name ? 'bg-white dark:bg-primaryblack' : '')}`}>
                            <h1 className='text-left capitalize dark:text-slate-200'>{category.name}</h1>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DropDownCategory;