import React from 'react'
import { connect } from 'react-redux'


const Login = (props) => {
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
    console.log('APP - mapStateToProps', state)
    return {
        // blogs: state.blogs,
        // login: state.login
        // users: state.users,
        notification: state.notification
    }
}

// const mapDispatchToProps = {
//   selectAnecdote
// }

export default connect(
    mapStateToProps
    // mapDispatchToProps
)(Login)