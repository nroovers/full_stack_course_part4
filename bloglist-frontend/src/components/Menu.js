import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { resetLogin } from '../reducers/loginReducer'
import { Menu, Button } from 'semantic-ui-react'

const AppMenu = (props) => {
    // const menuStyle = {
    //     background: "lightgrey",
    //     padding: 5
    // }
    // const padding = {
    //     paddingRight: 5
    // }
    // console.log(props.login)

    const handleLogout = (event) => {
        window.localStorage.removeItem('loggedUser')
        props.resetLogin()
      }


    return (
        <Menu>
            <Menu.Item>
                <Link to='/' data-cy='blogs-link'>blogs</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to='/users' data-cy='users-link'>users</Link>
            </Menu.Item>
            <Menu.Menu position='right'>
                {props.login
                    ?
                    <>
                        <Menu.Item>{props.login.name} logged in</Menu.Item>
                        <Menu.Item><Button onClick={handleLogout}>logout</Button></Menu.Item>
                    </>
                    : null
                }
            </Menu.Menu>
        </Menu>
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
)(AppMenu)