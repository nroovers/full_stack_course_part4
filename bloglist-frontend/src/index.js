
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import { Container } from 'semantic-ui-react'

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer,
    users: userReducer,
    login: loginReducer,
})

const store = createStore(reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    ))

const renderApp = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Container>
                <App />
            </Container>
        </Provider>
        ,
        document.getElementById('root'))
}

renderApp()
// store.subscribe(renderApp)
