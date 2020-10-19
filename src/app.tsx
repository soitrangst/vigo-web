import React from 'react';


import Router from "./router"
import './App.scss';
import './App.css';

import { Provider } from 'react-redux';
import Configure from "./redux/store"

const store = Configure()


export default function App():JSX.Element {

    return (
        <Provider store={store}>
            <Router/>
        </Provider>
    )
}