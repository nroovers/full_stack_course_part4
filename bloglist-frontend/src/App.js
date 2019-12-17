import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  BrowserRouter as Router,
  Route, //Link, Redirect, withRouter
} from 'react-router-dom'

// import blogsService from './services/blogs'
// import loginService from './services/login'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import UserList from './components/UserList'
import UserView from './components/UserView'
// import BlogForm from './components/BlogForm'
// import Toggable from './components/Toggable'
import Login from './components/Login'

import { initializeBlogs, createBlog, updateBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { setLogin, resetLogin } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'

const App = (props) => {

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      console.log('load user', loggedUserJSON)
      const user = JSON.parse(loggedUserJSON)
      props.setLogin(user)
    }
  }, [])

  useEffect(() => {
    console.log('get all blogs')
    props.initializeBlogs()
    props.initializeUsers()
  }, [])


  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedUser')
    props.resetLogin()
  }

  console.log('check user', props.login)

  return (
    <div>
      <Router>
        <h1>Blogs</h1>

        <Notification />

        {props.login === null
          ? <Login></Login>
          : <div>
            {props.login.name} is logged in  <button onClick={handleLogout}>logout</button>
          </div>
        }
        <Route exact path="/" render={() => props.login !== null ? <Blogs /> : null} />
        <Route exact path="/users" render={() => <UserList />} />
        <Route exact path="/users/:id" render={({ match }) =>
          <UserView userid={match.params.id} />} />
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('APP - mapStateToProps', state)
  return {
    blogs: state.blogs,
    login: state.login,
    // users: state.users,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  initializeBlogs, createBlog, updateBlog, likeBlog, removeBlog,
  initializeUsers,
  setLogin, resetLogin,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
