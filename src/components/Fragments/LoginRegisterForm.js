import { useState, useEffect } from "react"
import useUpload from "../../Hooks/useUpload";
import Dropdown from "../Elements/DropDown";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slice/userLoggedSlice";
import { useRouter } from "next/router";

const LoginRegisterForm = ({ onSubmitRegister, onSubmitLogin }) => {

    // Resgister
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);
    const [fileName, setFileName] = useState(null);
    const { upload } = useUpload();
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedRole2, setSelectedRole2] = useState('');

    const handleUpload = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];

        if (!file) {
            return;
        } else if (!file.type.startsWith("image/")) {
            setProfilePictureUrl(null);
            setFileName(null);
            toast.error("The file must be an image in \n JPEG, PNG, GIF, BMP, or TIFF format.");
            return false;
        }
        const formData = new FormData();
        formData.append("image", file);
        try {
            const res = await upload("upload-image", formData);
            setProfilePictureUrl(res.data.url);
            setFileName(file.name);
            toast.success("Image uploaded");
            return res.data.url;
        } catch (error) {
            setProfilePictureUrl(null);
            setFileName(null);
            toast.error("Failed to upload image. \n Maybe the image is too big. \n Try another image.");
        }
    };

    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleChangePasswordRepeat = (e) => {
        setPasswordRepeat(e.target.value);
    }

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        const userData = {
            email: e.target.email.value,
            name: e.target.name.value,
            password: e.target.password.value,
            passwordRepeat: e.target.password.value,
            role: selectedRole2,
            profilePictureUrl: profilePictureUrl,
            phoneNumber: e.target.phoneNumber.value
        };

        for (const key in userData) {
            if (!userData[key]) {
                toast.error("Please input all fields.");
                return;
            }
        }

        if (password === passwordRepeat) {
            const res = await onSubmitRegister(userData);
            if (res?.status === 200) {
                toast.success("Registration success");
                setTimeout(() => {
                    toggleButton();
                    e.target.reset();
                    setProfilePictureUrl(null);
                    setPassword('');
                    setPasswordRepeat('');
                    setSelectedRole('');
                    setSelectedRole2('');
                }, 3000);
            } else {
                toast.error("Registration failed. \n This email is already registered. \n Try another email or log in.");
            }
        } else {
            toast.error("Please check both passwords \n and make sure they match.");
            return;
        }
    };

    const [seePassword, setSeePassword] = useState(false);
    const [seeRepeatPassword, setSeeRepeatPassword] = useState(false);
    const [btnClicked, setBtnClicked] = useState(false);
    const [loginClicked, setLoginClicked] = useState(true);
    const [registerClicked, setRegisterClicked] = useState(false);
    const toggleButton = () => {
        setBtnClicked(!btnClicked);
        setLoginClicked(!loginClicked);
        setRegisterClicked(!registerClicked);
        setSeePassword(false);
        setSeeRepeatPassword(false);
    }
    const toggleSeePassword = () => {
        setSeePassword(!seePassword)
    }
    const toggleSeeRepeatPassword = () => {
        setSeeRepeatPassword(!seeRepeatPassword)
    }

    // Login
    const { userLog } = useAuth();
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        const userData = {
            email: e.target.emailLogin.value,
            password: e.target.passwordLogin.value
        };

        const res = await onSubmitLogin(userData);
        if (res?.status === 200) {
            toast.success("Login success");
            setTimeout(() => {
                getUserLogged();
                if (res.data.data.role === 'admin') {
                    router.push('/dashboard/users');
                } else {
                    router.push('/');
                }
            }, 1500);
        } else {
            toast.error("Login failed. Please try again.");
        }
    };

    const getUserLogged = () => {
        const token = localStorage.getItem("token");
        token && userLog("user", (res) => dispatch(setUser(res)));
    };

    return (
        <div className="flex items-center justify-center w-full h-screen bg-slate-100 font-poppins">
            <div className={`flex flex-col text-center bg-white rounded-[30px] translate-y-[4%] shadow-xl relative overflow-hidden lg:w-[80%] md:w-2/3 w-3/4 max-w-full md:min-h-[400px] min-h-[550px] transition-all ease-in-out`}>
                <div className={`absolute top-0 md:h-full h-2/3 transition-all duration-500 ease-in-out md:w-2/3 w-full ${registerClicked ? 'z-20 md:translate-x-[50%] -translate-x-[0%]' : 'z-10 md:translate-x-[0%] translate-x-[100%]'}`}>
                    <form onSubmit={handleSubmitRegister} className="flex flex-col items-center justify-center h-full px-10 bg-white">
                        <h1 className="text-2xl font-semibold text-primaryblack">Create Account</h1>
                        <span className="mb-2 text-[13px] text-primaryblack">Use your details for registration</span>
                        <div className="flex w-full gap-4">
                            <input type="email" name="email" id="email" placeholder="Email" className="bg-slate-200 placeholder:text-slate-400 text-primaryblack my-2 py-[10px] px-4 text-[13px] rounded-lg w-full outline-none" />
                            <input type="text" name="name" id="name" placeholder="Full Name" className="bg-slate-200 placeholder:text-slate-400 text-primaryblack my-2 py-[10px] px-4 text-[13px] rounded-lg w-full outline-none" />
                        </div>
                        <div className="w-full">
                            <div className="relative flex gap-4">
                                <input type="number" name="phoneNumber" id="phone" placeholder="Phone Number" className="bg-slate-200 placeholder:text-slate-400 text-primaryblack my-2 py-[10px] px-4 text-[13px] rounded-lg w-full outline-none" />
                                <div class="bg-slate-200 text-slate-400 my-2 px-4 text-[13px] text-start rounded-lg w-full flex items-center overflow-hidden whitespace-nowrap">
                                    <label htmlFor="profilePictureUrl" className="bg-slate-300 text-primaryblack w-fit cursor-pointer py-[10px] -ml-4 px-4 rounded-l-lg">Choose Profile</label>
                                    <span className={`px-4 overflow-hidden text-ellipsis ${profilePictureUrl ? 'text-primaryblack' : ''}`}>{profilePictureUrl === null ? 'No File Selected' : `${fileName}`}</span>
                                </div>
                                <input type="file" name="profilePictureUrl" id="profilePictureUrl" onChange={handleUpload} className="hidden" />
                            </div>
                        </div>
                        <div className="relative w-full">
                            <div className="flex gap-4">
                                <Dropdown selectedRole={selectedRole} setSelectedRole={setSelectedRole} selectedRole2={selectedRole2} setSelectedRole2={setSelectedRole2} />
                                <div className="flex bg-slate-200 my-2 py-[10px] px-4 text-[13px] rounded-lg w-full">
                                    <input type={seePassword ? 'text' : 'password'} name="password" id="password" placeholder="Password" value={password} onChange={handleChangePassword} className="w-full outline-none bg-slate-200 placeholder:text-slate-400 text-primaryblack" />
                                    <button type="button" onClick={toggleSeePassword}><i className={`text-slate-400 pl-3 fa-solid ${seePassword ? 'fa-eye' : 'fa-eye-slash'}`}></i></button>
                                </div>
                                <div className="flex bg-slate-200 my-2 py-[10px] px-4 text-[13px] rounded-lg w-full">
                                    <input type={seeRepeatPassword ? 'text' : 'password'} name="passwordRepeat" id="passwordRepeat" placeholder="Repeat Password" value={passwordRepeat} onChange={handleChangePasswordRepeat} className="w-full outline-none bg-slate-200 placeholder:text-slate-400 text-primaryblack" />
                                    <button type="button" onClick={toggleSeeRepeatPassword}><i className={`text-slate-400 pl-3 fa-solid ${seeRepeatPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i></button>
                                </div>
                            </div>
                            <p className={`absolute text-[11px] w-full px-4 text-end ${passwordRepeat === '' ? 'invisible' : 'visible'} ${password === passwordRepeat ? 'text-primarygreen' : 'text-primaryred'}`}><i class={`fa-solid mr-1 ${password === passwordRepeat ? 'fa-circle-check' : 'fa-circle-xmark'}`}></i>{password === passwordRepeat ? "Passwords match" : "Passwords didn't match"}</p>
                        </div>
                        <button type="submit" className="bg-primaryblue hover:bg-bluehover text-white text-[13px] py-[10px] mt-4 px-8 rounded-lg font-medium uppercase">Register</button>
                    </form>
                    <div className={`text-[11px] text-left ${loginClicked ? 'invisible' : ''}`}>
                        <Toaster
                            position="top-right"
                            toastOptions={{
                                duration: 3000,
                                success: {
                                    style: {
                                        background: '#10b981',
                                        color: 'white'
                                    },
                                    iconTheme: {
                                        primary: 'white',
                                        secondary: '#10b981'
                                    }
                                },
                                error: {
                                    style: {
                                        background: '#DF6951',
                                        color: 'white',
                                    },
                                    iconTheme: {
                                        primary: 'white',
                                        secondary: '#DF6951'
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
                <div className={`bg-red-500 absolute top-0 md:h-full h-2/3 transition-all duration-500 ease-in-out md:w-1/2 w-full ${loginClicked ? 'z-20 translate-x-[0%]' : 'z-10 md:translate-x-[100%] -translate-x-[100%]'}`}>
                    <form onSubmit={handleSubmitLogin} className="flex flex-col items-center justify-center h-full px-10 bg-white">
                        <h1 className="text-2xl font-semibold text-primaryblack">Log In</h1>
                        <span className="mb-2 text-[13px] text-primaryblack">Enter your email and password</span>
                        <input name="emailLogin" id="emailLogin" type="email" placeholder="Email" className="bg-slate-200 placeholder:text-slate-400 text-primaryblack my-2 py-[10px] px-4 text-[13px] rounded-lg w-full outline-none" />
                        <div className="flex bg-slate-200 my-2 py-[10px] px-4 text-[13px] rounded-lg w-full">
                            <input name="passwordLogin" id="passwordLogin" type={seePassword ? 'text' : 'password'} placeholder="Password" className="w-full outline-none bg-slate-200 placeholder:text-slate-400 text-primaryblack" />
                            <button type="button" onClick={toggleSeePassword}><i className={`text-slate-400  fa-solid ${seePassword ? 'fa-eye' : 'fa-eye-slash'}`}></i></button>
                        </div>
                        <button className="bg-primaryred hover:bg-redhover text-white text-[13px] py-[10px] px-8 rounded-lg font-medium uppercase mt-4">Log In</button>
                    </form>
                    <div className="text-[11px] text-left">
                        <Toaster
                            position="top-left"
                            toastOptions={{
                                duration: 1500,
                                success: {
                                    style: {
                                        background: '#10b981',
                                        color: 'white'
                                    },
                                    iconTheme: {
                                        primary: 'white',
                                        secondary: '#10b981'
                                    }
                                },
                                error: {
                                    style: {
                                        background: '#DF6951',
                                        color: 'white',
                                    },
                                    iconTheme: {
                                        primary: 'white',
                                        secondary: '#DF6951'
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
                <div className={`absolute md:top-0 top-1/2 ${loginClicked ? 'md:w-1/2 md:left-1/2' : 'md:w-1/3 md:left-1/3'}  left-0 w-full md:h-full h-1/3 overflow-hidden transition-all duration-500 ease-in-out z-30 md:translate-y-[0%] translate-y-[50%] rounded-t-[50px] ${btnClicked ? 'md:-translate-x-[100%] md:rounded-r-[100px] md:rounded-tl-[0px] rounded-r-[0px]' : 'md:translate-x-[0%] md:rounded-l-[100px] md:rounded-tr-[0px] rounded-l-[0px]'}`}>
                    <div className={`bg-primaryblack h-full text-white relative -left-[100%] w-[200%] transition-all duration-500 ${btnClicked ? 'translate-x-[50%]' : 'translate-x-[0%]'}`}>
                        <div className={`absolute w-1/2 h-full flex flex-col items-center justify-center px-[30px] text-center top-0 transition-all duration-500 ease-in-out translate-x-[0%]`}>
                            <h1 className="text-xl font-medium md:text-2xl">Welcome Back!</h1>
                            <p className="md:text-sm text-[13px] md:my-5 my-1 mx-[25px]">Log in with email and password to start your travel adventure!</p>
                            <button onClick={toggleButton} className="text-white md:text-[13px] text-[10px] md:py-[10px] py-[8px] px-8 rounded-lg font-medium uppercase mt-3 border hover:bg-white hover:text-primaryred">Log In</button>
                        </div>
                        <div className={`absolute w-1/2 h-full flex flex-col items-center justify-center px-[30px] text-center top-0 transition-all duration-500 ease-in-out translate-x-[100%]`}>
                            <h1 className="text-xl font-medium md:text-2xl">New here?</h1>
                            <p className="md:text-sm text-[13px] md:my-5 my-1 md:mx-[80px] mx-[25px]">Register now and connect with fellow travelers to explore new horizons!</p>
                            <button onClick={toggleButton} className="text-white md:text-[13px] text-[10px] md:py-[10px] py-[8px] px-8 rounded-lg font-medium uppercase mt-3 border hover:bg-white hover:text-primaryblue">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginRegisterForm;