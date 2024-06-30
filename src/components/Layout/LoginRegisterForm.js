import axios from "axios"
import { useState } from "react"
import useUpload from "../Hooks/useUpload";
import { useRouter } from "next/router"
import Dropdown from "../UI/DropDown";

const LoginRegisterForm = ({ onSubmit }) => {

    const router = useRouter();
    const [tokenRegister, setTokenRegister] = useState(null);
    const [errorRegister, setErrorRegister] = useState(null);
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);
    const [message, setMessage] = useState(null);
    const { upload } = useUpload();
    const [selectedOption2, setSelectedOption2] = useState('Admin');

    const handleUpload = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            setMessage(
                "File harus berupa gambar dengan format JPEG, PNG, GIF, BMP, atau TIFF"
            );
            setTimeout(() => {
                setMessage(null);
                e.target.value = null
            }, 3000)
            return false;
        }
        const formData = new FormData();
        formData.append("image", file);
        try {
            const res = await upload("upload-image", formData);
            setProfilePictureUrl(res.data.url);
            setMessage(null);
            return res.data.url;
        } catch (error) {
            setProfilePictureUrl(null);
            setMessage(
                "Failed to upload image, Maybe the image is too big, try another image"
            )
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            email: e.target.email.value,
            name: e.target.name.value,
            password: e.target.password.value,
            passwordRepeat: e.target.password.value,
            role: selectedOption2.toLowerCase(),
            profilePictureUrl: profilePictureUrl,
            phoneNumber: e.target.phoneNumber.value
        };

        for (const key in userData) {
            if (!userData[key]) {
                setMessage("Please input all fields");
                setTimeout(() => {
                    setMessage(null);
                }, 3000);
                return;
            }
        }

        onSubmit(userData);
    };

    const [token, setToken] = useState(null);
    const [errorLogin, setErrorLogin] = useState(null);

    const handleLogin = async () => {

    };

    const [btnClicked, setBtnClicked] = useState(false);
    const [loginClicked, setLoginClicked] = useState(true);
    const [registerClicked, setRegisterClicked] = useState(false);
    const toggleButton = () => {
        setBtnClicked(!btnClicked);
        setLoginClicked(!loginClicked);
        setRegisterClicked(!registerClicked);
        setErrorLogin(null);
        setErrorRegister(null);
        setTokenRegister(null);
        setSeePassword(false)
    }

    const [seePassword, setSeePassword] = useState(false);
    const [seeRepeatPassword, setSeeRepeatPassword] = useState(false);
    const toggleSeePassword = () => {
        setSeePassword(!seePassword)
    }
    const toggleSeeRepeatPassword = () => {
        setSeeRepeatPassword(!seeRepeatPassword)
    }

    return (
        <div className="flex items-center justify-center w-full h-screen bg-slate-100 font-poppins">
            <div className={`flex flex-col text-center bg-white rounded-[30px] translate-y-[4%] shadow-xl shadow-slate-300 relative overflow-hidden lg:w-[80%] md:w-2/3 w-3/4 max-w-full md:min-h-[400px] min-h-[550px] transition-all ease-in-out`}>
                <div className={`absolute top-0 md:h-full h-2/3 transition-all duration-500 ease-in-out md:w-2/3 w-full ${registerClicked ? 'z-20 md:translate-x-[50%] -translate-x-[0%]' : 'z-10 md:translate-x-[0%] translate-x-[100%]'}`}>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center h-full px-10 bg-white">
                        <h1 className="text-2xl font-semibold tracking-tight text-primaryblack">Create Account</h1>
                        <span className="mb-2 text-xs text-primaryblack">Use your details for registration</span>
                        <div className="flex w-full gap-4">
                            <input type="email" name="email" id="email" placeholder="Email" className="bg-slate-200 placeholder:text-slate-400 text-primaryblack my-2 py-[10px] px-4 text-[13px] rounded-lg w-full outline-none" />
                            <input type="text" name="name" id="name" placeholder="Full Name" className="bg-slate-200 placeholder:text-slate-400 text-primaryblack my-2 py-[10px] px-4 text-[13px] rounded-lg w-full outline-none" />
                        </div>
                        <div className="flex w-full gap-4">
                            <input type="text" name="phoneNumber" id="phone" placeholder="Phone Number" className="bg-slate-200 placeholder:text-slate-400 text-primaryblack my-2 py-[10px] px-4 text-[13px] rounded-lg w-full outline-none" />
                            <h1 class="bg-slate-200 text-slate-400 my-2 px-4 text-[13px] text-start rounded-lg w-full flex items-center overflow-hidden whitespace-nowrap">
                                <label htmlFor="profilePictureUrl" className="bg-slate-300 text-primaryblack w-fit cursor-pointer py-[10px] -ml-4 px-4 rounded-l-lg">Choose Profile</label>
                                <span className="px-4 overflow-hidden text-ellipsis">{profilePictureUrl === null ? 'No File Selected' : `${profilePictureUrl}`}</span>
                            </h1>
                            <input type="file" name="profilePictureUrl" id="profilePictureUrl" onChange={handleUpload} className="hidden" />
                        </div>
                        <div className="w-full">
                            <div className="flex gap-4">
                                <Dropdown selectedOption2={selectedOption2} setSelectedOption2={setSelectedOption2} />
                                <div className="flex bg-slate-200 my-2 py-[10px] px-4 text-[13px] rounded-lg w-full">
                                    <input type={seePassword ? 'text' : 'password'} name="password" id="password" placeholder="Password" className="w-full outline-none bg-slate-200 placeholder:text-slate-400 text-primaryblack" />
                                    <button type="button" onClick={toggleSeePassword}><i className={`text-slate-400 pl-3 fa-solid ${seePassword ? 'fa-eye' : 'fa-eye-slash'}`}></i></button>
                                </div>
                                <div className="flex bg-slate-200 my-2 py-[10px] px-4 text-[13px] rounded-lg w-full">
                                    <input type={seeRepeatPassword ? 'text' : 'password'} name="passwordRepeat" id="passwordRepeat" placeholder="Repeat Password" className="w-full outline-none bg-slate-200 placeholder:text-slate-400 text-primaryblack" />
                                    <button type="button" onClick={toggleSeeRepeatPassword}><i className={`text-slate-400 pl-3 fa-solid ${seeRepeatPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i></button>
                                </div>
                            </div>
                            <div className="flex gap-4 text-[10px]">
                                <p className="w-full"></p>
                                <p className="w-full px-4"></p>
                                <p className="w-full px-4 text-start text-primaryred"><i class="fa-solid mr-1 fa-circle-xmark"></i>Both passwords didn't match</p>
                            </div>
                        </div>
                        {tokenRegister ? <h1 className="text-[12px] text-teal-500"><i className="mr-1 fa-solid fa-circle-check"></i>registration success!</h1> : ""}
                        {errorRegister ? <h1 className="text-[12px] text-red-500 text-center"><i className="mr-1 fa-solid fa-triangle-exclamation"></i>{errorRegister}</h1> : ""}
                        <button type="submit" className="bg-primaryblue hover:bg-bluehover text-white text-[12px] py-[10px] px-8 rounded-lg font-semibold tracking-tight uppercase mt-3">Register</button>
                    </form>
                </div>
                <div className={`absolute top-0 md:h-full h-2/3 transition-all duration-500 ease-in-out md:w-1/2 w-full ${loginClicked ? 'z-20 translate-x-[0%]' : 'z-10 md:translate-x-[100%] -translate-x-[100%]'}`}>
                    <div className="flex flex-col items-center justify-center h-full px-10 bg-white">
                        <h1 className="text-2xl font-semibold tracking-tight text-primaryblack">Log In</h1>
                        <span className="mb-2 text-xs text-primaryblack">Enter your email and password</span>
                        <input className="bg-slate-200 placeholder:text-slate-400 text-primaryblack my-2 py-[10px] px-4 text-[13px] rounded-lg w-full outline-none" type="text" placeholder="Email" />
                        <div className="flex bg-slate-200 my-2 py-[10px] px-4 text-[13px] rounded-lg w-full">
                            <input className="w-full outline-none bg-slate-200 placeholder:text-slate-400 text-primaryblack" type={seePassword ? 'text' : 'password'} placeholder="Password" />
                            <button onClick={toggleSeePassword}><i className={`text-slate-400  fa-solid ${seePassword ? 'fa-eye' : 'fa-eye-slash'}`}></i></button>
                        </div>
                        {token ? <h1 className="text-[12px] text-teal-500"><i className="mr-1 fa-solid fa-circle-check"></i>log In success!</h1> : ""}
                        {errorLogin ? <h1 className="text-[12px] text-red-500 text-center"><i className="mr-1 fa-solid fa-triangle-exclamation"></i>Log In failed! {errorLogin}</h1> : ""}
                        <button onClick={handleLogin} className="bg-primaryred hover:bg-redhover text-white text-[12px] py-[10px] px-8 rounded-lg font-semibold tracking-tight uppercase mt-3">Log In</button>
                    </div>
                </div>
                <div className={`absolute md:top-0 top-1/2 ${loginClicked ? 'md:w-1/2 md:left-1/2' : 'md:w-1/3 md:left-1/3'}  left-0 w-full md:h-full h-1/3 overflow-hidden transition-all duration-500 ease-in-out z-30 md:translate-y-[0%] translate-y-[50%] rounded-t-[50px] ${btnClicked ? 'md:-translate-x-[100%] md:rounded-r-[100px] md:rounded-tl-[0px] rounded-r-[0px]' : 'md:translate-x-[0%] md:rounded-l-[100px] md:rounded-tr-[0px] rounded-l-[0px]'}`}>
                    <div className={`bg-primaryblack h-full text-white relative -left-[100%] w-[200%] transition-all duration-500 ${btnClicked ? 'translate-x-[50%]' : 'translate-x-[0%]'}`}>
                        <div className={`absolute w-1/2 h-full flex flex-col items-center justify-center px-[30px] text-center top-0 transition-all duration-500 ease-in-out translate-x-[0%]`}>
                            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">Welcome Back!</h1>
                            <p className="md:text-sm text-xs md:my-5 my-1 mx-[25px]">Log in with email and password to start your travel adventure!</p>
                            <button onClick={toggleButton} className="text-white md:text-[12px] text-[10px] md:py-[10px] py-[8px] px-8 rounded-lg font-semibold tracking-tight uppercase mt-3 border hover:bg-white hover:text-primaryred">Log In</button>
                        </div>
                        <div className={`absolute w-1/2 h-full flex flex-col items-center justify-center px-[30px] text-center top-0 transition-all duration-500 ease-in-out translate-x-[100%]`}>
                            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">New here?</h1>
                            <p className="md:text-sm text-xs md:my-5 my-1 md:mx-[80px] mx-[25px]">Register now and connect with fellow travelers to explore new horizons!</p>
                            <button onClick={toggleButton} className="text-white md:text-[12px] text-[10px] md:py-[10px] py-[8px] px-8 rounded-lg font-semibold tracking-tight uppercase mt-3 border hover:bg-white hover:text-primaryblue">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginRegisterForm;