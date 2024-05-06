import { createContext, useContext, useState } from "react"

const AuthContext = createContext()

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const loginUser = (user) => {
        setUser(user)
    }

    const logoutUser = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    )
}