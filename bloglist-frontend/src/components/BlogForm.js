/* eslint-disable indent */
import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'

import { createBlog, } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'


const BlogForm = (props) => {

    const title = useField('text')
    const author = useField('text')
    const url = useField('text')

    const titleInputProps = { ...title }
    delete titleInputProps.reset

    const authorInputProps = { ...author }
    delete authorInputProps.reset

    const urlInputProps = { ...url }
    delete urlInputProps.reset

    const handleSubmit = (event) => {
        event.preventDefault()

        props.createBlog({
            title: title.value,
            author: author.value,
            url: url.value
        })

        props.setNotification(`blog ${title.value} created`, false, 5)
        url.reset()
        author.reset()
        title.reset()
    }

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

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        notification: state.notification
    }
}

const mapDispatchToProps = {
    createBlog, setNotification
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogForm)
