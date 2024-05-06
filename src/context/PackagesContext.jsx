import { createContext, useContext, useState } from "react"

const PackagesContext = createContext()

export const usePackagesContext = () => {
    return useContext(PackagesContext)
}

export const PackagesProvider = ({ children }) => {
    const [packages, setPackages] = useState(null)

    return (
        <PackagesContext.Provider value={{ packages, setPackages }}>
            {children}
        </PackagesContext.Provider>
    )
}