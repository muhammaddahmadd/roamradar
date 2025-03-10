import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();


const initialState = {
    isAuthenticated: false,
    user: null
}

function reducer(state, action) {
    switch(action.type){
        case "login":
            return {
                ...state, isAuthenticated: true,
                user: action.payload
            }
        case "logout":
            return {
                initialState
            }
    }
}

function AuthProvider({children})  {
    const [{isAuthenticated, user}, dispatch] = useReducer(initialState, reducer);

    function login(email, password) {
        if () dispatch({type:"login"})
    }

    function logout() {
        dispatch({type: "logout"})
    }


    return <AuthContext.Provider value={{
        
    }}>
        children
    </AuthContext.Provider>
}

function useAuth(context) {
    const context = useContext();
    if (context === undefined) throw new Error("Context being used at wrong place")
    return context;
}


export { useAuth, AuthProvider };