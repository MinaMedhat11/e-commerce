import React, { createContext, useEffect, useState } from 'react'
import { useContext } from "react";

export let authContext = createContext()




export default function AuthProvider({ children }) {
    const [token, setToken] = useState(null)
    useEffect(function () {
        if (localStorage.getItem('tkn') != null) {
            setToken(localStorage.getItem('tkn'))
        }
    }, [])
    return (

        <authContext.Provider value={{ token, setToken }}>

            {children}
        </authContext.Provider>
    )
}
