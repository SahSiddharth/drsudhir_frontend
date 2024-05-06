import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useThemeContext } from '../context/ThemeContext'
import useGetTotalNumberOfPackages from '../hooks/useGetTotalNumberOfPackages'
import useGetAllPackages from '../hooks/useGetAllPackages'
import { usePackagesContext } from '../context/PackagesContext'

const AllPackages = () => {
    const {theme} = useThemeContext()
    const [current,setCurrent] = useState(1)
    const limit = 10

    const [loadingg,getTotalNumberOfPackages] = useGetTotalNumberOfPackages()
    const [loading,getAllPackages] = useGetAllPackages()
    const {packages,setPackages} = usePackagesContext()

    const [totalPages,setTotalPages] = useState(undefined)

    const getTheSize = async () => {
        const response = await getTotalNumberOfPackages()

        if(!response.error){
            setTotalPages(Math.ceil(response.body / limit))
        }
    }

    const getThePackageData = async () => {
        const response = await getAllPackages(limit,current - 1)

        if(!response.error){
            setPackages(response.body)
        }
    }

    useEffect(()=>{
        getTheSize()
        getThePackageData()
    },[])

    const handleIncDec = ops => {
        if(ops === 'inc'){
            if(current < totalPages){
                setCurrent(prev => prev + 1)
            }
        }
        
        if(ops === 'dec'){
            if(current > 1){
                setCurrent(current - 1)
            }
        }
    }

    const handleDate = date => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const date1 = new Date(date)
        return months[date1.getMonth()]+" "+date1.getDate()+","+date1.getFullYear()
    }

    const handleRouting = id => {
        window.location.href = `/packages/${id}`
    }

    useEffect(()=>{
        getThePackageData()
    },[current])

  return (
    <>
        <Header />

        <section className="container px-4 mx-auto mt-4 pb-6">
            <div className="flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8" id='scrollbar_modified'>
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className={`overflow-hidden border ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'} md:rounded-lg`}>
                            <table className={`min-w-full divide-y ${theme === 'light' ? 'divide-gray-200' : 'divide-gray-700'}`}>
                                <thead className={theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'}>
                                    <tr>
                                        <th scope="col" className={`py-3.5 px-4 text-sm font-normal text-left rtl:text-right ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                            <div className="flex items-center gap-x-3">
                                                <button className="flex items-center gap-x-2">
                                                    <span>Sl. No.</span>
                                                </button>
                                            </div>
                                        </th>

                                        <th scope="col" className={`px-4 py-3.5 text-sm font-normal text-left rtl:text-right ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                            Date
                                        </th>

                                        <th scope="col" className={`px-4 py-3.5 text-sm font-normal text-left rtl:text-right  ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                            Patient
                                        </th>

                                        <th scope="col" className={`px-4 py-3.5 text-sm font-normal text-left rtl:text-right  ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                            Mobile
                                        </th>

                                        <th scope="col" className={`px-4 py-3.5 text-sm font-normal text-left rtl:text-right  ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                            Slot Day / Slot Time
                                        </th>

                                    </tr>
                                </thead>

                                <tbody className={theme === 'light' ? 'bg-white divide-y divide-gray-200' : 'divide-gray-700 bg-gray-900 divide-y'}>

                                    {
                                        packages && packages.map((value,idx) => (
                                            <tr className='cursor-pointer' onClick={e => handleRouting(value._id)} key={idx}>
                                                <td className={`px-4 py-4 text-sm font-medium  ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} whitespace-nowrap`}>
                                                    <div className="inline-flex items-center gap-x-3">
                                                        <span>#{idx+1}</span>
                                                    </div>
                                                </td>
                                                <td className={`px-4 py-4 text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} whitespace-nowrap`}>{handleDate(value.createdAt)}</td>
        
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                    <div className="flex items-center gap-x-2">
                                                        <div>
                                                            <h2 className={`text-sm font-medium ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{value.patient_name}</h2>
                                                        </div>
                                                    </div>
                                                </td>
        
                                                <td className={`px-4 py-4 text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} whitespace-nowrap`}>{value.contact}</td>
        
                                                <td className={`px-4 py-4 text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} whitespace-nowrap`}>{value.slot_day} / {value.slot_time}</td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mt-6 cursor-pointer">
                <div onClick={e => handleIncDec("dec")} className={`select-none flex items-center px-5 py-2 text-sm  capitalize transition-colors duration-200 ${theme === 'light' ? 'bg-white hover:bg-gray-100 text-gray-700' : 'bg-gray-900 text-gray-200 border-gray-700 hover:bg-gray-800'}  border rounded-md gap-x-2`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>

                    <span>
                        previous
                    </span>
                </div>

                <div className="items-center hidden md:flex gap-x-3">
                    {
                        totalPages && Array.apply(null,Array(totalPages > 1 ? totalPages : 1)).map((value,idx) => (
                            <div onClick={e => setCurrent(idx+1)} key={idx+1} className={`cursor-pointer px-2 py-1 text-sm ${theme === 'light' ? 'text-gray-500 hover:bg-gray-100' : 'hover:bg-gray-800 text-gray-300 '} ${current === idx+1 && (
                                theme === 'light' ? 'text-blue-500 bg-blue-100/60' : 'bg-gray-800 text-blue-500'
                            )}  rounded-md`}>{idx+1}</div>
                        ))
                    }
                </div>

                <div onClick={e => handleIncDec("inc")} className={`cursor-pointer select-none flex items-center px-5 py-2 text-sm  capitalize transition-colors duration-200 ${theme === 'light' ? 'bg-white hover:bg-gray-100 text-gray-700' : 'bg-gray-900 text-gray-200 border-gray-700 hover:bg-gray-800'}  border rounded-md gap-x-2`}>
                    <span>
                        Next
                    </span>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </div>
            </div>
        </section>
    </>
  )
}

export default AllPackages