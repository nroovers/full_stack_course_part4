import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
// import './App.css';
import blogsService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import Blog from './components/Blog'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState(null)
  const [notification, setNotification] = useState(null)


  const writeNotification = (notification) => {
    setNotification({ text: notification, isError: false })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const writeError = (error) => {
    setNotification({ text: error, isError: true })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  useEffect(() => {
    blogsService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {

      console.log('handleLogin')

      const loggedInUser = await loginService.login({ username, password })

      if (loggedInUser) {
        setUser(loggedInUser)
        setUsername('')
        setPassword('')
        console.log('User logged in', username, password, user)
      }
    } catch (exception) {
      console.log('handleLogin exception', exception)
      writeError('Wrong credentials')
    }
  }

  if (user === null) {
    return (
      <div>
        <h1>Notes</h1>
        <Notification notification={notification} />

        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
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

        <Notification notification={notification} />

        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>

    )
  }
}

export default App
