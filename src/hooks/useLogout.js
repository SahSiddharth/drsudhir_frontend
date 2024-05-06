import { useState } from "react"
import toast from "react-hot-toast"

const useLogout = () => {
    const [loading,setLoading] = useState(false)

    const logout = async () => {
        setLoading(true)
        
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/auth/logout`)

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

    return [loading,logout]
}

export default useLogout