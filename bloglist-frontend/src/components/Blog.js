import React, { useState } from 'react'
import './Blog.css'
import blogsService from '../services/blogs'

const Blog = ({ user, blog, handleLikeClick, handleRemoveClick }) => {

  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)

    console.log(user, blog)
  }

  const setButtonVisbility = () => {
    return { display: blog.user && user.username === blog.user.username ? '' : 'none' }
  }

  if (!showDetails) {
    return (
      <div className='blog' onClick={toggleDetails}>
        {blog.title} [{blog.author}]
      </div>
    )
  }
  else {
    return (
      <div className='blog'>
        <div onClick={toggleDetails}>
          {blog.title} [{blog.author}]
      </div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes <button onClick={() => { handleLikeClick(blog) }}>like</button>
        </div>
        <div>
          added by {blog.user ? blog.user.name : 'unknown'}
        </div>
        <button onClick={() => { handleRemoveClick(blog) }} style={setButtonVisbility()}>remove</button>
      </div>
    )
  }
}

export default Blog