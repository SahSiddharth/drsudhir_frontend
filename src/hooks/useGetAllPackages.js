import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"

const useGetAllPackages = () => {
    const [loading,setLoading] = useState(false)
    const {user} = useAuthContext()

    const getAllPackages = async (limit,pageNumber) => {
        setLoading(true)
        
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/patient/package/all/${user.admin._id}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({limit,pageNumber})
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

    return [loading,getAllPackages]
}

export default useGetAllPackages