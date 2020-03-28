import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux"
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from "react-router-dom"
import {createStore,applyMiddleware,compose,combineReducers} from "redux"
import reducer from "./store/reducer"
import thunk from "redux-thunk"
import orderReducers from "./store/orderReducers";
import authReducers from "./store/authReducer";



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    burgerBuilder : reducer,
    order : orderReducers,
    auth : authReducers
})

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));


const app = (
    <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </Provider>
)


ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
