import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"

const useUpdateSecondSheet = () => {
    const [loading,setLoading] = useState(false)
    const {user} = useAuthContext()

    const updateSecondSheet = async (inputs,sheetId) => {
        
        setLoading(true)

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/patient/package/update/sh/${user.admin._id}/${sheetId}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(inputs)
            })

            const data = await response.json()

            if(data.error){
                toast.error(data.error)
                return false
            }
            return data
        } catch (error) {
            console.log("Response data::"+error);
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    return [loading,updateSecondSheet]
}

export default useUpdateSecondSheet