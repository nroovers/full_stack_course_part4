import React, { useState } from 'react'
import './Blog.css'

const Blog = ({ blog }) => {

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
          {blog.likes} likes <button>like</button>
        </div>
        <div>
          added by {blog.user ? blog.user.name : 'unknown'}
        </div>
      </div>
    )
  }
}

export default Blog