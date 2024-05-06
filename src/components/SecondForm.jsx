import React, { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa';
import { useThemeContext } from '../context/ThemeContext';
import useUpdateSecondSheet from '../hooks/useUpdateSecondSheet';
import toast from 'react-hot-toast';

const SecondForm = ({data,isFormOpen = f => f}) => {
    const {theme} = useThemeContext()
    const [loading,updateSecondSheet] = useUpdateSecondSheet()
    const [success,setSuccess] = useState(false)
    const [inputs,setInputs] = useState({
        patient_name: '',
        contact: '',
        age: null,
        repg_date: '',
        re_apt_date: '',
        repkg_amount: null,
        address: '',
        diagnosis: '',
        slot_day: '',
        slot_time: '',
        therapy_statring_date: '',
        rm: '',
        payment_info: {
            ncv_nt: null,
            total: null,
            paid: null,
            due: null,
            pay_one: null,
            pay_two: null
        }
    })

    const {patient_name,contact,age,repg_date,re_apt_date,repkg_amount,address,diagnosis,slot_day,slot_time,therapy_statring_date,rm,payment_info} = inputs

    const handleInput = e => field => {
        setInputs({
            ...inputs,
            [field]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(inputs);
        const response = await updateSecondSheet(inputs,data.second_sheet)

        if(!response){
            return toast.error("Something went wrong")
        }

        setSuccess(true)
        toast.success("Updated Successfully")
        setInputs({
            patient_name: '',
            contact: '',
            age: null,
            repg_date: '',
            re_apt_date: '',
            repkg_amount: null,
            address: '',
            diagnosis: '',
            slot_day: '',
            slot_time: '',
            therapy_statring_date: '',
            rm: '',
            payment_info: {
                ncv_nt: null,
                total: null,
                paid: null,
                due: null,
                pay_one: null,
                pay_two: null
            }
        })

        isFormOpen(false)
    }

    useEffect(()=>{
        setInputs({
            patient_name: data.patient_name,
            contact: data.contact,
            slot_day: data.slot_day,
            slot_time: data.slot_time,
            payment_info: {
                ncv_nt: data.ncv && data.nt ? (Number(data.ncv) + Number(data.nt)) : null,
                total: data.total ? data.total : null,
                paid: data.p1 ? data.p1 : null,
                due: data.total && data.total - data.p1 - data.p2 - data.p3,
                pay_one: data.p1 ? data.p1 : null,
                pay_two: data.p2 ? data.p2 : null
            }
        })
    },[])
  return (
    <>
        <h2 className={`"text-xl font-bold ${theme === "light" ? "text-gray-700" : "text-white"} text-gray-700 capitalize dark:text-white"`}>Patient Package Aplication -- Part 2</h2>

        <form>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 md:grid-cols-3">
                <div>
                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="patient_name">Patient Name</label>
                    <input value={patient_name} onChange={e => handleInput(e)("patient_name")} id="patient_name" type="text" placeholder='Ex. Soumik Chatterjee' className={`"block w-full px-4 py-2 mt-2 border rounded-md  ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
                </div>

                <div>
                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="contact">Contact</label>
                    <input value={contact} onChange={e => handleInput(e)("contact")} id="contact" type="text" placeholder='9876543210' className={`"block w-full px-4 py-2 mt-2 border rounded-md  ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
                </div>

                <div>
                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="age">Age</label>
                    <input value={age} onChange={e => handleInput(e)("age")} id="age" type="number" placeholder='Patient Age' className={`"block w-full px-4 py-2 mt-2 border rounded-md  ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
                </div>

                <div>
                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="repg_date">REPG Date</label>
                    <input value={repg_date} onChange={e => handleInput(e)("repg_date")} id="repg_date" type="date" placeholder='Repg date' className={`"block w-full px-4 py-2 mt-2 border rounded-md  ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
                </div>

                <div>
                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="re_apt_date">Re-Appointment Date</label>
                    <input value={re_apt_date} onChange={e => handleInput(e)("re_apt_date")} id="re_apt_date" type="date" className={`"block w-full px-4 py-2 mt-2  ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
                </div>

                <div>
                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="repkg_amount">REPKG Amount</label>
                    <input value={repkg_amount} onChange={e => handleInput(e)("repkg_amount")} id="repkg_amount" type="number" placeholder='10000' className={`"block w-full px-4 py-2 mt-2  border rounded-md ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
                </div>

                <div>
                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="diagnosis">Diagnosis</label>
                    <input value={diagnosis} onChange={e => handleInput(e)("diagnosis")} id="diagnosis" type="text" placeholder='Ex. Physio Therapy' className={`"block w-full px-4 py-2 mt-2 border rounded-md  ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
                </div>

                <div>
                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="therapy_statring_date">Therapy Starting Date</label>
                    <input value={therapy_statring_date} onChange={e => handleInput(e)("therapy_statring_date")} id="therapy_statring_date" type="date" placeholder='' className={`"block w-full px-4 py-2 mt-2 border rounded-md  ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
                </div>

                <div>
                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="slot_day">Slot Day</label>
                    <select value={slot_day} onChange={e => handleInput(e)("slot_day")} id="slot_day" placeholder='5000' className={`"block w-full px-4 py-2 mt-2 border rounded-md  ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`}>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thrusday">Thrusday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                </div>

                <div>
                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="slot_time">Slot Time</label>
                    <input value={slot_time} onChange={e => handleInput(e)("slot_time")} id="slot_time" type="time" placeholder='5000' className={`"block w-full px-4 py-2 mt-2 border rounded-md  ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
                </div>

                <div>
                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="feedback">Address</label>
                    <textarea value={address} onChange={e => handleInput(e)("feedback")} id="feedback" placeholder='Full address' className={`"block w-full px-4 py-2 mt-2 border rounded-md  ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
                </div>
            </div>

            <div className="flex justify-end mt-6">
                <button disabled={loading} className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" onClick={handleSubmit}>{
                    loading ? (<FaSpinner className='animate-spin' />) : ("Save")
                }</button>
            </div>
        </form> 
    </>
  )
}

export default SecondForm

{/* <div>
<label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="date">Date</label>
<input value={date} onChange={e => handleInput(e)("date")} id="date" type="date" className={`"block w-full px-4 py-2 mt-2  ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
</div> */}