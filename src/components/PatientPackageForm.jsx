import React, { useState } from 'react'
import { useThemeContext } from '../context/ThemeContext'
import { FaSpinner } from 'react-icons/fa';
import { MdClose } from "react-icons/md";
import useCreatePatientPackage from '../hooks/useCreatePatientPackage';
import toast from 'react-hot-toast';
import SecondForm from './SecondForm';

const PatientPackageForm = ({isFormOpen = f => f}) => {
    const {theme} = useThemeContext()
    const [loading,createPatientPackage] = useCreatePatientPackage()
    const [inputs,setInputs] = useState({
        date: '',
        bill: null,
        patient_name: '',
        contact: '',
        reference_by:'',
        doctor_fees: null,
        ncv: null,
        nt: null,
        total: null,
        p1: null,
        due: null,
        p2: null,
        p3: null,
        slot_day:'',
        slot_time:'',
        feedback:''
    })

    const [success,setSuccess] = useState(false)
    const [isSecondFormOpen,setIsSecondFormOpen] = useState(false)

    const {date,bill,p1,p2,p3,patient_name,contact,reference_by,doctor_fees,ncv,nt,total,due,slot_day,slot_time,feedback} = inputs

    const handleInput = e => field => {
        setInputs({
            ...inputs,
            [field]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await createPatientPackage(inputs)

        if(data){
            toast.success("Sucessfully Created Patient Package.")
            setSuccess(data.body)
            console.log(data);
            setInputs({
                date: '',
                bill: null,
                patient_name: '',
                contact: '',
                reference_by:'',
                doctor_fees: null,
                ncv: null,
                nt: null,
                total: null,
                p1: null,
                due: null,
                p2: null,
                p3: null,
                slot_day:'',
                slot_time:'',
                feedback:''
            })
        }
    }
  return (
    <div className='w-screen h-screen flex items-center justify-center fixed top-0 left-0 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10'>
        <section className={`" w-[95vw] h-[95vh] overflow-y-scroll overflow-x-hidden p-6 mx-auto ${theme === 'light' ? "bg-white" : "bg-gray-800"} rounded-md shadow-md relative top-0"`} id='scrollbar_modified'>
            <div className='absolute right-[10px] top-[10px] w-[40px] h-[40px] flex items-center justify-center bg-rose-500 rounded-md shadow-md hover:bg-rose-400 cursor-pointer'  onClick={e => isFormOpen(false)}>
                <MdClose className='text-[20px] text-gray-200' />
            </div>
            {
                success ? (
                    isSecondFormOpen ? (<SecondForm data={success} isFormOpen={isFormOpen} />) : (
                    <div className='w-full h-full flex items-center justify-center px-4 py-8 flex-col gap-8'>
                        <h1 className={`text-xl sm:text-2xl text-center ${theme === 'light' ? "text-emerald-800" : "text-emerald-400"}`}>The Patient Package Sheet is Created. Would you like to continue filling out the rest of the form?</h1>
                        <div className='flex gap-6'>
                            <button className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-rose-600 rounded-lg hover:bg-rose-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80" onClick={e => isFormOpen(false)}>
                                Close
                            </button>
                            <button onClick={e => setIsSecondFormOpen(true)} className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-emerald-600 rounded-lg hover:bg-emerald-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                                Continue
                            </button>
                        </div>
                    </div>
                    )
                ) : (
                    <>
                        <h2 className={`"text-xl font-bold ${theme === "light" ? "text-gray-700" : "text-white"} text-gray-700 capitalize dark:text-white"`}>New Patient Package Aplication</h2>

                        <form>
                            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 md:grid-cols-3">
                                <div>
                                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="date">Date</label>
                                    <input value={date} onChange={e => handleInput(e)("date")} id="date" type="date" className={`"block w-full px-4 py-2 mt-2  ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
                                </div>

                                <div>
                                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="bill">Bill</label>
                                    <input value={bill} onChange={e => handleInput(e)("bill")} id="bill" type="number" placeholder='10000' className={`"block w-full px-4 py-2 mt-2  border rounded-md ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
                                </div>

                                <div>
                                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="patient_name">Patient Name</label>
                                    <input value={patient_name} onChange={e => handleInput(e)("patient_name")} id="patient_name" type="text" placeholder='Ex. Soumik Chatterjee' className={`"block w-full px-4 py-2 mt-2 border rounded-md  ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
                                </div>

                                <div>
                                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="contact">Contact</label>
                                    <input value={contact} onChange={e => handleInput(e)("contact")} id="contact" type="text" placeholder='9876543210' className={`"block w-full px-4 py-2 mt-2 border rounded-md  ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
                                </div>

                                <div>
                                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="reference_by">Referenced By</label>
                                    <input value={reference_by} onChange={e => handleInput(e)("reference_by")} id="reference_by" type="text" placeholder='Referer name' className={`"block w-full px-4 py-2 mt-2 border rounded-md  ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
                                </div>

                                <div>
                                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="doctor_fees">Doctor Fees</label>
                                    <input value={doctor_fees} onChange={e => handleInput(e)("doctor_fees")} id="doctor_fees" type="number" className={`"block w-full px-4 py-2 mt-2  ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
                                </div>

                                <div>
                                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="ncv">NCV</label>
                                    <input value={ncv} onChange={e => handleInput(e)("ncv")} id="ncv" type="number" placeholder='10000' className={`"block w-full px-4 py-2 mt-2  border rounded-md ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
                                </div>

                                <div>
                                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="nt">NT</label>
                                    <input value={nt} onChange={e => handleInput(e)("nt")} id="nt" type="number" placeholder='2000' className={`"block w-full px-4 py-2 mt-2 border rounded-md  ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
                                </div>

                                <div>
                                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="total">Total</label>
                                    <input value={total} onChange={e => handleInput(e)("total")} id="total" type="number" placeholder='10000' className={`"block w-full px-4 py-2 mt-2 border rounded-md  ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
                                </div>

                                <div>
                                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="p1">Payment One</label>
                                    <input value={p1} onChange={e => handleInput(e)("p1")} id="p1" type="number" placeholder='2000' className={`"block w-full px-4 py-2 mt-2 border rounded-md  ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
                                </div>

                                <div>
                                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="due">Due Amount</label>
                                    <input value={due} onChange={e => handleInput(e)("due")} id="due" type="number" placeholder='8000' className={`"block w-full px-4 py-2 mt-2 border rounded-md  ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
                                </div>

                                <div>
                                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="p1">Payment Two</label>
                                    <input value={p2} onChange={e => handleInput(e)("p2")} id="p2" type="number" placeholder='3000' className={`"block w-full px-4 py-2 mt-2 border rounded-md  ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
                                </div>

                                <div>
                                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="p3">Payment Three</label>
                                    <input value={p3} onChange={e => handleInput(e)("p3")} id="p3" type="number" placeholder='5000' className={`"block w-full px-4 py-2 mt-2 border rounded-md  ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
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
                                    <label className={theme === "light" ? "text-gray-700" : "text-gray-200"} for="feedback">Feedback</label>
                                    <textarea value={feedback} onChange={e => handleInput(e)("feedback")} id="feedback" placeholder='Feedback message' className={`"block w-full px-4 py-2 mt-2 border rounded-md  ${theme === "light" ? "bg-white text-gray-700 border-gray-200" : "bg-gray-800 text-gray-300 border-gray-600"} focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"`} />
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

        </section>
    </div>
  )
}

export default PatientPackageForm