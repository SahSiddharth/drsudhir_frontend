import { useState } from "react"
import toast from "react-hot-toast"

const useGetTotalNumberOfPackages = () => {
    const [loading,setLoading] = useState(false)

    const getTotalNumberOfPackages = async () => {
        setLoading(true)
        
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/patient/package/count`)

            const data = await response.json()

            if(data.error){
                toast.error(data.error)
                return false
            }
            return data
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    return [loading,getTotalNumberOfPackages]
}

export default useGetTotalNumberOfPackages