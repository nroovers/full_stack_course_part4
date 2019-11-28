/* eslint-disable indent */
import React from 'react'

const BlogForm = ({ title, author, url, handleSubmit }) => (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                title
            <input name="title" {...title} />
            </div>
            <div>
                author
            <input name="author" {...author} />
            </div>
            <div>
                url
            <input name="url" {...url} />
            </div>
            <button type="submit">create</button>
        </form>
    </div>
)

export default BlogForm