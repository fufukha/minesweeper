import { compose, applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import rootReducer from './reducers';

export default createStore(
    rootReducer,
    compose(
        applyMiddleware(logger),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
