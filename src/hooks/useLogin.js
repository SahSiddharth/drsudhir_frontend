import { useState } from "react"
import toast from "react-hot-toast"

const useLogin = () => {
    const [loading,setLoading] = useState(false)

    const login = async (email,password) => {
        if(!email || !password){
            toast.error("All fields are required")
            return false
        }

        setLoading(true)
        
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/auth/login`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email,password})
            })

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

    return [loading,login]
}

export default useLogin