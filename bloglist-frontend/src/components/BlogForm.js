/* eslint-disable indent */
import React from 'react'

const BlogForm = ({ title, author, url, handleSubmit }) => {

    const titleInputProps = { ...title }
    delete titleInputProps.reset

    const authorInputProps = { ...author }
    delete authorInputProps.reset

    const urlInputProps = { ...url }
    delete urlInputProps.reset

    return (
        < div >
            <form onSubmit={handleSubmit}>
                <div>
                    title
            <input name="title" {...titleInputProps} />
                </div>
                <div>
                    author
            <input name="author" {...authorInputProps} />
                </div>
                <div>
                    url
            <input name="url" {...urlInputProps} />
                </div>
                <button type="submit">create</button>
            </form>
        </div >)
}

export default BlogForm