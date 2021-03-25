import React, { } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './shared/context/auth-context';
import { Provider } from 'react-redux';
import { compose, applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import queueReducer from './store/reducers/queueReducer';
import createSagaMiddleWare from 'redux-saga';
import {watchOut} from './store/Saga';
const reducers = combineReducers({
   queueState: queueReducer
});
const sagaMiddleWare = createSagaMiddleWare();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
var store = createStore(reducers, composeEnhancers(applyMiddleware(thunk,sagaMiddleWare)));
sagaMiddleWare.run(watchOut);
const app = (
   <Provider store={store}>
      <AuthContextProvider>
         <BrowserRouter>
            <App></App>
         </BrowserRouter>
      </AuthContextProvider>
   </Provider>
)



ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
