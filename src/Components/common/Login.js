import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import Aux from '../../shared/components/Auxillary';
import { AuthContext } from '../../shared/context/auth-context';
const login = () =>{
    const authData = useContext(AuthContext);
    const history = useHistory();
    const [authDataDetails, setauthDetails] = useState(authData)
    const loginHandler = () =>{
    authData.login();
       // <Redirect to='/users'></Redirect>
       history.replace(`/users`);
    }
    return (
        <Aux>
            <div>
                <label>UserName: </label>
                <input type="text"></input>
                <label>Password: </label>
                <input type="password"></input>
                <button onClick={loginHandler}>Login</button>
            </div>
        </Aux>
    )
}

export default login;