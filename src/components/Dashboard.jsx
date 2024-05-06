import React, { useEffect, useState } from 'react'
import { useThemeContext } from '../context/ThemeContext'
import { Link } from 'react-router-dom'
import useGetTotalNumberOfPackages from '../hooks/useGetTotalNumberOfPackages'

const Dashboard = () => {
  const {theme} = useThemeContext()
  const [totalNumbers,setTotalNumbers] = useState({
    packages: 0,
    users: 0
  })

  const [loading,getTotalNumberOfPackages] = useGetTotalNumberOfPackages()

  const getPackageNumber = async () => {
    const {data} = await getTotalNumberOfPackages()
    setTotalNumbers({...totalNumbers,
      packages: data.body
    })
  }

  useEffect(()=>{
    getPackageNumber()
  },[])
  return (
    <div className='w-screen px-6 py-4 h-[50vh] flex gap-[10px] sm:gap-[30px] flex-wrap'>
        <Link to="/packages/all" className={`w-[140px] h-[100px] sm:w-[300px] sm:h-[160px] p-4 flex flex-col justify-between rounded ${theme === 'light' ? "bg-emerald-200 text-zinc-900" : "bg-black text-zinc-100"} `}>
          <h1 className='text-[14px] leading-tight sm:text-[20px]'>View Patient Packages</h1>
          <h1 className='sm:text-[46px]'>{totalNumbers.packages}</h1>
        </Link>
        <Link to="/users/all" className={`w-[140px] h-[100px] sm:w-[300px] sm:h-[160px] p-4 flex flex-col justify-between rounded ${theme === 'light' ? "bg-amber-200 text-zinc-900" : "bg-zinc-900 text-zinc-100"} `}>
          <h1 className='text-[14px] leading-tight sm:text-[20px]'>Manage Users</h1>
          <h1 className='sm:text-[46px]'>05</h1>
        </Link>
    </div>
  )
}

export default Dashboard