import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { resetLogin } from '../reducers/loginReducer'

const Menu = (props) => {
    const menuStyle = {
        background: "lightgrey",
        padding:5
    }
    const padding = {
        paddingRight: 5
    }
    console.log(props.login)
    return (
        <div style={menuStyle}>
            <Link to='/' style={padding}>blogs</Link>
            <Link to='/users' style={padding}>users</Link>
            {props.login
                ? <><em>{props.login.name} logged in</em> <button onClick={props.resetLogin}>logout</button></>
                // : <Link to="/login">login</Link>
                : null
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
    }
}

const mapDispatchToProps = {
    resetLogin
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu)