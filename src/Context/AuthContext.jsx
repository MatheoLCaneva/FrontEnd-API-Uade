import { createContext, useState } from "react";


const ContextoAuth = createContext()

export const Auth = ({ children }) => {
    const [user, setUser] = useState({})
    const [isLogged, setStatusLogin] = useState(false)

    const loginUser = (User) => {
        setUser(User)
        setStatusLogin(true)
    }

    return (
        <ContextoAuth.Provider value={{
            user,
            loginUser,
            isLogged
        }}>
            {children}
        </ContextoAuth.Provider>
    )
}

export default ContextoAuth