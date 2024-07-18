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
            <a onClick={handleDropDownToggle} className="flex justify-between w-full px-4 py-[10px] rounded-lg bg-slate-200 cursor-pointer text-primaryblack">
                <h1>{selectedCategoryName ? selectedCategoryName : destinationCategoryName}</h1>
                <h1><i class={`fa-solid ${dropDownHidden ? 'fa-caret-down' : 'fa-caret-up'}`}></i></h1>
            </a>
            <div className={`absolute w-full z-10 mt-14 bg-slate-200 shadow-md text-primaryblack rounded-lg ${dropDownHidden ? 'hidden' : ''}`}>
                <div className="px-2">
                    {categories.map((category, index) => (
                        <button key={index} onClick={() => handleOptionChange(category.id, category.name)} type="button" className={`flex items-center justify-between w-full px-4 py-1 my-2 rounded-md hover:bg-white ${selectedCategoryName === category.name ? 'bg-white' : (destinationCategoryName === category.name ? 'bg-white' : '')}`}>
                            <h1>{category.name}</h1>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DropDownCategory;