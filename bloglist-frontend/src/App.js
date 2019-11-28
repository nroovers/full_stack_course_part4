import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
// import './App.css';
import blogsService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Toggable from './components/Toggable'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState(null)
  const [notification, setNotification] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


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

      const loggedInUser = await loginService.login({ username, password })

      if (loggedInUser) {

        window.localStorage.setItem('loggedUser', JSON.stringify(loggedInUser))

        setUser(loggedInUser)
        setUsername('')
        setPassword('')
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
      title: title,
      author: author,
      url: url
    }).then(createdBlog => {
      console.log(createdBlog)
      setBlogs(blogs ? blogs.concat(createdBlog) : [createdBlog])
      writeNotification(`bloge ${title} created`)
      setUrl('');
      setAuthor('');
      setTitle('');
    })
      .catch(error => {
        writeError(error.text)
      })
  }

  const handleLikeClick = (blog) => {
    blog.likes += 1;
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

        {user.name} is logged in  <button onClick={handleLogout}>logout</button>

        <h2>blogs</h2>

        <Toggable buttonLabel='new note'>
          <BlogForm title={title} author={author} url={url}
            handleTitleChange={(event) => { setTitle(event.target.value) }}
            handleAuthorChange={(event) => { setAuthor(event.target.value) }}
            handleUrlChange={(event) => { setUrl(event.target.value) }}
            handleSubmit={handleCreateBlog}></BlogForm>
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

export default App
