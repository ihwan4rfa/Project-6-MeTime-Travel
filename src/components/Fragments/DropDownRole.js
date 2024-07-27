import React, { useState } from 'react';

const DropDownRole = ({ selectedRole, setSelectedRole, selectedRole2, setSelectedRole2 }) => {
    const [dropDownHidden, setDropDownHidden] = useState(true);

    const handleOptionChange = (option) => {
        setSelectedRole(option);
        setSelectedRole2(option);
        setDropDownHidden(!dropDownHidden);
    };

    const handleDropDownToggle = () => {
        setDropDownHidden(!dropDownHidden);
        selectedRole === '' ? setSelectedRole(selectedRole2) : setSelectedRole('');
    };

    return (
        <div className="flex relative text-[13px] w-full">
            <a onClick={handleDropDownToggle} className="flex justify-between w-full my-2 px-4 py-[10px] rounded-lg bg-slate-200 dark:bg-slate-700 cursor-pointer text-primaryblack dark:text-slate-200">
                <h1 className='capitalize'>{selectedRole ? `${selectedRole === 'admin' ? 'admin' : 'user'}` : 'Select Role'}</h1>
                <h1><i class={`fa-solid ${dropDownHidden ? 'fa-caret-down' : 'fa-caret-up'}`}></i></h1>
            </a>
            <div className={`absolute w-full z-10 mt-14 bg-slate-200 dark:bg-slate-700 shadow-dropdown text-primaryblack dark:text-slate-200 rounded-lg ${dropDownHidden ? 'hidden' : ''}`}>
                <div className="px-2">
                    <button
                        onClick={() => handleOptionChange('admin')} type="button" className={`flex capitalize items-center justify-between w-full px-4 py-1 my-2 rounded-md hover:bg-white dark:hover:bg-primaryblack ${selectedRole2 === 'admin' ? 'bg-white dark:bg-primaryblack' : ''}`}>
                        <h1>admin</h1>
                        <h1 className={'text-primaryblue'}><i class="fa-solid fa-user-plus"></i></h1>
                    </button>
                    <button
                        onClick={() => handleOptionChange('user')} type="button" className={`flex capitalize items-center justify-between w-full px-4 py-1 my-2 rounded-md hover:bg-white dark:hover:bg-primaryblack ${selectedRole2 === 'user' ? 'bg-white dark:bg-primaryblack' : ''}`}>
                        <h1>user</h1>
                        <h1 className='text-primaryred'><i class="fa-solid fa-user"></i></h1>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DropDownRole;