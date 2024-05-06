import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"
import { isAuthenticated } from "../utils/LS.helper"

const useGetPatientPackage = () => {
    const [loading,setLoading] = useState(false)
    const {admin,token} = isAuthenticated()

    const getPackage = async (id) => {
        setLoading(true)
        
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/patient/package/${id}/${admin._id}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            const data = await response.json()

            if(data.error){
                toast.error(data.error)
                return false
            }
            return data
        } catch (error) {
            toast.error(error.message)
            console.log(error);
        }finally{
            setLoading(false)
        }
    }

    return [loading,getPackage]
}

export default useGetPatientPackage