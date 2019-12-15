
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
    notification: notificationReducer,
    // blogs: blogReducer,
    // users: userReducer,
    // login: loginReducer
})

const store = createStore(reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    ))

const renderApp = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root'))
}

renderApp()