import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import blogsService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Toggable from './components/Toggable'
import { useField } from './hooks'

const App = (props) => {
  const username = useField('text')
  const password = useField('password')

  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState(null)

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const writeNotification = (notification) => {
    props.setNotification(notification, false, 5)
  }

  const writeError = (error) => {
    props.setNotification(error, true, 5)
  }

  useEffect(() => {
    console.log('get all blogs')
    blogsService.getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs.sort((a, b) => b.likes - a.likes))
      })
      .catch(error => {
        writeError('Retreiving blogs failed')
        console.log(error)
      })
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {

      console.log('load user', loggedUserJSON)
      const user = JSON.parse(loggedUserJSON)
      setUser(user)

      console.log('loaded usertoken', user.token)
      blogsService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {

      console.log('handleLogin')

      const loggedInUser = await loginService.login({ username: username.value, password: password.value })

      if (loggedInUser) {
        window.localStorage.setItem('loggedUser', JSON.stringify(loggedInUser))
        setUser(loggedInUser)
        blogsService.setToken(loggedInUser.token)

        username.reset()
        password.reset()
        console.log('User logged in', username, password, user)
      }
    } catch (exception) {
      console.log('handleLogin exception', exception)
      writeError('Wrong username or password')
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleCreateBlog = (event) => {
    event.preventDefault()

    blogsService.create({
      title: title.value,
      author: author.value,
      url: url.value
    }).then(createdBlog => {
      console.log(createdBlog)
      setBlogs(blogs ? blogs.concat(createdBlog) : [createdBlog])
      writeNotification(`blog ${title.value} created`)
      url.reset()
      author.reset()
      title.reset()
    })
      .catch(error => {
        writeError(error.text)
      })
  }

  const handleLikeClick = (blog) => {
    blog.likes += 1
    blogsService.update(blog.id, blog)

    setBlogs(blogs
      .map(b => b.id === blog.id ? blog : b)
      .sort((a, b) => b.likes - a.likes))
  }

  const handleRemoveClick = (blog) => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      blogsService.remove(blog)
        .then(() => {
          writeNotification('blog removed')
          setBlogs(blogs.filter(b => b.id !== blog.id))
        })
        .catch(error => {
          writeError('Blog could not be removed: ', error.text)
        })
    }
  }

  console.log('check user', user)

  if (user === null) {

    const usernameInputProps = { ...username }
    delete usernameInputProps.reset

    const passwordInputProps = { ...password }
    delete passwordInputProps.reset

    return (
      <div>
        <h1>Notes</h1>
        <Notification />

        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <div>
            username
            <input name="Username" {...usernameInputProps} />
          </div>
          <div>
            password
            <input name="Password" {...passwordInputProps} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>Notes</h1>

        <Notification />

        {user.name} is logged in  <button onClick={handleLogout}>logout</button>

        <h2>blogs</h2>

        <Toggable buttonLabel='new note'>
          <BlogForm title={title} author={author} url={url} handleSubmit={handleCreateBlog}></BlogForm>
        </Toggable>

        <div>
          {blogs ? blogs.map(blog =>
            <Blog key={blog.id} user={user} blog={blog} handleLikeClick={handleLikeClick} handleRemoveClick={handleRemoveClick} />
          ) : ''}
        </div>
      </div>
    )
  }
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
)(App)
