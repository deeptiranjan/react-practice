import React, { Suspense, useContext } from 'react';
import './App.css';
import Layout from './Components/common/layout';
import Login from './Components/common/Login';
import { Redirect, Route, Switch } from 'react-router';
import {AuthContext} from './shared/context/auth-context';
const App = (props) => {
    const authData = useContext(AuthContext);
    console.log(authData);
    const userLazy = React.lazy(() => import('./Containers/Users/Users'));
    const queueLazy = React.lazy(() => import('./Containers/Queues/Queue'));
    //sessionStorage.setItem('token','test');
    const token = sessionStorage.getItem('token');
    const routes = [
      {
        name : '/users',
        id: 1,
        comp : userLazy
      },
      {
        name: '/queues',
        id: 2,
        comp: queueLazy
      }
    ]
    let authRoutes = null;
    if(authData.isAuth){
      authRoutes = routes.map(element =>{
        return (
          <Route path={element.name} key ={element.id} component={element.comp} exact></Route>
        )
      });
    }
    return (
      <Layout>
          <Suspense fallback={<div>...Loading</div>}>
            <Switch>
              <Route path='/login' exact component={Login}></Route>
              {authRoutes}
              <Redirect to='/login'></Redirect>
            </Switch>
          </Suspense>
      </Layout>
    );
  }

export default App;
