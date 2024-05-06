import React from 'react'
import Header from './Header'
import NewButton from './NewButton'
import UserRegistrationForm from './UserRegistrationForm'
import PatientPackageForm from './PatientPackageForm'
import Dashboard from './Dashboard'

const Home = () => {
  return (
    <div>
        <Header />
        <Dashboard />
        <NewButton />
    </div>
  )
}

export default Home