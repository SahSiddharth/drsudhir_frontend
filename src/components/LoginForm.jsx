import React, { useState } from 'react'
import loginBg from '../assets/login.png'
import useLogin from '../hooks/useLogin'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { authenticate } from '../utils/LS.helper';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const LoginForm = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading,login] = useLogin()
    const [success,setSuccess] = useState(false)
    const {loginUser} = useAuthContext()

    const handleLogin = async (e) => {
        e.preventDefault()

        const data = await login(email,password)

        if(!data) return false

        if(authenticate(data.body)){
            loginUser(data.body)
            setSuccess(true)
            return toast.success('Successfully signed in.')
        }else{
            return toast.error('Something went wrong, try again.')
        }
    }
  return (
    <div className="min-h-screen text-gray-900 flex justify-center">
        {
            success && <Navigate to="/admin/dashboard" />
        }
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                <div className='flex gap-4 items-center'>
                    <svg className='w-[70px] h-[70px]' id="logo-86" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="ccustom" fillRule="evenodd" clipRule="evenodd" d="M25.5557 11.6853C23.9112 10.5865 21.9778 10 20 10V0C23.9556 0 27.8224 1.17298 31.1114 3.37061C34.4004 5.56823 36.9638 8.69181 38.4776 12.3463C39.9913 16.0008 40.3874 20.0222 39.6157 23.9018C38.844 27.7814 36.9392 31.3451 34.1421 34.1421C31.3451 36.9392 27.7814 38.844 23.9018 39.6157C20.0222 40.3874 16.0008 39.9913 12.3463 38.4776C8.69181 36.9638 5.56823 34.4004 3.37061 31.1114C1.17298 27.8224 0 23.9556 0 20H10C10 21.9778 10.5865 23.9112 11.6853 25.5557C12.7841 27.2002 14.3459 28.4819 16.1732 29.2388C18.0004 29.9957 20.0111 30.1937 21.9509 29.8078C23.8907 29.422 25.6725 28.4696 27.0711 27.0711C28.4696 25.6725 29.422 23.8907 29.8078 21.9509C30.1937 20.0111 29.9957 18.0004 29.2388 16.1732C28.4819 14.3459 27.2002 12.7841 25.5557 11.6853Z" fill="#007DFC"></path><path className="ccustom" fillRule="evenodd" clipRule="evenodd" d="M10 5.16562e-07C10 1.31322 9.74135 2.61358 9.2388 3.82683C8.73625 5.04009 7.99966 6.14248 7.07107 7.07107C6.14249 7.99966 5.0401 8.73625 3.82684 9.2388C2.61358 9.74134 1.31322 10 5.4439e-06 10L5.00679e-06 20C2.62644 20 5.22716 19.4827 7.65368 18.4776C10.0802 17.4725 12.285 15.9993 14.1421 14.1421C15.9993 12.285 17.4725 10.0802 18.4776 7.65367C19.4827 5.22715 20 2.62643 20 -3.81469e-06L10 5.16562e-07Z" fill="#007DFC"></path></svg>
                    <h1 className='font-bold text-[36px] flex flex-col gap-0 m-0 p-0'>Dr. Sudhir
                        <p className='text-[18px] font-semibold -mt-2'>Pain Relief Clinic</p>
                    </h1>
                </div>
                <div className="mt-12 flex flex-col items-center">
                    <div className="w-full flex-1 mt-8">

                        <div className="my-12 border-b text-center">
                            <div
                                className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                Admin Login
                            </div>
                        </div>

                        <div className="mx-auto max-w-xs">
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                            <button onClick={handleLogin} disabled={loading}
                                className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                {
                                    loading ? (<AiOutlineLoading3Quarters className='animate-spin' />) : 
                                    (
                                        <>
                                            <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                                strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                <circle cx="8.5" cy="7" r="4" />
                                                <path d="M20 8v6M23 11h-6" />
                                            </svg>
                                            <span className="ml-2">
                                                Sign In
                                            </span>
                                        </>
                                    )
                                }
                            </button>
                            <p className="mt-6 text-xs text-gray-600 text-center">
                                I agree to abide by Dr. Sudhir's 
                                <a href="#" className="border-b border-gray-500 border-dotted mx-2">
                                    Terms of Service 
                                </a>
                                and its 
                                <a href="#" className="border-b border-gray-500 border-dotted mx-2">
                                    Privacy Policy
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 bg-green-100 text-center hidden lg:flex">
                <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat flex items-center justify-center">
                    <img src={loginBg} alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginForm