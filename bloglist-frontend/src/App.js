import React, { useEffect } from 'react'
import { connect } from 'react-redux'
// import blogsService from './services/blogs'
// import loginService from './services/login'
import Notification from './components/Notification'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Toggable from './components/Toggable'
import Login from './components/Login'

import { initializeBlogs, createBlog, updateBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { setLogin, resetLogin } from './reducers/loginReducer'

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
  }, [])


  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedUser')
    props.resetLogin()
  }

  console.log('check user', props.login)

  return (
    <div>
      <h1>Notes</h1>

      <Notification />

      {props.login === null
        ? <Login></Login>
        : <div>
          {props.login.name} is logged in  <button onClick={handleLogout}>logout</button>

          <h2>blogs</h2>

          <Toggable buttonLabel='new note'>
            <BlogForm ></BlogForm>
          </Toggable>

          <div>
            {props.blogs ? props.blogs
              .sort((a, b) => b.likes - a.likes)
              .map(blog =>
                <Blog key={blog.id} blog={blog} />
              ) : ''}
          </div>
        </div>}
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
  setLogin, resetLogin,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
