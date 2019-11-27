import React, { useState } from 'react'
import './Blog.css'
import blogsService from '../services/blogs'

const Blog = ({ blog, handleLikeClick }) => {

  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)

    console.log(blog)
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
          {blog.likes} likes <button onClick={() => {handleLikeClick(blog)}}>like</button>
        </div>
        <div>
          added by {blog.user ? blog.user.name : 'unknown'}
        </div>
      </div>
    )
  }
}

export default Blog