import React, { useState } from 'react';

const Dropdown = ({ selectedRole, setSelectedRole, selectedRole2, setSelectedRole2 }) => {
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
            <a onClick={handleDropDownToggle} className="flex justify-between w-full my-2 px-4 py-[10px] rounded-lg bg-slate-200 cursor-pointer text-primaryblack">
                <h1>{selectedRole ? `${selectedRole === 'Admin' ? 'Admin' : 'User'}` : 'Select Role'}</h1>
                <h1><i class="fa-solid fa-caret-down"></i></h1>
            </a>
            <div className={`absolute w-full z-10 mt-14 bg-slate-200 text-primaryblack rounded-lg ${dropDownHidden ? 'hidden' : ''}`}>
                <div className="px-2">
                    <button
                        onClick={() => handleOptionChange('Admin')} type="button" className={`flex items-center justify-between w-full px-4 py-1 my-2 rounded-md hover:bg-white ${selectedRole2 === 'Admin' ? 'bg-white' : ''}`}>
                        <h1>Admin</h1>
                        <h1 className={'text-[10px] text-primaryblue'}><i class="fa-solid fa-user-plus"></i></h1>
                    </button>
                    <button
                        onClick={() => handleOptionChange('User')} type="button" className={`flex items-center justify-between w-full px-4 py-1 my-2 rounded-md hover:bg-white ${selectedRole2 === 'User' ? 'bg-white' : ''}`}>
                        <h1>User</h1>
                        <h1 className='text-[10px] text-primaryred'><i class="fa-solid fa-user"></i></h1>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;