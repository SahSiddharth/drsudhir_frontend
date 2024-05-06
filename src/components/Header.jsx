import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { CgMenuRightAlt } from "react-icons/cg";
import { useThemeContext } from '../context/ThemeContext';
import useLogout from '../hooks/useLogout';
import { deauthenticate } from '../utils/LS.helper';
import toast from 'react-hot-toast';

const Header = () => {
    const {user,logoutUser} = useAuthContext()
    const {theme,toggleTheme} = useThemeContext()
    const [loading,logout] = useLogout()
    const [isMenuOpen,setIsMenuOpen] = useState(false)

    const handleLogout = async () => {
        const response = await logout()
        if(response.success) {
            if(deauthenticate()){
                logoutUser()
            }else{
                return toast.error("Logout faild. Try Again")
            }
        }
    }

  return (
    <nav className="relative top-0 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-b border-gray-100">
        <div className="container px-6 py-4 mx-auto">
            <div className="lg:flex lg:items-center lg:justify-between">
                <div className="flex items-center justify-between">
                    <Link to="/">
                        <h1 className='font-bold text-[30px] bg-gradient-to-r from-indigo-700 to-blue-500 bg-clip-text text-transparent'>Dr. Sudhir</h1>
                    </Link>
                </div>

                <div className="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center">
                    <div className={`flex-col py-4 -mx-6 ${isMenuOpen ? 'flex' : 'hidden'} ${theme === 'light' ? 'bg-zinc-200' : 'bg-zinc-800'} lg:bg-transparent lg:flex-row lg:items-center lg:mx-8 lg:flex`}>
                        <a href="#" className={`"px-3 py-2 mx-3 mt-2 ${theme === 'light' ? "text-gray-700" : "text-gray-300"} transition-colors duration-300 transform rounded-md lg:mt-0 hover:text-zinc-100 hover:bg-gray-700"`}>Join Slack</a>
                        <a href="#" className={`"px-3 py-2 mx-3 mt-2 ${theme === 'light' ? "text-gray-700" : "text-gray-300"} transition-colors duration-300 transform rounded-md lg:mt-0 hover:text-zinc-100 hover:bg-gray-700"`}>Browse Topics</a>
                        <a href="#" className={`"px-3 py-2 mx-3 mt-2 ${theme === 'light' ? "text-gray-700" : "text-gray-300"} transition-colors duration-300 transform rounded-md lg:mt-0 hover:text-zinc-100 hover:bg-gray-700"`}>Random Item</a>
                        <div href="#" className="mx-3 mt-2 text-zinc-100 transition-colors duration-300 transform rounded-md lg:mt-0 hover:text-zinc-100 hover:bg-rose-400 px-4 py-2 bg-rose-600 cursor-pointer" onClick={handleLogout}>Logout</div>
                    </div>

                    <div className="flex items-center mt-4 lg:mt-0 gap-4 absolute right-[30px] -top-[54px] lg:relative lg:right-[unset] lg:top-[unset]">
                        <button onClick={toggleTheme} className={`"mx-4 text-gray-900 transition-colors duration-300 transform lg:block focus:outline-none w-[2rem] h-[2rem] rounded-full flex items-center justify-center ${theme === 'light' ? "bg-slate-950" : "bg-slate-200"} bg-opacity-50"`} aria-label="show notifications">
                            {
                                theme === "light" ? (<MdDarkMode className='mx-auto text-[20px] text-blue-400' />) : (<MdLightMode className='mx-auto text-[20px] text-rose-500' />)
                            }
                        </button>

                        <button type="button" className="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
                            <Link to='/profile' className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                                <img src={user?.admin.profile_picture} className="object-cover w-full h-full" alt="avatar" />
                            </Link>
                        </button>

                        <div onClick={e => setIsMenuOpen(!isMenuOpen)} className={`w-[2rem] h-[2rem] flex lg:hidden items-center justify-center rounded-full cursor-pointer ${theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                            <CgMenuRightAlt className={`text-[20px] ${isMenuOpen && "rotate-90"}`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Header