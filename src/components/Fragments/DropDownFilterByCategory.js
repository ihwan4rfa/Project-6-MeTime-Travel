import React, { useEffect, useState } from 'react';
import useGetData from '@/Hooks/useGetData';

const DropDownFilterByCategory = ({ setSelectedCategoryId, categoryAllSelected, setCategoryAllSelected, setDestinations }) => {
    const [selectedCategoryName, setSelectedCategoryName] = useState(null);
    const [dropDownHidden, setDropDownHidden] = useState(true);
    const [categories, setCategories] = useState([]);
    const { getData } = useGetData();

    useEffect(() => {
        getData("categories", (res) => setCategories(res.data.data));
    }, []);

    const handleOptionChange = (categoryId, categoryName) => {
        setDropDownHidden(!dropDownHidden);
        setSelectedCategoryId(categoryId);
        setSelectedCategoryName(categoryName);
        setCategoryAllSelected(false);
    };

    const handleDropDownToggle = () => {
        setDropDownHidden(!dropDownHidden);
    };

    const handleChangeAllCategory = () => {
        getData("activities", (res) => setDestinations(res.data.data));
        setDropDownHidden(!dropDownHidden);
        setCategoryAllSelected(true);
        setSelectedCategoryId(null);
        setSelectedCategoryName(null);
    }

    return (
        <div className="flex relative text-[13px] w-36">
            <a onClick={handleDropDownToggle} className="flex justify-between w-full px-4 py-2 bg-white rounded-lg cursor-pointer text-primaryblack">
                <h1>{selectedCategoryName ? selectedCategoryName : 'All Category'}</h1>
                <h1><i class={`fa-solid ${dropDownHidden ? 'fa-caret-down' : 'fa-caret-up'}`}></i></h1>
            </a>
            <div className={`absolute w-full z-10 mt-10 bg-white shadow-dropdown text-primaryblack rounded-lg ${dropDownHidden ? 'hidden' : ''}`}>
                <div className="px-2">
                    <button onClick={handleChangeAllCategory} type="button" className={`flex items-center justify-between w-full px-4 py-1 my-2 rounded-md hover:bg-slate-200 ${categoryAllSelected === true ? 'bg-slate-200' : ''}`}>
                        <h1 className='text-left'>All Category</h1>
                    </button>
                    {categories.map((category, index) => (
                        <button key={index} onClick={() => handleOptionChange(category.id, category.name)} type="button" className={`flex items-center justify-between w-full px-4 py-1 my-2 rounded-md hover:bg-slate-200 ${categoryAllSelected === false && selectedCategoryName === category.name ? 'bg-slate-200' : ''}`}>
                            <h1 className='text-left'>{category.name}</h1>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DropDownFilterByCategory;