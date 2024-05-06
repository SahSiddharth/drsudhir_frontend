import React, { useState } from 'react'
import { useThemeContext } from '../context/ThemeContext'
import { FaPlus } from "react-icons/fa";
import CreationBubbles from './CreationBubbles';

const NewButton = () => {
    const [isOpen,setIsOpen] = useState(false)
    const {theme} = useThemeContext()
  return (
    <>
        <div className={`fixed bottom-[20px] right-[20px] w-[50px] h-[50px] rounded-full shadow-[20px 20px 60px #0e9d6e,
            -20px -20px 60px #12d594] bg-emerald-500 flex items-center justify-center hover:bg-emerald-400 cursor-pointer`} onClick={e=>setIsOpen(!isOpen)}>
            <FaPlus className='text-zinc-50 text-[20px]' />
        </div>  
        
        {
            isOpen && (<CreationBubbles />)
        }  
    </>
  )
}

export default NewButton