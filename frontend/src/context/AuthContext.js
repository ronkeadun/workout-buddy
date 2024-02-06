import { createContext, useReducer, useEffect } from "react"

export const AuthContext = createContext()

export const authReducer = (userState, action) => {
    switch(action.type){
        case "LOGIN" : 
            return {user : action.payload}
        case "LOGOUT" :
            return {user : null}
        default : 
            return userState
    }
}

export const AuthContextProvider = ({children}) => {
    const [authState, authDispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"))

        if(user){
            authDispatch({type:"LOGIN", payload: user})
        }
    }, [])
    console.log("AuthContext state: ", authState)

    return (
        <AuthContext.Provider value = {{...authState, authDispatch}}>
            {children}
        </AuthContext.Provider>
    )
}