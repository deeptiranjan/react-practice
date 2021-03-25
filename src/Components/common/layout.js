import React, { } from 'react';
import { NavLink } from 'react-router-dom';

import Auxillary from '../../shared/components/Auxillary';
import {AuthContext} from '../../shared/context/auth-context';

const Layout=(props) =>{
    //const authData = useContext(AuthContext);
        return (
            <Auxillary>
                <AuthContext.Consumer>
                    {(context) =>   context.isAuth.token ? <ul>
                    <NavLink to={{ pathname: '/users' }}>Users</NavLink>
                    <NavLink to={{ pathname: '/queues' }}>Queues</NavLink>
                </ul> : null }
                </AuthContext.Consumer>
                
                <div>
                    {props.children}
                </div>
            </Auxillary>
        )
    }


export default Layout;