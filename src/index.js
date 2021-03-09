import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './shared/context/auth-context';
const app = (
   <AuthContextProvider>
       <BrowserRouter>
        
        <App></App>
            
        </BrowserRouter>
   </AuthContextProvider>
        

)
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
