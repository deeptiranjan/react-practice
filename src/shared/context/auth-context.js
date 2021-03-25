import React, { useState } from 'react';
export const AuthContext = React.createContext({
    isAuth: false,
    login: () => { }
})

const AuthContextProvider = props => {
    let tokenData = '';
    if (sessionStorage.getItem('userData')) {
        tokenData = JSON.parse(sessionStorage.getItem('userData')).data.idToken;
    }
    const [isAuthenticated, setAuthenticated] = useState({
        auth: false,
        token: tokenData
    });

    const loginHandler = () => {
        let token = '';
        if (sessionStorage.getItem('userData')) {
            token = JSON.parse(sessionStorage.getItem('userData')).data.idToken;
        }
        setAuthenticated({
            auth: true,
            token: token
        });
    }
    return (
        <AuthContext.Provider value={{ login: loginHandler, isAuth: isAuthenticated }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;