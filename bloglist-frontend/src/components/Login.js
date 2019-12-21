import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'

import { withRouter } from 'react-router-dom'

import { setNotification } from '../reducers/notificationReducer'
import { setLogin } from '../reducers/loginReducer'
import loginService from '../services/login'

import { Button, Form, Segment, Header, Grid } from 'semantic-ui-react'

const Login = withRouter((props) => {
    const username = useField('text')
    const password = useField('password')

    const usernameInputProps = { ...username }
    delete usernameInputProps.reset

    const passwordInputProps = { ...password }
    delete passwordInputProps.reset


    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            console.log('handleLogin', username.value, password.value)

            const loggedInUser = await loginService.login({ username: username.value, password: password.value })

            console.log('loggedUser', loggedInUser)

            if (loggedInUser) {
                window.localStorage.setItem('loggedUser', JSON.stringify(loggedInUser))
                props.setLogin(loggedInUser)
                // blogsService.setToken(loggedInUser.token)

                username.reset()
                password.reset()
                console.log('User logged in', username, password, props.login)

                props.history.push('/')
            }
        } catch (exception) {
            console.log('handleLogin exception', exception)
            props.setNotification('Wrong username or password', true, 5)
        }
    }


    return (
        // <div>
        //     <h2>Login</h2>

        //     <form onSubmit={handleLogin}>
        //         <div>
        //             username <input name="Username" {...usernameInputProps} />
        //         </div>
        //         <div>
        //             password <input name="Password" {...passwordInputProps} />
        //         </div>
        //         <button type="submit">login</button>
        //     </form>
        // </div>


        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='top'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' textAlign='center'> Login  </Header>
                <Form size='large' onSubmit={handleLogin}>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' name="Username" {...usernameInputProps} data-cy='username'/>
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            type='password'
                            name="Password" {...passwordInputProps}
                            data-cy='password'
                        />
                        <Button fluid size='large' data-cy='submit'>Login</Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    )
})


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