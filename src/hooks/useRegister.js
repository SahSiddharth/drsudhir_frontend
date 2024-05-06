import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"

const useRegister = () => {
    const [loading,setLoading] = useState(false)
    const {user} = useAuthContext()

    const register = async (inputs) => {

        setLoading(true)
        
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/auth/create/${user.admin._id}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(inputs)
            })

            const data = await response.json()

            if(data.error){
                toast.error(data.error+"  "+data.body)
                return false
            }
            return data
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    return [loading,register]
}

export default useRegister