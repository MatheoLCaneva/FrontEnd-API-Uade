import { createContext, useEffect, useState } from "react";


const ContextoAuth = createContext()

export const Auth = ({ children }) => {
    const [user, setUser] = useState({})
    const [isLogged, setStatusLogin] = useState(false)

    useEffect(() => {
        const almacenado = JSON.parse(localStorage.getItem("user"))
        if (almacenado) {
            loginUser(almacenado)
        }
    }, [])


    const loginUser = (User) => {
        setUser(User)
        setStatusLogin(true)
    }

    const logOffUser = () => {
        setUser('')
        setStatusLogin(false)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    return (
        <ContextoAuth.Provider value={{
            user,
            loginUser,
            isLogged,
            logOffUser
        }}>
            {children}
        </ContextoAuth.Provider>
    )
}

export default ContextoAuth