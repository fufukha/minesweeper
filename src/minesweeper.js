import React from 'react';
import { render } from 'react-dom';
import App from './components/App/App';
import store from './store';
import { Provider } from 'react-redux';
import 'reset-css';

function component() {
    const element = document.createElement('div');
    element.id = 'app'
    return element;
}

document.body.appendChild(component());

render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('app')
);
