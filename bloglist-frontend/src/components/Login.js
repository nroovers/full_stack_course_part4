import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'

import { setNotification } from '../reducers/notificationReducer'
import { setLogin } from '../reducers/loginReducer'
import loginService from '../services/login'

const Login = (props) => {
    const username = useField('text')
    const password = useField('password')

    const usernameInputProps = { ...username }
    delete usernameInputProps.reset

    const passwordInputProps = { ...password }
    delete passwordInputProps.reset


    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            console.log('handleLogin',username.value,password.value)

            const loggedInUser = await loginService.login({ username: username.value, password: password.value })

            console.log('loggedUser',loggedInUser)

            if (loggedInUser) {
                window.localStorage.setItem('loggedUser', JSON.stringify(loggedInUser))
                props.setLogin(loggedInUser)
                // blogsService.setToken(loggedInUser.token)

                username.reset()
                password.reset()
                console.log('User logged in', username, password, props.login)
            }
        } catch (exception) {
            console.log('handleLogin exception', exception)
            props.setNotification('Wrong username or password', true, 5)
        }
    }


    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <div>
                    username <input name="Username" {...usernameInputProps} />
                </div>
                <div>
                    password <input name="Password" {...passwordInputProps} />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        // blogs: state.blogs,
        login: state.login,
        // users: state.users,
        notification: state.notification
    }
}

const mapDispatchToProps = {
    setNotification,
    setLogin
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)