import React, { useEffect, useState } from 'react';
import useGetData from '@/Hooks/useGetData';

const DropDownFilterByCategory = ({ selectedCategoryId, setSelectedCategoryId, categoryAllSelected, setCategoryAllSelected, setDestinations, dropDownUser }) => {
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
        setDropDownHidden(!dropDownHidden);
        setCategoryAllSelected(true);
        setSelectedCategoryId(null);
        setSelectedCategoryName(null);
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
    }

    return (
        <div className="flex z-20 relative text-[10px] lg:text-[11px] xl:text-[13px] w-28 lg:w-32 xl:w-36">
            <button type='button' onClick={handleDropDownToggle} className={`${dropDownUser === true ? 'py-3 shadow-label dark:shadow-primarygray' : 'py-2'} cursor-default cursor-scale lg:cursor-none flex justify-between w-full px-4 bg-white dark:bg-primaryblack rounded-lg text-primaryblack`}>
                <h1 className='capitalize dark:text-slate-200'>{selectedCategoryName ? selectedCategoryName : 'All Category'}</h1>
                <h1><i class={`fa-solid dark:text-slate-200 ${dropDownHidden ? 'fa-caret-down' : 'fa-caret-up'}`}></i></h1>
            </button>
            <div className={`${dropDownUser === true ? 'mt-11 xl:mt-12' : 'mt-10'} absolute w-full z-10 h-fit max-h-[166px] overflow-y-scroll no-scrollbar bg-white dark:bg-primaryblack shadow-dropdown dark:shadow-primarygray text-primaryblack rounded-lg ${dropDownHidden ? 'hidden' : ''}`}>
                <div className="px-2">
                    <button onClick={handleChangeAllCategory} type="button" className={`cursor-default cursor-scale lg:cursor-none flex items-center justify-between w-full px-4 py-1 my-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 ${categoryAllSelected === true ? 'bg-slate-200 dark:bg-slate-700' : ''}`}>
                        <h1 className='text-left dark:text-slate-200'>All Category</h1>
                    </button>
                    {categories.map((category, index) => (
                        <button key={index} onClick={() => handleOptionChange(category.id, category.name)} type="button" className={`cursor-default cursor-scale lg:cursor-none flex items-center justify-between w-full px-4 py-1 my-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 ${categoryAllSelected === false && selectedCategoryName === category.name ? 'bg-slate-200 dark:bg-slate-700' : ''}`}>
                            <h1 className='text-left capitalize dark:text-slate-200'>{category.name}</h1>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DropDownFilterByCategory;