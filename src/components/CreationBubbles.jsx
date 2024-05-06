import React, { useState } from 'react'
import { useThemeContext } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import UserRegistrationForm from './UserRegistrationForm'
import PatientPackageForm from './PatientPackageForm'

const CreationBubbles = () => {
    const {theme} = useThemeContext()
    const {user} = useAuthContext()
    const [isRegisterUserOpen,setIsRegisterUserOpen] = useState(false)
    const [isNewPatientFormOpen,setIsNewPatientFormOpen] = useState(false)
  return (
    <>
        <div className='fixed bottom-[80px] right-[20px]  h-max flex flex-col gap-4 items-end'>
            {
                user.admin.role > 0 && (
                    <div className={`px-4 py-2 rounded-md cursor-pointer ${theme === 'light' ? ('bg-zinc-950 text-zinc-50') : ('bg-zinc-50 text-zinc-950')}`} onClick={e => setIsNewPatientFormOpen(true)}>New Patient</div>
                )
            }
            
            {
                user.admin.role > 1 && (
                    <div onClick={e => setIsRegisterUserOpen(true)} className={`px-4 py-2 rounded-md cursor-pointer ${theme === 'light' ? ('bg-zinc-950 text-zinc-50') : ('bg-zinc-50 text-zinc-950')}`}>New User/Admin</div>
                )
            }
        </div>  
        {
            isRegisterUserOpen && (
                <div className=' fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10'>
                    <UserRegistrationForm isFormOpen={setIsRegisterUserOpen} />
                </div>
            )
        }  
        {
            isNewPatientFormOpen && (
                <PatientPackageForm isFormOpen={setIsNewPatientFormOpen} />
            )
        }
    </>

  )
}

export default CreationBubbles