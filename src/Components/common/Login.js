import React, { useContext, useState } from 'react';
import {  useHistory } from 'react-router';
import Aux from '../../shared/components/Auxillary';
import { AuthContext } from '../../shared/context/auth-context';
import axios from 'axios';
const login = () => {
    const [loginState, stateLoginChange] = useState({
        controls: {
            email: {
                value: ''
            },
            password: {
                value: ''
            }
        }
    })
    const authData = useContext(AuthContext);
    const history = useHistory();
    const loginHandler = (type) => {
        const loginData = {
            email: loginState.controls.email.value,
            password: loginState.controls.password.value,
            returnSecureToken: true
        }
        if (type === 'login') {
            axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBFH0Njm8SfRoO3_Hd5T2cMq6esgkYoeIs', loginData)
                .then(
                    (data) => {
                        sessionStorage.setItem('userData',JSON.stringify(data));
                        authData.login();
                        // <Redirect to='/users'></Redirect>
                        history.replace(`/users`);
                    }
                )
        } else {
            axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBFH0Njm8SfRoO3_Hd5T2cMq6esgkYoeIs', loginData)
            .then(
                (data) => {
                   console.log("signed up successfully");
                }
            )
        }
    }
    const changeInput = (event, data) => {
        const stateData = { ...loginState.controls };
        const inputState = { ...stateData[data] };
        inputState.value = event.target.value;
        stateData[data] = inputState;
        stateLoginChange({
            controls: stateData
        })
    }
    return (
        <Aux>
            <div>
                <label>UserName: </label>
                <input type="text" value={loginState.controls.email.value} onChange={(event) => changeInput(event, 'email')}></input>
                <label>Password: </label>
                <input type="password" value={loginState.controls.password.value} onChange={(event) => changeInput(event, 'password')}></input>
                <button onClick={loginHandler.bind(this, 'login')}>Login</button>
                <button onClick={loginHandler.bind(this, 'sign')}>Sign up</button>
            </div>
        </Aux>
    )
}

export default login;