import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import { Eye, EyeOff } from "lucide-react";


const LoginPage = () => {

    const [ email,setEmail ] = useState("");
    const [ password,setPassword ] = useState("");
    const [ showPassword,setShowPassword ] = useState(false);

    const [ login,{isLoading} ] = useLoginMutation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formHandler = async(e)=>{

        e.preventDefault();

        if( !email || !password) toast.error(`Please fill all the fields`);

        try {
            const res = await login({ email, password }).unwrap();

            dispatch(setCredentials({...res}));
            
            toast.success(`Welcome back, ${res.name || "User"}!`);
            navigate("/");
        } catch (err) {
            console.log(err?.data?.message);
            toast.error(err?.data?.message || "Invalid email or password");
            }
    }

    return (
        <main>
            <form className="max-w-sm mx-auto" onSubmit={formHandler}>
                <label htmlFor="email-address-icon" className="mt-5 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                        </svg>
                    </div>
                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} id="email-address-icon" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Email" />
                </div>

                <label htmlFor="email-address-icon" className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 dark:text-gray-400">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 2a4 4 0 0 0-4 4v2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-1V6a4 4 0 0 0-4-4Zm-2 6V6a2 2 0 1 1 4 0v2H8Zm2 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </div>
                        <input type={showPassword ? "text" : "password"} value={password} 
                          onChange={(e)=>setPassword(e.target.value)} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Password" />
                        
                        <button type="button" onClick={()=>setShowPassword( !showPassword )}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                             {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                </div>

               
                    <button type="submit" disabled={isLoading} className={`mt-5 block text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
                            focus:outline-none focus:ring-4 ${isLoading 
                            ? "bg-blue-400 cursor-not-allowed opacity-70" 
                            : "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            }`}>
                        {isLoading ? "Signing In" : "Sign In"}
                    </button>
                    <div className="mt-3">
                        <p className="mt-6 inline">If you don't have account</p>
                        <a className='ml-3  underline hover:text-blue-600 transition-colors duration-200' href="/signup">Create Account</a>
                    </div>

            </form>
        </main>
    )
}

export default LoginPage