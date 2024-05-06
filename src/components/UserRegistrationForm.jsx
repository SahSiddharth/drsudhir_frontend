import React,{ useState } from 'react'
import { validateUserRegistrationInputs } from '../utils/InputValidation';
import toast from 'react-hot-toast';
import useRegister from '../hooks/useRegister';
import { FaSpinner } from 'react-icons/fa';
import { MdClose } from "react-icons/md";
import { useThemeContext } from '../context/ThemeContext';

const UserRegistrationForm = ({isFormOpen = f => f}) => {
    const [inputs,setInputs] = useState({
        fullname: '',
        email: '',
        contact: '',
        password: '',
        confirmPassword: '',
        role: 0
    });

    const {fullname,email,contact,password,confirmPassword,role} = inputs
    const [loading,register] = useRegister()
    const {theme} = useThemeContext()

    const handleInput = e => field => {
        setInputs({
            ...inputs,
            [field]: e.target.value
        });
    }

    const handleRole = e => {
        if(e.target.checked){
            setInputs({...inputs,role: 1})
        }else{
            setInputs({...inputs,role: 0})
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const error = validateUserRegistrationInputs(inputs)
        if(error){
            return toast.error(error)
        }

        const response = await register(inputs)

        if(response.success){
            toast.success("New registration successful.")
            isFormOpen(false)
        }
    }
  return (
    <section className={`"max-w-[95vw] md:max-w-4xl p-6 mx-auto ${theme === 'light' ? "bg-white" : "bg-gray-800"} rounded-md shadow-md relative top-0"`}>
        <div className='absolute -right-[20px] -top-[20px] w-[40px] h-[40px] flex items-center justify-center bg-rose-500 rounded-md shadow-md hover:bg-rose-400 cursor-pointer' onClick={e => isFormOpen(false)}>
            <MdClose className='text-[20px] text-gray-200' />
        </div>
        <h2 className={`"text-lg font-semibold ${theme === "light" ? "text-gray-700" : "text-white"} text-gray-700 capitalize dark:text-white"`}>Register User/Admin</h2>

        <form>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="username">Fullname</label>
                    <input value={fullname} onChange={e => handleInput(e)("fullname")} id="username" type="text" className={`"block w-full px-4 py-2 mt-2  ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
                </div>

                <div>
                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="emailAddress">Email Address</label>
                    <input value={email} onChange={e => handleInput(e)("email")} id="emailAddress" type="email" className={`"block w-full px-4 py-2 mt-2  border rounded-md ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
                </div>

                <div>
                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="emailAddress">Contact Number</label>
                    <input value={contact} onChange={e => handleInput(e)("contact")} id="contactNumber" type="text" placeholder='+91 9876543210' className={`"block w-full px-4 py-2 mt-2 border rounded-md  ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
                </div>

                <div>
                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="password">Password</label>
                    <input value={password} onChange={e => handleInput(e)("password")} id="password" type="password" placeholder='********' className={`"block w-full px-4 py-2 mt-2 border rounded-md  ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
                </div>

                <div>
                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="passwordConfirmation">Password Confirmation</label>
                    <input value={confirmPassword} onChange={e => handleInput(e)("confirmPassword")} id="passwordConfirmation" type="text" placeholder='********' className={`"block w-full px-4 py-2 mt-2 border rounded-md  ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
                </div>
            </div>

            <div className="flex justify-between mt-6">
                <div className="flex items-center">
                    <input onChange={handleRole} id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checked-checkbox" className={`"ms-2 text-sm font-medium ${theme === 'light' ? 'text-gray-900' : 'text-gray-300'} ml-2"`}>Make Moderator</label>
                </div>
                <button disabled={loading} className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" onClick={handleSubmit}>{
                    loading ? (<FaSpinner className='animate-spin' />) : ("Save")
                }</button>
            </div>
        </form>
    </section>
  )
}

export default UserRegistrationForm