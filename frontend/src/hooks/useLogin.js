import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {authDispatch} = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch("http://localhost:4000/api/users/login", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({email, password})
        })
        const data = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(data.error)
        }
        if(response.ok){
            // save the user to local storage
            localStorage.setItem("user", JSON.stringify(data))
            
            //update the auth context
            authDispatch({type:"LOGIN", payload: data})
            
            setIsLoading(false)
        }
    }
    return { login, isLoading, error }
}