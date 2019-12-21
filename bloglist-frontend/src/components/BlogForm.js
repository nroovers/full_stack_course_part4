/* eslint-disable indent */
import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'

import { Form, Button } from 'semantic-ui-react'

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
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Title</label>
                    <input name="title" {...titleInputProps} />
                </Form.Field>
                <Form.Field>
                    <label>Author</label>
                    <input name="author" {...authorInputProps} />
                </Form.Field>
                <Form.Field>
                    <label>URL</label>
                    <input name="url" {...urlInputProps} />
                </Form.Field>
                <Button primary type="submit">create</Button>
            </Form>
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
