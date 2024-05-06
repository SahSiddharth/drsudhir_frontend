import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"

const useCreatePatientPackage = () => {
    const [loading,setLoading] = useState(false)
    const {user} = useAuthContext()

    const createPatientPackage = async (inputs) => {

        if(!validateInputs(inputs)) {
            toast.error("Please fill all the required fields!")
            return false
        }
        
        setLoading(true)

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/patient/package/create/${user.admin._id}`,{
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

    return [loading,createPatientPackage]
}

const validateInputs = inputs => {
    const {date,bill,patient_name,contact,reference_by,doctor_fees,total,slot_day,slot_time,ncv,nt,p1,due} = inputs

    if(!date || !bill || !patient_name || !contact || !reference_by || !doctor_fees || !total || !slot_day || !slot_time || !ncv || !nt || !p1 || !due ){
        return false
    }

    return true
}

export default useCreatePatientPackage