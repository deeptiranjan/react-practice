import React, { Component, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import Auxillary from '../../shared/components/Auxillary';
import {AuthContext} from '../../shared/context/auth-context';

const Layout=(props) =>{
    const authData = useContext(AuthContext);
        return (
            <Auxillary>
                { authData.isAuth ? <ul>
                    <NavLink to={{ pathname: '/users' }}>Users</NavLink>
                    <NavLink to={{ pathname: '/queues' }}>Queues</NavLink>
                </ul> : null}
                <div>
                    {props.children}
                </div>
            </Auxillary>
        )
    }


export default Layout;