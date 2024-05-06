import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useGetPatientPackage from '../hooks/useGetPatientPackage'
import Header from './Header'
import { useThemeContext } from '../context/ThemeContext'

const PatientPackage = () => {
    const [data,setData] = useState(undefined)
    const {id} = useParams()
    const [loading,getPackage] = useGetPatientPackage()
    const {theme} = useThemeContext()
    const [isEditable,setIsEditable] = useState(false)

    const getPackageData = async () => {
        const packageData = await getPackage(id)
        setData(packageData.body)
        console.log(packageData);
    }

    useEffect(()=>{
        getPackageData()
    },[])
  return (
    <>
        <Header />
        <div className='w-[95vw] min-h-[90vw] mt-6 h-max mx-auto rounded-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100'>
            {
                data ? (
                    <>
                        <div className={`w-full h-[50px] px-4 rounded-t-md font-bold ${theme === 'light' ? 'bg-zinc-50 text-zinc-950' : 'bg-zinc-950 text-zinc-50'} flex items-center justify-between`}>
                            <h1>{data.patient_name}</h1>
                            <h1>Actions</h1>
                        </div>         

                        <div className='w-full h-max p-4'>
                            <form className='w-full h-max grid grid-cols-3'>
                                <div className='element '>
                                    <label htmlFor="patient_name" className={`font-semibold text-[18px] underline underline-offset-2 ${theme === 'light' ? 'text-zinc-950' : 'text-zinc-50'}`}>Patient Name</label>
                                    <input disabled={isEditable} type="text" value={data.patient_name} placeholder="John Doe" className={`block cursor-not-allowed mt-2 w-full h-max bg-transparent focus:outline-none text-[18px] ${theme === 'light' ? 'text-zinc-900' : 'text-zinc-100'}`} />
                                </div>

                                <div className='element '>
                                    <label htmlFor="patient_name" className={`font-semibold text-[18px] underline underline-offset-2 ${theme === 'light' ? 'text-zinc-950' : 'text-zinc-50'}`}>Contact</label>
                                    <input disabled={isEditable} type="text" value={data.contact} placeholder="John Doe" className={`block cursor-not-allowed mt-2 w-full h-max bg-transparent focus:outline-none text-[18px] ${theme === 'light' ? 'text-zinc-900' : 'text-zinc-100'}`} />
                                </div>

                                <div className='element '>
                                    <label htmlFor="patient_name" className={`font-semibold text-[18px] underline underline-offset-2 ${theme === 'light' ? 'text-zinc-950' : 'text-zinc-50'}`}>Patient Name</label>
                                    <input disabled={isEditable} type="text" value={data.patient_name} placeholder="John Doe" className={`block cursor-not-allowed mt-2 w-full h-max bg-transparent focus:outline-none text-[18px] ${theme === 'light' ? 'text-zinc-900' : 'text-zinc-100'}`} />
                                </div>

                            </form>
                        </div>
                    </>
                ) : ''
            }
        </div>    
    </>

  )
}

export default PatientPackage